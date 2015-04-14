(function() {
	'use strict';

	angular
		.module('caliweb.users')
		.service('Session', Session);

	Session.$inject = [
	'$http',
	'User'
	];

	function Session($http, User) {
		this.create = function (userId) {
		    this.userId = userId;
		};
		this.destroy = function () {
		    this.userId = null;
		};
	}
})();