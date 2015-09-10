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

        function parseDate(data) {
          vm.postsList = {};
          for (var i = data.length - 1; i >= 0; i--) {
            if ( !vm.postsList[data[i].year]) {
              vm.postsList[data[i].year] = {}
            }
            if ( !vm.postsList[data[i].year][data[i].month]) {
              vm.postsList[data[i].year][data[i].month] = []
            }
            vm.postsList[data[i].year][data[i].month].push(data[i]);
          }
        }
    }
})();