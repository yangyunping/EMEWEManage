<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="EMEWEManage.Main" %>


<%--<%@ Register Src="~/Common/css.ascx" TagPrefix="uc1" TagName="css" %>--%>
<%@ Register Src="~/Common/top.ascx" TagPrefix="uc1" TagName="top" %>
<%@ Register Src="~/Common/menu.ascx" TagPrefix="uc1" TagName="menu" %>
<%--<%@ Register Src="~/Common/map.ascx" TagPrefix="uc1" TagName="map" %>--%>
<%--<%@ Register Src="~/Common/js.ascx" TagPrefix="uc1" TagName="js" %>--%>
<%@ Register Src="~/Common/footer.ascx" TagPrefix="uc1" TagName="footer" %>

<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8" />
    <title>优 品 工 作 室</title>
    <!-- 页面的宽度与设备屏幕的宽度一致 -->
    <meta name="viewport" content="width=device-width">
    <!-- 初始缩放比例 1:1,没有横线滚动的效果 -->
    <meta name="viewport" content="initial-scale=1">
    <!-- 禁止用户缩放 -->
    <meta name="viewport" content="user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description" />
    <meta content="" name="author" />
 <%--   <uc1:css runat="server" ID="Css" />--%>
<link href="../Skin/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
<link href="../Skin/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" />
<link href="../Skin/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="../Skin/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css"/>
<link href="../Skin/assets/global/css/components.css" id="style_components" rel="stylesheet" type="text/css" />
<link href="../Skin/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
<link href="../Skin/assets/admin/layout/css/layout.css" rel="stylesheet" type="text/css" />
<link href="../Skin/assets/admin/layout/css/themes/blue.css" rel="stylesheet" type="text/css" id="style_color" />
<link href="../Skin/assets/admin/layout/css/custom.css" rel="stylesheet" type="text/css" />
<link href="../Skin/Common/YP.css" rel="stylesheet" />
<link href="../Skin/assets/global/plugins/bootstrap-table/bootstrap-table.css" rel="stylesheet" />
<link href="../Skin/assets/global/plugins/icheck/skins/all.css" rel="stylesheet" />
<script src="../Skin/assets/admin/pages/scripts/form-icheck.js"></script>
<link rel="stylesheet" type="text/css" href="../Skin/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" />
<link rel="stylesheet" type="text/css" href="../Skin/assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css" />
<link rel="stylesheet" type="text/css" href="../Skin/assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css" />
<link rel="stylesheet" type="text/css" href="../Skin/assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<link rel="stylesheet" type="text/css" href="../Skin/assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" />
<link rel="stylesheet" type="text/css" href="../Skin/assets/global/plugins/select2/select2.css" /> 
</head>

<body class="page-header-fixed page-quick-sidebar-over-content ">
    <!-- BEGIN HEADER -->
    <div class="page-header navbar navbar-fixed-top">
        <div class="page-header-inner">
            <uc1:top runat="server" ID="Top" />
        </div>
    </div>


    <div class="page-container">
        <div class="page-sidebar-wrapper">
            <div class="page-sidebar navbar-collapse collapse">

                <%--左边菜单--%>
                <ul class="page-sidebar-menu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" id="ul_menu" runat="server">
                    <li class='sidebar-toggler-wrapper'> <div class='sidebar-toggler-desc' id='gncd'><span>功能菜单</span></div>  <div class='sidebar-toggler' id='menu'><span></span></div> </li>
                    <li style="margin-top: 10px;"><a href='javascript:;'><i class="icon-home"></i><span class="title">软件组</span><span class='arrow '></span><span class="selected"></span></a>
                    <ul class="sub-menu" style="display: none;"> <li><a href="../../View/SoftwareManage/SoftwareManage.aspx"><i class="icon-control-pause"></i>软件管理</a>  </li> <li><a href="javascript:;"><i class="icon-note"></i>硬件管理</a></li></ul>
                    </li>
                    <li><a href='javascript:;'><i class="icon-graduation"></i><span class="title ">模具组</span><span class="arrow "></span><span class="selected"></span></a>
                    <ul class="sub-menu" style="display: none;"> <li><a href="javascript:;"><i class="icon-control-pause"></i>模具管理</a></li> </ul>
                    <li class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="退出系统"><a href="javascript:;" target="_self"><i class="icon-paper-plane"></i><span class="title">退出系统</span> </a> </li>
                    </ul>
                <div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' style="z-index: 11050">
                </div>
            </div>
        </div>
          <div class="page-content-wrapper">
            <div class="page-content">
                 <div class="row">
                    <div class="col-md-12">
                        <div style="height: 25px;"></div>
                        <div class="container" style="width: 101.7%; margin-top: -20px; margin-left: -15px;">
                            <table id="table" class="table table-bordered">
                            </table>
                        </div>
                    </div>
                </div>
                </div>
              </div>
    </div>
    
      
    <uc1:footer runat="server" ID="footer" />

<script src="../Skin/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="../Skin/assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>
<script src="../Skin/assets/global/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>

<script src="../Skin/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../Skin/assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="../Skin/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>

<script src="../Skin/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
<script src="../Skin/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="../Skin/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="../Skin/assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
<script src="../Skin/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>

<script src="../Skin/Common/YPTech.js?_dc=<%=Guid.NewGuid() %>"></script>
<%--表格--%>
<script src="../Skin/assets/global/plugins/bootstrap-table/bootstrap-table.js"></script>
<script src="../Skin/assets/global/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>

<%--弹出框--%>
<script src="../Skin/assets/global/plugins/bootbox/bootbox.min.js"></script>

<script type="text/javascript" src="../Skin/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript" src="../Skin/assets/global/plugins/bootstrap-daterangepicker/moment.min.js"></script>
<script src="../Skin/assets/admin/pages/scripts/components-pickers.js"></script>
<script src="../Skin/assets/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js"></script>

<script src="../Skin/assets/global/plugins/select2/select2.min.js"></script>

<script src="../Skin/assets/global/plugins/select2/select2_locale_zh-CN.js"></script>
<script src="Main.js?_dc=<%=Guid.NewGuid() %>"></script>
<script src="../Skin/assets/admin/pages/scripts/form-icheck.js"></script>
<script src="../Skin/jquery/js/AjaxForm.js"></script>
</body>
<!-- END BODY -->
</html>
