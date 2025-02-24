const expect = require('chai').expect

const SettingProxy = require('../../src/settings/proxy.cjs')
const {
  CJS_FILES,
  ESM_FILES,
  ALL_JS_FILES,
  ALL_TEST_FILES,
  ALL_IGNORE_FILES,
  SETTING_TYPES,
  SETTING_NAME_PREFIX,
} = require('../../src/constants.cjs')

describe('#SettingProxy', () => {
  it('resolve default setting correctly', () => {
    const result = new SettingProxy(
      { format: 'flat' },
      'some-type'
    ).parseSetting()
    expect(result.localSetting.name).to.equal(`${SETTING_NAME_PREFIX}/default`)
    expect(result.localSetting).to.not.contain.keys([
      'files',
      'ignores',
      'languageOptions',
      'rules',
    ])
  })

  it('resolve cjs setting correctly', () => {
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.CJS
    ).parseSetting()
    expect(result.localSetting.name).to.equal(
      `${SETTING_NAME_PREFIX}/${SETTING_TYPES.CJS}`
    )
    expect(result.localSetting.files).to.deep.equal(CJS_FILES)
    expect(result.localSetting.ignores).to.deep.equal(ALL_IGNORE_FILES)
    expect(result.localSetting).to.not.contain.keys('languageOptions')
    expect(result.localSetting).to.contain.keys('rules')
    expect(result.globalSetting.plugins).to.contain.keys('n')
  })

  it('resolve esm setting correctly', () => {
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.ESM
    ).parseSetting()
    expect(result.localSetting.name).to.equal(
      `${SETTING_NAME_PREFIX}/${SETTING_TYPES.ESM}`
    )
    expect(result.localSetting.files).to.deep.equal(ESM_FILES)
    expect(result.localSetting.ignores).to.deep.equal(ALL_IGNORE_FILES)
    expect(result.localSetting).to.not.contain.keys('languageOptions')
    expect(result.localSetting).to.contain.keys('rules')
    expect(result.globalSetting.plugins).to.contain.keys('n')
  })

  it('resolve nodejs setting correctly', () => {
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.NODEJS
    ).parseSetting()
    expect(result.localSetting.name).to.equal(
      `${SETTING_NAME_PREFIX}/${SETTING_TYPES.NODEJS}`
    )
    expect(result.localSetting.files).to.deep.equal(ALL_JS_FILES)
    expect(result.localSetting.ignores).to.deep.equal(ALL_IGNORE_FILES)
    expect(result.localSetting).to.contain.keys(['languageOptions', 'rules'])
    expect(result.globalSetting.plugins).to.contain.keys('import')
  })

  it('resolve jest setting correctly', () => {
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.JEST
    ).parseSetting()
    expect(result.localSetting.name).to.equal(
      `${SETTING_NAME_PREFIX}/${SETTING_TYPES.JEST}`
    )
    expect(result.localSetting.files).to.deep.equal(ALL_TEST_FILES)
    expect(result.localSetting.ignores).to.deep.equal(ALL_IGNORE_FILES)
    expect(result.localSetting).to.contain.keys(['languageOptions', 'rules'])
    expect(result.globalSetting.plugins).to.contain.keys('jest')
  })

  it('resolve vitest setting correctly', () => {
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.VITEST
    ).parseSetting()
    expect(result.localSetting.name).to.equal(
      `${SETTING_NAME_PREFIX}/${SETTING_TYPES.VITEST}`
    )
    expect(result.localSetting.files).to.deep.equal(ALL_TEST_FILES)
    expect(result.localSetting.ignores).to.deep.equal(ALL_IGNORE_FILES)
    expect(result.localSetting).to.contain.keys(['languageOptions', 'rules'])
    expect(result.globalSetting.plugins).to.contain.keys('vitest')
  })

  it('resolve mocha setting correctly', () => {
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.MOCHA
    ).parseSetting()
    expect(result.localSetting.name).to.equal(
      `${SETTING_NAME_PREFIX}/${SETTING_TYPES.MOCHA}`
    )
    expect(result.localSetting.files).to.deep.equal(ALL_TEST_FILES)
    expect(result.localSetting.ignores).to.deep.equal(ALL_IGNORE_FILES)
    expect(result.localSetting).to.contain.keys(['languageOptions', 'rules'])
    expect(result.globalSetting.plugins).to.contain.keys('mocha')
  })

  it('resolve default setting with typeof settingOption === object correctly', () => {
    const result = new SettingProxy({ format: 'flat' }, {}).parseSetting()
    expect(result.localSetting.name).to.equal(`${SETTING_NAME_PREFIX}/default`)
    expect(result.localSetting).to.not.contain.keys([
      'files',
      'ignores',
      'languageOptions',
      'rules',
    ])
  })
})
