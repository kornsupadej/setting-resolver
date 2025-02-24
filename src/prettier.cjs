/** @type {import('./types').resolvePrettierSetting} */
function resolvePrettierSetting(prettierOptions) {
  return {
    printWidth: 80,
    tabWidth: 2,
    bracketSpacing: true,
    singleQuote: true,
    trailingComma: 'es5',
    semi: false,
    arrowParens: 'avoid',
    endOfLine: 'lf',
    ...prettierOptions,
  }
}
module.exports.resolvePrettierSetting = resolvePrettierSetting
