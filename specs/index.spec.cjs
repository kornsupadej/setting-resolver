const configPrettier = require('eslint-config-prettier')
const expect = require('chai').expect
const sinon = require('sinon')

const { resolveSetting } = require('../src/index.cjs')
const { SETTING_NAME_PREFIX, SETTING_TYPES } = require('../src/constants.cjs')
const SettingProxy = require('../src/settings/proxy.cjs')

describe('#resolveSetting', () => {
  let proxySpy

  beforeEach(() => {
    proxySpy = sinon.spy(SettingProxy.prototype, 'parseSetting')
  })

  afterEach(() => {
    proxySpy.restore()
  })

  it('resolve empty setting correctly', () => {
    const result = resolveSetting()
    expect(proxySpy.calledOne)
    expect(result).to.deep.equal([
      {
        name: `${SETTING_NAME_PREFIX}/base`,
      },
    ])
  })

  it('resolve default setting if unsupported', () => {
    const result = resolveSetting({ format: 'flat' }, 'some-unsupported-type')
    expect(proxySpy.calledOne)
    expect(result).to.deep.equal([
      {
        name: `${SETTING_NAME_PREFIX}/base`,
      },
      {
        name: `${SETTING_NAME_PREFIX}/default`,
      },
    ])
  })

  it('resolve setting with prettier config', () => {
    const result = resolveSetting({ format: 'flat', prettier: true })
    expect(proxySpy.calledOne)
    expect(result).to.deep.equal([
      {
        name: `${SETTING_NAME_PREFIX}/base`,
      },
      configPrettier,
    ])
  })

  it('resolve default setting with prettier config', () => {
    const result = resolveSetting(
      { format: 'flat', prettier: true },
      'some-unsupported-type'
    )
    expect(proxySpy.calledOne)
    expect(result).to.deep.equal([
      {
        name: `${SETTING_NAME_PREFIX}/base`,
      },
      {
        name: `${SETTING_NAME_PREFIX}/default`,
      },
      configPrettier,
    ])
  })

  it('resolve setting with plugins correctly', () => {
    const expected = new SettingProxy({}, SETTING_TYPES.NODEJS).parseSetting()
    const result = resolveSetting(
      { format: 'flat', prettier: false },
      SETTING_TYPES.NODEJS
    )
    expect(proxySpy.calledOne)
    expect(result).to.deep.equal([
      {
        name: `${SETTING_NAME_PREFIX}/base`,
        plugins: expected.globalSetting.plugins,
      },
      {
        name: expected.localSetting.name,
        files: expected.localSetting.files,
        ignores: expected.localSetting.ignores,
        languageOptions: expected.localSetting.languageOptions,
        rules: expected.localSetting.rules,
      },
    ])
  })

  it('resolve multiple with base settings correctly', () => {
    const cjsSetting = new SettingProxy({}, SETTING_TYPES.CJS).parseSetting()
    const esmSetting = new SettingProxy({}, SETTING_TYPES.ESM).parseSetting()
    const nodejsSetting = new SettingProxy(
      {},
      SETTING_TYPES.NODEJS
    ).parseSetting()
    const result = resolveSetting(
      {},
      SETTING_TYPES.CJS,
      SETTING_TYPES.ESM,
      SETTING_TYPES.NODEJS
    )
    expect(proxySpy.calledOne)
    expect(result).to.deep.equal([
      {
        name: `${SETTING_NAME_PREFIX}/base`,
        plugins: {
          ...cjsSetting.globalSetting.plugins,
          ...esmSetting.globalSetting.plugins,
          ...nodejsSetting.globalSetting.plugins,
        },
      },
      {
        name: cjsSetting.localSetting.name,
        files: cjsSetting.localSetting.files,
        ignores: cjsSetting.localSetting.ignores,
        rules: cjsSetting.localSetting.rules,
      },
      {
        name: esmSetting.localSetting.name,
        files: esmSetting.localSetting.files,
        ignores: esmSetting.localSetting.ignores,
        rules: esmSetting.localSetting.rules,
      },
      {
        name: nodejsSetting.localSetting.name,
        files: nodejsSetting.localSetting.files,
        ignores: nodejsSetting.localSetting.ignores,
        languageOptions: nodejsSetting.localSetting.languageOptions,
        rules: nodejsSetting.localSetting.rules,
      },
    ])
  })
})
