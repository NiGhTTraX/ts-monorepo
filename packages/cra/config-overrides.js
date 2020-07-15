const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = function override(config) {
  // Remove the ModuleScopePlugin which throws when we try to import something
  // outside of src/.
  config.resolve.plugins.pop();

  // Resolve the path aliases.
  config.resolve.plugins.push(new TsconfigPathsPlugin());

  // Let Babel compile outside of src/. The rule could be searched for to make
  // it more reliable against react-scripts updates.
  const tsRule = config.module.rules[2].oneOf[1];
  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  return config;
};
