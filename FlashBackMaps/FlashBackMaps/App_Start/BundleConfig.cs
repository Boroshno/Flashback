using System.Web;
using System.Web.Optimization;

namespace FlashBackMaps
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/angular.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/leaflet").Include(
                      "~/Scripts/leaflet.js"));

            bundles.Add(new ScriptBundle("~/bundles/mainpagescripts").Include(
                      "~/Scripts/PageScripts/LeafletMainPage.js"));

            bundles.Add(new ScriptBundle("~/bundles/addflashback").Include(
                      "~/Scripts/Controllers/AddFlashBackController.js"));

            bundles.Add(new ScriptBundle("~/bundles/photouploaderjs").Include(
                      "~/Scripts/flow.js",
                      "~/Scripts/flow.min.js",
                      "~/Scripts/ng-flow.js",
                      "~/Scripts/ng-flow.min.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/leaflet").Include(
                      "~/Content/leaflet.css"));
        }
    }
}
