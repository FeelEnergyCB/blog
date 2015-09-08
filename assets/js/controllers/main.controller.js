(function() {
    'use strict';
    angular
        .module('blog')
        .controller('MainController', MainController);
    MainController.$inject = ['postsService'];
    /* @ngInject */
    function MainController(postsService) {
        var vm = this;
        activate();
        ////////////////

        function activate() {
          postsService.getPosts().then(function (response) {
            parseDate(response.data);
          });
        }

        function parseDate(response) {
          vm.postsList = response;
          var years = {};
          for (var i = vm.postsList.length - 1; i >= 0; i--) {
            if ( !years[vm.postsList[i].year]) {
              years[vm.postsList[i].year] = []
            }
            years[vm.postsList[i].year].push(vm.postsList[i]);
          }
          console.log(years)
        }
    }
})();