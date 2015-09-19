angular.module('App')
        .controller('HomeCtrl', function ($scope, $http, $ionicSideMenuDelegate, Sitting, API) {
          $ionicSideMenuDelegate.canDragContent(true);
        });
