'use strict'

require('./check-versions')()

process.env.NODE_ENV = 'production'

const config = require('../config')
const ora = require('ora')
const rimraf = require('rimraf')
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const webpackProdConfig = require('./webpack.prod.conf')

const spinner = ora('Building for production...')
spinner.start()

rimraf(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackProdConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
