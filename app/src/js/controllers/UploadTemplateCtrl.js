(function (window, upp) {
    'use strict';

    upp.controller('UploadTemplateCtrl', ['authService', '$location', 'templateService',
        function (authService, $location, templateService) {
            if (!authService.isLoggedIn()) {
                $location.path('/user/login');
            }

            var self = this;

            this.data = {
                snapshots: [],
                name: '',
                css: undefined
            };

            // TODO: accept => http://www.w3schools.com/jsref/prop_fileupload_accept.asp

            this.$on('fileSelected:snapshots', function (e, args) {
                self.data.snapshots.push(args.file);
                if (!self.$$phase) {
                    self.$digest();
                }
            });

            this.$on('fileSelected:css', function (e, args) {
                self.data.css = args.file;
                if (!self.$$phase) {
                    self.$digest();
                }
            });

            /**
             * Is the form valid?
             * @returns {boolean}
             */
            this.formValid = function () {
                return self.data.name.trim().length > 4 && self.data.css && self.data.snapshots.length > 0;
            };

            /**
             * Submit the template creation form
             */
            this.submit = function () {
                self.error = false;

                templateService.create(self.data.name, self.data.snapshots, self.data.css)
                    .then(function (data) {
                        $location.path('/template/' + data.name);
                    }, function () {
                        self.error = true;
                    });
            };
        }
    ]);

}(window, window.upp));