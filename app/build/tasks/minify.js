var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var paths = require('../paths');

gulp.task('minify', function() {
	return gulp.src(paths.output + '*.js')
		.pipe(rename(function(path) {
			path.extname = '.min.js';
		}))
		.pipe(uglify())
		.pipe(gulp.dest(paths.output));
});
