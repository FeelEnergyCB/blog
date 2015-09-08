(function() {
  'use strict';
  angular
      .module('blog', ['ui.router'])
      .config(function($stateProvider, $urlRouterProvider) {

        // $urlRouterProvider.otherwise("/");

        $stateProvider
          .state('post', {
            url: "/:postPath",
            controller: 'MainController',
            templateUrl: function ($stateParams){
              if( $stateParams.postPath.length ) {
                return '/posts/dist/' + $stateParams.postPath + '.html';
              }
            }
          });
      });
})();