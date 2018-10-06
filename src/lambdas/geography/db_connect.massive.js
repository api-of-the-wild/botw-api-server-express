const massive = require("massive");
const config = require("../../config").postgres;

let db;

const getDb = () => {
  if (db) {
    return db;
  }

  return massive({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
  }).then(instance => {
    db = instance;

    return Promise.resolve(db);
  });
};

// const getDbSimple = () => {
//   return massive({
//     host: config.host,
//     port: config.port,
//     database: config.database,
//     user: config.user,
//     password: config.password,
//   });
// };

module.exports = { getDb };
