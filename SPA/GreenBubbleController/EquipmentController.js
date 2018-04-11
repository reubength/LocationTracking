var EquipmentController = function ($rootScope, $scope, $http, $timeout, $compile, $uibModal, $location, NgMap, SignalService, userProfile, $routeParams, pollLoc) {

    $scope.gridView = false;
    $scope.Monday = true;
    $scope.toggleValue = true;
    $scope.showPane = false;
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

    $scope.kmlFiles = [];
    $scope.dynamicKML = [];

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


    $scope.config = [
        //{
        //    name: 'Length',
        //    label: 'Locations',
        //    btnClass: ""
        //},
        {
            name: 'Monday_Delivery',
            label: 'Monday Delivery',
            btnClass: 'active'
        },
        {
            name: 'Monday_Arrival',
            label: 'Monday Arrival',
            btnClass: ''
        },
        {
            name: 'Monday_Close',
            label: 'Monday Close',
            btnClass: ""
        },
        {
            name: 'Building_Open',
            label: 'Building Open',
            btnClass: ""
        },
        {
            name: 'Tuesday_Arrival',
            label: 'Tuesday Arrival',
            btnClass: ""
        },
        {
            name: 'Open_Ready',
            label: 'Open And Ready',
            btnClass: ""
        },
        {
            name: 'Close_Poll_Report',
            label: 'Close Poll Report',
            btnClass: ""
        }
    ];

    $scope.setActive = function setActive(idName) {
        // $scope.activeButton = index;
        var bdgs = document.getElementsByClassName("badge");
        var sel = document.getElementById(idName);
        for (var i = 0; i < bdgs.length; i++)
        {
            var current = document.getElementsByClassName("active");
            if (current.length > 0)
            {
                current[0].className = current[0].className.replace(" active", "");
                sel.className += " active";
            }           
            
        }
        //for (var i = 0; i < $scope.config.length; i++)
        //    $scope.config[i].btnClass = "";
        //$scope.config[index].btnClass = 'active';
        $scope.mode = idName;
        $scope.markerGen();
    };

    $rootScope.$on('updateList', function () {
        $scope.populateForm();

    });

    $scope.activeButton = 0;
    
    $scope.changeSort = function (name) {
        $scope.sortType = name; // set the default sort type
        $scope.sortReverse = !$scope.sortReverse;  // set the default sort order
        $scope.populateForm(); 
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
            $scope.LoadKmlFil();
        })

        console.log($scope.sortType);
        // $scope.getMap();

    }
    $scope.getMap = function () {
        ///marker_green.png'       

       

        NgMap.getMap().then(function (map) {
            //$scope.marpOptions = {
              
            //    disableDoubleClickZoom: true; // <---
                    
            //};
            $scope.InfoWindow = new google.maps.InfoWindow({ pixelOffset: new google.maps.Size(0, -25) });
            $scope.map = map;
            
            $scope.populateForm();

            //new google.maps.KmlLayer( { suppressInfoWindows: true, preserveViewport: false, map: $scope.map })
            //$scope.markerGen(); 
           
            //   google.maps.event.trigger(map, 'resize');

        }, function errorCallback(response) {

            console.log("Nothing to see here...");

        });

    };
    $scope.LoadKmlFil = function () {
       // var src = "http://electionchief.com/filestore/wp-content/uploads/2018/03/";
        var src = "http://cuyahogaelectionaudits.com/downloads/";
        var name = "";
         
        for (var z = 0; z < $scope.ZonesAll.length;z++)
        {
            $scope.ZonesAll[z].zone_Kml = src + $scope.ZonesAll[z].zone_Name + ".KML";
            //$scope.kmlFiles.push({ Zone: $scope.ZonesAll[z].zone_Name, kmlSrc: src + $scope.ZonesAll[z].zone_Name + ".KML" })
           // name = $scope.kmlFiles[z].Zone;
            //$scope.dynamicKML[z] = new google.maps.KmlLayer($scope.kmlFiles[z].kmlSrc, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });

            //google.maps.event.addListener($scope.dynamicKML[z], 'click', function (name) {
            
            //});
        }
        
        //$scope.kmlLayer1 = new google.maps.KmlLayer($scope.Kmlsrc1, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });
        //google.maps.event.addListener($scope.kmlLayer1, 'click', function (kmlEvent1) {
        //    var text = kmlEvent1.featureData.snippet;
        //    alert(text);
        //});
         


    } 

    $scope.markerGen = function () {
        $scope.dynMarkers = [];
   
        $scope.i = 0;
        for (var k in $scope.PollLoc) {
            //if ($scope.mode === "Length")
            //{
            //    $scope.mode == 'Monday_Delivery';
            //}
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
                    Precinct: $scope.PollLoc[k].Precinct,
                    Zone: $scope.PollLoc[k].Zone
                });
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
                    Precinct: $scope.PollLoc[k].Precinct,
                    Zone: $scope.PollLoc[k].Zone
                });
            }             
        }           
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
        //$scope.InfoWindow.close();
        //$scope.InfoWindow.event.addListener(clicked())
        //$scope.InfoWindow.setContent(
        //        );

        pollLoc.getPollDetails($scope.Location.Id).then(function (response) {
            $scope.PollDlts = response; 
            console.log($scope.PollDlts);
        })    


        var content = '<div id="iw-container" ng-controller="EquipmentController" ng-click="clicked(d) ">' +
            '<div class="iw-title">' + $scope.Location.title + '</div>' +
            '<div class="iw-content">' +
            '<div class="iw-subTitle" ">' + $scope.Location.ward + $scope.Location.Precinct + '</div>' +
           
            '<img src="http://locationtracking.electionchief.com/PollLocImgs/' + $scope.Location.Id + '.jpg"   alt="' + $scope.Location.title + '" height="115" width="83">' +
            '<p>' + $scope.Location.Id + '</p>' +            
            '<ul>' +           
            '<li ng-repeat="pd in PollDlts" class="iw-subTitle" >' +
            '<label>{{pd.contact_FirstName}} {{pd.contact_LastName}} :</label>' +
            '{{pd.contact_Type}} : {{pd.contact_Info}} '+
            '</li>'+
            '</ul>'+
            
            '<br>Phone... <br>e-mail: geral@vaa.pt' +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';
          var el = $compile(content)($scope);
            $scope.$apply();
            $scope.items = el.html();
            $scope.InfoWindow.setContent($scope.items);  
        // onerror="this.src = "http://locationtracking.electionchief.com/PollLocImgs/noImage.jpg""

            

        //$scope.InfoWindow = new google.maps.InfoWindow({
        //    content: content,

        //    // Assign a maximum value for the width of the infowindow allows
        //    // greater control over the various content elements
        //    minwidth: 325,
        //    maxWidth: 350
        //});
       
        //$scope.map.showInfoWindow('foo-iw', p);
        //var pos = new google.maps.LatLng( p.lat, p.lng);         
        //$scope.map.showInfoWindow.setPostion(pos);

        console.log($scope.map);
        console.log(p);
        $scope.InfoWindow.open($scope.map);

        //$scope.map.showInfoWindow('foo-iw', $scope.HydranLoc1.id);
    };

 
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
                    backdrop: false,
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
        else if (x === 'Poll Details')
        {
            if (userProfile.getProfile().username != null) {
                $scope.Clicked = x;
                $scope.modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'SPA/Template/modalPollDetails.html',
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
                $scope.modalInstance.result.then(function (response) {
                    //   console.log(response);
                    //$scope.ZoneDefault = response;
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
                    backdrop: false,
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

                    if (e.Monday_Delivery === "warning" && $scope.Clicked === "MondayDelivery") {
                         e.Monday_Delivery = "success";
                     }
                    else if (e.Monday_Delivery === "success" && $scope.Clicked === "MondayDelivery") {
                         e.Monday_Delivery = "warning";
                     }

                    if (e.Monday_Arrival === "warning" && $scope.Clicked === "MondayArrival") {
                        e.Monday_Arrival = "success";
                    }
                    else if (e.Monday_Arrival === "success" && $scope.Clicked === "MondayArrival") {
                        e.Monday_Arrival = "warning";
                    }

                    if (e.Monday_Close === "warning" && $scope.Clicked === "MondayClose") {
                        e.Monday_Close = "success";
                    }
                    else if (e.Monday_Close === "success" && $scope.Clicked === "MondayClose") {
                        e.Monday_Close = "warning";
                    }

                    if (e.Building_Open === "warning" && $scope.Clicked === "BuildingOpen") {
                        e.Building_Open = "success";
                    }
                    else if (e.Building_Open === "success" && $scope.Clicked === "BuildingOpen") {
                        e.Building_Open = "warning";
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

    $scope.selectZones = function ( p , k) {
        console.log(k);
        p.featureData.infoWindowHtml = "";

        $scope.ZoneDefault = [k];
    }

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
                    else if (p.Zone == $scope.ZoneDefault[i].zone || p.zone == $scope.ZoneDefault[i].zone) {
                        return true;
                    }
                }
            }            
        };
    };
    $scope.clickIfoPane = function (poll)
    {
        //console.log(poll);
        $scope.showPane = true;
        
       
    }      
}
EquipmentController.$inject = ['$rootScope', '$scope', '$http', '$timeout','$compile', '$uibModal', '$location', 'NgMap', 'SignalService', 'userProfile', '$routeParams', 'pollLoc'];

 