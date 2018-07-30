const { expect } = require("chai");

const { createLogger } = require("../../../src/utilities/logger");

describe("logger.js", () => {
  describe("createLogger()", () => {
    const logger = createLogger(console);
    it("should create new logger instance from a delegated logger, that has basic pino methods + metric", () => {
      expect(logger).to.be.not.undefined;
      expect(logger.debug).to.be.not.undefined;
      expect(logger.trace).to.be.not.undefined;
      expect(logger.info).to.be.not.undefined;
      expect(logger.metric).to.be.not.undefined;
      expect(logger.warn).to.be.not.undefined;
      expect(logger.error).to.be.not.undefined;
      expect(logger.fatal).to.be.not.undefined;
    });

    it("should log the message to console", () => {
      logger.info("testing");
      expect(logger.stream.lastMsg).to.equal("testing");
    });
  });
});
