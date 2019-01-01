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
    prod: {},
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
  enums: {
    WEAPON_TYPE_ENUM: [
      "arm",
      "axe",
      "bat",
      "boomerang",
      "carver",
      "club",
      "crusher",
      "hammer",
      "leaf",
      "polearm",
      "rod",
      "sickle",
      "spear",
      "sword",
    ],
    WEAPON_HANDS_ENUM: ["1", "2"],
    BOOLEAN_ENUM: ["true", "false"],
    LOCATION_TYPE_ENUM: [
      "null",
      "shrine",
      "stable",
      "village",
      "tower",
      "fountain",
      "spring",
    ],
  },
  paths: {
    VALID_PATHS: {
      geography: ["regions", "subregions", "locations"],
      compendium: ["materials", "weapons", "bows", "arrows", "shields"],
    },
    VALID_VERSIONS: ["v1"],
  },
};
