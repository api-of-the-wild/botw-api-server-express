const massive = require("massive");
const config = require("./config").postgres;

const STAGE = process.env.STAGE || "dev";

console.log(STAGE);
console.log(config[STAGE].host);
console.log(config[STAGE].port);

const connectionObj = {
  host: config[STAGE].host,
  port: config[STAGE].port,
  database: config[STAGE].database,
  user: config[STAGE].user,
  password: config[STAGE].password,
};

module.exports = massive(connectionObj);
