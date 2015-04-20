var Stations = angular.module('Stations', []);


Stations.filter('ago',function(){
	return function(timestamp){
		return moment(timestamp).fromNow();
	}
});