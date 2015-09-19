angular.module('App')
        .controller('OrdrCtrl', function ($scope, $ionicSideMenuDelegate, ModalService, Sitting, API, $state, $ionicViewService) {

          $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
          };

          API.checkServerStatus(function () {
            API.checkAuth(function (err, authed) {
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
          
          $scope.$on('APP:history:clear',function(){
            console.log('emit catched');
            $ionicViewService.clearHistory();
          });
          
        }); 