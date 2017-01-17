/**
* Default task.
* Cleaning dest folder before building
**/

const gulp = require("gulp");

gulp.task("default", ["clean"], function () {
    gulp.start('serve');
});
