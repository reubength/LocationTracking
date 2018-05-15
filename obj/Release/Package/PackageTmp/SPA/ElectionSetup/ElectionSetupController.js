var ElectionSetupController = function ($scope, $http, $location, $uibModal, $routeParams, loginService, pollLoc, userProfile) {

    $scope.FileUpload = true;
    $scope.Zones = false;
    $scope.UsersManage = false;

    $scope.changeView = function (e) {
        if (e === "Upload") {
            $scope.FileUpload = true;
            $scope.Zones = false;
            $scope.UsersManager = false;

        }
        else if (e === "ManageZones") {
            $scope.FileUpload = false;
            $scope.Zones = true;
            $scope.UsersManager = false;
        }
        else if (e === "ManageUsers") {
            $scope.FileUpload = false;
            $scope.Zones = false;
            $scope.UsersManager = true;
        }
    }

    $scope.populateForm = function () {
        //if (pollLoc.Zones != null) {
        //    $scope.ZonesAll = pollLoc.Zones
        //}
        //else {
            pollLoc.getZonesAll().then(function (response) {

                $scope.ZonesAll = response;
            });
      //  }
    }

    $scope.openModal = function (e, x) {
        if (x == 'editZones')
        {
            if (userProfile.getProfile().username != null) {
                $scope.Clicked = x;
                $scope.modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'SPA/Template/modalWindowEditZones.html',
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
                    // $scope.ZoneDefault = response;
                    if (response !== 'Closing') {
                        pollLoc.SubmitZones(response);
                        $scope.populateForm();
                    }
                    else {
                        $scope.populateForm();
                    }

                });


            }
        }
        else if (x === 'addZones')
        {
            if (userProfile.getProfile().username != null)
            {
                $scope.Clicked = x;
                $scope.modalInstance = $uibModal.open({
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'SPA/Template/modalWindowEditZones.html',
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
                    // $scope.ZoneDefault = response;
                    if (response !== 'Closing') {
                        pollLoc.SubmitZones(response);
                        $scope.populateForm();
                    }
                    else {
                        $scope.populateForm();
                    }

                });

                //$scope.modalInstance.result.then(function (response) {
                //    //   console.log(response);
                //    // $scope.ZoneDefault = response;
                //    if (response !== 'Closing') {
                //        pollLoc.SubmitZones(response);
                //        $scope.populateForm();
                //    }

                //});
            }
        }
        
    }
   
    $scope.delteZone = function (z) {
        pollLoc.DeleteZone(z);
       
    }
     $scope.populateForm();

}
