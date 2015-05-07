(function (window) {
    "use strict";

    window.upp = angular.module('upp', ['ngRoute', 'config']);

    window.upp.config(['$routeProvider', '$httpProvider', 'authServiceProvider',
        function ($routeProvider, $httpProvider, authServiceProvider) {
            $routeProvider.
                when('/user/login', {
                    templateUrl: 'login.html'
                })
                .when('/user/signup', {
                    templateUrl: 'signup.html'
                })
                .when('/template/add', {
                    templateUrl: 'new-template.html'
                })
                .when('/template/list/:page?', {
                    templateUrl: 'list-templates.html'
                })
                .when('/template/:name', {
                    templateUrl: 'view-template.html'
                })
                .otherwise({
                    redirectTo: '/'
                });

            var token = authServiceProvider.getToken();
            if (token) {
                $httpProvider.defaults.headers.common['Authorization'] = 'Bearer: ' + token;
            }

            $httpProvider.defaults.withCredentials = false;
            $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
            $httpProvider.defaults.cache = false;
        }
    ]);

}(window));