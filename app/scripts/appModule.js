var Stations = angular.module('Stations', ['ngRoute', 'uiGmapgoogle-maps']);

Stations.config(function ($routeProvider) {
    //Cette config permet de  diriger le ng-view entre les pages
    //Permet également de déclarer le controlleur associé
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/main.html', 
        controller: ''
      })
      .when('/itineraire', {
        templateUrl: 'app/views/itin.html',
        controller: 'StationCtrl'
      })
      .when('/depart/:idDepart/arrivee/:idArrivee', {
        templateUrl: 'app/views/itinMap.html',
        controller: 'ItinCtrl'
      })
      .when('/depart//arrivee/', {//Si on oublie de mettre des ID, ou si la personne clique sans avoir saisie les stations 
        templateUrl: 'app/views/itin.html',
        controller: 'StationCtrl'
      })
      .when('/stations', {
        templateUrl: 'app/views/stations.html',
        controller: 'StationCtrl'
      })
      .when('/details/:id', {
        templateUrl: 'app/views/details.html',
        controller: 'MapCtrl'
      })
      .when('/statistiques', {
        templateUrl: 'app/views/statistiques.html',
        controller: 'StatsCtrl'
      })

      .when('/info', {
        templateUrl: 'app/views/info.html',
      })
      .otherwise({ //page d'erreur sympatique
        templateUrl: 'app/views/404.html',
      });
});


//Filtre permettant de convertir le timestamp en durée compréhensible par l'utilisateur
Stations.filter('ago',function(){
	return function(timestamp){
		return moment(timestamp).fromNow();
	}
});


