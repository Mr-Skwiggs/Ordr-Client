angular.module('router', [])
        .config(function ($stateProvider, $urlRouterProvider) {
          $stateProvider
                  .state('login', {
                    url: '/login',
                    templateUrl: 'views/login/login.html',
                    controller: 'LoginCtrl'
                  })
                  .state('tour', {
                    url: '/tour',
                    templateUrl: 'views/tour/tour.html',
                    controller: 'TourCtrl'
                  })
                  .state('home', {
                    url: '/',
                    templateUrl: 'views/home/home.html',
                    controller: 'HomeCtrl'
                  })
                  .state('about', {
                    url: '/about',
                    templateUrl: 'views/about/about.html'
                  })
                  .state('reservation', {
                    url: '/reservation',
                    templateUrl: 'views/reservation/reservation.html',
                    controller: 'ReservationCtrl'
                  })
                  .state('food', {
                    url: '/food',
                    templateUrl: 'views/food/food.html',
                    controller: 'FoodCtrl'
                  })
                  .state('weather', {
                    url: '/weather',
                    templateUrl: 'views/weather/weather.html',
                    controller: 'WeatherCtrl'
                  })
                  .state('local', {
                    abstract: true,
                    url: '/local',
                    templateUrl: 'views/local/local.html'
                  })
                  .state('local.food', {
                    url: '/food',
                    views: {
                      'local-food': {
                        templateUrl: 'views/local/food.html'
                      }
                    }
                  })
                  .state('local.beaches', {
                    url: '/beaches',
                    views: {
                      'local-beaches': {
                        templateUrl: 'views/local/beaches.html'
                      }
                    }
                  })
                  .state('local.sights', {
                    url: '/sights',
                    views: {
                      'local-sights': {
                        templateUrl: 'views/local/sights.html'
                      }
                    }
                  });

          $urlRouterProvider.otherwise('/');
        });