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
    public class audit_PollTableController : ApiController
    {
        private ElectionReportingEntities db = new ElectionReportingEntities();

        // GET: api/audit_PollTable
        public IQueryable<audit_Table> Getaudit_Table()
        {
            return db.audit_Table;
        }

        // GET: api/audit_PollTable/5
        [ResponseType(typeof(audit_Table))]
        public IHttpActionResult Getaudit_Table(int id)
        {
            audit_Table audit_Table = db.audit_Table.Find(id);
            if (audit_Table == null)
            {
                return NotFound();
            }

            return Ok(audit_Table);
        }

        // PUT: api/audit_PollTable/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult Putaudit_Table(int id, audit_Table audit_Table)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != audit_Table.r_Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(audit_Table).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!audit_TableExists(id))
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

        //// POST: api/audit_PollTable
        //[ResponseType(typeof(audit_Table))]
        //public IHttpActionResult Postaudit_Table(audit_Table audit_Table)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.audit_Table.Add(audit_Table);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = audit_Table.r_Id }, audit_Table);
        //}

        // DELETE: api/audit_PollTable/5
        [ResponseType(typeof(audit_Table))]
        public IHttpActionResult Deleteaudit_Table(int id)
        {
            audit_Table audit_Table = db.audit_Table.Find(id);
            if (audit_Table == null)
            {
                return NotFound();
            }

            db.audit_Table.Remove(audit_Table);
            db.SaveChanges();

            return Ok(audit_Table);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool audit_TableExists(int id)
        {
            return db.audit_Table.Count(e => e.r_Id == id) > 0;
        }
    }
}