// 'use strict';

//**** main module ****//

angular.module('poliView', [
  'ngRoute',
  'politicians',
  'sunlightAccess',
  'ranks'
])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'index.html',
      controller: 'politicianCtrl'
    })
    .when('/top', {
    	templateUrl: 'views/ranks.html',
    	controller: 'rankCtrl'
    })
    .otherwise({
    	redirectTo: '/'
    })
})