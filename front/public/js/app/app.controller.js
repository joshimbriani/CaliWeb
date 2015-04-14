(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('appController', AppController);

	AppController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'AuthService', 
		'Session',
		'USER_ROLES'
	];

	function AppController($scope, $rootScope, $state, AuthService, Session, USER_ROLES) {
		$scope.currentUser = null;
		$scope.userRoles = USER_ROLES;
		$scope.isAuthorized = AuthService.isAuthorized;
		$scope.isAuthenticated = AuthService.isAuthenticated;
		$scope.registerClicked = registerClicked;
		 
		$scope.setCurrentUser = function (user) {
			$scope.currentUser = user;
		};

		function registerClicked() {
			$state.go('signup');
		};
	}
})();