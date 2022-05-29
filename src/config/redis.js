const { createClient } = require('redis');
const { logger } = require('./logger');

const client = createClient({
  url: process.env.REDIS_URL || 'redis://redis',
});
client.on('error', (err) => {
  logger.error(`Redis Client Error ${err}`);
  process.exit(1);
});

const connect = async () => {
  await client.connect();
  logger.info('Connected to Redis');
};

connect();

module.exports = client;
