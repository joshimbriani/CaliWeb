(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.factory('AuthService', AuthService);

	AuthService.$inject = [
		'$http',
		'$window',
		'$state',
		'Session',
		'User'
	];

	function AuthService($http, $window, $state, Session, User) {
		var authService = {};
 
	  	authService.login = function (credentials) {
		    return $http
		      .post('/login', credentials)
		      .then(function (res) {
		        Session.create(res.data);
		        $state.go('home');
		    });
		};
	 
	  	authService.isAuthenticated = function () {
	    	return !!Session.userId;
	  	};
	 
	  	authService.isAuthorized = function (authorizedRoles) {
	    	if (!angular.isArray(authorizedRoles)) {
	      		authorizedRoles = [authorizedRoles];
	    	}
	    	return (authService.isAuthenticated());
	  	};

	  	authService.createUser = function(user) {
			return User.save(user).$promise;
		}
	 
	  	return authService;
	}
})();