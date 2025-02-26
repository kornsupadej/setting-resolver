const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const { globSync } = require('glob')
const path = require('node:path')

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: Object.fromEntries(
    globSync('src/**/*.cjs').map(file => [
      path.relative(
        'src',
        file.slice(0, file.length - path.extname(file).length)
      ),
      file,
    ])
  ),
  output: {
    dir: 'lib',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    getBabelOutputPlugin({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
  ],
}
