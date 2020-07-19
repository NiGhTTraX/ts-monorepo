/* eslint-disable import/no-extraneous-dependencies */
const withTM = require("next-transpile-modules")(
  // List all of your dependencies.
  ["components"]
);

module.exports = withTM();
