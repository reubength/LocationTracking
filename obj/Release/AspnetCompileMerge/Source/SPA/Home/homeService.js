angular.module('myAppHomeService', [])

    .factory('pollLoc', ['$http', 'domain', 'userProfile', function ($http, domain, userProfile) {
    var obj = {};
    var pollLocs;
    var polldtls;
    var Length;
    var Zones;
    var mode;
    var day;
    var hour;
    var min;
    obj.grdMode = true;
    obj.zonesSel = [{ id_zone: '0', zone: '', zone_Name: 'All', zone_Kml: 'null', zone_Active: '1' }];
    


        //console.log(domain)
    

    //obj.ChangeDist = function (loc) {
    //    obj.District = loc;
    //    this.getDistInfo(District);
    //    //return District;
    //}
    //obj.selDist = function () {
    //    //console.log(District);
    //    return District;
    //}
    obj.getDay = function ()
    {
        //0:Sunday
        //1:Monday
        //2:Tuesday
        //3:Wednesday
        //4:Thursday
        //5:Friday
        //6:Saturday
        //7:Sunday
        obj.day = (new Date()).getDay();
        obj.hour = (new Date().getHours());
        obj.min = (new Date().getMinutes());
       // obj.time  , format("dddd, mmmm dS, yyyy, h:MM:ss TT")
        var time = obj.hour + obj.min;
        if (obj.day === 1)
        {
            obj.setGridMode(true)
            if ((time >= '1730') && (time < '2030') )
            {
                obj.setMapMode('Monday_Arrival')
            }
            else {
                obj.setMapMode('Monday_Close')
            }
        }
        else
        {
            if ((time >= '0530') && (time< '0615')) {
                obj.setMapMode('Tuesday_Arrival')
            }
            else if ((time >' 0615') && (time < '1830')) {
                obj.setMapMode('Open_Ready')
            }
            else   {
                obj.setMapMode('Close_Poll_Report')
            }
          //  'Close_Poll_Report'
            obj.setGridMode(false)
        }
    }

    obj.setGridMode = function (Monday)    {
        obj.grdMode = Monday;
    }
    obj.getGridMode = function () {
        return obj.grdMode;
    } 
    obj.setMapMode = function (mode) {
        obj.mode = mode;
    } 
    obj.getMapMode = function ( ) {
        return obj.mode;
    } 
    obj.getPollLocs = function(){
        return obj.pollLocs;
    } 
    obj.getpolldtls = function ()
    {
        return obj.polldtls;
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
    obj.getzoneDefaults = function ()
    {
        return obj.zonesSel;
    }
    obj.setzoneDefaults = function (zoneDef)
    { 
        if(zoneDef === "Closing")
        {
            console.log(obj.zonesSel)
        }
        else
        { 
            obj.zonesSel = zoneDef;
        }
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
    obj.DeleteZone = function (zone)
    {
        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        return $http({
            method: 'DELETE',
            url: domain + '/zones/' + zone.id_zone,
            processData: false,
            contentType: false,
            data: zone,
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
    

    //obj.getPollDetails = function (pId) {
    //    var accesstoken = sessionStorage.getItem('accessToken');
    //    var authHeaders = {};

    //    if (accesstoken) {
    //        authHeaders.Authorization = 'Bearer ' + accesstoken;
    //    }

    //    return $http({
    //        method: 'GET',
    //        url: domain +'/poll_ContactDetails/' + pId,
    //        processData: false,
    //        contentType: false,
    //        //data: JSON.stringify({
    //        //    id_zone: data.id_zone,
    //        //    zone: data.zone,
    //        //    zone_Active: data.zone_Active,
    //        //    zone_Kml: data.zone_Name,
    //        //    zone_Name: data.zone_Name
    //        //}),
    //        headers: authHeaders,
    //        contentType: 'application/json'
    //    }).then(function (response, status) {
    //        //HydrantLong = response.data;
    //        obj.polldtls = response.data;
    //        //obj.Length = response.data.length;
    //        //console.log(HydrantLoc);
    //        return response.data;

    //    });
    //}
    obj.getPollDetails = function () {
        var accesstoken = sessionStorage.getItem('accessToken');
        var authHeaders = {};

        if (accesstoken) {
            authHeaders.Authorization = 'Bearer ' + accesstoken;
        }

        return $http({
            method: 'GET',
            url: domain + '/poll_ContactDetails/',
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
        Loc.Monday_Delivery         = (Loc.Monday_Delivery ==="primary" ? Loc.Monday_Delivery      = 1 : Loc.Monday_Delivery   === "success" ? 2 : Loc.Monday_Delivery  === "warning"    ? 0 : 0);
        Loc.Monday_Arrival          = (Loc.Monday_Arrival === "primary" ? Loc.Monday_Arrival       = 1 : Loc.Monday_Arrival    === "success" ? 2 : Loc.Monday_Arrival   === "warning"    ? 0 : 0);
        Loc.Monday_Close            = (Loc.Monday_Close  === "primary" ? Loc.Monday_Close         = 1 : Loc.Monday_Close      === "success" ? 2 : Loc.Monday_Close     === "warning"    ? 0 : 0);
        Loc.Building_Open           = (Loc.Building_Open=== "primary" ? Loc.Building_Open        = 1 : Loc.Building_Open     === "success" ? 2 : Loc.Building_Open    === "warning"    ? 0 : 0);
        Loc.Tuesday_Arrival         = (Loc.Tuesday_Arrival=== "primary" ? Loc.Tuesday_Arrival      = 1 : Loc.Tuesday_Arrival   === "success" ? 2 : Loc.Tuesday_Arrival  === "warning"    ? 0 : 0);
        Loc.Open_Ready              = (Loc.Open_Ready === "primary" ? Loc.Open_Ready           = 1 : Loc.Open_Ready        === "success" ? 2 : Loc.Open_Ready       === "warning"    ? 0 : 0);
        Loc.Close_Poll_Report       = (Loc.Close_Poll_Report === "primary" ? Loc.Close_Poll_Report = 1 : Loc.Close_Poll_Report === "success" ? 2 : Loc.Close_Poll_Report === "warning" ? 0 : 0);
      //  Loc.user_Name               = userProfile.getProfile().username
       

            
        //return $http({
        //    method: 'POST',
        return $http({
            method: 'POST',
            url: domain + '/poll_Location/' + Loc.Poll_Id,
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
                ClosePollReady: Loc.Close_Poll_Report,
                user_Name: userProfile.getProfile().username,
                Role: userProfile.getProfile().Role
            }),
                headers: authHeaders,
                contentType: 'application/json'

            }).then(function (response, status) {
               
                return response;

            });
    }
    return obj;
}]);