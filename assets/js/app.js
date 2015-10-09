(function() {
  'use strict';
  angular
      .module('blog', ['ui.router'])
      .config(function($locationProvider,$stateProvider, $urlRouterProvider) {
        $locationProvider.html5Mode({ enabled: true, requireBase: true }).hashPrefix('!');
        $stateProvider
          .state('post', {
            url: "/:postPath",
            controller: 'MainController',
            templateUrl: function ($stateParams){
              if( $stateParams.postPath.length ) {
                return 'posts/html/' + $stateParams.postPath + '.html';
              }
            }
          });
      });
})();
