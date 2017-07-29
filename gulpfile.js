const gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    //htmlmin = require('gulp-htmlmin'),
    exec = require('child_process').exec;

// Static Server + watching scss/html files
gulp.task('default', ['watch-sass'], function (cb) {
    exec('ng serve', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

/*
gulp.task('build-html', function (cd) {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});
*/

gulp.task('sass', function () {
    return gulp
        .src(`src/assets/sass/main.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(`src/`));
});

gulp.task('watch-sass', ['sass'], function () {
    return gulp
        .watch(`src/assets/sass/**/*.scss`, ['sass'])
        .on('change', function (event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});