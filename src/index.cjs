const mixinDeep = require("mixin-deep");

const SettingProxy = require("./settings/proxy.cjs");
const { SETTING_NAME_PREFIX } = require("./constants.cjs");

const baseSetting = {
  name: `${SETTING_NAME_PREFIX}/base`,
  languageOptions: {},
  plugins: {},
};

/** @type {import('./types').resolveSetting} */
function resolveSetting(settingSpec, ...settingOptions) {
  const finalSetting = [baseSetting];
  for (const settingOption of settingOptions) {
    const setting = new SettingProxy(
      settingSpec,
      settingOption
    ).retrieveSetting();
    mixinDeep(baseSetting, {
      languageOptions: setting.languageOptions,
      plugins: setting.plugins,
    });
    finalSetting.push({
      name: `${SETTING_NAME_PREFIX}/${setting.name}`,
      files: setting.files,
      ...(setting.ignores.length && { ignore: setting.ignores }),
      rules: setting.rules,
    });
  }
  if (settingSpec.prettier) {
    const prettierConfig = require("eslint-config-prettier");
    finalSetting.push(prettierConfig);
  }
  return finalSetting;
}
module.exports.resolveSetting = resolveSetting;
