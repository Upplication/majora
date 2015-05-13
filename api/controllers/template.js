'use strict';

var validators = require('../util/validators'),
    TemplateModel = require('../models/template'),
    aws = require('../util/aws'),
    q = require('q');

var Template = {};

var upload = function (file, tpl) {

    var deferred = q.defer();

    aws.upload(Date.now() + '_' + tpl + '.' + file[0].extension, file[0].path, function (err, data) {
        if (err) deferred.reject();
        deferred.resolve(data.Location);
    });

    return deferred.promise;
};

var remove = function (file) {

    var deferred = q.defer();

    aws.remove(file, function (err, data) {
        if (err) deferred.reject();
        deferred.resolve();
    });

    return deferred.promise;
};
/**
 * Create a new template
 * @param req
 * @param res
 */
Template.create = function (req, res) {
    var form = req.body,
        css = req.files.css,
        snapshots = [],
        sendError = function () {
            res.status(400).send({
                success: false
            });
        },
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
        return q.allSettled([
            upload(css, form.name),
            upload(snapshots[0], form.name)
        ])
    })
    .then(function (results) {
        return {
            css: results[0].value,
            image: results[1].value
        }
    })
    .then(function (uploads) {
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
    })
    .fail(sendError)
    .done();
};
/**
 * get a template or get 404
 * @param req
 * @param res
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
 * @param req
 * @param res
 */
Template.update = function (req, res) {
    var deferred = q.defer(),
        sendError = function () {
            res.status(400).send({
                success: false
            });
        },
        snapshots = [],
        template = undefined;

    for (var f in req.files) {
        if (req.files.hasOwnProperty(f) && f.indexOf('snapshot_') !== -1) {
            snapshots.push(req.files[f]);
        }
    }

    if (!req.files ||
        ((!req.files.css || req.files.css.length != 1) &&
            snapshots.length < 1)) {
        sendError();
        return;
    }
    
    TemplateModel.findByName(req.params.name, function(err, templateLoaded){
        if (err) deferred.reject();
        if (templateLoaded) {
            template = templateLoaded;
            deferred.resolve();
        }
        else {
           deferred.reject();
        }
    });

    // update:
    deferred.promise.then(function () {
        // update
        template.version = template.version + 1;
        // try to upload css
        if (req.files.css) {
            return upload(req.files.css, req.params.name);
        }
        else {
             return undefined;
        }
    })
    // save css
    .then(function(css){
        // save new css if exists
        if (css) {
            var oldCss = template.css;
            template.css = css;
            return remove(oldCss);
        }
        else {
            return undefined;
        }
    })
    // upload snapshot
    .then(function(){
        // upload img if exists
        // Retrieve the snapshots from the form (currently only the first will be used)
        if (snapshots.length >= 1) {
            return upload(snapshots[0], req.params.name);
        }
        else {
            return undefined;
        }
    })
    // save snapshot
    .then(function(img){
        if (img) {
            var oldSnapshot = template.snapshots;
            template.snapshots = [img];
            return remove(oldSnapshot[0]);
        }
        else {
            return undefined;
        }
    })
    // save object
    .then(function(){
        var deferred = q.defer();
        template.save(function(err, data){
            if (err)  deferred.reject(err);
            else  deferred.resolve();
        });
        return deferred.promise;
    })
    .then(function(){
        res.status(200);
        res.send({success:true});
    })
    .fail(sendError)
    .done();
};

module.exports = Template;