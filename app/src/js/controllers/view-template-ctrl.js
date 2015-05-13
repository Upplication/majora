(function (window, upp) {
    'use strict';

    upp.controller('ViewTemplateCtrl', ['templateService', '$routeParams',
        function (templateService, $routeParams) {
            this.loading = true;

            if (!$routeParams.name) {
                this.error = true;
            }

            if (!this.error) {
                templateService.get($routeParams.name).then(function (data) {
                    this.data = data;
                    this.loading = false;
                }.bind(this), function () {
                    this.error = true;
                }.bind(this));
            }
        }
    ]);

}(window, window.upp));