'use strict';

var validators = require('../util/validators'),
	TemplateModel = require('../models/template'),
    aws = require('../util/aws'),
    q = require('q');

var Template = {},
    sendError = function (e) {
            res.status(400).send({
                success: false
            });
    };
/**
 * Create a new template with version 1 if:
 * - name unique and valid as url
 * - css mandatory
 * - images unique and valid
 * if fail return 400
 * if ok: return 201
 */
Template.create = function (req, res) {
    var form = req.body,
        images = req.files.files,
        deferred = q.defer();
    // name should be valid as path in the url!!!!
    if (form.name
        && form.css
        && images
        && images.length == 1) {

    	TemplateModel.findByName(form.name, function(err, result){
			if (result) {
				deferred.reject();
			}
			else {
				deferred.resolve();
			}    		
    	});
    } 
    else {
        deferred.reject();
    }
    // upload
    deferred.promise.then(function () {
        var nextDefer = q.defer();
        aws.upload(Date.now() + '.' + images[0].extension, images[0].path, function(err, data) {
            if (err) nextDefer.reject();
            nextDefer.resolve(data.Location);
        });

        return nextDefer.promise;
    })
    // create
    .then(function(imageUrl){
        TemplateModel.create({name: form.name, version: 1, css: form.css, author: req.user.username, snapshots: [imageUrl]}, function(err, template) {
            if (err) sendError();
            res.status(201);
            res.send({});
        });
    })
    .fail(sendError)
    .done();
};
/**
 * get a template or get 404
 */
Template.get = function (req, res) {
    TemplateModel.findByName(req.params.name, function(err, template){
        if (err) sendError();
        if (template) {
            res.status(200);
            res.send(template.toJson());
        }
        else {
            res.status(404).send();
        }
    });
};
/**
 * update the css and the logo
 */
Template.update = function (req, res) {
    var deferred = q.defer();


    if (req.files.files ||
        req.files.files.length < 1) {
        sendError();
    }
    
    TemplateModel.findByName(req.params.name, function(err, template){
        if (err) deferred.reject();
        if (template) {
            deferred.resolve(template);
        }
        else {
            res.status(404).send();
        }
    });

    // update
    deferred.promise.then(function (template) {
        var nextDefer = q.defer();
        // update
        template.version = template.version + 1;

               
        res.status(200);
        res.send({});
    })
    .fail(sendError)
    .done();
    
};

module.exports = Template;