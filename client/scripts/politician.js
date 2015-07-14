
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

.controller('detailCtrl', function($scope, $routeParams, $sce, GetRequests) {
	$scope.data = {};
	$scope.clicked = {}; 
	$scope.terms = [];

	$scope.getTerms = function() {
		var obj = $scope.data.resultEntity.metadata;
		for (var key in obj) {
			if(typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
				var year = key;
				$scope.terms.push({key: obj[key], year: year});
			}
		}
	}


	$scope.init = function() {
		console.log('hi');
		GetRequests.setId($routeParams.entityId);
		console.log('setid run', $routeParams.entityId);
		GetRequests.getOverview(function(data) {
			// setID with object
			$scope.data.resultEntity = data;
			console.log(data);
			$scope.getTerms();
			console.log($scope.terms);
			$scope.bio = $sce.trustAsHtml($scope.data.resultEntity.metadata.bio);
		});
	}

})
	// when entering detail control, id is set