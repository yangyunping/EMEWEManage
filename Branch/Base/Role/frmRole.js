
jQuery(document).ready(function ($) {

    Layout.init();

    //重置查询条件
    $("#btnReset").live("click", function () {
        $.EmptyForm("searchform");
    });


    //查询按钮
    $("#btnQuery").live("click", function () {
        RefreshTable();
    });

    //新建角色按钮
    $("#btnAddBranchRole").live("click", function () {
        $('#DivAddBranchRole').modal()
    });

    //新增角色的保存按钮
    $("#btnSaveAddRole").live("click", function () {

        var addRoleName = $("#addRoleName").val();

        //必填项检查
        if ($.checkEmpty("addRoleName", addRoleName, "该项为必填项!")) { return false; };

        var obj = {
            Url: "../../../BLL/Branch/Base/Role/frmRole.ashx",
            Action: "addRole",
            FormId: "FormAddRole"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivAddRole').modal('hide');
                $.EmptyForm("FormAddRole");
                //刷新表单
                RefreshTable();
            }
            else {
                $.Alert(jsonText.Msg);
                return;
            }


        } catch (e) {
            $.Alert(jsonText.data.Msg);
            return;
        }




    });


    //编辑角色按钮
    $("#BtnItemEdit").live("click", function (event) {
        //PID  PName
        var SID = $(event.target).attr("SID");
        var RoleName = $(event.target).attr("RoleName");

        $("#HideEditPID").val(SID);
        $("#EditRoleName").val(RoleName);

        $('#DivEditRole').modal()
    });

    //编辑角色保存按钮
    $("#btnSaveEditRoleName").live("click", function () {

        var EditRoleName = $("#EditRoleName").val();

        //必填项检查
        if ($.checkEmpty("EditRoleName", EditRoleName, "该项为必填项!")) { return false; };

        var obj = {
            Url: "../../../BLL/Branch/Base/Role/frmRole.ashx",
            Action: "EditRole",
            FormId: "FormEditRole"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivEditRole').modal('hide');
                $.EmptyForm("FormEditRole");
                //刷新表单
                RefreshTable();
            }
            else {
                $.Alert(jsonText.Msg);
                return;
            }


        } catch (e) {
            $.Alert(jsonText.data.Msg);
            return;
        }




    });

    //功能授权 点击按钮
    $("#BtnItemAuth").live("click", function (event) {

        var RoleID = $(event.target).attr("SID");
        var AuthRoleName = $(event.target).attr("RoleName");

        $("#HideAuthPID").val(RoleID);
        $("#AuthRoleName").val(AuthRoleName);
        //动态加载优品端 功能列表
        LoadYPMenuList(RoleID);
        $('#DivAuthRole').modal()
    });

    //加载优品端菜单列表
    function LoadYPMenuList(RoleID) {


        var obj = {
            Url: "../../../BLL/Branch/Base/Role/frmRole.ashx",
            Action: "LoadYPMenuList",
            Data: { "RoleID": RoleID }
        };
        //提交  
        $.SubmitPostData(obj);
        var jsonText = obj.jsonText;
        $("#tab_YP").html("");
        $("#tab_YP").append(jsonText.data);
    }

    //权限按钮点击事件
    $("#tab_YP input").live("click", function () {
        var ClicType = $(this).attr("name").split('_')[0];//得到类型：P表示一级菜单
        var ClicID = $(this).attr("name").split('_')[1]; //得到对应的值



        //用户点击一级菜单
        if (ClicType == "P") {
            var IsCheck = $(this).is(':checked'); //得到当前点击的标签的选中状态值
            $(this).parent().parent().next().find('input').each(function (key, value) {
                if (IsCheck == true) {
                    $(this).attr("checked", true);
                }
                else {
                    $(this).attr("checked", false);
                }
            });

        }
        else//用户点击二级菜单
        {
            var PID = $(this).parent().parent().parent().prev().find('input').attr("id");//得到当前点击的二级菜单的一级菜单的ID
            var CSeltedSize = 0;
            $(this).parent().parent().parent().children().find('input').each(function (key, value) {
                var IsCheck = $(this).is(':checked'); //得到当前点击的标签的选中状态值
                if (IsCheck == true) {
                    CSeltedSize = CSeltedSize + 1;
                }

            });
            if (CSeltedSize > 0) {

                $("#" + PID).attr("checked", true);
            }
            else {
                $("#" + PID).attr("checked", false);
            }


        }



    });


    $("#btnSaveAuthRoleName").live("click", function () {



        var obj = {
            Url: "../../../BLL/Branch/Base/Role/frmRole.ashx",
            Action: "AuthRole",
            FormId: "FormAuthRole"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivAuthRole').modal('hide');
                $.EmptyForm("FormAuthRole");
                //刷新表单
                RefreshTable();
            }
            else {
                $.Alert(jsonText.Msg);
                return;
            }


        } catch (e) {
            $.Alert(jsonText.data.Msg);
            return;
        }




    });

    //删除
    $("#BtnItemDel").live("click", function (event) {



        bootbox.confirm({
            title: "温馨提醒",
            message: "你确定要做此操作吗？",
            buttons: {
                confirm: {
                    label: "确定"
                },
                cancel: {
                    label: "取消"

                }
            },
            callback: function (result) {


                if (result) {
                    //得到当前点击的行的SID值
                    var SID = $(event.target).attr("SID");
                    var obj = {
                        Url: "../../../BLL/Branch/Base/Role/frmRole.ashx",
                        Action: "Del",
                        Data: { "SID": SID }
                    };

                    //提交  
                    $.SubmitPostData(obj);
                    var jsonText = obj.jsonText;

                    if (jsonText.data.Msg == "OK") {
                        $.Alert("操作成功!");

                        //刷新表单
                        RefreshTable();
                    }
                    else {
                        $.Alert(jsonText.data.Msg);
                        return;
                    }
                } else {

                    return true;
                }

            },
            success: function (result1) {

                return true;
            }


        });




    });


    //刷新数据源
    function RefreshTable() {
        var obj = {
            SearchformID: "searchform",//查询条件ID
            Url: "../../../BLL/Branch/Base/Role/frmRole.ashx",//数据源URL
            Action: "Query",//数据源Url对应的方法
            RefreshTableID: "table"//数据源绑定的ID
        };
        $.RefreshTable(obj);
    }



    //页面初始化 默认加载
    $('#table').bootstrapTable({

        //请求方法
        method: 'get',
        //是否显示行间隔色
        striped: true,
        //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）     
        cache: false,
        //是否显示分页（*）  
        pagination: true,
        //是否启用排序  
        sortable: true,
        //排序方式 
        sortOrder: "asc",
        //初始化加载第一页，默认第一页
        pageNumber: 1,
        //每页的记录行数（*）   
        pageSize: 15,

        //可供选择的每页的行数（*）    
        pageList: [15, 20, 25],
        paginationPreText: "上一页",
        paginationNextText: "下一页",
        paginationFirstText: "第一页",
        paginationLastText: '最后一页',
        //这个接口需要处理bootstrap table传递的固定参数,并返回特定格式的json数据  
        url: "../../../BLL/Branch/Base/Role/frmRole.ashx?Action=Query",
        //默认值为 'limit',传给服务端的参数为：limit, offset, search, sort, order Else
        //queryParamsType:'',   
        //查询参数,每次调用是会带上这个参数，可自定义                         
        queryParams: function (params) {
            return {
                PageSize: params.limit,                         //页面大小
                PageIndex: (params.offset / params.limit) + 1,   //页码
                sort: params.sort,      //排序列名  
                sortOrder: params.order,//, //排位命令（desc，asc）
                JsonDataNew: BASE64.encoder($('#searchform').serialize())
            };
        },

        //分页方式：client客户端分页，server服务端分页（*）
        sidePagination: "server",
        //是否显示搜索
        search: false,
        strictSearch: true,
        idField: "ID",
        columns: [
        {
            checkbox: true,
            visible: false //是否显示复选框  
        },
        {
            field: 'ID',
            title: '编号',
            align: 'center',
            visible: false
        },

         {
             field: 'RowIndex',
             title: '序号',
             align: 'center'
         },



        {
            field: 'OrgType',
            title: '账户类型',
            align: 'center'
        },
         {
             field: 'RoleName',
             title: '角色名称',
             align: 'center'
         },

           {
               field: 'CreateUser',
               title: '创建人',
               align: 'center'
           },
           {
               field: 'CreateDate',
               title: '创建时间',
               align: 'center'
           },
        {
            field: 'TypeClass',
            title: '操作',
            align: 'center',
            width: 300,
            formatter: function (value, row, index) {
                var Btn = "";
                var Del = "";
                var Edit = "";
                var Auth = "";
               
                Del = '<a href="#"  id="BtnItemDel" SID="' + row.ID + '" class="btn btn-danger">删除</a>';
                Edit = '<a href="#"  id="BtnItemEdit" SID="' + row.ID + '"  RoleName="' + row.RoleName + '"    class="btn btn-primary">编辑</a>';
                Auth = '<a href="#"  id="BtnItemAuth"  SID="' + row.ID + '"  RoleName="' + row.RoleName + '"      class="btn btn-warning">功能授权</a>';

                






                Btn = Edit + Auth + Del;



                return Btn;
            }
        }],
        pagination: true
    });




});