'use strict';

var TemplateModel = require('../models/template'),
 	q = require('q');

var Api = {};
Api.v1 = {};
var v1 = Api.v1;
/**
 * TODO: jsdoc
 */
v1.hello = function (req, res) {
	res.send({'message': 'hello world'});  
};
/**
 * Retrieve all templates.
 */
v1.getTemplates = function(req, res) {
	var deferred = q.defer();
	TemplateModel.findAll(function(err, results){
    		if (results) {
                results.map(function(elem){
                    return elem.toJson();
                });
    			 deferred.resolve(results);
            } 
            else {
                 deferred.reject(err);
            }
	});

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
 * get a template by name
 */
v1.getTemplate = function(req, res){

	var deferred = q.defer();
    TemplateModel.findByName(req.params.name, function(err, result){
            if (result) {
                deferred.resolve(result.toJson());
            } 
            else {
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


var _sendError = function (res) {
	console.log("error :/");
	console.log(res);
    res.status(400).send({
        success: false
    });
};

module.exports = Api;