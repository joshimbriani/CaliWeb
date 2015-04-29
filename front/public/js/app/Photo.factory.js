(function() {
"use strict";

  	angular
  		.module('caliweb')
  		.factory('Photo', photo);

  	photo.$inject = ['$resource'];

  	function photo($resource) {
		return $resource('/api/v1/photo/:id', {id: '@_id'}, {
		  update: {
		    method: 'PUT'
		  }
		});
	}

})();