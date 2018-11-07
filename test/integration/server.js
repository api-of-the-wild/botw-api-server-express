/* eslint-disable */
const { expect } = require("chai");
const rp = require("request-promise");

const config = require("../../config.env");
const { createLogger } = require("../../src/utilities/logger");

const logger = createLogger(console);

const env = process.env;
const INTEGRATION_STAGE = env.INTEGRATION_STAGE || "ALPHA";
const SERVER_URI_BASE =
  env.SERVER_URI_BASE || config.app[INTEGRATION_STAGE].host;

describe("the application server", () => {
  describe("GET /", () => {});
});
