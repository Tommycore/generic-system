const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const webp = require('gulp-webp');
const del = require('del');
const gulpWebp = require('gulp-webp');
const rename = require('gulp-rename');
const filelist = require('gulp-filelist');
const path = require('path');

async function buildCSS() {
  return src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('gs.css'))
    .pipe(cleanCSS())
    .pipe(dest('./build'));
};

async function buildTemplateList() {
  return src('./src/static/templates/**/*.hbs')
    .pipe(rename(filePath => filePath.dirname = path.join('systems/gs/templates', filePath.dirname)))
    .pipe(filelist('templateList.json', { relative: true }))
    .pipe(dest('build/data'));
}

async function copyImages() {
  return src(['./src/img/**/*.png', './src/img/**/*.jpg', './src/img/**/*.tiff'])
    .pipe(webp({ quality: 90, alphaQuality: 100, method: 6, metadata: 'icc' }))
    .pipe(dest('./build/assets/img'));
}

async function clean() {
  return del(['build/**', '!build']);
}

async function copyStatic() {
  return src('./src/static/**')
    .pipe(dest('./build'));
}

// ---------------------------------------------------------------------

async function buildWatch() {
  watch('src/styles/**/*.scss', { ignoreInitial: false }, buildCSS);
  watch('src/img/**', { ignoreInitial: false }, copyImages);
  watch('src/static/**', { ignoreInitial: false }, copyStatic);
  watch('./src/static/templates/**/*.hbs', { ignoreInitial: false }, buildTemplateList);
}

exports.build = series(clean, parallel(buildCSS, copyImages, copyStatic, buildTemplateList));
exports.buildWatch = series(clean, buildWatch);
