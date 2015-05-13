(function (window, upp) {
    "use strict";

    upp.service('templateService', ['$http', '$q', 'endpoint', function ($http, $q, endpoint) {
        var service = {};

        service.create = function (name, snapshots, css) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: endpoint + '/templates/create',
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append('name', data.name);
                    formData.append('css', data.css);
                    formData.append('num_files', data.snapshots.length);
                    angular.forEach(data.snapshots, function (file, i) {
                        formData.append("snapshot_" + i, file);
                    });

                    return formData;
                },
                data: {
                    name: name,
                    snapshots: snapshots,
                    css: css
                }
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        /**
         * Get a single template
         * @param {String} name Template name
         * @returns {promise}
         */
        service.get = function (name) {
            var deferred = $q.defer();

            $http.get(endpoint + '/api/v1/template/' + name).then(function (response) {
                deferred.resolve(response.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        /**
         * Retrieves a list of templates for the given page
         * @param {Number} page Page number
         * @return {promise}
         */
        service.list = function (page) {
            var deferred = $q.defer();

            $http.get(endpoint + '/api/v1/templates?page=' + page).then(function (response) {
                deferred.resolve(response.data);
            }, function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        return service;
    }]);

}(window, window.upp, angular));