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
				console.log(orgs);
				var names = [];
				var amounts = [];
				for(var i=0; i<orgs.length; i++) {
					names.push(orgs[i].name);
					amounts.push(orgs[i].total_amount);
				}
				var d3 = $window.d3;
				var colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf','#0066AE','#074285','#00187B','#285964','#405F83','#416545','#4D7069','#6E9985','#7EBC89','#0283AF','#79BCBF','#99C19E'];
				var grid = d3.range(20).map(function(i) {
					return {'x1':0, 'y1':0, 'x2':0, 'y2':480};
				});

				var tickVals = grid.map(function(d,i) {
					if(i>0) {
						return i*10;
					} else if (i===0) {
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
							return i*30; 
					},
						'y1':function(d){ 
							return d.y1; 
						},
						'x2':function(d,i){ 
							return i*30; 
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
							.attr('height',19)
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
							.append('text')
							.attr({'x':function(d) {return xscale(d)-200; },'y':function(d,i){ return yscale(i)+35; }})
							.text(function(d){ return d+"$"; }).style({'fill':'#fff','font-size':'14px'});

			console.log('d3 running');
			})		
		}
	}
});
// 				console.log(orgs);
// 			})
// 			// var orgs = scope.data.contribOrgs;
// 			// if(orgs === undefined) {
// 			// 	return;
// 			// }
// 			// console.log(scope.data);
// })

// .directive('linearChart', function($window){
//    return{
//       restrict:'EA',
//       template:"<svg width='850' height='200'></svg>",
//        link: function(scope, elem, attrs){
//            var salesDataToPlot=scope.data.contribOrgs;
//            var padding = 20;
//            var pathClass="path";
//            var xScale, yScale, xAxisGen, yAxisGen, lineFun;

//            var d3 = $window.d3;
//            var rawSvg=elem.find('svg');
//            var svg = d3.select(rawSvg[0]);

//            function setChartParameters(){

//                xScale = d3.scale.linear()
//                    .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length-1].hour])
//                    .range([padding + 5, rawSvg.attr("width") - padding]);

//                yScale = d3.scale.linear()
//                    .domain([0, d3.max(salesDataToPlot, function (d) {
//                        return d.sales;
//                    })])
//                    .range([rawSvg.attr("height") - padding, 0]);

//                xAxisGen = d3.svg.axis()
//                    .scale(xScale)
//                    .orient("bottom")
//                    .ticks(salesDataToPlot.length - 1);

//                yAxisGen = d3.svg.axis()
//                    .scale(yScale)
//                    .orient("left")
//                    .ticks(5);

//                lineFun = d3.svg.line()
//                    .x(function (d) {
//                        return xScale(d.hour);
//                    })
//                    .y(function (d) {
//                        return yScale(d.sales);
//                    })
//                    .interpolate("basis");
//            }
         
//          function drawLineChart() {

//                setChartParameters();

//                svg.append("svg:g")
//                    .attr("class", "x axis")
//                    .attr("transform", "translate(0,180)")
//                    .call(xAxisGen);

//                svg.append("svg:g")
//                    .attr("class", "y axis")
//                    .attr("transform", "translate(20,0)")
//                    .call(yAxisGen);

//                svg.append("svg:path")
//                    .attr({
//                        d: lineFun(salesDataToPlot),
//                        "stroke": "blue",
//                        "stroke-width": 2,
//                        "fill": "none",
//                        "class": pathClass
//                    });
//            }

//            drawLineChart();
//        }
//    };
// });
// })

// ar salesDataToPlot=scope[attrs.chartData];
//            var padding = 20;
//            var pathClass="path";
//            var xScale, yScale, xAxisGen, yAxisGen, lineFun;

//            var d3 = $window.d3;
//            var rawSvg=elem.find('svg');
//            var svg = d3.select(rawSvg[0]);

//            function setChartParameters(){

//                xScale = d3.scale.linear()
//                    .domain([salesDataToPlot[0].hour, salesDataToPlot[salesDataToPlot.length-1].hour])
//                    .range([padding + 5, rawSvg.attr("width") - padding]);

//                yScale = d3.scale.linear()
//                    .domain([0, d3.max(salesDataToPlot, function (d) {
//                        return d.sales;
//                    })])
//                    .range([rawSvg.attr("height") - padding, 0]);

//                xAxisGen = d3.svg.axis()
//                    .scale(xScale)
//                    .orient("bottom")
//                    .ticks(salesDataToPlot.length - 1);

//                yAxisGen = d3.svg.axis()
//                    .scale(yScale)
//                    .orient("left")
//                    .ticks(5);

//                lineFun = d3.svg.line()
//                    .x(function (d) {
//                        return xScale(d.hour);
//                    })
//                    .y(function (d) {
//                        return yScale(d.sales);
//                    })
//                    .interpolate("basis");
//            }
         
//          function drawLineChart() {

//                setChartParameters();

//                svg.append("svg:g")
//                    .attr("class", "x axis")
//                    .attr("transform", "translate(0,180)")
//                    .call(xAxisGen);

//                svg.append("svg:g")
//                    .attr("class", "y axis")
//                    .attr("transform", "translate(20,0)")
//                    .call(yAxisGen);

//                svg.append("svg:path")
//                    .attr({
//                        d: lineFun(salesDataToPlot),
//                        "stroke": "blue",
//                        "stroke-width": 2,
//                        "fill": "none",
//                        "class": pathClass
//                    });
//            }

//            drawLineChart();
//        }
//    };
// });
