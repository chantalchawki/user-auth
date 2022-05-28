const mongoose = require('mongoose');
const migration = require('../migration');
const { logger } = require('./logger');

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    await migration.generateUsers();
    logger.info('Connected to database');
  } catch (err) {
    logger.error('Error connecting to database', err);
  }
};

module.exports = connect;
