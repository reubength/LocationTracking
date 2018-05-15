var uploadFileController = function ($scope, $q,$http, $location, $routeParams, loginService, pollLoc, userProfile) {
    
    $scope.fileName = [       
        { Name: "Location List" },
        { Name: "Location Details" },
        { Name: "Precinct List" },
        { Name: "Polling Location All" },
        { Name: "New User List" }
    ]

    console.log($scope.fileName[0].Name);
    $scope.selFilename = $scope.fileName[0];
    console.log($scope.selFilename.Name);
    $scope.reader = new FileReader();
    $scope.UserList = [];


    $scope.$watch(function () {
        return $scope.UserList;
    }, function () {
        if ($scope.UserList.length > 1)
        {
            $scope.registerUsers();
        }
        
    });


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
            if ($scope.selFilename.Name === "New User List")
            {  
                $scope.fileRead().then(function (response) {
                    $scope.UserList = response.split(/\r\n|\n/);    

                });  
                //var something = $scope.userListSplit().then(function (response) {
                //    console.log(response);
                //});
                 
            }
            else {
                    pollLoc.SubmitpollLoc(data);
            } 

            data.append($scope.selFilename.Name, $scope.files[i]);
        }
     

    }  

    //$scope.readFile = function (callback)
    //{
    //    $scope.reader.onload = function (e) {
    //        console.log(e);
    //        $scope.reader.readAsText($scope.files[0]);
    //        console.log($scope.reader);
    //        $scope.UserList = $scope.reader.result.split(/\r\n|\n/);
    //        callback(val);

    //    }


    //}


    $scope.fileRead = function ( ) {
        var deferred = $q.defer(); 
        //var reader = new FileReader();

        $scope.reader.onload = function () {
            deferred.resolve($scope.reader.result);
        };

        $scope.reader.readAsText($scope.files[0]);

        return deferred.promise;
    };

    //$scope.userListSplit = function () {        
    //    var deferred = $q.defer();
    //    $scope.UserList = $scope.reader.result.split(/\r\n|\n/); 
    //    if ($scope.UserList.length > 1) {
    //        deferred.resolve();
    //    }

    //    return deferred.promise;

         
    //} 

    $scope.registerUsers = function ()
    {       
        $scope.regUserModel = [];
        $scope.tempregUserModel = [];         
        for (var u = 1; u < $scope.UserList.length; u++)
        {
            $scope.tempregUserModel = $scope.UserList[u].split(',');
            for (var t = 0; t < $scope.tempregUserModel.length; t++)
            {
                var UserName = $scope.tempregUserModel[t];
                t++;
                var Password = $scope.tempregUserModel[t];
                 
                var ConfirmPassword = $scope.tempregUserModel[t];
                t++;
                var Role = $scope.tempregUserModel[t];
                $scope.regUserModel =
                {
                    UserName: UserName, 
                    Password: Password ,
                    ConfirmPassword: ConfirmPassword,
                    Role: Role,
                }
                $scope.promiseregister = loginService.register($scope.regUserModel);
                $scope.promiseregister.then(function (resp) {
                console.log(resp);
                $scope.responseData = "User is Successfully";
                console.log($scope.responseData);
                //$scope.userRegistrationEmail = "";
                //$scope.userRegistrationPassword = "";
                //$scope.userRegistrationConfirmPassword = "";
                //$scope.userRegistrationRole = "";
                //$scope.userRegistrationDept = "";
                $scope.Loading = false;
            }, function (err) {
                $scope.responseData = "Error " + err.status;
                console.log($scope.responseData);
                $scope.Loading = false;
            });
            }  
 
       
        }; 
    }
}
uploadFileController.$inject = ['$scope','$q', '$http', '$location', '$routeParams', 'loginService', 'pollLoc', 'userProfile'];
