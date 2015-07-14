
angular.module('politicians', [])

.controller('politicianCtrl', function($scope, GetRequests) {
	$scope.name = 'Hillary Clinton';
	$scope.updatePolitician = function() {
		GetRequests.setPol()
	}
})