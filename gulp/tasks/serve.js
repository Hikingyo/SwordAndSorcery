/**
 * serve task
 **/
"use strict";

const gulp = require("gulp");
const config = require("../config").serve;
const browserSync = require("browser-sync");
const reload = browserSync.reload;

gulp.task('serve', ['styles', 'img', 'fonts', 'scripts', 'nodemon'], function () {
	browserSync.init(config.browsersync);

	gulp.watch(config.watch.styles, ['styles-watch']);
	gulp.watch(config.watch.fonts, ['fonts']);
	gulp.watch(config.watch.bower, ['wiredep', 'fonts']);
	gulp.watch(config.watch.scripts, ['scripts-watch']);
	gulp.watch(config.watch.img, ['img']);

	gulp.watch(config.watch_reload).on('change', reload);
});

const testConfig = config.test;

gulp.task('serve:test', function () {
	browserSync(testConfig.browsersync);

	gulp.watch(testConfig.watch).on('change', reload);
	gulp.watch(testConfig.watch, ['lint:test']);
});

const distConfig = config.dist;

gulp.task('serve:dist', function () {
	browserSync(distConfig.browsersync);
});
