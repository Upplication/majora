'use strict';

var envs = {
    'development': {
        'mongodb': 'localhost:27017/majora'
    },
    'test': {
        'mongodb': 'localhost:27017/majora'
    },
    'production': {
        'mongodb': process.env.MAJORA_MONGODB_URL || 'localhost:27017/majora'
    }
};

// Configure mongoose for the different envs
var env = process.env.NODE_ENV || 'development';

module.exports = envs[env];