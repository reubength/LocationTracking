var MainController = function ($scope,$uibModal, $location, pollLoc, userProfile)
{        $scope.$watch(function () {
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
                console.log($scope.Role);
            }
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

        
};
MainController.$inject = ['$scope', '$uibModal', '$location', 'pollLoc', 'userProfile'];