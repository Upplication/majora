'use strict';

var http = require('http'),
    ecstatic = require('ecstatic');

var server = http.createServer(ecstatic({ root: __dirname + '/../dist' }));

exports.config = {
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        defaultTimeoutInterval: 30000
    },

    specs: [
        'e2e/**/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },
    
    beforeLaunch: function () {
        server.listen(9090);
    },
    
    onComplete: function () {
        server.close(function () {});
    },

    baseUrl: 'http://localhost:9090'
};