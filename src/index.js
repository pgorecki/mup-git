import { spawnSync } from 'child_process';
// import * as _commands from './commands';
// import validator from './validate';


export const name = 'GIT';
export const description = 'GIT tools';

// export const commands = _commands;
// export const validate = {
//   git: validator,
// };

const stripLineBreaks = str => str.replace(/(\r\n\t|\n|\r\t)/gm, '');

export const prepareConfig = (config) => {
  const branch = spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).stdout.toString();
  const tag = spawnSync('git', ['describe', '--tags']).stdout.toString();
  const commit = spawnSync('git', ['rev-parse', 'HEAD']).stdout.toString();

  const env = {
    GIT_BRANCH: stripLineBreaks(branch),
    GIT_TAG: stripLineBreaks(tag),
    GIT_COMMIT: stripLineBreaks(commit),
  };

  if (config.app.env) {
    Object.assign(config.app.env, env);
  } else {
    config.app.env = env;
  }
  return config;
};
