angular.module('mySignalRService', [])

    .service('SignalService', ['$rootScope','$http', function ($rootScope,$http) {
        var self = this;
        self.alert = 0;
        self.notificationHubProxy = null;

        self.setAlert = function (alert) {
            self.alert = alert;
        };
        self.getAlert = function () {
            return self.alert ;
        };


        self.initialize = function () {
            $.connection.hub.logging = true;
            notificationHubProxy = $.connection.locationUpdatesHub;

            notificationHubProxy.client.hello = function () {

                console.log("Hello from ASP.NET Web API");
               var  alert = 1;
               self.setAlert(alert);

               $rootScope.$apply(function () {
                   $rootScope.$broadcast('updateList');
               });
          
            };

            $.connection.hub.start().done(function () {
                console.log("started");
            }).fail(function (result) {
                console.log(result);
            })
        };

       
       
    }]);