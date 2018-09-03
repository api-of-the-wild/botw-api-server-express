const { expect } = require("chai");

const { retryService } = require("../../../src/utilities/retry_service");

describe("retryService.js", function() {
  this.timeout(100);

  const defaultOptions = {
    delayTimeMs: 1,
    serviceName: "integration_tests",
    statusCodes: [200],
    timeoutMs: 5,
  };

  const response = { statusCode: 200 };
  const errorRes = { statusCode: 429 };

  describe("retryService()", () => {
    const optionsCreator = (rp, statusCodes) =>
      Object.assign({}, defaultOptions, {
        rp,
        statusCodes,
      });

    it.skip("should resolve if the status code is in the list", () => {
      return retryService(
        "",
        optionsCreator(() => Promise.resolve(response))
      ).then(res => {
        expect(res).to.equal(response);
      });
    });

    it.skip("should resolve if the status code is in the list for error codes", () => {
      return retryService(
        "",
        optionsCreator(() => Promise.reject(errorRes), [429])
      ).then(res => {
        expect(res).to.equal(errorRes);
      });
    });

    it.skip("should reject if the status code is not in the list after the timeoutMs period", () => {
      return retryService(
        "",
        optionsCreator(() => Promise.reject(response), [429])
      )
        .then(() => {
          throw new Error("Unexpected resolution");
        })
        .catch(rej => {
          expect(rej.message).to.match(/.*timed out.*/);
        });
    });
  });
});
