/**
 * Generates logs in JSON format -
 * logger.info("testing pino logging"); ==> {"level":30,"time":1518032147925,"msg":"testing pino logging","pid":1,"hostname":"mymachine.local","v":1}
 */
const pino = require("pino");

export const createLogger = loggerDelegate => {
  const logger = pino();
  // {}, // pino options - https://github.com/pinojs/pino/blob/master/docs/API.md#constructor
  // {
  //   [Symbol.for("needsMetadata")]: true,
  //   write: chunk => {
  //     loggerDelegate.log(chunk);
  //   },
  // }
  /**
   * add metric level to logger - https://github.com/pinojs/pino/blob/master/docs/API.md#addLevel
   * More information on levels: https://github.com/pinojs/pino/blob/master/docs/API.md#level
   */
  const LOG_METRIC_LEVEL = 35;
  const LOG_METRIC_NAME = "metric";
  logger.addLevel(LOG_METRIC_NAME, LOG_METRIC_LEVEL);

  return logger;
};

module.exports = {
  createLogger,
};
