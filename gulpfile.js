var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var argv = require('yargs').argv;

gulp.task('browserify', function() {
    gulp.src('index.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: !argv.production
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./build'));
});
