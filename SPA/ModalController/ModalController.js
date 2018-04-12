﻿var modalController = function ($scope, $uibModalInstance, $location, pollLoc, userProfile, x, address) {  
    $scope.Selected = [];

    $scope.buttonClass = x;

    $scope.$on('modal.closing', (event, reason, closed) => {
        if (!closed && reason ) {
            event.preventDefault();
            $scope.$close("Closing");
        }

    });

    $scope.Context = address;
        $scope.cancelModal = function () {
            console.log("cancelmodal");
            $uibModalInstance.dismiss('cancel' );
            }

        $scope.ok = function () {
            if (x === 'Zone')
            {
                $uibModalInstance.close($scope.Selected);
            }
            else if (x === 'editZones') {
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
            else {
                $scope.modalButtonTxt = "Ready";
            }

        }
        if (x === 'Building_Open') {
            $scope.modalTitle = "Building Open"
            if (address.Building_Open === "success") {
                $scope.modalButtonTxt = "Not Ready";
            }
            else {
                $scope.modalButtonTxt = "Ready";
            }

        }
        if (x === 'Tuesday_Arrival') {

            $scope.modalTitle = "Tuesday Arrival"
            if (address.Tuesday_Arrival === "success") {
                $scope.modalButtonTxt = "Not Ready";
            }
            else {
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
                console.log(  $scope.Selected);
            }
        }       
       

        $scope.setContent = function ()
        {
            if (x == 'Zone')
            {
                $scope.modalBody = address;
            }
            else if (x == 'Poll Details')
            {
                //pollLoc.getPollDetails(address.Poll_Id).then(function (response) {
                    $scope.PollDlts = pollLoc.polldtls;
                    $scope.modalBody = address;

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
                    console.log($scope.PollDlts);
                //})    
            }
            else if (x == 'editZones')
            {
                $scope.modalBody = address;
            }
            else
            {
                $scope.modalBody = address.Poll_Address;
                $scope.modalWard = address.Ward_Name;
            }
            
        }
        $scope.setContent();
}