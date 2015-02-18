'use strict';



describe('SignIn: the password is empty', function(){
	it('should disable signin button', function(){
		browser.get('#/user/signup');

		element(by.id('email')).sendKeys('paco@gmail.com');
    	element(by.id('password')).sendKeys('');

    	var signinButton  = element(by.id('btn-signup'));

		expect(signinButton).toBeDisabled();

	});
});
/*
describe('LogIn: the password is empty', function(){
	it('An error message is displayed.', function(){
		browser.get('#/user/login');

		element(by.id('email')).sendKeys('paco@gmail.com');
    	element(by.id('password')).sendKeys('');
    	
		//click on login button
		
		var loginBtn = element(by.id('btn-login'));
		
		loginBtn.click();
		
		//An error message appeared
		//expect(element(by.id('login-alert')).count()).toEqual(1);
		expect(loginBtn).toBeDefined();

	});
});*/

/*
describe('LogIn: the email is empty', function(){
	it('An error message is displayed.', function(){
		browser.get('#/user/login');

		//element(by.id('email')).sendKeys('');
		
		element( by.id('password') ).sendKeys("1234", protractor.Key.ENTER);
		
		var loginAlert = element(by.id('login-alert'));
    			
		//An error message appeared
		expect(loginAlert).toBe('Invalid username or password.');

	});
});*/




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