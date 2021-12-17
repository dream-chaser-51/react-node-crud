const express = require('express');

const authRouter = require('./auth');
const studentRouter = require('./student');

function init() {
  const router = express.Router();
  global.appLogger('Initializing crud application routes');
  router.use('/auth', authRouter);
  router.use(authRouter.authenticateToken);
  
  router.use('/student', studentRouter);

  return router;
}

module.exports = init;
