angular.module('App')
        .controller('OrdrCtrl', function (
                $scope,
                $ionicSideMenuDelegate,
                ModalService,
                Sitting,
                API,
                $state,
                $ionicViewService,
                SilentServerChecker
                )
        {
          $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
          };

          API.checkServerStatus(); 
          
          $scope.$on('API:connection:lost', function(){
            SilentServerChecker.disable();
          });
          
          $scope.$on('API:checkServerStatus:online', function(){
            SilentServerChecker.enable();
          });
          
          API.checkAuth(function (err, authed) {
            if (authed) {
              $state.go('home');
            } else {
              $state.go('login');
            }
          });

          $scope.menuBtnVisible = function () {
            return $state.current.name !== 'login' && $state.current.name !== 'register';
          };
          $ionicSideMenuDelegate.canDragContent(false);

          $scope.$on('APP:history:clear', function () {
            console.log('emit catched');
            $ionicViewService.clearHistory();
          });
          
          $scope.logout = function() {
            API.logout();
            $state.go('login');
          }
        }); 