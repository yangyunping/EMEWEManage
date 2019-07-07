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
        private void GetNowUrlByPName(NetTech.SqlHelper broker, string UrlPath, ref string PName, ref string CName)
        {
            //UrlPath = UrlPath.Substring(0, UrlPath.Length);

            string[] Names1 = { "@Url" };
            string[] Values2 = { UrlPath };
            DataTable dt = broker.GetDataTable("  exec Home_Login_QueryMenuByPNameCName @Url", Names1, Values2);

            string Url = "";
            if (dt.Rows.Count > 0)
            {
                PName = dt.Rows[0]["PName"].ToString();
                CName = dt.Rows[0]["CName"].ToString();
            }



        }
        public string LoadNetTechMap()
        {
            StringBuilder str = new StringBuilder();


            string ActionUrl = Request.Url.AbsolutePath.ToLower();

            //if (ActionUrl.ToLower() == "/../home/index/Default/YPdefault.aspx".ToLower())//默认首页

            string BaseUrl = ConfigurationManager.ConnectionStrings["BaseUrl"].ConnectionString.Trim();

            string _BaseUrl = "/" + BaseUrl + "/home/index/default/ypdefault.aspx";
            if (ActionUrl.ToLower() == _BaseUrl.ToLower())//默认首页
            {
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
                //str.Append("<i class='fa fa-angle-right'></i>");
                str.Append("</li>");
                //str.Append("<li>");
                //str.Append("<a href=''>各个数据数量统计</a>");
                //str.Append("</li>");
                str.Append("</ul>");
                str.Append("</div>");
            }
            else //if (ActionUrl.ToLower() == "Site/BZ/Apply.aspx".ToLower())
            {
                string[] SelActionUrl = ActionUrl.Split('/');
                string NowSelUrlO = SelActionUrl[SelActionUrl.Length - 4];
                string NowSelUrlA = SelActionUrl[SelActionUrl.Length - 3];
                string NowSelUrlB = SelActionUrl[SelActionUrl.Length - 2];
                string NowSelUrlC = SelActionUrl[SelActionUrl.Length - 1];
                string NowSelUrl = NowSelUrlO + "/" + NowSelUrlA + "/" + NowSelUrlB + "/" + NowSelUrlC;



                NetTech.SqlHelper broker = new NetTech.SqlHelper();
                broker.Open();
                string PName = "";
                string CName = "";
                GetNowUrlByPName(broker, NowSelUrl, ref PName, ref CName);
                broker.Close();






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
                str.Append("<a href=''>" + PName + "</a>");
                str.Append("<i class='fa fa-angle-right'></i>");
                str.Append("</li>");
                str.Append("<li>");
                str.Append("<a href=''>" + CName + "</a>");
                str.Append("</li>");
                str.Append("</ul>");
                str.Append("</div>");
            }
            return str.ToString();
        }
    }
}