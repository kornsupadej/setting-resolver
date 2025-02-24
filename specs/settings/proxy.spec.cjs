const expect = require('chai').expect

const SettingProxy = require('../../src/settings/proxy.cjs')
const {
  SETTING_TYPES,
  SETTING_NAME_PREFIX,
} = require('../../src/constants.cjs')

const resolveModuleRef = type => {
  const module = require(`../../src/settings/${type}.cjs`)
  return module
}

describe('#SettingProxy', () => {
  it('resolve default setting correctly', () => {
    const expected = resolveModuleRef('default')
    const result = new SettingProxy(
      { format: 'flat' },
      'some-type'
    ).retrieveSetting()
    expect(result).to.be.instanceOf(expected)
    expect(result.name).to.equal(`${SETTING_NAME_PREFIX}/default`)
  })

  it('resolve cjs setting correctly', () => {
    const expected = resolveModuleRef(SETTING_TYPES.CJS)
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.CJS
    ).retrieveSetting()
    expect(result).to.be.instanceOf(expected)
    expect(result.name).to.equal(`${SETTING_NAME_PREFIX}/${SETTING_TYPES.CJS}`)
  })

  it('resolve esm setting correctly', () => {
    const expected = resolveModuleRef(SETTING_TYPES.ESM)
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.ESM
    ).retrieveSetting()
    expect(result).to.be.instanceOf(expected)
    expect(result.name).to.equal(`${SETTING_NAME_PREFIX}/${SETTING_TYPES.ESM}`)
  })

  it('resolve nodejs setting correctly', () => {
    const expected = resolveModuleRef(SETTING_TYPES.NODEJS)
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.NODEJS
    ).retrieveSetting()
    expect(result).to.be.instanceOf(expected)
    expect(result.name).to.equal(
      `${SETTING_NAME_PREFIX}/${SETTING_TYPES.NODEJS}`
    )
  })

  it('resolve jest setting correctly', () => {
    const expected = resolveModuleRef(SETTING_TYPES.JEST)
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.JEST
    ).retrieveSetting()
    expect(result).to.be.instanceOf(expected)
    expect(result.name).to.equal(`${SETTING_NAME_PREFIX}/${SETTING_TYPES.JEST}`)
  })

  it('resolve vitest setting correctly', () => {
    const expected = resolveModuleRef(SETTING_TYPES.VITEST)
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.VITEST
    ).retrieveSetting()
    expect(result).to.be.instanceOf(expected)
    expect(result.name).to.equal(
      `${SETTING_NAME_PREFIX}/${SETTING_TYPES.VITEST}`
    )
  })

  it('resolve mocha setting correctly', () => {
    const expected = resolveModuleRef(SETTING_TYPES.MOCHA)
    const result = new SettingProxy(
      { format: 'flat' },
      SETTING_TYPES.MOCHA
    ).retrieveSetting()
    expect(result).to.be.instanceOf(expected)
    expect(result.name).to.equal(
      `${SETTING_NAME_PREFIX}/${SETTING_TYPES.MOCHA}`
    )
  })
})
