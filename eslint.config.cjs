const globals = require('globals')
const js = require('@eslint/js')
const pluginMocha = require('eslint-plugin-mocha')
const configPrerttier = require('eslint-config-prettier')

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { files: ['**/*.cjs'] },
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
    name: 'eslint/mocha',
    files: ['specs/**/*.spec.{js,cjs}'],
    ...pluginMocha.configs.flat.recommended,
    /** override rules */
    rules: {
      ...pluginMocha.configs.flat.recommended.rules,
      'mocha/no-mocha-arrows': 'off',
    },
  },
  configPrerttier,
]
