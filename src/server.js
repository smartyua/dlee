const app = require('./app');
const db = require('./db');
const logger = require('./logger');

const init = async () => {
  try {
    app.listen(3001, () => {
      logger.info('Express App Listening on Port 3001');
      return db.connect();
    });
  } catch (error) {
    logger.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
};

init();
