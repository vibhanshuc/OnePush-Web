(function () {
  'use strict';

  /** @ngInject **/
  function WebsitesModel($modelFactory, API) {

    var options = {
      pk: 'id',
      defaults: {
        id: null,
        title: null,
        favicon_image: null,
        url_address: null,
        tag: null,
        likes: 0
      },
      actions: {
        query: {
          isArray: false
        },
        push: {
          method: 'POST'
        }
      }
    };

    return $modelFactory(API, options);
  }

  angular.module('app')
    .factory('WebsitesModel', WebsitesModel);

  WebsitesModel.$inject = ['$modelFactory', 'API'];

}());
