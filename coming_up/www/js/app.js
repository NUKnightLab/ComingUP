// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function () {
    var ComingUp = angular.module('ComingUp', ['ionic'])
        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            })
        })
        .config(function($httpProvider, $stateProvider, $urlRouterProvider){
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-with'];
            $stateProvider
                .state('featured', {
                    url: '/featured',
                    views: {
                        "featured-tab": {
                            templateUrl: '../app/categories/featured.html',
                            controller: 'FeaturedController'
                        }
                    }
                })
                .state('entertainment', {
                    url: '/entertainment',
                    views: {
                        "entertainment-tab": {
                            templateUrl: '../app/categories/entertainment.html',
                            controller: 'EntertainmentController'
                        }
                    }
                })
                .state('food', {
                    url: '/food',
                    views: {
                        "food-tab": {
                            templateUrl: '../app/categories/food.html',
                            controller: 'FoodController'
                        }
                    }
                })
                .state('sports', {
                    url: '/sports',
                        views:{
                        "sports-tab": {
                            templateUrl: '../app/categories/sports.html',
                            controller: 'SportsController'
                        }
                    }
                });
            $urlRouterProvider.otherwise("/index.html");
        })
}());