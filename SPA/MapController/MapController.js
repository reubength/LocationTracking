﻿var MapController = function ($rootScope, $scope, $http, $timeout, $compile, $uibModal, $location, NgMap, SignalService, userProfile, $routeParams, pollLoc) {

     
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
    $scope.ZonesAll = [];

    $scope.sortType = 'Poll_Id'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';     // set the default search/filter term
    $scope.ZoneDefault = [{ id_zone: '0', zone: '', zone_Name: 'All', zone_Kml: 'null', zone_Active: '1' }];
    $scope.mode = "Monday_Arrival";

    SignalService.initialize();

    $scope.$watch(function () {
        return pollLoc.getMapMode();
    }, function () {
        $scope.markerGen();
    });

    $scope.config = [
        {
            name: 'Length',
            label: 'Locations',
            count:'',
            btnClass: ""
        },
        {
            name: 'Monday_Delivery',
            label: 'Monday Delivery',
            count: '',
            btnClass: 'active'
        },
        {
            name: 'Monday_Arrival',
            label: 'Monday Arrival',
            count: '',
            btnClass: ''
        },
        {
            name: 'Monday_Close',
            label: 'Monday Close',
            count: '',
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
            count: '',
            btnClass: ""
        },
        {
            name: 'Open_Ready',
            label: 'Open And Ready',
            count: '',
            btnClass: ""
        },
        {
            name: 'Close_Poll_Report',
            label: 'Close Poll Report',
            count: '',
            btnClass: ""
        }
    ];

    $scope.activeButton = 0;

    //$scope.setActive = function setActive(index) {
    //    //idName
    //    $scope.activeButton = index;
    //    //var bdgs = document.getElementsByClassName("badge");
    //    //var sel = document.getElementById(idName);
    //    //for (var i = 0; i < bdgs.length; i++)
    //    //{
    //    //    var current = document.getElementsByClassName("active");
    //    //    if (current.length > 0)
    //    //    {
    //    //        current[0].className = current[0].className.replace(" active", "");
    //    //        sel.className += " active";
    //    //    }           

    //    //}
    //    for (var i = 0; i < $scope.config.length; i++)
    //        $scope.config[i].btnClass = "";
    //    $scope.config[index].btnClass = 'active';

    //    $scope.mode = $scope.config[index].name;
    //    $scope.markerGen();
    //};

    $rootScope.$on('updateList', function () {
        $scope.populateForm();

    });


    $scope.populateForm = function () {
        pollLoc.getLocation().then(function (response) {
            $scope.PollLoc = response; 
                $scope.markerGen(); 
        });
        
            //pollLoc.getZonesAll().then(function (response) {

            //    $scope.ZonesAll = response;
                
            //    //if ($scope.map.kmlLayers == null) {
                    
            //        $scope.LoadKmlFil();
            //        //console.log($scope.map.kmlLayers);
            //    //}
            //})
        
        //console.log($scope.sortType);
        // $scope.getMap();
        pollLoc.getPollDetails().then(function (response) {
            $scope.PollDlts = response;
            //console.log($scope.PollDlts);
        })

    }

    $scope.getMap = function () {
        NgMap.getMap().then(function (map) {
            $scope.InfoWindow = new google.maps.InfoWindow({ pixelOffset: new google.maps.Size(0, -25) });
            $scope.map = map;
            $scope.populateForm();

            pollLoc.getZonesAll().then(function (response) {

                $scope.ZonesAll = response;

                //if ($scope.map.kmlLayers == null) {

                $scope.LoadKmlFil();
                //console.log($scope.map.kmlLayers);
                //}
            })

            $scope.loadMapState();


            google.maps.event.addListener(map, 'tilesloaded', tilesLoaded);
            function tilesLoaded() {
                google.maps.event.clearListeners($scope.map, 'tilesloaded');
                google.maps.event.addListener($scope.map, 'zoom_changed', saveMapState);
                google.maps.event.addListener($scope.map, 'dragend', saveMapState);
            }


            //new google.maps.KmlLayer( { suppressInfoWindows: true, preserveViewport: false, map: $scope.map })

        }, function errorCallback(response) {
            console.log("Nothing to see here...");
        });
    };
    function saveMapState() {
        $scope.mapZoom = $scope.map.getZoom();
        $scope.mapCentre = $scope.map.getCenter();
        $scope.mapLat = $scope.mapCentre.lat();
        $scope.mapLng = $scope.mapCentre.lng();
        $scope.cookiestring = $scope.mapLat + "_" + $scope.mapLng + "_" + $scope.mapZoom;
        $scope.setCookie("myMapCookie", $scope.cookiestring, 30);
    }

    $scope.loadMapState = function () {
        $scope.gotCookieString = $scope.getCookie("myMapCookie");
        $scope.splitStr = $scope.gotCookieString.split("_");
        $scope.savedMapLat = parseFloat($scope.splitStr[0]);
        $scope.savedMapLng = parseFloat($scope.splitStr[1]);
        $scope.savedMapZoom = parseFloat($scope.splitStr[2]);
        //  console.log($scope.map);
        if ((!isNaN($scope.savedMapLat)) && (!isNaN($scope.savedMapLng)) && (!isNaN($scope.savedMapZoom))) {
            $scope.map.setCenter(new google.maps.LatLng($scope.savedMapLat, $scope.savedMapLng));
            $scope.map.setZoom($scope.savedMapZoom);
        }
    }
    $scope.setCookie = function (c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }

    $scope.getCookie = function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
        return "";
    }

    $scope.LoadKmlFil = function () {
        //if ($scope.map.kmlLayers == null)
        //{
        //   console.log("kmlLayer");


        // var src = "http://electionchief.com/filestore/wp-content/uploads/2018/03/";
        var src = "http://cuyahogaelectionaudits.com/downloads/";
        var name = "";

        for (var z = 0; z < $scope.ZonesAll.length; z++) {
            $scope.ZonesAll[z].zone_Kml = src + $scope.ZonesAll[z].zone_Name + ".KML";
            //$scope.kmlFiles.push({ Zone: $scope.ZonesAll[z].zone_Name, kmlSrc: src + $scope.ZonesAll[z].zone_Name + ".KML" })
            // name = $scope.kmlFiles[z].Zone;
            //$scope.dynamicKML[z] = new google.maps.KmlLayer($scope.kmlFiles[z].kmlSrc, { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });

            //google.maps.event.addListener($scope.dynamicKML[z], 'click', function (name) {
            //new google.maps.KmlLayer( { suppressInfoWindows: true, preserveViewport: false, map: $scope.map });
            //});
        }

        //  }

        //google.maps.event.addListener($scope.kmlLayer1, 'click', function (kmlEvent1) {
        //    var text = kmlEvent1.featureData.snippet;
        //    alert(text);
        //});
    }

    $scope.markerGen = function () {
        $scope.dynMarkers = [];
        $scope.mode = pollLoc.getMapMode();
        if ($scope.mode == null)
        {
            $scope.mode = 'Monday_Delivery';
        }

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
            else if ($scope.PollLoc[k][$scope.mode] === "warning") {
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
    $scope.showDetail = function (e, p) {
        $scope.Location = p;
        // console.log(d);
        //console.log($scope.InfoWindow);
        var center = new google.maps.LatLng($scope.Location.lat, $scope.Location.lng);
        $scope.InfoWindow.setPosition(center);
        var content = '<div id="iw-container" ng-controller="EquipmentController" ng-click="clicked(d) ">' +
            '<div class="iw-title">' + $scope.Location.title + '</div>' +
            '<div class="iw-content">' +
            '<div class="iw-subTitle" ">' + $scope.Location.ward + $scope.Location.Precinct + '</div>' +
            '<img class="iw-image" src="http://locationtracking.electionchief.com/PollLocImgs/' + $scope.Location.Id + '.jpg"   alt="' + $scope.Location.title + '" >' +
            //'<p>' + $scope.Location.Id + '</p>' +  
            '<h5>Contact Information</h5>' +
            '<div>' +
            '<ul>' +
            '<li ng-repeat="pd in PollDlts | filter:  Location.Id" class="iw-subTitle" >' +
            '<label class="iw_label">{{pd.contact_FirstName}} {{pd.contact_LastName}} :</label>' +
            '{{pd.contact_Info}}({{pd.contact_Type}}) ' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="iw-bottom-gradient"></div>' +
            '</div>';
        var el = $compile(content)($scope);
        $scope.$apply();
        $scope.items = el.html();
        $scope.InfoWindow.setContent($scope.items);
        // onerror="this.src = "http://locationtracking.electionchief.com/PollLocImgs/noImage.jpg"" 
        //$scope.map.showInfoWindow('foo-iw', p);
        //var pos = new google.maps.LatLng( p.lat, p.lng);         
        //$scope.map.showInfoWindow.setPostion(pos);
        //console.log($scope.map);
        //console.log(p);
        $scope.InfoWindow.open($scope.map);
        //$scope.map.showInfoWindow('foo-iw', $scope.HydranLoc1.id);
    };

    $scope.openModal = function (e, x) {
        if (x === 'Zone') {
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
                   // $scope.ZoneDefault = response;
                    pollLoc.setzoneDefaults(response);
                });
            }
        }
        //else if (x === 'Poll Details') {
        //    if (userProfile.getProfile().username != null) {
        //        $scope.Clicked = x;
        //        $scope.modalInstance = $uibModal.open({
        //            ariaLabelledBy: 'modal-title',
        //            ariaDescribedBy: 'modal-body',
        //            templateUrl: 'SPA/Template/modalPollDetails.html',
        //            controller: 'modalController',
        //            controllerAs: '$ctrl',

        //            size: 'lg',
        //            resolve:
        //            {
        //                x: function () {
        //                    return x;
        //                },
        //                address: function () {
        //                    return e;
        //                }
        //            }
        //        });
        //        $scope.modalInstance.result.then(function (response) {
        //            //   console.log(response);
        //            //$scope.ZoneDefault = response;
        //        });
        //    }
        //}
        //else {
        //    if (userProfile.getProfile().username != null) {
        //        $scope.Clicked = x;
        //        $scope.modalInstance = $uibModal.open({
        //            ariaLabelledBy: 'modal-title',
        //            ariaDescribedBy: 'modal-body',
        //            templateUrl: 'SPA/Template/modalWindow.html',
        //            controller: 'modalController',
        //            backdrop: false,
        //            controllerAs: '$ctrl',
        //            size: 'lg',
        //            resolve:
        //            {
        //                x: function () {
        //                    return x;
        //                },
        //                address: function () {
        //                    return e;
        //                }
        //            }
        //        });

                //$scope.modalInstance.result.then(function (response) {
                //    console.log(e);
                //    if (response === 'save') {
                //        if (e.Monday_Delivery === "warning" && $scope.Clicked === "Monday_Delivery") {
                //            e.Monday_Delivery = "success";
                //        }
                //        else if (e.Monday_Delivery === "success" && $scope.Clicked === "Monday_Delivery") {
                //            e.Monday_Delivery = "warning";
                //        }

                //        if (e.Monday_Arrival === "warning" && $scope.Clicked === "Monday_Arrival") {
                //            e.Monday_Arrival = "success";
                //        }
                //        else if (e.Monday_Arrival === "success" && $scope.Clicked === "Monday_Arrival") {
                //            e.Monday_Arrival = "warning";
                //        }

                //        if (e.Monday_Close === "warning" && $scope.Clicked === "Monday_Close") {
                //            e.Monday_Close = "success";
                //        }
                //        else if (e.Monday_Close === "success" && $scope.Clicked === "Monday_Close") {
                //            e.Monday_Close = "warning";
                //        }

                //        if (e.Building_Open === "warning" && $scope.Clicked === "Building_Open") {
                //            e.Building_Open = "success";
                //        }
                //        else if (e.Building_Open === "success" && $scope.Clicked === "Building_Open") {
                //            e.Building_Open = "warning";
                //        }

                //        if (e.Tuesday_Arrival === "warning" && $scope.Clicked === "Tuesday_Arrival") {
                //            e.Tuesday_Arrival = "success";
                //        }
                //        else if (e.Tuesday_Arrival === "success" && $scope.Clicked === "Tuesday_Arrival") {
                //            e.Tuesday_Arrival = "warning";
                //        }

                //        if (e.Open_Ready === "warning" && $scope.Clicked === "Open_Ready") {
                //            e.Open_Ready = "success";
                //        }
                //        else if (e.Open_Ready === "success" && $scope.Clicked === "Open_Ready") {
                //            e.Open_Ready = "warning";
                //        }

                //        if (e.Close_Poll_Report === "warning" && $scope.Clicked === "Close_Poll_Report") {
                //            e.Close_Poll_Report = "success";
                //        }
                //        else if (e.Close_Poll_Report === "success" && $scope.Clicked === "Close_Poll_Report") {
                //            e.Close_Poll_Report = "warning";
                //        }
                //        pollLoc.SubmitpollLocStat(e).then(function (response) {
                //            console.log(response);
                //            $scope.populateForm();
                //        })

                //    }


                //});
            //}
            else {

            }
        }
        
    $scope.selectZones = function (p, k) {
        console.log(k);
        p.featureData.infoWindowHtml = "";
        pollLoc.setzoneDefaults([k]);
    }



    $scope.changeView = function () {
        var url = $location.absUrl().split('!')[1];
        if (url === '/mapView') {
            $location.path('/grid');
        }
        else if (url === '/grid') {
            $location.path('/mapView');
        }
    } 

    //$scope.filterBadges = function ()
    //{
    //    for (var i = 0; i < $scope.pollLoc.length; i++)
    //    {

    //    }
    //    //$scope.config = [
    //    //    {
    //    //        name: 'Length',
    //    //        label: 'Locations',
    //    //        btnClass: ""
    //    //    }
    //    return function (p)
    //    {
    //        if ($scope.ZoneDefault.length === 0) {
    //            return true;
    //        }
    //        else {
    //            for (var i in $scope.ZoneDefault) {
    //                if ($scope.ZoneDefault[i].zone === '') {
    //                    return true;
    //                }
    //                else if (p.Zone == $scope.ZoneDefault[i].zone || p.zone == $scope.ZoneDefault[i].zone) {
    //                    return true;
    //                }
    //            }
    //        }

    //    }
    //}
    $scope.filterMakes = function () {
        $scope.ZoneDefault = pollLoc.getzoneDefaults()
        return function (p) {
            if ($scope.ZoneDefault.length === 0) {
                return true;
            }
            else {
                for (var i in $scope.ZoneDefault) {
                    if ($scope.ZoneDefault[i].zone === '') {
                        return true;
                    }
                    else if (p.Zone == $scope.ZoneDefault[i].zone || p.zone == $scope.ZoneDefault[i].zone) {
                        return true;
                    }
                }
            }
        };
    };

}
MapController.$inject = ['$rootScope', '$scope', '$http', '$timeout', '$compile', '$uibModal', '$location', 'NgMap', 'SignalService', 'userProfile', '$routeParams', 'pollLoc'];