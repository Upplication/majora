'use strict';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            '../vendor/angular/angular.min.js',
            '../vendor/angular-route/angular-route.min.js',
            '../vendor/angular-mocks/angular-mocks.js',
            '../dist/js/config.min.js',
            '../dist/js/app.min.js',
            '../dist/js/templates.min.js',
            'unit/**/*.spec.js'
        ],
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter', 'karma-beep-reporter', 'karma-growl-reporter'],
        port: 9876,
        colors: true,
        autoWatch: true,
        reporters: ['spec', 'beep'],
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: true
    });
};