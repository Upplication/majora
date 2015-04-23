'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Template with:
 * - name (string)
 * - snapshots (list urls)
 * - version (int)
 * - author (reference author username)
 */
var templateSchema = new Schema({
	name: String,
    // author username
    author: String,
    css: String,
    snapshots: [String],
    version: Number
});

/**
 * return as a JSON without special mongo fields like _id and __v
 */
templateSchema.methods.toJson = function(){
    this._id = undefined;
    this.__v = undefined;
    // dont work: http://stackoverflow.com/questions/4486926/delete-a-key-from-a-mongodb-document-using-mongoose
    delete this['_id'];
    delete this.__v;

    return this;
};

/**
 * TODO: https://www.npmjs.com/package/mongoose-list
 * Finds all templates
 * @param {Function} callback Callback function
 */
templateSchema.statics.findAll = function (callback) {
    if (callback){
        this.find().exec(callback);
    }
    else {
        return this.find();
    }
};


/**
 * Finds a unique template with the given name
 * @param {String}   name    Name
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