
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
  $scope.moments = ["10:00 am", "11:00 am", "12:00 pm", "1 pm", "2 pm"];
  $scope.zonesVisibility = {};
  $scope.expanded = null;

  $scope.data = {
    "Calle 85":[10, 20, 15, 16, 30],
    "Salitre plaza":[13, 18, 14, 17, 26],
    "Parque 93":[16, 17, 8, 26, 20],
    "Calle 80":[20, 12, 15, 22, 19],
    "Centro":[9, 15, 16, 18, 17],
  };
  $scope.speedSeries = [];
  $scope.refreshLinear = function() {
    var filtered = [];
    for (var key in $scope.zonesVisibility) {
      filtered.push($scope.data[key]);
    }
    $scope.speedSeries = filtered;
  }

  $scope.onClick = function (points, evt) {
     console.log(points, evt);
   };
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

  $interval(function() {
     $scope.labels.push("2013");
     $scope.data[0].push(4);
   }, 60000);
});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$('[data-toggle="tooltip"]').tooltip();
