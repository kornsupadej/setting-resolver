const configPrerttier = require('eslint-config-prettier')
const pluginComments = require('eslint-plugin-eslint-comments')
const globals = require('globals')
const js = require('@eslint/js')
const pluginMocha = require('eslint-plugin-mocha')

const ignores = `
**/node_modules/*
.changeset
.husky
# nyc coverage report/output folder
.coverage
.nyc_output
# transpiled output
lib
`
  .split('\n')
  .filter(pattern => pattern && !pattern.startsWith('#')) // filer comments starts with #

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { files: ['**/*.cjs'] },
  {
    ignores,
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    name: 'eslint/eslint-recommended',
    ...js.configs.recommended,
    rules: {
      ...js.configs.recommended.rules,
      'constructor-super': 'off',
      /** override rules */
      'no-dupe-class-members': 'off',
    },
  },
  {
    name: 'eslint/eslint-comments',
    plugins: {
      'eslint-comments': pluginComments,
    },
    rules: {
      ...pluginComments.configs.recommended.rules,
    },
  },
  {
    name: 'eslint/mocha',
    ...pluginMocha.configs.flat.recommended,
    files: ['specs/**/*.spec.cjs'],
    rules: {
      ...pluginMocha.configs.flat.recommended.rules,
      /** override rules */
      'mocha/no-mocha-arrows': 'off',
    },
  },
  configPrerttier,
]
