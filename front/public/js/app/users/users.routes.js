
(function () {
  "use strict";

  angular
    .module('caliweb.users')
    .config(UsersRoutes);

  UsersRoutes.$inject = [
    '$stateProvider', 
    '$urlRouterProvider', 
    '$locationProvider'
  ];

  function UsersRoutes($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('signup', {
        url: '/signup',
        controller: 'signupController',
        templateUrl: 'partials/users/signup.html',
        data: {
          requireLogin: false
        }
      })
      .state('logout', {
        url: '/logout',
        controller: 'logoutController',
        templateUrl: 'partials/users/logout.html',
        data: {
          requireLogin: true
        }
      });

      $locationProvider.html5Mode(true);
  }

})();