/**
* lint task
**/
"use strict";

const gulp = require("gulp");
const config = require("../config").lint;
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const $ = require("gulp-load-plugins")();

function lint(files, opt){
    return function () {
        return gulp.src(files)
            .pipe(reload(config.reload))
            .pipe($.eslint(opt))
            .pipe($.eslint.format())
            .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
    };
}

const testLintOptions = config.test.options;

gulp.task('lint', lint(config.src));
gulp.task('lint:test', lint(config.test.src, testLintOptions));
