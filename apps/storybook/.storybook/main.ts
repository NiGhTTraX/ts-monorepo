import { StorybookConfig } from "@storybook/react-webpack5";
import assert from "node:assert";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: ["../src/*.stories.tsx"],
  addons: [],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  typescript: {
    check: true,
  },
  webpackFinal: async (config) => {
    assert(config.resolve, "Can't extend the Storybook config");

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
