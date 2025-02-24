const cloneDeep = require('lodash/cloneDeep')
const merge = require('lodash/merge')

const { SETTING_NAME_PREFIX } = require('../constants.cjs')

/**
 * @class
 * @name DefaultSetting
 * @classdesc Default flat-config settings
 */
class DefaultSetting {
  settingSpec
  settingOption

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
  get getName() {
    return this.name
  }

  get getFiles() {
    const setting = cloneDeep(this.files)
    setting.push(...this.settingOption.files)
    this.files = [...new Set(setting).values()]
    return this.files
  }

  get getIgnores() {
    const setting = cloneDeep(this.ignores)
    setting.push(...this.settingOption.ignores)
    this.ignores = [...new Set(setting).values()]
    return this.ignores
  }

  get getLanguageOptions() {
    const setting = cloneDeep(this.languageOptions)
    this.languageOptions = merge(setting, this.settingOption.languageOptions)
    return this.languageOptions
  }

  get getPlugins() {
    const setting = cloneDeep(this.plugins)
    this.plugins = merge(setting, this.settingOption.plugins)
    return this.plugins
  }

  get getRules() {
    const setting = cloneDeep(this.rules)
    this.rules = merge(setting, this.settingOption.rules)
    return this.rules
  }
}
module.exports = DefaultSetting
