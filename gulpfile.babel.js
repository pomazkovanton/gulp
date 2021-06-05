import { series, parallel } from 'gulp';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import config from './gulp/config';
import { scriptBuild, scriptWatch } from './gulp/tasks/scripts';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { sassBuild, sassWatch } from './gulp/tasks/styles';
import { fontsBuild, fontsWatch } from './gulp/tasks/fonts';
import { imagesBuild, imagesWatch } from './gulp/tasks/images';
import { spritesBuild, spritesWatch } from './gulp/tasks/sprite';
import { lintBuild, lintWatch } from './gulp/tasks/lint';

config.setEnv();

export const build = series(
  clean,
  lintBuild,
  parallel(
    scriptBuild,
    pugBuild,
    sassBuild,
    fontsBuild,
    imagesBuild,
    spritesBuild,
  ),
);

export const watch = series(
  build,
  server,
  parallel(pugWatch, scriptWatch, sassWatch, fontsWatch, imagesWatch, spritesWatch, lintWatch),
);
