'use strict';

var microAuth = require('micro-auth');

module.exports = microAuth.createTokenModel({
    methods: {
        toJson: function () {
            return {
                token: this.token,
                expiration: this.expiration
            };
        }
    }
});