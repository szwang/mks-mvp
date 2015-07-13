'use strict';

//**** main module ****//

var poliView = angular.module('poliView', []);

poliView.config(function($routeProvider) {
  $routeProvider
    .when('/' {
      templateUrl: 'views/home.html',
      controller: ''
    })
})

/**
 * @ngdoc overview
 * @name mvpApp
 * @description
 * # mvpApp
 *
 * Main module of the application.
 */
// angular
//   .module('mvpApp', [
//     'ngAnimate',
//     'ngCookies',
//     'ngMessages',
//     'ngResource',
//     'ngRoute',
//     'ngSanitize',
//     'ngTouch'
//   ])
//   .config(function ($routeProvider) {
//     $routeProvider
//       .when('/', {
//         templateUrl: 'views/main.html',
//         controller: 'MainCtrl',
//         controllerAs: 'main'
//       })
//       .when('/about', {
//         templateUrl: 'views/about.html',
//         controller: 'AboutCtrl',
//         controllerAs: 'about'
//       })
//       .otherwise({
//         redirectTo: '/'
//       });
//   });

