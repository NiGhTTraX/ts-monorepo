const isNext12 = (config) => !!config.module.rules.find((rule) => rule.oneOf);

const updateNextGreaterThan12Config = (config) => {
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);

  // Next 12 has multiple TS loaders, and we need to update all of them.
  const tsRules = oneOfRule.oneOf.filter(
    (rule) => rule.test && rule.test.toString().includes("tsx|ts")
  );

  tsRules.forEach((rule) => {
    // eslint-disable-next-line no-param-reassign
    rule.include = undefined;
  });

  return config;
};

const updateNextLessThan12Config = (config) => {
  // Next < 12 uses a single Babel loader.
  const tsRule = config.module.rules.find(
    (rule) => rule.test && rule.test.toString().includes("tsx|ts")
  );

  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  return config;
};

module.exports = {
  /**
   * You can use the following experimental flag if you're on Next >= 10.1.0.
   * Note that this can change/break without warning.
   * @see https://github.com/vercel/next.js/pull/22867
   */
  // experimental: {
  //   externalDir: true,
  // },
  webpack: (config) => {
    if (isNext12(config)) {
      return updateNextGreaterThan12Config(config);
    }

    return updateNextLessThan12Config(config);
  },
};
