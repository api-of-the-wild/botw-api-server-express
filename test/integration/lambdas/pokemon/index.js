const rp = require("request-promise");
const { expect } = require("chai");
const { retryService } = require("../../../../src/utilities/retry_service");

const RESPONSE_200 = require("../../../../mappings/pokemon_200.json");

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
        return retryService(wiremockBaseUri + "/__admin/mappings", {
          timeoutMs: TIMEOUT_MS,
        });
      })
      .then(() => {
        return retryService(lambdaBaseUri + "/pokemon?id=6", {
          timeoutMs: TIMEOUT_MS,
        });
      });
    // .catch(rej => {
    //   console.log("retry rejection", rej);
    // });
  });

  describe("GET /pokemon", () => {
    it("should return 200 with response data", function() {
      this.timeout(25000);
      const uri = lambdaBaseUri + "/pokemon?id=6";
      const expected = RESPONSE_200.response.jsonBody;
      return rp({ uri }).then(response => {
        console.log("RESPONSE", JSON.parse(response));
        expect(JSON.parse(response).name).to.deep.equal(expected.name);
        expect(JSON.parse(response).weight).to.deep.equal(expected.weight);
        expect(JSON.parse(response).id).to.deep.equal(expected.id);
        // expect response to not have property `moves`
      });
    });
  });
});
