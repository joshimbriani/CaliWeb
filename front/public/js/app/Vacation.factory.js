(function() {
"use strict";

  	angular
  		.module('caliweb')
  		.factory('Vacation', vacation);

  	vacation.$inject = ['$resource'];

  	function vacation($resource) {
		return $resource('/api/v1/vacation', {id: '@_id'});
	}

})();