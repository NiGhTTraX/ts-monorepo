/* eslint-disable import/no-extraneous-dependencies */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (config) => {
  // Remove the ModuleScopePlugin which throws when we try to import something
  // outside of src/.
  config.resolve.plugins.pop();

  // Resolve the path aliases.
  config.resolve.plugins.push(new TsconfigPathsPlugin());

  // Let Babel compile outside of src/.
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
  const tsRule = oneOfRule.oneOf.find((rule) =>
    rule.test.toString().includes("ts|tsx")
  );
  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  // Use newer version of ForkTSCheckerWebpackPlugin to type check
  // files across the monorepo.
  const forkTsCheckerWebpackPlugin = config.plugins.findIndex(
    (p) => p.reportFiles
  );
  if (forkTsCheckerWebpackPlugin !== -1) {
    config.plugins.splice(
      forkTsCheckerWebpackPlugin,
      1,
      new ForkTSCheckerWebpackPlugin({
        issue: {
          // The exclude rules are copied from CRA.
          exclude: [
            {
              file: "**/src/**/__tests__/**",
            },
            {
              file: "**/src/**/?(*.)(spec|test).*",
            },
            {
              file: "**/src/setupProxy.*",
            },
            {
              file: "**/src/setupTests.*",
            },
          ],
        },
      })
    );
  }

  return config;
};
