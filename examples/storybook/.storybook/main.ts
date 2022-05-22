import type { StorybookConfig } from "@storybook/core-common";
// eslint-disable-next-line import/no-extraneous-dependencies
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: ["../src/*.stories.tsx"],
  addons: [],
  framework: "@storybook/react",
  core: { builder: "webpack5" },
  webpackFinal: async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];

    return config;
  },
};

export default config;
