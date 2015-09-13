angular.module('App', ['ionic', 'router'])

        .run(function ($ionicPlatform, $location, Sitting, $http) {
          $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
              StatusBar.styleDefault();
            }
            
//            var it = {
//              count: 0,
//              found: false
//            };
//            
//            while(it.count < 256 && !it.found){
//              $http.get('http://192.168.1.' + it.count + ':50505').then(function(response){
//                console.log(it.count);
//                console.log(response);
//              });
//            }
            console.log("hello");
            $http.get('http://192.168.1.30:50505')
                    .success(function () {
                      console.log('Server reached');
//                      alert('yay !!!');
                    })
                    .error(function () {
                      console.log('Failed to reach server');
//                      alert('nay !!!');
                    });

//            var firstVisit = localStorage.getItem('firstVisit');
//            if (!firstVisit) {
//              $location.url('/tour');
//            }
          });
        });
