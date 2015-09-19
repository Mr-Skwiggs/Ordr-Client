angular.module('App')
        .controller('LoginCtrl', function ($scope, $http, $ionicSideMenuDelegate, API, $state) {

          $scope.credentials = {};

          $scope.login = function () {
            API.login($scope.credentials.username, $scope.credentials.password, function (err, success) {
              if(!err){
                $state.go('home');
                $scope.$emit('APP:history:clear');
              }
            });
          };
          
          $ionicSideMenuDelegate.canDragContent(false);
          
          $scope.canClick = function(){
            return $scope.credentials.username && $scope.credentials.password;
          };
        });