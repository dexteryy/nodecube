
import winston from 'winston';

const isProductionEnv = process.env.NODE_ENV === 'production';

const consoleConfig = new winston.transports.Console({
  level: process.env.NODECUBE_ENABLE_VERBOSE_LOG ? 'verbose' : 'info',
  colorize: !isProductionEnv,
  json: isProductionEnv,
  prettyPrint: !isProductionEnv,
  humanReadableUnhandledException: !isProductionEnv,
});

const logger = new winston.Logger({
  transports: [
    consoleConfig,
  ],
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

logger.consoleConfig = consoleConfig;

export default logger;
