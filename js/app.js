'use strict';
(function (angular) {
    angular.module('app', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/templates/publications.html',
                controller: 'PublicationListController'
            });
            $routeProvider.when('/add', {
                templateUrl: '/templates/edit-publication.html',
                controller: 'AddPublicationController'
            });
            $routeProvider.when('/edit/:id', {
                templateUrl: '/templates/edit-publication.html',
                controller: 'EditPublicationController'
            });
            $routeProvider.when('/delete/:id', {
                templateUrl: '/templates/delete-publication.html',
                controller: 'DeletePublicationController'
            });
            $routeProvider.otherwise({redirectTo: '/'});
        })
        .controller('PageController', function ($scope, $location) {
            $scope.home = function() {
                $location.path("/");
            };
        });
})(window.angular);
