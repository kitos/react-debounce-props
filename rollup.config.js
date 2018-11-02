import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.tsx',
    output: {
      name: 'ReactDebounceProps',
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
      globals: {
        react: 'React',
      },
    },
    external: ['react'],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      typescript(),
      uglify(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.tsx',
    external: ['react', 'lodash.debounce'],
    plugins: [typescript({
      tsconfigOverride: {
        target: 'es2015',
      },
    })],
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
  },
]
