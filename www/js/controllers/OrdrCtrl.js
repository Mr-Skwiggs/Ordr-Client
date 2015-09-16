angular.module('App')
        .controller('OrdrCtrl', function ($scope, $ionicSideMenuDelegate, ModalService, Sitting) {

          $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
          };


//          $scope.MenuBtnHidden = function () {
//            console.log($stateProvider);
//          };
        }); 