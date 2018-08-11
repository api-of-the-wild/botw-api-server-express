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
};
