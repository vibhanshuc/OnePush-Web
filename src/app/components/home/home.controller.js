(function () {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.home:HomeController
   *
   * @description
   *
   *
   *
   * */

  /** @ngInject **/
  function HomeController(data, Pagination, $mdDialog, WebsitesModel, $mdToast, $stateParams, $state) {
    var vm = this,
        pages = Pagination.paginate(4, data);

    $mdToast.showSimple('Welcome to OnePush');

    vm.total = data.length;

    vm.paging = {
      total: pages.length,
      current: ($stateParams.page && (typeof parseInt(10, $stateParams.page)=== 'number')) ? ($stateParams.page > pages.length ? pages.length : $stateParams.page) : 1,
      align: 'center start',
      onPageChanged: loadPages
    };


    vm.searchFunction = function (query) {
      var result;
      if(query){
        result = _.filter(data, function (item) {
          return item.title.includes(query) || item.tag.includes(query) || item.url_address.includes(query);
        });
      } else {
        result = data;
      }

      pages = Pagination.paginate(4, result);

      vm.portfolios = pages.length?pages[vm.paging.current - 1].items: [];

      vm.paging.total = pages.length;

    };

    function loadPages() {
      vm.portfolios = pages.length? pages[vm.paging.current - 1].items: [];
      vm.currentPage = vm.paging.current;
    }

    vm.addPortfolio = function (ev) {
      $mdDialog.show({
        controller: function () {
          var vm = this;

          vm.cancel = function () {
            $mdDialog.hide();
          };

          vm.submit = function () {
            WebsitesModel.get({
              type: 'json',
              query: 'push',
              title: vm.title,
              url_address: vm.url_address,
              tag: vm.tag
            }).then(function (res) {
              if(parseInt(res.status) === 403) {
                $mdToast.showSimple(res.message);
              } else {
                $mdToast.showSimple('Portflio was added successfully');
              }
            }, function (error) {
              $mdToast.showSimple('Something went wrong', error);
            });
          };

        },
        controllerAs: 'vm',
        templateUrl: 'app/components/home/_addPotfolioForm.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true
      });
    };


  }

  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['data', 'Pagination', '$mdDialog', 'WebsitesModel', '$mdToast', '$stateParams', '$state'];

}());

