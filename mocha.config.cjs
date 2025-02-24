module.exports = {
  spec: 'specs/**/*.spec.cjs',
  extension: ['js', 'cjs'],
  diff: true,
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 2000,
  ui: 'bdd',
  recursive: true,
  'watch-files': ['**/src/**/*.cjs', '**/specs/**/*.spec.cjs'],
  'watch-ignore': ['node_modules', '.git'],
}
