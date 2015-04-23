'use strict';

var mongoose = require('mongoose'),
    mongooseList = require('mongoose-list'),
    Schema = mongoose.Schema;

/**
 * Template with:
 * - name (string)
 * - snapshots (urls list)
 * - version (int)
 * - author (reference author username)
 */
var templateSchema = new Schema({
	name: String,
    // author username
    author: String,
    css: String,
    snapshots: [String],
    version: Number,
    created: {type: Date, 'default': Date.now},
    updated: Date
});

mongoose.plugin(mongooseList);

/**
 * Returns the template as JSON with only the required fields
 */
templateSchema.methods.toJson = function () {
    return {
        name: this.name,
        snapshots: this.snapshots,
        version: this.version,
        author: this.author,
        created: this.created,
        updated: this.updated
    };
};

/**
 * Finds a paginated list of templates
 * @param {Number} page Page number
 * @param {Number} num  Number of items per page
 * @param {Function} callback Callback
 */
templateSchema.statics.findByPage = function (page, num, callback) {
    this.list({start: (page - 1) * num, limit: num, sort: 'created'}, callback);
};


/**
 * Finds a template with the given name
 * @param {String}   name     Name
 * @param {Function} callback Callback function
 */
templateSchema.statics.findByName = function (name, callback) {
    this.findOne({name: new RegExp(name, 'i')}, callback);
};

/**
 * Finds a list of template with the given author name (username)
 * @param {String}   name    Name
 * @param {Function} callback Callback function
 */
templateSchema.statics.findByAuthorName = function (name, callback) {
    this.find({author: new RegExp(name, 'i')}, callback);
};

module.exports = mongoose.model('Template', templateSchema);