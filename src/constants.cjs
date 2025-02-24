exports.SETTING_NAME_PREFIX = '@kornsupadej-eslint-setting'
exports.SETTING_TYPES = Object.freeze({
  CJS: 'cjs',
  ESM: 'esm',
  NODEJS: 'nodejs',
  MOCHA: 'mocha',
  JEST: 'jest',
  VITEST: 'vitest',
})
exports.CJS_FILES = Object.freeze(['**/*.cjs'])
exports.ESM_FILES = Object.freeze([['**/*.mjs']])
exports.ALL_JS_FILES = Object.freeze(['**/*.?(c|m)[j]s?(x)'])
exports.ALL_TS_FILES = Object.freeze(['**/*.?(c|m)[t]s?(x)'])
exports.ALL_TEST_FILES = Object.freeze(['**/*.{test,spec}.?(c|m)[jt]s?(x)'])
exports.ALL_IGNORE_FILES = Object.freeze([
  '**/node_modules/',
  '.git/',
  '**/dist/',
  'eslint.config.?(c|m)[jt]s',
])
