(function() {
  "use strict";

  angular
    .module('caliweb')
    .config(CaliRoutes);

  CaliRoutes.$inject = [
    '$stateProvider', 
    '$urlRouterProvider', 
    '$locationProvider'
  ];

  function CaliRoutes ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('index', {
        url: '/',
        controller: 'homeController',
        templateUrl: 'partials/home.html',
        data: {
          requireLogin: false
        }
      })
      .state('home', {
        url: '/home',
        controller: 'homeController',
        templateUrl: 'partials/home.html',
        data: {
          requireLogin: false
        }
      })
      .state('vacations', {
        url: '/vacations',
        controller: 'vacationsController',
        templateUrl: 'partials/vacations.html',
        data: {
          requireLogin: true
        }
      })
      .state('vacationDetail', {
        url: '/vacations/:id',
        controller: 'vacationDetailController',
        templateUrl: 'partials/vacationDetail.html',
        data: {
          requireLogin: true
        }
      })
      .state('newVacationForm', {
        url: '/newVacationForm',
        controller: 'newVacationFormController',
        templateUrl: 'partials/newVacationForm.html',
        data: {
          requireLogin: true
        }
      });

      $locationProvider.html5Mode(true);
  }

})();