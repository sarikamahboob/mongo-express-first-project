import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"]
  },
  // {
  //   extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  // },
  {
    languageOptions: {
      globals: globals.node,
      parser: "@typescript-eslint/parser",
    },
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undefined": "error",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];