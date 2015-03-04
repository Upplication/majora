(function (window, upp) {
    "use strict";

    upp.controller('SigninCtrl', ['userService', 'authService', '$location',
        function (userService, authService, $location) {
            this.data = {
                email: '',
                password: ''
            };

            var self = this;

            /**
             * Submits the form to the server
             */
            ['signup', 'signin'].forEach(function (m) {
                self['submit' + (m[0].toUpperCase() + m.slice(1))] = function () {
                    userService[m](self.data.email, self.data.password).then(function (token) {
                        self.error = false;
                        authService.storeToken(token);

                        $location.path('/');
                    }, function () {
                        self.error = true;
                    });
                };
            });
        }
    ]);

}(window, window.upp));