(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.service('Session', Session);

	Session.$inject = [
	'$http',
	'$cookieStore',
	'User'
	];

	function Session($http, $cookieStore, User) {
		this.create = function (userId) {
		    this.userId = userId;
		    $cookieStore.put('loggedin', 'true');
		    $cookieStore.put('userId', userId);
		};

		this.destroy = function () {
		    this.userId = null;
		    $cookieStore.put('loggedin', 'false');
		    $cookieStore.put('userId', '');
		};
	}
})();