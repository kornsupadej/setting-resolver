const mixinDeep = require("mixin-deep");
const pluginNode = require("eslint-plugin-n");

const { ESM_FILES } = require("../constants.cjs");

class ESMSetting {
  #settingOption;

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
   * @param {import('../types').SettingSpec} settingSpec
   * @param {import('../types').ESLint.FlatConfig} settingOption
   */
  constructor(_, settingOption) {
    this.#settingOption = settingOption;
  }

  /** getters */
  get files() {
    return [...this.#files, ...this.#settingOption.files];
  }

  get ignores() {
    return [...this.#ignores, ...this.#settingOption.ignores];
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
