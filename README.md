<!--suppress HtmlDeprecatedAttribute -->
<div align="center">

![](media/monorepo.png)

Template project for setting up a TypeScript monorepo

[![tests](https://github.com/NiGhTTraX/ts-monorepo/actions/workflows/tests.yml/badge.svg)](https://github.com/NiGhTTraX/ts-monorepo/actions/workflows/tests.yml)

</div>

----

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of content**

- [Features](#features)
- [Setup](#setup)
- [Docs](#docs)
- [Packages vs apps](#packages-vs-apps)
- [Integrations](#integrations)
  - [ts-node](#ts-node)
  - [Babel](#babel)
  - [webpack](#webpack)
  - [jest](#jest)
  - [create-react-app](#create-react-app)
  - [Vite](#vite)
  - [NextJS](#nextjs)
  - [NestJS](#nestjs)
  - [Storybook](#storybook)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

> The main focus of this repo is making the **`Go to definition`** feature in IDEs work without any surprises, meaning it will work after a fresh clone without needing to build the project.

![find-usage](./media/find-usage.gif)

> The secondary focus is to remove surprises when **publishing** packages. The repo is set up so that each package gets a clean build output without any artifacts from other packages.

![build-output](./media/build-output.png)

> Everything else is kept to a **minimum**. Apart from my personal [ESLint config](.eslintrc.js) to keep the code clean, there are no extra tools included — you're free to customize this to your own needs after cloning. Compilation targets, module systems, tree shaking etc. are left up to you to decide.

## Setup

This repo uses [pnpm](https://pnpm.io/), but should work fine with any of the following:

- [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- [npm 7 workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [npm < 7 and `lerna bootstrap`](https://github.com/lerna/lerna/blob/main/commands/bootstrap/README.md)

I strongly recommend `pnpm` over the other solutions, not only because it's usually faster, but because it avoids dependency problems caused by hoisting (see https://github.com/NiGhTTraX/ts-monorepo/commit/d93139166b25fab15e9538df58a7d06270b846c9 as an example).

```sh
# Install pnpm with your preferred method: https://pnpm.io/installation.
npm i -g pnpm

# Install all dependencies.
pnpm i
```

## Docs

See the following blog posts:

- [How to set up a TypeScript monorepo and make Go to definition work](https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559)
- [Making TypeScript monorepos play nice with other tools](https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680)

If you're looking for the project references solution checkout the [`project-references`](https://github.com/NiGhTTraX/ts-monorepo/tree/project-references) branch.

## Packages vs apps

This repo contains two types of workspaces:

- `packages`: meant to be published to npm and installed,
- `apps`: meant to be executed.

A good example to illustrate the difference is `create-react-app`: you wouldn't publish an app like this to npm, you would run it, more specifically you would build the JS bundle and then deploy that somewhere.

For packages, you don't want to bundle all the monorepo dependencies, and instead publish them individually. That's why packages have a separate build `tsconfig.json` that resolves monorepo dependencies to `node_modules`.

## Integrations

### ts-node

Use [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) to resolve the path aliases at runtime:

```json
{
  "scripts": {
    "start": "ts-node -r tsconfig-paths/register src/index.ts"
  }
}
```

See the full example [here](apps/ts-node).

### Babel

Use [babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver) to resolve the path aliases:

```js
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
          "^@nighttrax/(.+)": "../\\1/src",
        },
      },
    ],
  ],
};
```

See the full example [here](apps/jest-babel).

### webpack

Use [tsconfig-paths-webpack-plugin](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin) to resolve the path aliases:

```js
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  resolve: {
    plugins: [new TsconfigPathsPlugin()]
  }
};
```

See the full example [here](apps/webpack).

### jest

If you use `Babel` then see [this example](apps/jest-babel) from the [Babel](#babel) section above.

If you use [ts-jest](https://github.com/kulshekhar/ts-jest) then you can use its `pathsToModuleNameMapper` helper: 

```js
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../../tsconfig.json");

module.exports = {
  preset: "ts-jest",

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    // This has to match the baseUrl defined in tsconfig.json.
    prefix: "<rootDir>/../../",
  }),
};
```

See the full example [here](apps/jest-tsjest).

### create-react-app

Use [craco](https://www.npmjs.com/package/@craco/craco) or [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) to extend CRA's webpack config and apply the [tsconfig-paths-webpack-plugin](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin):

```js
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (config) => {
  // Remove the ModuleScopePlugin which throws when we
  // try to import something outside of src/.
  config.resolve.plugins.pop();

  // Resolve the path aliases.
  config.resolve.plugins.push(new TsconfigPathsPlugin());

  // Let Babel compile outside of src/.
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
    const tsRule = oneOfRule.oneOf.find((rule) =>
      rule.test.toString().includes("ts|tsx")
    );
  tsRule.include = undefined;
  tsRule.exclude = /node_modules/;

  return config;
};
```

See the full example [here](apps/cra). For tests, see the [jest example](#jest).

### Vite

Use [vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths) in the Vite config:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths()
  ],
});
```

See full example [here](apps/vite).

### NextJS

Extend Next's webpack config to enable compiling packages from the monorepo:

```js
module.exports = {
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
```

See the full example [here](apps/nextjs).

### NestJS

Include the path aliases in both `tsconfig.json` and `tsconfig.build.json` and tell NestJS where to find the `main.js` file:

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "entryFile": "apps/nestjs/src/main"
}
```

See the full example [here](apps/nestjs).

### Storybook

[Extend Storybook's webpack config](https://storybook.js.org/docs/react/builders/webpack#typescript-module-resolution) and apply the [tsconfig-paths-webpack-plugin](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin):

```js
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    return config;
  },
};
```

See the full example [here](apps/storybook).
