import { StorybookConfig } from "@storybook/react-webpack5";
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
