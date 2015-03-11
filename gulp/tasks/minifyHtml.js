/*
 * @title MinifyHtml
 * @description A task to inject assets into and compress the main index.html
 * @example (cli) gulp minifyHtml
 */


/*********************************************************************************
 1. DEPENDENCIES
 *********************************************************************************/

var gulp = require('gulp');
var gulpif = require('gulp-if');
var inject = require("gulp-inject");
var minifyHtml = require('gulp-minify-html');
var plumber = require('gulp-plumber');
var sharedPaths = require('../shared/paths.js');
var sharedEvents = require('../shared/events.js');


/*********************************************************************************
 2. TASK
 *********************************************************************************/

gulp.task('minifyHtml', function () {
  return gulp
    .src(sharedPaths.srcIndex)
    .pipe(plumber({
      errorHandler: sharedEvents.onError
    }))
    .pipe(inject(gulp.src([
      sharedPaths.outputCss,
      sharedPaths.outputJs
    ], {
      read: false
    }), {
      ignorePath: sharedPaths.outputDir,
      addRootSlash: false
    }))
    .pipe(gulpif(process.env.ENVIRONMENT_TYPE !== 'dev', minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    })))
    .pipe(gulp.dest(sharedPaths.outputDir));
});
