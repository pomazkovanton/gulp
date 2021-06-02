import { watch, src, dest } from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify-es';
import notify from 'gulp-notify';
import eslint from 'gulp-eslint';
import gulpif from 'gulp-if';
import webpackConfig from '../../webpack.config';
import config from '../config';

export const scriptBuild = () => src(`${config.src.js}/main.js`)
  .pipe(eslint({}))
  .pipe(eslint.format())
  .pipe(webpackStream(webpackConfig), webpack)
  .pipe(gulpif(config.isDev, sourcemaps.init()))
  .pipe(gulpif(config.isProd, uglify().on('error', notify.onError())))
  .pipe(gulpif(config.isDev, sourcemaps.write('.')))
  .pipe(dest(`${config.dest.js}`));

export const scriptWatch = () => watch(`${config.src.js}/**/*.js`, scriptBuild);
