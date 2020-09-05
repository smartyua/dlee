const chalk = require('chalk');
const logger = require('../logger');

const commonConfig = {
  logging: (logs, time) => {
    logger.child({ module: 'sequelize' }).info(logs + chalk.yellow(' Execution: ') + chalk.red(`${time}ms`));
  },
  dialect: process.env.DB_DIALECT || 'sqlite',
  freezeTableName: true,
  storage: './database.sqlite3',
  benchmark: true,
  define: {
    freezeTableName: true,
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: false
  },
  seederStorage: 'sequelize'
};

module.exports = {
  local: commonConfig,
  localhost: commonConfig,
  development: commonConfig,
  production: commonConfig,
  test: commonConfig
};