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
            ['signup', 'signin'].forEach(function (m) {
                this['submit' + (m[0].toUpperCase() + m.slice(1))] = function () {
                    userService[m](this.data.email, this.data.password).then(function (token) {
                        this.error = false;
                        authService.storeToken(token);

                        $location.path('/');
                    }.bind(this), function () {
                        this.error = true;
                    }.bind(this));
                }.bind(this);
            }.bind(this));
        }
    ]);

}(window, window.upp));