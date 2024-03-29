var gulp = require('gulp');
var runSequence = require('run-sequence');
//var run = require('gulp-run');

gulp.task('release', function(callback) {
	return runSequence(
		'build',
		'lint',
		'minify',
		'bump-version',
		'changelog',
		callback
	);
});
