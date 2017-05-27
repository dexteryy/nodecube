
import winston from 'winston';

const consoleConfig = {
  level: process.env.NODECUBE_LOG_LEVEL || 'info',
  colorize: !!process.env.NODECUBE_ENABLE_COLOR_LOG,
  json: !!process.env.NODECUBE_ENABLE_JSON_LOG,
  handleExceptions: !process.env.NODECUBE_DISABLE_EXCEPTION_LOG,
  humanReadableUnhandledException: !!process.env.NODECUBE_ENABLE_READABLE_EXCEPTION_LOG,
};

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console(consoleConfig),
  ],
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

logger.consoleConfig = consoleConfig;

export default logger;
