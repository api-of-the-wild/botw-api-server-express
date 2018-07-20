module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  globals: {
    bench: true,
  },
  plugins: ["json"],
  rules: {
    eqeqeq: ["error", "always", { null: "ignore" }],
  },
};
