const rp = require("request-promise");
const errors = require("request-promise/errors");
const { expect } = require("chai");
const { retryService } = require("../../src/utilities/retry_service");

const RESPONSE_200 = require("../../mappings/pokemon_200.json");
const RESPONSE_404 = require("../../mappings/pokemon_404.json");

const TIMEOUT_MS = 25000;
const env = process.env;
env.INTEGRATION_STAGE = env.INTEGRATION_STAGE || "DEV";

let lambdaBaseUri, wiremockBaseUri;

describe(`Integration tests (ENV: ${env.INTEGRATION_STAGE})`, () => {
  before("Check for services", function() {
    if (env.LAMBDA_URI_BASE !== undefined && env.INTEGRATION_STAGE === "BETA") {
      lambdaBaseUri = `${env.LAMBDA_URI_BASE}`;

      return Promise.resolve();
    }

    this.timeout(TIMEOUT_MS + 5000);

    wiremockBaseUri = `http://localhost:${env.WIREMOCK_PORT}`;
    lambdaBaseUri = `http://localhost:${env.SAM_LOCAL_PORT}`;

    return Promise.resolve()
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(
          `Looking for wiremock at ${wiremockBaseUri}/__admin/mappings`
        );
        return retryService(wiremockBaseUri + "/__admin/mappings", {
          timeoutMs: TIMEOUT_MS,
        });
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`Looking for lambda at ${lambdaBaseUri}/pokemon?id=6`);
        return retryService(lambdaBaseUri + "/pokemon?id=6", {
          timeoutMs: TIMEOUT_MS,
        });
      })
      .catch(rej => {
        throw new Error("retryService() failure", rej);
      });
  });

  describe("GET /pokemon", () => {
    it("should return 200 with response data", function() {
      this.timeout(TIMEOUT_MS);
      const uri = lambdaBaseUri + "/pokemon?id=6";
      const expected = {
        body: RESPONSE_200.response.jsonBody,
        statusCode: 200,
      };
      return rp({
        uri,
        method: "GET",
        resolveWithFullResponse: true,
        followAllRedirects: true,
      }).then(response => {
        expect(response.statusCode).to.deep.equal(expected.statusCode);
        expect(JSON.parse(response.body).name).to.deep.equal(
          expected.body.name
        );
        expect(JSON.parse(response.body).weight).to.deep.equal(
          expected.body.weight
        );
        expect(JSON.parse(response.body).id).to.deep.equal(expected.body.id);
        expect(JSON.parse(response.body)).to.not.have.property("moves");
      });
    });

    it("should return 404 when id is bad", function() {
      this.timeout(TIMEOUT_MS);
      const uri = lambdaBaseUri + "/pokemon?id=bad_id";
      const expected = {
        body: RESPONSE_404.response.jsonBody,
        statusCode: 404,
      };
      return rp({
        uri,
        method: "GET",
        followAllRedirects: true,
      }).catch(errors.StatusCodeError, err => {
        expect(err.response.statusCode).to.deep.equal(expected.statusCode);
        expect(err.response.statusMessage).to.deep.equal(expected.body);
      });
    });
  });
});
