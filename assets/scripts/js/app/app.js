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
