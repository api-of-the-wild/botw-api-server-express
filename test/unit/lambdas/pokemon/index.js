const { expect } = require("chai");

const { pokemon_handler } = require("../../../../src/lambdas/pokemon/index");

describe("index", () => {
  it("should export a lambda handler", () => {
    expect(pokemon_handler).to.be.an("function");
  });
});
