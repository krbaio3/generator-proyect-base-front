'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const packageJSON = require('../app/templates/package.json');
const rename = require('gulp-rename');
// Const exec = require('child_process').exec;
// const path = require('path');
// const shelljs = require('shelljs');

module.exports = class extends Generator {
  // Note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument('componentName', { type: String, required: false });
    this.pkgJSON = packageJSON.dependencies;
    // Console.log('fooo', path.dirname(__dirname));
    // console.log('fooooo', shelljs.exec('pwd')[0]);

    this.renameCustomFiles = folder => {
      this.registerTransformStream(
        rename(path => {
          path.basename = path.basename.replace(
            /component/g,
            this.props.componentName + '.component'
          );
        })
      );
      this.fs.copyTpl(
        this.templatePath(folder),
        this.destinationPath('./src/' + this.props.name),
        this.props
      );
    };

    // And you can then access it later; e.g.
    this.props = null;
    this.child = null;
  }
  prompting() {
    this.props = {
      name: this.options.componentName,
      styles: this.options.styles,
      componentName: this.options.componentName
    };
    this.log(chalk.blue(`Generando componente: ${this.options.componentName}`));
    this.log(chalk.yellow(`Cargando`));
  }

  writing() {
    this.fs.copyTpl(this.templatePath('./angular/**'), this.destinationPath('./src/'), {
      // Name: this.name,
      // description: this.description,
      // proyect: this.type
      // HtmlWebpackPlugin: {
      //   files: {
      //     webpackManifest: '<%=htmlWebpackPlugin.files.webpackManifest%>'
      //   }
      // }
    });
    // This.fs.copyTpl(
    //   this.templatePath('./.*'),
    //   this.destinationPath('./' + this.options.appname + '/')
    // );
  }
};
