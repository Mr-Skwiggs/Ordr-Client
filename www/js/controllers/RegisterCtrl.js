angular.module('App')
        .controller('RegisterCtrl', function ($scope, API) {
          $scope.registerForm = {};
          
          $scope.register = function () {
            console.log($scope.registerForm.length);
            if ($scope.registerForm.length === 4) {
//              API.register(this.fname, this.lname, this.alias, this.password, function (response) {
//                console.log("account created");
//              });
              console.log("Register");
            } else {
              alert('Please make sure you filled all fields in');
            }
          };
        });