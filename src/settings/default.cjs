const { SETTING_NAME_PREFIX } = require("../constants.cjs");

/**
 * @class
 * @name DefaultSetting
 * @classdesc Default flat-config settings
 */
class DefaultSetting {
  #name = `${SETTING_NAME_PREFIX}/default`;
  #files = [];
  #ignores = [];
  #languageOptions = {};
  #plugins = {};
  #rules = {};

  constructor() {}

  /** getters */
  get name() {
    return this.#name;
  }

  get files() {
    return this.#files;
  }

  get ignores() {
    return this.#ignores;
  }

  get languageOptions() {
    return this.#languageOptions;
  }

  get plugins() {
    return this.#plugins;
  }

  get rules() {
    return this.#rules;
  }
}
module.exports = DefaultSetting;
