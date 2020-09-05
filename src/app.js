const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const logger = require('./logger');
const db = require('./db');
const { reqLogger } = require('./middleware/logger');

const app = express();

app.use(bodyParser.json());
app.use(reqLogger);

app.use(routes);

const exit = async () => {
  await db.sequelize.connectionManager.close();
  logger.debug('SQL connection was closed');

  if (process.env.NODE_ENV !== 'test') {
    process.exit(0);
  }
};

process.on('SIGTERM', exit);
process.on('SIGINT', exit);

module.exports = app;
