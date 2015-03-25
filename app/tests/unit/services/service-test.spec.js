'use strict';

describe('test authService', function () {
    it('should return service with localStorage login_token', function () {
        expect(1+1).toBe(2);
    });
});

describe('test authService', function() {
  var authService;

  beforeEach(inject(function(_authService_) {
    authService = _authService_;
  }));

})