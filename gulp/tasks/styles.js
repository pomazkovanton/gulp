import { watch, src, dest } from 'gulp';
import gulpif from 'gulp-if';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import gulpStylelint from 'gulp-stylelint';
import config from '../config';

export const sassBuild = () => src(`${config.src.sass}/style.scss`)
  .pipe(plumber())
  .pipe(gulpStylelint({
    reporters: [
      { formatter: 'string', console: true }
    ],
  }))
  .pipe(gulpif(config.isDev, sourcemaps.init()))
  .pipe(sass())
  .pipe(gulpif(config.isProd, gcmq()))
  .pipe(gulpif(config.isProd, autoprefixer()))
  .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
  .pipe(rename({
    suffix: '.min',
  }))
  .pipe(gulpif(config.isDev, sourcemaps.write()))
  .pipe(dest(`${config.dest.css}`));

export const sassWatch = () => watch(`${config.src.sass}/**/*.scss`, sassBuild);
