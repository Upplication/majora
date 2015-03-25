'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    TemplateModel = require("../models/template"),
    clearDB = require('./utils'),
    should = require("should"),
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
         
        after(function(done) {
           //clearDB(done);
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

            it ('should return empty JSON', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect({})
                    .expect(200, done);
            });
        });

        describe('with templates', function () {

            before(function(done) {
               TemplateModel.create({name: "test", author: "test", version: 1}, function(){done()});
            });

            it ('should return array templates', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body.should.be.instanceOf(Array);
                        done();
                    });
            });
            it ('should return array templates with name', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body[0].name.should.be.eql("test");
                        done();
                    });
            });
            it ('should return array templates with author', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body[0].author.should.be.eql("test");
                        done();
                    });
            });
            it ('should return array templates with version', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body[0].version.should.be.eql(1);
                        done();
                    });
            });
            it ('dont should return array templates with _id', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        should.not.exist(result.body[0]._id);
                        done();
                    });
            });

            it ('dont should return array templates with __v', function(done){
                request(app)
                 .get('/api/v1/templates')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        should.not.exist(result.body[0].__v);
                        done();
                    });
            });
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