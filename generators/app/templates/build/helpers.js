const path = require('path');
const _root = path.resolve(__dirname, '..');
const EVENT = process.env.npm_lifecycle_event || '';

exports.root = function(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
};

exports.removeWarning = __path => path.join(__dirname, __path);

exports.resolve = dir => path.join(__dirname, '..', dir);

exports.hasNpmFlag = flag => EVENT.includes(flag);

exports.hasFlag = flag => process.argv.join('').indexOf(flag) > -1;
