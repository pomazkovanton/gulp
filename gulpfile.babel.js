import { series, parallel } from 'gulp';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import config from './gulp/config';
import { scriptBuild, scriptWatch } from './gulp/tasks/scripts';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { sassBuild, sassWatch } from './gulp/tasks/styles';

config.setEnv();

export const build = series(
  clean,
  parallel(scriptBuild, pugBuild, sassBuild),
);

export const watch = series(
  build,
  server,
  parallel(pugWatch, scriptWatch, sassWatch),
);
