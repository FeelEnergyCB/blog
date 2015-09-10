(function() {
    'use strict';
    angular
        .module('blog')
        .filter('reverse', reverse);
    function reverse() {
        return reverseFilter;
        ////////////////
        function reverseFilter(items) {
          var reversedItems = {};
          console.log(items)
          for (var prop in items) {
            console.log(prop)
            reversedItems.push(prop);
          }
          console.log(reversedItems)
            return reversedItems;
        }
    }
})();