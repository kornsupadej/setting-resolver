const expect = require('chai').expect

const DefaultSetting = require('../../src/settings/default.cjs')
const { SETTING_NAME_PREFIX } = require('../../src/constants.cjs')

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
  return new DefaultSetting(settingSpec, settingOption)
}

const baseExpected = {
  name: `${SETTING_NAME_PREFIX}/default`,
  files: [],
  ignores: [],
  languageOptions: {},
  plugins: {},
  rules: {},
  settings: {},
}

describe('#DefaultSetting', () => {
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
          'some-language-options': 'value',
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
      'some-language-options': 'value',
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
