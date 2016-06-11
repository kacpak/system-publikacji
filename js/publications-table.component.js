'use strict';
(function (angular) {
	function PublicationsTableController(publicationsData) {
		var ctrl = this;

		ctrl.data = publicationsData.getData();
	}

	angular.module('app').component('publicationsTable', {
		templateUrl: '/partials/publications-table.component.html',
		controller: PublicationsTableController
	});

})(window.angular);
