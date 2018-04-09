var app = angular.module('app', ['ngRoute', 'ngTouch', 'myAppHomeService', 'myLoginService', 'myAppUserService', 'mySignalRService', 'ngMap', 'ui.toggle','ui.bootstrap']);

app.controller('MainController', MainController);
app.controller('loginController', loginController);
//app.controller('AlertController', AlertController);
//app.controller('GridController', GridController);
app.controller('EquipmentController', EquipmentController);
app.controller('ElectionSetupController', ElectionSetupController);


app.controller('modalController', modalController);


app.controller('uploadFileController', uploadFileController);


    var configFunction = function ($routeProvider, $httpProvider) {
        $routeProvider.when('/grid', {
            templateUrl: 'SPA/Views/grid.html'
            //, controller: 'MainController'
        })

        $routeProvider.when('/login', {
            templateUrl: 'SPA/Views/SecurityInfo.html',
            allowAnonymoys: true
            // , controller: 'GridController'
        })
        $routeProvider.when('/Register', {
            templateUrl: 'SPA/Views/RegisterUser.html'
            // , controller: 'GridController'
        })

        $routeProvider.when('/fileUpload', {
            templateUrl: 'SPA/Views/uploadPage.html'
           // , controller: 'GridController'
        })

        $routeProvider.when('/mapView', {
            templateUrl: 'SPA/Views/map.html'
            // , controller: 'GridController'
        })
        $routeProvider.when('/ElectionSetup', {
            templateUrl: 'SPA/Views/ElectionSetup.html'
            // , controller: 'GridController'
        })
       
        //$routeProvider.when('/hydrant/Details/:r_Id', {
        //     templateUrl: 'SPA/Views/HydrantDetails.html'
        //     // , controller: 'GridController'
        // })
        .otherwise({
            redirectTo: function () {
                return '/grid';
            }
        })
    };

    configFunction.$inject = ['$routeProvider', '$httpProvider'];

    app.config(configFunction);

app.run(function ($rootScope, $location, userProfile) {
    $rootScope.$on('$routeChangeStart', function (event) {
        if (!userProfile.isLoggedIn()) {
            $location.path('/login');
        }
        else {
            console.log("ALLOW");
        }
    });
});

