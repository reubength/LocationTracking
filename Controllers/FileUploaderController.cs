using LocationTracking.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using LocationTracking.Objects;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Web.Http.Description;

namespace LocationTracking.Controllers
{
    [Authorize(Roles = "Admin, Manager, Supervisor")]     
    public class FileUploaderController : ApiController
    {
        private ElectionReportingEntities db = new ElectionReportingEntities();


         // GET: api/FileUploader
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/FileUploader/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/FileUploader
        [ResponseType(typeof(void))]
        public IHttpActionResult Post()
        {
            string sPath = "";
            string kmlPath = "";
            int iUploadedCnt = 0;
            sPath = HostingEnvironment.MapPath("~/locker/");
           // kmlPath = HostingEnvironment.MapPath("~/KML/");
            HttpFileCollection hfc = HttpContext.Current.Request.Files;
             
            for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
            {
                HttpPostedFile hpf = hfc[iCnt];

                if (hpf.ContentLength > 0)
                {
                    // CHECK IF THE SELECTED FILE(S) ALREADY EXISTS IN FOLDER. (AVOID DUPLICATE)
                    if (!File.Exists(sPath + Path.GetFileName(hpf.FileName)))
                    {
                        //SAVE THE FILES IN THE FOLDER.
                        hpf.SaveAs(sPath + Path.GetFileName(hfc.AllKeys[iCnt].ToString() + ".csv"));
                        iUploadedCnt = iUploadedCnt + 1;
                    }
                }
            }
            if (iUploadedCnt > 0)
            {
                for (int i = 0; i < iUploadedCnt; i++)
                {
                    ExcelObject excel = new ExcelObject();
                    excel.readExcelFile(sPath + hfc.AllKeys[i].ToString() + ".csv");
                    if (hfc.AllKeys[i].ToString() == "Location List")
                    {
                        int colcnt = 4;
                        // poll_Location poll = new poll_Location();
                        while (colcnt < excel.ReadList.Count)
                        {
                            poll_Location poll = new poll_Location();
                            poll.poll_Id = int.Parse(excel.ReadList[colcnt].ToString());
                            colcnt++;
                            poll.poll_Name = excel.ReadList[colcnt].ToString();
                            colcnt++;
                            poll.poll_Address = excel.ReadList[colcnt].ToString();
                            colcnt++;
                            poll.Zone = int.Parse(excel.ReadList[colcnt].ToString());
                            colcnt++;
                            poll.Monday_Arrival = 0;
                            poll.Tuesday_Arrival = 0;
                            poll.OpenReady = 0;
                            poll.ClosePollReady = 0;
                            db.Entry(poll).State = EntityState.Modified;

                            if (!ModelState.IsValid)
                            {
                                return BadRequest(ModelState);
                            }

                            db.poll_Location.Add(poll);

                            try
                            {
                                db.SaveChanges();
                            }
                            catch (DbUpdateException)
                            {
                                if (poll_LocationExists(poll.poll_Id))
                                {
                                    return Conflict();
                                }
                                else
                                {
                                    throw;
                                }
                            }
                        }
                    }
                    else if(hfc.AllKeys[i].ToString() == "Location Details")
                    {
                        int colcnt = 4;
                        while (colcnt < excel.ReadList.Count)
                        {
                            dbo_poll_ContactDetails pollCnt = new dbo_poll_ContactDetails();
                           
                            pollCnt.poll_Id = int.Parse(excel.ReadList[colcnt].ToString()); 
                            colcnt++;
                            pollCnt.contact_FirstName = excel.ReadList[colcnt].ToString(); 
                            colcnt++;
                            pollCnt.contact_LastName = excel.ReadList[colcnt].ToString(); 
                            colcnt++;
                            pollCnt.contact_Type = excel.ReadList[3].ToString();
                           // colcnt++;
                            pollCnt.contact_Info = excel.ReadList[colcnt].ToString(); 
                            colcnt++;
                            db.Entry(pollCnt).State = EntityState.Modified;
                            if (!ModelState.IsValid)
                            {
                                return BadRequest(ModelState);
                            }

                            db.dbo_poll_ContactDetails.Add(pollCnt);

                            try
                            {
                                db.SaveChanges();
                            }
                            catch (DbUpdateException)
                            {
                                //if (!dbo_poll_ContactDetails(pollCnt.poll_Id))
                                //{
                                //    return Conflict();
                                //}
                                //else
                                //{
                                //    throw;
                                //}
                            }
                        }

                    }
                    else if (hfc.AllKeys[i].ToString() == "Precinct List")
                    {
                        int colcnt = 4;

                        while (colcnt < excel.ReadList.Count)
                        {
                            election_Precinct precinct = new election_Precinct();
                            precinct.poll_Id = int.Parse(excel.ReadList[colcnt].ToString());
                            colcnt++;
                            precinct.precinct_Id = int.Parse(excel.ReadList[colcnt].ToString());
                            colcnt++;
                            precinct.ward_Name = excel.ReadList[colcnt].ToString();
                            colcnt++;
                            precinct.precinct = excel.ReadList[colcnt].ToString();
                            colcnt++;
                            db.Entry(precinct).State = EntityState.Modified;

                            if (!ModelState.IsValid)
                            {
                                return BadRequest(ModelState);
                            }

                            db.election_Precinct.Add(precinct);

                            try
                            {
                                db.SaveChanges();
                            }
                            catch (DbUpdateException)
                            {
                                if (!election_PrecinctExists(precinct.poll_Id))
                                {
                                    return Conflict();
                                }
                                else
                                {
                                    throw;
                                }
                            }

                        }

                    }
                    else if (hfc.AllKeys[i].ToString() == "KMLFile")
                    {
                        
                    }
                    else if (hfc.AllKeys[i].ToString() == "Polling Location All")
                    {
                        int colcnt = 8;

                        while (colcnt < excel.ReadList.Count)
                        {
                            poll_Location_All pollAll = new poll_Location_All();
                            pollAll.poll_id = int.Parse(excel.ReadList[colcnt].ToString());
                            colcnt++;
                            pollAll.status = excel.ReadList[colcnt].ToString();
                            colcnt++;
                            pollAll.latitude = double.Parse(excel.ReadList[colcnt].ToString());
                            colcnt++;
                            pollAll.longitude = double.Parse(excel.ReadList[colcnt].ToString());
                            colcnt++;
                            pollAll.location_Name = excel.ReadList[colcnt].ToString();
                            colcnt++;
                            pollAll.location_Address = excel.ReadList[colcnt].ToString();
                            colcnt++;
                            pollAll.city = excel.ReadList[colcnt].ToString();
                            colcnt++;
                            pollAll.state = excel.ReadList[colcnt].ToString();
                            colcnt++;
                            db.Entry(pollAll).State = EntityState.Modified;

                            if (!ModelState.IsValid)
                            {
                                return BadRequest(ModelState);
                            }

                            db.poll_Location_All.Add(pollAll);

                            try
                            {
                                db.SaveChanges();
                            }
                            catch (DbUpdateException)
                            {
                                if (!poll_Location_AllExists(pollAll.poll_id))

                                {
                                    return Conflict();
                                }
                                else
                                {
                                    throw;
                                }
                            }

                        }

                    }
                }
                DirectoryInfo di = new DirectoryInfo(sPath);                        
                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                    

            }
            else
            {
                // return "Upload Failed";
            }
            

            return StatusCode(HttpStatusCode.NoContent);
        }

        // PUT: api/FileUploader/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE: api/FileUploader/5
        public void Delete(int id)
        {
        }

         private bool poll_LocationExists(int id)
        {
            return db.poll_Location.Count(e => e.poll_Id == id) > 0;
        }
        private bool election_PrecinctExists(int id)
        {
            return db.election_Precinct.Count(e => e.poll_Id == id) > 0;
        }
        private bool poll_Location_AllExists(int id)
        {
            return db.poll_Location_All.Count(e => e.poll_id == id) > 0;
        }
        //private bool dbo_poll_ContactDetails(int id)
        //{
        //    return db.dbo_poll_ContactDetails.Count(e => e. == id) > 0;
        //}
    }
}
