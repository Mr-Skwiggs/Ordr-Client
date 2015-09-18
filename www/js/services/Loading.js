angular.module('App')
        .service('Loading', function ($ionicLoading, $rootScope) {
          $rootScope.$on('API:checkServerStatus', function (event, args) {
            console.log(event);
            $ionicLoading.show({
              template: 'Checking server status...'
            });
          });
        });