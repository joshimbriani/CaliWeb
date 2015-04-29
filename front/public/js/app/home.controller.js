(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('homeController', HomeController);

	HomeController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'AuthService',
		'Session',
		'Vacation'
	];

	function HomeController($scope, $rootScope, $state, AuthService, Session, Vacation) {
		$scope.publicVacations = [];

		$scope.refresh = refresh;

		function refresh() {
			$scope.publicVacations = Vacation.query();
		};

		$scope.refresh();
	}
})();