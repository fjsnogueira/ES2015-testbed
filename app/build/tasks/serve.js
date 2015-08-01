var browserSync = require('browser-sync');
var gulp = require('gulp');

var paths = require('../paths');

gulp.task('serve', ['build'], function(done) {
	browserSync({
		open: false,
		port: 8080,
		server: {
			baseDir: ['../'],
			middleware: function(req, res, next) {
				res.setHeader('Access-Control-Allow-Origin', '*');
				next();
			}
		}
	}, done);
});
