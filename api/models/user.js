'use strict';

var mongoose = require('mongoose'),
    randToken = require('rand-token'),
    Schema = mongoose.Schema;

/**
 * Returns the token expiration date, that is, now + 30 days
 * @returns {Date}
 */
var defaultTokenExpirationDate = function () {
    var now = new Date;
    now.setDate(now.getDate() + 30);

    return now.getTime();
};

var tokenSchema = new Schema({
    token: String,
    expiration: {type: Date, 'default': defaultTokenExpirationDate}
});

var userSchema = new Schema({
    email: String,
    password: String,
    creationDate: {type: Date, 'default': Date.now},
    tokens: [tokenSchema]
});

/**
 * Finds all users with the given email
 * @param {String}   email    Email
 * @param {Function} callback Callback function
 */
userSchema.statics.findByEmail = function (email, callback) {
    this.find({email: new RegExp(email, 'i')}, callback);
};

/**
 * Generates a new token
 * @returns {{token: String}}
 */
userSchema.statics.newToken = function () {
    return {token: randToken.suid(16), expiration: defaultTokenExpirationDate()};
};

module.exports = mongoose.model('User', userSchema);