//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LocationTracking.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class poll_Location_All
    {
        public int poll_id { get; set; }
        public string status { get; set; }
        public Nullable<double> latitude { get; set; }
        public Nullable<double> longitude { get; set; }
        public string location_Name { get; set; }
        public string location_Address { get; set; }
        public string city { get; set; }
        public string state { get; set; }
    }
}