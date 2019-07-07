using System;
using System.Web.UI;

namespace CusStoreWeb.HQ.Organization.CompanyPosition
{
    public partial class frmCompanyPosition : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            NetTech.Check.LoginState();
        }
    }
}