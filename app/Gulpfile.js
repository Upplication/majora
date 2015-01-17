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
    refresh = require('gulp-livereload'),
    lr = require('tiny-lr'),
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
});

gulp.task('serve', function () {
    http.createServer(ecstatic({ root: __dirname + '/dist' })).listen(8080);
    lrserver.listen(35515);
});

gulp.task('server', ['js', 'react', 'less', 'templates', 'index', 'vendor', 'watch', 'serve']);

gulp.task('default', ['js', 'react', 'less', 'templates', 'index', 'vendor']);