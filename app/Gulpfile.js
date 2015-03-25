'use strict';

var gulp = require('gulp'),
    http = require('http'),
    react = require('gulp-react'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    angularTemplates = require('gulp-angular-templates'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    esnext = require('gulp-esnext'),
    karma = require('karma').server,
    protractor = require('gulp-protractor').protractor,
    webdriverStandalone = require('gulp-protractor').webdriver_standalone,
    webdriverUpdate = require('gulp-protractor').webdriver_update,
    connect = require('gulp-connect'),
    ngConfig = require('gulp-ng-config'),
    vendorPaths = [
        'angular/angular.min.js',
        'angular-route/angular-route.min.js',
        'react/react.min.js'
    ],
    vendorCSSPaths = [
        'animate.css/animate.min.css',
        'bootstrap/dist/css/bootstrap.min.css'
    ];

gulp.task('config', function () {
    var envConfig = process.env.NODE_ENV || 'development';
    gulp.src('./config-' + envConfig + '.json')
        .pipe(ngConfig('config'))
        .pipe(concat('config.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js', function () {
    gulp.src('src/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(esnext())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('react', function () {
    gulp.src('src/**/*.jsx')
        .pipe(react())
        .pipe(concat('components.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('index', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('test_index', function () {
    gulp.src('src/index_e2e.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('vendor_mock', function () {
    gulp.src('vendor/angular-mocks/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('less', function () {
    gulp.src(['src/**/*.less'].concat(vendorCSSPaths.map(function (path) {
        return 'vendor/' + path;
    })))
        .pipe(less())
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

gulp.task('vendor', function () {
    gulp.src(vendorPaths.map(function (path) {
        return 'vendor/' + path;
    }))
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('templates', function () {
    return gulp.src('src/templates/**/*.html')
        .pipe(angularTemplates({
            module: 'upp'
        }))
        .pipe(concat('templates.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/**/*.jsx', ['react']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/templates/**/*.html', ['templates']);
    gulp.watch('tests/unit/*', ['karma']);
    gulp.run(['server']);
});

gulp.task('serve', function () {
    connect.server({
        root: 'dist',
        port: 9090,
        livereload: true
    });
});

gulp.task('webdriver_update', webdriverUpdate);

gulp.task('webdriver_standalone', ['webdriver_update'], webdriverStandalone);

gulp.task('karma', function (done) {
    setTimeout(function () {
        karma.start({
            configFile: __dirname + '/tests/karma.conf.js',
            singleRun: true
        }, done);
    }, 20000);
});

gulp.task('protractor', ['webdriver_update'], function () {
    gulp.src('tests/e2e/**/*.js')
        .pipe(protractor({
            configFile: 'tests/protractor.conf.js'
        }));
});

gulp.task('test', ['default', 'test_index', 'vendor_mock', 'karma', 'protractor']);

gulp.task('test_unit', ['default', 'karma']);

gulp.task('server', ['js', 'config', 'react', 'less', 'templates', 'index', 'vendor', 'watch', 'serve']);

gulp.task('default', ['js', 'config', 'react', 'less', 'templates', 'index', 'vendor']);
