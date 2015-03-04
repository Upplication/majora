'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Template with:
 * - name (string)
 * - snapshots (list urls)
 * - version (int)
 * - author (reference email)
 */
var templateSchema = new Schema({
	name: String,
    author: String,
    snapshots: [String],
    version: int
});

/**
 * TODO: https://www.npmjs.com/package/mongoose-list
 * Finds all templates
 * @param {Function} callback Callback function
 */
templateSchema.statics.findAll = function (callback) {
    this.find(callback);
};

/**
 * Finds a unique template with the given name
 * @param {String}   name    Name
 * @param {Function} callback Callback function
 */
templateSchema.statics.findByName = function (name, callback) {
    this.find({name: new RegExp(name, 'i')}, callback);
};


module.exports = mongoose.model('Template', templateSchema);