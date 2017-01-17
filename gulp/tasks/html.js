/**
 * html task
 * File concact with useref.
 * Then minify js, generated css and html.
 **/
"use strict";

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var config = require("../config").html;

gulp.task('html', ['styles'], function() {

    return gulp.src(config.src + '/**/*.ejs')
        .pipe($.useref({
            searchPath: config.useref.searchPath
        }))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.minifyCss(config.minifyCss)))
        .pipe(gulp.dest(config.dest));
});
