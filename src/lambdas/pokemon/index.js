const { createLambda } = require("../../utilities/create_lambda");
const { handler } = require("./pokemon");

const pokemon_handler = createLambda(handler);

module.exports = {
  pokemon_handler,
};
