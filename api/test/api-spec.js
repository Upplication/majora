'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    TemplateModel = require("../models/template"),
    clearDB = require('./utils'),
    should = require("should"),
    request = require('supertest');

var app = require('../app.js');

describe('ApiController', function () {
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
    describe('/api/v1/templates/leet', function () {

        after(function(done) {
           //clearDB(done);
           done();
        });


        before(function(done) {
               TemplateModel.create({name: "test-leet", author: "leet", version: 1}, function(){done()});
        });

        it('should return template as JSON', function (done) {
            request(app)
                .get('/api/v1/templates/leet')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        describe('should return template by author leet', function(){
            it('with field author equal to leet', function (done) {
                request(app)
                    .get('/api/v1/templates/leet')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body.author.should.be.eql("leet");
                        done();
                    });
            });

            it('with field name', function (done) {
                request(app)
                    .get('/api/v1/templates/leet')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        result.body.name.should.be.eql("test-leet");
                        done();
                    });
            });

            it('without field _id and __v', function (done) {
                request(app)
                    .get('/api/v1/templates/leet')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, result){
                        should.not.exist(result.body._id);
                        should.not.exist(result.body.__v);
                        done();
                    });
            });
        });

       
    });
});