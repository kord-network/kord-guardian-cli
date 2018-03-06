import babel from 'rollup-plugin-babel'
// import butternut from 'rollup-plugin-butternut'
import replace from 'rollup-plugin-replace'

const pkg = require('./package.json')

const banner = '#!/usr/bin/env node'
// const isTest = process.env.TEST

export default {
  input: './lib/index.js',
  external: ['chalk', 'fs-extra', 'inquirer', 'path', 'sade', 'slugify'],
  plugins: [
    replace({
      values: {
        VERSION: JSON.stringify(pkg.version),
      },
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    // !isTest && butternut(),
  ],
  output: [
    {
      banner: banner,
      file: pkg.main,
      format: 'cjs',
      name: pkg.name,
      sourcemap: true,
    },
    {
      banner: banner,
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
}
