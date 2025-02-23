exports.SETTING_NAME_PREFIX = "@kornsupadej-eslint-setting";
exports.SETTING_TYPES = Object.freeze({
  CJS: "cjs",
  ESM: "esm",
  NODEJS: "nodejs",
  MOCHA: "mocha",
  JEST: "jest",
  VITEST: "vitest",
});
exports.CJS_FILES = Object.freeze(["**/*.js", "**/*.cjs"]);
exports.ESM_FILES = Object.freeze([["**/*.js", "**/*.mjs"]]);
exports.ALL_JS_FILES = Object.freeze([
  "**/*.js",
  "**/*.jsx",
  "**/*.mjs",
  "**/*.cjs",
]);
exports.ALL_TS_FILES = Object.freeze([
  "**/*.ts",
  "**/*.tsx",
  "**/*.mts",
  "**/*.cts",
]);
exports.ALL_TEST_FILES = Object.freeze(["**/*.{test,spec}.?(c|m)[jt]s?(x)"]);
exports.ALL_IGNORE_FILES = Object.freeze([
  "**/node_modules/",
  ".git/",
  "**/dist/",
  "eslint.config.?(c|m)[jt]s",
]);
