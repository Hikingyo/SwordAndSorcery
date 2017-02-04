/**
* build task
**/
"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const config = require("../config").build;

gulp.task('build', ['html', 'img', 'fonts', 'extras'], function() {
    return gulp.src(config.src).pipe($.size({title: 'build', gzip: true}));
});
