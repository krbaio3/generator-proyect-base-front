const prompt = require('prompt');
const shell = require('shelljs');
const colors = require('colors/safe');
const art = require('ascii-art');

prompt.message = colors.green('Replace');

module.exports = (args, options, logger) => {
  art
    .font('Prueba', 'Doom', 'red')
    .font('Digital', 'Doom', 'magenta')
    .font('CLI', 'Doom', 'red', function(rendered) {
      console.log(rendered);
      if (!shell.which('yo')) {
        shell.echo('Sorry, this script requires yeoman');
        shell.exit(1);
      }

      if (shell.exec('ls -trol').code !== 0) {
        shell.echo('Error: Yo commit failed');
        shell.exit(1);
      } else if (shell.exec('ls -trol').code === 0) {
        logger.info(args.type + ' ' + args.name + ' created!');
      }
    });
};
