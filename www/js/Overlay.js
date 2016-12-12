angular.module('Overlay', [])
	.run(function ($ionicLoading, $rootScope, Popup, $state) {
		var overlayShown = false;

		function hideOverlay() {
			if (overlayShown) {
				$ionicLoading.hide();
				overlayShown = false;
			}
		}

		$rootScope.$on('API:checkServerStatus', function (event, args) {
			hideOverlay();
			overlayShown = true;
			$ionicLoading.show({
				template: '<p>Checking server status...</p>',
				animation: 'fade-in'
			});
		});

		//          $rootScope.$on('event', function(event, args){
		//            
		//          });

		$rootScope.$on('API:checkServerStatus:online', function (event, args) {
			hideOverlay();
		});

		$rootScope.$on('API:checkServerStatus:offline', function (event, args) {
			hideOverlay();
			Popup.serverOffline();
		});

		$rootScope.$on('API:login', function (event, args) {
			hideOverlay();
			overlayShown = true;
			$ionicLoading.show({
				template: 'Logging in, please wait...',
				animation: 'fade-in'
			});
		});

		$rootScope.$on('API:login:success', function (event, args) {
			hideOverlay();
		});

		$rootScope.$on('API:login:error', function (event, args) {
			hideOverlay();
			Popup.alert('Error', args);
		});

		$rootScope.$on('API:register', function (event, args) {
			hideOverlay();
			overlayShown = true;
			$ionicLoading.show({
				template: '<p class="item-icon-left">Creating your account...<ion-spinner icon="lines"/></p>'
			});
		});

		$rootScope.$on('API:register:success', function (even, args) {
			hideOverlay();
			Popup.accountCreated(function () {
				$state.go('login');
			});
		});

		$rootScope.$on('API:register:error', function (event, args) {
			hideOverlay();
			Popup.alert('Error', args);
		});

		$rootScope.$on('API:logout:success', function (event, args) {
			hideOverlay();
			Popup.alert('Success', args);
		});

		$rootScope.$on('API:connection:lost', function (event, args) {
			hideOverlay();
			Popup.connectionLost();
		});


		$rootScope.$on('API:sitdown:ack', function (event, args) {
			if (!overlayShown) {
				overlayShown = true;
				$ionicLoading.show({
					template: 'The staff will shortly confirm your presence, please wait...',
					animation: 'fade-in'
				});
			}
		});

		$rootScope.$on('API:sitdown:success', function (event, args) {
			hideOverlay();
			overlayShown = true;
			$ionicLoading.show({
				template: 'Okay, you\'re good to go !',
				animation: 'fade-in',
				duration: 1000
			});
		});
	});
