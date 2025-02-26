const pluginNode = require('eslint-plugin-n')

const DefaultSetting = require('./default.cjs')
const {
  ESM_FILES,
  ALL_IGNORE_FILES,
  SETTING_NAME_PREFIX,
  SETTING_TYPES,
} = require('../constants.cjs')

/**
 * @class
 * @name ESMSetting
 * @extends DefaultSetting
 * @classdesc ESModule flat-config settings
 */
class ESMSetting extends DefaultSetting {
  #name = `${SETTING_NAME_PREFIX}/${SETTING_TYPES.ESM}`
  #files = [...ESM_FILES]
  #ignores = [...ALL_IGNORE_FILES]
  #languageOptions = {}
  #plugins = {
    n: pluginNode,
  }
  #rules = {
    ...pluginNode.configs['flat/recommended-module'].rules,
    'n/callback-return': ['error', ['cb', 'callback', 'next']],
    'n/handle-callback-err': ['error', 'err'],
    'n/prefer-node-protocol': 'error',
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
module.exports = ESMSetting
