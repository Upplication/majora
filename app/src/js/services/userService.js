(function (window, upp) {
    "use strict";

    upp.service('userService', ['$http', '$q', 'config', function ($http, $q, config) {
        var service = {};

        /**
         * Signs the user up on the server
         * @param {String} email    User email
         * @param {String} password Password
         * @return {promise}
         */
        service.signup = function (email, password) {
            var deferred = $q.defer();

            $http.post(config.endpoint + '/user/signup', {
                email: email,
                password: password
            }).then(function (response) {
                deferred.resolve(response.token);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        /**
         * Signs the user in on the server
         * @param {String} email    User email
         * @param {String} password Password
         * @return {promise}
         */
        service.signin = function (email, password) {
            var deferred = $q.defer();

            $http.post(config.endpoint + '/user/login', {
                email: email,
                password: password
            }).then(function (response) {
                deferred.resolve(response.token);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        return service;
    }]);

}(window, window.upp, angular));