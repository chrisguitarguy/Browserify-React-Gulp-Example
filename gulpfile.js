var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var bundler = function (filename, debug) {
    // calling `browserify` creates a new browserify instance
    // but doesn't actually do anything other that configuration yet.
    return browserify('src/main.jsx', {
        insertGlobals: true,
        debug: !!debug,
        transform: [
            babelify.configure({
                presets: ['es2015', 'react']
            })
        ]
    })
    // bundle returns a read stream https://nodejs.org/api/stream.html
    .bundle()
    // but gulp doesn't play nice with actual streams, so we "fake"
    // a vinyl file with vinyl-source-stream, filename here is
    // what our imaginary file is named, you probably want to name
    // this what you want your output file to be named.
    .pipe(source(filename))
}

gulp.task('compile-dev', function() {
    return bundler('main.js', true)
        // send the file to ./build, we don't need to buffer here
        .pipe(gulp.dest('./build'));
});

gulp.task('compile', function() {
    return bundler('main.min.js', false)
        // souremaps wants a buffer, so we'll make one with vinyl-buffer
        .pipe(buffer())
        // start sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))
        // minify!
        .pipe(uglify())
        // writing the source maps will write a file relative to the root
        // in dest below. You need to pass a string here to make the sourcemaps
        // actually write a file, so just tell it to use the current directory
        // this will write main.min.js.map in the build directory
        .pipe(sourcemaps.write('./'))
        // write the file!
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
    gulp.watch(['*.js', 'src/**/*.js'], ['compile-dev']);
});

gulp.task('default', ['compile']);
