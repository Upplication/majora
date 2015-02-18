'use strict';

var gulp = require('gulp'),
    http = require('http'),
    ecstatic = require('ecstatic'),
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
    refresh = require('gulp-livereload'),
    lr = require('tiny-lr'),
    ngConfig = require('gulp-ng-config'),
    lrserver = lr(),
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
        .pipe(refresh(lrserver));
});

gulp.task('react', function () {
    gulp.src('src/**/*.jsx')
        .pipe(react())
        .pipe(concat('components.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(refresh(lrserver));
});

gulp.task('index', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(refresh(lrserver));
});

gulp.task('less', function () {
    gulp.src(['src/**/*.less'].concat(vendorCSSPaths.map(function (path) {
        return 'vendor/' + path;
    })))
        .pipe(less())
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(refresh(lrserver));
});

gulp.task('vendor', function () {
    gulp.src(vendorPaths.map(function (path) {
        return 'vendor/' + path;
    }))
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(refresh(lrserver));
});

gulp.task('templates', function () {
    return gulp.src('src/templates/**/*.html')
        .pipe(angularTemplates({
            module: 'upp'
        }))
        .pipe(concat('templates.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(refresh(lrserver));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/**/*.jsx', ['react']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/templates/**/*.html', ['templates']);
    gulp.watch(['dist/*', 'tests/e2e/*'], ['protractor']);
    gulp.watch(['dist/*', 'tests/unit/*'], ['karma']);
    gulp.run(['server']);
});

gulp.task('serve', function () {
    http.createServer(ecstatic({ root: __dirname + '/dist' })).listen(8080);
    lrserver.listen(35515);
});

gulp.task('webdriver_update', webdriverUpdate);

gulp.task('webdriver_standalone', ['webdriver_update'], webdriverStandalone);

gulp.task('karma', function (done) {
    karma.start({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('protractor', ['webdriver_update'], function () {
    gulp.src('tests/e2e/**/*.js')
        .pipe(protractor({
            configFile: 'tests/protractor.conf.js'
        }))
        .on('error', function (e) {
            throw e;
        });
});

gulp.task('test', ['default', 'karma', 'protractor']);

gulp.task('test_unit', ['default', 'karma']);

gulp.task('server', ['js', 'config', 'react', 'less', 'templates', 'index', 'vendor', 'watch', 'serve']);

gulp.task('default', ['js', 'config', 'react', 'less', 'templates', 'index', 'vendor']);