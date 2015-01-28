'use strict';

var express = require('express'),
    request = require('supertest'),
    assert = require('assert'),
    utils = require('./utils');

var app = require('../app.js');

describe('UserController', function () {
    describe('signup', function () {
        before(function (done) {
            utils.clearDb(done);
        });
        
        describe('when no password or email are provided', function () {
            it('should return success false', function (done) {
                request(app)
                    .post('/user/signup')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect({"success": false})
                    .expect(400, done);
            });
        });

        describe('when an invalid email is provided', function () {
            it('should return success false', function (done) {
                request(app)
                    .post('/user/signup')
                    .send({email: 'invalid email', password: '12345678'})
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect({"success": false})
                    .expect(400, done);
            });
        });

        describe('when valid email and password are provided', function () {
            it('should return success true and the login token', function (done) {
                request(app)
                    .post('/user/signup')
                    .send({email: 'email@valid.org', password: '12345678'})
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end(function (err, result) {
                        assert.equal(result.body.success, true);
                        assert.equal(result.body.token.token !== '', true);
                        done();
                    });
            });
        });
    });
    
    describe('login', function () {
        describe('when no email or password are provided', function () {
            it('should return success false', function (done) {
                request(app)
                    .post('/user/login')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect({"success": false})
                    .expect(400, done);
            });
        });

        describe('when the email can\'t be found', function () {
            it('should return success false', function (done) {
                request(app)
                    .post('/user/login')
                    .set('Accept', 'application/json')
                    .send({email: 'email@invalid.org', password: '12345678'})
                    .expect('Content-Type', /json/)
                    .expect({"success": false})
                    .expect(400, done);
            });
        });

        describe('when the email exists but the password does not match', function () {
            it('should return success false', function (done) {
                request(app)
                    .post('/user/login')
                    .set('Accept', 'application/json')
                    .send({email: 'email@valid.org', password: '12345679'})
                    .expect('Content-Type', /json/)
                    .expect({"success": false})
                    .expect(400, done);
            });
        });

        describe('when email exists and the password matches', function () {
            it('should return success true and the login token', function (done) {
                request(app)
                    .post('/user/login')
                    .send({email: 'email@valid.org', password: '12345678'})
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, result) {
                        assert.equal(result.body.success, true);
                        assert.equal(result.body.token.token !== '', true);
                        done();
                    });
            });
        });
    });
});