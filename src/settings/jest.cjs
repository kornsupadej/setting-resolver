const pluginJest = require('eslint-plugin-jest')

const DefaultSetting = require('./default.cjs')
const {
  ALL_TEST_FILES,
  ALL_IGNORE_FILES,
  SETTING_NAME_PREFIX,
  SETTING_TYPES,
} = require('../constants.cjs')

/**
 * @class
 * @name JestSetting
 * @extends DefaultSetting
 * @classdesc Jest flat-config settings
 */
class JestSetting extends DefaultSetting {
  #name = `${SETTING_NAME_PREFIX}/${SETTING_TYPES.JEST}`
  #files = [...ALL_TEST_FILES]
  #ignores = [...ALL_IGNORE_FILES]
  #languageOptions = {
    globals: pluginJest.environments.globals.globals,
  }
  #plugins = {
    jest: pluginJest,
  }
  #rules = {
    ...pluginJest.configs['flat/recommended'].rules,
    'jest/consistent-test-it': ['error', { fn: 'test' }],
    'jest/valid-title': 'error',
    'jest/no-done-callback': 'error',
    'jest/expect-expect': 'off',
  }

  /**
   * @constructor
   * @param {import('../../types').SettingSpec} settingSpec
   * @param {import('../../types').ESLint.FlatConfig} settingOption
   */
  constructor(settingSpec, settingOption) {
    super(settingSpec, settingOption)
    this.name = this.#name
    this.files = this.#files
    this.ignores = this.#ignores
    this.languageOptions = this.#languageOptions
    this.plugins = this.#plugins
    this.rules = this.#rules
  }
}
module.exports = JestSetting
