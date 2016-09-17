(function () {
  'use strict';

  angular
    .module('app', [
      'ngMaterial',
      'ngMdIcons',
      'ngMessages',
      'ngAnimate',
      'ui.router',
      'modelFactory',
      'angular-loading-bar',
      'cfp.loadingBar',
      'angularPromiseButtons',
      'ngStorage',
      'cl.paging'])
    .constant('API', 'https://hackerearth.0x10.info/api/one-push')
    .constant('_', window._);

}());
