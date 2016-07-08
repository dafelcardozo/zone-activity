// (function (ChartJsProvider) {
//   ChartJsProvider.setOptions({ colors : [ '#FF0000', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
// });

var app = angular.module('dataApp', ["chart.js"]);
app.controller('dataCtrl', function ($scope,  $timeout,  $interval) {
  $scope.initialData = [
   {"zoneId":"Calle 85", "data":{"count":1,"speed":10,"time":1466781876681}},
   {"zoneId":"Salitre plaza", "data":{"count":2,"speed":8.5,"time":1466781876681}},
   {"zoneId":"Parque 93", "data":{"count":4,"speed":15,"time":1466781876681}},
   {"zoneId":"Calle 80", "data":{"count":3,"speed":13.5,"time":1466781876681}},
   {"zoneId":"Centro", "data":{"count":1,"speed": 9 ,"time":1466781876681}}
  ];
  $scope.zones = $scope.initialData.map(d => d.zoneId);

  $scope.series = ['Count by zones'];
  $scope.counts = [$scope.initialData.map(d => d.data.count)];
  $scope.speeds = $scope.initialData.map(d => d.data.speed);
  $scope.moments = [];
  $scope.hour = 11;
  for (var i=7; i>1; i--){
    $scope.moments.push("-"+(i)+" mn");
  }
  $scope.moments.push("-1 mn ago");
  $scope.moments.push("right now");
  $scope.zonesVisibility = {};
  $scope.expanded = null;
  $scope.colors = {
    "Calle 85":"red",
    "Salitre plaza":"blue",
    "Parque 93":"green",
    "Calle 80":"orange",
    "Centro":"pink"
  };

  $scope.z = "pm";
  $scope.colorsArray = [];
  for (var k in $scope.colors) {
    $scope.colorsArray.push($scope.colors[k]);
  }
  $scope.zones.forEach(z => $scope.zonesVisibility[z] = true);

  $scope.data = {
    "Calle 85":[],
    "Salitre plaza":[],
    "Parque 93":[],
    "Calle 80":[],
    "Centro":[]
  };
  for (var key in $scope.zonesVisibility) {
    for (var i=0; i<8; i++) {
      $scope.data[key].push(Math.random()*35);
    }
  }
  $scope.speedSeries = [];
  $scope.colorAsObject = function(key) {
    return {'color':$scope.colors[key]};
  }
  $scope.refreshLinear = function() {
    var filtered = [];
    for (var key in $scope.zonesVisibility) {
      filtered.push($scope.data[key]);
    }
    $scope.speedSeries = filtered;
  }
   $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
   $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
   };
   $scope.expand = function(component) {
     $scope.expanded = component;
   };
   $scope.toggleVisibility = function(component) {
     if ($scope.zonesVisibility[component])
       delete $scope.zonesVisibility[component];
     else
       $scope.zonesVisibility[component] = true;
     $scope.refreshLinear();
   };



  $scope.nextHour = function() {
    for (var z in $scope.data) {
      for (var i=1; i < 8; i++) {
        $scope.data[z][i-1] = $scope.data[z][i];
      }
      $scope.data[z][7] = Math.random()*35;
    }


    $scope.hour++;
    if ($scope.hour == 13) {
      $scope.hour = 1;
      $scope.z = $scope.z === "pm"?"am":"pm";
    }
    // for (var i=1; i < 8; i++) {
    //   $scope.moments[i-1] = $scope.moments[i];
    // }
    // $scope.moments[7] = ""+$scope.hour+" "+$scope.z;
//    $scope.refreshLinear();
  };

  $scope.refreshLinear();

 $interval(() =>
   $scope.speeds = $scope.speeds.map(v => Math.random()*90+10  >>> 0)
 , 5000);

 $interval(() =>
   $scope.counts = [Array.apply(null, Array(8)).map(v => Math.random()*100)]
 , 4000);

$interval($scope.nextHour ,5000);
});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$('[data-toggle="tooltip"]').tooltip();
