import { watch, src, dest, series } from 'gulp';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import config from '../config';

const optimazeImages = () => src(`${config.src.images}/**/*`)
  .pipe(gulpif(config.isProd, imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({
      quality: 75,
      progressive: true,
    }),
    imagemin.optipng({
      optimizationLevel: 3,
    }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: true },
        { cleanupIDs: false },
      ],
    }),
  ])))
  .pipe(dest(`${config.dest.images}`));

const convertImagesToWebp = () => (
  src(`${config.src.images}/**/*.{jpg,png,jpeg}`)
    .pipe(changed(config.dest.images, { extension: '.webp' }))
    .pipe(
      webp({
        quality: 75,
      }),
    )
    .pipe(dest(config.dest.images))
);

export const imagesBuild = series(optimazeImages, convertImagesToWebp);

export const imagesWatch = () => watch(`${config.src.images}/**/*`, imagesBuild);
