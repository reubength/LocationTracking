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
    public class election_PrecinctController : ApiController
    {
        private ElectionReportingEntities db = new ElectionReportingEntities();

        // GET: api/election_Precinct
        public IQueryable<election_Precinct> Getelection_Precinct()
        {
            return db.election_Precinct;
        }

        // GET: api/election_Precinct/5
        [ResponseType(typeof(election_Precinct))]
        public IHttpActionResult Getelection_Precinct(int id)
        {
            election_Precinct election_Precinct = db.election_Precinct.Find(id);
            if (election_Precinct == null)
            {
                return NotFound();
            }

            return Ok(election_Precinct);
        }

        // PUT: api/election_Precinct/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putelection_Precinct(int id, election_Precinct election_Precinct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != election_Precinct.poll_Id)
            {
                return BadRequest();
            }

            db.Entry(election_Precinct).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!election_PrecinctExists(id))
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

        // POST: api/election_Precinct
        [ResponseType(typeof(election_Precinct))]
        public IHttpActionResult Postelection_Precinct(election_Precinct election_Precinct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.election_Precinct.Add(election_Precinct);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (election_PrecinctExists(election_Precinct.poll_Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = election_Precinct.poll_Id }, election_Precinct);
        }

        // DELETE: api/election_Precinct/5
        [ResponseType(typeof(election_Precinct))]
        public IHttpActionResult Deleteelection_Precinct(int id)
        {
            election_Precinct election_Precinct = db.election_Precinct.Find(id);
            if (election_Precinct == null)
            {
                return NotFound();
            }

            db.election_Precinct.Remove(election_Precinct);
            db.SaveChanges();

            return Ok(election_Precinct);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool election_PrecinctExists(int id)
        {
            return db.election_Precinct.Count(e => e.poll_Id == id) > 0;
        }
    }
}