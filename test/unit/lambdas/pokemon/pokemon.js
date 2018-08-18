const { spy, stub } = require("sinon");

const {
  _getPokemonId,
  handler,
} = require("../../../../src/lambdas/pokemon/pokemon");
const { expect } = require("chai");
const uuid = require("uuid");

describe("pokemon/pokemon.js", function() {
  describe("_getPokemonId()", () => {
    const EVENT_VALID = {
      queryStringParameters: {
        id: uuid(),
      },
    };
    const EVENT_INVALID = {};

    it("returns id from valid event", () => {
      const id = _getPokemonId(EVENT_VALID);
      expect(id).to.deep.equal(EVENT_VALID.queryStringParameters.id);
    });

    it("returns undefined from invalid event", () => {
      const id = _getPokemonId(EVENT_INVALID);
      expect(id).to.deep.equal(undefined);
    });
  });

  describe("handler()", () => {
    const randomInt = Math.floor(Math.random() * (200 - 1 + 1)) + 1;

    let MOCK_EVENT;
    let loggerSpy;
    let requestSpy;

    beforeEach(() => {
      MOCK_EVENT = {
        queryStringParameters: {
          id: randomInt,
        },
      };
      loggerSpy = {
        trace: spy(),
        debug: spy(),
        info: spy(),
        metric: spy(),
        warn: spy(),
        error: spy(),
        fatal: spy(),
      };
      requestSpy = stub().returns({
        name: uuid(),
        weight: uuid(),
        id: MOCK_EVENT.queryStringParameters.id,
      });
    });

    it("should return 200 response block from valid event", () => {
      const lambda = handler({ logger: loggerSpy, request: requestSpy });
      return lambda(MOCK_EVENT).then(response => {
        expect(requestSpy.args).to.deep.equal([
          [
            {
              uri: `https://pokeapi.co/api/v2/pokemon/${
                MOCK_EVENT.queryStringParameters.id
              }`,
              headers: {
                "User-Agent": "Request-Promise",
              },
              json: true,
            },
          ],
        ]);
        expect(response.statusCode).to.deep.equal(200);
        expect(response.body.id).to.deep.equal(
          MOCK_EVENT.queryStringParameters.id
        );
        expect(response.body.name).to.exist;
        expect(response.body.weight).to.exist;

        // logger.info test
        expect(loggerSpy.info.called).to.be.true;
      });
    });

    it("should return bad request 400 if id is undefined or null", () => {
      const lambda = handler({ logger: loggerSpy, request: requestSpy });

      const testCases = [{}, { queryStringParameters: { id: null } }];

      const testRunner = mockEvent => {
        return lambda(mockEvent).then(errorResponse => {
          expect(errorResponse.statusCode).to.deep.equal(400);
          expect(errorResponse.body).to.deep.equal("Bad Request");
          expect(loggerSpy.warn.called).to.be.true;
        });
      };

      testCases.forEach(testRunner);
    });

    it("should return server error 500 if try block fails", () => {
      const badRequestStub = stub().throws("Server error");
      const lambda = handler({ logger: loggerSpy, request: badRequestStub });

      return lambda(MOCK_EVENT).then(errorResponse => {
        expect(errorResponse.statusCode).to.deep.equal(500);
        expect(errorResponse.body).to.deep.equal("Server error");
        expect(loggerSpy.error.called).to.be.true;
      });
    });
  });
});
