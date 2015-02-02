using System.Net;
using System.Web.Mvc;
using ExceptionBeautifier.Example.Models;

namespace ExceptionBeautifier.Example.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult NullReference()
        {
            var example = (ExampleClass) null;
            
            ViewBag.Title = example.Name; //Boom

            return View("Index");
        }

        public ActionResult NullableObject()
        {
            var example = new ExampleClass
            {
                Name = "Example"
            };

            ViewBag.Value = 100 - example.Value.Value; //Boom

            return View("Index");
        }

        public ActionResult RemoteServer()
        {
            var proxy = new WebProxy("0.0.0.0");

            using (var webClient = new WebClient {Proxy = proxy})
            {
                ViewBag.Content =
                    webClient.DownloadString("http://www.google.com");
            }

            return View("Index");
        }

        public ActionResult MissingView()
        {
            return View();
        }
    }
}
