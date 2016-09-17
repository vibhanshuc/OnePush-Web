(function () {
  'use strict';

  // takes an array and offset and creates a paginated
  // object using that offset
  function paginateFactory() {
    function take(n, list) {
      return list.slice(0, n);
    }

    function drop(n, list) {
      return list.slice(n);
    }

    function concat(lists) {
      return Array.prototype.concat.apply(this, lists);
    }

    function divide(n, list) {
      if (list.length) {
        var head = take(n, list);
        var tail = drop(n, list);
        return concat.call([head], [divide(n, tail)]);
      } else return [];
    }

    function paginate(n, list) {
      return divide(n, list).map(function (items, index) {
        var number = n * index;

        return {
          start: number + 1,
          end: number + items.length,
          items: items
        };
      });
    }

    return {
      paginate: paginate
    }
  }

  angular.module('app')
    .service('Pagination', paginateFactory);
}());
