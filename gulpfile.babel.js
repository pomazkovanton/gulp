import { series } from 'gulp';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import config from './gulp/config';
import { scriptBuild, scriptWatch } from './gulp/tasks/scripts';

config.setEnv();

export const build = series(
  clean,
  scriptBuild,
);

export const watch = series(
  build,
  server,
  scriptWatch,
);
