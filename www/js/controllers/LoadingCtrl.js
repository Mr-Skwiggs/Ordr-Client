var app = angular.module('App');
app.controller('LoadingCtrl', function($scope, Loading){
  console.log("Loaded");
  $scope.checkServerStatus = Loading.checkServerStatus;
});