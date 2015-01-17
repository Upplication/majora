'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    password: String,
    creationDate: {type: Date, 'default': Date.now}
});

module.exports = mongoose.model('User', userSchema);