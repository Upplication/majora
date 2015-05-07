'use strict';

var validators = require('../util/validators'),
	TemplateModel = require('../models/template'),
    aws = require('../util/aws'),
    q = require('q');

var Template = {};

Template.create = function (req, res) {
    var form = req.body,
        images = req.files.files,
        sendError = function (e) {
            res.status(400).send({
                success: false
            });
        },
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

        return nextDefer.promise;;
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

module.exports = Template;