angular.module('App')
        .service('API', function ($http, $rootScope) {
          var SERVER_IP = 'http://192.168.1.30';
          var SERVER_PORT = '50505';
          var baseUrl = SERVER_IP + ':' + SERVER_PORT;
          
          function broadcast(message){
            $rootScope.$broadcast(message);
            console.log('Broadcast');
          }
          
          function tryCB(callback, params){
            if(typeof (callback) === 'function'){
              callback.apply(this,params);
            }
          }
          
          this.login = function (username, password, callback) {
            $http.post(baseUrl + '/client/login', [username, password])
                    .success(function () {
                      callback(null, true);
                    })
                    .error(function (err) {
                      callback(err, null);
                    });
          };

          this.logout = function (callback) {

          };

          this.checkAuth = function (callback) {
            $http.get(baseUrl + '/client/authed')
                    .success(function (response) {
                      callback(null, response);
                    })
                    .error(function (err) {
                      callback(err, null);
                    });
          };

          this.checkServerStatus = function (callback) {
            broadcast('API:checkServerStatus');
            $http.get(baseUrl + '/client/test')
                    .success(function () {
                      broadcast('API:checkServerStatus:online');
                      
                    })
                    .error(function (err) {
                      $rootScope.$broadcast('API:checkServerStatus:offline', err);
                    });
          };

          this.getMenu = function (callback) {
            $http.get(baseUrl + '/client/menu')
                    .success(function (response) {
                      callback(response);
                    })
                    .error(function (err) {
                      callback(false, err);
                    });
          };

          this.startSitting = function (callback) {
            $http.get(baseUrl + '/client/arrive')
                    .success(function (response) {

                    })
                    .error(function (err) {
                      callback(false, err);
                    });
          };

          this.register = function (fname, lname, alias, password, callback) {
            $ionicLoading.show({
              template: '<ion-spinner icon="lines"></ion-spinner>'
            });
            $http.post(baseUrl + '/client/register')
                    .success(function () {
                      $ionicLoading.show({
                        template: 'Your account has been successfully created <br />' +
                                'You can now log in with your credentials',
                        delay: 2000
                      });
                    })
                    .error(function () {
                      $ionicLoading.show({
                        template: 'There was an error and your account couldn\'t be created',
                        delay: 2000
                      });
                    });
          };
        });