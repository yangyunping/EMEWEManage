<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frmMenu.aspx.cs" Inherits="CusStoreWeb.HQ.Base.Menu.frmMenu" %>



<%@ Register Src="~/Common/css.ascx" TagPrefix="uc1" TagName="css" %>
<%@ Register Src="~/Common/top.ascx" TagPrefix="uc1" TagName="top" %>
<%@ Register Src="~/Common/menu.ascx" TagPrefix="uc1" TagName="menu" %>
<%@ Register Src="~/Common/map.ascx" TagPrefix="uc1" TagName="map" %>
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
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
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

    <div class="clearfix"></div>
    <div class="page-container">
        <div class="page-sidebar-wrapper">
            <div class="page-sidebar navbar-collapse collapse">
                <%--左边菜单--%>
                <uc1:menu runat="server" ID="Menu" />
            </div>
        </div>


        <div class="page-content-wrapper">
            <div class="page-content">

                <%--站点地图  开始--%>
                <uc1:map runat="server" ID="Map" />
                <%--站点地图  结束--%>

                <%--查询条件区域--%>
                <form id="searchform">

                    <div class="form-group col-sm-12">
                        <label for="inputPassword" class="col-sm-1 control-label" style="text-align: right">菜单类型</label>
                        <div class="col-sm-5">

                            <div class="input-icon right">

                                <select class="form-control " id="searchOrgType" name="searchOrgType" style="text-align: left" tabindex="-1" aria-hidden="true">
                                    <option value="">请选择</option>
                                    <option value="C">优品端</option>
                                    <option value="B">公司端</option>
                                    <option value="W">门店端</option>
                                </select>

                            </div>
                        </div>

                        <label for="inputPassword" class="col-sm-1 control-label" style="text-align: right">Url或菜单名称</label>
                        <div class="col-sm-5">

                            <div class="input-icon right">

                                <input type="text" class="form-control" style="text-align: left" id="searchUrl" name="searchUrl"
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
                        <button id="btnAddPMenu" type="button" class="btn btn-sm green ">新建根菜单<i class="fa"></i></button>
                        <button id="btnAddCMenu" type="button" class="btn btn-sm blue ">新建子菜单<i class="fa"></i></button>
                    </div>
                </form>
                <%--新增菜单区域--%>
                <div class="modal fade" id="DivAddPMenu" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="exampleModalLabel">新建根菜单</h4>
                            </div>
                            <div class="modal-body">
                                <form id="FormAddPMenu">
                                    <div class="form-group">
                                        <label for="recipient-name" class="control-label">菜单类型:</label>
                                        <div class="input-icon right">

                                            <select class="form-control " name="PUserType" id="PUserType" style="text-align: left" tabindex="-1" aria-hidden="true">
                                                <option value="">请选择</option>
                                                <option value="C">优品端</option>
                                                <option value="B">公司端</option>
                                                <option value="W">门店端</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">菜单名称:</label>
                                        <input class="form-control" name="PUrlName" id="PUrlName"></input>
                                    </div>
                                     <div class="form-group">
                                        <label for="message-text" class="control-label">菜单名称别名:</label>
                                        <input class="form-control" name="PAsName" id="PAsName"></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">排序编号</label>
                                        <input class="form-control" name="PIsSort" id="PIsSort"></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">图标设置</label>
                                        <input class="form-control" name="PIcon" id="PIcon" value="icon-settings"></input>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary" id="btnSavePMenu">保存</button>
                            </div>
                        </div>
                    </div>
                </div>

                <%--新增子菜单区域--%>
                <div class="modal fade" id="DivAddCMenu" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="H1">新建子菜单</h4>
                            </div>
                            <div class="modal-body">
                                <form id="FormAddCMenu">
                                    <div class="form-group">
                                        <label for="recipient-name" class="control-label">菜单类型:</label>
                                        <div class="input-icon right">

                                            <select class="form-control " name="OrgType" id="OrgType" style="text-align: left" tabindex="-1" aria-hidden="true">
                                                <option value="">请选择</option>
                                                <option value="C">优品端</option>
                                                <option value="B">公司端</option>
                                                <option value="W">门店端</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="recipient-name" class="control-label">上级菜单:</label>
                                        <div class="input-icon right">

                                            <select class="form-control " name="PMenu" id="PMenu" style="text-align: left" tabindex="-1" aria-hidden="true">
                                                <option value="">请选择</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">菜单名称:</label>
                                        <input class="form-control" name="CUrlName" id="CUrlName"></input>
                                    </div>

                                      <div class="form-group">
                                        <label for="message-text" class="control-label">菜单名称别名:</label>
                                        <input class="form-control" name="CAsName" id="CAsName"></input>
                                    </div>


                                    <div class="form-group">
                                        <label for="message-text" class="control-label">页面地址:</label>
                                        <input class="form-control" name="CUrl" id="CUrl"></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">排序编号</label>
                                        <input class="form-control" name="CIsSort" id="CIsSort"></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">图标设置</label>
                                        <input class="form-control" name="CIcon" id="CIcon" value="icon-settings"></input>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary" id="btnSaveCMenu">保存</button>
                            </div>
                        </div>
                    </div>
                </div>


                <%--修改根目录区域--%>
                <div class="modal fade" id="DivEditPMenu" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="H2">编辑根菜单</h4>
                            </div>
                            <div class="modal-body">
                                <form id="FormEditPMenu">
                                    <div class="form-group">
                                        <label for="recipient-name" class="control-label">菜单类型:</label>
                                        <div class="input-icon right">

                                            <select class="form-control " name="EditPOrgType" id="EditPOrgType" style="text-align: left" tabindex="-1" aria-hidden="true" disabled>
                                                <option value="">请选择</option>
                                                <option value="C">优品端</option>
                                                <option value="B">公司端</option>
                                                <option value="W">门店端</option>
                                            </select>

                                        </div>
                                    </div>
                                    <input class="form-control" name="HideSID" id="HideSID" style="display: none;"></input>
                                    <input class="form-control" name="HideEditPOrgType" id="HideEditPOrgType" style="display: none;"></input>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">菜单名称:</label>
                                        <input class="form-control" name="EditPUrlName" id="EditPUrlName"></input>
                                    </div>
                                      <div class="form-group">
                                        <label for="message-text" class="control-label">菜单名称别名:</label>
                                        <input class="form-control" name="EditPAsName" id="EditPAsName"></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">排序编号</label>
                                        <input class="form-control" name="EditPIsSort" id="EditPIsSort"></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">图标设置</label>
                                        <input class="form-control" name="EditPIcon" id="EditPIcon" value="icon-settings"></input>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary" id="btnSaveEditPMenu">保存</button>

                            </div>
                        </div>
                    </div>
                </div>







                 <%--管理内容页--%>
                <div class="modal fade" id="DivSubAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="H4">新增内容页</h4>
                            </div>
                            <div class="modal-body">
                                <form id="FormItemMenu"> 
                                     <input class="form-control" name="HideItemSID" id="ItemSID" style="display: none;"></input>
                                      <input class="form-control" name="HideOrgType" id="HideOrgType" style="display: none;"></input>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">菜单类型:</label>
                                        <input class="form-control" name="ItemOrgType" id="ItemOrgType" disabled></input>
                                    </div>

                                    <div class="form-group">
                                        <label for="message-text" class="control-label">上级菜单</label>
                                        <input class="form-control" name="ItemPName" id="ItemPName" disabled></input>
                                    </div>
                                     <div class="form-group">
                                        <label for="message-text" class="control-label">菜单名称</label>
                                        <input class="form-control" name="ItemCName" id="ItemCName" disabled></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">内容页面名称</label>
                                        <input class="form-control" name="ItemSubName" id="ItemSubName"></input>
                                    </div>

                                     <div class="form-group">
                                        <label for="message-text" class="control-label">内容页面地址</label>
                                        <input class="form-control" name="ItemSubUrl" id="ItemSubUrl"></input>
                                    </div>  
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary" id="btnItemSave">保存</button>

                            </div>
                        </div>
                    </div>
                </div>





                <%--修改子录区域--%>
                <div class="modal fade" id="DivEditCMenu" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="H3">编辑子菜单</h4>
                            </div>
                            <div class="modal-body">
                                <form id="FormEditCMenu">
                                    <div class="form-group">
                                        <label for="recipient-name" class="control-label">菜单类型:</label>
                                        <div class="input-icon right">

                                            <select class="form-control " name="EditCOrgType" id="EditCOrgType" style="text-align: left" tabindex="-1" aria-hidden="true" disabled>
                                                <option value="">请选择</option>
                                                <option value="C">优品端</option>
                                                <option value="B">公司端</option>
                                                <option value="W">门店端</option>
                                            </select>
                                            <input class="form-control" name="HideCSID" id="HideCSID" style="display: none;"></input>
                                            <input class="form-control" name="HideEditCOrgType" id="HideEditCOrgType" style="display: none;"></input>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="recipient-name" class="control-label">上级菜单:</label>
                                        <%-- <div class="input-icon right">

                                            <select class="form-control " name="EditCMenu" id="EditCMenu" style="text-align: left" tabindex="-1" aria-hidden="true"  disabled>
                                                <option value="">请选择</option> 
                                            </select>

                                        </div>--%>
                                        <input class="form-control" name="EditCMenu" id="EditCMenu" disabled></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">菜单名称:</label>
                                        <input class="form-control" name="EditCUrlName" id="EditCUrlName"></input>
                                    </div>
                                     <div class="form-group">
                                        <label for="message-text" class="control-label">菜单名称别名:</label>
                                        <input class="form-control" name="EditCAsName" id="EditCAsName"></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">页面地址:</label>
                                        <input class="form-control" name="EditCUrl" id="EditCUrl"></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="control-label">排序编号</label>
                                        <input class="form-control" name="EditCIsSort" id="EditCIsSort"></input>
                                    </div>
                                     <div class="form-group">
                                        <label for="message-text" class="control-label">图标设置</label>
                                        <input class="form-control" name="EditCIcon" id="EditCIcon" value="icon-settings"></input>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary" id="btnSaveEditCMenu">保存</button>
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
            </div>
        </div>

    </div>


    <uc1:footer runat="server" ID="footer" />
    <div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>
    </div>
    <uc1:js runat="server" ID="Js" />
    <script src="frmMenu.js?_dc=<%=Guid.NewGuid() %>"></script>
</body>
<!-- END BODY -->
</html>
