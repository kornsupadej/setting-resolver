const mixinDeep = require("mixin-deep");
const pluginJest = require("eslint-plugin-jest");

const {
  SETTING_NAME_PREFIX,
  SETTING_TYPES,
  ALL_TEST_FILES,
} = require("../constants.cjs");

/**
 * @class
 * @name JestSetting
 * @classdesc Jest flat-config settings
 */
class JestSetting {
  #settingOption;

  #name = `${SETTING_NAME_PREFIX}/${SETTING_TYPES.JEST}`;
  #files = [...ALL_TEST_FILES];
  #ignores = [];
  #languageOptions = {
    globals: pluginJest.environments.globals.globals,
  };
  #plugins = {
    jest: pluginJest,
  };
  #rules = {
    ...pluginJest.configs["flat/recommended"].rules,
    "jest/consistent-test-it": ["error", { fn: "test" }],
    "jest/valid-title": "error",
    "jest/no-done-callback": "error",
    "jest/expect-expect": "off",
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
module.exports = JestSetting;
