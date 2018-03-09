'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  // Note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: true });
    this.argument('type', { type: String, required: true });
    this.argument('description', { type: String, required: false });
    // This.argument('valor3', { type: String, required: false });
    console.log(`Esto son args ${args}`);
    // Console.log(`Esto son opts.valor1 ${opts.valor1}`);
    // console.log(`Esto son opts.valor2 ${opts.valor2}`);
    // console.log(`Esto son opts.valor3 ${opts.valor3}`);
  }

  // Initializing() {
  //   this.composeWith('proyect-base-front:component');
  // }

  prompting() {
    // Have Yeoman greet the user.
    this.name = this.options.appname;
    this.type = this.options.type;
    this.description = this.options.description;

    // This.log('your name is ', this.name);
    // this.log('your description ', this.description);
    // this.log('your type proyect ', this.type);
  }

  evaluateRequest() {}

  writing() {
    this.fs.copyTpl(
      this.templatePath('./**'),
      this.destinationPath('./' + this.options.appname + '/'),
      {
        name: this.name,
        description: this.description,
        proyect: this.type
      }
    );
  }
  install() {
    this.log(chalk.blue('Instalando Dependencias'));
    this.npmInstall(null, null, { cwd: this.options.appname }).then(() =>
      this.log(chalk.blue('Dependencias Instaladas!!'))
    );
  }
  end() {
    this.log(chalk.green('Use npm start para levantar la aplicacion en local'));
  }
};
