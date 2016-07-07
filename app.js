
var app = angular.module('dataApp', ["chart.js"]);
app.controller('dataCtrl', function ($scope,  $timeout,  $interval) {
  $scope.initialData = [
   {"zoneId":"Calle 85", "data":{"count":1,"speed":10,"time":1466781876681}},
   {"zoneId":"Salitre plaza", "data":{"count":2,"speed":8.5,"time":1466781876681}},
   {"zoneId":"Parque 93", "data":{"count":4,"speed":15,"time":1466781876681}},
   {"zoneId":"Calle 80", "data":{"count":3,"speed":13.5,"time":1466781876681}},
   {"zoneId":"Centro", "data":{"count":1,"speed": 9 ,"time":1466781876681}}
  ];

  $scope.labels = $scope.initialData.map(d => d.zoneId); //['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Count by zones'];
  $scope.counts = [$scope.initialData.map(d => d.data.count)];
  $scope.speeds = $scope.initialData.map(d => d.data.speed);
  $scope.moments = ["10:00 am", "11:00 am", "12:00 pm", "1 pm", "2 pm"];

  $scope.data = [
    [10, 20, 15, 16, 30],
    [13, 18, 14, 17, 26],
    [16, 17, 8, 26, 20],
    [20, 12, 15, 22, 19],
    [9, 15, 16, 18, 17],
  ];

  $scope.onClick = function (points, evt) {
     console.log(points, evt);
   };
   $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
   $scope.options = {
     // Boolean - whether or not the chart should be responsive and resize when the browser does.

responsive: true,

// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container

maintainAspectRatio: false,
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
