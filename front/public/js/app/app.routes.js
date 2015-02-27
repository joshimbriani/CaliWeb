(function() {
  "use strict";

  angular
    .module('caliweb')
    .config(CaliRoutes);

  CaliRoutes.$inject = [
    '$stateProvider', 
    '$urlRouterProvider', 
    '$locationProvider',
  ];

  function CaliRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        controller: 'homeController',
        templateUrl: 'partials/home.html',
        data: {
          requireLogin: true
        }
      })
      .state('home', {
        url: '/home',
        controller: 'homeController',
        templateUrl: 'partials/home.html',
        data: {
          requireLogin: true
        }
      });

      $locationProvider.html5Mode(true);
  }

})();