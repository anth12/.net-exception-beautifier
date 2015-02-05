var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	del = require('del');

gulp.task('default', ['compile.scss', 'compile.js', 'distribute.common', 'clean'], function() {

});

gulp.task('compile.scss', function(done) {
  gulp.src('./common/*.scss')
        .pipe(sass())
		.pipe(minifyCSS())
        .pipe(gulp.dest('./common/build/'))
		.on('end', done);;
});

gulp.task('compile.js', function(done) {
  gulp.src('./common/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./common/build/'))
		.on('end', done);;
});

gulp.task('distribute.common', function(done) {
  gulp.src('./common/build/**')
        .pipe(gulp.dest('./Chrome/'))
		.on('end', done);
});

gulp.task('clean', function(done) {
	//del('./common/build', done);
});


var watcher = gulp.watch('./common/*.js', ['default']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
