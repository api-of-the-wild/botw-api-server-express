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
    let logger;
    let requestSpy;

    beforeEach(() => {
      MOCK_EVENT = {
        queryStringParameters: {
          id: randomInt,
        },
      };
      logger = {
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

    it("returns pokemon response block from valid event", () => {
      const lambda = handler({ logger, request: requestSpy });

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
      });
    });
  });
});
