var eslint = require('gulp-eslint');
var gulp = require('gulp');

var paths = require('../paths');

gulp.task('lint', function() {
	return gulp.src(paths.source)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});
