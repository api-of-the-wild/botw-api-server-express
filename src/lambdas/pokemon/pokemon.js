const url = "https://pokeapi.co/api/v2/pokemon";
let response;

const _getPokemonId = event => {
  return event && event.queryStringParameters && event.queryStringParameters.id;
};

const handler = ({ logger, request }) => async event => {
  const id = _getPokemonId(event);
  if (id === undefined || id === null) {
    response = {
      statusCode: 400,
      body: "Bad Request",
    };

    return Promise.resolve(response);
  }

  logger.info(`This is a sample log. Going to fetch pokemon with id ${id}`);

  const rpOptions = {
    uri: `${url}/${id}`,
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
      body: {
        name: result.name,
        weight: result.weight,
        id: result.id,
      },
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    response = {
      statusCode: 500,
      body: err,
    };
    return Promise.reject(response);
  }

  return Promise.resolve(response);
};

module.exports = {
  _getPokemonId,
  handler,
};
