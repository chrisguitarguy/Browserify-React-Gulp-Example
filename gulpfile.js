var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('compile-dev', function() {
    gulp.src('index.js', {read: false})
        .pipe(browserify({
            insertGlobals: true,
            transform: ['babelify'],
            debug: true
        }))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('compile', function() {
    gulp.src('index.js', {read: false})
        .pipe(browserify({
            insertGlobals: true,
            transform: ['babelify'],
            debug: false
        }))
        .pipe(uglify())
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./build'));

});

gulp.task('watch', function() {
    gulp.watch(['*.js', 'src/**/*.js'], ['compile-dev']);
});

gulp.task('default', ['compile']);
