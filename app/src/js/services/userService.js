(function (window, upp, restServerUrl) {
    "use strict";

    upp.service('userService', ['$http', '$q', function ($http, $q) {
        var service = {};

        /**
         * Signs the user up on the server
         * @param {String} email    User email
         * @param {String} password Password 
         * @return {promise}
         */
        service.signup = function (email, password) {
            var deferred = $q.defer(); 
            
            $http.post(restServerUrl + '/user/signup', {
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

}(window, window.upp, angular, window.REST_SERVER_URL));