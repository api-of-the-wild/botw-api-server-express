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
    prod: {},
  },
  app: {
    local: {
      host: "https://localhost:3001",
    },
    docker: {
      host: "http://localhost:3001",
    },
    prod: {},
  },
};
