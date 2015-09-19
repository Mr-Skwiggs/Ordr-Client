angular.module('App')
        .service('API', function ($http, $rootScope) {
          var SERVER_IP = 'http://192.168.1.30';
          var SERVER_PORT = '50505';
          var baseUrl = SERVER_IP + ':' + SERVER_PORT;

          function broadcast(message) {
            $rootScope.$broadcast('API:' + message);
          }

          function tryCB(callback, params) {
            if (typeof callback === 'function') {
              callback.apply(this, params);
            }
          }

          function post(url, data) {
            return $http({
              method: 'POST',
              url: url,
              data: data,
              headers: {'Content-Type': 'application/json'}
            });
          }

          this.login = function (username, password, callback) {
            $http.post(baseUrl + '/client/login', [username, password])
                    .success(function () {
                      tryCB(callback, [null, true]);
                    })
                    .error(function (err) {
                      tryCB(callback, [err, null]);
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

          this.checkServerStatus = function (callback, silent) {
            if (!silent) {
              broadcast('checkServerStatus');
            }
            $http.get(baseUrl + '/client/test', {timeout: 3000})
                    .success(function () {
                      broadcast('checkServerStatus:online');
                      tryCB(callback);
                    })
                    .error(function (err) {
                      broadcast('checkServerStatus:offline', err);
                      tryCB(callback);
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
            broadcast('register');
            var params = {
              fname: fname,
              lname: lname,
              alias: alias,
              password: password
            };
            $http.post(baseUrl + '/client/register', params)
                    .success(function (success) {
                      if (success === true) {
                        tryCB(callback, [null, true]);
                        broadcast('register:success');
                      } else {
//                        tryCB(callback, [])
                        broadcast('register:error', err);
                      }
                    })
                    .error(function (err) {
                      tryCB(callback, [err, null]);
                      broadcast('register:error');
                    });
          };
        });