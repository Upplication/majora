(function (window) {
    "use strict";

    if (!window.upp) {
        window.upp = angular.module('upp', ['ngRoute', 'config']);
    }

    window.upp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/user/login', {
                templateUrl: 'login.html'
            }).
            when('/user/signup', {
                templateUrl: 'signup.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

}(window));