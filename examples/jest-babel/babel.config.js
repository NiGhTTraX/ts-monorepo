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
          "^@nighttrax/(.+)": "../../packages/\\1/src",
        },
      },
    ],
  ],
};
