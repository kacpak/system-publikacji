'use strict';
(function (angular) {
    function EditPublicationController($scope, $routeParams, $location, publicationData) {
        $scope.formDisabled = true;

        publicationData.getPublication($routeParams.id, function success(response) {
            $scope.data = response;
            $scope.formDisabled = false;
        });

        $scope.save = function () {
            $scope.formDisabled = true;

            publicationData.updatePublication($routeParams.id, $scope.data,
                function success() {
                    $location.path("/");
                },
                function error() {
                    $scope.formDisabled = false;
                }
            );
        };

        $scope.discard = function () {
            $location.path("/");
        }
    }

    angular.module('app').controller('EditPublicationController', EditPublicationController);
})(window.angular);
