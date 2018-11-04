const { expect } = require("chai");
const rp = require("request-promise");

const config = require("../../config.env");
const { createLogger } = require("../../src/utilities/logger");

const logger = createLogger(console);

const env = process.env;
const INTEGRATION_STAGE = env.INTEGRATION_STAGE || "ALPHA";
const SERVER_URI_BASE =
  env.SERVER_URI_BASE || config.app[INTEGRATION_STAGE].host;

describe("the application server", () => {
  describe("GET /", () => {
    it("should respond with a welcome message", () => {
      return rp(`${SERVER_URI_BASE}/geography/test/v0`)
        .then(result => {
          const json = JSON.parse(result);
          expect(json.message).to.exist;
          expect(json.self).to.exist;
          expect(json.resource).to.exist;
          expect(json.version).to.exist;
        })
        .catch(err => {
          logger.error(`Unexpected error was caught: ${err}`);
        });
    });
  });
});
