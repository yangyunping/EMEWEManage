<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="top.ascx.cs" Inherits="CusStoreWeb.Common.top" %>

<div class="page-logo">
<%--    <img src="../../../Skin/assets/admin/layout/img/logo.png" alt="logo"  />--%>
    <a href="javascript:;" class="logo-default" style="color: #d3cccc; font-size: 20px; width: 500px; text-decoration: none;"><%=BranchName() %>
    </a>
    <div class="menu-toggler sidebar-toggler hide">
    </div>
</div>

<%--<div class="top-menu">
    <ul class="nav navbar-nav pull-right">

        <li class="divider"></li>
        <li class="dropdown dropdown-user">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                <img alt="" class="img-circle" src="../../../Skin/assets/admin/layout/img/avatar3_small.jpg" />
                <span class="username username-hide-on-mobile"><%=UserName() %>  </span>
               <i class="fa fa-angle-down"></i>
            </a>

        </li>
        <li>
            <a>
                <span style="color: #d3cccc"><%=RoleName() %> </span>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <a href="<%=NetTechTop() %>Login.aspx">
                <i class="icon-settings"></i>人脸补全</a>


        </li>
        <li class="divider"></li>
        <li>
            <a href="<%=NetTechTop() %>Login.aspx">
                <i class="icon-lock"></i>退出系统 </a>
        </li>
    </ul>
</div>--%>

<%--补全人脸--%>
<div class="modal hide" id="DivAddRole" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="exampleModalLabel">补全人脸</h4>
            </div>
            <div class="modal-body">
                <form id="FormAddRole">
                    <div class="form-group">
                        <label for="recipient-name" class="control-label">原人脸:</label>
                        <div class="input-icon right">

                            <img src="../../../Skin/Images/1.jpg" style="width: 100%;" />

                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" id="btnKaiShiLuRu">录入人脸信息</button>
                    </div>
                    <div class="form-group">
                        请脸对准摄像头[请使用google浏览器]
                            <div id="appLoginCode" style="text-align: center">

                                <table style="width: 100%;">
                                    <tr style="text-align: center;">
                                        <td>
                                            <video id="video" autoplay>
                                            </video>

                                        </td>
                                        <td>&nbsp;</td>
                                        <td>
                                            <canvas id="canvas" width="250" height="280" style="display: block; text-align: center"></canvas>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">
                                            <button type="button" class="btn btn-success uppercase" id="capture" style="width: 100%; height: 50px;">拍照</button>

                                        </td>
                                    </tr>

                                </table>





                            </div>
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
<script>
    //访问用户媒体设备的兼容方法
    function getUserMedia(constraints, success, error,status) {
        if(status=="OK")
        {
            if (navigator.mediaDevices.getUserMedia) {
                //最新的标准API
                navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
            } 
            else if (navigator.webkitGetUserMedia) {
                //webkit核心浏览器
                navigator.webkitGetUserMedia(constraints,success, error)
            } 
            else if (navigator.mozGetUserMedia) {
                //firfox浏览器
                navigator.mozGetUserMedia(constraints, success, error);
            } 
            else if (navigator.getUserMedia) {
                //旧版API
                navigator.getUserMedia(constraints, success, error);
            }
        }
        else
        {
            window.location.reload();
        }
    }
         

    function success(stream) {
        //兼容webkit核心浏览器
        let CompatibleURL = window.URL || window.webkitURL;
        //将视频流设置为video元素的源
        console.log(stream);

        //video.src = CompatibleURL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    }

    function error(error) {
        // console.log('访问用户媒体设备失败${error.name}, ${error.message}');
    }

         

    //if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
    //    //调用用户媒体设备, 访问摄像头
    //    getUserMedia({video : {width: 250, height: 280}}, success, error,"OK");

    //    let video = document.getElementById('video');
    //    let canvas = document.getElementById('canvas');
    //    let context = canvas.getContext('2d');
    //    document.getElementById('capture').addEventListener('click', function () {
    //        //setInterval(function(){
    //        context.drawImage(video, 0, 0, 250, 280);     
    //        //图片转换base64
    //        //进行对比
    //        var base64data = canvas.toDataURL( 'image/png', 1 );  //1表示质量(无损压缩


    //        $.ajax({
    //            type: "POST",
    //            url:"BLL/Home/Login/frmLogin.ashx?Action=LoginCheckIn",
    //            data: { "JsonDataNew": base64data },
    //            async: false,
    //            success: function (jsonText) {
    //                console.log( JSON.parse(jsonText));
    //            },
    //            error: function (ex) {
    //                console.log( JSON.parse(ex));

    //            }
    //        });
    //        //console.log(canvas.toDataURL( 'image/png' ));

    //        //},200);
                        
    //    })



    //} else {
    //    alert('不支持访问用户媒体');
    //}


       
</script>
