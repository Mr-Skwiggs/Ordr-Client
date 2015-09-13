angular.module('App', [])
        .controller('OrdrCtrl', function ($scope, $ionicSideMenuDelegate) {

          $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
          };
        });