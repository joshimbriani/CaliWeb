(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('newVacationFormController', NewVacationFormController);

	NewVacationFormController.$inject = [
		'$scope',
		'$rootScope',
		'$state'
	];

	function NewVacationFormController($scope, $rootScope, $state) {
		$scope.createVacation = createVacation;

		function createVacation (vacation) {
			console.log(vacation);
			$state.go("vacations");
		};
	}
})();