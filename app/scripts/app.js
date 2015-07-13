'use strict';

//**** main module ****//

var poliView = angular.module('poliView', []);

poliView.config(function($routeProvider) {
  $routeProvider
    .when('/' {
      templateUrl: '../views/home.html',
      controller: ''
    })
})

var Influence = require('influence');
var influence = new Influence(apiKey);
console.log('test');
influence.entityOverview('97737bb56b6a4211bcc57a837368b1a4', null, function(err, json) {
  if (err) throw err;
  console.log(json);
});

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

