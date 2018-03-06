'use strict';
const Generator = require('yeoman-generator');
const rename = require('gulp-rename');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.opts = opts;
    this.argument('componentName', { type: String, required: false });

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
        this.props
      );
    };
  }

  writing() {
    this.renameCustomFiles(
      './angular/components',
      `./${this.opts.componentName}`,
      'component'
    );
    this.renameCustomFiles('./angular/actions', './actions', 'actions');
    this.renameCustomFiles('./angular/models', './model', 'model');
    this.renameCustomFiles('./angular/reducers', './reducers', 'reducer');
  }

  install() {
    // This.installDependencies();
  }
};
