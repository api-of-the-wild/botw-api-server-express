const { createLambda } = require("../../utilities/create_lambda");
const { handler } = require("./pokemon");

const pokemon = createLambda(handler);

module.exports = {
  pokemon,
};
