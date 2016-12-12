angular.module('App')
	.controller('MenuCtrl', function ($scope, API) {
		$scope.menu = {};

		API.getMenu(function (data, err) {
			if (!err) {
				var menu = {};
				console.log(data);
				var genericType, specificType;
				data.forEach(function (item) {
					genericType = item.generic;
					specificType = item.specific;
					if (!menu[genericType]) {
						menu[genericType] = {};
					}
					if (!menu[genericType][specificType]) {
						menu[genericType][specificType] = {};
					}
					menu[genericType][item.specific][item.name] = {
						price: item.price
					};
				});
				console.log(menu);
				$scope.menu = menu;
			}
		});
	});
