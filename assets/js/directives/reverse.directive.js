(function() {
    'use strict';
    angular
        .module('blog')
        .directive('reverse', reverse);
    reverse.$inject = [];
    /* @ngInject */
    function reverse() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: MainController,
            controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            }
        };
        return directive;
        function link(scope, element, attrs) {
          // var children = element[0].children,
          // for (var i = 0, ilen = children.length; i < ilen; i += 1) {

          // }
        }
    }
    /* @ngInject */
    function MainController() {
    }
})();