exports.SETTING_TYPES = Object.freeze({
  CJS: "cjs",
  ESM: "esm",
  NODEJS: "nodejs",
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
exports.SETTING_NAME_PREFIX = "@kornsupadej-eslint-setting";
