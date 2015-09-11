(function() {
  'use strict';
  angular
    .module('blog')
    .directive('closeAside', closeAside);
  closeAside.$inject = [];
  /* @ngInject */
  function closeAside () {
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

    }
  }
  /* @ngInject */
  function MainController () {
  }
})();