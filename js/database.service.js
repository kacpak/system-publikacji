'use strict';
(function (angular) {
    angular.module('app').factory('publicationsData', function () {
        return {
            getData: function() {
                return [
                    {
                        author: 'Mateusz Kasprzak',
                        title: 'CMS w AngularJS',
                        year: 2016,
                        print: 'SGGW'
                    },
                    {
                        author: 'Paulina Kasprzak',
                        title: 'Kosmetyki 2016',
                        year: 2016,
                        print: 'self-published'
                    }
                ];
            }
        };
    });
})(window.angular);