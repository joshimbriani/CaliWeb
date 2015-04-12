(function() {
"use strict";

  	angular
  		.module('caliweb.users')
  		.factory('User', user);

  	user.$inject = ['$resource'];

  	function user($resource) {
		return $resource('/register', {id: '@_id'});
	}

})();