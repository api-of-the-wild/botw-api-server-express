const massive = require("massive");
const config = require("../config.env").postgres;

const STAGE = process.env.STAGE || "dev";

const connectionObj = {
  host: config[STAGE].host,
  port: config[STAGE].port,
  database: config[STAGE].database,
  user: config[STAGE].user,
  password: config[STAGE].password,
};

module.exports = massive(connectionObj);
