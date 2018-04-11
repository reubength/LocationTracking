var uploadFileController = function ($scope, $http, $location, $routeParams, loginService, pollLoc, userProfile) {

    $scope.fileName = [       
        { Name: "Location List" },
        { Name: "Location Details" },
        { Name: "Precinct List" },
        { Name: "Polling Location All" }
    ]
    console.log($scope.fileName[0].Name);

    $scope.selFilename = $scope.fileName[0];
    console.log($scope.selFilename.Name);

    $scope.getFileDetails = function (e) {

        $scope.files = [];
        $scope.$apply(function () {
            // STORE THE FILE OBJECT IN AN ARRAY.
            for (var i = 0; i < e.files.length; i++) {
                $scope.files.push(e.files[i])
            }
        });
    };

    $scope.ChangeFileName = function (loc) {
        $scope.selFileName = loc;
            //$scope.selectedLocation = loc;
    };   
    $scope.uploadFiles = function () {
        //FILL FormData WITH FILE DETAILS.
        var data = new FormData();

        //console.log($scope.filename);
        for (var i in $scope.files) {
            console.log($scope.selFilename.Name);
            //data.append($scope.selFileName.Name, $scope.files[i], $scope.files[i].name);
            data.append($scope.selFilename.Name, $scope.files[i]);
        }
        console.log(data.entries[0]);
        pollLoc.SubmitpollLoc(data);

    }
}
