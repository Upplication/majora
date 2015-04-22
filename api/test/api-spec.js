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
            before(function (done) {
                TemplateModel.create({name: "test", author: "test", version: 1}, function () {
                    done()
                });
            });

            it('should return array of templates with data', function (done) {
                request(app)
                    .get('/api/v1/templates?page=1&max=25')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, result) {
                        result.body.templates.should.be.instanceOf(Array);
                        result.body.templates[0].name.should.be.eql("test");
                        result.body.templates[0].author.should.be.eql("test");
                        result.body.templates[0].version.should.be.eql(1);
                        done();
                    });
            });
        });
    });

    describe('/api/v1/templates/leet', function () {
        after(function (done) {
            done();
        });

        before(function (done) {
            TemplateModel.create({name: "test-leet", author: "leet", version: 1}, function () {
                done()
            });
        });

        it('should return template as JSON', function (done) {
            request(app)
                .get('/api/v1/templates/leet')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        describe('should return template by author leet', function () {
            it('with all its data', function (done) {
                request(app)
                    .get('/api/v1/templates/leet')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, result) {
                        result.body.author.should.be.eql("leet");
                        result.body.name.should.be.eql("test-leet");
                        should.not.exist(result.body._id);
                        should.not.exist(result.body.__v);
                        done();
                    });
            });
        });
    });
});