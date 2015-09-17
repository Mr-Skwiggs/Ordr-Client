angular.module('App')
        .controller('RegisterCtrl', function ($scope, API) {
          $scope.register = function(){
            if($scope.fname && $scope.lname && $scope.alias && $scope.password){
              API.register($scope.fname, $scope.lname, $scope.alias, $scope.password, function(reponse){
                console.log("account created");
              });
            } else {
              alert('Please make sure you filled all fields in');
            }
          };
        });