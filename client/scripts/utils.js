'use strict';

angular.module('sunlightAccess', [])


.factory('GetRequests', function($http) {
	var service = {};
	var _politician = '';
	var id = '';
	var apiKey = 'apikey=28cc82e5bb4a4553a5fc352e09853270'
	var baseUrl = 'http://transparencydata.com/api/1.0/';

	// get id by politician name
	// this service runs when user enters something into the field
	service.setPol = function(politician) {
		_politician = politician.split(' ').join('%20');
	}

	// get id 
	// this service runs when user hits search
	// returns list of politicians
	service.getList = function() {
		var url = baseUrl + "entities.json?search=" + _politician + '&' + apiKey;
		$http({
			method: 'GET',
			url: url
		}).success(function(data) {
			console.log(data);
		}).error(function(error) {
			console.log(error);
		})
	}

	// this service runs when user clicks on a rendered politician
	service.getOverview = function() {
		var url = baseUrl + 'entities/' + id + '.json?' + apiKey;
		
		$http({
			method: 'GET',
			url: url,
		})
	}

	return service;
})

.factory('getOverview', function() {


})

.factory('getTopPols', function() {

})

.factory('getTopOrgs', function() {

})