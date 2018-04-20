import * as handlers from './command-handlers';

export const setup = {
  description: 'Prepare server to run Wekan',
  handler: handlers.setup,
};

export const start = {
  description: 'Start Wekan',
  handler: handlers.start,
};

export const stop = {
  description: 'Stop Wekan',
  handler: handlers.stop,
};

export const logs = {
  description: 'View Wekan\'s logs',
  builder(yargs) {
    return yargs
      // Since any docker log option is allowed, disable validating options
      .strict(false)
      .option('tail', {
        description: 'Number of lines to show from the end of the logs',
        alias: 't',
        number: true,
      })
      .option('follow', {
        description: 'Follow log output',
        alias: 'f',
        boolean: true,
      });
  },
  handler: handlers.logs,
};
