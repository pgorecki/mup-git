export function setup(api, nodemiral) {
  if (!api.getConfig().wekan) {
    console.log('No setting in config for Wekan');

    return;
  }

  const sessions = api.getSessions(['wekan']);
  const list = nodemiral.taskList('Setup Wekan');

  list.executeScript('Setup Environment', {
    script: api.resolvePath(__dirname, 'assets/setup.sh'),
  });

  return api.runTaskList(list, sessions, { verbose: api.verbose });
}

export function start(api, nodemiral) {
  const sessions = api.getSessions(['wekan']);
  const wekanConfig = api.getConfig().wekan;
  const list = nodemiral.taskList('Start Wekan');

  list.executeScript('Start Wekan', {
    script: api.resolvePath(__dirname, 'assets/start.sh'),
    vars: {
      version: wekanConfig.version || 'latest',
    },
  });

  return api.runTaskList(list, sessions, { verbose: api.verbose });
}

export function stop(api, nodemiral) {
  const sessions = api.getSessions(['wekan']);
  const list = nodemiral.taskList('Stop Wekan');

  list.executeScript('Stop Wekan', {
    script: api.resolvePath(__dirname, 'assets/stop.sh'),
  });

  return api.runTaskList(list, sessions, { verbose: api.verbose });
}

export function logs(api) {
  const args = api.getArgs();
  const sessions = api.getSessions(['wekan']);

  // remove plugin name from args
  args.shift();

  return api.getDockerLogs('wekan', sessions, args);
}
