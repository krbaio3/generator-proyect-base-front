const pkg = require('./package.json').devDependencies;

console.log(`Foo ${Object.prototype.hasOwnProperty.call(pkg, 'fs')}`);
