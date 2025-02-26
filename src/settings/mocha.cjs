const pluginMocha = require('eslint-plugin-mocha')

const DefaultSetting = require('./default.cjs')
const {
  ALL_TEST_FILES,
  ALL_IGNORE_FILES,
  SETTING_NAME_PREFIX,
  SETTING_TYPES,
} = require('../constants.cjs')

/**
 * @class
 * @name MochaSetting
 * @extends DefaultSetting
 * @classdesc Mocha flat-config settings
 */
class MochaSetting extends DefaultSetting {
  #name = `${SETTING_NAME_PREFIX}/${SETTING_TYPES.MOCHA}`
  #files = [...ALL_TEST_FILES]
  #ignores = [...ALL_IGNORE_FILES]
  #languageOptions = {
    globals: pluginMocha.configs.flat.recommended.languageOptions.globals,
  }
  #plugins = {
    mocha: pluginMocha,
  }
  #rules = {
    ...pluginMocha.configs.flat.recommended.rules,
    'mocha/no-mocha-arrows': 'off',
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
module.exports = MochaSetting
