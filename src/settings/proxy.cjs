const CJSSetting = require('./cjs.cjs')
const DefaultSetting = require('./default.cjs')
const ESMSetting = require('./esm.cjs')
const JestSetting = require('./jest.cjs')
const MochaSetting = require('./mocha.cjs')
const NodeJSSetting = require('./nodejs.cjs')
const VitestSetting = require('./vitest.cjs')

const { SETTING_TYPES } = require('../constants.cjs')

const settingClasses = Object.freeze({
  flat: {
    [SETTING_TYPES.CJS]: CJSSetting,
    [SETTING_TYPES.ESM]: ESMSetting,
    [SETTING_TYPES.NODEJS]: NodeJSSetting,
    [SETTING_TYPES.JEST]: JestSetting,
    [SETTING_TYPES.VITEST]: VitestSetting,
    [SETTING_TYPES.MOCHA]: MochaSetting,
  },
})
/**
 * @class
 * @name SettingProxy
 * @classdesc dynamically retrieve setting files
 */
class SettingProxy {
  #settingSpec
  #settingOption
  /**
   * @constructor
   * @param {import('../types').SettingSpec} settingSpec
   * @param {import('../types').SettingOption} settingOption
   */
  constructor(settingSpec, settingOption) {
    this.#settingSpec = {
      format: 'flat',
      // format: settingSpec?.format || "flat",
      rootDir: settingSpec?.rootDir || process.cwd(),
      typescript: settingSpec?.typescript || false,
      prettier: settingSpec?.prettier || false,
    }
    this.#settingOption = {
      type:
        typeof settingOption === 'string'
          ? settingOption
          : settingOption?.type || 'default',
      options: {
        files: settingOption?.options?.files || [],
        ignores: settingOption.options?.ignores || [],
        languageOptions: settingOption?.options?.languageOptions || {},
        plugins: settingOption.options?.plugins,
        rules: settingOption.options?.rules || {},
      },
    }
  }

  /**
   * @public
   * @method retrieveSetting
   * @description dynamically retrieve setting file
   */
  retrieveSetting() {
    try {
      const settingInstance = new settingClasses[this.#settingSpec.format][
        this.#settingOption.type
      ](this.#settingSpec, this.#settingOption.options)
      return settingInstance
    } catch {
      return new DefaultSetting(this.#settingSpec, this.#settingOption.options)
    }
  }
}
module.exports = SettingProxy
