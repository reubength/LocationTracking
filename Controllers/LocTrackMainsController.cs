using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using LocationTracking.Models;
using LocationTracking.ViewModels;

namespace LocationTracking.Controllers
{
    [Authorize]
    public class LocTrackMainsController : ApiController
    {
        private ElectionReportingEntities db = new ElectionReportingEntities();

        // GET: api/LocTrackMains
        public IQueryable<LocationViewModel> GetLocTrackMains()
        {
          //  LocationViewModel loc = new LocationViewModel();

            //return db.LocTrackMains;
            var LocationViewModel = from pl in db.LocTrackMains
                                    join pla in db.poll_Location_All on pl.poll_Id equals pla.poll_id
                                    select new LocationViewModel
                                    {
                                        Poll_Id             = pl.poll_Id,
                                        Poll_Name           = pl.poll_Name,
                                        Poll_Address        = pla.location_Address,
                                        //Precinct_Id = ep.precinct_Id,
                                        Ward_Name           = pl.ward_Name,
                                        Precinct            = pl.precincts,
                                        Zone                = pl.Zone,
                                        latitude            = pla.latitude,
                                        longitude           = pla.longitude,
                                        Monday_Arrival      = (pl.Monday_Arrival    == 0 ? "warning"    : pl.Monday_Arrival == 1 ? "primary": pl.Monday_Arrival == 2 ? "success" : "warning" ),// (pl.Monday_Arrival    == 1) ? "success" : "warning",
                                        Tuesday_Arrival     = (pl.Tuesday_Arrival   == 0 ? "warning"    : pl.Tuesday_Arrival == 1 ? "primary" : pl.Tuesday_Arrival == 2 ? "success" : "warning") ,//(pl.Tuesday_Arrival   == 1) ? "success" : "warning",
                                        Open_Ready          = (pl.OpenReady         == 0 ? "warning"    : pl.OpenReady == 1 ? "primary" : pl.OpenReady == 2 ? "success" : "warning"),//(pl.OpenReady         == 1) ? "success" : "warning",
                                        Close_Poll_Report   = (pl.ClosePollReady    == 0 ? "warning"    : pl.ClosePollReady == 1 ? "primary" : pl.ClosePollReady == 2 ? "success" : "warning"),//(pl.ClosePollReady    == 1) ? "success" : "warning",                                        
                                        Monday_Delivery     = (pl.Monday_Delivery   == 0 ? "warning"    : pl.Monday_Delivery == 1 ? "primary" : pl.Monday_Delivery == 2 ? "success" : "warning"),//(pl.Monday_Delivery == 1) ? "success" : "warning",
                                        Monday_Close        = (pl.Monday_Close      == 0 ? "warning"    : pl.Monday_Close == 1 ? "primary" : pl.Monday_Close == 2 ? "success" : "warning"),//(pl.Monday_Close == 1) ? "success" : "warning",
                                        Building_Open       = (pl.Building_Open     == 0 ? "warning"    : pl.Building_Open == 1 ? "primary" : pl.Building_Open == 2 ? "success" : "warning"),//(pl.Building_Open == 1) ? "success" : "warning",
                                        user_Name           = pl.user_Name

                                    };

            // return db.poll_Location;
            return LocationViewModel;
        }

        //public string VetStatusData(int? Status)
        //{
        //    string stringStatus = "warning";
        //    if (Status == 1)
        //    {
        //        stringStatus = "success";
        //    }
        //    else if (Status == 2)
        //    {
        //        stringStatus = "primary";

        //    }
        //    else
        //    {
        //        stringStatus = "warning";
        //    }
        //    return stringStatus;
        //}
    


    // GET: api/LocTrackMains/5
    [ResponseType(typeof(LocTrackMain))]
        public IHttpActionResult GetLocTrackMain(int id)
        {       
            LocTrackMain locTrackMain = db.LocTrackMains.Find(id);
            if (locTrackMain == null)
            {
                return NotFound();
            }

            return Ok(locTrackMain);
        }

        // PUT: api/LocTrackMains/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLocTrackMain(int id, LocTrackMain locTrackMain)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != locTrackMain.poll_Id)
            {
                return BadRequest();
            }

            db.Entry(locTrackMain).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocTrackMainExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/LocTrackMains
        [ResponseType(typeof(LocTrackMain))]
        public IHttpActionResult PostLocTrackMain(LocTrackMain locTrackMain)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LocTrackMains.Add(locTrackMain);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (LocTrackMainExists(locTrackMain.poll_Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = locTrackMain.poll_Id }, locTrackMain);
        }

        // DELETE: api/LocTrackMains/5
        [ResponseType(typeof(LocTrackMain))]
        public IHttpActionResult DeleteLocTrackMain(int id)
        {
            LocTrackMain locTrackMain = db.LocTrackMains.Find(id);
            if (locTrackMain == null)
            {
                return NotFound();
            }

            db.LocTrackMains.Remove(locTrackMain);
            db.SaveChanges();

            return Ok(locTrackMain);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LocTrackMainExists(int id)
        {
            return db.LocTrackMains.Count(e => e.poll_Id == id) > 0;
        }
    }
}