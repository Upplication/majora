'use strict';

describe('userService', function () {
    var httpBackend, service;

    var VALID_EMAIL = 'valid@email.me',
        VALID_PWD = '12345678';

    var SIGNUP_RESPONSE = {
            token: {
                token: 'a',
                expiration: Date.now()
            }
        },
        LOGIN_RESPONSE = SIGNUP_RESPONSE;

    beforeEach(module('upp'));

    beforeEach(inject(function ($injector) {
        httpBackend = $injector.get('$httpBackend');
        service = $injector.get('userService');
    }));

    describe('signup', function () {
        it('should make a POST call to /user/signup and return the token', function () {
            service.signup(VALID_EMAIL, VALID_PWD)
                .then(function (token) {
                    expect(token.token).toBe(SIGNUP_RESPONSE.token.token);
                    expect(token.expiration).toBe(SIGNUP_RESPONSE.token.expiration);
                });
            
            httpBackend.expectPOST(/user\/signup/).respond(200, SIGNUP_RESPONSE);
            httpBackend.flush();
        });
    });

    describe('signin', function () {
        it('should make a POST call to /user/login and return the token', function () {
            service.signin(VALID_EMAIL, VALID_PWD)
                .then(function (token) {
                    expect(token.token).toBe(SIGNUP_RESPONSE.token.token);
                    expect(token.expiration).toBe(SIGNUP_RESPONSE.token.expiration);
                });

            httpBackend.expectPOST(/user\/login/).respond(200, LOGIN_RESPONSE);
            httpBackend.flush();
        });
    });

});