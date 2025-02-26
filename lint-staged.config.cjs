/** @type {import('lint-staged').Configuration} */
module.exports = {
  '*.?(c|m)[jt]s?(x)': ['eslint --fix', 'prettier --write'],
  '*.{json,y?(a)ml}': ['prettier --write'],
}
