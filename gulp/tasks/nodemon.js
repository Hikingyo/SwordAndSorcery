/**
 * Gulp task to run node server deamon
 */
"use strict";
const gulp = require('gulp');
const gulpLoadPlugin = require('gulp-load-plugins');
const $ = gulpLoadPlugin();
const config = require('../config').nodemon;

gulp.task('nodemon', (callback) => {
	let started = false;
	return $.nodemon(
		{
			script: config.script,
			watch: config.watch,
			ignoreRoot: ['./views'],
			env: config.env
		}
	)
		.on('start', () => {
			// avoid multiple start
			if(!started){
				callback();
				started = true;
				console.info('Node server is started !!');
			}
		})
});
