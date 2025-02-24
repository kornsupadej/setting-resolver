const SettingProxy = require('./settings/proxy.cjs')

/** @type {import('./types').resolveSetting} */
function resolveSetting(settingSpec, ...settingOptions) {
  const globalPlugins = {}
  const finalSetting = []
  for (const settingOption of settingOptions) {
    const setting = new SettingProxy(
      settingSpec,
      settingOption
    ).retrieveSetting()
    Object.assign(globalPlugins, setting.plugins)
    finalSetting.push({
      name: setting.name,
      ...(setting.files.length && { files: setting.files }),
      ...(setting.ignores.length && { ignores: setting.ignores }),
      ...(Object.keys(setting.languageOptions).length && {
        languageOptions: setting.languageOptions,
      }),
      ...(Object.keys(setting.rules).length && { rules: setting.rules }),
    })
  }
  Object.keys(globalPlugins).length &&
    finalSetting.unshift({
      plugins: globalPlugins,
    })
  if (settingSpec?.prettier) {
    const prettierConfig = require('eslint-config-prettier')
    finalSetting.push(prettierConfig)
  }
  return finalSetting
}
module.exports.resolveSetting = resolveSetting
