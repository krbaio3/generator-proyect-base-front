const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf.js');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const helpers = require('./helpers');
const config = require('../config');
const utils = require('./utils');

const ENV =
  process.env.NODE_ENV == 'production'
    ? config.build.env.NODE_ENV
    : config.dev.env.NODE_ENV;
console.log('ENV ===> ', ENV);
console.log('process.env.NODE_ENV ===> ', process.env.NODE_ENV);
const APP_CONFIG = {
  API_URL: 'prod.api.local'
};

module.exports = webpackMerge(baseWebpackConfig, {
  module: {
    rules: [
      /**
       * Extract CSS files from .src/styles directory to external CSS file
       */
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        include: [helpers.root('src', 'styles')]
      },

      /**
       * Extract and compile SCSS files from .src/styles directory to external CSS file
       */
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{loader: 'css-loader',},{loader: 'sass-loader'},]
        }),
        include: [helpers.root('src', 'styles')]
      }
    ]
  },

  devtool: 'source-map',

  plugins: [
    /**
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     *
     * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
     */
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: utils.getUglifyOptions,
      // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),

    new PurifyPlugin() /* buildOptimizer */,

    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 20
    }),
    //Dependencias Cíclicas. Analizar cómo se hacen el import de dependencias desde Module hasta los servicios
    // new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        ENV: config.build.env,
        APP_CONFIG: JSON.stringify(APP_CONFIG)
      }
    })
  ],
});
