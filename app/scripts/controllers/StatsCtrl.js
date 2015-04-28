Stations.controller("StatsCtrl", function($scope, $http){

	var SERVEUR_URL = "https://api.jcdecaux.com/vls/v1/stations?contract=paris&apiKey=ab975d2ef885d1f727d9ec4f5fddde86881c077c"; // Clé personnelle permettant d'utiliser les jeux de données. 

	$scope.stations = [];
	$scope.isLoading = false;
	$scope.data = [];

	$scope.dataTauxRemplissage = [];

	var ctx = document.getElementById("BikesPerStations");


	function getStations()
	{
		console.info("getting stations");
		$scope.isLoading =true;
		$http.get(SERVEUR_URL)
		.success(function(data,status)
		{
			$scope.stations=data;
			$scope.status=status;
			$scope.isLoading = false;
			console.info($scope.stations.length)

			setDataStationSize();
			setDataDivers();
		})
		.error(function(data,status)
		{
			$scope.stations=data;
			console.error('unable to load stations'+ status);
			$scope.isLoading = false;
		})


	}

	function setDataStationSize(){
		

		var info50plus = {
			value : '0',
			color: '#3E2723',
			highlight : '#BF360C',
			label : "+ de 50 places"
		}

		var info4150 = {
			value : '0',
			color: '#5D4037',
			highlight : '#E64A19',
			label : "entre 41 et 50 places"
		}

		var info3140 = {
			value : '0',
			color: '#795548',
			highlight : '#FF5722',
			label : "entre 31 et 40 places"
		}

		var info2130 = {
			value : '0',
			color: '#A1887F',
			highlight : '#FF8A65',
			label : "entre 21 et 30 places"
		}

		var info1120 = {
			value : '0',
			color: '#D7CCC8',
			highlight : '#FFCCBC',
			label : "entre 11 et 20 places"
		}


		var info10moins = {
			value : '0',
			color: '#EFEBE9',
			highlight : '#FBE9E7',
			label : "- de 10 places"
		}


		$scope.data[0] = info50plus;
		$scope.data[1] = info4150;
		$scope.data[2] = info3140;
		$scope.data[3] = info2130;
		$scope.data[4] = info1120;
		$scope.data[5] = info10moins;

		console.info($scope.stations.length)



		for (var i = $scope.stations.length - 1; i >= 0; i--) {
			if($scope.stations[i].bike_stands > 50)
			{
				$scope.data[0].value ++;
			}

			else if($scope.stations[i].bike_stands > 40)
			{
				$scope.data[1].value ++;
			}

			else if($scope.stations[i].bike_stands > 30)
			{
				$scope.data[2].value ++;
			}

			else if($scope.stations[i].bike_stands > 20)
			{
				$scope.data[3].value ++;
			}

			else if($scope.stations[i].bike_stands > 10)
			{
				$scope.data[4].value ++;
			}
			else
			{
				$scope.data[5].value ++;
			}
		};


		ctx = $("#BikesPerStations").get(0).getContext("2d");

		var myPieChart = new Chart(ctx).Pie($scope.data,{animateScale: true});

	}

	function setDataDivers(){

		$scope.totalVelodispo = 0;
		$scope.totalPlaces = 0;
		$scope.pStationBonus = 0;
		$scope.pStationsBanking = 0;
		$scope.pStationsOuvertes = 0;

		for (var i = $scope.stations.length - 1; i >= 0; i--) {

			$scope.totalVelodispo = $scope.totalVelodispo + $scope.stations[i].available_bikes;
			$scope.totalPlaces =  $scope.totalPlaces + $scope.stations[i].bike_stands;


			if($scope.stations[i].bonus == true)
			{
				$scope.pStationBonus ++;
			}

			if($scope.stations[i].banking == true)
			{
				$scope.pStationsBanking ++;
			}


			if($scope.stations[i].status == 'OPEN')
			{
				$scope.pStationsOuvertes ++;
			}
		}

		$scope.pStationBonus = Math.trunc(100*$scope.pStationBonus/$scope.stations.length);
		$scope.pStationsBanking = Math.trunc(100*$scope.pStationsBanking/$scope.stations.length);
		$scope.pStationsOuvertes = Math.trunc(100*$scope.pStationsOuvertes/$scope.stations.length);


	}




	getStations();


});


