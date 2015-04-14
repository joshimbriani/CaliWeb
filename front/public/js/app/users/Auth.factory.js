(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.factory('AuthService', AuthService);

	AuthService.$inject = [
		'$http',
		'$window',
		'Session',
		'User'
	];

	function AuthService($http, $window, Session, User) {
		var authService = {};
 
	  	authService.login = function (credentials) {
	  		console.log(credentials);
		    return $http
		      .post('/login', credentials)
		      .then(function (res) {
		      	console.log("attemp to create session");
		      	console.log(res);
		        Session.create(res.data.user.id);
		        return res.data.user;
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