const { expect } = require("chai");
const rp = require("request-promise");

const config = require("../../config.env");
const { createLogger } = require("../../src/utilities/logger");

const logger = createLogger(console);

const env = process.env;
const INTEGRATION_STAGE = env.INTEGRATION_STAGE || "ALPHA";
const SERVER_URI_BASE =
  env.SERVER_URI_BASE || config.app[INTEGRATION_STAGE].host;

const createRpOptions = uri => ({
  uri,
  headers: {
    "User-Agent": "Request-Promise",
  },
  json: true,
});

describe("the /geography domain", () => {
  describe("GET /regions/v1/:id", () => {
    it("should respond 200 with a region object", () => {
      const testUri = `${SERVER_URI_BASE}/geography/regions/v1/3`;
      const rpOptions = createRpOptions(testUri);
      return rp(rpOptions)
        .then(result => {
          // Region properties
          expect(result.id).to.be.a("number");
          expect(result.name).to.be.a("string");
          expect(result.subregions).to.be.a("array");
          // Subregion properties
          expect(result.subregions[0].id).to.be.a("number");
          expect(result.subregions[0].name).to.be.a("string");
          expect(result.subregions[0].locations).to.be.a("array");
          // Location properties
          expect(result.subregions[0].locations[0].id).to.be.a("number");
          expect(result.subregions[0].locations[0].name).to.be.a("string");
          expect(result.subregions[0].locations[0].location_type).to.satisfy(
            value => value === null || typeof value === "string"
          );
          // Request metadata properties
          expect(result.self).to.be.a("string");
          expect(result.resource).to.be.a("string");
          expect(result.version).to.be.a("string");
        })
        .catch(err => {
          logger.error(`Unexpected error was caught: ${err}`);
        });
    });

    it.skip("should respond 40x when id does not exist", () => {
      const testUri = `${SERVER_URI_BASE}/geography/regions/v1/bogus`;
      const rpOptions = createRpOptions(testUri);
      return rp(rpOptions)
        .then(result => {
          // Region properties
          expect(result.id).to.be.a("number");
          expect(result.name).to.be.a("string");
          expect(result.subregions).to.be.a("array");
          // Subregion properties
          expect(result.subregions[0].id).to.be.a("number");
          expect(result.subregions[0].name).to.be.a("string");
          expect(result.subregions[0].locations).to.be.a("array");
          // Location properties
          expect(result.subregions[0].locations[0].id).to.be.a("number");
          expect(result.subregions[0].locations[0].name).to.be.a("string");
          expect(result.subregions[0].locations[0].location_type).to.satisfy(
            value => value === null || typeof value === "string"
          );
          // Request metadata properties
          expect(result.self).to.be.a("string");
          expect(result.resource).to.be.a("string");
          expect(result.version).to.be.a("string");
        })
        .catch(err => {
          logger.error(`Unexpected error was caught: ${err}`);
        });
    });
  });

  describe("GET /subregions/v1/:id", () => {
    it("should respond 200 with a subregion object", () => {
      const testUri = `${SERVER_URI_BASE}/geography/subregions/v1/3`;
      const rpOptions = createRpOptions(testUri);
      return rp(rpOptions)
        .then(result => {
          // Subregion properties
          expect(result.id).to.be.a("number");
          expect(result.name).to.be.a("string");
          expect(result.region).to.be.a("string");
          expect(result.locations).to.be.a("array");
          // Location properties
          expect(result.locations[0].id).to.be.a("number");
          expect(result.locations[0].name).to.be.a("string");
          expect(result.locations[0].location_type).to.satisfy(
            value => value === null || typeof value === "string"
          );
          // Request metadata properties
          expect(result.self).to.be.a("string");
          expect(result.resource).to.be.a("string");
          expect(result.version).to.be.a("string");
        })
        .catch(err => {
          logger.error(`Unexpected error was caught: ${err}`);
        });
    });

    it.skip("should respond 40x when id does not exist", () => {
      const testUri = `${SERVER_URI_BASE}/geography/regions/v1/bogus`;
      const rpOptions = createRpOptions(testUri);
      return rp(rpOptions)
        .then(result => {
          // Region properties
          expect(result.id).to.be.a("number");
          expect(result.name).to.be.a("string");
          expect(result.subregions).to.be.a("array");
          // Subregion properties
          expect(result.subregions[0].id).to.be.a("number");
          expect(result.subregions[0].name).to.be.a("string");
          expect(result.subregions[0].locations).to.be.a("array");
          // Location properties
          expect(result.subregions[0].locations[0].id).to.be.a("number");
          expect(result.subregions[0].locations[0].name).to.be.a("string");
          expect(result.subregions[0].locations[0].location_type).to.satisfy(
            value => value === null || typeof value === "string"
          );
          // Request metadata properties
          expect(result.self).to.be.a("string");
          expect(result.resource).to.be.a("string");
          expect(result.version).to.be.a("string");
        })
        .catch(err => {
          logger.error(`Unexpected error was caught: ${err}`);
        });
    });
  });

  describe("GET /locations/v1/:id", () => {
    it("should respond 200 with a location object", () => {
      const testUri = `${SERVER_URI_BASE}/geography/locations/v1/3`;
      const rpOptions = createRpOptions(testUri);
      return rp(rpOptions)
        .then(result => {
          // Location properties
          expect(result.id).to.be.a("number");
          expect(result.name).to.be.a("string");
          expect(result.region).to.be.a("string");
          expect(result.subregion).to.be.a("string");
          expect(result.location_type).to.satisfy(
            value => value === null || typeof value === "string"
          );
          // Request metadata properties
          expect(result.self).to.be.a("string");
          expect(result.resource).to.be.a("string");
          expect(result.version).to.be.a("string");
        })
        .catch(err => {
          logger.error(`Unexpected error was caught: ${err}`);
        });
    });

    it.skip("should respond 40x when id does not exist", () => {
      const testUri = `${SERVER_URI_BASE}/geography/regions/v1/bogus`;
      const rpOptions = createRpOptions(testUri);
      return rp(rpOptions)
        .then(result => {
          // Region properties
          expect(result.id).to.be.a("number");
          expect(result.name).to.be.a("string");
          expect(result.subregions).to.be.a("array");
          // Subregion properties
          expect(result.subregions[0].id).to.be.a("number");
          expect(result.subregions[0].name).to.be.a("string");
          expect(result.subregions[0].locations).to.be.a("array");
          // Location properties
          expect(result.subregions[0].locations[0].id).to.be.a("number");
          expect(result.subregions[0].locations[0].name).to.be.a("string");
          expect(result.subregions[0].locations[0].location_type).to.satisfy(
            value => value === null || typeof value === "string"
          );
          // Request metadata properties
          expect(result.self).to.be.a("string");
          expect(result.resource).to.be.a("string");
          expect(result.version).to.be.a("string");
        })
        .catch(err => {
          logger.error(`Unexpected error was caught: ${err}`);
        });
    });
  });
});
