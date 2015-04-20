var Stations = angular.module('Stations', ['ngRoute']);
// Add Google maps dans les crochets, comme ngRoute, après téléchargement et import dans index!

Stations.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html',
        controller: ''
      })
      .when('/stations', {
        templateUrl: 'app/views/stations.html',
        controller: 'StationCtrl'
      })
      .when('/details/:id', {
        templateUrl: 'app/views/details.html',
        controller: 'MapCtrl'
      })
      .otherwise({
        templateUrl: 'app/views/404.html',
        controller: ''
      });
});

Stations.filter('ago',function(){
	return function(timestamp){
		return moment(timestamp).fromNow();
	}
});