using Amazon.S3.Model;
using Amazon.S3.Transfer;
using FlashBackMaps.Utils.Amazon;
using FlashBackMaps.Utils.Concrete;
using FlashBackMaps.Utils.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FlashBackMaps.Areas.Admin.Controllers
{
    public class HomeController : Controller
    {
        // GET: Admin/Home
        //[Authorize(Roles = "Admin, AnotherRole")]
        public ActionResult Index()
        {
            EFPhotoPairRepository php = new EFPhotoPairRepository();
            PhotoPair ph = new PhotoPair();
            ph.Name = "sss";

            php.AddOrUpdatePhotoPair(ph);

            List<PhotoPair> phpList = php.PhotoPairs.ToList();
            return View();
        }

        public ActionResult Admin()
        {
            string apiUri = Url.HttpRouteUrl("DefaultApi", new { controller = "admin", });
            ViewBag.ApiUrl = new Uri(Request.Url, apiUri).AbsoluteUri.ToString();

            return View();
        }

        public ActionResult FileUpload(HttpPostedFileBase file)
        {
            if (file != null)
            {
                //string pic = System.IO.Path.GetFileName(file.FileName);
                //string path = System.IO.Path.Combine(
                //                       Server.MapPath("~/images/profile"), pic);
                //// file is uploaded
                //file.SaveAs(path);

                // save the image path path to the database or you can send image 
                // directly to database
                // in-case if you want to store byte[] ie. for DB
                using (MemoryStream ms = new MemoryStream())
                {
                    file.InputStream.CopyTo(ms);
                    //byte[] array = ms.GetBuffer();
                    AmazonServices.sendMyFileToS3(ms, "flashbackmaps", "oldnewphotos", file.FileName);
                }

            }
            // after successfully uploading redirect the user
            return RedirectToAction("Index", "Home");
        }
    }
}