'use strict';

/**
 * @ngdoc overview
 * @name processStApp
 * @description
 * # processStApp
 *
 * Main module of the application.
 */
angular
  .module('processStApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
