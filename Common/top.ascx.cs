using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EMEWEManage.Common
{
    public partial class top : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        public string NetTechTop()
        {
            string BaseUrl = ConfigurationManager.ConnectionStrings["BaseUrl"].ConnectionString.Trim();
            string ActionUrl = Request.Url.AbsolutePath.ToLower();
            if (ActionUrl == ("/" + BaseUrl + "/home/index/default.aspx").ToLower())
            {
                return "../../";
            }
            else
            {
                return "../../../";
            }
        }


        public string RoleName()
        {
            string UserName = NetTech.CookieHelper.GetCookie("RoleName");
            return UserName;
        }
        public string UserName()
        {
            string UserName = NetTech.CookieHelper.GetCookie("Name");
            return UserName;
        }

        public string BranchName()
        {
            string BranchName = NetTech.CookieHelper.GetCookie("BranchName");
            string SiteName = NetTech.CookieHelper.GetCookie("SiteName");
            string str = "";
            if (BranchName.Length <= 0)
            {
                str = "洋祺智能科技有限公司";
            }
            else
            {
                if (SiteName.Length <= 0)
                {
                    str = BranchName;
                }
                else
                {
                    str = BranchName + "【" + SiteName + "】";
                }
            }
            return str;
        }
    }
}