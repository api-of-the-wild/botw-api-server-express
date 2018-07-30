/**
 * Generates logs in JSON format -
 * logger.info("testing pino logging"); ==> {"level":30,"time":1518032147925,"msg":"testing pino logging","pid":1,"hostname":"mymachine.local","v":1}
 */
const pino = require("pino");

const createLogger = (
  loggerDelegate,
  options = {},
  postProcessingFunction = str => str.trim()
) => {
  const logger = pino(options, {
    [Symbol.for("needsMetadata")]: true,
    write: unformattedChunk => {
      // See Strip New Line above ^
      const chunk = postProcessingFunction(unformattedChunk);

      loggerDelegate.log(chunk);
    },
  });
  const LOG_METRIC_LEVEL = 35;
  const LOG_METRIC_NAME = "metric";
  logger.addLevel(LOG_METRIC_NAME, LOG_METRIC_LEVEL);

  return logger;
};

module.exports = {
  createLogger,
};
