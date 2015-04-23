(function (window, upp) {
    'use strict';

    upp.directive('fileUpload', function () {
        return {
            scope: true,
            restrict: 'A',
            link: {
                post: function (scope, elem, attrs) {
                    elem.bind('change', function (e) {
                        var files = e.target.files;

                        angular.forEach(files, function (file) {
                            scope.$emit('fileSelected:' + attrs['fileUpload'], {
                                file: file
                            });
                        });
                    });
                }
            }
        };
    });

}(window, window.upp));