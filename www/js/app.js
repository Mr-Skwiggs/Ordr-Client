angular.module('App', ['ionic', 'Overlay'])
        .run(function ($ionicPlatform, API, $ionicSideMenuDelegate) {
//          $ionicPlatform.ready(function () {
//            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//            // for form inputs)
//            if (window.cordova && window.cordova.plugins.Keyboard) {
//              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//            }
//            if (window.StatusBar) {
//              StatusBar.styleDefault();
//            }
//          });
        })

        .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
          $stateProvider
                  .state('login', {
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl'
                  })
                  .state('register', {
                    url: '/register',
                    templateUrl: 'views/register.html',
                    controller: 'RegisterCtrl'
                  })
                  .state('home', {
                    url: '/',
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl'
                  })
                  .state('about', {
                    url: '/about',
                    templateUrl: 'views/about.html'
                  })
                  .state('menu', {
                    url: '/menu',
                    templateUrl: 'views/menu.html'
                  });

          $urlRouterProvider.otherwise('/login');
        });
