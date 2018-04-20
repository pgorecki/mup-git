import * as _commands from './commands';
import validator from './validate';

export const name = 'GIT';
export const description = 'GIT tools';

export const commands = _commands;

export const validate = {
  wekan: validator,
};

export const prepareConfig = (config) => {
  console.log(config);
  return config;
}

function onlyWekanEnabled(...commandList) {
  return function run(api) {
    if (api.getConfig().wekan) {
      const promise = api.runCommand(commandList.shift());

      commandList.forEach((command) => {
        promise.then(() => api.runCommand(command));
      });

      return promise;
    }
  };
}

export const hooks = {
  // 'post.default.setup': onlyWekanEnabled('wekan.setup', 'wekan.start'),
};
