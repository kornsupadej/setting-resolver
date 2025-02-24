const mergeDeep = require('merge-deep')

const { SETTING_NAME_PREFIX } = require('../constants.cjs')

/**
 * @class
 * @name DefaultSetting
 * @classdesc Default flat-config settings
 */
class DefaultSetting {
  name = `${SETTING_NAME_PREFIX}/default`
  files = []
  ignores = []
  languageOptions = {}
  plugins = {}
  rules = {}

  /**
   * @constructor
   * @param {import('../types').SettingSpec} settingSpec
   * @param {import('../types').ESLint.FlatConfig} settingOption
   */
  constructor(settingSpec, settingOption) {
    this.settingSpec = settingSpec
    this.settingOption = settingOption
  }

  /** getters */
  get name() {
    return this.name
  }

  get files() {
    return [...new Set([...this.files, ...this.settingOption.files]).values()]
  }

  get ignores() {
    return [
      ...new Set([...this.ignores, ...this.settingOption.ignores]).values(),
    ]
  }

  get languageOptions() {
    const setting = mergeDeep(
      this.languageOptions,
      this.settingOption.languageOptions
    )
    this.languageOptions = setting
    return this.languageOptions
  }

  get plugins() {
    const setting = mergeDeep(this.plugins, this.settingOption.plugins)
    this.plugins = setting
    return this.plugins
  }

  get rules() {
    const setting = mergeDeep(this.rules, this.settingOption.rules)
    this.rules = setting
    return this.rules
  }
}
module.exports = DefaultSetting
