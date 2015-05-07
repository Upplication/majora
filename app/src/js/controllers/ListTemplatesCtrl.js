(function (window, upp) {
    'use strict';

    upp.controller('UploadTemplateCtrl', ['templateService', '$routeParams',
        function (templateService, $routeParams) {
            this.loading = true;

            templateService.list($routeParams.page || 1).then(function (templates) {
                // TODO: Next page
                // TODO: Pagination
                this.loading = false;
                this.templates = templates;
            }.bind(this));
        }
    ]);

}(window, window.upp));