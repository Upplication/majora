(function (window, angular) {
    "use strict";

    var upp = angular.module('upp', ['ngRoute']);

    upp.config(['$routeProvider', function ($routeProvider) {
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

    window.upp = upp;

}(window, angular));