(function() {
  'use strict';
  angular
      .module('blog', ['ui.router'])
      .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
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
        activate();
        ////////////////

        function activate() {
          postsService.getPosts().then(function (response) {
            parseDate(response.data);
          });

          $rootScope.$on('$stateChangeSuccess', function() {
             document.body.scrollTop = document.documentElement.scrollTop = 0;
          });
        }

        function parseDate(data) {
          for (var i = data.length - 1; i >= 0; i--) {
            if ( !vm.postsList[data[i].year]) {
              vm.postsList[data[i].year] = {}
            }
            if ( !vm.postsList[data[i].year][data[i].month]) {
              vm.postsList[data[i].year][data[i].month] = []
            }
            vm.postsList[data[i].year][data[i].month].push(data[i]);
          }
          vm.loaded = true;

          $timeout(function() {
            vm.currentUrl = $state.params.postPath;
            if (!vm.currentUrl) {
              showFirstPost();
            }
          }, 0);
        }

        function showFirstPost() {
          var lastYear,
              lastMonth,
              lastPosts,
              post;

          for (var item in vm.postsList) {
            if (!lastYear) lastYear = item;
            if ( +item > +lastYear ) lastYear = item;
          }

          for (var item in vm.postsList[lastYear]) {
            if (!lastMonth) lastMonth = item;
            if ( +item > +lastMonth ) lastMonth = item;
          }

          lastPosts = vm.postsList[lastYear][lastMonth]

          lastPosts.forEach(function(elem) {
            if (!post) post = elem;
            if (elem.day >= post.day) {
              post = elem
            }
          })

          $state.go('post', {postPath: post.path})
        }
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
          url: 'assets/json/data.json',
          cache: true,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
        return $http(req);
      }
    }
})();