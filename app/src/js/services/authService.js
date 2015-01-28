(function (window, upp, angular) {
    "use strict";
    
    var TOKEN_KEY = 'login_token';
    
    upp.service('authService', [function () {
        var service = {};

        /**
         * Stores the token on localStorage
         * @param {String} token Token
         */
        service.storeToken = function (token) {
            localStorage.setItem(TOKEN_KEY, angular.toJson(token));
        };
        
        return service;
    }]);
    
}(window, window.upp, angular));