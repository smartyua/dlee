/**
 * Models index file.
 *
 */

const { models } = require('../db');

const { Op } = models.Sequelize;

module.exports = {
  ...models,
  Op,
  sequelize: models.sequelize
};
