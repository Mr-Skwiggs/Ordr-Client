angular.module('App')
	.controller('LoginCtrl', function ($scope, $http, $ionicSideMenuDelegate, API, $state) {

		$scope.credentials = {};

		$scope.login = function () {
			API.login($scope.credentials.username, $scope.credentials.password, function (err, success) {
				if (!err) {
					console.log(success);
					if (success) {
						$state.go('home');
						$scope.$emit('APP:history:clear');
					}
				}
			});
		};

		$ionicSideMenuDelegate.canDragContent(false);

		$scope.canClick = function () {
			return $scope.credentials.username && $scope.credentials.password;
		};

		//          $scope.credentials.save.on('click', function(){
		//              console.log($scope.credentials.save);
		//          });
	});
