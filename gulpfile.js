/**
 * Created by Naver on 2017. 5. 30..
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var jscs = require('gulp-jscs');

gulp.task('default', function () {
  console.log("hello gulp!");
});

gulp.task('codeCheck', function() {
  return gulp.src('public/js/*.js')
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('merge', function() {
  return gulp.src('public/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});
