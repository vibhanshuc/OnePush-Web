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
  function HomeController(data, Pagination, $mdDialog, WebsitesModel, $mdToast) {

    var vm = this;

    $mdToast.showSimple('Welcome to OnePush');

    var pages = Pagination.paginate(5, data);

    vm.currentPage = 0;

    vm.paging = {
      total: pages.length,
      current: 1,
      align: 'center start',
      onPageChanged: loadPages
    };

    function loadPages() {
      vm.portfolios = pages[vm.paging.current - 1].items;
      vm.currentPage = vm.paging.current;
    }

    vm.addPortfolio = function (ev) {
      $mdDialog.show({
        controller: function () {
          var vm = this;

          vm.title = 'Vibhanshu Chaturvedi';
          vm.url_address = 'https://github.com/vibhanshuc';
          vm.tag = 'Personal';

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
              console.log(parseInt(res.status), res.message);
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

  HomeController.$inject = ['data', 'Pagination', '$mdDialog', 'WebsitesModel', '$mdToast'];

}());

