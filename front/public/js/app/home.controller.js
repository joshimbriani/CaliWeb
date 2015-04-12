(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('homeController', HomeController);

	HomeController.$inject = [
		'$scope',
		'$rootScope',
		'$state'
	];

	function HomeController($scope, $rootScope, $state) {
		
	}
})();