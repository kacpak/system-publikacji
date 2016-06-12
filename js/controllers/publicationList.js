'use strict';
(function (angular) {
    function PublicationListController($scope, publicationData) {
        $scope.sortType = 'title';
        $scope.sortReverse = false;
        $scope.resfreshInProgress = false;

        $scope.refresh = function () {
            $scope.resfreshInProgress = true;
            publicationData.getPublications(function success(data) {
                $scope.data = data;
                $scope.resfreshInProgress = false;
            }, function error() {
                $scope.resfreshInProgress = false;
            });
        }

        $scope.refresh();
    }

    angular.module('app').controller('PublicationListController', PublicationListController);
})(window.angular);
