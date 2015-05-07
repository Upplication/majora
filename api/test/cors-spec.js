'use strict';

var express = require('express'),
    request = require('supertest');

var app = require('../app.js');

describe('Cors', function () {
    describe('should add header', function () {

        var doRequest = function() {
            return request(app)
                .get('/')
                .set('Accept', 'application/json');
        };

        it('Access-Control-Allow-Origin equal to *', function (done) {
            doRequest()
                .expect('Access-Control-Allow-Origin', '*')
                .expect(200, done);
        });

        it('Access-Control-Allow-Methods equal to PUT, GET, POST, DELETE, OPTIONS', function (done) {
            doRequest()
                .expect('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
                .expect(200, done);
        });

        it('Access-Control-Allow-Headers equal to Origin, X-Requested-With, Content-Type, Accept', function (done) {
            doRequest()
                .expect('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
                .expect(200, done);
        });

        it('Access-Control-Allow-Credentials equal to true', function (done) {
            doRequest()
                .expect('Access-Control-Allow-Credentials', 'true')
                .expect(200, done);
        });
    });
});