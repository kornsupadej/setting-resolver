const merge = require('lodash/merge')

const SettingProxy = require('./settings/proxy.cjs')
const { SETTING_NAME_PREFIX } = require('./constants.cjs')

const baseSetting = {
  name: `${SETTING_NAME_PREFIX}/base`,
}
/** @type {import('../types').resolveSetting} */
function resolveSetting(settingSpec, ...settingOptions) {
  const finalSetting = [baseSetting]
  for (const settingOption of settingOptions) {
    const { globalSetting, localSetting } = new SettingProxy(
      settingSpec,
      settingOption
    ).parseSetting()
    merge(baseSetting, globalSetting)
    finalSetting.push({
      ...localSetting,
    })
  }
  if (settingSpec?.prettier) {
    const prettierConfig = require('eslint-config-prettier')
    finalSetting.push(prettierConfig)
  }
  return finalSetting
}
module.exports.resolveSetting = resolveSetting
