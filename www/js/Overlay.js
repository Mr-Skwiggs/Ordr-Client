angular.module('Overlay', [])
        .run(function ($ionicLoading, $rootScope, Popup, $state) {
          var overlayShown = false;

          function hideOverlay() {
            if (overlayShown) {
              $ionicLoading.hide();
              overlayShown = false;
            }
          }

          $rootScope.$on('API:checkServerStatus', function (event, args) {
            hideOverlay();
            overlayShown = true;
            $ionicLoading.show({
              template: '<p class="item-icon-left">Checking server status...<ion-spinner icon="lines"/></p>',
              animation: 'fade-in'
            });
          });

//          $rootScope.$on('event', function(event, args){
//            
//          });

          $rootScope.$on('API:checkServerStatus:online', function (event, args) {
            hideOverlay();
          });

          $rootScope.$on('API:checkServerStatus:offline', function (event, args) {
            hideOverlay();
            Popup.serverOffline();
          });

          $rootScope.$on('API:register', function (event, args) {
            hideOverlay();
            overlayShown = true;
            $ionicLoading.show({
              template: '<p class="item-icon-left">Creating your account...<ion-spinner icon="lines"/></p>'
            });
          });

          $rootScope.$on('API:register:success', function (even, args) {
            hideOverlay();
            Popup.accountCreated(function(){
              $state.go('login');
            });
//            $ionicLoading.show({
//              template: 'Your account has been successfully created <br />' +
//                      'You can now log in with your credentials',
//              duration: 2000
//            });
          });

          $rootScope.$on('API:register:error', function (event, args) {
            hideOverlay();
            Popup.alert(args);
//            $ionicLoading.show({
//              template: 'There was an error and your account could not be created',
//              duration: 4000
//            });
          });
        });