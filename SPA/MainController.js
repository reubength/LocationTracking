var MainController = function ($scope,$uibModal, $location, pollLoc, userProfile)
{
    $scope.ZoneDefault = [{ id_zone: '0', zone: '', zone_Name: 'All', zone_Kml: 'null', zone_Active: '1' }];
    $scope.gridView = true;
    $scope.locCountInfo = [];
    $scope.locSummInfo = [];
    $scope.PollDltsSumm = [];
 
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
            console.log($scope.ZoneDefault);
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
            console.log($scope.locSummInfo);
        }
        $scope.activeButton = 0;
        $scope.setActive = function setActive(index) {
            //idName
            var url = $location.absUrl().split('!')[1];
            //if (url === '/mapView') {
            //    $location.path('/grid');
            //}
            //else if (url === '/grid') {
            //    $location.path('/mapView');
            //}

            if (url === '/mapView')
            {
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
                pollLoc.setGridMode()
                //$scope.markerGen();
            }
            else if (url === '/grid')
            {
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

            $scope.populateSummRpt();
            //for (var i = 0; i < $scope.config.length; i++)
            //    $scope.config[i].btnClass = "";
            //$scope.config[index].btnClass = 'active';
                      

        };

        $scope.printData = function () {
            //var divToPrint = document.getElementById("table");
            //  newWin = window.open("");
            //  newWin.document.write(divToPrint.outerHTML);
            //  newWin.print();
            //  newWin.close();


       //     '<div id="tablePrint" ng-hide="true">'+
       //         '<table class="table table-striped table-bordered ">'+                    
       //         '<thead class="table">'+
       //                '<tr>'+
       //                  '<th scope="col">Poll Name</th>'+
       //                   '<th scope="col">Zone</th>'+
       //                   '<th scope="col">City</th>'+
       //                    '<th scope="col">Precinct</th>'+
       //               '</tr>'+
       //             '</thead>'+
       //            ' <tbody>'+
       //             '  <tr scope="row" ng-repeat="pl in locCountInfo | orderBy:sortType:sortReverse | filter:filterMakes()" class="active">'+
                    
       //               '<td>{{ pl.Poll_Name }} </td>'+
                     
       //                '  <td >' +pl.Zone +'</td>'+
       //               ' <td >'+pl.Ward_Name +'</td>'+
       //               '  <td>'+pl.Precinct+'</td>'+
       //               '  <td ng-repeat="pldt in pollDlts | filter: {pldt.poll_ID  : pl.Poll_Id} " ng-model="">'+
       //                '  <div>Contact:{{ pldt.contact_FirstName }} {{ pldt.contact_LastName }}: {{ pldt.contact_Info }}({{ pldt.contact_Type }}) </div>'+
       //               ' </td>'+
       //               ' </tr>'+ 
       //            '</tbody>'+
       //        ' </table>'+
       //    ' </div>'+
       //' </div >'



            //content = {
            //    templateURL: "/SPA/Template/summaryPrintTemplate.html"
            //}
            //console.log($scope.locCountInfo);
            //console.log(pollLoc.getpolldtls());
           
            //content = /SPA/Template/summaryPrintTemplate.html;
            newWin = window.open();
            newWin.document.write('<html><head>    <script src="Scripts/bootstrap.min.js"></script>'); 
          //  newWin.document.write(' < script src= "Scripts/ui-bootstrap-tpls-2.5.0.js" ></script >');
            newWin.document.write(' <link href="Content/angular-bootstrap-toggle.css" rel="stylesheet" />');
            newWin.document.write('<style> html, body { height: 100 %; margin: 0;  font-family: Calibri, Franklin Gothic Medium, Arial Narrow, Arial, sans-serif; font-size: 12px;}  li { list- style: none;  } </style>');
            newWin.document.write(' <link href="Content/bootstrap.css" rel="stylesheet" /><title>' + document.title + '</title>');
            newWin.document.write('</head><body >');
            newWin.document.write('<h3>  Summary Report </h3> <div class="col-lg-6">');
            newWin.document.write(document.getElementById("tablePrint").innerHTML);
            newWin.document.write('</div></body></html>');

           // console.log(template.html());
             //newWin.print();
          
            //newWin.close();
        }
        //$scope.filterSumm = function ()
        //{
        //    return function (pl) {

        //        $scope.PollDltsSumm = [];
        //        console.log(pl.Poll_Id);
        //        console.log($scope.pollDlts);
        //        for (var i in $scope.pollDlts)
        //        {               
        //            if (pl.Poll_Id === $scope.pollDlts[i].poll_Id)
        //            {
        //                $scope.PollDltsSumm.push($scope.pollDlts[i]);
                       
        //            }
               
        //        }
        //        console.log($scope.PollDltsSumm);
        //        return true;
        //    };
           
        //}
        //$scope.filterContact = function ()
        //{
        //    return function (pldt)
        //    {
        //        if ($scope.p_Id === pldt.poll_Id) {
        //            return true;
        //        }
        //    };
        //}

        $scope.changeView = function () {
            url = $location.absUrl().split('!')[1];
            if (url === '/mapView') {
                $location.path('/grid');
                $scope.gridView = true;
            }
            else if (url === '/grid') {
                $location.path('/mapView');
                $scope.gridView = false;
            }
        }  
};
MainController.$inject = ['$scope', '$uibModal', '$location', 'pollLoc', 'userProfile'];