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
    public class poll_ContactDetailsController : ApiController
    {
        private ElectionReportingEntities db = new ElectionReportingEntities();

        // GET: api/poll_ContactDetails
        public IQueryable<dbo_poll_ContactDetails> Getdbo_poll_ContactDetails()
        {
            return db.dbo_poll_ContactDetails;
        }

        //// GET: api/poll_ContactDetails/5
        //[ResponseType(typeof(dbo_poll_ContactDetails))]
        //public IHttpActionResult Getdbo_poll_ContactDetails(int id)
        //{
        //    dbo_poll_ContactDetails dbo_poll_ContactDetails = db.dbo_poll_ContactDetails.Find(id);
        //    if (dbo_poll_ContactDetails == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(dbo_poll_ContactDetails);
        //}

        // GET: api/poll_ContactDetails/5
        [ResponseType(typeof(dbo_poll_ContactDetails))]
        public IEnumerable<dbo_poll_ContactDetails> Getdbo_poll_ContactDetails(int id)
        {
            return (from pcd in db.dbo_poll_ContactDetails where pcd.poll_Id  == id select pcd).ToList();
        }
    

        // PUT: api/poll_ContactDetails/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult Putdbo_poll_ContactDetails(int id, dbo_poll_ContactDetails dbo_poll_ContactDetails)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != dbo_poll_ContactDetails.r_Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(dbo_poll_ContactDetails).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!dbo_poll_ContactDetailsExists(id))
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

        // POST: api/poll_ContactDetails
        [ResponseType(typeof(dbo_poll_ContactDetails))]
        public IHttpActionResult Postdbo_poll_ContactDetails(dbo_poll_ContactDetails dbo_poll_ContactDetails)
        {
            if(dbo_poll_ContactDetails.r_Id != 0)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (dbo_poll_ContactDetails.r_Id != dbo_poll_ContactDetails.r_Id)
                {
                    return BadRequest();
                }

                db.Entry(dbo_poll_ContactDetails).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!dbo_poll_ContactDetailsExists(dbo_poll_ContactDetails.r_Id))
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

                db.dbo_poll_ContactDetails.Add(dbo_poll_ContactDetails);

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateException)
                {
                    if (dbo_poll_ContactDetailsExists(dbo_poll_ContactDetails.r_Id))
                    {
                        return Conflict();
                    }
                    else
                    {
                        throw;
                    }
                }
            }            

            return CreatedAtRoute("DefaultApi", new { id = dbo_poll_ContactDetails.r_Id }, dbo_poll_ContactDetails);
        }

        // DELETE: api/poll_ContactDetails/5
        [ResponseType(typeof(dbo_poll_ContactDetails))]
        public IHttpActionResult Deletedbo_poll_ContactDetails(int id)
        {
            dbo_poll_ContactDetails dbo_poll_ContactDetails = db.dbo_poll_ContactDetails.Find(id);
            if (dbo_poll_ContactDetails == null)
            {
                return NotFound();
            }

            db.dbo_poll_ContactDetails.Remove(dbo_poll_ContactDetails);
            db.SaveChanges();

            return Ok(dbo_poll_ContactDetails);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool dbo_poll_ContactDetailsExists(int id)
        {
            return db.dbo_poll_ContactDetails.Count(e => e.r_Id == id) > 0;
        }
    }
}