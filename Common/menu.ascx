<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="menu.ascx.cs" Inherits="CusStoreWeb.Common.menu" %>

<ul class="page-sidebar-menu " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" id="ul_menu" runat="server">
        <li class='sidebar-toggler-wrapper'> <div class='sidebar-toggler-desc' id='gncd'><span>功能菜单</span></div>  <div class='sidebar-toggler' id='menu'><span></span></div> </li>
             
        <li class="start active open" style="margin-top: 10px;"><a href='javascript:;'><i class="icon-home"></i><span class="title">软件组</span><span class='arrow '></span><span class="selected"></span></a>
        <ul class="sub-menu" style="display: none;"> <li><a href="javascript:;"><i class="icon-control-pause"></i>软件管理</a>  </li> <li><a href="javascript:;"><i class="icon-note"></i>硬件管理</a></li></ul>
        </li>
        <li><a href='javascript:;'><i class="icon-graduation"></i><span class="title ">模具组</span><span class="arrow "></span><span class="selected"></span></a>
        <ul class="sub-menu" style="display: none;"> <li><a href="javascript:;"><i class="icon-control-pause"></i>模具管理</a></li> </ul>
<%--        </li><li><a href="javascript:;"><i class="icon-note"></i>进出操作</a></li>--%>
        <li class="tooltips" data-container="body" data-placement="right" data-html="true" data-original-title="退出系统"><a href="javascript:;" target="_self"><i class="icon-paper-plane"></i><span class="title">退出系统</span> </a> </li>
  
</ul>

<div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' style="z-index: 11050">
</div>