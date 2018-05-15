using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LocationTracking.ViewModels
{
    public class LocationViewModel
    {
        public int      Poll_Id             { get; set; }
        public string   Poll_Name           { get; set; }
        public string   Poll_Address        { get; set; }
        public int      Precinct_Id         { get; set; }
        public int?     Zone                { get; set; }
        public string   Ward_Name           { get; set; }
        public string   Precinct            { get; set; }
        public string   Monday_Arrival      { get; set; }
        public string   Tuesday_Arrival     { get; set; }
        public string   Open_Ready          { get; set; }
        public string   Monday_Delivery     { get; set; }
        public string   Monday_Close        { get; set; }
        public string   Building_Open       { get; set; }
        public string   Close_Poll_Report   { get; set; }
        public double?  latitude            { get; set; }
        public double?  longitude           { get; set; }
        public string   user_Name { get; set; }


        public string VetStatusData(int? Status)
        {
            string stringStatus = "warning";
            if (Status == 1)
            {
                stringStatus = "success";
            }
            else if(Status ==2)
            {
                stringStatus = "primary";

            }
            else
            {
                stringStatus = "warning";
            }
                return stringStatus;
        }
    }

 
}