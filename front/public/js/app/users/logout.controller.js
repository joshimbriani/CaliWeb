(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.controller('logoutController', LogoutController);

	LogoutController.$inject = [
		'$scope',
		'$rootScope',
		'$window',
		'$state',
		'AUTH_EVENTS',
		'AuthService'
	];

	function LogoutController($scope, $rootScope, $window, $state, AUTH_EVENTS, AuthService) {
		$scope.logout = function() {
			AuthService.logout();
			$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
			$state.go('home');
		};

		$scope.logout();
	}
})();