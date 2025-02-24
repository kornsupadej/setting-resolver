const pluginVitest = require('@vitest/eslint-plugin')

const DefaultSetting = require('./default.cjs')
const {
  ALL_TEST_FILES,
  ALL_IGNORE_FILES,
  SETTING_NAME_PREFIX,
  SETTING_TYPES,
} = require('../constants.cjs')

/**
 * @class
 * @name VitestSetting
 * @extends DefaultSetting
 * @classdesc Vitest flat-config settings
 */
class VitestSetting extends DefaultSetting {
  #name = `${SETTING_NAME_PREFIX}/${SETTING_TYPES.VITEST}`
  #files = [...ALL_TEST_FILES]
  #ignores = [...ALL_IGNORE_FILES]
  #languageOptions = {
    globals: pluginVitest.environments.env.globals,
  }
  #plugins = {
    vitest: pluginVitest,
  }
  #rules = {
    ...pluginVitest.configs.recommended.rules,
    'vitest/consistent-test-it': ['error', { fn: 'test' }],
    'vitest/valid-title': 'error',
    'vitest/no-done-callback': 'error',
    'vitest/expect-expect': 'off',
  }

  /**
   * @constructor
   * @param {import('../types').SettingSpec} settingSpec
   * @param {import('../types').ESLint.FlatConfig} settingOption
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
module.exports = VitestSetting
