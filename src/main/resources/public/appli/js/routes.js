angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.domotique', {
    url: '/pagedomotique',
    views: {
      'tab1': {
        templateUrl: 'templates/domotique.html',
        controller: 'domotiqueCtrl'
      }
    }
  })

  .state('tabsController.favoris', {
    url: '/pagefavoris',
    views: {
      'tab2': {
        templateUrl: 'templates/favoris.html',
        controller: 'favorisCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/pagedomotique',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('smartHouse', {
    url: '/pagelogin',
    templateUrl: 'templates/smartHouse.html',
    controller: 'smartHouseCtrl'
  })

  .state('page', {
    url: '/pagezone',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

$urlRouterProvider.otherwise('/pagelogin')

  

});