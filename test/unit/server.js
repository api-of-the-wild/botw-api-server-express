const { expect } = require("chai");

const { server } = require("../../src/server");

describe("server.js", () => {
  it("should be a function", () => {
    expect(server).to.be.a("function");
  });
});
