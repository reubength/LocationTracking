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
    
    public partial class LocTrackMain
    {
        public int poll_Id { get; set; }
        public string poll_Name { get; set; }
        public string poll_Address { get; set; }
        public Nullable<int> Zone { get; set; }
        public string ward_Name { get; set; }
        public string precincts { get; set; }
        public Nullable<int> Monday_Arrival { get; set; }
        public Nullable<int> Tuesday_Arrival { get; set; }
        public Nullable<int> OpenReady { get; set; }
        public Nullable<int> ClosePollReady { get; set; }
        public Nullable<int> Monday_Delivery { get; set; }
        public Nullable<int> Monday_Close { get; set; }
        public Nullable<int> Building_Open { get; set; }
    }
}
