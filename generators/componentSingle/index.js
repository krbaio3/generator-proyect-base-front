'use strict';
const Generator = require('yeoman-generator');
const rename = require('gulp-rename');
const chalk = require('chalk');
const { capitalize } = require('../../lib/helper');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.opts = opts;
    this.argument('componentName', { type: String, required: false });
    this.capitalize = capitalize;

    this.renameCustomFiles = (folder, output, regex) => {
      this.registerTransformStream(
        rename(path => {
          path.basename = path.basename.replace(
            new RegExp(regex, 'gi'),
            opts.componentName + `.${regex}`
          );
        })
      );
      this.fs.copyTpl(
        this.templatePath(`${folder}`),
        this.destinationPath(`./src/app/${output}`),
        // This.props
        {
          componentName: this.opts.componentName,
          capitalize
        }
      );
    };
  }

  writing() {
    this.renameCustomFiles('./components', `./${this.opts.componentName}`, 'component');
    // This.renameCustomFiles('./actions', './actions', 'actions');
    // this.renameCustomFiles('./models', './model', 'model');
    // this.renameCustomFiles('./reducers', './reducers', 'reducer');
  }

  // Install() {
  //   this.installDependencies();
  // }

  end() {
    this.log(chalk.green('Component create!'));
  }
};
