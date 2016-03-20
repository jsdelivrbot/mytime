// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope, UserService, $state) {

  // route all requests to login screen if necessary, i.e. no Particle API access token has been stored
  $rootScope.$on('$stateChangeStart', function(e, toState) {
    if ('login' !== toState.name) {
      // get the access token for the particle API
      var user = UserService.getUser('facebook');
      if (!user.userID) {
        e.preventDefault();
        $state.go('login');
      }
    }
  });

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthController'
  })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  })

  .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    controller: 'MenuController'
  })

  .state('mytime', {
    url: '/mytime',
    templateUrl: 'templates/mytime.html',
    controller: 'MyTimeController'
  })

  .state('notime', {
    url: '/notime',
    templateUrl: 'templates/notime.html',
    controller: 'NoTimeController'
  })

  .state('whattime', {
    url: '/whattime',
    templateUrl: 'templates/whattime.html',
    controller: 'WhatTimeController'
  })

  .state('five', {
    url: '/five',
    templateUrl: 'templates/five.html',
    controller: 'FiveController'
  })

  .state('fifteen', {
    url: '/fifteen',
    templateUrl: 'templates/fifteen.html',
    controller: 'FifteenController'
  })

  .state('thirty', {
    url: '/thirty',
    templateUrl: 'templates/thirty.html',
    controller: 'ThirtyController'
  })

  .state('onehour', {
    url: '/onehour',
    templateUrl: 'templates/onehour.html',
    controller: 'OneHourController'
  });

  $urlRouterProvider.otherwise('/home');
});