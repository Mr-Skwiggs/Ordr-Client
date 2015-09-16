angular.module('router', [])
        .config(function ($stateProvider, $urlRouterProvider) {
          $stateProvider
                  .state('login', {
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controller: 'LoginCtrl'
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