(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('vacationsController', VacationsController);

	VacationsController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'Vacation'
	];

	function VacationsController($scope, $rootScope, $state, Vacation) {
		$scope.vacations = [];

		$scope.refresh = refresh;
		$scope.remove = remove;
		$scope.view = view;

		function refresh() {
			$scope.vacations = Vacation.query();
		};

		function remove(vacation) {
			Vacation.remove({id: vacation._id}, null, $scope.refresh);
		};

		function view(vacation) {
			$rootScope.vacationDetailId = vacation._id;
			$state.go('vacationDetail', {id: vacation._id});
		};

		$scope.refresh();
	}
})();