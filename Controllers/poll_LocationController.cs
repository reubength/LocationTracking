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
using LocationTracking.Hubs;
using LocationTracking.Models;
using LocationTracking.ViewModels;

namespace LocationTracking.Controllers
{
    [Authorize]
    public class poll_LocationController : ApiController
    {
        private ElectionReportingEntities db = new ElectionReportingEntities();

        // GET: api/poll_Location
        public IQueryable<LocationViewModel> Getpoll_Location()
        {
            //LinQ With join to get precinct
            var LocationViewModel = from pl in db.poll_Location
                                    join ep in db.election_Precinct on pl.poll_Id equals ep.poll_Id
                                    select new LocationViewModel
                                    {
                                        Poll_Id             = pl.poll_Id,
                                        Poll_Name           = pl.poll_Name,
                                        Poll_Address        = pl.poll_Address,
                                        Precinct_Id         = ep.precinct_Id,
                                        Ward_Name           = ep.ward_Name,
                                        Precinct            = ep.precinct
                                        //Monday_Arrival       = 
                                        //Tuesday_Arrival     
                                        //Open_Ready           
                                        //Close_Poll_Report   
                                    };

            // return db.poll_Location;
            return LocationViewModel;
        }

        // GET: api/poll_Location/5
        [ResponseType(typeof(poll_Location))]
        public IHttpActionResult Getpoll_Location(int id)
        {
           
            poll_Location poll_Location = db.poll_Location.Find(id);

            
            if (poll_Location == null)
            {
                return NotFound();
            }

            return Ok(poll_Location);
        }

        // POST: api/poll_Location/5
        //[ResponseType(typeof(void))]
        ////[AcceptVerbs("PUT")]
        //public IHttpActionResult Postpoll_Location(int id, poll_Location poll_Location)
        //{
        //    //poll_Location.Monday_Arrival = (poll_Location.Monday_Arrival  == "success") ? 1 : 0;
        //    //poll_Location.Tuesday_Arrival = (poll_Location.Tuesday_Arrival == "success") ? 1 : 0;
        //    //poll_Location.OpenReady= (poll_Location.OpenReady == "success") ? 1 : 0;
        //    //poll_Location.ClosePollReady = (poll_Location.ClosePollReady == "success") ? 1 : 0;


        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != poll_Location.poll_Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(poll_Location).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //        locationUpdatesHub.SayHello();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!poll_LocationExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        // POST: api/poll_Location
        [ResponseType(typeof(poll_Location))]
        public IHttpActionResult Postpoll_Location(poll_Location poll_Location)
        {
            if(poll_Location.poll_Id!=0)
            { 
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (poll_Location.poll_Id != poll_Location.poll_Id)
                {
                    return BadRequest();
                }

                db.Entry(poll_Location).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                    locationUpdatesHub.SayHello();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!poll_LocationExists(poll_Location.poll_Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            // return StatusCode(HttpStatusCode.NoContent);
            else
            { 

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.poll_Location.Add(poll_Location);

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateException)
                {
                    if (poll_LocationExists(poll_Location.poll_Id))
                    {
                        return Conflict();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return CreatedAtRoute("DefaultApi", new { id = poll_Location.poll_Id }, poll_Location);
        }

        // DELETE: api/poll_Location/5
        [ResponseType(typeof(poll_Location))]
        [AcceptVerbs("DELETE")]
        public IHttpActionResult Deletepoll_Location(int id)
        {
            poll_Location poll_Location = db.poll_Location.Find(id);
            if (poll_Location == null)
            {
                return NotFound();
            }

            db.poll_Location.Remove(poll_Location);
            db.SaveChanges();

            return Ok(poll_Location);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool poll_LocationExists(int id)
        {
            return db.poll_Location.Count(e => e.poll_Id == id) > 0;
        }
    }
}