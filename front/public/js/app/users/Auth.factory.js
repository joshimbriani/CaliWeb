(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.factory('AuthService', AuthService);

	AuthService.$inject = [
		'$http',
		'$window',
		'$state',
		'$cookieStore',
		'Session',
		'User'
	];

	function AuthService($http, $window, $state, $cookieStore, Session, User) {
		var authService = {};
 
	  	authService.login = function (credentials) {
		    return $http
		      .post('/login', credentials)
		      .then(function (res) {
		        Session.create(res.data._id);
		        $state.go('home');
		    });
		};

		authService.logout = function() {
			Session.destroy();
			return this;
		};
	 
	  	authService.isAuthenticated = function () {
	  		if($cookieStore.get('loggedin') == 'true')
	  			return true;
	  		else	
	  			return false;
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