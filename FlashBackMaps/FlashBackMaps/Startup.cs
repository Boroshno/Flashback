using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FlashBackMaps.Startup))]
namespace FlashBackMaps
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
