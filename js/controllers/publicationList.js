'use strict';
(function (angular) {
	function PublicationListController($scope, publicationData) {
		$scope.sortType = 'title';
		$scope.sortReverse = false;
		publicationData.getPublications(function success(data) {
			$scope.data = data;
		});
	}

	angular.module('app').controller('PublicationListController', PublicationListController);
})(window.angular);
