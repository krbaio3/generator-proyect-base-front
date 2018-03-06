'use strict';

// If you don't need more config, add and merge with other environments
const merge = require('webpack-merge');
const envProd = require('./prod.env');

module.exports = merge(envProd, {
  NODE_ENV: '"development"'
});
