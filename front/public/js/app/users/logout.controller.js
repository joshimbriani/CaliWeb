(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.controller('logoutController', LogoutController);

	LogoutController.$inject = [
		'$scope',
		'$rootScope',
		'$window'
	];

	function LogoutController($scope, $rootScope, $window) {
		$scope.logout = function() {

		};
	}
})();