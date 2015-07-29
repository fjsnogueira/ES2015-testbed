var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var changelog = require('conventional-changelog');
var assign = Object.assign || require('object.assign');
var fs = require('fs');
var bump = require('gulp-bump');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
//var run = require('gulp-run');
var shell = require('gulp-shell');

var path = {
  source:'src/**/*.js',
  html:'src/**/*.html',
  style:'styles/**/*.css',
  output:'dist/',
  doc:'./doc',
  root:'../'
};

var bundles = [
    {
        module: 'index-viewmodel',
        name: 'bundled'
    }
];

var compilerOptions = {
 modules: 'system',
	moduleIds: false,
	comments: false,
	compact: false,
	stage: 2,
	optional: []
};

var jshintConfig = {esnext:true};

gulp.task('clean', function() {
	return gulp.src([path.output]).pipe(vinylPaths(del));
});

gulp.task('build-system', function () {
  return gulp.src(path.source)
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.js'}))
    .pipe(babel(assign({}, compilerOptions, {modules:'system'})))
    .pipe(gulp.dest(path.output));
});

gulp.task('build-bundles',
	shell.task(
		bundles.map(function (bundle) {
			return 'jspm bundle ' + bundle.module + ' ' + path.output + bundle.name + '.js --inject';
		}))
)

gulp.task('build-html', function () {
  return gulp.src(path.html)
    .pipe(changed(path.output, {extension: '.html'}))
    .pipe(gulp.dest(path.output));
});

gulp.task('lint', function() {
  return gulp.src(path.source)
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter(stylish));
});

gulp.task('bump-version', function(){
  return gulp.src(['./package.json'])
    .pipe(bump({type:'patch'})) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

gulp.task('changelog', function(callback) {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return changelog({
    repository: pkg.repository.url,
    version: pkg.version,
    file: path.doc + '/CHANGELOG.md'
  }, function(err, log) {
    fs.writeFileSync(path.doc + '/CHANGELOG.md', log);
  });
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html'],
	'build-bundles',
    callback
  );
});

gulp.task('serve', ['build'], function(done) {
  browserSync({
    open: false,
    port: 8080,
    server: {
      baseDir: [path.root],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function() {
  gulp.watch(path.source, ['build-system', browserSync.reload]).on('change', reportChange);
  gulp.watch(path.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch(path.style, browserSync.reload).on('change', reportChange);
});

gulp.task('prepare-release', function(callback){
  return runSequence(
    'build',
    'lint',
    'bump-version',
    'changelog',
    callback
  );
});
