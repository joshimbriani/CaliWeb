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
		        Session.create(res.data.id, res.data.user.id, res.data.user.role);
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
	    	return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
	  	};

	  	authService.createUser = function(user) {
			return User.save(user).$promise;
		}
	 
	  	return authService;
	}
})();