using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CusStoreWeb.HQ.Organization.OrgUser
{
    public partial class frmOrgUser : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            NetTech.Check.LoginState();
        }
    }
}