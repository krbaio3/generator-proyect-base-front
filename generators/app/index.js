'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  // Note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: false });

    // And you can then access it later; e.g.
    this.log(this.options.appname);
  }

  // Initializing() {
  // this.composeWith(require.resolve('../component'));
  // }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the ' + chalk.red('proyect-base-front') + ' generator!'));

    const prompts = [
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
            name: 'TSLint (only TS)',
            value: 'tsLint'
          },
          {
            name: 'Eslint + AirBnB',
            value: 'airbnb'
          },
          {
            name: 'Eslint + Standard',
            value: 'airbnb'
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
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.log('your name is ', props.name);
      this.log('your proyect ', props.proyect);
      this.log('your script ', props.script);
      this.log('your linter ', props.linter);
      this.log('your preProcessor ', props.preProcessor);
      this.log('your unitTesting ', props.unitTesting);
      this.log('your e2eTesting ', props.e2eTesting);
    });
  }

  evaluateRequest() {}

  writing() {
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
    // This.fs.copyTpl(
    //   this.templatePath('./.*'),
    //   this.destinationPath('./' + this.options.appname + '/')
    // );
  }

  install() {
    this.npmInstall(null, null, { cwd: this.options.appname }).then(() =>
      this.log(chalk.green('Todo Listo!!'))
    );
  }
};
