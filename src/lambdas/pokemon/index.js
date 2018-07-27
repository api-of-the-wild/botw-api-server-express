const axios = require("axios");
const url = "https://pokeapi.co/api/v2/pokemon";
let response;

const _getPokemonId = event => {
  const id =
    event && event.queryStringParameters && event.queryStringParameters.id
      ? event.queryStringParameters.id
      : "";
  return id;
};

const lambda_handler = async (event, context, callback) => {
  const id = _getPokemonId(event);
  try {
    const result = await axios(`${url}/${id}`);

    response = {
      statusCode: 200,
      body: JSON.stringify({
        name: result.data.name,
        weight: result.data.weight,
        id: result.data.id,
      }),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    callback(err, null);
  }

  callback(null, response);
};

module.exports = {
  _getPokemonId,
  lambda_handler,
};
