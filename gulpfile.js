var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var argv = require('yargs').argv;

gulp.task('browserify', function() {
    gulp.src('index.js', {read: false})
        .pipe(browserify({
            insertGlobals: true,
            transform: ['babelify'],
            debug: !argv.production
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['browserify']);
