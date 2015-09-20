angular.module('App')
        .service('Popup', function ($ionicPopup, API) {
          var popups = {};
          var open = false;

          popups.serverOffline = function () {
            if (!open) {
              open = true;
              $ionicPopup.show({
                templateUrl: '../popups/server-unavailable.html',
                title: 'Can\'t reach the server...',
                buttons: [
                  {
                    text: 'Try again',
                    type: 'button-balanced button-outline',
                    onTap: function (event) {
                      open = false;
                      API.checkServerStatus();
                    }
                  }
                ]
              });
            }
          };

          popups.connectionLost = function () {
            if (!open) {
              $ionicPopup.show({
                template: 'Seems like the connection to the server was lost...',
                title: 'Oops',
                buttons: [
                  {
                    text: 'Try again',
                    type: 'button-balanced button-outline',
                    onTap: function (event) {
                      open = false;
                      API.checkServerStatus();
                    }
                  }
                ]
              });
            }
          };

          popups.fieldsInvalid = function () {
            $ionicPopup.alert({
              title: 'Incorrect information',
              template: 'Please make sure you filled in every field correctly',
              okText: 'Ok'
            });
          };

          popups.passwordsDontMatch = function () {
            $ionicPopup.alert({
              title: 'Passwords don\'t match',
              template: 'Please check you entered the same password twice'
            });
          };

          popups.accountCreated = function (callback) {
            $ionicPopup.show({
              title: 'Account successfully created !',
              template: 'You can now log with the credentials you used to register',
              buttons: [
                {
                  text: 'Log me in',
                  type: 'button-balanced button-outline',
                  onTap: function (event) {
                    if (typeof callback === 'function') {
                      callback();
                    }
                  }
                }
              ]
            });
          };

          popups.alert = function (title, message) {
            message = capitalize(message);
            $ionicPopup.alert({
              title: title,
              template: message
            });
          };

          function capitalize(message) { 
            var firstLetter = message.substr(0, 1);
            firstLetter = firstLetter.toUpperCase();
            return firstLetter + message.substr(1, message.length - 1);
          }
          
          return popups;
        });