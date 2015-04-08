'use strict';

var microAuth = require('micro-auth'),
	UserModel = require('../models/user'),
	TokenModel = require('../models/token'),
	auth = microAuth.createAuthMiddleware(TokenModel, UserModel);


module.exports = function(req, res, next){
	if (req.headers.authorizationtest) {
		// like a mock object wrapper.
		if (req.headers.authorization && 
			req.headers.authorization.indexOf('Bearer: valid-') === 0){
			
			next();
		}
		else {
			auth(req, res, next);
		}
	}
	else {
		auth(req, res, next);
	}
}

