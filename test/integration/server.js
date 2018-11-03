const { expect } = require("chai");
const rp = require("request-promise");

const config = require("../../config.env");

const env = process.env;

const INTEGRATION_STAGE = env.INTEGRATION_STAGE || "ALPHA";
const SERVER_URI_BASE = env.SERVER_URI_BASE || config.app.docker.host;

console.log("about to run integration tests");
console.log(`INTEGRATION_STAGE: ${INTEGRATION_STAGE}`);
console.log(`SERVER_URI_BASE: ${SERVER_URI_BASE}`);

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
          console.error(`Unexpected error was caught: ${err}`);
        });
    });
  });
});
