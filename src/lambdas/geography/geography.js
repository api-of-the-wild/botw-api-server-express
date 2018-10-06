const { getDb } = require("./db_connect.massive");

const db = getDb()
  .then(db => {
    console.log(db.listTables());

    // don't pass the instance
    return Promise.resolve();
  })
  .catch(err => console.log(err));

const handler = ({ logger, env, request }) => async event => {
  // const db = getDb().catch(err => console.log(err));
  logger.info(event);
  let response;
  try {
    const total = await getDb().then(db => {
      return db.regions.count();
    });
    response = {
      statusCode: 200,
      body: JSON.stringify({ message: total }),
    };
  } catch (err) {
    logger.error(err);
    response = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err.message),
    };
    return Promise.resolve(response);
  }

  return Promise.resolve(response);
};

module.exports = {
  handler,
};
