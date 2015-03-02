(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.controller('signupController', signupController);

	signupController.$inject = [
		'$scope',
		'$rootScope',
		'$window'
	];

	function signupController($scope, $rootScope, $window) {
		$scope.email = '';
		$scope.password = '';

		$scope.user = {
			email: '',
			password: ''
		};
		
		$scope.createUser = function() {

		}
	}
})();	