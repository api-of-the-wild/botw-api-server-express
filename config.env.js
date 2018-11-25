const path = require("path");

module.exports = {
  depcheck: {
    projectPath: __dirname,
    markdownOutputFile: path.join(__dirname, "reports/depcheck.md"),
    options: {
      ignoreMatches: [
        "eslint",
        "eslint-config-prettier",
        "eslint-plugin-prettier",
        "eslint-config-plugin:prettier",
        "mocha",
        "mochawesome",
        "nyc",
        "prettier",
      ],
    },
  },
  postgres: {
    dev: {
      host: "localhost",
      port: 5432,
      database: "botw",
      user: "admin",
      password: "password",
    },
    test: {
      host: "db",
      port: 5432,
      database: "botw",
      user: "admin",
      password: "password",
    },
    prod: {
      host: "ad1375259bnjkgw.cthhrssqz0g0.us-west-2.rds.amazonaws.com",
      port: 5432,
      user: "kwhitejr",
      password: "password",
      database: "botw",
    },
  },
  app: {
    local: {
      host: "http://localhost:3001",
    },
    // docker
    ALPHA: {
      host: "http://localhost:3001",
    },
    BETA: {},
  },
};
