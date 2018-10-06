const { hello } = require("./src/lambdas/hello_world/index");
const { pokemon_handler } = require("./src/lambdas/pokemon/index");
// const { geography_handler } = require("./src/lambdas/geography/index");

module.exports = {
  hello,
  pokemon_handler,
  // geography_handler,
};
