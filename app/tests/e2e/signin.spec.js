'use strict';

var HttpBackend = require('httpbackend'),
    backend;

describe('e2e / signin', function () {
    var mail, pwd, btn;

    beforeEach(function () {
        backend = new HttpBackend(browser);
        browser.get('#/user/login');

        mail = element(by.id('email'));
        pwd = element(by.id('password'));
        btn = element(by.id('btn-login'));
    });

    afterEach(function () {
        backend.clear();
    });

    function fillForm(_mail, _pwd) {
        mail.sendKeys(_mail);
        pwd.sendKeys(_pwd);
    }

    function alertDisplayed(displayed) {
        expect(element(by.id('login-alert')).isDisplayed()).toBe(displayed);
    }

    describe('when user enters valid data and submits the form', function () {
        it('should register the user', function () {
            backend.whenPOST(/user\/login/).respond(function (method, url, data) {
                return [200, {
                    success: true,
                    token: {
                        token: '1234',
                        expiration: 1
                    }
                }];
            });

            fillForm('valid@email.org', '12345678');
            btn.click();

            expect(browser.driver.getCurrentUrl()).toBe('http://localhost:9999/index_e2e.html#/');
        });

        it('should send error if the user exists', function () {
            backend.whenPOST(/user\/login/).respond(function (method, url, data) {
                return [400, {
                    success: false
                }];
            });

            fillForm('valid@email.org', '12345678');
            btn.click();

            alertDisplayed(true);
        });
    });


});