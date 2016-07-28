(function() {
    'use strict';
    angular
        .module('blog')
        .controller('MainController', MainController);
    MainController.$inject = ['postsService', '$state', '$rootScope', '$timeout'];
    /* @ngInject */
    function MainController(postsService, $state, $rootScope, $timeout) {
        var vm = this;
        vm.loaded = false;
        vm.postsList = {};
        vm.scrollTo = scrollTo;
        activate();
        ////////////////

        function activate() {
          postsService.getPosts().then(function (response) {
            vm.postsList = response.data;
          });

          $rootScope.$on('$stateChangeSuccess', function() {
            switch ($state.current.name) {
              case 'post':
                vm.scrollTopPos = $(window).scrollTop();
                scrollTo();
                break;
              case 'main':
                scrollTo(vm.scrollTopPos);
                break;
              default:
                break;
            }
          });
        }

        function scrollTo(pos) {
          var pos = pos || 0;
          $('html, body').animate({scrollTop : pos}, 400)
        }

          // $state.go('post', {postPath: post.path})s

    }
})();
