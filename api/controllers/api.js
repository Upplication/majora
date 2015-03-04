'use strict';

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
 * TODO: jsdoc
 */
v1.getTemplates = function(req, res){
	res.send({'message': 'list templates'});  
};
/**
 * TODO: jsdoc
 */
v1.getTemplate = function(req, res){
	res.send({'message': 'get template ' + req.params.id});  
};

module.exports = Api;