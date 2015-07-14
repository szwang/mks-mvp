
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

.controller('detailCtrl', function($scope, $routeParams, GetRequests) {
	$scope.data = {};
	$scope.clicked = {}; 
	$scope.init = function() {
		console.log('hi');
		GetRequests.setId($routeParams.entityId);
		console.log('setid run', $routeParams.entityId);
		GetRequests.getOverview(function(data) {
			// setID with object
			$scope.data.resultEntity = data;
			console.log(data);
		});
	}
})
	// when entering detail control, id is set