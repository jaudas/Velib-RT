Stations.controller('MapCtrl', function($scope, $http,$routeParams) {
    var SERVEUR_URL = "https://api.jcdecaux.com/vls/v1/stations/";
    var KEY = "?contract=paris&apiKey=ab975d2ef885d1f727d9ec4f5fddde86881c077c"; // Clé personnelle permettant d'utiliser les jeux de données. 

    $scope.stationDetails = [];

    //Récupération de l'ID de la station via le routeParams, en fonction du lien d'accès
    var idStation = $routeParams.id;

    //initialisation de la carte
    $scope.map = {
        center : {
            latitude: 43,
            longitude: 4
        },
        coords: {
            latitude: 0,
            longitude: 0
        },
        zoom: 15,
        options: {
            disableDoubleClickZoom:true,
            draggableCursor:'move',
            draggingCursor:'auto',
            keyboardShortcuts:false,
            streetViewControl:false
        }
    };
    $scope.marker = {
        coords: {
            latitude: 0,
            longitude: 0
        },
    };

    //Positionnement de la station
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

            //Si la récupération de données aboutie alors initialise la carte avec les bonnes coordonnées
            $scope.map = {
                center : {
                    latitude: $scope.stationDetails.position.lat,
                    longitude: $scope.stationDetails.position.lng
                },
                coords: {
                    latitude: $scope.stationDetails.position.lat,
                    longitude: $scope.stationDetails.position.lng
                }
            };

            $scope.marker = {
                id : $scope.stationDetails.number,
                coords: {
                    latitude: $scope.stationDetails.position.lat,
                    longitude: $scope.stationDetails.position.lng
            }
        }
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

