angular.module('App')
        .controller('ModalServerCheckCtrl', function ($scope) {
          var status = {
            message: 'Loading, please wait...',
            failed: false,
            busy: true
          };
          $scope.status = status;

          $scope.check = function () {
            API.checkServer()
                    .success(function (response) {
                      status.busy = false;
                      status.message = 'Server is online, you\'re good to go';
                    })
                    .error(function (error) {
                      status.busy = false;
                      status.message = 'Server error, please try again.';
                    });
          };

          $scope.check();
        });