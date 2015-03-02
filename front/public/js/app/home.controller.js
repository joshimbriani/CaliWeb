(function() {
	'use strict';

	angular
		.module('caliweb')
		.controller('homeController', HomeController);

	HomeController.$inject = [
		'$scope',
		'$rootScope'
	];

	function HomeController($scope, $rootScope) {

	}
})();