var gulp = require('gulp'),
    server = require('gulp-express'),
    shell = require('shelljs');

gulp.task('server', function () {
    server.run({
        file: 'app.js'
    });
    
    shell.exec('mongod', {silent: true, async: true});

    gulp.watch([
        'app.js',
        'controllers/**/*.js',
        'models/**/*.js'
    ], [server.run]);
});

gulp.task('stopmongo', function () {
    shell.exec('killall mongod', {silent: true, async: true});
});