/* eslint-disable import/no-extraneous-dependencies */
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import pkg from "./package.json";

export default defineConfig({
  input: "src/index.tsx",
  // Without this, rollup would inline our monorepo dependencies.
  external: Object.keys(pkg.dependencies),
  plugins: [
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
  ],
  output: [{ dir: "./dist", format: "cjs", sourcemap: true }],
});
