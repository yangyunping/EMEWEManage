using System;
using System.Web.UI;

namespace CusStoreWeb.HQ.Organization.Site
{
    public partial class frmSite : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            NetTech.Check.LoginState();
        }
    }
}