import globals from "globals";
import js from "@eslint/js";
import tsEslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tsEslint.config(
  {
    ignores: [
      "node_modules",
      "!.*",
      "**/dist",
      "**/build",
      "apps/nextjs/.next",
    ],
  },

  {
    extends: [js.configs.recommended, ...tsEslint.configs.recommended],
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.node },
  },

  {
    files: [
      "apps/{nextjs,vite,storybook}/**/*.{jsx,tsx}",
      "packages/{components}/**/*.{jsx,tsx}",
    ],
    languageOptions: { globals: globals.browser },
  },

  eslintPluginPrettierRecommended,
);
