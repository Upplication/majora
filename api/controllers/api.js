'use strict';

var TemplateModel = require('../models/template'),
    q = require('q');

var v1 = {};

/**
 * Retrieve all templates.
 * Retrieve templates by author if param authorUserName are present
 */
v1.getTemplates = function (req, res) {
    var deferred = q.defer();

    if (req.params.authorName){
        TemplateModel.findByAuthorName(req.params.authorUserName, function (err, results) {
            if (results) {
                results.map(function (elem) {
                    return elem.toJson();
                });
                deferred.resolve(results);
            } else {
                deferred.reject(err);
            }
        });
    }
    else {
        TemplateModel.findAll(function (err, results) {
            if (results) {
                results.map(function (elem) {
                    return elem.toJson();
                });
                deferred.resolve(results);
            } else {
                deferred.reject(err);
            }
        });
    }

    deferred.promise.then(
        function (results) {
            res.send(results);
        },
        function () {
            _sendError(res);
        }
    );
};

/**
 * Get a template by name
 */
v1.getTemplate = function (req, res) {
    var deferred = q.defer();
    TemplateModel.findByName(req.params.name, function (err, result) {
        if (result) {
            deferred.resolve(result.toJson());
        } else {
            deferred.reject(err);
        }
    });

    deferred.promise.then(
        function (result) {
            res.send(result);
        },
        function () {
            _sendError(res);
        }
    );
};

// FIXME: pass error to global error middleware
var _sendError = function (res) {
    console.log("error :/");
    console.log(res);
    res.status(400).send({
        success: false
    });
};

module.exports = {
    v1: v1
};