var Stations = angular.module('Stations', ['ngRoute']);
// Add Google maps dans les crochets, comme ngRoute, après téléchargement et import dans index!

Stations.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../index.html',
        controller: ''
      })
      .when('/stations', {
        templateUrl: '/views/stations.html',
        controller: 'StationCtrl'
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