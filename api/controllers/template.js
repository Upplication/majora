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
        var deferredUpload = q.defer();

        q.allSettled([
            upload(css, form.name),
            upload(snapshots[0], form.name)
        ])
            .then(function (results) {
                deferredUpload.resolve({
                    css: results[0].value,
                    image: results[1].value
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

module.exports = Template;