
angular.module('politicians', [])

.controller('politicianCtrl', function($scope, GetRequests) {
	$scope.name = '';

	$scope.query = '';

	$scope.data = {};

	$scope.clicked = {}; // set when user clicks on id

	// user enters name, show list of possible people/orgs
	$scope.searchEntity = function() {
		console.log($scope.query);
		GetRequests.setPol($scope.query);
		GetRequests.getList(function(data) {
			$scope.data.resultList = data;
		});
	}

	$scope.getOverview = function() {
		
	}

	// user clicks on a thing, show entity overview
})