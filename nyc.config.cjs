module.exports = {
  all: true,
  include: ['src/**/*.cjs'],
  'exclude-node-modules': true,
  'report-dir': './.coverage',
  'temp-dir': './.nyc_output',
  'source-map': false,
  reporter: ['text', 'lcov'],
  /** thresholds */
  watermarks: {
    lines: [80, 100],
    functions: [80, 100],
    branches: [80, 100],
    statements: [80, 100],
  },
  'check-coverage': true,
  'per-file': true,
  clean: true,
}
