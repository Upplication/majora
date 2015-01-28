'use strict';

var env = require('../config'),
    clearDb = require('mocha-mongoose')('mongodb://' + env.mongodb, {noClear: true});

module.exports = {
    clearDb: clearDb
};
