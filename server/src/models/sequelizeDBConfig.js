const { Sequelize , Op } = require('sequelize');
const initializeModels = require('../sequelizeModels/initModels');
/**
 * Connects to Database and sets the global accessible variable for easy use
 */
function init() {
  global.sequelizeLogger('Initializing Database');
  return new Promise(async (resolve, reject) => {
    const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USERNAME,process.env.DATABASE_PASSWORD, {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql',
    });
    try {
      await sequelize.authenticate();
      global.sequelize = sequelize;
      global.sequelize.Op = Op;
      const models = initializeModels(global.sequelize);
      global.sequelizeModels = {
        ...models,
      };

      sequelizeLogger('Sequelize Connection has been established successfully.');
      resolve();
    } catch (error) {
      sequelizeLogger('Sequelize Unable to connect to the database:' + error);
      reject();
    }
  });
}

module.exports = init;
