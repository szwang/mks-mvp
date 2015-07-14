'use strict';

//**** main module ****//

angular.module('poliView', [
  'ngRoute',
  'politicianCtrl',
  'rankCtrl'
  ])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'politicianCtrl'
    }),
    .when('/top', {
    	templateUrl: 'views/ranks.html',
    	controller: 'rankCtrl'
    }),
    .otherwise({
    	redirectTo: '/'
    })
})

.