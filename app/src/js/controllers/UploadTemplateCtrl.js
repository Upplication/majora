(function (window, upp) {
    'use strict';

    upp.controller('UploadTemplateCtrl', ['authService', '$location', 'templateService', '$scope',
        function (authService, $location, templateService, $scope) {
            if (!authService.isLoggedIn()) {
                $location.path('/user/login');
            }

            var self = this;

            this.data = {
                snapshots: [],
                name: '',
                css: undefined
            };
            this.error = false;

            $scope.$on('fileSelected:snapshots', function (e, args) {
                self.data.snapshots.push(args.file);
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            });

            $scope.$on('fileSelected:css', function (e, args) {
                self.data.css = args.file;
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            });

            /**
             * Is the form valid?
             * @returns {boolean}
             */
            this.isFormValid = function () {
                return self.data.name && self.data.name.trim().length > 4 && self.data.css && self.data.snapshots.length > 0;
            };

            /**
             * Submit the template creation form
             */
            this.submit = function () {
                self.error = false;
                self.busy = true;

                templateService.create(self.data.name, self.data.snapshots, self.data.css)
                    .then(function (data) {
                        $location.path('/template/' + data.name);
                    }, function () {
                        self.error = true;
                        self.busy = false;
                    });
            };
        }
    ]);

}(window, window.upp));