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

		$scope.view = view;
		$scope.refresh = refresh;

		function view(vacation) {
			$state.go('vacationDetail', {id: vacation._id});
		};

		function refresh() {
			$scope.publicVacations = Vacation.query();
		};

		$scope.refresh();
	}
})();