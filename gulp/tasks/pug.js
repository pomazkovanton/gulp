import { watch, src, dest } from 'gulp';
import pug from 'gulp-pug';
import gulpif from 'gulp-if';
import { setup as emittySetup } from '@zoxon/emitty';
import plumber from 'gulp-plumber';
import pugLintStylish from 'puglint-stylish';
import pugLinter from 'gulp-pug-linter';
import config from '../config';

const emittyPug = emittySetup(config.src.pug, 'pug', {
  makeVinylFile: true,
});

global.watch = false;
global.emittyChangedFile = {
  path: '',
  stats: null,
};

export const pugBuild = () => (
  src(`${config.src.pug}/*.pug`)
    .pipe(plumber())
    .pipe(pugLinter({ reporter: pugLintStylish }))
    .pipe(
      gulpif(
        global.watch,
        emittyPug.stream(
          global.emittyChangedFile.path,
          global.emittyChangedFile.stats,
        ),
      ),
    )
    .pipe(gulpif(config.isDev, pug({ pretty: true })))
    .pipe(gulpif(config.isProd, pug({ pretty: false })))
    .pipe(dest(config.dest.html))
);

export const pugWatch = () => {
  global.watch = true;

  watch(`${config.src.pug}/**/*.pug`, pugBuild)
    .on('all', (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats,
      };
    });
};
