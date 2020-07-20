/* eslint-disable import/no-extraneous-dependencies */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (config) => {
  // Remove the ModuleScopePlugin which throws when we try to import something
  // outside of src/.
  config.resolve.plugins.pop();

  // Resolve the path aliases.
  config.resolve.plugins.push(new TsconfigPathsPlugin());

  // Let Babel compile outside of src/.
  const tsRule = config.module.rules[2].oneOf[1];
  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  return config;
};
