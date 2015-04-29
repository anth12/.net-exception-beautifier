var gulp        = require('gulp'),
    clean       = require('gulp-clean'),
    sass        = require('gulp-sass'),
    uglify      = require('gulp-uglify'),
    minifyCSS   = require('gulp-minify-css'),
    es          = require('event-stream'),
    rseq        = require('gulp-run-sequence'),
    zip         = require('gulp-zip'),
    shell       = require('gulp-shell'),
    chrome      = require('./vendor/chrome/manifest'),
    firefox     = require('./vendor/firefox/package');

function pipe(src, transforms, dest) {
	if (typeof transforms === 'string') {
		dest = transforms;
		transforms = null;
	}

	var stream = gulp.src(src);
	transforms && transforms.forEach(function(transform) {
		stream = stream.pipe(transform);
	});

	if (dest) {
		stream = stream.pipe(gulp.dest(dest));
	}

	return stream;
}

gulp.task('clean', function() {
	return pipe('./build', [clean()]);
});

gulp.task('sass', function(done) {
    gulp.src('./css/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css/min/'))
        .on('end', done);;
});

gulp.task('chrome', ['sass'], function() {
	return es.merge(
        pipe('./html/*.html', './build/chrome/html/'),
		pipe('./img/**/*', './build/chrome/img/'),
        pipe('./js/*.js', './build/chrome/js/'),
		pipe('./css/min/*.css', './build/chrome/css/'),
        
		pipe('./vendor/chrome/browser.js', './build/chrome/js/'),
		pipe('./vendor/chrome/manifest.json', './build/chrome/')
	);
});

gulp.task('opera', ['sass'], function() {
    return es.merge(
        pipe('./html/*.html', './build/opera/html/'),
        pipe('./img/**/*', './build/opera/img/'),
        pipe('./js/*.js', './build/opera/js/'),
        pipe('./css/min/*.css', './build/opera/css/'),

        pipe('./vendor/opera/browser.js', './build/opera/js/'),
        pipe('./vendor/opera/manifest.json', './build/opera/')
    );
});

gulp.task('firefox', ['sass'], function() {
	return es.merge(
        pipe('./html/*.html', './build/firefox/data/html/'),
		pipe('./img/**/*', './build/firefox/data/img/'),
		pipe('./js/*.js', './build/firefox/data/js/'),
        pipe('./css/min/*.css', './build/firefox/data/css'),
        
		pipe('./vendor/firefox/browser.js', './build/firefox/data/js/'),
		pipe('./vendor/firefox/main.js', './build/firefox/data/'),
		pipe('./vendor/firefox/package.json', './build/firefox/')
	);
});

gulp.task('safari', ['sass'], function() {
	return es.merge(
        pipe('./html/*.html', './build/safari/ExceptionBeutifier.safariextension/html/'),
		pipe('./img/**/*', './build/safari/ExceptionBeutifier.safariextension/img/'),
        pipe('./js/*.js', './build/safari/ExceptionBeutifier.safariextension/js/'),
        pipe('./css/min/*.css', './build/safari/ExceptionBeutifier.safariextension/css/'),
        
        pipe('./vendor/safari/browser.js', './build/safari/ExceptionBeutifier.safariextension/js/'),
        pipe('./vendor/safari/Info.plist', './build/safari/ExceptionBeutifier.safariextension/'),
        pipe('./vendor/safari/Settings.plist', './build/safari/ExceptionBeutifier.safariextension/')
	);
});

gulp.task('chrome-dist', function () {
	gulp.src('./build/chrome/**/*')
		.pipe(zip('chrome-extension-' + chrome.version + '.zip'))
		.pipe(gulp.dest('./dist/chrome/'));
});

gulp.task('opera-dist', function () {
    gulp.src('./build/opera/**/*')
    .pipe(zip('opera-extension-' + chrome.version + '.zip'))
    .pipe(gulp.dest('./dist/opera/'));
});

gulp.task('firefox-dist', shell.task([
	'mkdir -p dist/firefox',
	'cd ./build/firefox && ../../tools/addon-sdk-1.16/bin/cfx xpi --output-file=../../dist/firefox/firefox-extension-' + firefox.version + '.xpi > /dev/null',
]));

gulp.task('safari-dist', function () {
	pipe('./vendor/safari/Update.plist', './dist/safari/');
});

gulp.task('firefox-run', shell.task([
	'cd ./build/firefox && ../../tools/addon-sdk-1.16/bin/cfx run',
]));

gulp.task('dist', ['clean', 'chrome', 'opera', 'firefox', 'safari', 'chrome-dist', 'opera-dist', 'firefox-dist', 'safari-dist'], function(cb) {
	
});

gulp.task('watch', function() {
	gulp.watch(['./js/**/*', './css/**/*', './vendor/**/*', './img/**/*'], ['default']);
});

gulp.task('run', ['firefox', 'firefox-run'], function (cb) {
	
});

gulp.task('addons', shell.task([
	'cp -R ./dist ../addons'
]));

gulp.task('default', ['clean', 'chrome', 'opera', 'firefox', 'safari'], function(cb) {
	
});