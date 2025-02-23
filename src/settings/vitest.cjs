const mixinDeep = require("mixin-deep");
const vitestPlugin = require("@vitest/eslint-plugin");

const {
  SETTING_NAME_PREFIX,
  SETTING_TYPES,
  ALL_TEST_FILES,
} = require("../constants.cjs");

/**
 * @class
 * @name VitestSetting
 * @classdesc Vitest flat-config settings
 */
class VitestSetting {
  #settingOption;

  #name = `${SETTING_NAME_PREFIX}/${SETTING_TYPES.VITEST}`;
  #files = [...ALL_TEST_FILES];
  #ignores = [];
  #languageOptions = {
    globals: vitestPlugin.environments.env.globals,
  };
  #plugins = {
    vitest: vitestPlugin,
  };
  #rules = {
    ...vitestPlugin.configs.recommended.rules,
    "vitest/consistent-test-it": ["error", { fn: "test" }],
    "vitest/valid-title": "error",
    "vitest/no-done-callback": "error",
    "vitest/expect-expect": "off",
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
module.exports = VitestSetting;
