const rp = require("request-promise");

const DEFAULT_DELAY_TIME_MS = 500;
const DEFAULT_TIMEOUT_MS = 1900;
const DEFAULT_STATUS_CODES = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226];

const retryService = (uri, rpOptions = {}) => {
  const options = {};

  options.delayTimeMs = rpOptions.delayTimeMs || DEFAULT_DELAY_TIME_MS;
  options.request = rpOptions.request || rp;
  options.serviceName = rpOptions.serviceName || "";
  options.timeoutMs = rpOptions.timeoutMs || DEFAULT_TIMEOUT_MS;
  options.statusCodes = rpOptions.statusCodes || DEFAULT_STATUS_CODES;

  const timeoutTime = new Date().getTime() + options.timeoutMs;

  return new Promise((resolve, reject) => {
    const check = () => {
      return options
        .request({
          uri,
          headers: rpOptions.headers || {},
          method: rpOptions.method || "GET",
          body: rpOptions.body || "",
          resolveWithFullResponse: true,
        })
        .then(resolution => {
          // TODO - inject logger
          // eslint-disable-next-line no-console
          console.log(
            `Endpoint ${uri} responded with ${resolution.statusCode}`
          );
          resolve(resolution);
        })
        .catch(rejection => {
          new Date().getTime() < timeoutTime
            ? retry()
            : Promise.reject(rejection);
        })
        .catch(() =>
          reject(
            new Error(
              `Waiting for service ${options.serviceName} timed out after ${
                options.timeoutMs
              }ms`
            )
          )
        );
    };
    const retry = () => setTimeout(check, options.delayTimeMs);

    retry();
  });
};

module.exports = {
  retryService,
};
