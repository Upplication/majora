'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    TemplateModel = require("../models/template"),
    UserModel = require("../models/user"),
    utils = require('./utils'),
    should = require("should"),
    request = require('supertest');

var app = require('../app.js');

describe('ApiController', function () {
    describe('/api/v1/templates', function () {
        after(function (done) {
            done();
        });

        it('should return templates as JSON', function (done) {
            request(app)
                .get('/api/v1/templates')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        describe('without templates', function () {
            it('should return empty JSON', function (done) {
                request(app)
                    .get('/api/v1/templates?page=1&max=25')
                    .set('Accept', 'application/json')
                    .expect({count: 0, page: 1, templates: []})
                    .expect(200, done);
            });
        });

        describe('with templates', function () {
            before(function(done) {
                UserModel.create({username: "test@test.es", password: "1234"}, function(err, user) {
                    TemplateModel.create({name: "test", author: user.username, version: 1}, function(err, template){
                        done()});
                })
            });

            after(function(done) {
                utils.clearDb(done);
            });

            it ('should return array templates', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body.templates.should.be.instanceOf(Array);
                        done();
                    });
            });
            it ('should return array templates with name', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body.templates[0].name.should.be.eql("test");
                        done();
                    });
            });
            it ('should return array templates with author', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body.templates[0].author.should.be.eql("test@test.es");
                        done();
                    });
            });
            it ('should return array templates with version', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body.templates[0].version.should.be.eql(1);
                        done();
                    });
            });
            it ('dont should return array templates with _id', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        should.not.exist(result.body.templates[0]._id);
                        done();
                    });

            });

            it('should return page counter', function (done) {
                request(app)
                    .get('/api/v1/templates?page=1&max=25')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, result) {
                        result.body.count.should.be.not.null;
                        done();
                    });
            });
        });
    });

    describe('/api/v1/templates/test@test.com', function () {

        after(function(done) {
           utils.clearDb(done);
        });


        before(function(done) {
            UserModel.create({username: "test@test.com", password: "1234"}, function(err, user) {
                TemplateModel.create({name: "test-leet", author: user.username, version: 1}, function(err, template){
                    done();
                });
            });
        });

        it('should return template as JSON', function (done) {
            request(app)
                .get('/api/v1/templates/test@test.com')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });


        describe('should return template by author test@test.com', function(){
            it('with field author equal to test@test.com', function (done) {
                request(app)
                    .get('/api/v1/templates/test@test.com')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body.templates[0].author.should.be.eql("test@test.com");
                        done();
                    });
            });

            it('with field name', function (done) {
                request(app)
                    .get('/api/v1/templates/test@test.com')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body.templates[0].name.should.be.eql("test-leet");
                        done();
                    });
            });

            it('without field _id and __v', function (done) {
                request(app)
                    .get('/api/v1/templates/test@test.com')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        should.not.exist(result.body.templates[0]._id);
                        should.not.exist(result.body.templates[0].__v);
                        done();
                    });
            });
        });
    });
});