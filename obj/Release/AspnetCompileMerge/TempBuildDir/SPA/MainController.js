var MainController = function ($scope,$uibModal, $location, pollLoc, userProfile)
{
    $scope.ZoneDefault = [{ id_zone: '0', zone: '', zone_Name: 'All', zone_Kml: 'null', zone_Active: '1' }];
    $scope.gridView = true;
    $scope.visible = true;
    $scope.locCountInfo = [];
    $scope.locSummInfo = [];
    $scope.PollDltsSumm = [];

    //$scope.$on('$routeChangeStart', function ($event, next, current) {
        
    //});

    $scope.DaySelect = function ()
    {
        pollLoc.getDay();
        $scope.setActive(pollLoc.getMapMode());
    }

    $scope.$on('$routeChangeStart', function ($event, next, current) {
        console.log(next.originalPath);
         
        if (next.originalPath === '/mapView' || next.originalPath === '/grid')
        {
            $scope.infoTop = true;
        }
        else
        {
                //$location.path('/mapView');
            $scope.infoTop = false;
        } 
         
    });

    $scope.$watch(function () {
            return userProfile.getProfile().username;
        }, function () {
            if (userProfile.getProfile().username === null)
            {
                $scope.loggedin = false;
                $scope.Role = userProfile.profile.Role;               
                $location.path('/login');
            }
            else
            {
                $scope.isLoggedIn();
                $scope.Role = userProfile.profile.Role;
               // console.log($scope.Role);
            }
        });
    $scope.$watch(function () {
        return pollLoc.getPollLocs();
    }, function () { 
        $scope.filterBdgs();
    });

    $scope.$watch(function () {
        return pollLoc.getzoneDefaults() ;
    }, function () { 
        $scope.filterBdgs();
    });    
    
        $scope.logout = function ()
        {
            userProfile.logOut();
            $location.path('/login');
        };

        $scope.login = function ()
        {
            userProfile.logOut(); 
        };

        $scope.isLoggedIn = function () {
            $scope.profile = userProfile.getProfile();
            if ($scope.profile.username !== null) {
                $scope.loggedin = true;
                $scope.username = userProfile.getProfile().username;
            }
        };
        $scope.register = function () {

            $location.path('/Register');
        };
        $scope.filterBdgs = function ()
        {
            $scope.locCountInfo = []; 
            $scope.ZoneDefault = pollLoc.getzoneDefaults();
            //console.log($scope.ZoneDefault);
            if (pollLoc.pollLocs != null) { 

                if ($scope.ZoneDefault.length === 0) {
                    $scope.locCountInfo=pollLoc.pollLocs; 
                }
                else
                {
                    if (pollLoc.pollLocs.length != 0)
                    {
                        for (var i= 0; i < pollLoc.pollLocs.length;i++)
                        { 
                            for (var j in pollLoc.zonesSel) {
                                if ($scope.ZoneDefault[j].zone === '') 
                                {
                                    $scope.locCountInfo.push(pollLoc.pollLocs[i]); 
                                }
                                else if (pollLoc.pollLocs[i].Zone == $scope.ZoneDefault[j].zone)
                                {
                                    $scope.locCountInfo.push( pollLoc.pollLocs[i]); 
                                }
                            }  
                        }
                    }    
                }
            }

            $scope.populateSummRpt();
           
        }
        $scope.populateSummRpt = function ()
        {
            $scope.locSummInfo = [];
            if (pollLoc.mode === undefined)
            {
                pollLoc.setMapMode('Monday_Delivery');
            }

               // pollLoc.setMapMode('Monday_Delivery');

            for (var n in $scope.locCountInfo) {

                if ($scope.locCountInfo[n][pollLoc.getMapMode()] === "warning")
                    $scope.locSummInfo.push($scope.locCountInfo[n]);
            }

            $scope.pollDlts = pollLoc.getpolldtls();
            for (var i in $scope.locSummInfo) {
                $scope.locSummInfo[i].summ = [];
                for (j in $scope.pollDlts) {

                    if ($scope.locSummInfo[i].Poll_Id === $scope.pollDlts[j].poll_Id) {

                        $scope.locSummInfo[i].summ.push($scope.pollDlts[j]);
                    }
                }

            }
           // console.log($scope.locSummInfo);
        }
        $scope.activeButton = 0; 
        $scope.setActive = function setActive (index) {
            //idName
            var url = $location.absUrl().split('!')[1]; 
            if (url === '/mapView')
            {
                $scope.visible = true;
                $scope.activeButton = index;
                var bdgs = document.getElementsByClassName("badge");
                var sel = document.getElementById(index);
                for (var i = 0; i < bdgs.length; i++) {
                    var current = document.getElementsByClassName("active");
                    if (current.length > 0) {
                        current[0].className = current[0].className.replace(" active", "");
                        sel.className += " active";
                    }
                }

                pollLoc.setMapMode(index); ///$scope.config[index].name;

                var gridMode = index.split('_')[0];


                if (gridMode === 'Monday') {
                    pollLoc.setGridMode(true);
                }
                else {
                    pollLoc.setGridMode(false);
                }

               // pollLoc.setGridMode()
                //$scope.markerGen();
            }
            else if (url === '/grid')
            {
                $scope.visible = true;
                //$scope.mode = pollLoc.getMapMode();
                //if ($scope.mode == null) {
                //    $scope.mode = 'Monday_Delivery';
                //} 
                var gridMode =  index.split('_')[0]; 
                if (gridMode === 'Monday')
                {
                    pollLoc.setGridMode(true);
                }
                else {
                    pollLoc.setGridMode(false);
                }

                $scope.activeButton = index;
                var bdgs = document.getElementsByClassName("badge");
                var sel = document.getElementById(index);
                for (var i = 0; i < bdgs.length; i++)
                {
                    var current = document.getElementsByClassName("active");
                    if (current.length > 0)
                    {
                        current[0].className = current[0].className.replace(" active", "");
                        sel.className += " active";
                    }   
                }
                pollLoc.setMapMode(index);
            }
            //else
            //{
            //    $scope.visible = false;
            //}

            $scope.populateSummRpt();
            //for (var i = 0; i < $scope.config.length; i++)
            //    $scope.config[i].btnClass = "";
            //$scope.config[index].btnClass = 'active';
                      

        };

        $scope.printData = function ()
        { 
            newWin = window.open();
            newWin.document.write('<html><head>    <script src="Scripts/bootstrap.min.js"></script>'); 
          //  newWin.document.write(' < script src= "Scripts/ui-bootstrap-tpls-2.5.0.js" ></script >');
            newWin.document.write(' <link href="Content/angular-bootstrap-toggle.css" rel="stylesheet" />'); 
            newWin.document.write(' <link href="Content/bootstrap.css" rel="stylesheet" /><title>' + document.title + '</title>'); newWin.document.write('<style> html, body { height: 100 %; margin: 0;  font-family: Calibri, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif; font-size: 11px;} li { list- style: none;  } </style>');
            newWin.document.write('</head><body >');
            newWin.document.write('<h3>  Summary Report : ' + pollLoc.getMapMode() +' </h3> <div class="col-lg-6">');
            newWin.document.write(document.getElementById("tablePrint").innerHTML);
            newWin.document.write('</div></body></html>'); 
             //newWin.print(); 
            //newWin.close();
        }

   
       
        $scope.changeView = function () {
            url = $location.absUrl().split('!')[1];
            if (url === '/mapView') {
                $location.path('/grid');
                $scope.gridView = true;
              //  $scope.visible = true;
            }
            else if (url === '/grid') {
                $location.path('/mapView');
                $scope.gridView = false;
               // $scope.visible = true;
            }
            //else
            //{
            //    $scope.visible = false;
            //}
        }  

        //app.run(function ($rootScope, $location, userProfile) {
        //    $rootScope.$on('$routeChangeStart', function (event) {
        //        url = $location.absUrl().split('!')[1];
        //        if (url !== '/mapView' || url !== '/grid') {
        //            console.log('not the View')
        //        }
        //        else {
        //            console.log("it is");
        //        }
        //    });
        //});
  
        $scope.DaySelect();

};


MainController.$inject = ['$scope', '$uibModal', '$location', 'pollLoc', 'userProfile'];