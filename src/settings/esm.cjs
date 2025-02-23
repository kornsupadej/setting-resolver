const mixinDeep = require("mixin-deep");
const pluginNode = require("eslint-plugin-n");

const {
  ESM_FILES,
  SETTING_NAME_PREFIX,
  SETTING_TYPES,
} = require("../constants.cjs");

/**
 * @class
 * @name ESMSetting
 * @classdesc ESModule flat-config settings
 */
class ESMSetting {
  #settingOption;

  #name = `${SETTING_NAME_PREFIX}/${SETTING_TYPES.ESM}`;
  #files = [...ESM_FILES];
  #ignores = [];
  #languageOptions = {};
  #plugins = {
    n: pluginNode,
  };
  #rules = {
    ...pluginNode.configs["flat/recommended-module"].rules,
    "n/callback-return": ["error", ["cb", "callback", "next"]],
    "n/handle-callback-err": ["error", "err"],
    "n/prefer-node-protocol": "error",
  };

  /**
   * @constructor
   * @param {import('../types').SettingSpec} _
   * @param {import('../types').ESLint.FlatConfig} settingOption
   */
  constructor(_, settingOption) {
    this.#settingOption = settingOption;
  }

  /** getters */
  get name() {
    return this.#name;
  }

  get files() {
    return [
      ...new Set([...this.#files, ...this.#settingOption.files]).values(),
    ];
  }

  get ignores() {
    return [
      ...new Set([...this.#ignores, ...this.#settingOption.ignores]).values(),
    ];
  }

  get languageOptions() {
    const setting = {
      ...this.#languageOptions,
    };
    mixinDeep(setting, this.#settingOption.languageOptions);
    return setting;
  }

  get plugins() {
    const setting = {
      ...this.#plugins,
    };
    mixinDeep(setting, this.#settingOption.plugins);
    return setting;
  }

  get rules() {
    const setting = {
      ...this.#rules,
    };
    mixinDeep(setting, this.#settingOption.rules);
    return setting;
  }
}
module.exports = ESMSetting;
