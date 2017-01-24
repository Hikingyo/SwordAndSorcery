/**
 * Gulp task to run node server deamon
 */
"use strict";
const gulp = require('gulp');
const gulpLoadPlugin = require('gulp-load-plugins');
const $ = gulpLoadPlugin();
const config = require('../config').nodemon;
const browser_sync = require('browser-sync');

gulp.task('nodemon', (callback) => {
	let started = false;
	return $.nodemon(
		{
			script: config.script,
			watch: config.watch,
			ignoreRoot: ['./views', './resources'],
			env: config.env
		}
	)
		.on('start', () => {
			// avoid multiple start
			if (!started) {
				callback();
				started = true;
				console.info('Node server is started !!');
			}
		})
		.on('restart', () => {
			setTimeout(() => {
					browser_sync.reload({
						stream: false
					})
				},
				config.reload_delay
			);
		})
});
