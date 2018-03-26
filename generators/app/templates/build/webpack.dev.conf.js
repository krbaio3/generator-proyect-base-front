const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf.js');
const helpers = require('./helpers');
const config = require('../config');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const EvalSourceMapDevToolPlugin = require('webpack/lib/EvalSourceMapDevToolPlugin');

const ENV = (process.env.NODE_ENV = config.dev.env.NODE_ENV);
const APP_CONFIG = {
  API_URL: 'dev.api.local'
};
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(
    baseWebpackConfig.entry[name]
  );
  console.log(`Esto es el name: ${name}`);
});

module.exports = webpackMerge(baseWebpackConfig, {
  module: {
    rules: [
      // extraer en funcion la generacion de loaders. Se quita CSS, habilitar cuando esté postCSS
      /**
       * Css loader support for *.css files (styles directory only)
       * Loads external css styles into the DOM, supports HMR
       *
       */
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [helpers.root('src', 'styles')]
      },

      /**
       * Sass loader support for *.scss files (styles directory only)
       * Loads external sass styles into the DOM, supports HMR
       *
       */
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [helpers.root('src', 'styles')]
      }
    ]
  },

  plugins: [
    /** Alternativa a devtool: https://webpack.js.org/plugins/eval-source-map-dev-tool-plugin/ */
    // new EvalSourceMapDevToolPlugin({
    //   moduleFilenameTemplate: '[resource-path]',
    //   sourceRoot: 'webpack:///',
    //   exclude: ['vendor.ts', 'pollyfills.ts']
    // }),
    new ExtractTextPlugin('[name].css'),

    new webpack.DefinePlugin({
      'process.env': {
        ENV: config.dev.env,
        APP_CONFIG: JSON.stringify(APP_CONFIG)
      }
    }),

    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ],
  // cheap-module-eval-source-map is faster for development
  // https://webpack.js.org/configuration/devtool/#devtool
  devtool: '#cheap-module-eval-source-map'
});
