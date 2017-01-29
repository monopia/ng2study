var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var browserify  = require("browserify");
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var watch       = require('gulp-watch');
var tsify       = require("tsify");
var ts          = require('gulp-typescript');
var sourcemaps  = require('gulp-sourcemaps');

var tsProject = ts.createProject('./tsconfig.json');

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}

gulp.task('copy', function() {
    gulp.src('app/**/*.html').pipe(gulp.dest('dist'));
    //gulp.src('app/assets/**/*.*').pipe(gulp.dest('dist/assets'));
});

gulp.task('browserify', function() {
    browserify({
        basedir: '.',
        debug: true,
        entries: ['app/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task("typescript", function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"));
});

gulp.task('webserver', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function() {
    //gulp.watch('src/styles/*.less', ['less']);
    gulp.watch('app/**/*.ts', ['typescript']);
    gulp.watch('app/**/*.html', ['copy']);
});

gulp.task('default', ['typescript', 'copy', 'webserver', 'watch']);

gulp.task('dist', ['browserify', 'copy']);