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
  describe("200 happy paths", () => {
    describe("GET /regions/v1", () => {
      it("should respond with a single region resource by id", () => {
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

      it("should respond with a regions collection", () => {
        const testUri = `${SERVER_URI_BASE}/geography/regions/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            // Region properties
            expect(result.id).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.subregions).to.be.a("array");
            // Subregion properties
            result.subregions.forEach(subregion => {
              expect(subregion.id).to.be.a("number");
              expect(subregion.name).to.be.a("string");
              expect(subregion.locations).to.be.a("array");
              subregion.locations.forEach(location => {
                // Location properties
                expect(location.id).to.be.a("number");
                expect(location.name).to.be.a("string");
                expect(location.location_type).to.satisfy(
                  value => value === null || typeof value === "string"
                );
              });
            });
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

    describe("GET /subregions/v1", () => {
      it("should respond with a single subregion resource by id", () => {
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

      it("should respond with a subregions collection", () => {
        const testUri = `${SERVER_URI_BASE}/geography/locations/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Subregion properties
            expect(result.id).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.region).to.be.a("string");
            expect(result.locations).to.be.a("array");
            // Location properties
            result.locations.forEach(location => {
              expect(location.id).to.be.a("number");
              expect(location.name).to.be.a("string");
              expect(location.location_type).to.satisfy(
                value => value === null || typeof value === "string"
              );
            });
            // Request metadata properties
            expect(result.self).to.be.a("string");
            expect(result.resource).to.be.a("string");
            expect(result.version).to.be.a("string");
          })
          .catch(err => {
            logger.error(`Unexpected error was caught: ${err}`);
          });
      });

      it("should respond with a subregions collection constrained by filter", () => {
        const filter = "Akkala";
        const testUri = `${SERVER_URI_BASE}/geography/locations/v1?region=${filter}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Subregion properties
            expect(result.id).to.be.a("number");
            expect(result.name).to.be.a("string");
            expect(result.region).to.be.equal("Akkala");
            expect(result.locations).to.be.a("array");
            // Location properties
            result.locations.forEach(location => {
              expect(location.id).to.be.a("number");
              expect(location.name).to.be.a("string");
              expect(location.location_type).to.satisfy(
                value => value === null || typeof value === "string"
              );
            });
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

    describe("GET /locations/v1", () => {
      it("should respond with a single location resource by id", () => {
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

      it("should respond with a locations collection", () => {
        const testUri = `${SERVER_URI_BASE}/geography/locations/v1`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Location properties
            result.objects.forEach(location => {
              expect(location.id).to.be.a("number");
              expect(location.name).to.be.a("string");
              expect(location.region).to.be.a("string");
              expect(location.subregion).to.be.a("string");
              expect(location.location_type).to.satisfy(
                value => value === null || typeof value === "string"
              );
            });
            // Request metadata properties
            expect(result.self).to.be.a("string");
            expect(result.resource).to.be.a("string");
            expect(result.version).to.be.a("string");
          })
          .catch(err => {
            logger.error(`Unexpected error was caught: ${err}`);
          });
      });

      it("should respond with a locations collection constrained by filter", () => {
        const filter = "shrine";
        const testUri = `${SERVER_URI_BASE}/geography/locations/v1?location_type=${filter}`;
        const rpOptions = createRpOptions(testUri);
        return rp(rpOptions)
          .then(result => {
            expect(result.objects).to.be.a("array");
            // Location properties
            result.objects.forEach(location => {
              expect(location.id).to.be.a("number");
              expect(location.name).to.be.a("string");
              expect(location.region).to.be.a("string");
              expect(location.subregion).to.be.a("string");
              expect(location.location_type).to.equal(filter);
            });
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

  describe("4xx cases", () => {
    it("should respond 400 when path or id is bogus", () => {
      const testCases = [
        `${SERVER_URI_BASE}/bogus/regions/v1/3`,
        `${SERVER_URI_BASE}/geography/bogus/v1/3`,
        `${SERVER_URI_BASE}/geography/regions/bogus/3`,
        `${SERVER_URI_BASE}/geography/regions/v1/bogus`,
        `${SERVER_URI_BASE}/hocus/bogus`,
      ];

      const testRunner = testCase => {
        const rpOptions = createRpOptions(testCase);

        return rp(rpOptions)
          .then(erroneousResult => {
            logger.error(`Unexpected error was caught: ${erroneousResult}`);
          })
          .catch(result => {
            expect(result.statusCode).to.be.equal(400);
            expect(result.error.message).to.be.a("string");
          });
      };

      testCases.forEach(testRunner);
    });

    it("should respond 404 when resource for id is not found", () => {
      const testCases = [
        `${SERVER_URI_BASE}/geography/regions/v1/30`,
        `${SERVER_URI_BASE}/geography/subregions/v1/1000`,
        `${SERVER_URI_BASE}/geography/locations/v1/3000`,
      ];

      const testRunner = testCase => {
        const rpOptions = createRpOptions(testCase);

        return rp(rpOptions)
          .then(erroneousResult => {
            logger.error(`Unexpected resolution: ${erroneousResult}`);
          })
          .catch(result => {
            expect(result.statusCode).to.be.equal(404);
            expect(result.error.message).to.be.a("string");
          });
      };

      testCases.forEach(testRunner);
    });
  });
});
