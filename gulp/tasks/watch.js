/**
 * Created by hikingyo on 21/01/17.
 */
const browser_sync = require("browser-sync");
const gulp = require("gulp");

gulp.task('scripts-watch', ['scripts'], (done) => {
	"use strict";
	browser_sync.reload();
	done();
});

gulp.task('styles-watch', ['styles'], (done) => {
	"use strict";
	browser_sync.reload();
	done();
});
