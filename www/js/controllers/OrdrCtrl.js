angular.module('App')
        .controller('OrdrCtrl', function ($scope, $ionicSideMenuDelegate, ModalService, Sitting, $ionicLoading, API) {

          $scope.openMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
          };

          $scope.checkServStatus = function () {
            console.log('checkServStatus');
            $ionicLoading.show({
              template: 'Checking server status...'
            });
            API.checkServer(function (online) {
              if (online) {
                $ionicLoading.hide();
              } else {
                $ionicLoading.show({
                  scope: $scope,
                  template: 'Could not reach server. Please make sure you are connected and try again.<br/><br/>' +
                          'If the problem persists, please call the restaurant staff<br/><hr/>' +
                          '<button class="button button-balanced button-outline" ng-click="$parent.checkServStatus()">Try again</button>'
                });
              }
            });
          }
          ;

          $scope.checkServStatus();

//          $scope.MenuBtnHidden = function () {
//            console.log($stateProvider);
//          };
        }); 