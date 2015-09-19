angular.module('App')
        .service('Popup', function ($ionicPopup, API) {
          var popups = {};
          
          popups.serverOffline = function(){
            $ionicPopup.show({
              templateUrl: '../popups/server-unavailable.html',
              title: 'Can\'t reach the server...',
              buttons: [
                {
                  text: 'Try again',
                  type: 'button-balanced button-outline',
                  onTap: function(event){
                    API.checkServerStatus();
                  }
                }
              ]
            });
          };
          
          popups.fieldsInvalid = function(){
            $ionicPopup.alert({
              title: 'Incorrect information',
              template: 'Please make sure you filled in every field correctly',
              okText: 'Ok'
            });
          };
          
          popups.passwordsDontMatch = function(){
            $ionicPopup.alert({
              title: 'Passwords don\'t match',
              template: 'Please check you entered the same password twice'
            });
          };
          
          popups.accountCreated = function(callback){
            $ionicPopup.show({
              title: 'Account successfully created !',
              template: 'You can now log with the credentials you used to register',
              buttons: [
                {
                  text: 'Log me in',
                  type: 'button-balanced button-outline',
                  onTap: function(event){
                    if(typeof callback === 'function'){
                      callback();
                    }
                  }
                }
              ]
            });
          };
          
          return popups;
        });