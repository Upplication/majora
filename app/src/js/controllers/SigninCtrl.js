(function (window, upp) {
    "use strict";

    upp.controller('SigninCtrl', ['userService', 'authService', '$location',
        function (userService, authService, $location) {
            this.data = {
                email: '',
                password: ''
            };

            /**
             * Submits the form to the server
             */
            this.submit = function () {
                userService.signin(this.data.email, this.data.password).then(function (token) {
                    this.error = false;
                    authService.storeToken(token);

                    $location.path('/');
                }, function () {
                    this.error = true;
                }.bind(this));
            };
        }
    ]);

}(window, window.upp));