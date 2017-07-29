const gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('default', ['watch-html', 'watch-sass'], function () {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch(["./dist/**/*.*"]).on('change', browserSync.reload);
});

gulp.task('build-html', ['sass'], function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch-html', ['build-html'], function () {
    return gulp
        .watch(`src/*.html`, ['build-html'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('sass', function () {
    return gulp
        .src(`src/assets/sass/geolocation.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(rename('geolocation.min.css'))
        .pipe(gulp.dest(`dist/assets/css`));
});

gulp.task('watch-sass', ['sass'], function () {
    return gulp
        .watch(`src/assets/sass/**/*.scss`, ['sass'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});