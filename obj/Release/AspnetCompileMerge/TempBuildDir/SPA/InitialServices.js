angular.module('myAppInitialService', [])
    .constant('initConfig', ['$http']).constant("appSettings", {
        serverPath: "https://localhost:64109"
    });
