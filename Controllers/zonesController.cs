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

namespace LocationTracking.Controllers
{
    public class zonesController : ApiController
    {
        private ElectionReportingEntities db = new ElectionReportingEntities();

        // GET: api/zones
        public IQueryable<dbo_zones> Getdbo_zones()
        {
            return db.dbo_zones;
        }

        // GET: api/zones/5
        [ResponseType(typeof(dbo_zones))]
        public IHttpActionResult Getdbo_zones(int id)
        {
            dbo_zones dbo_zones = db.dbo_zones.Find(id);
            if (dbo_zones == null)
            {
                return NotFound();
            }

            return Ok(dbo_zones);
        }


        // PUT: api/zones/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult Putdbo_zones(int id, dbo_zones dbo_zones)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != dbo_zones.id_zone)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(dbo_zones).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!dbo_zonesExists(id))
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

        //[ResponseType(typeof(poll_Location))]
        //public IHttpActionResult Postpoll_Location(poll_Location poll_Location)
        //{
        //    if (poll_Location.poll_Id != 0)
        //    {
        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest(ModelState);
        //        }

        //        if (poll_Location.poll_Id != poll_Location.poll_Id)
        //        {
        //            return BadRequest();
        //        }

        //        db.Entry(poll_Location).State = EntityState.Modified;

        //        try
        //        {
        //            db.SaveChanges();
        //            locationUpdatesHub.SayHello();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!poll_LocationExists(poll_Location.poll_Id))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //    }

        //    // return StatusCode(HttpStatusCode.NoContent);
        //    else
        //    {

        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest(ModelState);
        //        }

        //        db.poll_Location.Add(poll_Location);

        //        try
        //        {
        //            db.SaveChanges();
        //        }
        //        catch (DbUpdateException)
        //        {
        //            if (poll_LocationExists(poll_Location.poll_Id))
        //            {
        //                return Conflict();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //    }
        //    return CreatedAtRoute("DefaultApi", new { id = poll_Location.poll_Id }, poll_Location);
        //}

        // POST: api/zones
        [ResponseType(typeof(dbo_zones))]
        public IHttpActionResult Postdbo_zones(dbo_zones dbo_zones)
        {
            if (dbo_zones.id_zone!=0)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (dbo_zones.id_zone != dbo_zones.id_zone)
                {
                    return BadRequest();
                }

                db.Entry(dbo_zones).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!dbo_zonesExists(dbo_zones.id_zone))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            else
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.dbo_zones.Add(dbo_zones);

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateException)
                {
                    if (dbo_zonesExists(dbo_zones.id_zone))
                    {
                        return Conflict();
                    }
                    else
                    {
                        throw;
                    }
                }
            }            

            return CreatedAtRoute("DefaultApi", new { id = dbo_zones.id_zone }, dbo_zones);
        }

        // DELETE: api/zones/5
        [ResponseType(typeof(dbo_zones))]
        public IHttpActionResult Deletedbo_zones(int id)
        {
            dbo_zones dbo_zones = db.dbo_zones.Find(id);
            if (dbo_zones == null)
            {
                return NotFound();
            }

            db.dbo_zones.Remove(dbo_zones);
            db.SaveChanges();

            return Ok(dbo_zones);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool dbo_zonesExists(int id)
        {
            return db.dbo_zones.Count(e => e.id_zone == id) > 0;
        }
    }
}