'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Template with:
 * - name (string)
 * - snapshots (urls list)
 * - version (int)
 * - author (reference email)
 */
var templateSchema = new Schema({
    name: String,
    author: String,
    snapshots: [String],
    version: Number
});

/**
 * Returns the template as JSON with only the required fields
 */
templateSchema.methods.toJson = function () {
    return {
        name: this.name,
        snapshots: this.snapshots,
        version: this.version,
        author: this.author
    };
};

/**
 * TODO: https://www.npmjs.com/package/mongoose-list
 * Finds all templates
 * @param {Function} callback Callback function
 */
templateSchema.statics.findAll = function (callback) {
    if (callback) {
        this.find().exec(callback);
    } else {
        return this.find();
    }
};

/**
 * Finds a template with the given name
 * @param {String}   name     Name
 * @param {Function} callback Callback function
 */
templateSchema.statics.findByName = function (name, callback) {
    this.findOne({name: new RegExp(name, 'i')}, callback);
};

module.exports = mongoose.model('Template', templateSchema);