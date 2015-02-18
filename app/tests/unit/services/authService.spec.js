'use strict';

describe('authService', function () {
    var service;
    
    beforeEach(module('upp'));
    
    beforeEach(inject(function ($injector) {
        service = $injector.get('authService');
    }));
    
    describe('storeToken', function () {
        var token = {a: 1, b: 2};
        
        it('should store the given token', function () {
            service.storeToken(token);
            
            var _token = angular.fromJson(localStorage.getItem('login_token'));
            expect(_token.a).toBe(token.a);
            expect(_token.b).toBe(token.b);
        });
    });
    
});