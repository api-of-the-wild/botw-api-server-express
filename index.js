const { hello } = require("./src/lambdas/hello_world/index");
const { pokemon_handler } = require("./src/lambdas/pokemon/index");

module.exports = {
  hello,
  pokemon_handler,
};
