"use strict";

const {
  _getPokemonId,
  lambda_handler,
} = require("../../../../src/lambdas/pokemon/index");
const { expect } = require("chai");
const uuid = require("uuid");

describe("pokemon/index.js", function() {
  const EVENT_VALID = {
    queryStringParameters: {
      id: uuid(),
    },
  };
  const EVENT_INVALID = {};

  describe("_getPokemonId", () => {
    it("returns id from valid event", () => {
      const id = _getPokemonId(EVENT_VALID);
      expect(id).to.deep.equal(EVENT_VALID.queryStringParameters.id);
    });

    it("returns empty string from invalid event", () => {
      const id = _getPokemonId(EVENT_INVALID);
      expect(id).to.deep.equal("");
    });
  });

  describe("lambda_handler", () => {
    const EVENT_VALID = {
      queryStringParameters: {
        id: "1",
      },
    };

    it("returns pokemon response block from valid event", async () => {
      const response = await lambda_handler(
        EVENT_VALID,
        context,
        (err, result) => {
          expect(result).to.be.an("object");
          expect(result.statusCode).to.equal(200);
          expect(result.body).to.be.an("string");

          let body = JSON.parse(result.body);

          expect(body).to.be.an("object");
          expect(body.name).to.be.a("string");
          expect(body.weight).to.be.a("number");
          expect(body.id).to.be.a("number");
        }
      );
    });
  });
});
