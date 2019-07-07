using System;
using System.Web.UI;

namespace CusStoreWeb
{
    public partial class Login : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            NetTech.CookieHelper.WriteCookie("HQCode", "", 180);
            NetTech.CookieHelper.WriteCookie("BranchCode", "", 180);
            NetTech.CookieHelper.WriteCookie("SiteCode", "", 180);
            NetTech.CookieHelper.WriteCookie("OrgType", "", 180);
            NetTech.CookieHelper.WriteCookie("Name", "", 180);
            NetTech.CookieHelper.WriteCookie("WorkID", "", 180);
            NetTech.CookieHelper.WriteCookie("RoleID", "", 180);
            NetTech.CookieHelper.WriteCookie("RoleName", "", 180);
        }
    }
}