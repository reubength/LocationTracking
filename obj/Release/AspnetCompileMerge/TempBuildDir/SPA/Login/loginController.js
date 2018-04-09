//angular.module('myAppHome', []).controller('loginController', ['$scope', '$http', 'district', 'loginService', 'userProfile', function ($scope, $http, district, loginService,userProfile) {
var loginController = function ($scope, $http, $location, $routeParams, loginService, userProfile) {

    $scope.responseData = "";

    $scope.userName = "";

    $scope.userRegistrationEmail = "";
    $scope.userRegistrationPassword = "";
    $scope.userRegistrationConfirmPassword = "";
    $scope.userRegistrationRole = "";

    $scope.userLoginEmail = "";
    $scope.userLoginPassword = "";

    $scope.accessToken = "";
    $scope.refreshToken = "";

    $scope.erroLogin = false;
    $scope.Loading = false;
    //Ends Here

    //Function to register user
    $scope.registerUser = function () {

        $scope.responseData = "";

        //The User Registration Information
        $scope.userRegistrationInfo = {
            Email: $scope.userRegistrationEmail,
            Password: $scope.userRegistrationPassword,
            ConfirmPassword: $scope.userRegistrationConfirmPassword,
            Name: $scope.userRegistrationRole
        };

        $scope.Loading = true;
        $scope.promiseregister = loginService.register($scope.userRegistrationInfo);

        $scope.promiseregister.then(function (resp) {
            console.log(resp);
            $scope.responseData = "User is Successfully";
            $scope.userRegistrationEmail = "";
            $scope.userRegistrationPassword = "";
            $scope.userRegistrationConfirmPassword = "";
            $scope.userRegistrationRole = "";
            $scope.Loading = false;
        }, function (err) {
            $scope.responseData = "Error " + err.status;
            $scope.Loading = false;
        });
    };


    //$scope.redirect = function () {
    //    window.location.href = '/Employee/Index';
    //};

    //Function to Login. This will generate Token 
    $scope.login = function () {
        $scope.Loading = true;
        //This is the information to pass for token based authentication
        var userLogin = {
            grant_type: 'password',
            username: $scope.userLoginEmail,
            password: $scope.userLoginPassword
        };

        $scope.promiselogin = loginService.login(userLogin);

        $scope.promiselogin.then(function (resp) {
            $scope.userName = resp.data.userName;
            //Store the token information in the SessionStorage
            //So that it can be accessed for other views
            sessionStorage.setItem('userName', resp.data.userName);
            sessionStorage.setItem('accessToken', resp.data.access_token);
            sessionStorage.setItem('refreshToken', resp.data.refresh_token);
            sessionStorage.setItem('Role', resp.data.Role);
            userProfile.setProfile(resp.data.userName, resp.data.access_token, resp.data.refresh_token,resp.data.Role);
            $scope.erroLogin = false;
           // isLoggenin = userProfile.getProfile().username;
            $scope.Loading = false;
           // $scope.isLoggenin 
            console.log(resp);
            
            $location.path('/');
        }, function (err) {

            $scope.responseData = "Error " + err.status;
            $scope.erroLogin = true;
            $scope.Loading = false;
        });

    };
};
loginController.$inject = ['$scope', '$http', '$location', 'pollLoc', 'loginService', 'userProfile']; //this.$inject = ['$scope'];