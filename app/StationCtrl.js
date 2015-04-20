Stations.controller("StationsCtrl", function($scope, $http){

	var SERVEUR_URL = "https://api.jcdecaux.com/vls/v1/";
	var KEY = "?contract=paris&apiKey=ab975d2ef885d1f727d9ec4f5fddde86881c077c"; // Clé personnelle permettant d'utiliser les jeux de données. 

	$scope.stations = [];
	$scope.isLoading = false;



	function getStations()
	{
		console.info("getting stations");
		$scope.isLoading =true;
		$http.get(SERVEUR_URL+"stations"+KEY)
		.success(function(data,status)
		{
			$scope.stations=data;
			$scope.status=status;
			$scope.isLoading = false;
		})
		.error(function(data,status)
		{
			$scope.stations=data;
			console.error('unable to load stations'+ status);
			$scope.isLoading = false;
		})
	}


	// $scope.showDetails=function(stationNumber){
	// 	console.info("showing details");
	// 	$scope.isLoading = true;

	// 	$http.get(SERVEUR_URL+'stations/'+stationNumber+KEY)
	// 	.success(function(data, status)
	// 	{
	// 		$scope.answers=data;
	// 		$scope.status=status;
	// 		$scope.isLoading = false;
	// 	})
	// 	.error(function(data, status)
	// 	{
	// 		$scope.isLoading = false;
	// 		console.error('unable to load details '+ status);
	// 	})

	// }

	getStations();

});
