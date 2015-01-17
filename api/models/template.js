'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var templateSchema = new Schema({
});

module.exports = mongoose.model('Template', templateSchema);