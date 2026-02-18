import { pathsToModuleNameMapper } from "ts-jest";
// Load the config which holds the path aliases.
import tsConfig from "../../tsconfig.json" with { type: "json" };

/** @type {import('@jest/types').Config} */
const config = {
  preset: "ts-jest",

  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, {
    // This has to match the baseUrl defined in tsconfig.json.
    prefix: "<rootDir>/../../",
  }),
};

export default config;
