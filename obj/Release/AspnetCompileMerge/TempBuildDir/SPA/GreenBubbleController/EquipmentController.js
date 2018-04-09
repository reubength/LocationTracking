var EquipmentController = function ($rootScope, $scope, $http, $timeout, $uibModal, $location, NgMap, SignalService, userProfile, $routeParams, pollLoc) {

    $scope.gridView = false;
    $scope.Monday = true;
    $scope.toggleValue = true;
    $scope.Column = "";
    $scope.Kmlsrc1 = "http://locationtracking.electionchief.com/kml/Ward1.kml";
    //$scope.Kmlsrc1 = "http://cuyahogaelectionaudits.com/downloads/Ward1.KML";
    $scope.Kmlsrc2 = "http://cuyahogaelectionaudits.com/downloads/Ward2.KML";
    $scope.Kmlsrc3 = "http://cuyahogaelectionaudits.com/downloads/Ward3.KML";
    $scope.Kmlsrc4 = "http://cuyahogaelectionaudits.com/downloads/Ward4.KML";
    $scope.Kmlsrc5 = "http://cuyahogaelectionaudits.com/downloads/Ward5.KML";
    $scope.Kmlsrc6 = "http://cuyahogaelectionaudits.com/downloads/Ward6.KML";
    $scope.Kmlsrc7 = "http://cuyahogaelectionaudits.com/downloads/Ward7.KML";
    $scope.Kmlsrc8 = "http://cuyahogaelectionaudits.com/downloads/Ward8.KML";

    $scope.singleModel = '1';
    $scope.InfoWindow;
    //$scope.sortType = 'Ward_Name'; // set the default sort type
    //$scope.sortReverse = false;  // set the default sort order
    $scope.sortType = 'Poll_Id'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';     // set the default search/filter term
    $scope.ZoneDefault =[ { id_zone: '0', zone: '', zone_Name: 'All', zone_Kml: 'null', zone_Active: '1' }];
    $scope.mode = "Monday_Arrival";

    SignalService.initialize();


    $scope.config = [{
        name: 'Monday_Arrival',
        label: 'Monday Arrival',
        btnClass: 'active'
    }, {
        name: 'Tuesday_Arrival',
        label: 'Tuesday Arrival',
        btnClass: ""
    }, {
        name: 'Open_Ready',
        label: 'Open And Ready',
        btnClass: ""
    },
    {
        name: 'Close_Poll_Report',
        label: 'Close Poll Report',
        btnClass: ""
    }];


    $rootScope.$on('updateList', function () {
        $scope.populateForm();

    });

    $scope.activeButton = 0;

    $scope.setActive = function setActive(index) {
        $scope.activeButton = index;
        for (var i = 0; i < $scope.config.length; i++)
            $scope.config[i].btnClass = "";
        $scope.config[index].btnClass = 'active';
        $scope.mode = $scope.config[index].name;

        $scope.markerGen();


    };
    $scope.changeSort = function (name) {
        $scope.sortType = name; // set the default sort type
        $scope.sortReverse = !$scope.sortReverse;  // set the default sort order
        $scope.populateForm();

        // $scope.searchFish = '';    
    }

    $scope.populateForm = function () {
        pollLoc.getLocation().then(function (response) {
            $scope.PollLoc = response;

            var url = $location.absUrl().split('!')[1];
            if (url === '/mapView') {
                $scope.markerGen();
            }
        });

        pollLoc.getZonesAll().then(function (response) {

            $scope.ZonesAll = response;
        })

        console.log($scope.sortType);
        // $scope.getMap();

    }
    $scope.getMap = function () {
        ///marker_green.png'       

        NgMap.getMap().then(function (map) {
            $scope.InfoWindow = new google.maps.InfoWindow({ pixelOffset: new google.maps.Size(0, -25) });
            $scope.map = map;
            $scope.populateForm();
            //$scope.markerGen(); 
            $scope.LoadKmlFil();
            //   google.maps.event.trigger(map, 'resize');

        }, function errorCallback(response) {

            console.log("Nothing to see here...");

        });

    };
    $scope.LoadKmlFil = function () {

        //foreach(z in ZonesAll)
        //{
        //    kmlFiles.add()
        //}

        //$scope.kmlLayer1 = new google.maps.KmlLayer($scope.Kmlsrc1, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });
        //google.maps.event.addListener($scope.kmlLayer1, 'click', function (kmlEvent1) {
        //    var text = kmlEvent1.featureData.snippet;
        //    alert(text);
        //});
        //$scope.kmlLayer2 = new google.maps.KmlLayer($scope.Kmlsrc2, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });
        //google.maps.event.addListener($scope.kmlLayer2, 'click', function (kmlEvent2) {
        //    var text = kmlEvent2.featureData.snippet;
        //    alert(text);
        //});
        //$scope.kmlLayer3 = new google.maps.KmlLayer($scope.Kmlsrc3, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });
        //google.maps.event.addListener($scope.kmlLayer3, 'click', function (kmlEvent3) {
        //    var text = kmlEvent3.featureData.snippet;
        //    alert(text);
        //});
        //$scope.kmlLayer4 = new google.maps.KmlLayer($scope.Kmlsrc4, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });
        //google.maps.event.addListener($scope.kmlLayer4, 'click', function (kmlEvent4) {
        //    var text = kmlEvent4.featureData.snippet;
        //    alert(text);
        //}); $scope.kmlLayer5 = new google.maps.KmlLayer($scope.Kmlsrc5, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });
        //google.maps.event.addListener($scope.kmlLayer5, 'click', function (kmlEvent5) {
        //    var text = kmlEvent5.featureData.snippet;
        //    alert(text);
        //});
        //$scope.kmlLayer6 = new google.maps.KmlLayer($scope.Kmlsrc6, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });
        //google.maps.event.addListener($scope.kmlLayer6, 'click', function (kmlEvent6) {
        //    var text = kmlEvent6.featureData.snippet;
        //    alert(text);
        //});
        //$scope.kmlLayer7 = new google.maps.KmlLayer($scope.Kmlsrc7, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });
        //google.maps.event.addListener($scope.kmlLayer7, 'click', function (kmlEvent7) {
        //    var text = kmlEvent7.featureData.snippet;
        //    alert(text);
        //});
        //$scope.kmlLayer8 = new google.maps.KmlLayer($scope.Kmlsrc8, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });
        //google.maps.event.addListener($scope.kmlLayer8, 'click', function (kmlEvent8) {
        //    var text = kmlEvent8.featureData.snippet;
        //    alert(text);
        //});


    }
    //$scope.changeData = function () {
    //    $scope.selectData = $scope.mode;
    //    $scope.markerGen();

    //}

    $scope.markerGen = function () {
        $scope.dynMarkers = [];
        //if ($scope.dynMarkers.length > 0) {
        //    $scope.dynMarkers.setMap(null);
        //}

        //calls the populate method if the array is not already populated with data
        //if it is it accesses the existing data from the factory and reassigns it to the 
        //array for markerGen

        //if (pollLoc.pollLocs != null) {
        //    $scope.PollLoc = pollLoc.pollLocs;
        //}
        //else {
        //    pollLoc.getLocation().then(function (response) {
        //        $scope.PollLoc = response;
        //    })
        //}
        $scope.i = 0;
        for (var k in $scope.PollLoc) {

            //$timeout(function () {
            if ($scope.PollLoc[k][$scope.mode] === "success") {
                //$scope.dynMarkers[k] = new google.maps.Marker({ title: $scope.PollLoc[k].Poll_Name, icon: "images/marker_green.png" });
                $scope.dynMarkers.push({
                    title: $scope.PollLoc[k].Poll_Name,
                    icon: "images/marker_green.png",
                    Id: $scope.PollLoc[k].Poll_Id,
                    lng: $scope.PollLoc[k].longitude,
                    lat: $scope.PollLoc[k].latitude,
                    ward: $scope.PollLoc[k].Ward_Name,
                    Precinct: $scope.PollLoc[k].Precinct
                });

                //Close_Poll_Report :"warning"
                //Monday_Arrival:"warning"
                //Open_Ready:"success"
                //Poll_Address:"29230 WOLF ROAD"
                //Poll_Id:1050
                //Poll_Name:"BAY HIGH SCHOOL"
                //Precinct:" 3B"
                //Precinct_Id:0
                //Tuesday_Arrival:"success"
                //Ward_Name:"BAY VILLAGE "
                //Zone: 1
                //latitude:41.486846
                //longitude:-81.943349

            }
            else {
                //$scope.dynMarkers[k] = new google.maps.Marker({ title: $scope.PollLoc[k].Poll_Name, icon: "images/marker_yellow.png" });
                $scope.dynMarkers.push({
                    title: $scope.PollLoc[k].Poll_Name,
                    icon: "images/marker_yellow.png",
                    Id: $scope.PollLoc[k].Poll_Id,
                    lng: $scope.PollLoc[k].longitude,
                    lat: $scope.PollLoc[k].latitude,
                    ward: $scope.PollLoc[k].Ward_Name,
                    Precinct: $scope.PollLoc[k].Precinct
                });
            }
            //  $scope.i++;

            // }, $scope.i * 200); 
        }

        // var loc = new google.maps.LatLng($scope.PollLoc[k].latitude, $scope.PollLoc[k].longitude);
        //$scope.dynMarkers[k].setPosition(loc);
        //$scope.dynMarkers[k].setMap($scope.map);            
    }


    $scope.toggleFun = function (toggleValue) {
        //  var url = $location.absUrl().split('!')[1];
        if (toggleValue) {
            //$location.path('/map');
            $scope.Monday = true;
            $scope.gridView = true;
        }
        else {
            // $location.path('/');
            $scope.Monday = false;
            $scope.gridView = false;
            $scope.getMap();
            //google.maps.event.trigger($scope.map, 'resize');
            //$scope.InfoWindow.close();
        }
    }

    $scope.showDetail = function (e, p) {
        $scope.Location = p;
        // console.log(d);
        var center = new google.maps.LatLng($scope.Location.lat, $scope.Location.lng);
        $scope.InfoWindow.setPosition(center);
        $scope.InfoWindow.close();
        //$scope.InfoWindow.event.addListener(clicked())
        //$scope.InfoWindow.setContent(
        //        );


        var content = '<div id="iw-container"  ng-click="clicked(d) ">' +
            '<div class="iw-title">' + $scope.Location.title + '</div>' +
            '<div class="iw-content">' +
            '<div class="iw-subTitle" ">' + $scope.Location.ward + $scope.Location.Precinct + '</div>' +
            '<img src="http://locationtracking.electionchief.com/PollLocImgs/' + $scope.Location.Id + '.jpg" alt="' + $scope.Location + '" height="115" width="83">' +
            '<p>' + $scope.Location.Id + '</p>' +
            '<div class="iw-subTitle">PLM: </div>' +
            '<div class="iw-subTitle">Rover: </div>' +
            '<br>Phone... <br>e-mail: geral@vaa.pt' +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';
        $scope.InfoWindow.setContent(content);
        $scope.InfoWindow.open($scope.map);
        //$scope.map.showInfoWindow('foo-iw', $scope.HydranLoc1.id);
    };


    //$scope.PollLoc = {
    //   Poll_Id          : 0,
    //   Poll_Name        : "default",
    //   Poll_Address     : "default",
    //   Zone             : 0,
    //   Ward_Name        : "default",
    //   Precinct         : "default",
    //   Monday_Arrival   : "default",
    //   Tuesday_Arrival  : "default",
    //   Open_Ready       : "default",
    //   Close_Poll_Report: "default"

    //};

    //openModal(pl,'MondayArrival')
    $scope.openModal = function (e, x) {

        if (x ==='Zone')
        {
            if (userProfile.getProfile().username != null) {
                $scope.Clicked = x;
                $scope.modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'SPA/Template/modalWindowZones.html',
                    controller: 'modalController',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve:
                    {
                        x: function () {
                            return x;
                        },
                        address: function () {
                            return $scope.ZonesAll;
                        }
                    }
                });
                $scope.modalInstance.result.then(function (response) {
                 //   console.log(response);
                    $scope.ZoneDefault = response ;
                });
            }
        }
       
        else
        {
            if (userProfile.getProfile().username != null)
            {
                $scope.Clicked = x;
                $scope.modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'SPA/Template/modalWindow.html',
                    controller: 'modalController',
                    controllerAs: '$ctrl',
                    size: 'lg',
                    resolve:
                    {
                        x: function () {
                            return x;
                        },
                        address: function () {
                            return e;
                        }
                    }
                });
                $scope.modalInstance.result.then(function () {
                     console.log(e);


                    if (e.Monday_Arrival === "warning" && $scope.Clicked === "MondayArrival") {
                        e.Monday_Arrival = "success";
                    }
                    else if (e.Monday_Arrival === "success" && $scope.Clicked === "MondayArrival") {
                        e.Monday_Arrival = "warning";
                    }

                    if (e.Tuesday_Arrival === "warning" && $scope.Clicked === "TuesdayArrival") {
                        e.Tuesday_Arrival = "success";
                    }
                    else if (e.Tuesday_Arrival === "success" && $scope.Clicked === "TuesdayArrival") {
                        e.Tuesday_Arrival = "warning";
                    }

                    if (e.Open_Ready === "warning" && $scope.Clicked === "OpenReady") {
                        e.Open_Ready = "success";
                    }
                    else if (e.Open_Ready === "success" && $scope.Clicked === "OpenReady") {
                        e.Open_Ready = "warning";
                    }

                    if (e.Close_Poll_Report === "warning" && $scope.Clicked === "ClosePollReport") {
                        e.Close_Poll_Report = "success";
                    }
                    else if (e.Close_Poll_Report === "success" && $scope.Clicked === "ClosePollReport") {
                        e.Close_Poll_Report = "warning";
                    }
                    pollLoc.SubmitpollLocStat(e).then(function (response) {
                        console.log(response);
                        $scope.populateForm();
                    })

                    // console.log('Modal dismissed at: ' + new Date());
                });
            }
            else
            {


            }
        }
       

    }

    //$scope.filterCells = function (v) {
    //    return v > 5.0 ? 'mouseenter' : 'none';
    //};

    $scope.changeView = function ()
    {
        var url = $location.absUrl().split('!')[1];
        if (url === '/mapView') {      
            $location.path('/grid');
        }
        else if (url === '/grid'){
            $location.path('/mapView');
        }
    }

     

    //$scope.showContextData = function () {
    //    //0:Sunday
    //    //1:Monday
    //    //2:Tuesday
    //    //3:Wednesday
    //    //4:Thursday
    //    //5:Friday
    //    //6:Saturday
    //    var day = (new Date()).getDay();              
    //    var item = new Date();


    //}

    $scope.filterMakes = function () {
        return function (p) {
            if ($scope.ZoneDefault.length === 0)
            {
                return true;
            }
            else
            {
                for (var i in $scope.ZoneDefault)
                {
                    if ($scope.ZoneDefault[i].zone === '')
                    {
                        return true;
                    }
                    else if (p.Zone ==   $scope.ZoneDefault[i].zone) {
                        return true;
                    }
                }
            }
            
        };
    };



   
}
EquipmentController.$inject = ['$rootScope', '$scope', '$http', '$timeout', '$uibModal', '$location', 'NgMap', 'SignalService', 'userProfile', '$routeParams', 'pollLoc'];

//$(function () {
//    $(".repeatpopover").popover({
//        trigger: "hover"
//    });
//});