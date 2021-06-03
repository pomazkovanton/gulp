import { watch, src, dest, parallel } from 'gulp';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import config from '../config';

export const woff = () => src(`${config.src.fonts}/**/*.ttf`)
  .pipe(ttf2woff())
  .pipe(dest(`${config.dest.fonts}`));

export const woff2 = () => src(`${config.src.fonts}/**/*.ttf`)
  .pipe(ttf2woff2())
  .pipe(dest(`${config.dest.fonts}`));

export const fontsBuild = parallel(woff, woff2);

export const fontsWatch = () => watch(`${config.src.fonts}/**/*`, fontsBuild);
