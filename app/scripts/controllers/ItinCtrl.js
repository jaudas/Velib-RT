Stations.controller('ItinCtrl', function($scope, $http,$routeParams) {
	var SERVEUR_URL = "https://api.jcdecaux.com/vls/v1/stations/";
	var KEY = "?contract=paris&apiKey=ab975d2ef885d1f727d9ec4f5fddde86881c077c"; // Clé personnelle permettant d'utiliser les jeux de données. 

	$scope.stationDepart = [];
    $scope.stationArrivee = [];

    //Identification des identifiants des stations via le routeprovider
    var idDepart = $routeParams.idDepart;
    var idArrivee = $routeParams.idArrivee;

    var latMoyenne = 0;
    var lngMoyenne = 0;

    //Initialisation de la carte et des markers
    $scope.map = {
        center : {
            //Centrer au centre de paris pour l'initialisation (musée du louvre)
            latitude: 48.860294,
            longitude: 2.338629
        },
        coords: {
            latitude: 0,
            longitude: 0
        },
        zoom: 12,
        options: {
            disableDoubleClickZoom:true,
            draggableCursor:'move',
            draggingCursor:'auto',
            keyboardShortcuts:false,
            streetViewControl:false
        }
    };
    $scope.marker1 = {
        coords: {
            latitude: 0,
            longitude: 0
        },
    };
    $scope.marker2 = {
        coords: {
            latitude: 0,
            longitude: 0
        },
    };

    function setStationsItineraire()
    {

        //Récupération de la station de départ
        console.info("getting station depart for direction");
        $scope.isLoading =true;
        $http.get(SERVEUR_URL+idDepart+KEY)
        .success(function(data,status)
        {
            $scope.stationDepart=data;
            $scope.status=status;
            $scope.isLoading = false;

            $scope.marker1 = {
                id : $scope.stationDepart.number,
                coords: {
                    latitude: $scope.stationDepart.position.lat,
                    longitude: $scope.stationDepart.position.lng
                }
            }
            console.info($scope.marker1.coords);

            //Mise à jour du center des deux stations
            lngMoyenne =  $scope.marker1.coords.longitude;
            latMoyenne =  $scope.marker1.coords.latitude;

            console.info(latMoyenne, lngMoyenne);


        })
        .error(function(data,status)
        {
            //permet de notifier à l'utilisateur une station non existante ou non trouvée
            $scope.stationDepart.name='Station inexistante';
            console.error('unable to load stations'+ status);
            $scope.isLoading = false;


        })

        //Récupération de la station d'arrivée
        console.info("getting station arrivee for direction");
        $scope.isLoading = true;
        $http.get(SERVEUR_URL+idArrivee+KEY)
        .success(function(data,status)
        {
            $scope.stationArrivee=data;
            $scope.status=status;
            $scope.isLoading = false;

            $scope.marker2 = {
                id : $scope.stationArrivee.number,
                coords: {
                    latitude: $scope.stationArrivee.position.lat,
                    longitude: $scope.stationArrivee.position.lng

                }
            }

            

            lngMoyenne = (lngMoyenne + $scope.marker2.coords.longitude)/2;
            latMoyenne = (latMoyenne + $scope.marker2.coords.latitude)/2;

            $scope.map = {
                center : {
                    //Centrer au milieu des deux markers
                    latitude: latMoyenne,
                    longitude: lngMoyenne
                },

                coords: {
                    latitude: latMoyenne,
                    longitude: lngMoyenne
                },
                zoom: 12
            };
        })
        .error(function(data,status)
        {
            //permet de notifier à l'utilisateur une station non existante ou non trouvée
            $scope.stationArrivee.name='Station inexistante';
            console.error('unable to load stations'+ status);
            $scope.isLoading = false;
        })


    }

    setStationsItineraire();



});

