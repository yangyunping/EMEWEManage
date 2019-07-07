<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="menu.ascx.cs" Inherits="CusStoreWeb.Common.menu" %>
<ul class="page-sidebar-menu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" id="ul_menu" runat="server">
    <%--<li class="sidebar-toggler-wrapper">
        <div class="sidebar-toggler-desc" id="gncd"><span>功能菜单</span></div>
        <div class="sidebar-toggler" id="menu"><span></span></div>
    </li>--%>
    <%--   <li style="margin-top: 10px;">
        <a href="../Default.aspx">
            <i class="icon-home"></i>
            <span class="title">管理首页</span>
            <span class="selected"></span>
        </a>

    </li>

    <li class="start active open">
        <a href="javascript:;">
            <i class="icon-puzzle "></i>
            <span class="title ">基础设置</span>
            <span class="arrow "></span>
            <span class="selected"></span>
        </a>
        <ul class="sub-menu ">

            <li>
                <a href="../Base/frmUser.aspx">用户管理</a>
            </li>
            <li>
                <a href="../Base/frmUser.aspx">角色管理</a>
            </li>

        </ul>
    </li>

    <!-- BEGIN ANGULARJS LINK -->
    <li class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="AngularJS version demo">
        <a href="angularjs" target="_blank">
            <i class="icon-paper-plane"></i>
            <span class="title">退出系统 </span>
        </a>
    </li>--%>
</ul>

<div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' style="z-index: 11050">
</div>

<%--刷新的效果--%>
<%--<div id="loadingToast" class="weui_loading_toast" style="display:  none;">
    <div class="weui_mask_transparent"></div>
    <div class="weui_toast">
        <div class="weui_loading">
            <div class="weui_loading_leaf weui_loading_leaf_0"></div>
            <div class="weui_loading_leaf weui_loading_leaf_1"></div>
            <div class="weui_loading_leaf weui_loading_leaf_2"></div>
            <div class="weui_loading_leaf weui_loading_leaf_3"></div>
            <div class="weui_loading_leaf weui_loading_leaf_4"></div>
            <div class="weui_loading_leaf weui_loading_leaf_5"></div>
            <div class="weui_loading_leaf weui_loading_leaf_6"></div>
            <div class="weui_loading_leaf weui_loading_leaf_7"></div>
            <div class="weui_loading_leaf weui_loading_leaf_8"></div>
            <div class="weui_loading_leaf weui_loading_leaf_9"></div>
            <div class="weui_loading_leaf weui_loading_leaf_10"></div>
            <div class="weui_loading_leaf weui_loading_leaf_11"></div>
        </div>
        <p class="weui_toast_content" id="loadingToastContext">数据提交中......</p>
    </div>
</div>--%>