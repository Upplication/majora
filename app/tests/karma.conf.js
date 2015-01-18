'use strict';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            '../dist/js/vendor.min.js',
            '../dist/js/components.min.js',
            '../dist/js/app.min.js',
            '../dist/js/templates.min.js',
            'unit/**/*.js'
        ],
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter', 'karma-beep-reporter', 'karma-growl-reporter'],
        port: 9876,
        colors: true,
        autoWatch: true,
        reporters: ['growl', 'spec', 'beep'],
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: true
    });
};