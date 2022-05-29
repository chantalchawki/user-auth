const mongoose = require('mongoose');
const migration = require('../migration');
const { logger } = require('./logger');

const connect = async () => {
  try {
    const url = process.env.DATABASE_URL || 'mongodb://database:27017/user-auth';
    await mongoose.connect(url);
    await migration.generateUsers();
    logger.info('Connected to database');
  } catch (err) {
    logger.error(`Error connecting to database ${err}`);
  }
};

module.exports = connect;
