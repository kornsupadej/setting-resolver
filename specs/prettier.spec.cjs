const expect = require('chai').expect

const { resolvePrettierSetting } = require('../src/prettier.cjs')

describe('#resolvePrettierSetting', () => {
  it('resolve default prettier setting correctly', () => {
    expect(resolvePrettierSetting()).to.deep.equal({
      printWidth: 80,
      tabWidth: 2,
      bracketSpacing: true,
      singleQuote: true,
      trailingComma: 'es5',
      semi: false,
      arrowParens: 'avoid',
      endOfLine: 'lf',
    })
  })

  it('resolve extended prettier setting correctly', () => {
    expect(
      resolvePrettierSetting({
        someArbitraryAttribute: 'hello',
      })
    ).to.deep.equal({
      printWidth: 80,
      tabWidth: 2,
      bracketSpacing: true,
      singleQuote: true,
      trailingComma: 'es5',
      semi: false,
      arrowParens: 'avoid',
      endOfLine: 'lf',
      someArbitraryAttribute: 'hello',
    })
  })

  it('resolve override prettier setting correctly', () => {
    expect(
      resolvePrettierSetting({
        printWidth: 100,
      })
    ).to.deep.equal({
      printWidth: 100,
      tabWidth: 2,
      bracketSpacing: true,
      singleQuote: true,
      trailingComma: 'es5',
      semi: false,
      arrowParens: 'avoid',
      endOfLine: 'lf',
    })
  })
})
