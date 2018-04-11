angular.module('myAppUserService', [])
    .factory('userProfile',  ['$http','domain', function ($http,domain)
    {
        var obj = {};
        var profile = {};


        obj.userProfile = function ()
        {
            obj.setProfile(username, token, refreshToken, Role);
        }

        obj.setProfile = function (username, token, refreshToken,Role)
        {
            sessionStorage.setItem('username', username );
            sessionStorage.setItem('token', token );
            sessionStorage.setItem('refreshToken', refreshToken);
            sessionStorage.setItem('Role', Role);
        }

        obj.getProfile = function ()
        {
            obj.profile = {
              //  isLoggedIn: sessionStorage.getItem('accessToken') = !null,
                username: sessionStorage.getItem('userName'),
                token: sessionStorage.getItem('accessToken'),
                refreshToken: sessionStorage.getItem('refreshToken'),
                Role: sessionStorage.getItem('Role')
            };
            //console.log(obj.profile);
            return obj.profile;
        }

        obj.logOut = function ()
        {
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('accessToken');
            obj.setProfile('', '', '','');
           // $scope.loggedin = false;
           // $location.path('/login');
        }

        obj.isLoggedIn = function ()
        {
            if (obj.profile.username === null)
            {
                isLogIn = false;
            }
            else
            {
                isLogIn = true;
            }
            return isLogIn;
        }
       
        return obj;
    }]);