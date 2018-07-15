const axios = require("axios");
const url = "https://pokeapi.co/api/v2/pokemon";
let response;

exports.lambda_handler = async (event, context, callback) => {
  const pokemonId =
    event && event.queryStringParameters && event.queryStringParameters.id
      ? event.queryStringParameters.id
      : "";

  try {
    const result = await axios(`${url}/${pokemonId}`);

    response = {
      statusCode: 200,
      body: JSON.stringify({
        name: result.data.name,
        weight: result.data.weight,
        id: result.data.id
      })
    };
  } catch (err) {
    console.log(err);
    callback(err, null);
  }

  callback(null, response);
};
