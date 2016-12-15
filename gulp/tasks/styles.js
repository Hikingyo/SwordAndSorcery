var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var config = require("../config").styles;

gulp.task('styles', function(){
    return gulp.src(config.src)
            .pipe($.plumber())
            .pipe($.sourcemaps.init())
        
            .pipe($.less({
                paths:['.']
            }))
    .pipe($.autoprefixer(config.autoprefixer))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.dest));
});
