class JestSetting {
  #files = [];
  #ignores = [];
  #languageOptions = {};
  #plugins = {};
  #rules = {};

  constructor() {}

  /** getters */
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
module.exports = JestSetting;
