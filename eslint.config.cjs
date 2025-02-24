const configPrerttier = require('eslint-config-prettier')
const pluginComments = require('eslint-plugin-eslint-comments')
const globals = require('globals')
const js = require('@eslint/js')
const pluginMocha = require('eslint-plugin-mocha')

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { files: ['**/*.cjs'] },
  {
    ignores: ['.coverage', '.nyc_output'],
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
    /** override rules */
    rules: {
      ...js.configs.recommended.rules,
      'constructor-super': 'off',
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
    /** override rules */
    rules: {
      ...pluginMocha.configs.flat.recommended.rules,
      'mocha/no-mocha-arrows': 'off',
    },
  },

  configPrerttier,
]
