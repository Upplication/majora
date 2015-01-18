'use strict';

describe('the page homepage', function() {
    it('should have a title', function() {
        browser.get('/');

        expect(browser.getTitle()).toEqual('Upplication');
    });
});