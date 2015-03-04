'use strict';

var HttpBackend = require('http-backend-proxy');
var proxy = new HttpBackend(browser);

describe('e2e / signup', function () {
    var mail, pwd, btn;

    beforeEach(function () {
        browser.get('/#/user/signup');
        mail = element(by.id('email'));
        pwd = element(by.id('password'));
        btn = element(by.id('btn-signup'));
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

    /*describe('when user enters valid data and submits the form', function () {
        it('should register the user', function () {
            fillForm('valid@email.org', '12345678');
            btn.click();

            proxy.whenPOST(/\/user\/signup/).respond(200, {
                success: true,
                token: {
                    token: '1234',
                    expiration: 1
                }
            });

            expect(browser.getCurrentUrl()).toBe('http://localhost:9999/#/');
        });
    });*/


});