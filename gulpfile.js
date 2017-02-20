// # Gulp configuration file
var gulp      = require('gulp')
    ,mocha    = require('gulp-mocha')
    ,shell    = require('gulp-shell')
    ,clean    = require('gulp-clean')
    ,istanbul = require('gulp-istanbul');

// #### gulp cleanDoc
// Currently the doc folder is removed from the project root.
gulp.task('cleanDoc', function () {
    return gulp
        .src([ 'doc' ], {
            read: false
        })
        .pipe(clean());
});

// #### gulp doc
// Generates the documentation using the groc command, which uses
// the .groc.json configuration file.
gulp.task('doc', [ 'cleanDoc' ], shell.task([
    "groc"
]));

// #### gulp test-coverage
// Generates the test coverage reports using the istanbul module and the result
// is stored into the coverage folder.
gulp.task('test-coverage', function (cb) {
    gulp.src(['repository/**/*.js', 'NGSharedKernel.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['test/**/*.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } }))
                .on('end', cb);
        });
});

// #### gulp test
// Executes the test suite based on the mocha-chai modules and returns the resulting
// spec report back to the console.
gulp.task('test', function () {
    return gulp.src('test/**/*.js')
        .pipe(mocha({ 
            reporter: 'spec' 
        }));
});

// #### gulp watch
// This task observe changes made to the codebase or to the test suite and triggers
// the test task.
gulp.task('watch', function() {
    gulp.watch(['**/*.js', 'test/**/*.js'], ['test']);
});

// #### gulp bdd
// This task execute the test task and then the watch task in order to observe changes
// made to the codebase if so then runs the test task again.
gulp.task('bdd', ['test', 'watch']);
