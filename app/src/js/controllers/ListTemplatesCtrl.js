(function (window, upp) {
    'use strict';

    upp.controller('ListTemplatesCtrl', ['templateService', '$routeParams',
        function (templateService, $routeParams) {
            this.loading = true;
            this.templates = [];
            this.page = $routeParams.page || 1;

            /**
             * Load the page
             */
            var loadPage = function () {
                templateService.list(this.page).then(function (data) {
                    this.loading = false;
                    this.templates = data.templates;
                    this.hasNextPage = data.next;
                    this.hasPrevPage = data.prev;
                }.bind(this));
            }.bind(this);

            loadPage();

            /**
             * Changes the current active page and loads the corresponding templates
             * @param {Number} page Page number
             */
            this.changePage = function (page) {
                this.page = page;
                loadPage();
            };
        }
    ]);

}(window, window.upp));