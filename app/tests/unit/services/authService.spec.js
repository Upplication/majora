'use strict';

describe('authService', function () {
    var service, http, httpBackend;
    
    beforeEach(module('upp'));
    
    beforeEach(inject(function ($injector) {
        service = $injector.get('authService');
        http = $injector.get('$http');
        httpBackend = $injector.get('$httpBackend');
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

    describe('getToken', function () {
        var testTokenExists = function (exists) {
            var token = service.getToken();
            expect(!!(token && typeof token === 'string')).toBe(exists);
        };

        beforeEach(function () {
            localStorage.removeItem('login_token');
        });

        describe('if the token does not exist', function () {
            it('should not return the token', function () {
                testTokenExists(false);
            });
        });

        describe('if the token is expired', function () {
            it('should not return the token', function () {
                service.storeToken({
                    token: 'aaaaa',
                    expiration: 0
                });
                testTokenExists(false);
            });
        });

        describe('if the token is not expired', function () {
            it('should return the token', function () {
                service.storeToken({
                    token: 'aaaaa',
                    expiration: new Date().getTime() + 2000
                });
                testTokenExists(true);
            });
        });
    });

    describe('when any request is made', function () {
        it('the token should be sent when the user has a token', function () {
            var token = 'aaaaa';
            service.storeToken({
                token: token,
                expiration: new Date().getTime() + 2000
            });

            http.get('http://example.com').then(function () {
                expect(true).toBe(true);
            }, function () {
                expect(false).toBe(true);
            });

            httpBackend.expectGET('http://example.com', undefined, function (headers) {
                return headers['Authorization'] === 'Bearer: ' + token;
            }).respond(200, {});

            httpBackend.flush();
        });
    });
    
});