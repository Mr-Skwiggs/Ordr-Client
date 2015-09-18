angular.module('App')
        .controller('LoginCtrl', function ($scope, $http, $ionicSideMenuDelegate) {
          $scope.hideMenuBtn = true;
          $ionicSideMenuDelegate.canDragContent(false);
        });