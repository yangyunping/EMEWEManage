using System;
using System.Configuration;
using System.Data;
using System.Text;
using System.Web.UI;


namespace CusStoreWeb.Common
{
    public partial class menu : UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string HQCode = "YP";
            string BranchCode = "";
            string OrgType = "W";
            string RoleID = "1";
            string ProductID = "1";
            if (RoleID.Length <= 0)
            {
                this.Response.Redirect("../../Main.aspx");
            }
            else
            {
                if (!IsPostBack)
                {

                    #region

                    string BaseUrl = ConfigurationManager.ConnectionStrings["BaseUrl"].ConnectionString.Trim();

                    string ActionUrl = Request.Url.AbsolutePath.ToLower();
                    StringBuilder str = new StringBuilder();
                    //功能菜单
                    str.Append("<li class='sidebar-toggler-wrapper'> <div class='sidebar-toggler-desc' id='gncd'><span>功能菜单</span></div>  <div class='sidebar-toggler' id='menu'><span></span></div>  </li>");
                    string NewUrl = "/" + BaseUrl + "/home/index/default/ypdefault.aspx";
                    if (ActionUrl.ToLower() == NewUrl.ToLower())//默认首页
                    {

                        //管理首页
                        str.Append(@"<li class='start active open' style='margin-top: 10px;'>");
                        str.Append(@"<a href='/" + BaseUrl + "/home/index/Default/YPDefault.aspx'>");
                        str.Append(@"<i class='icon-home'></i>");
                        str.Append(@"<span class='title'>管理首页</span>");
                        str.Append(@"<span class='selected'></span>");
                        str.Append(@"</a>");
                        str.Append(@"</li>");
                    }
                    else//子页面
                    {
                        //管理首页
                        str.Append(@"<li  style='margin-top: 10px;'>");
                        str.Append(@"<a href='/" + BaseUrl + "/home/index/Default/YPDefault.aspx'>");
                        str.Append(@"<i class='icon-home'></i>");
                        str.Append(@"<span class='title'>管理首页</span>");
                        str.Append(@"<span class='selected'></span>");
                        str.Append(@"</a>");
                        str.Append(@"</li>");
                    }

                    string[] Names;
                    object[] Values;



                    NetTech.SqlHelper broker = new NetTech.SqlHelper();
                    broker.Open();
                    Names = new string[5] { "@HQCode", "@BranchCode", "@OrgType", "@RoleID", "@ProductID" };
                    Values = new object[5] { HQCode, BranchCode, OrgType, RoleID, ProductID };
                    DataTable Ydt = null;
                    if (OrgType == "W" || OrgType == "B")//网点权限
                    {
                        Ydt = broker.GetDataTable(" exec Home_Login_QueryWMenuP  @HQCode,@BranchCode,@OrgType,@RoleID,@ProductID", Names, Values);
                    }
                    
                    else//其它
                    {
                        Ydt = broker.GetDataTable(" exec Home_Login_QueryMenuP  @HQCode,@BranchCode,@OrgType,@RoleID", Names, Values);

                    }

                    for (int i = 0; i < Ydt.Rows.Count; i++)
                    {
                        string PID = Ydt.Rows[i]["ID"].ToString();
                        string PName = Ydt.Rows[i]["Name"].ToString();
                        string PIcon = Ydt.Rows[i]["Icon"].ToString();
                        string PAsName = Ydt.Rows[i]["AsName"].ToString();
                        string PNName = Ydt.Rows[i]["NName"].ToString();
                        DataTable Edt = null;
                        if (OrgType == "W" || OrgType == "B")//网点权限
                        {
                            Names = new string[4] { "@OrgType", "@RoleID", "@PID", "@ProductID" };
                            Values = new object[4] { OrgType, RoleID, PID, ProductID };
                            Edt = broker.GetDataTable(" exec Home_Login_QueryMenuWB  @OrgType,@RoleID,@PID,@ProductID ", Names, Values);

                        }
                        else
                        {
                            Names = new string[3] { "@OrgType", "@RoleID", "@PID" };
                            Values = new object[3] { OrgType, RoleID, PID };
                            Edt = broker.GetDataTable(" exec Home_Login_QueryMenuC  @OrgType,@RoleID,@PID ", Names, Values);
                        }



                        #region 一级菜单开始

                        string DBName = GetNowUrlByPName(broker, ActionUrl.Replace("/" + BaseUrl.ToLower() + "", ""));


                        if (PName == DBName)//设置选中
                        {
                            str.Append(@"<li class='start active open'>");
                        }
                        else
                        {
                            str.Append(@"<li>");
                        }

                        str.Append(@"<a href='javascript:;'>");
                        str.Append(@"<i class='" + PIcon + "'></i>");

                        str.Append(@"<span class='title '>" + PNName + "</span>");
                        str.Append(@"<span class='arrow '></span>");
                        str.Append(@"<span class='selected'></span>");
                        str.Append(@"</a>");



                        #region 二级菜单开始
                        str.Append(@"<ul class='sub-menu '> ");
                        for (int j = 0; j < Edt.Rows.Count; j++)
                        {
                            string CID = Edt.Rows[j]["ID"].ToString();
                            string CName = Edt.Rows[j]["Name"].ToString();
                            string CUrl = Edt.Rows[j]["Url"].ToString();
                            string CIcon = Edt.Rows[j]["Icon"].ToString();
                            string CAsName = Edt.Rows[j]["AsName"].ToString();
                            string CNName = Edt.Rows[j]["NName"].ToString();
                            str.Append(@"<li><a href='/" + BaseUrl + "/" + CUrl + "'><i class='" + CIcon + "'></i>" + CNName + "</a>  </li> ");
                        }
                        str.Append(@"</ul>");

                        #endregion

                        str.Append(@"</li>");
                        #endregion
                    }

                    #region 退出系统
                    if (ActionUrl == ("/" + BaseUrl + "/home/index/default/ypdefault.aspx").ToLower())
                    {
                        str.Append(@"<li class='tooltips' data-container='body' data-placement='right' data-html='true' data-original-title='退出系统'>");
                        str.Append(@"<a href='../../../Login.aspx' target='_self'>");
                        str.Append(@"<i class='icon-paper-plane'></i>");
                        str.Append(@"<span class='title'>退出系统</span>");
                        str.Append(@" </a>");
                        str.Append(@" </li>");
                    }
                    else//子页面
                    {
                        str.Append(@"<li class='tooltips' data-container='body' data-placement='right' data-html='true' data-original-title='退出系统'>");
                        str.Append(@"<a href='../../../Login.aspx' target='_self'>");
                        str.Append(@"<i class='icon-paper-plane'></i>");
                        str.Append(@"<span class='title'>退出系统</span>");
                        str.Append(@" </a>");
                        str.Append(@"</li>");
                    }

                    #endregion
                    broker.Close();

                    //绑定数据源
                    this.ul_menu.InnerHtml = str.ToString();
                    #endregion
                }
            }
        }
        private string GetNowUrlByPName(NetTech.SqlHelper broker, string UrlPath)
        {
            UrlPath = UrlPath.Substring(1, UrlPath.Length - 1);

            string[] Names1 = { "@Url" };
            string[] Values2 = { UrlPath };
            DataTable dt = broker.GetDataTable("  exec Home_Login_QueryMenuByName @Url", Names1, Values2);

            string Url = "";
            if (dt.Rows.Count > 0)
            {
                Url = dt.Rows[0]["Name"].ToString();
            }
            else
            {
                Url = "";
            }

            return Url;
        }
    }
}