"use strict";
const { createLambda } = require("../../utilities/create_lambda");
const { handler } = require("./geography");

const geography_handler = createLambda(handler);

module.exports = {
  geography_handler,
};
