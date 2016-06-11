'use strict';
(function (angular) {
	function EditPublicationController($scope, $routeParams, $location, publicationData, logger) {
        $scope.formDisabled = true;

		publicationData.getPublication($routeParams.id, function success(response) {
			$scope.data = response;
            $scope.formDisabled = false;
		});

		$scope.save = function () {
            $scope.formDisabled = true;

            publicationData.updatePublication($routeParams.id, $scope.data,
                function success(response) {
                    $location.path("/");
                },
                function error(response) {
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
