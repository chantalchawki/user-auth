require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const rTracer = require('cls-rtracer');
const connect = require('./config/database');
const authRouter = require('./controllers/auth');
const { logger } = require('./config/logger');

connect();

const app = express();
app.use(rTracer.expressMiddleware());
app.use(express.json());

app.use(morgan('tiny', {
  stream: {
    write(message) {
      logger.info(message);
    },
  },
}));

app.use(authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Application started on port ${port}`);
});
