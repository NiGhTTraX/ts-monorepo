module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],

  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "^@components/hooks/(.+)": "./src/hooks/\\1",
        },
      },
    ],
  ],
};
