const { src, dest, watch, series, lastRun } = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  cleanDir = require('gulp-clean-dir'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  cleanCss = require('gulp-clean-css');

const path = {
  materialize: {
    src: './node_modules/materialize-css/dist/css/materialize.min.css',
    dest: './client/vendor',
  },
  scss: {
    src: './client/scss/**/*.scss',
    dest: './client/css',
    rename: 'styles.min.css',
  },
};

const buildMaterialize = () => {
  return src(path.materialize.src, { since: lastRun(buildMaterialize) }).pipe(
    dest(path.materialize.dest)
  );
};

const buildCSS = () => {
  return src(path.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename(path.scss.rename))
    .pipe(cleanDir(path.scss.dest))
    .pipe(cleanCss())
    .pipe(dest(path.scss.dest));
};

const serve = () => {
  return watch(
    [path.scss.src],
    { events: ['add', 'change', 'unlink'] },
    series(buildCSS)
  );
};

exports.materialize = buildMaterialize;
exports.default = serve;
