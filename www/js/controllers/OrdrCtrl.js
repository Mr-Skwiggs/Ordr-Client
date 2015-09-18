angular.module('App')
        .controller('OrdrCtrl', function ($scope, $ionicSideMenuDelegate, ModalService, Sitting, API, $state) {
          
          API.checkAuth(function (authed){
            if(!authed){
              $state.go('login')
            }
          });
          
          $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
          };
          API.checkServerStatus();
        }); 