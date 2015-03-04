'use strict';

var express = require('express'),
    request = require('supertest');

var app = require('../app.js');

describe('ApiController', function () {
    describe('/api/v1/', function () {
        it('should return hello world as JSON', function (done) {
            request(app)
                .get('/api/v1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect({"message": "hello world"})
                .expect(200, done);
        });
    });

    describe('/api/v1/templates', function () {
        it('should return templates as JSON', function (done) {
            request(app)
                .get('/api/v1/templates')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect({"message": "list templates"})
                .expect(200, done);
        });
    });

    describe('/api/v1/templates/1', function () {
        it('should return template 1 as JSON', function (done) {
            request(app)
                .get('/api/v1/templates/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect({"message": "get template 1"})
                .expect(200, done);
        });
    });
});