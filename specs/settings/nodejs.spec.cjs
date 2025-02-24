const expect = require('chai').expect
const globals = require('globals')
const js = require('@eslint/js')
const ts = require('typescript-eslint')
const pluginImport = require('eslint-plugin-import')

const NodeJSSetting = require('../../src/settings/nodejs.cjs')
const {
  ALL_JS_FILES,
  ALL_TS_FILES,
  ALL_IGNORE_FILES,
  SETTING_NAME_PREFIX,
  SETTING_TYPES,
} = require('../../src/constants.cjs')

const createInstance = (
  settingSpec = {},
  settingOption = {
    files: [],
    ignores: [],
    languageOptions: {},
    plugins: {},
    rules: {},
  }
) => {
  return new NodeJSSetting(settingSpec, settingOption)
}

const baseExpected = {
  name: `${SETTING_NAME_PREFIX}/${SETTING_TYPES.NODEJS}`,
  files: [...ALL_JS_FILES],
  ignores: [...ALL_IGNORE_FILES],
  languageOptions: {
    ...pluginImport.flatConfigs.recommended.languageOptions,
    globals: globals.node,
  },
  plugins: {
    import: pluginImport.flatConfigs.recommended.plugins.import,
  },
  rules: {
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
  },
}

describe('#NodeJSSetting', () => {
  it('resolve setting preset correctly', () => {
    const inst = createInstance()
    expect(inst.getName).to.equal(baseExpected.name)
    expect(inst.getFiles).to.deep.equal(baseExpected.files)
    expect(inst.getIgnores).to.deep.equal(baseExpected.ignores)
    expect(inst.getLanguageOptions).to.deep.equal(baseExpected.languageOptions)
    expect(inst.getPlugins).to.deep.equal(baseExpected.plugins)
    expect(inst.getRules).to.deep.equal(baseExpected.rules)
  })

  it('resolve setting preset with typescript correctly', () => {
    const inst = createInstance({ typescript: true, rootDir: process.cwd() })
    expect(inst.getName).to.equal(baseExpected.name)
    expect(inst.getFiles).to.deep.equal([
      ...baseExpected.files,
      ...ALL_TS_FILES,
    ])
    expect(inst.getIgnores).to.deep.equal(baseExpected.ignores)
    expect(inst.getLanguageOptions).to.deep.equal({
      ...baseExpected.languageOptions,
      parser: ts.parser,
      parserOptions: {
        project: ['tsconfig?(.*).json'],
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    })
    expect(inst.getPlugins).to.deep.equal({
      ...baseExpected.plugins,
      '@typescript-eslint': ts.plugin,
    })
    expect(inst.getRules).to.deep.equal({
      ...baseExpected.rules,
      /** eslint-recommended */
      ...ts.configs.recommendedTypeChecked[1].rules,
      /** tseslint-recommended-type-checked */
      ...ts.configs.recommendedTypeChecked[2].rules,
    })
  })

  it('reolve setting with options correctly', () => {
    const inst = createInstance(
      {},
      {
        files: ['some-files'],
        ignores: ['some-ignores'],
        languageOptions: {
          globals: {
            'some-global-key': 'some-global-value',
          },
        },
        plugins: {
          'some-plugin': {},
        },
        rules: {
          'some-rules': 'off',
        },
      }
    )
    expect(inst.getName).to.equal(baseExpected.name)
    expect(inst.getFiles).to.deep.equal([...baseExpected.files, 'some-files'])
    expect(inst.getIgnores).to.deep.equal([
      ...baseExpected.ignores,
      'some-ignores',
    ])
    expect(inst.getLanguageOptions).to.deep.equal({
      ...baseExpected.languageOptions,
      globals: {
        ...baseExpected.languageOptions.globals,
        'some-global-key': 'some-global-value',
      },
    })
    expect(inst.getPlugins).to.deep.equal({
      ...baseExpected.plugins,
      'some-plugin': {},
    })
    expect(inst.getRules).to.deep.equal({
      ...baseExpected.rules,
      'some-rules': 'off',
    })
  })
})
