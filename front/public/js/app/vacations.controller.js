(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('vacationsController', VacationsController);

	VacationsController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'$http',
		'$cookieStore',
		'Vacation'
	];

	function VacationsController($scope, $rootScope, $state, $http, $cookieStore, Vacation) {
		$scope.vacations = [];

		$scope.refresh = refresh;
		$scope.remove = remove;
		$scope.view = view;
		$scope.newVacationClicked = newVacationClicked;

		function refresh() {
			$http.get('/api/v1/vacation/byuser/' + $cookieStore.get('userId')).then(
				function(response) {
					$scope.vacations = response.data;
				}, function(error) {
					console.log(error);
			});
		};

		function remove(vacation) {
			Vacation.remove({id: vacation._id}, null, $scope.refresh);
		};

		function view(vacation) {
			$state.go('vacationDetail', {id: vacation._id});
		};

		function newVacationClicked() {
			$state.go('newVacationForm');
		};

		$scope.refresh();
	}
})();