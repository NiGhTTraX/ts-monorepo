const path = require("path");

/* eslint-disable import/no-extraneous-dependencies */
const withTM = require("next-transpile-modules")(
  // All of the packages will resolve to our monorepo so we can match that path.
  [path.resolve(__dirname, "../../packages")]
);

module.exports = withTM();
