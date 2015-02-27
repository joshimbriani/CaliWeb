(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.controller('loginController', LoginController);

	LoginController.$inject = [
		'$scope',
		'$rootScope',
		'$window'
	];

	function LoginController($scope, $rootScope, $window) {
		$scope.email = '';
		$scope.password = '';
		$scope.login = function() {

		}
	}
})();