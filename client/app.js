// 'use strict';

//**** main module ****//

angular.module('poliView', [
  'ngRoute',
  'politicians',
  'sunlightAccess'
])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/politician.html',
      controller: 'politicianCtrl'
    })
    .when('/top', {
    	templateUrl: 'views/ranks.html',
    	controller: 'ranksCtrl'
    })
    .when('/entity/:entityId', {
      templateUrl: 'views/details.html',
      controller: 'detailCtrl'
    })
    .otherwise({
    	redirectTo: '/'
    })
})

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);