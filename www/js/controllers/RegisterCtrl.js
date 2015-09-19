angular.module('App')
        .controller('RegisterCtrl', function ($scope, API, Popup) {

          $scope.fields = {};

          $scope.showPassword2 = function () {
            return $scope.fields.password !== undefined && $scope.fields.password !== '';
          };

          $scope.register = function (form) {
            console.log(form);
            if (fieldsValid()) {
              API.register($scope.fields.fname,
                      $scope.fields.lname,
                      $scope.fields.alias,
                      $scope.fields.password,
                      function (response) {
                        console.log("account created");
                      });
            } else {
              Popup.passwordsDontMatch();
            }
          };

          function fieldsValid() {
            return $scope.fields.fname
                    && $scope.fields.lname
                    && $scope.fields.alias
                    && ($scope.fields.password === $scope.fields.password2);
          }

          $scope.canClick = function () {
            return $scope.fields.fname
                    && $scope.fields.lname
                    && $scope.fields.alias
                    && $scope.fields.password
                    && $scope.fields.password2;
          };
          
//          $scope.$on('API:register:success', function(){
//            $scope.showSuccess = true;
//          });
        });