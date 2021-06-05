import { watch, src, parallel } from 'gulp';
import gulpStylelint from 'gulp-stylelint';
import eslint from 'gulp-eslint';
import pugLinter from 'gulp-pug-linter';
import pugLintStylish from 'puglint-stylish';
import config from '../config';

export const styleLint = () => src(`${config.src.sass}/**/*.scss`)
  .pipe(gulpStylelint({
    reporters: [
      { formatter: 'string', console: true },
    ],
  }));

export const jsLint = () => src(`${config.src.js}/**/*.js`)
  .pipe(eslint({}))
  .pipe(eslint.format());

export const pugLint = () => src(`${config.src.pug}/**/*.pug`)
  .pipe(pugLinter({ reporter: pugLintStylish }));

export const lintBuild = parallel(styleLint, jsLint);

export const lintWatch = () => {
  watch(`${config.src.sass}/**/*.scss`, styleLint);
  watch(`${config.src.js}/**/*.js`, jsLint);
  watch(`${config.src.pug}/**/*.pug`, pugLint);
};
