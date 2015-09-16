angular.module('App')
        .service('API', function ($http) {
          var SERVER_IP = 'http://192.168.1.30';
          var SERVER_PORT = '50505';
          var baseUrl = SERVER_IP + ':' + SERVER_PORT;

          this.login = function (username, password, callback) {
            $http.post(baseUrl + '/client/login', [username, password])
                    .success(function () {
                      callback(true);
                    })
                    .error(function (err) {
                      callback(err);
                    });
          };

          this.logout = function (callback) {

          };

          this.checkAuth = function (callback) {
            $http.get(baseUrl + '/client/authed')
                    .success(function (response) {
                      callback(response);
                    })
                    .error(function (err) {
                      callback(err);
                    });
          };

          this.checkServer = function (callback) {
            $http.get(baseUrl + '/client/test')
                    .success(function () {
                      callback(true);
                    })
                    .error(function (err) {
                      callback(err);
                    });
          };

          this.getMenu = function (callback) {
            $http.get(baseUrl + '/client/menu')
                    .success(function (response) {
                      console.log(response);
                      callback(response);
                    })
                    .error(function (err) {
                      callback(false, err);
                    });
          };

          this.startSitting = function () {

          };
        });