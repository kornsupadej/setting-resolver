const mixinDeep = require("mixin-deep");
const pluginMocha = require("eslint-plugin-mocha");

const {
  SETTING_NAME_PREFIX,
  SETTING_TYPES,
  ALL_TEST_FILES,
} = require("../constants.cjs");

/**
 * @class
 * @name MochaSetting
 * @classdesc Mocha flat-config settings
 */
class MochaSetting {
  #settingOption;

  #name = `${SETTING_NAME_PREFIX}/${SETTING_TYPES.MOCHA}`;
  #files = [...ALL_TEST_FILES];
  #ignores = [];
  #languageOptions = {
    globals: pluginMocha.configs.flat.recommended.languageOptions.globals,
  };
  #plugins = {
    mocha: pluginMocha,
  };
  #rules = {
    ...pluginMocha.configs.flat.recommended.rules,
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
module.exports = MochaSetting;
