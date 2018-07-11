﻿var EquipmentController = function ($rootScope, $scope, $http, $timeout, $compile, $uibModal, $location, NgMap, SignalService, userProfile, $routeParams, pollLoc) {

    
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
    $scope.SearchPollName = "";
    $scope.singleModel = '1';
    $scope.InfoWindow;
    $scope.ZonesAll=[];
    $scope.Role;// = userProfile.profile.Role;               
    $scope.sortType = 'Poll_Id'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';     // set the default search/filter term
    $scope.ZoneDefault =[ { id_zone: '0', zone: '', zone_Name: 'All', zone_Kml: 'null', zone_Active: '1' }];
   // $scope.mode = "Monday_Arrival";

    SignalService.initialize();


    $scope.config = [
        {
            name: 'Length',
            label: 'Locations',
            btnClass: ""
        },
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

    $scope.activeButton = 0;

    $scope.$watch(function () {
        return pollLoc.getGridMode();
    }, function () {
        $scope.Monday = pollLoc.getGridMode();
        console.log($scope.Monday);
    });
    
    $scope.setActive = function setActive(index) {
       //idName
         $scope.activeButton = index;
        //var bdgs = document.getElementsByClassName("badge");
        //var sel = document.getElementById(idName);
        //for (var i = 0; i < bdgs.length; i++)
        //{
        //    var current = document.getElementsByClassName("active");
        //    if (current.length > 0)
        //    {
        //        current[0].className = current[0].className.replace(" active", "");
        //        sel.className += " active";
        //    }           
            
        //}
        for (var i = 0; i < $scope.config.length; i++)
        $scope.config[i].btnClass = "";
        $scope.config[index].btnClass = 'active';
        $scope.mode = $scope.config[index].name;
        $scope.markerGen();
    };

    $rootScope.$on('updateList', function (updateList,loc) {
    //    $scope.populateForm();
        var status =
            [
                'Building_Open',
                'Close_Poll_Report',
                'Monday_Arrival',
                'Monday_Close',
                'Monday_Delivery',
                'Open_Ready',
                'Tuesday_Arrival'
            ]
        var polObj = []; 
         
        polObj.Building_Open        = loc.loc.Building_Open;
        polObj.Close_Poll_Report    = loc.loc.ClosePollReady;
        polObj.Monday_Arrival       = loc.loc.Monday_Arrival;
        polObj.Monday_Close         = loc.loc.Monday_Close;
        polObj.Monday_Delivery      = loc.loc.Monday_Delivery;
        polObj.Open_Ready           = loc.loc.OpenReady;     
        polObj.Poll_Address         = loc.loc.poll_Address;       
        polObj.Poll_Id              = loc.loc.poll_Id;
        polObj.Poll_Name            = loc.loc.poll_Name;      
        polObj.Tuesday_Arrival      = loc.loc.Tuesday_Arrival;     
        polObj.Zone                 = loc.loc.Zone;
        polObj.user_Name = loc.loc.user_Name;    

        var index = $scope.PollLoc.map(function (e) { return e.Poll_Id; }).indexOf(polObj.Poll_Id); 
        //var index = $scope.PollLoc.indexOf(loc.poll_Id);
        if (index > -1) {
            for (var i = 0; i < status.length; i++)
            {
                if (polObj[status[i]] === 0) {
                    polObj[status[i]] = 'warning'
                }
                else if (polObj[status[i]] === 1)
                {
                    polObj[status[i]] = 'primary'
                }
                else if (polObj[status[i]] === 2) {
                    polObj[status[i]] = 'success'
                }
                //if ($scope.PollLoc[index][status[i]] !== loc.loc[status[i]])
                //{
                     
                //    $scope.PollLoc[index][status[i]] = loc.loc[status[i]];
                //}
            }
            for (var i = 0; i < status.length; i++)
            {
                $scope.PollLoc[index][status[i]] = polObj[status[i]];
            }

           // $scope.PollLoc.splice(loc.loc, 1);
           // $scope.PollLoc.splice(index, 1, loc.loc);

          //  $scope.PollLoc[index] = loc.loc;

        }
// array = [2, 9]

    });

    $scope.clearText = function () {
        $scope.params.text = null;
    }

    // '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .


//$(window).on("load resize ", function() {
//    var scrollWidth = $('tbody').width() - $('tbody ').width();
//  $('thead').css({'padding-right':scrollWidth});
//}).resize();


    $scope.changeSort = function (name) {
        $scope.sortType = name; // set the default sort type
        $scope.sortReverse = !$scope.sortReverse;  // set the default sort order
        $scope.populateForm(); 
    }

    $scope.populateForm = function () {
        $scope.Role = userProfile.profile.Role;               
        pollLoc.getLocation().then(function (response) {
           
            for (var p in response) {
                var wardName = [];
                wardName = response[p].Ward_Name.split(',')
                $scope.wardNameFxd = [];
               // 

                $.each(wardName, function (i, el) {
                    if ($.inArray(el, $scope.wardNameFxd) === -1)
                        $scope.wardNameFxd.push(el);

                 //   console.log($scope.wardNameFxd);
                });
                response[p].Ward_Name = "";
              //  console.log($scope.wardNameFxd);
                
                response[p].Ward_Name = "".concat($scope.wardNameFxd);
            }
            //          
            //    for (var a = 0; a < wardName.length; a++)
            //    {
            //        if (wardName.length === 1)
            //        {
            //            $scope.wardNameFxd = wardName[a];
            //        }
            //        else if (wardName.length > 1)
            //        {
            //            if (wardName[a] !== wardName[a + 1] || a == wardName.length - 1)
            //            {                            
            //                //wardName.remove(e++);

            //                //This line concats over previously done one's
            //                //Should be clean up wardName and then write to response[p].wardName
            //                //response[p].Ward_Name = wardName[a];
            //                //$scope.wardNameFxd.concat(wardName[a]);
            //                $scope.wardNameFxd += wardName[a];
                               
            //                //wardName.splice(a, 1);
            //            }
            //            else
            //            {
            //                //response[p].Ward_Name.concat(wardName[a]);
            //                //  wardNameFxd.concat(wardName[a]);
            //                if (a == wardName.length-1)
            //                {
            //                    //$scope.wardNameFxd.concat(wardName[a]);
            //                    $scope.wardNameFxd += wardName[a];
            //                }
            //                wardName.splice(a, 1);
                                 
            //            }
            //        }
            //    }
            //    //else {
            //    //    response[p].Ward_Name = wardName[0];
            //    //}
            //response[p].Ward_Name = "";
            //response[p].Ward_Name.concat($scope.wardNameFxd);
            //}
           
            $scope.PollLoc = response;
           
        });
        if ($scope.ZonesAll != null || $scope.ZonesAll.length != 0)
        {       
            pollLoc.getZonesAll().then(function (response)
            { 
                $scope.ZonesAll = response; 
            })
         } 
        pollLoc.getPollDetails().then(function (response) {
            $scope.PollDlts = response;
            
        }) 
         
    } 

    $scope.toggleFun = function (toggleValue) {
        //  var url = $location.absUrl().split('!')[1];
        if (toggleValue) {
            //$location.path('/map');
            $scope.Monday = true;
          //  $scope.gridView = true;
        }
        else {
            // $location.path('/');
            $scope.Monday = false;
           // $scope.gridView = false;
      //      $scope.getMap();
            
            //$scope.InfoWindow.close();
        }
    } 

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
                    pollLoc.setzoneDefaults(response);
                });
            }
        }
        else if (x === 'Poll Details') {
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
        else {
            //$scope.Clicked = x;
            if (userProfile.getProfile().username != null)
            //if (userProfile.getProfile().username != null && !(e[$scope.Clicked] === 'success' && userProfile.getProfile().Role === 'Phone Operator'))
            {
                $scope.Clicked = x;

                //   if (e[$scope.Clicked] === 'success' && userProfile.getProfile().Role != 'Phone Operator')

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

                $scope.modalInstance.result.then(function (response) {
                    //console.log(e);
                    if (response === 'save') {
                        if (userProfile.getProfile().Role === 'Admin' || userProfile.getProfile().Role === 'Manager' ||
                            userProfile.getProfile().Role === 'Supervisor' || userProfile.getProfile().Role === 'Election Support' || userProfile.getProfile().Role === 'Zone Captains') {
                            //if (e.Monday_Delivery === "warning" && $scope.Clicked === "Monday_Delivery") {
                            //    e.Monday_Delivery = "success";
                            //}
                            if (e.Monday_Delivery === "success" && $scope.Clicked === "Monday_Delivery") {
                                e.Monday_Delivery = "warning";
                            }

                            else if (e.Building_Open === "warning" && $scope.Clicked === "Building_Open") {
                                e.Building_Open = "success";
                            }

                            //else if (e.Building_Open === "success" && $scope.Clicked === "Building_Open") {
                            //    e.Monday_Delivery = "warning";
                            //}
                            else if (e[$scope.Clicked] === "warning") {
                                e[$scope.Clicked] = "primary";
                            }
                            else if (e[$scope.Clicked] === "success" || e[$scope.Clicked] === "primary") {
                                e[$scope.Clicked] = "warning";
                            }


                            //if (e.Monday_Delivery === "warning" && $scope.Clicked === "Monday_Delivery") {
                            //    e.Monday_Delivery = "success";
                            //}
                            //else if (e.Monday_Delivery === "success" && $scope.Clicked === "Monday_Delivery") {
                            //    e.Monday_Delivery = "warning";
                            //}

                            //if (e.Monday_Arrival === "warning" && $scope.Clicked === "Monday_Arrival") {
                            //    e.Monday_Arrival = "primary";
                            //}
                            //else if ((e.Monday_Arrival === "success" || e.Monday_Arrival === "primary" )&& $scope.Clicked === "Monday_Arrival") {
                            //    e.Monday_Arrival = "warning";
                            //}

                            //if (e.Monday_Close === "warning" && $scope.Clicked === "Monday_Close") {
                            //    e.Monday_Close = "primary";
                            //}
                            //else if ((e.Monday_Close === "success" || e.Monday_Close === "primary" )&& $scope.Clicked === "Monday_Close") {
                            //    e.Monday_Close = "warning";
                            //}

                            //if (e.Building_Open === "warning" && $scope.Clicked === "Building_Open") {
                            //    e.Building_Open = "success";
                            //}
                            //else if (e.Building_Open === "success" && $scope.Clicked === "Building_Open") {
                            //    e.Building_Open = "warning";
                            //}

                            //if (e.Tuesday_Arrival === "warning" && $scope.Clicked === "Tuesday_Arrival") {
                            //    e.Tuesday_Arrival = "primary";
                            //}
                            //else if ((e.Tuesday_Arrival === "success" || e.Tuesday_Arrival === "primary" )&& $scope.Clicked === "Tuesday_Arrival") {
                            //    e.Tuesday_Arrival = "warning";
                            //}

                            //if (e.Open_Ready === "warning" && $scope.Clicked === "Open_Ready") {
                            //    e.Open_Ready = "primary";
                            //}
                            //else if ((e.Open_Ready === "success" || e.Open_Ready === "primary") && $scope.Clicked === "Open_Ready") {
                            //    e.Open_Ready = "warning";
                            //}

                            //if (e.Close_Poll_Report === "warning" && $scope.Clicked === "Close_Poll_Report") {
                            //    e.Close_Poll_Report = "primary";
                            //}
                            //else if ((e.Close_Poll_Report === "success" || e.Close_Poll_Report === "primary" ) && $scope.Clicked === "Close_Poll_Report") {
                            //    e.Close_Poll_Report = "warning";
                            //}
                        }
                        //************************************************************************************************************************************************************************************//
                        //*******************************************************************************Condition For Phone Operator*************************************************************************//
                        //************************************************************************************************************************************************************************************//
                        else if (userProfile.getProfile().Role === 'Phone Operator') {

                            if (e[$scope.Clicked] === "warning" || e[$scope.Clicked] === "primary") {
                                e[$scope.Clicked] = "success";
                            }
                            else if (e[$scope.Clicked] === "success") {
                                e[$scope.Clicked] = "warning";
                            }




                            //    if ((e.Monday_Delivery === "warning" || e.Monday_Delivery === "primary") && $scope.Clicked === "Monday_Delivery") {
                            //    e.Monday_Delivery = "success";
                            //}
                            //else if (e.Monday_Delivery === "success" && $scope.Clicked === "Monday_Delivery") {
                            //   // e.Monday_Delivery = "success";
                            //}

                            //    if ((e.Monday_Arrival === "warning" || e.Monday_Arrival === "primary" ) && $scope.Clicked === "Monday_Arrival") {
                            //    e.Monday_Arrival = "success";
                            //}
                            //else if (e.Monday_Arrival === "success" && $scope.Clicked === "Monday_Arrival") {
                            //    e.Monday_Arrival = "warning";
                            //}

                            //    if ((e.Monday_Close === "warning" || e.Monday_Close === "primary") && $scope.Clicked === "Monday_Close") {
                            //    e.Monday_Close = "success";
                            //}
                            //else if (e.Monday_Close === "success" && $scope.Clicked === "Monday_Close") {
                            //    e.Monday_Close = "warning";
                            //}

                            //if (e.Building_Open === "warning"  && $scope.Clicked === "Building_Open") {
                            //    e.Building_Open = "success";
                            //}
                            //else if (e.Building_Open === "success" && $scope.Clicked === "Building_Open") {
                            //    e.Building_Open = "warning";
                            //}

                            //if ((e.Tuesday_Arrival === "warning" || e.Tuesday_Arrival === "primary") && $scope.Clicked === "Tuesday_Arrival") {
                            //e.Tuesday_Arrival = "success";
                            //}
                            //else if (e.Tuesday_Arrival === "success" && $scope.Clicked === "Tuesday_Arrival") {
                            //    e.Tuesday_Arrival = "warning";
                            //}

                            //    if ((e.Open_Ready === "warning" || e.Open_Ready === "primary") && $scope.Clicked === "Open_Ready") {
                            //    e.Open_Ready = "success";
                            //}
                            //else if (e.Open_Ready === "success" && $scope.Clicked === "Open_Ready") {
                            //    e.Open_Ready = "warning";
                            //}

                            //if ((e.Close_Poll_Report === "warning" || e.Close_Poll_Report === "primary" )&& $scope.Clicked === "Close_Poll_Report") {
                            //    e.Close_Poll_Report = "success";
                            //}
                            //else if (e.Close_Poll_Report === "success" && $scope.Clicked === "Close_Poll_Report") {
                            //    e.Close_Poll_Report = "warning";
                            //}
                            //}
                            //if (e.Monday_Delivery === "warning" && $scope.Clicked === "Monday_Delivery") {
                            //    e.Monday_Delivery = "success";
                            //}
                            //else if (e.Monday_Delivery === "success" && $scope.Clicked === "Monday_Delivery") {
                            //    e.Monday_Delivery = "warning";
                            //}

                            //if (e.Monday_Arrival === "warning" && $scope.Clicked === "Monday_Arrival") {
                            //    e.Monday_Arrival = "success";
                            //}
                            //else if (e.Monday_Arrival === "success" && $scope.Clicked === "Monday_Arrival") {
                            //    e.Monday_Arrival = "warning";
                            //}

                            //if (e.Monday_Close === "warning" && $scope.Clicked === "Monday_Close") {
                            //    e.Monday_Close = "success";
                            //}
                            //else if (e.Monday_Close === "success" && $scope.Clicked === "Monday_Close") {
                            //    e.Monday_Close = "warning";
                            //}

                            //if (e.Building_Open === "warning" && $scope.Clicked === "Building_Open") {
                            //    e.Building_Open = "success";
                            //}
                            //else if (e.Building_Open === "success" && $scope.Clicked === "Building_Open") {
                            //    e.Building_Open = "warning";
                            //}

                            //if (e.Tuesday_Arrival === "warning" && $scope.Clicked === "Tuesday_Arrival") {
                            //    e.Tuesday_Arrival = "success";
                            //}
                            //else if (e.Tuesday_Arrival === "success" && $scope.Clicked === "Tuesday_Arrival") {
                            //    e.Tuesday_Arrival = "warning";
                            //}

                            //if (e.Open_Ready === "warning" && $scope.Clicked === "Open_Ready") {
                            //    e.Open_Ready = "success";
                            //}
                            //else if (e.Open_Ready === "success" && $scope.Clicked === "Open_Ready") {
                            //    e.Open_Ready = "warning";
                            //}

                            //if (e.Close_Poll_Report === "warning" && $scope.Clicked === "Close_Poll_Report") {
                            //    e.Close_Poll_Report = "success";
                            //}
                            //else if (e.Close_Poll_Report === "success" && $scope.Clicked === "Close_Poll_Report") {
                            //    e.Close_Poll_Report = "warning";
                            //}
                            pollLoc.SubmitpollLocStat(e).then(function (response) {
                                //console.log(response);
                                //   $scope.populateForm();
                            })

                        }

                    }
                    else {

                    }
                });
            }

        }
    }

    $scope.selectZones = function ( p , k) {
        //console.log(k);
        p.featureData.infoWindowHtml = "";
        $scope.ZoneDefault = [k];
    }

    $scope.filterMakes = function () {
        $scope.ZoneDefault = pollLoc.getzoneDefaults()
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
                    else if (p.Zone == pollLoc.zonesSel[i].zone || p.zone == pollLoc.zonesSel[i].zone) {
                        return true;
                    }
                }
            }            
        };
    };
}
EquipmentController.$inject = ['$rootScope', '$scope', '$http', '$timeout','$compile', '$uibModal', '$location', 'NgMap', 'SignalService', 'userProfile', '$routeParams', 'pollLoc'];

 