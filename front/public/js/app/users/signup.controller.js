(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.controller('signupController', signupController);

	signupController.$inject = [
		'$scope',
		'$rootScope',
		'$window',
		'$state',
		'AuthService'
	];

	function signupController($scope, $rootScope, $window, $state, AuthService) {
		$scope.username = '';
		$scope.email = '';
		$scope.password = '';

		$scope.user = {
			username: '',
			email: '',
			password: ''
		};
		
		$scope.createUser = function() {
			var user = {
				username: $scope.username,
				email: $scope.email,
				password: $scope.password
			};
			AuthService.createUser(user).then(
				function(res) {
					if (!res.err) {
						AuthService.login(user);
						$state.go('home');
					}
					else $scope.message = "Email already in use.";
				},
				function(res) {
					$scope.message = "Email already in use.";
				}
			);
		}
	}
})();	