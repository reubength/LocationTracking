using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using LocationTracking.Models;

namespace LocationTracking.Hubs
{
    public class locationUpdatesHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<locationUpdatesHub>();
        public void Hello()
        {
            Clients.All.hello();
        }
        public static void SayHello(poll_Location poll_Location)
        {
            //hubContext.Clients.User("r@g.com").hello();

             hubContext.Clients.All.hello(poll_Location);
            //hubContext.Clients.AllExcept()
            //  Clients.User("");
        }

        public override Task OnConnected()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            string userid = Context.Request.User.Identity.Name;
            Groups.Add(Context.ConnectionId, userid);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }
    }
}
public static class UserHandler
{
    public static HashSet<string> ConnectedIds = new HashSet<string>();

}