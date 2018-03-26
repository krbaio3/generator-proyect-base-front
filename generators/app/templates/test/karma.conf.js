// Karma configuration
// Generated on Wed Mar 21 2018 15:32:59 GMT+0100 (CET)

module.exports = function(config) {
  const testWebpackConfig = require('./build/webpack.test.conf.js');
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: './test/index.ts', watched: false },
      {
        pattern: './src/assets/**/*',
        watched: false,
        included: false,
        served: true,
        nocache: false
      }
    ],

    client: {
      captureConsole: false
    },

    // list of files / patterns to exclude
    exclude: ['node_modules'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: http://karma-runner.github.io/2.0/config/preprocessors.html
    // Add 'coverage' for config Coverage
    preprocessors: {
      './test/index.ts': ['webpack', 'sourcemap'],
      'src/app/**/!(*.spec).ts': ['webpack', 'sourcemap', 'coverage']
      // './src/**/*.ts': ['webpack', 'sourcemap', 'coverage']
    },

    // For Chrome, see https://stackoverflow.com/a/41737178/7961940
    // Redefine default mapping from file extensions to MIME-type
    // Set property name to required MIME, provide Array of extensions (without dots) as it's value
    mime: {
      'text/x-typescript': ['ts']
    },

    //Webpack Config at ./build/webpack.test.conf.js
    webpack: testWebpackConfig,

    // Not throw spam to console when running in karma
    // https://github.com/webpack/webpack-dev-middleware
    webpackMiddleware: {
      //webpack-dev-middleware configuration
      noInfo: false,
      // This property defines the level of messages that the module will log. Valid levels include: trace, debug, info, warn, error, silent
      logLevel: 'debug',
      // and use stats to turn off verbose output
      stats: {
        // options i.e.
        chunks: false
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // coverage reporter generates the coverage
    reporters: ['mocha', 'coverage', 'remap-coverage'],

    // web server port
    port: 9876,

    // By default all assets are served at http://localhost:[PORT]/base/
    //base in the URL, it is a reference to your basePath. You do not need to replace or provide your own base.
    proxies: {
      '/assets/': '/base/src/assets/',
      '/public/': '/base/public/'
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    // browsers: ['Chrome', 'Chrome_without_security', 'PhantomJS'],
    // browsers: ['Chrome', 'PhantomJS'],
    // you can define custom flags
    // customLaunchers: {
    //   Chrome_without_security: {
    //     base: 'Chrome',
    //     flags: ['--disable-web-security', '--no-sandbox']
    //   }
    // },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    /**
     * Custom config to Coverage
     */

    // optionally, configure the reporter
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
      subdir: browser => {
        // normalization process to keep a consistent browser name across different
        return browser.toLowerCase().split(/[ /-]/)[0];
      },
      check: {
        global: {
          statements: 75,
          branches: 75,
          functions: 75,
          lines: 75
          // excludes: ['foo/bar/**/*.js']
        },
        each: {
          statements: 75,
          branches: 75,
          functions: 75,
          lines: 75
          // excludes: ['other/directory/**/*.js'],
          // overrides: {
          //   'baz/component/**/*.js': {
          //     statements: 98
          //   }
          // }
        }
      }
    },

    // define where to save final remaped coverage reports
    remapCoverageReporter: {
      'text-summary': null,
      html: 'coverage/',
      cobertura: 'coverage/cobertura.xml',
      json: 'coverage/coverage.json'
    },

    // reporter options
    mochaReporter: {
      output: 'autowatch'
      // colors: {
      //   success: 'green',
      //   info: 'yellow',
      //   warning: 'orange',
      //   error: 'red'
      // }
      // symbols: {
      //   success: '+',
      //   info: '#',
      //   warning: '!',
      //   error: 'x'
      // }
    }
  });
};
