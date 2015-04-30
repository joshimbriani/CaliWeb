(function() {
"use strict";

  	angular
  		.module('caliweb.users')
  		.factory('Register', register);

  	register.$inject = ['$resource'];

  	function register($resource) {
		return $resource('/register', {id: '@_id'});
	}

})();