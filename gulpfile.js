/**
 * Created by Naver on 2017. 5. 30..
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var jscs = require('gulp-jscs');
var ugliy = require('gulp-uglify');
var pump = require('pump');

gulp.task('default', function () {
  pump([
    gulp.src('public/js/*.js'),
    jscs({fix: true}),
    jscs.reporter(),
    concat('all.js'),
    gulp.dest('./dist/')
  ]);
});

gulp.task('codeCheck', function() {
  return gulp.src('public/js/*.js')
    .pipe(jscs({fix: true}))
    .pipe(jscs.reporter());
});

gulp.task('merge', function() {
  return gulp.src('public/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compress', function (cb) {
  pump([
    gulp.src('./dist/all.js'),
    ugliy(),
    concat('all.min.js'),
    gulp.dest('./dist/')
  ],
  cb
  );
});
