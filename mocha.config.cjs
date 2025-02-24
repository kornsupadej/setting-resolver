module.exports = {
  spec: 'specs/**/*.spec.cjs',
  extension: ['js', 'cjs'],
  package: './package.json',
  ui: 'bdd',
  reporter: 'spec',
  diff: true,
  slow: 75,
  timeout: 2000,
  recursive: true,
  'watch-files': ['**/src/**/*.cjs', '**/specs/**/*.spec.cjs'],
  'watch-ignore': ['**/node_modules/*', '**/.git/*'],
}
