angular.module('App')
        .controller('OrdrCtrl', function ($scope, $ionicSideMenuDelegate, ModalService, Sitting, API, $state) {

          $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
          };

          API.checkServerStatus(function () {
            API.checkAuth(function (authed) {
              if (!authed) {
                $state.go('login');
              } else {
                $state.go('home');
              }
            });
          });

          $scope.menuBtnVisible = function () {
            return $state.current.name !== 'login' && $state.current.name !== 'register';
          };
          
          $ionicSideMenuDelegate.canDragContent(false);
          
        }); 