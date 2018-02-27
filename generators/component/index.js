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
    // If (Object.prototype.hasOwnProperty.call(this.pkgJSON, '@angular/core')) {
    this.renameCustomFiles('./angular/*');

    // Para usar el generador de angular-cli
    /* this.child = exec(
        `ng generate component ${this.options.componentName}`,
        (error, stdout) => {
          this.log(chalk.blue(stdout));
          if (error !== null) {
            this.log(chalk.red(`exec error: + ${error}`));
          }
        }
      ); */

    // Para siguientes fases:

    /* } else if (Object.prototype.hasOwnProperty.call(this.pkgJSON, 'react')) {
      // Componente tipo React
      this.renameCustomFiles('./react/*.ts');
      // } else if (this.pkgJSON.hasOwnProperty('vue')) {
    } else if (Object.prototype.hasOwnProperty.call(this.pkgJSON, 'vue')) {
      // Componente tipo Vue 2
      this.renameCustomFiles('./vue/*');
    } else {
      // No está definido ninguna librería o freamework
      this.renameCustomFiles('./default/*');
    } */
  }
};
