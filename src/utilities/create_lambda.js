const rp = require("request-promise");
const { createLogger } = require("./logger");

const consoleLogger = createLogger(console);

const _enhancedLambdaCreator = contextEnhancer => handler => (
  event,
  context,
  callback
) => {
  const enhancedContext = contextEnhancer(context);
  const { logger } = enhancedContext;

  return Promise.resolve()
    .then(() => {
      return handler(enhancedContext)(event);
    })
    .then(result => {
      logger.info("Received response " + JSON.stringify(result));
      callback(null, result);
    })
    .catch(err => {
      logger.error(`${err}`);
      callback(err);
    });
};

const _defaultContextEnhancer = awsContext => ({
  awsContext,
  env: process.env,
  logger: consoleLogger,
  request: rp,
});

const createLambda = _enhancedLambdaCreator(_defaultContextEnhancer);

module.exports = {
  _defaultContextEnhancer,
  _enhancedLambdaCreator,
  createLambda,
};
