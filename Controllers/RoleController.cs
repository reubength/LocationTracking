using LocationTracking.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LocationTracking.Controllers
{
    public class RoleController : ApiController
    {
        ApplicationDbContext context;

        public RoleController()
        {
            context = new ApplicationDbContext();
        }
        /// <summary>
        /// Get All Roles
        /// </summary>
        /// <returns></returns>
        public IHttpActionResult Index()
        {
            var Roles = context.Roles.ToList();
            return Ok(Roles);
        }

        /// <summary>
        /// Create a New Role
        /// </summary>
        /// <param name="Role"></param>
        /// <returns></returns>
        /// 
        //POST: api/Roles/Create
        [HttpPost]
        [Authorize(Roles="Admin")]
        public IHttpActionResult Create(IdentityRole Role)
        {
            context.Roles.Add(Role);
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
