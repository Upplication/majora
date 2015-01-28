'use strict';

module.exports = {
    /**
     * Validates an email
     * @method isEmailValid
     * @param {String} email Email address
     * @returns {boolean}
     */
    isEmailValid: function (email) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
};