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
		this.create = function (sessionId, userId, userRole) {
    		this.id = sessionId;
		    this.userId = userId;
		    this.userRole = userRole;
		};
		this.destroy = function () {
		    this.id = null;
		    this.userId = null;
		    this.userRole = null;
		};
	}
})();