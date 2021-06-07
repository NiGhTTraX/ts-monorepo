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
    // Let Babel compile outside of src/.
    const tsRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes("tsx|ts")
    );
    tsRule.include = undefined;
    tsRule.exclude = /node_modules/;

    return config;
  },
};
