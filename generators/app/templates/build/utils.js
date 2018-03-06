'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const config = require('../config');
const fs = require('fs');

function assetsPath(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
}

exports.assetsPath = assetsPath;

exports.cssLoaders = (options, include, exclude) => {
  options = options || {};
  include = include || {};
  exclude = exclude || {};

  const cssLoader = {
    loader: 'raw-loader',
    include: helpers.root('src', 'app')
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader];
    console.log('loaders =>', loaders);
    if (loader) {
      // console.log('loader =>', loader);
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
      // console.log('loaders dentro if =>', loaders);
    }
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      });
    } else {
      return ['style-loader'].concat(loaders);
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
  };
};

// Generate loaders for standalone style files
exports.styleLoaders = (options, include, exclude) => {
  const output = [];
  const loaders = exports.cssLoaders(options);
  console.log('results =>', loaders);
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }
  console.log('output => ', output);
  return output;
};

/* ======================================================== */
function getEnvFile(suffix) {
  if (suffix && suffix[0] !== '.') {
    suffix = '.' + suffix;
  }

  if (suffix === null) {
    return;
  }
  console.log(`src/environments/environment${suffix}.ts`);

  let fileName = helpers.root(`src/environments/environment${suffix}.ts`);

  console.log(fileName);

  if (fs.existsSync(fileName)) {
    return fileName;
  } else if (
    fs.existsSync((fileName = helpers.root('src/environments/environment.ts')))
  ) {
    console.warn(
      `Could not find environment file with suffix ${suffix}, loading default environment file`
    );
    return fileName;
  } else {
    throw new Error('Environment file not found.');
  }
}

// Se le pasa el entorno por el merge de webpack
// metadatos
// configuracion de ngc-webpack, transforma los ts de angular
exports.ngcWebpackSetup = (prod, metadata) => {

  if (!metadata) {
    metadata = DEFAULT_METADATA;
  }

  console.log(`metadata ${JSON.stringify(metadata, null, 4)}`);
  console.log(`prod ${JSON.stringify(prod, null, 4)}`);

  const buildOptimizer = prod && metadata.AOT;

  console.log(`Optimizacion: ${buildOptimizer}`);

  console.log(
    `prod ${JSON.stringify(prod, null, 4)}  metadata.AOT ${JSON.stringify(
      metadata.AOT,
      null,
      4
    )}`
  );

  const sourceMap = true; // TODO: apply based on tsconfig value?
  let ngcWebpackPluginOptions = {
    skipCodeGeneration: !metadata.AOT,
    sourceMap
  };

  const environment = getEnvFile(metadata.envFileSuffix);
  if (environment) {
    ngcWebpackPluginOptions.hostReplacementPaths = {
      [helpers.root('src/environments/environment.ts')]: environment
    };
  }

  if (!prod && metadata.WATCH) {
    // Force commonjs module format for TS on dev watch builds.
    ngcWebpackPluginOptions.compilerOptions = {
      module: 'commonjs'
    };
  }

  const buildOptimizerLoader = {
    loader: '@angular-devkit/build-optimizer/webpack-loader',
    options: {
      sourceMap
    }
  };

  const loaders = [
    {
      test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
      use: buildOptimizer
        ? [buildOptimizerLoader, '@ngtools/webpack']
        : ['@ngtools/webpack']
    },
    ...(buildOptimizer ? [{ test: /\.js$/, use: [buildOptimizerLoader] }] : [])
  ];

  console.log(
    `buildOptimizerLoader ${JSON.stringify(buildOptimizerLoader, null, 4)}`
  );
  console.log(`loaders ${JSON.stringify(loaders, null, 4)}`);

  return {
    loaders,
    plugin: ngcWebpackPluginOptions
  };
};

// Exporta los pre-loader para que sea más legible el webpack base
exports.tsLintLoader = (include, metadatos) => {
  let tslint = [
    {
      test: /\.tsx?$/,
      loader: 'tslint-loader',
      enforce: 'pre',
      include: include,
      options: {
        // automatically fix linting errors
        fix: metadatos.fixTs,
        // can specify a custom tsconfig file relative to current directory or with absolute path
        // to be used with type checked rules
        tsConfigFile: metadatos.tsConfigPath,
        // name of your formatter (optional)
        formatter: metadatos.formatter,
        // path to directory containing formatter (optional)
        formattersDirectory: metadatos.urlFormatter
      }
    }
  ];

  return tslint;
};

// Exporta loader PRE (preprocesa primero si es necesario) de assets

exports.preAssetsLoader = isProduction => {
  let image = [
    // Specify enforce: 'pre' to apply the loader
    // before url-loader/svg-url-loader
    // and not duplicate it in rules with them

    //ver articulo de iamakulov
    {
      test: /\.(gif|png|jpe?g)(\?.*)?$/,
      enforce: 'pre',
      use: [
        {
          loader: 'file-loader',
          options: {
            name: assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            name: assetsPath('img/[name].[hash:7].[ext]'),
            bypassOnDebug: !isProduction,
            mozjpeg: {
              progressive: true,
              quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        }
      ]
    }
  ];

  return image;
};

// Exporta loader de assets
exports.assetsLoader = limit => {
  let svg = [
    {
      test: /\.svg$/,
      loader: 'svg-url-loader',
      options: {
        // Images larger than 10 KB won’t be inlined
        limit,
        // Remove quotes around the encoded URL –
        // they’re rarely useful
        noquotes: true
      }
    }
  ];

  let media = [
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: limit,
        name: assetsPath('media/[name].[hash:7].[ext]')
      }
    }
  ];

  let fonts = [
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: limit,
        name: assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }
  ];

  return []
    .concat(svg)
    .concat(media)
    .concat(fonts);
};
