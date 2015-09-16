angular.module('App')
        .controller('HomeCtrl', function ($scope, $http, $timeout, $ionicLoading, $ionicPopup, ModalService, Sitting, API) {
          $scope.server = {
            ip: 'Loading...',
            menu: 'Loading, too...'
          };
          $scope.serverStatus = {
            busy: true,
            online: false
          };

          $scope.checkServStatus = function () {
            $scope.serverStatus.busy = true;
            API.getMenu(function (items, err) {
              if (!err) {
                $scope.serverStatus.online = true;
              } else {
                $scope.serverStatus.online = false;
              }
              $scope.serverStatus.busy = false;
//              console.log($scope.serverStatus);
            });
          };

          $scope.checkServStatus();

          $scope.showModal = function () {
            ModalService
                    .initNoDismiss('server-check.html', $scope)
                    .then(function (modal) {
                      modal.show();
                    });
          };
        });
