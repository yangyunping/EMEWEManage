<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="js.ascx.cs" Inherits="EMEWEManage.Common.js" %>


<script src="../../Skin/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="../../Skin/assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>
<script src="../../Skin/assets/global/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>

<script src="../../Skin/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../../Skin/assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="../../Skin/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>

<script src="../../Skin/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
<script src="../../Skin/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="../../Skin/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="../../Skin/assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
<script src="../../Skin/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>

<script src="../../Skin/Common/YPTech.js?_dc=<%=Guid.NewGuid() %>"></script>
<%--表格--%>
<script src="../../Skin/assets/global/plugins/bootstrap-table/bootstrap-table.js"></script>
<script src="../../Skin/assets/global/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>

<%--弹出框--%>
<script src="../../Skin/assets/global/plugins/bootbox/bootbox.min.js"></script>

<script type="text/javascript" src="../../../Skin/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript" src="../../../Skin/assets/global/plugins/bootstrap-daterangepicker/moment.min.js"></script>
<script src="../../Skin/assets/admin/pages/scripts/components-pickers.js"></script>
<script src="../../Skin/assets/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js"></script>

<script src="../../Skin/assets/global/plugins/select2/select2.min.js"></script>

<script src="../../Skin/assets/global/plugins/select2/select2_locale_zh-CN.js"></script>



<script type="text/javascript">


    jQuery(document).ready(function ($) {

        //Layout.init();

        $(this).live("click", function (event) {

            var ClickSkinName = event.target.id;
            var SkinKey = ClickSkinName.split('_')[0];
            if (SkinKey == "skin") {
                var SkinName = ClickSkinName.split('_')[1];


                //var obj = {
                //    Url: "../../../BLL/Common/frmCommon.ashx",
                //    Action: "UpdateSkin",
                //    FormId: "FormAddRole"
                //};


                var obj = {
                    Url: "../../../BLL/Common/frmCommon.ashx",
                    Action: "UpdateSkin",
                    Data: { "SkinName": SkinName }
                };
                //提交  
                $.SubmitPostData(obj);

                try {
                    var jsonText = obj.jsonText.data;

                    if (jsonText.Msg == "OK") {
                        //得到皮肤Skin更新数据库，加载Skin  SkinKey()
                        $("#style_color").attr("href", "../../../Skin/assets/admin/layout/css/themes/" + SkinName + ".css");
                        //$.Alert("操作成功!");
                        //$('#DivAddRole').modal('hide');
                        //$.EmptyForm("FormAddRole");
                        ////刷新表单
                        //RefreshTable();
                    }
                    else {
                        //  $.Alert(jsonText.Msg);
                        return;
                    }


                } catch (e) {
                    // $.Alert(jsonText.data.Msg);
                    return;
                }





            }

        });


















    });
</script>