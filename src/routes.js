(function () {
  'use strict';

  angular
    .module('app')
    .config(routesConfig);

  /** @ngInject */
  function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider, $mdThemingProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';

    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('blue');

    $stateProvider
      .state('app', {
        abstract: true,
        views: {
          'toolbar@': {
            templateUrl: 'app/components/core/toolbar/toolbar.view.html',
            controller: 'ToolbarController',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.home', {
        url: '/{page}',
        title: 'Home',
        resolve: {
          data: function (WebsitesModel) {
            return WebsitesModel.query({type:'json', query: 'list_websites'}).then(function (res) {
              return res.websites;
            });
          }
        },
        views: {
          '@': {
            templateUrl: 'app/components/home/home.view.html',
            controller: 'HomeController',
            controllerAs: 'vm'
          }
        }
      });
  }

}());

