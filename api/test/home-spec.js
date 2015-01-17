'use strict';

var express = require('express'),
    request = require('supertest');

var app = require('../app.js');

describe('HomeController', function () {
    describe('main', function () {
        it('should return hello world as JSON', function (done) {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect({"message": "hello world"})
                .expect(200, done);
        });
    });
});