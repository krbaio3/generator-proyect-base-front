'use strict'

const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  console.log('options --', options)
  console.log('process.env.NODE_ENV  ', process.env.NODE_ENV)
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'development',
      sourceMap: options.sourceMap
    }
  }

  console.log('genera CSS-LOADER', cssLoader)

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    console.log('------------------------')
    console.log('Loader => ', loader)
    console.log('LoaderOptions => ', loaderOptions)

    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      })
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files
exports.styleLoaders = function (options) {
  console.log('entra => ', options)
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
