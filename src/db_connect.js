const massive = require("massive");
const config = require("./config").postgres;
const connectionObj = {
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
};

module.exports = massive(connectionObj);
