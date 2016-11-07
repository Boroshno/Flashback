using FlashBackMaps.Utils.Amazon;
using FlashBackMaps.Utils.Concrete;
using FlashBackMaps.Utils.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FlashBackMaps.Controllers
{
    public class AddPhotoController : Controller
    {
        private const string _uploadFolder = "/";

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

        [HttpGet]
        public void UploadFile()
        {
            var queryString = Request.QueryString;
            if (queryString.Count == 0) return;

            // Read parameters
            var uploadToken = queryString.Get("upload_Token");
            int resumableChunkNumber = int.Parse(queryString.Get("resumableChunkNumber"));
            //var resumableIdentifier = queryString.Get("resumableIdentifier");
            //var resumableChunkSize = queryString.Get("resumableChunkSize");
            //var resumableTotalSize = queryString.Get("resumableTotalSize");
            //var resumableFilename = queryString.Get("resumableFilename");

            var filePath = string.Format("{0}/{1}/{1}.part{2}", _uploadFolder,
                           uploadToken, resumableChunkNumber.ToString("0000"));
            var localFilePath = Server.MapPath(filePath);

            // Response
            var fileExists = System.IO.File.Exists(localFilePath);
            if (fileExists)
            {
                Response.Status = "200 OK";
                Response.StatusCode = 200;
            }
            else
            {
                Response.Status = "404 Not Found";
                Response.StatusCode = 404;
            }
        }

        [HttpPost]
        public void UploadFile(object data)
        {
            var queryString = Request.Form;
            if (queryString.Count == 0) return;

            // Read parameters
            var uploadToken = queryString.Get("upload_Token");
            int resumableChunkNumber = int.Parse(queryString.Get("resumableChunkNumber"));
            var resumableFilename = queryString.Get("resumableFilename");
            var resumableIdentifier = queryString.Get("resumableIdentifier");
            int resumableChunkSize = int.Parse(queryString.Get("resumableChunkSize"));
            long resumableTotalSize = long.Parse(queryString.Get("resumableTotalSize"));

            var filePath = string.Format("{0}/{1}/{1}.part{2}", _uploadFolder,
                                  uploadToken, resumableChunkNumber.ToString("0000"));
            var localFilePath = Server.MapPath(filePath);
            var directory = System.IO.Path.GetDirectoryName(localFilePath);
            if (!System.IO.Directory.Exists(localFilePath)) System.IO.Directory.CreateDirectory(directory);

            if (Request.Files.Count == 1)
            {
                // save chunk
                if (!System.IO.File.Exists(localFilePath))
                {
                    Request.Files[0].SaveAs(localFilePath);
                }

                // Check if all chunks are ready and save file
                var files = System.IO.Directory.GetFiles(directory);
                if ((files.Length + 1) * (long)resumableChunkSize >= resumableTotalSize)
                {
                    filePath = string.Format("{0}/{1}{2}", _uploadFolder,
                      uploadToken, System.IO.Path.GetExtension(resumableFilename));
                    localFilePath = Server.MapPath(filePath);
                    using (var fs = new FileStream(localFilePath, FileMode.CreateNew))
                    {
                        foreach (string file in files.OrderBy(x => x))
                        {
                            var buffer = System.IO.File.ReadAllBytes(file);
                            fs.Write(buffer, 0, buffer.Length);
                            System.IO.File.Delete(file);
                        }
                    }
                    System.IO.Directory.Delete(directory);
                }
            }
            else
            {
                // log error
            }
        }
    }
}