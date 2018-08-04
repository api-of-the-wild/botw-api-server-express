const { hello } = require("./src/lambdas/hello_world/index");
const { pokemon } = require("./src/lambdas/pokemon/index");

module.exports = {
  hello,
  pokemon,
};
