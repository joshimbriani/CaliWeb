(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('homeController', HomeController);

	HomeController.$inject = [
		'$scope',
		'$rootScope',
		'$state',
		'AuthService',
		'Session'
	];

	function HomeController($scope, $rootScope, $state, AuthService, Session) {
		
	}
})();