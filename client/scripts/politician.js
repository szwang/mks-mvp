
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
		GetRequests.setId($routeParams.entityId);
		GetRequests.getOverview(function(data) {
			// setID with object
			$scope.data.resultEntity = data;
			$scope.getTerms();
			$scope.bio = $sce.trustAsHtml($scope.data.resultEntity.metadata.bio);
		});
		GetRequests.getTopOrgs(function(data) {
			$scope.data.contribOrgs = data;
			console.log($scope.data.contribOrgs);
		})
	}

})
	// when entering detail control, id is set