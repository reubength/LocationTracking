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
   
    public class poll_Location_AllController : ApiController
    {
        private ElectionReportingEntities db = new ElectionReportingEntities();

        // GET: api/poll_Location_All
        public IQueryable<poll_Location_All> Getpoll_Location_All()
        {
            return db.poll_Location_All;
        }

        // GET: api/poll_Location_All/5
        [ResponseType(typeof(poll_Location_All))]
        public IHttpActionResult Getpoll_Location_All(double id)
        {
            poll_Location_All poll_Location_All = db.poll_Location_All.Find(id);
            if (poll_Location_All == null)
            {
                return NotFound();
            }

            return Ok(poll_Location_All);
        }

        // PUT: api/poll_Location_All/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putpoll_Location_All(double id, poll_Location_All poll_Location_All)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != poll_Location_All.poll_id)
            {
                return BadRequest();
            }

            db.Entry(poll_Location_All).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!poll_Location_AllExists(id))
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

        // POST: api/poll_Location_All
        [ResponseType(typeof(poll_Location_All))]
        public IHttpActionResult Postpoll_Location_All(poll_Location_All poll_Location_All)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.poll_Location_All.Add(poll_Location_All);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (poll_Location_AllExists(poll_Location_All.poll_id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = poll_Location_All.poll_id }, poll_Location_All);
        }

        // DELETE: api/poll_Location_All/5
        [ResponseType(typeof(poll_Location_All))]
        public IHttpActionResult Deletepoll_Location_All(double id)
        {
            poll_Location_All poll_Location_All = db.poll_Location_All.Find(id);
            if (poll_Location_All == null)
            {
                return NotFound();
            }

            db.poll_Location_All.Remove(poll_Location_All);
            db.SaveChanges();

            return Ok(poll_Location_All);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool poll_Location_AllExists(double id)
        {
            return db.poll_Location_All.Count(e => e.poll_id == id) > 0;
        }
    }
}