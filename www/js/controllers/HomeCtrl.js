angular.module('App')
	.controller('HomeCtrl', function ($scope, $http, $ionicSideMenuDelegate, Sitting, API, Popup) {
		$ionicSideMenuDelegate.canDragContent(true);

		$scope.sitting = new Sitting();

		$scope.sitDown = function () {
			API.sitDown().then(function (success, details) {
				console.log(success);
				if (success) {
					$scope.sitting.sitDown(details.id, details.table);
				}
			});
		};
	});
