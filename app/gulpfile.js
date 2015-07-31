// all gulp tasks are located in the ./build/tasks directory
// gulp configuration is in files in ./build directory
require('require-dir')('build/tasks');

var gulp = require('gulp');
var bump = require('gulp-bump');
var runSequence = require('run-sequence');
//var run = require('gulp-run');

gulp.task('bump-version', function() {
	return gulp.src(['./package.json'])
		.pipe(bump({
			type: 'patch'
		})) //major|minor|patch|prerelease
		.pipe(gulp.dest('./'));
});

gulp.task('prepare-release', function(callback) {
	return runSequence(
		'build',
		'lint',
		'bump-version',
		'changelog',
		callback
	);
});
