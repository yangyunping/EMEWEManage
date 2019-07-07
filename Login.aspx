<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CusStoreWeb.Login" %>


<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.4
Version: 3.3.0
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8" />
    <title>优品管理系统</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="" name="description" />
    <meta content="" name="author" />
    <!-- BEGIN GLOBAL MANDATORY STYLES -->

    <link href="Skin/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="Skin/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="Skin/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE LEVEL STYLES -->
    <link href="Skin/assets/admin/pages/css/login.css" rel="stylesheet" type="text/css" />
    <!-- END PAGE LEVEL SCRIPTS -->
    <!-- BEGIN THEME STYLES -->
    <link href="Skin/assets/global/css/components.css" id="style_components" rel="stylesheet" type="text/css" />
    <link href="Skin/assets/global/css/plugins.css" rel="stylesheet" type="text/css" />
    <link href="Skin/assets/admin/layout/css/layout.css" rel="stylesheet" type="text/css" />
    <link href="Skin/assets/admin/layout/css/themes/darkblue.css" rel="stylesheet" type="text/css" id="style_color" />
    <link href="Skin/assets/admin/layout/css/custom.css" rel="stylesheet" type="text/css" />
    <!-- END THEME STYLES -->
    <link rel="shortcut icon" href="favicon.ico" />
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login bg1" id="bodygb">
    <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
    <div class="menu-toggler sidebar-toggler">
    </div>
    <!-- END SIDEBAR TOGGLER BUTTON -->
    <!-- BEGIN LOGO -->
    <div class="logo">
        <a href="javascript:;">
            <%--<img src="Skin/assets/admin/layout/img/logo-big.png" alt="" />--%>
        </a>
    </div>
    <!-- END LOGO -->
    <!-- BEGIN LOGIN -->
    <div class="content">

        <div class="row" id="ActionLogin">
            <div>
                <h3 class="form-title">优品管理系统</h3>
                <div id="errormsg" class="alert alert-danger display-hide">
                    <button class="close" data-close="alert"></button>
                    <span>账号密码输入错误!</span>
                </div>
            </div>
            <div class="col-md-12">
                <div class="tabbable-line">
                    <ul class="nav nav-tabs" style="text-align: center">
                        <li class="active">
                            <a href="#tab_1_1" data-toggle="tab" aria-expanded="true"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
								账号密码登录 </font></font></a>
                        </li>

                        <li class="">
                            <a href="#tab_1_2" data-toggle="tab" aria-expanded="false"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
								人脸识别登陆 </font></font></a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fontawesome-demo active" id="tab_1_1">

                            <!-- BEGIN LOGIN FORM -->
                            <form class="login-form" id="LoginForm">

                                <div class="form-group">
                                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                                    <label class="control-label visible-ie8 visible-ie9">账号</label>
                                    <input class="form-control form-control-solid placeholder-no-fix" type="text" id="username" autocomplete="off" placeholder="账号" value="" name="username" />
                                </div>
                                <div class="form-group">
                                    <label class="control-label visible-ie8 visible-ie9">密码</label>
                                    <input class="form-control form-control-solid placeholder-no-fix" type="password" id="password" autocomplete="off" placeholder="密码" value="" name="password" />
                                </div>


                                <%--<div class="form-actions">--%>
                                <button type="button" class="btn btn-success uppercase" id="btnLogin" style="width: 100%; height: 50px;">登录</button>

                                <%--</div>--%>
                            </form>
                            <!-- END LOGIN FORM -->
                        </div>

                        <div class="tab-pane" id="tab_1_2" style="text-align: center">
                            请脸对准摄像头[请使用google浏览器]
                            <div id="appLoginCode" style="text-align: center">
                                <video id="video" autoplay>
                                </video>
                                <button type="button" class="btn btn-success uppercase" id="capture" style="width: 100%; height: 50px;">登录</button>

                                <canvas id="canvas" width="250" height="280" style="display: none"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="create-account">
            <p>
                <a href="javascript:;" id="register-btn" class="uppercase" style="">注册</a>
            </p>
        </div>


        <!-- BEGIN REGISTRATION FORM -->
        <form class="register-form" id="FormRegister">
            <h3>注册</h3>
            <p class="hint" style="color: #453f3f">
                温馨提示：注册成功后，客服人员会第一时间联系到您！
            </p>
            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">姓名</label>
                <input class="form-control placeholder-no-fix" type="text" placeholder="请填写姓名" name="RegName" id="RegName" />
            </div>
            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">电话</label>
                <input class="form-control placeholder-no-fix" type="text" placeholder="请填写电话" name="RegTel" id="RegTel" />
            </div>

            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">公司名称</label>
                <input class="form-control placeholder-no-fix" type="text" placeholder="请填写公司名称" name="RegCompany" id="RegCompany" />
            </div>
            <p class="hint" style="color: #453f3f">
                温馨提示：验证码通过邮件的方式发送到您邮箱，如果长时间没收到请检查垃圾邮箱！
            </p>
            <div class="form-group">
                <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->



                <table style="width: 100%">
                    <tr>
                        <td>
                            <label class="control-label visible-ie8 visible-ie9">邮箱</label>
                            <input class="form-control placeholder-no-fix" type="text" placeholder="请填写邮箱" name="email" id="email" /></td>
                        <td>&nbsp;</td>
                        <td>
                            <button type="button" id="btnSendCode" class="btn btn-success uppercase pull-right" onclick="" style="width: 100%">获取验证码</button></td>
                    </tr>
                </table>

            </div>

            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">验证码</label>
                <input class="form-control placeholder-no-fix" type="text" placeholder="请填写验证码" name="VC" id="VC" />
            </div>
            <div class="form-group margin-top-20 margin-bottom-20">
                <label class="check">
                    <input type="checkbox" name="tnc" id="tnc" />
                    我接受 <a href="javascript:;" id="fwtk">使用须知 </a>
                    <%-- & <a href="javascript:;">隐私政策 </a>--%>
                </label>
                <div id="register_tnc_error">
                </div>
            </div>
            <div class="form-actions">
                <button type="button" id="register-back-btn" class="btn btn-default">返回登录</button>
                <button type="button" id="btnRegister" class="btn btn-success uppercase pull-right">立即注册</button>
            </div>
        </form>
        <!-- END REGISTRATION FORM -->
    </div>
    <div class="copyright">
        2019 © 贰零壹玖
    </div>
    <!-- END LOGIN -->
    <!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
    <!-- BEGIN CORE PLUGINS -->
    <!--[if lt IE 9]>
<script src="Skin/assets/global/plugins/respond.min.js"></script>
<script src="Skin/assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
    <script src="Skin/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
    <script src="Skin/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>

    <script src="Skin/assets/global/scripts/metronic.js" type="text/javascript"></script>
    <script src="Skin/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
    <script src="Skin/Common/YPTech.js?_dc=<%=Guid.NewGuid() %>"></script>
    <!-- END PAGE LEVEL SCRIPTS -->
    <style type="text/css">
        .bg1 {
            background: url(Skin/Images/1.jpg) top center no-repeat;
            background-size: cover;
        }

        .bg2 {
            background: url(Skin/Images/2.jpg) top center no-repeat;
            background-size: cover;
        }
    </style>

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
       
    </script>
    <script>
        jQuery(document).ready(function () {
            Metronic.init();
            Layout.init();
        });

        //登录方式切换
        $(".tabbable-line ul li a").click(function(){
            var text=$(this).attr("href");
            console.log(text);
            if(text=="#tab_1_2")
            {
                if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
                    //调用用户媒体设备, 访问摄像头
                    getUserMedia({video : {width: 250, height: 280}}, success, error,"OK");

                    let video = document.getElementById('video');
                    let canvas = document.getElementById('canvas');
                    let context = canvas.getContext('2d');
                    document.getElementById('capture').addEventListener('click', function () {
                        //setInterval(function(){
                        context.drawImage(video, 0, 0, 250, 280);     
                        //图片转换base64
                        //进行对比
                        var base64data = canvas.toDataURL( 'image/png', 1 );  //1表示质量(无损压缩


                        $.ajax({
                            type: "POST",
                            url:"BLL/Home/Login/frmLogin.ashx?Action=LoginCheckIn",
                            data: { "JsonDataNew": base64data },
                            async: false,
                            success: function (jsonText) {
                                console.log( JSON.parse(jsonText));
                            },
                            error: function (ex) {
                                console.log( JSON.parse(ex));

                            }
                        });
                        //console.log(canvas.toDataURL( 'image/png' ));

                        //},200);
                        
                    })



                } else {
                    alert('不支持访问用户媒体');
                }
            }
            else
            {
                window.location.reload();
            }
        });
        $(".create-account").click(function () {

            $(".create-account").css("display", "none");
            $("#ActionLogin").css("display", "none");
            $(".register-form").css("display", "block");


        });
        $("#register-back-btn").click(function () {

            $(".create-account").css("display", "block");
            $("#ActionLogin").css("display", "block");
            $(".register-form").css("display", "none");
            window.location.reload();


        });
        //切换背景
        var bg = false;
        setInterval(function () {
            if (bg == false) {
                $("#bodygb").removeClass("bg1").addClass("bg2");

                bg = true;
            }
            else {
                $("#bodygb").removeClass("bg2").addClass("bg1");

                bg = false;
            }


        }, 7000)

        //登录
        $("#btnLogin").click(function () {

            var username = $("#username").val();
            var password = $("#password").val();
            if (username.length <= 0 || password.length <= 0) {
                $("#errormsg").removeClass("display-hide").addClass("display-show");
            }
            else {

                var obj = {
                    Method: "POST",
                    Url: "BLL/Home/Login/frmLogin.ashx",
                    Action: "Login",
                    FormId: "LoginForm"
                };


                try {

                    $.SubmitFormData(obj);


                    var jsonText = obj.jsonText.data;
                    console.log(jsonText);
                    if (jsonText == "OK") {
                        $.Redirect("Home/Index/Default/YPDefault.aspx");
                    }
                    else {
                        $.Alert("输入的账号或密码不正确!");
                        return;
                    }
                } catch (e) {
                    $.Alert(e);
                    return;
                }
            }

        });
        var countdown=60;  

        //验证码倒计时
        function settime(SelID) {  
           
            if (countdown == 0) {  
                $("#"+SelID).attr("disabled",false);  
                $("#"+SelID).text("重新获取");  
                
                countdown = 60;  
                return false;  
            } else {  
                $("#"+SelID).attr("disabled", true);   
                
                $("#"+SelID).text("重新发送(" + countdown + ")");  
                countdown--;  
            }  
            setTimeout(function() {  
                settime(SelID);  
            },1000);  
        }

        //获取验证码
        $("#btnSendCode").click(function () {
            //邮件发送
            //formRegister
            var email = $("#email").val();
            if ($.checkEmpty("email", email, "该项为必填项!")) { return false; };

            var obj = {
                Method: "POST",
                Url: "BLL/Home/Login/frmLogin.ashx",
                Action: "SendMail",
                FormId: "FormRegister"
            };


            try {

                $.SubmitFormData(obj);
                var jsonText = obj.jsonText.data.Msg;
                //  console.log(jsonText);
                if (jsonText == "OK") {
                    $.Alert("验证码已成功发送!");
                    settime($(this).attr('id'));
                    return;
                }
                else {
                    $.Alert("验证码已发送失败!");
                    return;
                }
            } catch (e) {
                $.Alert("验证码已发送失败," + e.message);
                return;
            }
        });

        //注册
        $("#btnRegister").click(function () {

            var flag = $("#tnc").is(':checked');


            var RegName = $("#RegName").val();
            var RegTel = $("#RegTel").val();
            var RegCompany = $("#RegCompany").val();
            var VC = $("#VC").val();
            if ($.checkEmpty("RegName", RegName, "该项为必填项!")) { return false; };
            if ($.checkEmpty("RegTel", RegTel, "该项为必填项!")) { return false; };
            if ($.checkEmpty("RegCompany", RegCompany, "该项为必填项!")) { return false; };
            if ($.checkEmpty("VC", VC, "该项为必填项!")) { return false; };

            if (flag == true) {
                var obj = {
                    Method: "POST",
                    Url: "BLL/Home/Login/frmLogin.ashx",
                    Action: "Register",
                    FormId: "FormRegister"
                };


                try {

                    $.SubmitFormData(obj);


                    var jsonText = obj.jsonText.data.Msg;

                    if (jsonText == "OK") {
                        $.Alert("注册成功,客服稍后联系!");

                        setTimeout(function () {
                            window.location.reload();
                        }, 3000);

                        return;
                    }
                    else {
                        $.Alert("注册失败!");
                        return;
                    }
                } catch (e) {

                    $.Alert("注册失败," + e.message);
                    return;
                }
            }
            else {
                $.Alert("请接受使用须知！");
                return;
            }
        });

        $("#fwtk").click(function(){
            $.AlertTitleMsgText("使用须知","<h4>第一条</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;优品系统是专业的流程管理系统，主要针对影楼礼服管理：订单、场馆、风格、统计、出租、出售、使用流程等进行系统化管理。<br/><h4>第二条</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;优品系统现针对广大用户推出 299 元免费体验三个月，试用三个月后不满意全额返还。<br/><h4>第三条</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;三个月后正式签约购买优品系统一年以上，赠送重庆贰零一九信息科技有限公司 0.01%股份，并享受公司盈利年终分红，仅限 100 名合作客户。<br/><h4>第四条</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;股东购买优品系统可享内部折扣 98 折，一次性签约3 年可享 95 折，一次性签约 5 年可享 92 折。<br/><h4>第五条</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 股东使用优品系统期间，原流程基础不改变部分需求可享受免费二次开发，无需额外支付需求开发费用。<br/><h4>第六条</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 股东使用优品系统期间，可享受其它需求开发优先权，无需排队等候，延长开发周期。<br/><h4>第七条</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 优品系统客户仅享受系统使用权，优品系统所有权归属重庆二零一九信息科技有限公司。<br/><h4>第八条</h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 优品系统注册后需重庆二零一九信息科技有限公司授权使用，禁止私自转卖或者盗用，违权者追究法律责任。<br/><h4>第九条</h4> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以上八条权益仅限于客户合作期间，合作终止后以上权益全部作废，占比股份归重庆二零一九信息科技有限公司所有。","已阅读");
            return;
        });
    </script>
    <!-- END JAVASCRIPTS -->
    <div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>
    </div>
</body>
<!-- END BODY -->
</html>


