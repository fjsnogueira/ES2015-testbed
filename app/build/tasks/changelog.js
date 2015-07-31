var changelog = require('conventional-changelog');
var gulp = require('gulp');
var fs = require('fs');

var paths = require('../paths');

gulp.task('changelog', function(callback) {
	var pkg = JSON.parse(fs.readFileSync(paths.root + '/package.json', 'utf-8'));

	return changelog({
		repository: pkg.repository.url,
		version: pkg.version,
		file: paths.doc + '/CHANGELOG.md'
	}, function(err, log) {
		fs.writeFileSync(paths.doc + '/CHANGELOG.md', log);
	});
});
