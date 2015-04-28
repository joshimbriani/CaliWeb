(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('vacationDetailController', VacationDetailController);

	VacationDetailController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'Vacation'
	];

	function VacationDetailController($scope, $rootScope, $state, Vacation) {
		$scope.vacation = Vacation.get({id: $rootScope.vacationDetailId});
	}
})();