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
    [Authorize(Roles = "Admin, Manager, Supervisor")]
    public class AspNetRolesController : ApiController
    {
        private ElectionReportingEntities db = new ElectionReportingEntities();

        // GET: api/AspNetRoles
        //public IEnumerable<AspNetRole> GetAspNetRoles()
        public IEnumerable<string> GetAspNetRoles()
        {
            return (from Role in db.AspNetRoles select Role.Name).ToList(); //db.AspNetRoles;
        }

        // GET: api/AspNetRoles/5
        [ResponseType(typeof(AspNetRole))]
        public IHttpActionResult GetAspNetRole(string id)
        {
            AspNetRole aspNetRole = db.AspNetRoles.Find(id);
            if (aspNetRole == null)
            {
                return NotFound();
            }

            return Ok(aspNetRole);
        }

        // PUT: api/AspNetRoles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAspNetRole(string id, AspNetRole aspNetRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != aspNetRole.Id)
            {
                return BadRequest();
            }

            db.Entry(aspNetRole).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AspNetRoleExists(id))
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

        // POST: api/AspNetRoles
        [ResponseType(typeof(AspNetRole))]
        public IHttpActionResult PostAspNetRole(AspNetRole aspNetRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AspNetRoles.Add(aspNetRole);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (AspNetRoleExists(aspNetRole.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = aspNetRole.Id }, aspNetRole);
        }

        // DELETE: api/AspNetRoles/5
        [ResponseType(typeof(AspNetRole))]
        public IHttpActionResult DeleteAspNetRole(string id)
        {
            AspNetRole aspNetRole = db.AspNetRoles.Find(id);
            if (aspNetRole == null)
            {
                return NotFound();
            }

            db.AspNetRoles.Remove(aspNetRole);
            db.SaveChanges();

            return Ok(aspNetRole);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AspNetRoleExists(string id)
        {
            return db.AspNetRoles.Count(e => e.Id == id) > 0;
        }
    }
}