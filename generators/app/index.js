'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  // Note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: true });
    this.argument('type', { type: String, required: true });
    this.argument('description', { type: String, required: false });
    this.argument('valor3', { type: String, required: false });
    console.log(`Esto son args ${args}`);
    console.log(`Esto son opts.valor1 ${opts.valor1}`);
    console.log(`Esto son opts.valor2 ${opts.valor2}`);
    console.log(`Esto son opts.valor3 ${opts.valor3}`);
    // And you can then access it later; e.g.
    // this.log(this.options.appname);
  }

  // Initializing() {
  // this.composeWith(require.resolve('../component'));
  // }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the ' + chalk.red('proyect-base-front') + ' generator!'));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the appName?',
        default: this.options.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description?'
      },
      {
        type: 'list',
        name: 'proyect',
        message: 'What tipe of proyect?',
        choices: [
          {
            name: 'mvc',
            value: 'mvc'
          },
          {
            name: 'redux',
            value: 'redux'
          },
          {
            name: 'pwa',
            value: 'pwa'
          },
          {
            name: 'isomorfica/universal',
            value: 'universal'
          }
        ]
      },
      {
        type: 'list',
        name: 'script',
        message: "What 'language' do you like?",
        choices: [
          {
            name: 'TypeScript',
            value: 'ts'
          },
          {
            name: 'ES6',
            value: 'es6'
          }
        ]
      },
      {
        type: 'list',
        name: 'linter',
        message: 'What linter do you like?',
        choices: [
          {
            name: 'TSLint + AirBnB (only TS)',
            value: 'tsAirBnB'
          },
          {
            name: 'TSLint + Standard (only TS)',
            value: 'tsStd'
          },
          {
            name: 'Eslint + AirBnB',
            value: 'es6Airbnb'
          },
          {
            name: 'Eslint + Standard',
            value: 'es6Std'
          }
        ]
      },
      {
        type: 'list',
        name: 'preProcessor',
        message: 'What pre-processor do you like? (postCSS by default)',
        choices: [
          {
            name: 'scss/sass',
            value: 'scss'
          },
          {
            name: 'less',
            value: 'less'
          },
          {
            name: 'stylus',
            value: 'stylus'
          }
        ]
      },
      {
        type: 'list',
        name: 'unitTesting',
        message: 'Unit testing:',
        choices: [
          {
            name: 'Mocha + Chai',
            value: 'mocha'
          },
          {
            name: 'Jest',
            value: 'jest'
          }
        ]
      },
      {
        type: 'list',
        name: 'e2eTesting',
        message: 'E2E testing:',
        choices: [
          {
            name: 'Cypress (Only Chrome)',
            value: 'cypress'
          },
          {
            name: 'Nightwatch (Selenium based)',
            value: 'nightwatch'
          },
          {
            name: 'Protractor',
            value: 'protractor'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'cucumber',
        message: 'Do you like cucumber?',
        default: false
      },
      {
        type: 'confirm',
        name: 'sure',
        message: 'Are you sure?',
        default: false
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      console.log(this.options);
      if (props.sure) {
        if (this.options.appname == undefined) {
          this.options.appname = props.name;
        }
        this.props = props;
        this.name = props.name;
        this.description = props.description;
        this.proyect = props.proyect;
        this.script = props.script;
        this.linter = props.linter;
        this.preProcessor = props.preProcessor;
        this.unitTesting = props.unitTesting;
        this.e2eTesting = props.e2eTesting;
        this.cucumber = props.cucumber;
        this.sure = props.sure;

        this.log('your name is ', props.name);
        this.log('your description ', props.description);
        this.log('your proyect ', props.proyect);
        this.log('your script ', props.script);
        this.log('your linter ', props.linter);
        this.log('your preProcessor ', props.preProcessor);
        this.log('your unitTesting ', props.unitTesting);
        this.log('your e2eTesting ', props.e2eTesting);
        this.log('your cucumber ', props.cucumber);
        this.log('your sure ', props.sure);
      }
    });
  }

  evaluateRequest() {}

  writing() {
    if (this.sure) {
      this.fs.copyTpl(
        this.templatePath('./**'),
        this.destinationPath('./' + this.options.appname + '/'),
        {
          name: this.name,
          description: this.description,
          proyect: this.proyect,
          script: this.script,
          linter: this.linter,
          preProcessor: this.preProcessor,
          unitTesting: this.unitTesting,
          e2eTesting: this.e2eTesting,
          cucumber: this.cucumber,
          sure: this.sure
        }
      );
    }
    // This.fs.copyTpl(
    //   this.templatePath('./.*'),
    //   this.destinationPath('./' + this.options.appname + '/')
    // );
  }
  install() {
    if (this.sure) {
      this.npmInstall(null, null, { cwd: this.options.appname }).then(() =>
        this.log(chalk.green('Todo Listo!!'))
      );
    }
  }
};
