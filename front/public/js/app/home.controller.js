(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('homeController', HomeController);

	HomeController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'$http',
		'AuthService',
		'Session',
		'Vacation',
		'User'
	];

	function HomeController($scope, $rootScope, $state, $http, AuthService, Session, Vacation, User) {
		$scope.publicVacations = [];

		$scope.view = view;
		$scope.refresh = refresh;

		function view(vacation) {
			$state.go('vacationDetail', {id: vacation._id});
		};

		function refresh() {
			$http.get('/api/v1/vacation/').success(function(data, status) {
		    	$scope.publicVacations = data;
		    	for (var i = 0; i < $scope.publicVacations.length; i++) {
		    		$scope.publicVacations[i].users = $scope.publicVacations[i].users.map(function(userId) {
		    			return User.get({id: userId}, function(data, status) {
		    				return data;
		    			});
		    		})
		    	}
		    }).error(function(data, status){
		    	console.log(data);
		    });
		};

		$scope.refresh();
	}
})();