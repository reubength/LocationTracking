angular.module('myAppHomeService', [])

    .factory('pollLoc', ['$http','domain', function ($http, domain) {
    var obj = {};
    var pollLocs;
    var polldtls;
    var Length;
    var Zones;

        console.log(domain)
    

    //obj.ChangeDist = function (loc) {
    //    obj.District = loc;
    //    this.getDistInfo(District);
    //    //return District;
    //}
    //obj.selDist = function () {
    //    //console.log(District);
    //    return District;
    //}

    obj.getPollLocs = function(){
        return obj.pollLocs;
    } 

    obj.getZone = function () {
        // console.log(HydLength);
        return obj.Zones;
    }

    obj.getZonesAll = function () {
        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
        return $http({
            method: 'GET',
            url: domain +'/zones',
            headers: authHeaders
        }).then(function (response, status) {
            //HydrantLong = response.data;
            obj.Zones = response.data;
            obj.Zones.push({ id_zone: '0', zone: '', zone_Name: 'All', zone_Kml: 'null', zone_Active: '1' });

           
            //console.log(HydrantLoc);
            return response.data;

        });
    } 
    
    obj.getLocation = function ()
    {
        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        if (accesstoken)
        {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        return $http({
            method: 'GET',
            url: domain +'/LocTrackMains' ,
            headers: authHeaders
        }).then(function (response, status) {
            //HydrantLong = response.data;
            obj.pollLocs = response.data;            
            obj.Length = response.data.length;
            //console.log(HydrantLoc);
            return response.data;

        });
    }
     

    obj.SubmitpollLoc = function (data) {
        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
         
        return $http({
            method: 'POST',
            url: domain +'/FileUploader/',
            processData: false,
            contentType: false,
            data: data,
            //headers: authHeaders,
            //contentType: 'application/vnd.ms-excel'
            //Content-Type: 'application/vnd.ms-excel'
            headers: {
                "Authorization": authHeaders.Authorization,
                "Content-Type": undefined
            },
           

        }).then(function (response, status) {
            

        });
    }
    obj.SubmitZones = function (data) {
        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        return $http({
            method: 'POST',
            url: domain +'/zones/',
            processData: false,
            contentType: false,
            data: JSON.stringify({
                id_zone: data.id_zone,
                zone: data.zone,
                zone_Active: data.zone_Active,
                zone_Kml: data.zone_Name,
                zone_Name: data.zone_Name
            }),
            headers: authHeaders,
            contentType: 'application/json',


        }).then(function (response, status) {


        });
    }
    

    obj.getPollDetails = function (pId) {
        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        return $http({
            method: 'GET',
            url: domain +'/poll_ContactDetails/' + pId,
            processData: false,
            contentType: false,
            //data: JSON.stringify({
            //    id_zone: data.id_zone,
            //    zone: data.zone,
            //    zone_Active: data.zone_Active,
            //    zone_Kml: data.zone_Name,
            //    zone_Name: data.zone_Name
            //}),
            headers: authHeaders,
            contentType: 'application/json'
        }).then(function (response, status) {
            //HydrantLong = response.data;
            obj.polldtls = response.data;
            //obj.Length = response.data.length;
            //console.log(HydrantLoc);
            return response.data;

        });
    }
    

    obj.SubmitpollLocStat = function (Loc) {

        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }
        Loc.Monday_Delivery     == "success" ? Loc.Monday_Delivery = 1 : Loc.Monday_Delivery = 0;
        Loc.Monday_Arrival      == "success" ? Loc.Monday_Arrival = 1 : Loc.Monday_Arrival = 0;
        Loc.Monday_Close        == "success" ? Loc.Monday_Close = 1 : Loc.Monday_Close = 0;
        Loc.Building_Open       == "success" ? Loc.Building_Open = 1 : Loc.Building_Open = 0;
        Loc.Tuesday_Arrival     == "success" ? Loc.Tuesday_Arrival      = 1 : Loc.Tuesday_Arrival   = 0;
        Loc.Open_Ready          == "success" ? Loc.Open_Ready           = 1 : Loc.Open_Ready        = 0;
        Loc.Close_Poll_Report   == "success" ? Loc.Close_Poll_Report    = 1 : Loc.Close_Poll_Report = 0;

            
        return $http({
            method: 'POST',
            url: domain +'/poll_Location/',
            data: JSON.stringify({
                Poll_Id: Loc.Poll_Id,
                Poll_Address: Loc.Poll_Address,
                Poll_Name: Loc.Poll_Name,
                Zone: Loc.Zone,
                Monday_Delivery: Loc.Monday_Delivery,
                Monday_Arrival: Loc.Monday_Arrival,
                Monday_Close: Loc.Monday_Close,
                Building_Open: Loc.Building_Open,
                Tuesday_Arrival: Loc.Tuesday_Arrival,
                OpenReady: Loc.Open_Ready,
                ClosePollReady: Loc.Close_Poll_Report
            }),
                headers: authHeaders,
                contentType: 'application/json'

            }).then(function (response, status) {
               
                return response;

            });
    }
    return obj;
}]);