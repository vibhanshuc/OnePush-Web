(function () {
  'use strict';

  /** @ngInject */
  function ToolbarController() {
    var vm = this;
    vm.isOpen = false;
  }

  angular.module('app')
    .controller('ToolbarController', ToolbarController);

  ToolbarController.$inject = ['$scope'];

}());
