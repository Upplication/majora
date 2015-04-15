'use strict';

var express = require('express'),
    request = require('supertest'),
    HomeController = require('../controllers/home'),
    auth = require('../middlewares/auth');

var app = require('../app.js');

// some fake urls for auth testing
app.get('/public', function (req, res) {
    res.send({'message': 'hello world'});
});

app.get('/protected', auth, function (req, res) {
    res.send({'message': 'hello world'});
});

describe('Auth Checker', function () {
    describe('should check header authorization', function () {

        var doRequest = function (url, token) {
            return request(app)
                .get(url)
                .set('Accept', 'application/json')
                .set('Authorizationtest', true) // this header mock the authorization middleware and enable as valid token all token that start with valid-
                .set('Authorization', token);
        };

        describe('when the url are public', function () {
            it('like \'/public\' then do nothing and return 200', function (done) {
                doRequest('/public')
                    .expect(200, done);
            });

            it('like \'/\' then do nothing and return 200', function (done) {
                doRequest('/')
                    .expect(200, done);
            });

        });

        describe('when the url are private', function () {
            it('like \'/protected\' with valid token then should return 200', function (done) {
                doRequest('/protected', 'Bearer: valid-token')
                    .expect(200, done);
            });

            it('like \'/protected\' with invalid token then should return 401 Unauthorized', function (done) {
                doRequest('/protected', 'Bearer: adsada')
                    .expect(401, done);
            });

            it('without token then should return 401 Unauthorized', function (done) {
                doRequest('/protected')
                    .expect(401, done);
            });
        });
    });
});