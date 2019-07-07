using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace CusStoreWeb.Common
{
    public partial class map : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public string LoadNetTechMap()
        {
            StringBuilder str = new StringBuilder();
            string ActionUrl = Request.Url.AbsolutePath.ToLower();

            str.Append("<div class='page-bar' style='margin-top:-20px;'>");
            str.Append(@"
<div class='btn-group pull-right'>
    <button type='button' class='btn btn-fit-height grey-salt dropdown-toggle' data-toggle='dropdown' data-hover='dropdown' data-delay='1000' data-close-others='true' aria-expanded='false'>
        <font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>
						主题切换 </font></font><i class='fa fa-angle-down'></i>
    </button>
    <ul class='dropdown-menu pull-right' role='menu'>
        <li>
            <a href='#' id='skin_default'><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>黑色</font></font></a>
        </li>
   <li class='divider'></li>
        <li>
            <a href='#' id='skin_blue'><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>蓝色</font></font></a>
        </li>
   
        <li class='divider'></li>
        <li>
            <a href='#' id='skin_grey'><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>灰色</font></font></a>
        </li> 
 
    </ul>
</div>");
            str.Append("<ul class='page-breadcrumb'>");
            str.Append("<li>");
            str.Append("<i class='fa fa-home'></i>");
            str.Append("<a href=''>管理首页</a>");
            str.Append("</li>");
            str.Append("</ul>");
            str.Append("</div>");
            return str.ToString();
        }
    }
}