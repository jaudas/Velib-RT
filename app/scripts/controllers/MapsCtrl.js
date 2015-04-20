Stations.controller('MapCtrl', function($scope, $http,$routeParams) {
	var SERVEUR_URL = "https://api.jcdecaux.com/vls/v1/stations/";
	var KEY = "?contract=paris&apiKey=ab975d2ef885d1f727d9ec4f5fddde86881c077c"; // Clé personnelle permettant d'utiliser les jeux de données. 

	$scope.stationDetails = [];

	var idStation = $routeParams.id;



	$scope.map = {
		center: {
			latitude: 43.45,
			longitude: 4
		},
		coords: {
			latitude: 0,
			longitude: 0
		},
		zoom: 7,
		options: {
			disableDoubleClickZoom:true,
			draggableCursor:'move',
			draggingCursor:'auto',
			keyboardShortcuts:false,
			streetViewControl:false
		}
	}

	$scope.marker = {
		coords: {
			latitude: 0,
			longitude: 0
		}
	};


    function placeStation(id)
    {
    	console.info("getting details");
    	$scope.isLoading =true;
    	$http.get(SERVEUR_URL+id+KEY)
    	.success(function(data,status)
    	{
    		$scope.stationDetails=data;
    		$scope.status=status;
    		$scope.isLoading = false;
    		
    		//centrage de la map
    		$scope.map.center = $scope.stationDetails.position;
    		$scope.map.coords = $scope.stationDetails.position;
    	})
    	.error(function(data,status)
    	{
    		$scope.stationDetails=data;
    		console.error('unable to load stations'+ status);
    		$scope.isLoading = false;
    	})
    }


    placeStation(idStation);

});

