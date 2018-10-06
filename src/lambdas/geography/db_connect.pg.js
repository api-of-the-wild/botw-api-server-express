const { Pool, Client } = require("pg");
const config = require("../../config").postgres;

const pool = new Pool({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
});

const client = new Client({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
});

module.exports = {
  pool,
  client,
};
