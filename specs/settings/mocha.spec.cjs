const expect = require('chai').expect
const pluginMocha = require('eslint-plugin-mocha')

const MochaSetting = require('../../src/settings/mocha.cjs')
const {
  ALL_TEST_FILES,
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
    settings: {},
  }
) => {
  return new MochaSetting(settingSpec, settingOption)
}

const baseExpected = {
  name: `${SETTING_NAME_PREFIX}/${SETTING_TYPES.MOCHA}`,
  files: [...ALL_TEST_FILES],
  ignores: [...ALL_IGNORE_FILES],
  languageOptions: {
    globals: pluginMocha.configs.flat.recommended.languageOptions.globals,
  },
  plugins: {
    mocha: pluginMocha,
  },
  rules: {
    ...pluginMocha.configs.flat.recommended.rules,
    'mocha/no-mocha-arrows': 'off',
  },
  settings: {},
}

describe('#MochaSetting', () => {
  it('resolve setting preset correctly', () => {
    const inst = createInstance()
    expect(inst.getName).to.equal(baseExpected.name)
    expect(inst.getFiles).to.deep.equal(baseExpected.files)
    expect(inst.getIgnores).to.deep.equal(baseExpected.ignores)
    expect(inst.getLanguageOptions).to.deep.equal(baseExpected.languageOptions)
    expect(inst.getPlugins).to.deep.equal(baseExpected.plugins)
    expect(inst.getRules).to.deep.equal(baseExpected.rules)
    expect(inst.getSettings).to.deep.equal(baseExpected.settings)
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
    expect(inst.getSettings).to.deep.equal(baseExpected.settings)
  })
})
