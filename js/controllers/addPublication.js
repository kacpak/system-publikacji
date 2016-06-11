'use strict';
(function (angular) {
    function AddPublicationController($scope, $location, publicationData) {

        $scope.data = {};

        $scope.save = function () {
            $scope.formDisabled = true;
            publicationData.addPublication($scope.data,
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

    angular.module('app').controller('AddPublicationController', AddPublicationController);
})(window.angular);
