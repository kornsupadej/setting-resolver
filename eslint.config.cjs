const globals = require("globals");
const js = require("@eslint/js");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { files: ["**/*.cjs"] },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  {
    name: "eslint/eslint-recommended",
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
