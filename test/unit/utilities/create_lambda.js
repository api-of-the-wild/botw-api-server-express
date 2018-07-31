const { expect } = require("chai");
const rp = require("request-promise");

const {
  _defaultContextEnhancer,
  _enhancedLambdaCreator,
  createLambda,
} = require("../../../src/utilities/create_lambda");

describe("create_lambda.js", () => {
  describe("_defaultContextEnhancer()", () => {
    it("should bundle up all useful utilities", () => {
      const mockAwsContext = {};
      const testContext = _defaultContextEnhancer(mockAwsContext);

      // Here referentially equality checks got the right thing:
      expect(testContext.awsContext).to.equal(mockAwsContext);
      expect(testContext.env).to.equal(process.env);
      expect(testContext.request).to.equal(rp);

      // Here we just try to be reasonably sure this is correct:
      expect(testContext.logger.info).to.be.a("function");
    });
  });
});
