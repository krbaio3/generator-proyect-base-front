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
        type: 'checkbox',
        name: 'prueba',
        message: 'prueba checkbox:',
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
    this.fs.copy(
      this.templatePath('./**/*'),
      this.destinationPath('./' + this.options.appname)
    );
    this.fs.copyTpl(
      this.templatePath('./package.json'),
      this.destinationPath('./' + this.options.appname + '/package.json'),
      { title: this.options.appname }
    );
    this.fs.copyTpl(
      this.templatePath('./static/manifest.json'),
      this.destinationPath('./' + this.options.appname + '/static/manifest.json'),
      { title: this.options.appname }
    );
  }
  install() {
    // This.installDependencies();
  }
};
