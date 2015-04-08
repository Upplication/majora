'use strict';

var microAuth = require('micro-auth');

module.exports = microAuth.createUserModel({
    statics: {
        findByEmail: function (email, callback) {
            this.find({username: new RegExp(email, 'i')}, callback);
        }
    }
});