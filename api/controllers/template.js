'use strict';

var validators = require('../util/validators'),
    TemplateModel = require('../models/template'),
    aws = require('../util/aws'),
    q = require('q');

var Template = {},
    sendError = function () {
        res.status(400).send({
            success: false
        });
    };

var upload = function (file, tpl) {
    var deferred = q.defer();

    aws.upload(Date.now() + '_' + tpl + '.' + file[0].extension, file[0].path, function (err, data) {
        if (err) deferred.reject();
        deferred.resolve(data.Location);
    });

    return deferred.promise;
};

Template.create = function (req, res) {
    var form = req.body,
        css = req.files.css,
        snapshots = [],
       
        deferred = q.defer();

    // Retrieve the snapshots from the form (currently only the first will be used)
    for (var f in req.files) {
        if (req.files.hasOwnProperty(f) && f.indexOf('snapshot_') !== -1) {
            snapshots.push(req.files[f]);
        }
    }

    // name should be valid as path in the url!!!!
    if (form.name
        && css
        && snapshots
        && snapshots.length == 1) {
        TemplateModel.findByName(form.name, function (err, result) {
            if (result) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
        });
    } else {
        deferred.reject();
    }

    deferred.promise.then(function () {
        var deferredUpload = q.defer();

        q.allSettled([
            upload(css, form.name),
            upload(snapshots[0], form.name)
        ])
            .then(function (results) {
                deferredUpload.resolve({
                    css: results[0],
                    image: results[1]
                });
            }, function () {
                deferredUpload.reject();
            });

        deferredUpload.promise.then(function (uploads) {
            TemplateModel.create({
                name: form.name,
                version: 1,
                css: uploads.css,
                author: req.user.username,
                snapshots: [uploads.image]
            }, function (err) {
                if (err) sendError();
                res.status(201);
                res.send({
                    success: true
                });
            });
        }, sendError);
    }, sendError);
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
    var deferred = q.defer(),
        template = undefined;


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
        // update
        template.version = template.version + 1;
        // try to update css
        if (req.files.css) {
            upload(snapshots[0], form.name);
        }
        else {
             var deferred = q.defer();
             deffered.resolve();
             return deffered.promise;
        }

        if (req.files.snapshots) {
            upload(css, form.name);
        }

         nextDefer.allSettled([
            if (req.files.css) {
               
            }
            if (req.files.snapshots) {
                
            }
           
        ])
               
        res.status(200);
        res.send({});
    })
    .then(function(css){
        // save new css if exists
        if (css) {
            template.css = css;
            // TODO: delete images
        }

        // upload img if exists
        if (req.files.snapshots) {
            upload(css, form.name);
        }
        else {
            var deferred = q.defer();
            deffered.resolve();
            return deffered.promise;
        }

    })
    .then(function(img){

    })
    .fail(sendError)
    .done();
};

module.exports = Template;