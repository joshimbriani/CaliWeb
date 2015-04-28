(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('vacationDetailController', VacationDetailController);

	VacationDetailController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'$stateParams',
		'Vacation'
	];

	function VacationDetailController($scope, $rootScope, $state, $stateParams, Vacation) {
		$scope.vacation = Vacation.get({id: $stateParams.id});
	}
})();