var modalController = function ($scope, $uibModalInstance, $location, pollLoc, userProfile, x, address) {  
    $scope.Selected = [];
    $scope.StatusSelected;
    $scope.buttonClass = x;

    $scope.$on('modal.closing', (event, reason, closed) => {
        if (!closed && reason ) {
            event.preventDefault();
            $scope.$close("Closing");
        }
    });

    $scope.Context = address;
        $scope.cancelModal = function () {
           // console.log("cancelmodal");
            $uibModalInstance.dismiss('cancel' );
            }

        $scope.ok = function () {
            if (x === 'Zone')
            {
                $uibModalInstance.close($scope.Selected);
            }
            else if (x === 'editZones')
            {
                console.log($scope.StatusSelected);
                if ($scope.StatusSelected == 'Inactive')
                {
                    $scope.modalBody.zone_Active = 0;
                }
                else if ($scope.StatusSelected == 'Active')
                {
                    $scope.modalBody.zone_Active = 1;
                }
                console.log($scope.modalBody);
                $uibModalInstance.close($scope.modalBody);
            }
            else if (x === 'addZones')
            {
                console.log($scope.StatusSelected);
                if ($scope.StatusSelected == 'Inactive') {
                    $scope.modalBody.zone_Active = 0;
                }
                else if ($scope.StatusSelected == 'Active') {
                    $scope.modalBody.zone_Active = 1;
                }
                console.log($scope.modalBody);
                $uibModalInstance.close($scope.modalBody);
            }
            else if (x === 'Poll Details') {
                //console.log($scope.modalBody);
                $uibModalInstance.close($scope.modalBody);
            }
            else
            {
                $uibModalInstance.close('save');
            }
            //return $scope.Selected;
        } 
    
        if (x === 'Monday_Delivery') {
            $scope.modalTitle = "Monday Delivery"
            if (address.Monday_Delivery === "success") {
                $scope.modalButtonTxt = "Not Ready";
            }
            else {
                $scope.modalButtonTxt = "Ready";
            }

        }
        if (x === 'Monday_Arrival') {
            $scope.modalTitle = "Monday Arrival"
            if (address.Monday_Arrival === "success")
            {
                $scope.modalButtonTxt = "Not Ready";
            }
            else
            {
                $scope.modalButtonTxt = "Ready";
            }
             
        }
        if (x === 'Monday_Close') {
            $scope.modalTitle = "Monday Close"
            if (address.Monday_Close === "success") {
                $scope.modalButtonTxt = "Not Ready";
            }
            else
            {
                $scope.modalButtonTxt = "Ready";
            }

        }
        if (x === 'Building_Open') {
            $scope.modalTitle = "Building Open"
            if (address.Building_Open === "success") {
                $scope.modalButtonTxt = "Not Ready";
            }
            else
            {
                $scope.modalButtonTxt = "Ready";
            }

        }
        if (x === 'Tuesday_Arrival') {

            $scope.modalTitle = "Tuesday Arrival"
            if (address.Tuesday_Arrival === "success") {
                $scope.modalButtonTxt = "Not Ready";
            }
            else
            {
                $scope.modalButtonTxt = "Ready";
            }
        }       
        
        if (x === 'Open_Ready') {
            $scope.modalTitle = "Open & Ready"
            if (address.Open_Ready === "success") {
                $scope.modalButtonTxt = "Not Ready";
            }
            else {
                $scope.modalButtonTxt = "Ready";
            }
        }
        if (x === 'Close_Poll_Report') {
            $scope.modalTitle = "Close Poll Report"
                if (address.Close_Poll_Report === "success") {
                    $scope.modalButtonTxt = "Not Ready";
                }
                else {
                    $scope.modalButtonTxt = "Ready";
                }
            }
       

        if (x === 'Zone') {
            $scope.modalTitle = "Zone Filter"
        }
        if (x === 'editZones') {
            $scope.modalTitle = "Edit Zone"
        }
        if (x == 'Poll Details')
        {
            $scope.modalTitle ="Location Details"
        }

        $scope.checkSelected = function (e,z)
        {
            if (e.Selected)
            {
                $scope.Selected.push(z) ;
            }
            else
            {
                var index = $scope.Selected.indexOf(z);
                $scope.Selected.splice(index, 1);
                //console.log($scope.Selected);
            }
        }       
       

        $scope.setContent = function ()
        {
            if (x == 'Zone') {
                $scope.modalBody = address;
            }
            else if (x == 'Poll Details') {
                //pollLoc.getPollDetails(address.Poll_Id).then(function (response) {
                $scope.PollDlts = pollLoc.polldtls;
                $scope.modalBody = address;
                $scope.Poll_Id = address.Poll_Id;

                //fetch('http://locationtracking.electionchief.com/PollLocImgs/' + address.Poll_Id)
                //    .then(function (img) {
                //        $scope.modalImage = img;
                //        console.log($scope.modalImage);
                //    })
                //    .catch(e => {
                //        pre(`Caugth error: ${e.message}`)
                //    })

                // $scope.openModal($scope.PollDlts, "Poll Details")

                //$scope.modalBody = $scope.PollDlts;
              //  console.log($scope.PollDlts);
                //})    
            }
            else if (x == 'editZones') {
                $scope.modalBody = address;
                if (address.zone_Active === 1)
                {
                    $scope.modalBody.zone_Active = 'Active';
                    $scope.StatusSelected = 'Active';
                }

                else if (address.zone_Active === 0) {
                    $scope.modalBody.zone_Active = 'Inactive';
                    $scope.StatusSelected = 'Inactive';
                }
            }
            else if (x == 'addZones') {
                $scope.modalBody = address;
            }
            else
            {
                var Role = userProfile.getProfile().Role

                if (Role !== 'Phone Operator') {
                    if ((address[x] === 'success' || address[x] === 'primary')) {
                        $scope.buttonClass = 'warning'
                        $scope.modalButtonTxt = 'Not Ready'
                    }
                    else if (address[x] === 'primary')
                    //else if (address[x] === 'warning'  )
                    {
                        $scope.buttonClass = 'warning'
                        $scope.modalButtonTxt = 'Not Ready'
                    }
                    //else if ((address[x] === 'warning' || address[x] === 'primary') && !(Role === 'Admin' || Role === 'Manager' ||
                    //    Role === 'Supervisor' || Role === 'Election Support' || Role === 'Zone Captains'))
                    else if ((address[x] === 'warning')) {
                        if ((x === 'Monday_Delivery' || x === 'Building_Open')) {
                            $scope.buttonClass = 'success'
                            $scope.modalButtonTxt = 'Ready'
                        }
                        else {
                            $scope.buttonClass = 'primary'
                            $scope.modalButtonTxt = 'Ready'
                        }
                    }
                }
                else if (Role === 'Phone Operator') {
                    if ((address[x] === 'warning' || address[x] === 'primary')) {
                        $scope.buttonClass = 'success'
                        $scope.modalButtonTxt = 'Ready'
                    } 
                    //else if ((address[x] === 'warning' || address[x] === 'primary') && !(Role === 'Admin' || Role === 'Manager' ||
                    //    Role === 'Supervisor' || Role === 'Election Support' || Role === 'Zone Captains'))
                    else if ((address[x] === 'success')) {
                            $scope.buttonClass = 'warning'
                            $scope.modalButtonTxt = 'Not Ready'
                         
                    }
                }
                //if ((address[x] === 'success' || address[x] === 'primary') && ( Role === 'Admin' ||  Role === 'Manager' ||
                //Role === 'Supervisor' ||  Role === 'Election Support' ||  Role === 'Zone Captains'))
                
                //<button ng-show="Context[buttonClass] ==='warning' || Context[buttonClass] ==='primary' " ng-if="Context[buttonClass] ==='warning' || Context[buttonClass] ==='primary'" class="btn btn-success" type="button" ng-click="ok()">{{ modalButtonTxt }}</button>
                //    <button ng-show="Context[buttonClass] ==='success'" ng-if="Context[buttonClass] ==='success'" class="btn btn-warning" type="button" ng-click="ok()">{{ modalButtonTxt }}</button>

                ///WHAT it was before
                //else {
                //    $scope.modalBody = address.Poll_Address;
                //    $scope.modalWard = address.Ward_Name;
                //}           


                    $scope.modalBody = address.Poll_Address;
                    $scope.modalWard = address.Ward_Name;



            }
            
        }
        $scope.setContent();
}