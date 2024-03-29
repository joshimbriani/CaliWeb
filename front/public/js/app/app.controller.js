(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('appController', AppController);

	AppController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'AUTH_EVENTS',
		'AuthService', 
		'Session',
		'USER_ROLES'
	];

	function AppController($scope, $rootScope, $state, AUTH_EVENTS, AuthService, Session, USER_ROLES) {
		$scope.currentUser = null;
		$scope.userRoles = USER_ROLES;
		$scope.isAuthorized = AuthService.isAuthorized;
		$scope.isAuthenticated = AuthService.isAuthenticated;
		$scope.registerClicked = registerClicked;
		$scope.login = login;

		$scope.setCurrentUser = function (user) {
			$scope.currentUser = user;
		};

		$scope.credentials = {
		    email: '',
		    password: ''
		};

	  	function login(credentials) {
		    AuthService.login(credentials).then(function (user) {
		      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		      $scope.setCurrentUser(user);
		      $scope.credentials = {
		      	email: '', 
		      	password: ''
		      };
		      $state.go('home');
		    }, function (error) {
		    	if(error.status == 401) {
		    		alert('Incorrect email or password. Please try again.');
			    	$scope.credentials = {
			    		email: '',
			    		password: ''
			    	};
			    }
			    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		    })
		};

		function registerClicked() {
			$state.go('signup');
		};

	}
})();