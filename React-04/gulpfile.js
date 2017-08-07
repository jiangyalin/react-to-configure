const gulp = require('gulp');
const connect = require('gulp-connect');
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');
const port = process.env.port || 5000;

gulp.task('browserify', function () {
  gulp.src('./app/js/main.js')
    .pipe(browserify({
      transform: 'reactify'
    }))
    .pipe(gulp.dest('./dist/js'))
});

// 网络服务器
gulp.task('connect', function () {
  connect.server({
    root: './',
    port: port,
    livereload: true
  })
});

gulp.task('js', function () {
  gulp.src('./dist/**/*.js')
    .pipe(connect.reload())
});

gulp.task('html', function () {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload())
});

gulp.task('watch', function () {
  gulp.watch('./dist/**/*.js', ['js']);
  gulp.watch('./app/**/*.html', ['html']);
  gulp.watch('./app/js/**/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);

gulp.task('server', ['browserify', 'connect', 'watch']);