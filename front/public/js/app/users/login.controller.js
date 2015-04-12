(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.controller('loginController', LoginController);

	LoginController.$inject = [
		'$scope',
		'$rootScope',
		'AUTH_EVENTS',
		'AuthService',
		'$window'
	];

	function LoginController($scope, $rootScope, AUTH_EVENTS, AuthService, $window) {
		$scope.credentials = {
		    email: '',
		    password: ''
		};
	  	$scope.login = function (credentials) {
		    AuthService.login(credentials).then(function (user) {
		      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		      $scope.setCurrentUser(user);
		    }, function () {
		      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		    })};
	  	};
})();