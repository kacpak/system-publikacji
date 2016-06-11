'use strict';
(function (angular) {
    function DeletePublicationController($scope, $routeParams, $location, publicationData) {
        $scope.formDisabled = true;

        publicationData.getPublication($routeParams.id, function success(response) {
            $scope.data = response;
            $scope.formDisabled = false;
        });

        $scope.delete = function () {
            $scope.formDisabled = true;
            publicationData.deletePublication($routeParams.id, $scope.data._rev,
                function success() {
                    $location.path("/");
                }, function error() {
                    $scope.formDisabled = false;
                }
            );
        };

        $scope.discard = function () {
            $location.path("/");
        }
    }

    angular.module('app').controller('DeletePublicationController', DeletePublicationController);
})(window.angular);
