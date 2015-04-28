(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('newVacationFormController', NewVacationFormController);

	NewVacationFormController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'Vacation'
	];

	function NewVacationFormController($scope, $rootScope, $state, Vacation) {
		$scope.createVacation = createVacation;

		function createVacation (vacation) {
			Vacation.save(null, vacation, function() {
				$state.go("vacations");
			});
		};
	}
})();