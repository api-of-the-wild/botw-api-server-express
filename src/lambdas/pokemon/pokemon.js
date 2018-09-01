const _getPokemonId = event => {
  return event && event.queryStringParameters && event.queryStringParameters.id;
};

const handler = ({ logger, env, request }) => async event => {
  let response;
  const id = _getPokemonId(event);
  if (id === undefined || id === null) {
    response = {
      statusCode: 400,
      body: JSON.stringify({ message: "Bad Request" }),
    };
    logger.warn(`Got bad id: ${id}`);
    return Promise.resolve(response);
  }

  const POKEAPI_BASE_URI = env.POKEAPI_BASE_URI || "https://pokeapi.co";
  const POKEAPI_POKEMON_V2 = "api/v2/pokemon";
  const uri = `${POKEAPI_BASE_URI}/${POKEAPI_POKEMON_V2}/${id}`;
  logger.info(`uri: ${uri}`);

  const rpOptions = {
    uri,
    headers: {
      "User-Agent": "Request-Promise",
    },
    json: true, // Automatically parses the JSON string in the response
  };

  try {
    const result = await request(rpOptions);
    logger.info(`Got ${result.name}, id ${result.id}`);

    response = {
      statusCode: 200,
      body: JSON.stringify({
        name: result.name,
        weight: result.weight,
        id: result.id,
      }),
    };
  } catch (err) {
    logger.error(err);
    response = {
      statusCode: 500,
      body: JSON.stringify(err.name),
    };
    return Promise.resolve(response);
  }
  return Promise.resolve(response);
};

module.exports = {
  _getPokemonId,
  handler,
};
