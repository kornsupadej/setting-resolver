const assign = require('lodash/assign')
const cloneDeep = require('lodash/cloneDeep')
const globals = require('globals')
const merge = require('lodash/merge')
const pluginImport = require('eslint-plugin-import')
const js = require('@eslint/js')
const ts = require('typescript-eslint')

const {
  ALL_JS_FILES,
  ALL_TS_FILES,
  ALL_IGNORE_FILES,
  SETTING_NAME_PREFIX,
  SETTING_TYPES,
} = require('../constants.cjs')

/**
 * @class
 * @name NodeJSSetting
 * @classdesc Nodejs flat-config settings
 */
class NodeJSSetting {
  #settingSpec
  #settingOption

  #name = `${SETTING_NAME_PREFIX}/${SETTING_TYPES.NODEJS}`
  #files = [...ALL_JS_FILES]
  #ignores = [...ALL_IGNORE_FILES]
  #languageOptions = {
    ...pluginImport.flatConfigs.recommended.languageOptions,
    globals: globals.node,
  }
  #plugins = {
    import: pluginImport.flatConfigs.recommended.plugins.import,
  }
  #rules = {
    ...js.configs.recommended.rules,
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': [
      'error',
      {
        count: 1,
        exactCount: true,
        considerComments: false,
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      },
    ],
    'import/exports-last': 'error',
    'import/group-exports': 'error',
  }
  #settings = {}

  /**
   * @constructor
   * @param {import('../types').SettingSpec} settingSpec
   * @param {import('../types').ESLint.FlatConfig} settingOption
   */
  constructor(settingSpec, settingOption) {
    this.#settingSpec = settingSpec
    this.#settingOption = settingOption
  }

  /** getters */
  get getName() {
    return this.#name
  }

  get getFiles() {
    const setting = cloneDeep(this.#files)
    if (this.#settingSpec.typescript) {
      setting.push(...ALL_TS_FILES)
    }
    setting.push(...this.#settingOption.files)
    this.#files = [...new Set(setting).values()]
    return this.#files
  }

  get getIgnores() {
    const setting = cloneDeep(this.#ignores)
    setting.push(...this.#settingOption.ignores)
    this.#ignores = [...new Set(setting).values()]
    return this.#ignores
  }

  get getLanguageOptions() {
    const setting = cloneDeep(this.#languageOptions)
    if (this.#settingSpec.typescript) {
      assign(setting, {
        parser: ts.parser,
        parserOptions: {
          project: ['tsconfig?(.*).json'],
          projectService: true,
          tsconfigRootDir: this.#settingSpec.rootDir,
        },
      })
    }
    merge(setting, this.#settingOption.languageOptions)
    this.#languageOptions = setting
    return this.#languageOptions
  }

  get getPlugins() {
    const setting = cloneDeep(this.#plugins)
    if (this.#settingSpec.typescript) {
      assign(setting, {
        '@typescript-eslint': ts.plugin,
      })
    }
    merge(setting, this.#settingOption.plugins)
    this.#plugins = setting
    return this.#plugins
  }

  get getRules() {
    const setting = cloneDeep(this.#rules)
    if (this.#settingSpec.typescript) {
      assign(setting, {
        /** eslint-recommended */
        ...ts.configs.recommendedTypeChecked[1].rules,
        /** tseslint-recommended-type-checked */
        ...ts.configs.recommendedTypeChecked[2].rules,
        /** turn off import/named */
        ...pluginImport.flatConfigs.typescript.rules,
      })
    }
    merge(setting, this.#settingOption.rules)
    this.#rules = setting
    return this.#rules
  }

  get getSettings() {
    const setting = cloneDeep(this.#settings)
    if (this.#settingSpec.typescript) {
      assign(setting, {
        ...pluginImport.flatConfigs.typescript.settings,
      })
    }
    this.#settings = setting
    return this.#settings
  }
}
module.exports = NodeJSSetting
