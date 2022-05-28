const { createLogger, format, transports } = require('winston');
const rTracer = require('cls-rtracer');

const { combine, timestamp, printf } = format;

const rTracerFormat = printf((info) => {
  const rid = rTracer.id();
  return rid
    ? `${info.timestamp} [request-id:${rid}]: ${info.message}`
    : `${info.timestamp}: ${info.message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL,
  format: combine(
    timestamp(),
    rTracerFormat,
  ),
  transports: [new transports.Console()],
});

module.exports = { logger, rTracerFormat };
