'use strict';

var express = require('express'),
    request = require('supertest'),
    TemplateController = require('../controllers/template'),
    TemplateModel = require("../models/template"),
    aws = require('../util/aws'),
    should = require('should'),
    assert = require('assert'),
    utils = require('./utils');

var app = require('../app.js');
// mock upload
aws.upload = function(name, body, callback) {
    callback(null, {
        Location: "http://image.com/mocked.jpg"
    })
};
// mock auth
var mockAuth = function (req, res, next) {
    req.user = {username: "test@test.es"};
    next();
};

app.post('/test/template/create', mockAuth, TemplateController.create);

describe('TemplateController', function () {
    describe('create', function () {
        before(function (done) {
            utils.clearDb(done);
        });
        
        describe('when no name or css or files are provided', function () {
            it('should return success false', function (done) {
                request(app)
                    .post('/test/template/create')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect({"success": false})
                    .expect(400, done);
            });
        });

        describe('when no css are provided', function () {
            it('should return success false', function (done) {
                request(app)
                    .post('/test/template/create')
                    .set('Accept', 'application/json')
                    .attach('snapshot_0', 'test/fixtures/Chrysanthemum.jpg')
                    .field('name', 'name')
                    .expect('Content-Type', /json/)
                    .expect({"success": false})
                    .expect(400, done);
            });
        });

        describe('when no files provided', function () {
            it('should return success false', function (done) {
                request(app)
                    .post('/test/template/create')
                    .set('Accept', 'application/json')
                    .field('name', 'name')
                    .attach('css', 'test/fixtures/test.css')
                    .expect('Content-Type', /json/)
                    .expect({"success": false})
                    .expect(400, done);
            });
        });

        describe('when all fields are provided', function () {
            it('should return 201', function (done) {
                this.timeout(100000);
                request(app)
                    .post('/test/template/create')
                    .set('Accept', 'application/json')
                    .field('name', 'name')
                    .attach('css', 'test/fixtures/test.css')
                    .attach('snapshot_0', 'test/fixtures/Chrysanthemum.jpg')
                    .expect('Content-Type', /json/)
                    .expect(201, done);
            });

             it('should create a template in mongo', function (done) {
                this.timeout(100000);
                request(app)
                    .post('/test/template/create')
                    .set('Accept', 'application/json')
                    .field('name', 'template-basic')
                    .attach('css', 'test/fixtures/test.css')
                    .attach('snapshot_0', 'test/fixtures/Chrysanthemum.jpg')
                    .end(function () {
                        TemplateModel.findByName('template-basic', function(err, data) {
                            data.should.be.not.null;
                            data.name.should.be.eql('template-basic');
                            data.snapshots.length.should.be.eql(1);
                            data.snapshots[0].should.be.not.null;
                            data.snapshots[0].should.be.eql('http://image.com/mocked.jpg');
                            data.version.should.be.eql(1);
                            data.author.should.be.eql('test@test.es');

                            done();
                        });
                    });
            });
        });
    });
});