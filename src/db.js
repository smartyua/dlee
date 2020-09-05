const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const logger = require('./logger');
const database = require('./config/db');

const dbConfig = database[process.env.NODE_ENV || 'development'];

const { DataTypes } = Sequelize;

Sequelize.prototype.close = () => this.connectionManager.close();

class DB {
  /**
   * @param {String} connectionString DSN db connection string
   * @param {Object} options Sequelize options object
   * @see http://docs.sequelizejs.com/manual/installation/usage.html#options
   */
  constructor(options = {}) {
    this.options = options;
    this.importCache = {};
    this.setConnection();
  }

  /**
   * Return db connection
   */
  connect() {
    logger.info('SQL has been connected...');
    return Promise.resolve().then(() => this.sequelize);
  }

  /**
   * Gracefully disconnect from the database
   */
  async disconnect() {
    if (this.sequelize) {
      await this.sequelize.connectionManager.close();
      // await this.sequelize.connectionManager.pool.destroy();
    }

    logger.info('Sequalize shut down connection gracefully');
  }

  /**
   * Imports a model defined in another file
   *
   * @param {String} path The path to the file that holds the model you want to import.
   * If the part is relative, it will be resolved relatively to the calling file
   * @return {Model}
   */
  import(filePath) {
    if (!this.importCache[filePath]) {
      // eslint-disable-next-line global-require
      const requiredFile = require(filePath);
      // eslint-disable-next-line prefer-rest-params
      let defineCall = arguments.length > 1 ? arguments[1] : requiredFile;
      if (typeof defineCall === 'object') {
        // ES6 module compatibility
        defineCall = defineCall.default;
      }

      this.importCache[filePath] = defineCall(this.sequelize, DataTypes);
    }

    return this.importCache[filePath];
  }

  get models() {
    const models = {};
    const modelsPath = path.join(__dirname, './models');
    fs.readdirSync(modelsPath)
      .filter(file => this.modelFileFilterConditions(file)
        .every(condition => !!condition))
      .forEach(file => {
        const model = this.import(path.join(modelsPath, file));
        models[model.name] = model;
      });

    Object.keys(models).forEach(modelName => {
      if (models[modelName].associate) {
        models[modelName].associate(models);
      }
    });

    models.sequelize = this.sequelize;
    models.Sequelize = Sequelize;

    return models;
  }

  /**
   * Getter for the connection. It's safe to call it many times
   * Sequelize creates a pool of connections and use them.
   * By default pool size is 1.
   *
   * @see http://docs.sequelizejs.com/manual/installation/usage.html#options
   */
  setConnection() {
    this.sequelize = new Sequelize(this.options);
  }

  /**
   * The conditions that the model file must satisfy
   *
   * @param {String} file
   */
  modelFileFilterConditions(file) {
    this.conditions = [
      file !== 'index.js',
      file.indexOf('.') !== 0, // not hidden file
      file.slice(-3) === '.js' // is js file
    ];

    return this.conditions;
  }
}

module.exports = new DB(dbConfig);
