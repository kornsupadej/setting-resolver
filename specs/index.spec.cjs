const configPrettier = require('eslint-config-prettier')
const expect = require('chai').expect
const sinon = require('sinon')

const { resolveSetting } = require('../src/index.cjs')
const { SETTING_NAME_PREFIX, SETTING_TYPES } = require('../src/constants.cjs')
const SettingProxy = require('../src/settings/proxy.cjs')

describe('#resolveSetting', () => {
  let proxySpy

  beforeEach(() => {
    proxySpy = sinon.spy(SettingProxy.prototype, 'retrieveSetting')
  })

  afterEach(() => {
    proxySpy.restore()
  })

  it('resolve empty setting correctly', () => {
    const result = resolveSetting()
    expect(proxySpy.calledOne)
    expect(result).to.deep.equal([])
  })

  it('resolve default setting if unsupported', () => {
    const result = resolveSetting({ format: 'flat' }, 'some-unsupported-type')
    expect(proxySpy.calledOne)
    expect(result).to.deep.equal([
      {
        name: `${SETTING_NAME_PREFIX}/default`,
      },
    ])
  })

  it('resolve setting with prettier config', () => {
    const result = resolveSetting({ format: 'flat', prettier: true })
    expect(proxySpy.calledOne)
    expect(result).to.deep.equal([configPrettier])
  })

  it('resolve default setting with prettier config', () => {
    const result = resolveSetting(
      { format: 'flat', prettier: true },
      'some-unsupported-type'
    )
    expect(proxySpy.calledOne)
    expect(result).to.deep.equal([
      {
        name: `${SETTING_NAME_PREFIX}/default`,
      },
      configPrettier,
    ])
  })

  it.skip('resolve multiple with base settings correctly', () => {
    const nodejsSetting = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.NODEJS
    ).retrieveSetting()
    const cjsSetting = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.CJS
    ).retrieveSetting()
    const esmSetting = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.ESM
    ).retrieveSetting()
    const expected = [
      {
        name: `${SETTING_NAME_PREFIX}/base`,
        languageOptions: {
          ...cjsSetting.languageOptions,
          ...esmSetting.languageOptions,
          ...nodejsSetting.languageOptions,
        },
        plugins: {
          ...cjsSetting.plugins,
          ...esmSetting.plugins,
          ...nodejsSetting.plugins,
        },
      },
      {
        name: cjsSetting.name,
        rules: cjsSetting.rules,
      },
      {
        name: esmSetting.name,
        rules: esmSetting.rules,
      },
      {
        name: nodejsSetting.name,
        rules: nodejsSetting.rules,
      },
    ]
    const result = resolveSetting(
      { format: 'flat' },
      SETTING_TYPES.CJS,
      SETTING_TYPES.ESM,
      SETTING_TYPES.NODEJS
    )
    expect(result).to.deep.equal(expected)
  })
})
