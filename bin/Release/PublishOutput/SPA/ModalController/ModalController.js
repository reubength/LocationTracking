var modalController = function ($scope, $uibModalInstance, $location, pollLoc, userProfile, x, address) {  
    $scope.Selected = [];

        $scope.cancelModal = function () {
            console.log("cancelmodal");
            $uibModalInstance.dismiss('cancel');
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
            else
            {
                $uibModalInstance.close('save');
            }
            //return $scope.Selected;
        }       
        if (x === 'MondayArrival') {
            $scope.modalTitle = "Monday Arrival"
        }
        if (x === 'MondayArrival') {
            $scope.modalTitle = "Monday Arrival"
        }
        if (x === 'MondayArrival') {
            $scope.modalTitle = "Monday Arrival"
        }
        if (x === 'MondayArrival') {
            $scope.modalTitle = "Monday Arrival"
        }
        if (x === 'Zone') {
            $scope.modalTitle = "Zone Filter"
        }
        if (x === 'editZones') {
            $scope.modalTitle = "Edit Zone"
        }

        $scope.checkSelected = function (z)
        {
            $scope.Selected.push(z) ;

        }       

        $scope.setContent = function ()
        {
            if (x == 'Zone')
            {
                $scope.modalBody = address;
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