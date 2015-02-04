'use strict';

/*describe('the page homepage', function() {
    it('should have a title', function() {
        browser.get('/');

        expect(browser.getTitle()).toEqual('Upplication');
    });
});*/

describe('the password is empty', function(){
	it('should disable signin button', function(){
		browser.get('/signin');

		element(by.model('login.data.email')).sendKeys('paco@gmail.com');
    	element(by.model('login.data.password')).sendKeys('');

    	var signinButton  = element(by.id('btn-login'));
    	expect(signinButton.isEnabled()).toBe([false]);

	});
});


/*describe('Test user Login Email: paco@gmail.com / Password: 1234', function() {
  it('should return success 200 and a user token', function() {

  	browser.get('/signin');
  	//browser.get('/user/login');

    // Find the element with ng-model="user" and type "jacksparrow" into it
    element(by.model('login.data.email')).sendKeys('paco@gmail.com');
    element(by.model('login.data.password')).sendKeys('1234');

    // Find the first (and only) button on the page and click it
    element(by.id('btn-login')).click();


    var TOKEN_KEY = 'login_token';

    var jsonData = {
                email: 'paco@gmail.com',
                password: '1234'
            };

    var json = angular.toJson(jsonData);

    expect(localStorage.getItem(TOKEN_KEY).toEquals(json));

    // Verify that now there is only one item in the task list
    //expect(element.all(by.repeater('task in tasks')).count()).toEqual(1);
  });
});*/


/*describe('Test LocalStorage mock', function(){
	beforeEach(function(){
	    localStorage = jasmine.createSpyObj('localStorage',['clear','getitem']);
	});

	it('should clear local storage', function() {
	    expect(localStorage.clear).toHaveBeenCalled();
	  });

	it('should getitem from local storage', function() {
	    expect(localStorage.getitem).toHaveBeenCalledWith(...);
	});

});*/