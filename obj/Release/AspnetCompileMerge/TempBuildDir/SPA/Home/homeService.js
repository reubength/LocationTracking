angular.module('myAppHomeService', [])

.factory('pollLoc', ['$http', function ($http) {
    var obj = {};
    var pollLocs;
    var Length;
    var Zones;
    

    obj.ChangeDist = function (loc) {
        obj.District = loc;
        this.getDistInfo(District);
        //return District;
    }
    obj.selDist = function () {
        //console.log(District);
        return District;
    }

    obj.getPollLocs = function(){
        return obj.pollLocs;
    }

    //obj.getHydrantLats = function () {
    //    return HydrantLats;
    //}
    //obj.getHydrantlength = function () {
        
    //   // console.log(HydLength);
    //    return HydLength;
    //}
    //obj.getHydrantInfo = function () {

    //    // console.log(HydLength);
    //    return Hydrantinfo;
    //}

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
            url: 'http://localhost:60855/api/zones',
            headers: authHeaders
        }).then(function (response, status) {
            //HydrantLong = response.data;
            obj.Zones = response.data;
            obj.Zones.push({ id_zone: '0', zone: '', zone_Name: 'All', zone_Kml: 'null', zone_Active: '1' });

           
            //console.log(HydrantLoc);
            return response.data;

        });
    }

    //this should be get gethydrantLoc()
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
            url: 'http://localhost:60855/api/LocTrackMains' ,
            headers: authHeaders
        }).then(function (response, status) {
            //HydrantLong = response.data;
            obj.pollLocs = response.data;            
            obj.Length = response.data.length;
            //console.log(HydrantLoc);
            return response.data;

        });
    }
    //obj.getAllPoll = function () {

    //    var accesstoken = sessionStorage.getItem('accessToken');
    //    var authHeaders = {};

    //    if (accesstoken)
    //    {
    //        authHeaders.Authorization = 'Bearer ' + accesstoken;
    //    }

    //    return $http({
    //        method: 'GET',
    //        url: 'http://localhost:60855/api/poll_Location_All',
    //        headers: authHeaders
    //    }).then(function (response, status) {
    //        //HydrantLong = response.data;
    //        //Hydrantinfo = response.data;
    //        //console.log(response.data);
    //        //console.log(Hydrantinfo);
    //        return response;

    //    });
    //}

    obj.SubmitpollLoc = function (data) {
        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        //if (accesstoken) {
        //    authHeaders.Authorization = 'Bearer ' + accesstoken;
        //}
        return $http({
            method: 'POST',
            url: 'http://localhost:60855/api/FileUploader/',
            processData: false,
            contentType: false,
            data: data,
            headers: {
                "Authorization": authHeaders,
                "Content-Type": undefined
            },
            //JSON.stringify(
            //    {
            //        //hydrant_Id              : Hyd.hydrant_Id,
            //        //hydrant_District        : Hyd.hydrant_District,
            //        //hydrant_Longitude       : Hyd.hydrant_Longitude , 
            //        //hydrant_Latitude        : Hyd.hydrant_Latitude,
            //        //hydrant_City            : Hyd.hydrant_City, 
            //        //hydrant_Address_Num     : Hyd.hydrant_Address_Num , 
            //        //hydrant_Address_Street  : Hyd.hydrant_Address_Street , 
            //        //hydrant_State           : Hyd.hydrant_State
            //    }),
         //   headers: authHeaders,
            //"hydrant_Id":2,"hydrant_District":1,"hydrant_Longitude":-81.7416803,"hydrant_Latitude":41.4811996,"hydrant_City":null,"hydrant_Address_Num":null,"hydrant_Address_Street":null,"hydrant_State":null}
          //  contentType: 'application/json'

        }).then(function (response, status) {
            

        });
    }
    obj.SubmitZones = function (data) {
        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        //if (accesstoken) {
        //    authHeaders.Authorization = 'Bearer ' + accesstoken;
        //}
        return $http({
            method: 'POST',
            url: 'http://localhost:60855/api/zones/',
            processData: false,
            contentType: false,
            data: JSON.stringify({
                id_zone  :  data.id_zone,
                zone: data.zone,
                zone_Active: data.zone_Active,
                zone_Kml: data.zone_Name,
                zone_Name:data.zone_Name}),
            headers: authHeaders,
            contentType: 'application/json',
            //JSON.stringify(
            //    {
            //        //hydrant_Id              : Hyd.hydrant_Id,
            //        //hydrant_District        : Hyd.hydrant_District,
            //        //hydrant_Longitude       : Hyd.hydrant_Longitude , 
            //        //hydrant_Latitude        : Hyd.hydrant_Latitude,
            //        //hydrant_City            : Hyd.hydrant_City, 
            //        //hydrant_Address_Num     : Hyd.hydrant_Address_Num , 
            //        //hydrant_Address_Street  : Hyd.hydrant_Address_Street , 
            //        //hydrant_State           : Hyd.hydrant_State
            //    }),
            //   headers: authHeaders,
            //"hydrant_Id":2,"hydrant_District":1,"hydrant_Longitude":-81.7416803,"hydrant_Latitude":41.4811996,"hydrant_City":null,"hydrant_Address_Num":null,"hydrant_Address_Street":null,"hydrant_State":null}
            //  contentType: 'application/json'

        }).then(function (response, status) {


        });
    }


    obj.SubmitpollLocStat = function (Loc) {

        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        Loc.Monday_Arrival      == "success" ? Loc.Monday_Arrival       = 1 : Loc.Monday_Arrival    = 0;
        Loc.Tuesday_Arrival     == "success" ? Loc.Tuesday_Arrival      = 1 : Loc.Tuesday_Arrival   = 0;
        Loc.Open_Ready          == "success" ? Loc.Open_Ready           = 1 : Loc.Open_Ready        = 0;
        Loc.Close_Poll_Report   == "success" ? Loc.Close_Poll_Report    = 1 : Loc.Close_Poll_Report = 0;

            //return $http({
            //    method: 'PUT',
            //    url: 'http://localhost:60855/api/poll_Location/' + Loc.Poll_Id,
            //    data: JSON.stringify({
            //        Poll_Id: Loc.Poll_Id,
            //        Poll_Address: Loc.Poll_Address,
            //        Poll_Name: Loc.Poll_Name,
            //        Zone :Loc.Zone,
            //        Monday_Arrival: Loc.Monday_Arrival,
            //        Tuesday_Arrival: Loc.Tuesday_Arrival,
            //        OpenReady: Loc.Open_Ready,
            //        ClosePollReady: Loc.Close_Poll_Report
            //    }),
        return $http({
            method: 'POST',
            url: 'http://localhost:60855/api/poll_Location/',
            data: JSON.stringify({
                Poll_Id: Loc.Poll_Id,
                Poll_Address: Loc.Poll_Address,
                Poll_Name: Loc.Poll_Name,
                Zone: Loc.Zone,
                Monday_Arrival: Loc.Monday_Arrival,
                Tuesday_Arrival: Loc.Tuesday_Arrival,
                OpenReady: Loc.Open_Ready,
                ClosePollReady: Loc.Close_Poll_Report
            }),
                headers: authHeaders,
                contentType: 'application/json'

            }).then(function (response, status) {
                //HydrantLong = response.data;
                //Hydrantinfo = response.data;
                //console.log(response.data);
                ////console.log(Hydrantinfo);
                return response;

            });
    }
    return obj;
}]);