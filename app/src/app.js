(function (window, angular) {
    "use strict";
    
    var upp = angular.module('upp', ['ngRoute']);
    
    upp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
		  when('/login', {
			templateUrl: 'templates/login.html',
			controller: 'LoginCtrl'
		  }).
		  when('/register', {
			templateUrl: 'templates/register.html',
			controller: 'RegisterCtrl'
		  }).
		  otherwise({
			redirectTo: '/'
		  });
    }]);
    
    window.upp = upp;
    
}(window, angular));