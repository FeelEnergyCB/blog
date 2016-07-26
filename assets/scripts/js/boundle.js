(function() {
  'use strict';
  angular
      .module('blog', ['ui.router'])
      .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
          .state('main', {
            url: "/",
            templateUrl: 'assets/scripts/js/app/controllers/main.html'
          })
          .state('post', {
            url: "/:postPath",
            templateUrl: function ($stateParams){
              if( $stateParams.postPath.length ) {
                return 'posts/html/' + $stateParams.postPath + '.html';
              }
            }
          });
      });
})();
;(function() {
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
          $('html, body').animate({scrollTop : pos}, 200)
        }

          // $state.go('post', {postPath: post.path})s

    }
})();
;(function() {
    'use strict';
    angular
        .module('blog')
        .directive('list', list);
    list.$inject = [];
    /* @ngInject */
    function list() {
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
          element.on('click', function () {
            var parent = element.parent(),
                activeClass = attrs.class.slice(0, attrs.class.lastIndexOf('-')) + '_active';
            if (parent.hasClass(activeClass)) {
              parent.removeClass(activeClass);
            } else {
              parent.addClass(activeClass);
            }
          })
        }
    }
    /* @ngInject */
    function MainController() {
    }
})();;(function() {
    'use strict';
    angular
        .module('blog')
        .filter('month', month);
    function month() {
        return monthFilter;
        ////////////////
        function monthFilter(items) {
          
          var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
          return months[items];
      }
    }
})();;(function() {
    'use strict';
    angular
        .module('blog')
        .factory('postsService', postsService);
    postsService.$inject = ['$http'];
    /* @ngInject */
    function postsService($http) {
      var service = {
          getPosts: getPosts
      };
      return service;
      ////////////////
      function getPosts() {
        var req = {
          method: 'GET',
          url: 'assets/data/data.json',
          cache: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
        return $http(req);
      }
    }
})();
