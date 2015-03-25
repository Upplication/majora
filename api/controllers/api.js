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
	TemplateModel.findAll()
        .select('-_id') // exclude id
        .select('-__v') // exclude version
        .exec(function(err, results){
    		if (results) {
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
 * TODO: jsdoc
 */
v1.getTemplate = function(req, res){
	res.send({'message': 'get template ' + req.params.id});  
};


var _sendError = function (res) {
	console.log("error :/");
	console.log(res);
    res.status(400).send({
        success: false
    });
};

module.exports = Api;