const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
//REVUISARLO
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;

const ngcWebpack = require('ngc-webpack');
const path = require('path');
const helpers = require('./helpers');
const utils = require('./utils');
const config = require('../config');
const builder = require('./builder');

console.log(`Variable de entorno: ${config.dev.env.NODE_ENV}`);

const isProduction = config.dev.env.NODE_ENV == 'production';

console.log(`is production: ${isProduction}`);

console.log(`builder.Metadatos: ${builder.METADATOS}`);

const ngcWebpackConfig = utils.ngcWebpackSetup(isProduction, builder.METADATOS);

const assetsLoader = utils.assetsLoader(10 * 1024);

const tsLintLoader = utils.tsLintLoader(
  [helpers.resolve('src'), helpers.resolve('test')],
  builder.METADATOS
);

const preAssetsLoader = utils.preAssetsLoader(isProduction);

Object.assign(ngcWebpackConfig.plugin, {
  tsConfigPath: builder.METADATOS.tsConfigPath,
  mainPath: builder.entry.main
});

module.exports = {
  entry: builder.entry,

  output: builder.output,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    // Indicamos el alias para que al hacer el import, sepa dónde tiene que ir a buscar
    alias: {
      '@': helpers.resolve('src')
    },
    /**
     * Indique a webpack qué directorios se deben buscar al resolver módulos.
     *
     * See: https://webpack.js.org/configuration/resolve/#resolve-modules
     */
    modules: [helpers.root('src'), helpers.root('node_modules')]
  },
  module: {
    rules: [
      // Trocear loaders en PRE

      ...tsLintLoader,
      // See: https://github.com/tcoopman/image-webpack-loader
      ...preAssetsLoader,

      // equivalente al typescript loader
      // See: https://github.com/shlomiassaf/ngc-webpack
      ...ngcWebpackConfig.loaders,
      /**
       * To string and css loader support for *.css files (from Angular components)
       * Returns file content as string
       *
       */
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        exclude: [helpers.root('src', 'styles')]
      },

      /**
       * To string and sass loader support for *.scss files (from Angular components)
       * Returns compiled css content as string
       *
       */
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader'],
        exclude: [helpers.root('src', 'styles')]
      },

      /**
       * Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      // html loader
      {
        test: /\.html$/,
        use: 'raw-loader',
        exclude: [helpers.root('index.html')]
      },

      // Assets Loader
      // See:
      // * https://github.com/bhovhannes/svg-url-loader
      // * https://github.com/webpack-contrib/url-loader
      ...assetsLoader
    ]
  },

  plugins: [
    // si no separamos en app y vendor, cada vez que usamos una libreria de terceros, copia y pega el codigo, esto optimiza lo repetido en un vendor
    // todo el codigo comun lo quita y lo pone en vendor
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills',
      chunks: ['polyfills']
    }),

    
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'inline'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      async: 'common',
      children: true,
      minChunks: 2
    }),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['vendor']
    }),
    //Con la nueva configuracion de desarrollo no hace falta
    // new CopyWebpackPlugin([
    //   {
    //     from: 'src/assets',
    //     to: 'assets'
    //   }
    // ]),

    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),

    /**
     * Plugin: ScriptExtHtmlWebpackPlugin
     * Description: Enhances html-webpack-plugin functionality
     * with different deployment options for your scripts including:
     *
     * See: https://github.com/numical/script-ext-html-webpack-plugin
     */
    new ScriptExtHtmlWebpackPlugin({
      sync: /inline|polyfills|vendor|main/,
      defaultAttribute: 'async',
      preload: [/polyfills|vendor|main/],
      prefetch: [/chunk/]
    }),

    new ngcWebpack.NgcWebpackPlugin(ngcWebpackConfig.plugin),

    /**
     * LLevarlo a utils
     */

    // See: https://github.com/angular/angular-cli/tree/master/packages/%40ngtools/webpack
    // new AngularCompilerPlugin({
    //   tsConfigPath: builder.METADATOS.tsConfigPath,
    //   entryModule: 'src/app/app.module#AppModule',
    //   sourceMap: true
    // }),

    /**
     * Plugin: InlineManifestWebpackPlugin
     * Inline Webpack's manifest.js in index.html
     * Lo que antes poniamos como manifest, ahora no podemos ponerlo por la version
     * del htmlPlugin, ahora lo ponemos con el InlineManifest....
     *
     * https://github.com/szrenwei/inline-manifest-webpack-plugin
     */
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),

    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      helpers.resolve('src')
    ),
    // See: https://github.com/webpack-contrib/extract-text-webpack-plugin
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true
    })
  ]
};
