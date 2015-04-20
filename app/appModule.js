var Stations = angular.module('Stations', ['ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'google-maps'])



;

Stations.config(functioNn ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../index.html',
        controller: ''
      })
      .when('/itineraire', {
        templateUrl: 'views/itin.html',
        controller: ''
      })
      .when('/stations', {
        templateUrl: 'views/stations.html',
        controller: 'StationCtrl'
      })
      .when('/info', {
        templateUrl: 'views/hotel.html',
        controller: ''
      })
      .when('/statistiques', {
        templateUrl: 'views/findHotel.html',
        controller: ''
      })
      .otherwise({
        templateUrl: 'views/404.html',
        controller: ''
      });
});


Stations.filter('ago',function(){
	return function(timestamp){
		return moment(timestamp).fromNow();
	}
});