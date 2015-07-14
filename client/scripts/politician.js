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

	$scope.displayOrgs = function() {
		// get name and total amout from orgs
		// $scope.data.contribOrgs[0].name/ $scope.data.contribOrgs[0].total_amount
		// show rank, with name and bar chart of amount of money donated
	}
})

.directive('barChart', function($window) {
	return {
		restrict: 'EA',
		templateUrl:'',
		// template: '<svg width="850" height="200"></svg>',
		link: function(scope, elem, attrs) {
			scope.$watch('data.contribOrgs', function(orgs) {
				var names = [];
				var amounts = [];
				for(var i=0; i<orgs.length; i++) {
					names.push(orgs[i].name);
					amounts.push(orgs[i].total_amount);
				}
				var d3 = $window.d3;
				var colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf','#0066AE','#074285','#00187B','#285964','#405F83','#416545','#4D7069','#6E9985','#7EBC89','#0283AF','#79BCBF','#99C19E'];
				var grid = d3.range(50).map(function(i) {
					return {'x1':0, 'y1':0, 'x2':0, 'y2':900};
				});

				var tickVals = grid.map(function(d,i) {
					if(i>0) {
						return i*50;
					} else if (i === 0) {
						return "100";
					}
				})

				var xscale = d3.scale.linear()
					.domain([10, 250])
					.range([0, 722]);
				var yscale = d3.scale.linear()
					.domain([0, orgs.length])
					.range([0,480]);
				var colorScale = d3.scale.quantize()
					.domain([0, orgs.length])
					.range(colors);

				var canvas = d3.select('#wrapper')
					.append('svg')
					.attr({'width':900, 'height':500});
				
				var grids = canvas.append('g')
					.attr('id', 'grid')
					.attr('transform', 'translate(150,10)')
					.selectAll('line')
					.data(grid)
					.enter()
					.append('line')
					.attr({
					    'x1': function(d,i){ 
							return i*25; 
					},
						'y1':function(d){ 
							return d.y1; 
						},
						'x2':function(d,i){ 
							return i*25; 
						},
						'y2':function(d){ 
							return d.y2; 
						},
					})
					.style({'stroke':'#adadad','stroke-width':'1px'});
		
				var	xAxis = d3.svg.axis();
					xAxis
					.orient('bottom')
					.scale(xscale)
					.tickValues(tickVals);

				var	yAxis = d3.svg.axis();
					yAxis
					.orient('left')
					.scale(yscale)
					.tickSize(2)
					.tickFormat(function(d,i){ return names[i]; })
					.tickValues(d3.range(17));

				var y_xis = canvas.append('g')
					.attr("transform", "translate(150,0)")
					.attr('id','yaxis')
					.call(yAxis);

				var x_xis = canvas.append('g')
				    .attr("transform", "translate(150,480)")
				    .attr('id','xaxis')
				    .call(xAxis);

				var chart = canvas.append('g')
					.attr("transform", "translate(150,0)")
					.attr('id','bars')
					.selectAll('rect')
					.data(names)
					.enter()
					.append('rect')
					.attr('height',25)
					.attr({'x':0,'y':function(d,i){ return yscale(i)+19; }})
					.style('fill',function(d,i){ return colorScale(i); })
					.attr('width',function(d){ return 0; });


				var transit = d3.select("svg").selectAll("rect")
				    .data(amounts)
				    .transition()
				    .duration(1000) 
				    .attr("width", function(d) {return xscale(d); });

				var transitext = d3.select('#bars')
					.selectAll('text')
					.data(amounts)
					.enter()
					.append('text');
					// .attr({'x':function(d) {return xscale(d)-200; },'y':function(d,i){ return yscale(i)+35; }})
					// .text(function(d){ return d+"$"; }).style({'fill':'#fff','font-size':'14px'});

					console.log('d3 running');
			})		
		}
	}
});