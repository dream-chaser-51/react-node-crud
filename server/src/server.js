require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const debug = require('debug');
const cors = require('cors');

const sequelizeInit = require('./models/sequelizeDBConfig');
const appRouter = require('./controllers/app');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;

function createLoggers() {
  global.rootLogger = debug('student-crud');
  global.sequelizeLogger = global.rootLogger.extend('sequelize');
  global.appLogger = global.rootLogger.extend('app');
  global.rootLogger('Loggers Initialized');
}

function addMiddleware(app) {
  global.appLogger('Initializing Middleware');
  app.use(morgan('combined'));
  app.use(express.json({ limit: '50mb' }));
  app.use(cors());
  //app.use('/uploads', express.static(path.join(__dirname, 'shared')));
}

function addRoutes(app) {
  global.appLogger('Initializing Routes..');
  app.use('/api', appRouter());
}

async function init() {
  //create loggers as first step
  createLoggers();

  //Connect to database;
  await sequelizeInit();

  global.appLogger('Initializing application');

  const app = express();  
  addMiddleware(app);
  addRoutes(app);

  global.appLogger('Starting to start server');

  // start listening to requests
  app.listen(port, (req, res) => {
    global.appLogger(`App Started at ${host}:${port}`);
  });
}

init();