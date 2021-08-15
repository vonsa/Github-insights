import svelte from 'rollup-plugin-svelte'
import { config } from 'dotenv'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import css from 'rollup-plugin-css-only'
import preprocess, { scss } from 'svelte-preprocess'
import replace from '@rollup/plugin-replace'
import scssPlugin from 'rollup-plugin-scss'
import { babel } from '@rollup/plugin-babel'
import { svelteSVG } from 'rollup-plugin-svelte-svg'

const production = !process.env.ROLLUP_WATCH

function serve() {
  let server

  function toExit() {
    if (server) server.kill(0)
  }

  return {
    writeBundle() {
      if (server) return
      /* eslint-disable global-require */
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      })
      /* eslint-enable global-require */

      process.on('SIGTERM', toExit)
      process.on('exit', toExit)
    },
  }
}

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    production
      ? replace({ 'process.env.NODE_ENV': JSON.stringify('production') })
      : replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    replace({
      'process.env.NODE_ENV': process.env.NODE_ENV,
      'process.env': JSON.stringify({
        isProd: production,
        ...config().parsed, // attached the .env config
      }),
    }),
    svelte({
      preprocess: preprocess([
        scss({
          /* eslint-disable global-require */
          includePaths: ['src', 'node_modules'],
          /* eslint-enable global-require */
        }),
      ]),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    scssPlugin(),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),
    svelteSVG({
      svgo: {},
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
}
