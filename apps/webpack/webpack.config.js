// eslint-disable-next-line @typescript-eslint/no-require-imports
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { configFile: "tsconfig.build.json" },
      },
    ],
  },
};
