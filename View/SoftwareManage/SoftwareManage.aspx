﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SoftwareManage.aspx.cs" Inherits="CusStore.View.SoftwareManage.SoftwareManage" %>

<%@ Register Src="~/Common/css.ascx" TagPrefix="uc1" TagName="css" %>
<%@ Register Src="~/Common/top.ascx" TagPrefix="uc1" TagName="top" %>
<%@ Register Src="~/Common/menu.ascx" TagPrefix="uc1" TagName="menu" %>
<%--<%@ Register Src="~/Common/map.ascx" TagPrefix="uc1" TagName="map" %>--%>
<%@ Register Src="~/Common/js.ascx" TagPrefix="uc1" TagName="js" %>
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
    <uc1:css runat="server" ID="Css" />
</head>

<body class="page-header-fixed page-quick-sidebar-over-content ">
    <!-- BEGIN HEADER -->
    <div class="page-header navbar navbar-fixed-top">
        <div class="page-header-inner">
            <uc1:top runat="server" ID="Top" />
        </div>
    </div>
    <div class="clearfix">
    </div>
    <div class="page-container">
        <div class="page-sidebar-wrapper">
            <div class="page-sidebar navbar-collapse collapse">

                <%--左边菜单--%>
                <uc1:menu runat="server" ID="Menu1" />
            </div>
        </div>

        <div class="page-content-wrapper">
            <div class="page-content">

               <%-- <%--站点地图  开始--%>
            <%--    <uc1:map runat="server" ID="Map" />--%>
                <%--站点地图  结束--%>

                <%--查询条件区域--%>
                <form id="searchform">
                    <div class="form-group col-sm-12">
                        <label for="inputPassword" class="col-sm-1 control-label" style="text-align: right">角色名称</label>
                        <div class="col-sm-11">
                            <div class="input-icon right">
                                <input type="text" class="form-control" style="text-align: left" id="searchRoleName" name="searchRoleName"
                                    placeholder="模糊搜索">
                            </div>
                        </div>
                    </div>
                </form>

                <%--按钮区域--%>
                <form id="btnMenu">
                    <div class="col-md-12">
                        <button id="btnQuery" type="button" class="btn btn-sm yellow ">&nbsp;&nbsp;&nbsp;&nbsp;查询&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa"></i></button>
                        <button id="btnReset" type="button" class="btn btn-sm default">重置条件<i class="fa"></i></button> 
                        <button id="btnCompanyRole" type="button" class="btn btn-sm blue">新建公司端职位<i class="fa"></i></button>
                    </div>
                </form>
                <%--新建公司端角色--%>
                 <div class="modal fade" id="DivAddCompanyRole" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="H3">新建公司端职位</h4>
                            </div>
                            <div class="modal-body">
                                <form id="FormAddHQRole">
                                    <div class="form-group">
                                        <label for="inputPassword" style="text-align: right">公司名称</label>
                                        <div class="input-icon right">
                                            <select class="form-control " id="CompanyNameList" name="CompanyNameList" style="text-align: left" tabindex="-1" aria-hidden="true">
                                                <option value="">请选择</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">职位名称:</label>
                                        <input class="form-control" name="addHQRoleName" id="addHQRoleName"/>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary" id="btnSaveAddRole">保存</button>
                            </div>
                        </div>
                    </div>
                </div>

                <%--编辑角色--%>
                <div class="modal fade" id="DivEditRole" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="H1">编辑职位</h4>
                            </div>
                            <div class="modal-body">
                                <form id="FormEditRole">
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">职位名称:</label>
                                        <input class="form-control" name="EditRoleName" id="EditRoleName"/>
                                        <input class="form-control" name="HideEditPID" id="HideEditPID" style="display: none;"/>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary" id="btnSaveEditRoleName">保存</button>
                            </div>
                        </div>
                    </div>
                </div>

                <%--内容区域--%>
                <div class="row">
                    <div class="col-md-12">
                        <div style="height: 25px;"></div>
                        <div class="container" style="width: 101.7%; margin-top: -20px; margin-left: -15px;">
                            <table id="table" class="table table-bordered">
                            </table>
                        </div>
                    </div>
                </div>
                 <div class="clearfix">
                </div>
            </div>
        </div>
    </div>
    <uc1:footer runat="server" ID="footer" />
    <uc1:js runat="server" ID="Js" />
    <script src="SoftwareManage.js?_dc=<%=Guid.NewGuid() %>"></script>
</body>
<!-- END BODY -->
</html>