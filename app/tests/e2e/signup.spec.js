'use strict';

var HttpBackend = require('httpbackend'),
    backend;

describe('e2e / signup', function () {
    var mail, pwd, btn;

    beforeEach(function () {
        backend = new HttpBackend(browser);
        browser.get('#/user/signup');

        mail = element(by.id('email'));
        pwd = element(by.id('password'));
        btn = element(by.id('btn-signup'));
    });

    afterEach(function () {
        backend.clear();
    });

    function fillForm(_mail, _pwd) {
        mail.sendKeys(_mail);
        pwd.sendKeys(_pwd);
    }

    function btnEnabled() {
        expect(btn.isEnabled()).toBe(true);
    }

    function btnDisabled() {
        expect(btn.isEnabled()).toBe(false);
    }

    function alertDisplayed(displayed) {
        expect(element(by.id('login-alert')).isDisplayed()).toBe(displayed);
    }

    describe('when you don\'t add the user email or the password', function () {
        it('should not activate the submit button', function () {
            fillForm('', '');
            btnDisabled();
        });
    });

    describe('when you add the user email and not the password', function () {
        it('should not activate the submit button', function () {
            fillForm('valid@email.org', '');
            btnDisabled();
        });
    });

    describe('when you add the user email and the password', function () {
        describe('and email is not valid', function () {
            it('should not activate the submit button', function () {
                fillForm('invalid', '123456');
                btnDisabled();
            });
        });

        describe('and email is valid but password is not', function () {
            it('should not activate the submit button', function () {
                fillForm('valid@email.org', '123456');
                btnDisabled();
            });
        });

        describe('and email and password are valid', function () {
            it('should activate the submit button', function () {
                fillForm('valid@email.org', '12345678');
                btnEnabled();
            });
        });
    });

    describe('when user enters valid data and submits the form', function () {
        it('should register the user', function () {
            backend.whenPOST(/user\/signup/).respond(function (method, url, data) {
                return [200, {
                    success: false,
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
            backend.whenPOST(/user\/signup/).respond(function (method, url, data) {
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