const { expect } = require("chai");
const { spy, stub } = require("sinon");
const rp = require("request-promise");

const {
  _defaultContextEnhancer,
  _enhancedLambdaCreator,
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

  describe("_enhancedLambdaCreator()", () => {
    const MOCK_CONTEXT = Symbol();
    const MOCK_EVENT = Symbol();

    let callbackSpy;
    let contextEnhancerStub;
    let logger;
    beforeEach(() => {
      callbackSpy = spy();
      logger = {
        trace: spy(),
        debug: spy(),
        info: spy(),
        metric: spy(),
        warn: spy(),
        error: spy(),
        fatal: spy(),
      };
      contextEnhancerStub = stub().returns({ logger });
    });

    it("should call the handler with the proper arguments, and call the callback with the promise result", () => {
      const callbackSpy = spy();
      const MOCK_RESPONSE = { statusCode: 200 };
      const curriedHandler = stub().returns(MOCK_RESPONSE);
      const handler = stub().returns(curriedHandler);
      const lambda = _enhancedLambdaCreator(() => ({ logger }))(handler);

      return lambda(MOCK_EVENT, MOCK_CONTEXT, callbackSpy).then(() => {
        expect(handler.args).to.deep.equal([[{ logger }]]);
        expect(curriedHandler.args).to.deep.equal([[MOCK_EVENT]]);
        expect(callbackSpy.args).to.deep.equal([[null, MOCK_RESPONSE]]);
        expect(logger.info.args).to.deep.equal([
          ['Received response {"statusCode":200}'],
        ]);
      });
    });

    it("should catch unexpected error", () => {
      const handler = stub().throws("Unexpected resolution");
      const lambda = _enhancedLambdaCreator(contextEnhancerStub)(handler);

      return lambda(MOCK_EVENT, MOCK_CONTEXT, callbackSpy).then(result => {
        expect(logger.error.args).to.deep.equal([
          ['{"name":"Unexpected resolution"}'],
        ]);
        expect(result).to.equal(undefined);
      });
    });
  });
});
