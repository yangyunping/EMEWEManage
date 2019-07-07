using System;
using System.Web.UI;

namespace CusStoreWeb.HQ.Service.Product
{
    public partial class frmProduct : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            NetTech.Check.LoginState();
        }
    }
}