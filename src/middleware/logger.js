const chalk = require('chalk');
const pino = require('pino');
const { name } = require('../../package.json');

const { NODE_ENV } = process.env;

const pinoLogger = pino({
  name,
  crlf: false,
  // level: NODE_ENV !== 'production' ? 'trace' : 'warn',
  enabled: NODE_ENV !== 'test',
  prettyPrint: NODE_ENV !== 'production' ? {
    translateTime: true,
    colorize: chalk.supportsColor
  } : false
});

const reqLogger = (req, res, next) => {
  // TODO: logger message format for each level
  if (NODE_ENV !== 'test') {
    pinoLogger.info(req);
  }

  if (next) {
    return next();
  }

  return true;
};

const logger = (req, res, next) => {
  // TODO: logger message format for each level
  if (NODE_ENV !== 'test') {
    pino({ url: req.originalUrl });
  }

  return next();
};

module.exports = {
  reqLogger,
  logger,
  pinoLogger
};
