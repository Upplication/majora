(function (window, upp, angular) {
    "use strict";

    var TOKEN_KEY = 'login_token';

    upp.provider('authService', [function () {
        var service = {};

        /**
         * Stores the token on localStorage
         * @param {Object} token Token
         */
        service.storeToken = function (token) {
            localStorage.setItem(TOKEN_KEY, angular.toJson(token));
        };

        /**
         * Retrieves the token if it's not expired
         * @returns {String|undefined}
         */
        service.getToken = function () {
            var token = angular.fromJson(localStorage.getItem(TOKEN_KEY));
            if (token && typeof token === 'object'
                && Number(token.expiration) >= new Date().getTime()) {
                return token.token;
            }

            return undefined;
        };

        return {
            getToken: service.getToken,
            $get: function () {
                return service;
            }
        };
    }]);

}(window, window.upp, angular));