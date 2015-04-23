'use strict';

var TemplateModel = require('../models/template'),
    q = require('q');

var v1 = {};

/**
 * Retrieve a page of templates.
 * Retrieve templates by author if param authorUserName are present
 */
v1.getTemplates = function (req, res) {

    if (req.params.authorName){
        TemplateModel.findByAuthorName(req.params.authorUserName, function (err, results) {
            if (results) {
                results.map(function (elem) {
                    return elem.toJson();
                });
                res.send(results);
            } 
            else _sendError(res);
        });
    }
    else {
         TemplateModel.findByPage(req.query.page || 1, req.query.max || 25, function (err, count, results) {
            if (err) _sendError(res);

            res.send({
                page: req.query.page,
                count: count,
                templates: results.map(function (t) {
                    return t.toJson();
                })
            });
         });
    }
}

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
    res.status(400).send({
        success: false
    });
};

module.exports = {
    v1: v1
};