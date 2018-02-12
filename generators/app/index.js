'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the legendary ' + chalk.red('proyect-base-front') + ' generator!')
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
      },
      {
        type: 'list',
        name: 'city',
        message: 'What city do you like?',
        choices: [
          {
            name: 'Madrid',
            value: 'madrid'
          },
          {
            name: 'Barcelona',
            value: 'barcelona'
          },
          {
            name: 'Paris',
            value: 'paris'
          },
          {
            name: 'London',
            value: 'london'
          },
          {
            name: 'Berlin',
            value: 'berlin'
          }
        ]
      },
      {
        type: 'checkbox',
        name: 'contentTypeOptions',
        message: 'Other options:',
        choices: [
          {
            name: 'Custom Admin Title callback',
            value: 'adminTitleCallback'
          },
          {
            name: 'Custom Admin Info callback',
            value: 'adminInfoCallback'
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.log('your name is ', props.name);
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
