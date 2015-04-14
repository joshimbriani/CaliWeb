(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.controller('signupController', signupController);

	signupController.$inject = [
		'$scope',
		'$rootScope',
		'$window',
		'AuthService'
	];

	function signupController($scope, $rootScope, $window, AuthService) {
		$scope.username = '';
		$scope.email = '';
		$scope.password = '';

		$scope.user = {
			username: '',
			email: '',
			password: ''
		};

		$scope.sayHello = function() {
			console.log("hello");
		}
		
		$scope.createUser = function() {
			var user = {
				username: $scope.username,
				email: $scope.email,
				password: $scope.password
			};
			console.log("createUser called");
			AuthService.createUser(user).then(
				function(res) {
					if (!res.err) {
						AuthService.login(user);
						console.log("attempt to login");
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