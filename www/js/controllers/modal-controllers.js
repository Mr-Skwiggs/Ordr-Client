angular.module('App')
        .controller('ModalServerCheckCtrl', function ($scope, $rootScope, API) {
          var status = {
            message: 'Loading, please wait...',
            failed: false,
            busy: true
          };
          $scope.status = status;

          $scope.check = function () {
            API.checkServer(function (online) {
              if (online === true) {
                status.busy = false;
                status.message = 'Server is online, you\'re good to go';
              } else {
                status.busy = false;
                status.message = 'Server error, please try again.';
              }
            });
          };

          $scope.check();
        });