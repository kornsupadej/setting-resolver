const importPlugin = require("eslint-plugin-import");
const js = require("@eslint/js");
const mixinDeep = require("mixin-deep");
const ts = require("typescript-eslint");

const {
  ALL_JS_FILES,
  ALL_TS_FILES,
  SETTING_TYPES,
} = require("../constants.cjs");

/**
 * @class
 * @name NodeJSSetting
 * @classdesc Nodejs flat-config settings
 */
class NodeJSSetting {
  #settingSpec;
  #settingOption;

  #name = SETTING_TYPES;
  #files = [...ALL_JS_FILES];
  #ignores = [];
  #languageOptions = {
    ...importPlugin.flatConfigs.recommended.languageOptions,
  };
  #plugins = {
    import: importPlugin.flatConfigs.recommended.plugins.import,
  };
  #rules = {
    ...js.configs.recommended.rules,
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],
    "import/first": "error",
    "import/newline-after-import": [
      "error",
      {
        count: 1,
        exactCount: true,
        considerComments: false,
      },
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
        groups: ["builtin", "external", "parent", "sibling", "index"],
      },
    ],
    "import/exports-last": "error",
    "import/group-exports": "error",
  };

  /**
   * @constructor
   * @param {import('../types').SettingSpec} settingSpec
   * @param {import('../types').ESLint.FlatConfig} settingOption
   */
  constructor(settingSpec, settingOption) {
    this.#settingSpec = settingSpec;
    this.#settingOption = settingOption;
  }

  /** getters */
  get name() {
    return this.#name;
  }

  get files() {
    const setting = [...this.#files];
    if (this.#settingSpec.typescript) {
      setting.push(...ALL_TS_FILES);
    }
    setting.push(...this.#settingOption.files);
    return setting;
  }

  get ignores() {
    return [...this.#ignores, ...this.#settingOption.ignores];
  }

  get languageOptions() {
    const setting = {
      ...this.#languageOptions,
    };
    if (this.#settingSpec.typescript) {
      mixinDeep(setting, {
        parser: ts.parser,
        parserOptions: {
          project: ["tsconfig?(.*).json"],
          projectService: true,
          tsconfigRootDir: this.#settingSpec.rootDir,
        },
      });
    }
    mixinDeep(setting, this.#settingOption.languageOptions);
    return setting;
  }

  get plugins() {
    const setting = {
      ...this.#plugins,
    };
    if (this.#settingSpec.typescript) {
      mixinDeep(setting, {
        "@typescript-eslint": ts.plugin,
      });
    }
    mixinDeep(setting, this.#settingOption.plugins);
    return setting;
  }

  get rules() {
    const setting = {
      ...this.#rules,
    };
    if (this.#settingSpec.typescript) {
      mixinDeep(setting, {
        /** eslint-recommended */
        ...ts.configs.recommendedTypeChecked[1].rules,
        /** tseslint-recommended-type-checked */
        ...ts.configs.recommendedTypeChecked[2].rules,
      });
    }
    mixinDeep(setting, this.#settingOption.rules);
    return setting;
  }
}
module.exports = NodeJSSetting;
