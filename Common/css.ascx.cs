using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CusStoreWeb.Common
{
    public partial class css : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        public string SkinKey()
        {
            string Skin = NetTech.CookieHelper.GetCookie("Skin");
            return Skin;
        }
    }
}