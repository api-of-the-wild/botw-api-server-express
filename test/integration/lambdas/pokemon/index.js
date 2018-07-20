"use strict";

const {
  _getPokemonId,
  lambda_handler,
} = require("../../../../src/lambdas/pokemon/index");
const { expect } = require("chai");

describe("pokemon/index.js", () => {
  // describe("lambda_handler", () => {
  //   const EVENT_VALID = {
  //     queryStringParameters: {
  //       id: 1
  //     }
  //   };
  //   it("returns pokemon response block from valid event", () => {
  //     const response = await lambda_handler(EVENT_VALID, context, (err, result) => {
  //       expect(response).to.be.an("object");
  //       expect(result.statusCode).to.equal(200);
  //       expect(result.body).to.be.an("string");
  //       let body = JSON.parse(response.body);
  //       expect(body).to.be.an("object");
  //       expect(body.name).to.be.a("string");
  //       expect(body.weight).to.be.a("number");
  //       expect(body.id).to.be.a("number");
  //     })
  //   })
  // });
});
