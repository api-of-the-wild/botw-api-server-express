const rp = require("request-promise");
const { createLogger } = require("./logger");

const success = callback => result => {
  callback(null, result);
};

const _enhancedLambdaCreator = contextEnhancer => handler => (
  event,
  context,
  callback
) => {
  const enhancedContext = contextEnhancer(context);
  const { logger } = enhancedContext;

  return Promise.resolve()
    .then(() => handler(enhancedContext)(event))
    .then(result => {
      success(callback)(result);
    })
    .catch(err => {
      logger.error(err);
      callback(err);
    });
};

const _defaultContextEnhancer = awsContext => ({
  awsContext,
  env: process.env,
  logger: createLogger(console),
  request: rp,
});

const createLambda = _enhancedLambdaCreator(_defaultContextEnhancer);

module.exports = {
  _defaultContextEnhancer,
  _enhancedLambdaCreator,
  createLambda,
};
