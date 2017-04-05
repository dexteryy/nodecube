
import express, { Router } from 'express';
import compression from 'compression';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import getRawBody from 'raw-body';
import contentType from 'content-type';
import cookieParser from 'cookie-parser';
import httpLogger from 'morgan';
import winston from 'winston';
import expressWinston from 'express-winston';
import errorHandler from 'errorhandler';
import responseTime from 'response-time';
import expressValidator from 'express-validator';
import methodOverride from 'method-override';
import helmet from 'helmet';
// import session from 'express-session';
// import passport from 'passport';
import uuid from 'uuid/v4';
import corsManager from './corsManager';
import logger from './logger';
global.logger = logger;

const isProductionEnv = process.env.NODE_ENV === 'production';
const DEFAULT_LOG_FORMAT = '[:id] :response-time ms | :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

export default function httpService({
  connectServices = {},
  validators = {},
  corsWhitelist = [],
  corsMethods = [],
  corsHeaders = [],
  corsOptions = {},
  skipHttpLogger,
  httpLoggerFormat = DEFAULT_LOG_FORMAT,
  disableCache = false,
  disableCors = false,
  disableCorsPreflight = false,
}) {
  const server = express();
  const service = Router();

  server.enable('trust proxy');
  server.set('port', process.env.PORT || 8080);

  server.use(responseTime());
  if (!process.env.NODECUBE_DISABLE_COMPRESS) {
    server.use(compression());
  }
  server.use(flash());
  server.use(methodOverride('X-HTTP-Method'));
  server.use(methodOverride('X-HTTP-Method-Override'));

  server.use((req, res, next) => {
    res.set('Request-Id', uuid());
    next();
  });
  server.use((req, res, next) => {
    res.set('X-API-Version', process.env.NODECUBE_API_VERSION);
    next();
  });

  if (process.env.NODECUBE_ENABLE_HEADERS_LOG) {
    server.use((req, res, next) => {
      const rid = res.get('Request-Id');
      logger.info(`[${rid}] headers: ${JSON.stringify(req.headers)}`);
      next();
    });
  }
  if (process.env.NODECUBE_ENABLE_RAW_BODY_LOG) {
    server.use((req, res, next) => {
      const rid = res.get('Request-Id');
      let encoding;
      try {
        encoding = contentType.parse(req).parameters.charset;
      } catch (ex) {
        encoding = true;
      }
      getRawBody(req, {
        length: req.headers['content-length'],
        encoding,
      }).then(str => {
        logger.info(`[${rid}] raw body: ${str}`);
      }).catch(err => {
        logger.info(`[${rid}] raw body: Error! ${err.message}`);
      });
      next();
    });
  }

  if (!process.env.NODECUBE_DISABLE_BODY_PARSER) {
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(expressValidator({
      customValidators: validators,
    }));
  }

  server.use(cookieParser());

  server.use(helmet.xssFilter());
  server.use(helmet.frameguard());
  server.use(helmet.hidePoweredBy());
  server.use(helmet.ieNoOpen());
  server.use(helmet.noSniff());
  if (disableCache) {
    server.use(helmet.noCache());
  }

  const corsConfig = Object.assign({}, corsOptions, {
    whitelist: corsWhitelist,
    methods: corsMethods,
    headers: corsHeaders,
  });
  if (!disableCors) {
    server.use(corsManager(corsConfig));
  }
  if (!disableCorsPreflight) {
    server.options('*', corsManager(corsConfig));
  }

  httpLogger.token('id', (req, res) => res.get('Request-Id'));
  const httpLoggerConfig = {
    stream: logger.stream,
    skip(req) {
      if (!process.env.NODECUBE_DISABLE_STAT_API && req.path === '/stat') {
        return true;
      }
      return skipHttpLogger ? skipHttpLogger(req) : false;
    },
  };
  server.use(httpLogger(httpLoggerFormat, httpLoggerConfig));

  if (!process.env.NODECUBE_DISABLE_STAT_API) {
    server.get('/stat', (req, res) => {
      res.json({
        status: 0,
      });
    });
  }

  if (process.env.NODECUBE_ENABLE_INSPECT_API) {
    server.get('/inspect', (req, res) => {
      const {
        id,
        responseTime,
        baseUrl,
        protocol,
        hostname,
        ip,
        ips,
      } = req;
      res.json({
        id,
        responseTime,
        matchedPattern: req.app.mountpath,
        matchedUrl: baseUrl,
        protocol,
        hostname,
        ip,
        ips,
      });
    });
  }

  server.use(service);

  server.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        level: process.env.NODECUBE_ENABLE_VERBOSE_LOG ? 'verbose' : 'info',
        colorize: false,
        json: true,
        prettyPrint: false,
        humanReadableUnhandledException: false,
      }),
    ],
  }));

  if (!isProductionEnv) {
    server.use(errorHandler());
  }

  server.use(function (err, req, res, next) {
    if (err && (!next || res.headersSent)) {
      return;
    }
    res.sendStatus(500);
  });

  Promise.all(Object.values(connectServices)).then(() => {
    server.listen(server.get('port'), () => {
      logger.info('Started on port %d in %s mode',
        server.get('port'), server.get('env'));
    });
  });

  return {
    server,
    service,
  };
}
