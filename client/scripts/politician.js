
angular.module('politicians', [])

.controller('politicianCtrl', function($scope, GetRequests) {
	$scope.name = '';

	$scope.query = '';

	$scope.data = {};

	// user enters name, show list of possible people/orgs
	$scope.searchEntity = function() {
		console.log($scope.query);
		GetRequests.setPol($scope.query);
		var data = GetRequests.getList();
		// .then(function(data){
		// 	$scope.data.result = data;
		// 	console.log($scope.data.result);
		// })
	}

	// user clicks on a thing, show entity overview
})