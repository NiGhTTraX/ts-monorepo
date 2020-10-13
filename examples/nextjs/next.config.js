const path = require("path");

/* eslint-disable import/no-extraneous-dependencies */
const withTM = require("next-transpile-modules")(
  // All of the packages will resolve to our monorepo so we can match that path.
  [path.resolve(__dirname, "../../packages")]
);

// Set target for compatibility with Vercel/Now deployments:
// Source: https://github.com/vercel/vercel/blob/master/errors/now-next-no-serverless-pages-built.md
module.exports = withTM({
  target: "serverless",
});
