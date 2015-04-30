(function() {
"use strict";

  	angular
  		.module('caliweb.users')
  		.factory('User', user);

  	user.$inject = ['$resource'];

  	function user($resource) {
		return $resource('/api/v1/user/:id', {id: '@_id'}, {
		  update: {
		    method: 'PUT'
		  }
		});
	}

})();