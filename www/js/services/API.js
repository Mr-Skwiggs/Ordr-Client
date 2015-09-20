angular.module('App')
        .service('API', function ($http, $rootScope) {
          var SERVER_IP = 'http://192.168.1.30';
          var SERVER_PORT = '50505';
          var baseUrl = SERVER_IP + ':' + SERVER_PORT;

          var intervals = {};

          $rootScope.$on('API:connection:lost', function () {
            console.log('broadcast catched, clearing intervals');
            clearIntervals();
          });

          function clearIntervals() {
            console.log(intervals);
            for (var key in intervals) {
              console.log(key);
              if (intervals.hasOwnProperty(key)) {
                var obj = intervals[key];
                for (var prop in obj) {
                  console.log(obj);
                  // important check that this is objects own property 
                  // not from prototype prop inherited
                  if (obj.hasOwnProperty(prop)) {
                    console.log(prop + " = " + obj[prop]);
                  }
                }
              }
            }
//            intervals.forEach(function (interval) {
//              clearInterval(interval);
//            });
//            intervals = [];
          }

          function broadcast(message, args) {
            $rootScope.$broadcast('API:' + message, args);
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
            broadcast('login');
            $http.post(baseUrl + '/client/login', [username, password])
                    .success(function (response) {
                      if (response.success) {
                        broadcast('login:success');
                        tryCB(callback, [null, true]);
                      } else {
                        broadcast('login:error', response.reason);
                        tryCB(callback, [true, null]);
                      }
                    })
                    .error(function (err) {
                      broadcast('login:error', err);
                      tryCB(callback, [err, null]);
                    });
          };

          this.logout = function (callback) {
            $http.get(baseUrl + '/client/logout')
                    .success(function (response) {
                      broadcast('logout:success', response.message);
                      tryCB(callback, [true]);
                    })
                    .error(function (err) {
                      broadcast('logout:error');
                      tryCB(callback, [false, err]);
                    });
          };

          this.checkAuth = function (callback) {
            $http.get(baseUrl + '/client/authed')
                    .success(function (response) {
                      tryCB(callback, [null, JSON.parse(response)]);
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
                      if (!silent) {
                        broadcast('checkServerStatus:online');
                      }
                      tryCB(callback, [true]);
                    })
                    .error(function (err) {
                      if (!silent) {
                        broadcast('checkServerStatus:offline', err);
                      } else {
                        broadcast('connection:lost');
                      }
                      tryCB(callback, [false]);
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
                    .success(function (response) {
                      if (JSON.parse(response) === true) {
                        tryCB(callback, [null, true]);
                        broadcast('register:success');
                      } else {
                        tryCB(callback, [response.error]);
                        console.log('register success error');
                        broadcast('register:error', response.error);
                      }
                    })
                    .error(function (err) {
                      tryCB(callback, [err, null]);
                      console.log('register error');
                      broadcast('register:error');
                    });
          };

          this.sitDown = function () {
            broadcast('sitdown');
            var promise = new Promise(function (resolve, reject) {
              $http.post(baseUrl + '/client/arrive')
                      .success(function (response) {
                        if (response.success) {
                          intervals.sitDown = setInterval(function () {
                            getSitDownAck(function (response) {
                              if (response.success) {
                                broadcast('sitdown:success');
                                resolve(true, response.details);
                                clearInterval(intervals.sitDown);
                              } else if (response.error) {
                                broadcast('sitdown:error', response.error);
                                resolve(false, response.error);
                                clearInterval(intervals.sitDown);
                              }
                            });
                          }, 100);
                        }
                      })
                      .error(function (err) {
                        broadcast('sitdown:error', err);
                        resolve(false, err);
                      });
            });
            return promise;
          };

          function getSitDownAck(callback) {
            $http.get(baseUrl + '/client/arriveAck')
                    .success(function (response) {
                      callback(response);
                    })
                    .error(function (err) {
                      callback(err);
                    });
          }
        });