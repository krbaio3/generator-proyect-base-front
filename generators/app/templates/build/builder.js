/**
 * Configuracion de ruteo
 */

const config = require('../config');
const helpers = require('./helpers');

// En vendor deberían de estar las librerías de terceros comunes a todo el proyecto, para así partirlo y que la carga sea más rpida
const entry = {
  polyfills: './src/polyfills.ts',
  vendor: './src/vendor.ts',
  main: './src/main.ts'
};

const output = {
  /**
   * The output directory as absolute path (required).
   * See: https://webpack.js.org/configuration/output/#output-path
   */
  path: config.build.assetsRoot,
  /* Specifies the name of each output file on disk.
  * IMPORTANT: You must not specify an absolute path here!
  * See: https://webpack.js.org/configuration/output/#output-filename
  */
  filename: '[name].js',
  /** The filename of non-entry chunks as relative path
   * inside the output.path directory.
   *
   * See: https://webpack.js.org/configuration/output/#output-chunkfilename
   */
  chunkFilename: '[id].chunk.js',
  // See: https://webpack.js.org/configuration/output/#output-publicpath
  publicPath:
    process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
  /**
   * The filename of the SourceMaps for the JavaScript files.
   * They are inside the output.path directory.
   *
   * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
   */
  sourceMapFilename: '[file].map',
  // See: https://webpack.js.org/configuration/output/#output-library
  library: 'ac_[name]',
  // See: https://webpack.js.org/configuration/output/#output-library-target
  libraryTarget: 'var'
};

const METADATOS_DEFECTO = {
  title: 'Proyect Base Front',
  baseUrl: '/',
  // HMR: helpers.hasProcessFlag('hot'),
  AOT: process.env.BUILD_AOT || helpers.hasNpmFlag('aot'),
  WATCH: helpers.hasFlag('watch'),
  E2E: !!process.env.BUILD_E2E,
  // WATCH: helpers.hasProcessFlag('watch'),
  tsConfigPath: 'tsconfig.json',
  fixTs: true,
  formatter: 'grouped',
  urlFormatter: 'node_modules/custom-tslint-formatters/formatters',
  /**
   * This suffix is added to the environment.ts file, if not set the default environment file is loaded (development)
   * To disable environment files set this to null
   */
  envFileSuffix: ''
};

exports.entry = entry;
exports.output = output;
exports.METADATOS_DEFECTO = METADATOS_DEFECTO;
