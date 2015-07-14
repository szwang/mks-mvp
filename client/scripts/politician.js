
angular.module('politicians', [])

.controller('politicianCtrl', function($scope, GetRequests) {
	$scope.name = '';
	$scope.query = '';
	$scope.data = {};

	// user enters name, show list of possible people/orgs
	$scope.searchEntity = function() {
		GetRequests.setPol($scope.query);
		GetRequests.getList(function(data) {
			$scope.data.resultList = data;
		});
	}
})

.controller('detailCtrl', function($scope, GetRequests) {
	$scope.data = {};
	$scope.clicked = {}; // set when user clicks on id
	
	// user clicks on a thing, show entity overview
	$scope.getOverview = function() {
		// setID with object
		GetRequests.setId($scope.clicked);
		GetRequests.getOverview(function(data) {
			$scope.data.resultEntity = data;
		});
	}
})