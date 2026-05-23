import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  core: {
    disableTelemetry: true,
  },
  framework: "@storybook/react-vite",
  viteFinal: (config) => {
    config.resolve ??= {};
    config.resolve.tsconfigPaths = true;

    return config;
  },
};

export default config;
