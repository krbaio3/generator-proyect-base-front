#!/usr/bin/env node
const prog = require('caporal');
const createApp = require('./lib/createProject');
const createComp = require('./lib/createComponent');

prog
  // Command for new app
  .version('1.0.0')
  .command('new', 'Create a new application')
  .help('Help for new command')
  .argument('<appName>', 'Name of the app')
  .option(
    '--type <type>',
    'Which <type> of app is going to be created',
    ['mvc', 'pwa', 'redux'],
    'mvc',
    true
  )
  .action(createApp)
  // Command for new component
  .command('create', 'Create a new asset')
  .help('Help for create command')
  .argument('<type>', 'Type of asset')
  .argument('<name>', 'Name of asset')
  .action(createComp);
prog.parse(process.argv);
