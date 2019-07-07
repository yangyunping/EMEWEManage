
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


    //新建
    $("#btnAddSite").live("click", function () {
        $('#DivAddOrgUser').modal();
        LoadCompanyList();//加载公司列表
    });

    //根据公司加载公司角色
    $("#CompanyNameList").on('change', function (event) {
        var BranchCode = $("#CompanyNameList option:selected").val();
        console.log(BranchCode);
        var obj = {

            Url: "../../../BLL/HQ/Organization/OrgUser/frmOrgUser.ashx",
            Action: "BranchCodeChange",
            Data: { "BranchCode": BranchCode }
        };

        //提交表单
        $.SubmitPostData(obj);
        var jsonText = obj.jsonText;
        $.FillSelectOption("addRoleName", jsonText);
    });




    function LoadCompanyList(RoleID) {

        //
        var obj = {

            Url: "../../../BLL/HQ/Organization/OrgUser/frmOrgUser.ashx",
            Action: "LoadCompanyList"//,
            //Data: { "OrgType": SOrgType }
        };

        //提交表单
        $.SubmitPostData(obj);
        var jsonText = obj.jsonText;
        $.FillSelectOption("CompanyNameList", jsonText);


    }



    $("#btnSaveAddOrgUser").live("click", function () {
        var CompanyNameList = $("#CompanyNameList").val();
        var addRoleName = $("#addRoleName").val();

        var addUserName = $("#addUserName").val();
        var addTel = $("#addTel").val();
        var addUserWorkID = $("#addUserWorkID").val();
        var addUserPwd = $("#addUserPwd").val();



        if ($.checkEmpty("CompanyNameList", CompanyNameList, "该项为必填项!")) { return false; }; 
        if ($.checkEmpty("addRoleName", addRoleName, "该项为必填项!")) { return false; };
        if ($.checkEmpty("addUserName", addUserName, "该项为必填项!")) { return false; };
        if ($.checkEmpty("addTel", addTel, "该项为必填项!")) { return false; };
        if ($.checkMobileLen("addTel", addTel, "请输入正确的手机号码!")) { return false }
        if ($.checkEmpty("addUserWorkID", addUserWorkID, "该项为必填项!")) { return false; };
        if (addUserWorkID.length < 5) { $.Alert("账号必须大于等于五位"); return false; };
        if ($.checkZiMu_Number("addUserWorkID", addUserWorkID, "账号必须大于等于五位且只能输入字母或数字或字母数字组合!")) { return false; };
        if ($.checkEmpty("addUserPwd", addUserPwd, "该项为必填项!")) { return false; };
        if ($.checkZiMu_Number("addUserPwd", addUserPwd, "输入的密码不正确,密码规则如下：包含数字,大写字母,小写字母,特殊字符四选三,且长度在8到30个数之间!")) { return false; };





        var obj = {
            Url: "../../../BLL/HQ/Organization/OrgUser/frmOrgUser.ashx",
            Action: "addOrgUser",
            FormId: "FormAddOrgUser"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivAddOrgUser').modal('hide');
                $.EmptyForm("FormAddOrgUser");
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
                        Url: "../../../BLL/HQ/Organization/OrgUser/frmOrgUser.ashx",
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
            Url: "../../../BLL/HQ/Organization/OrgUser/frmOrgUser.ashx",//数据源URL
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
        url: "../../../BLL/HQ/Organization/OrgUser/frmOrgUser.ashx?Action=Query",
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
             title: '职位名称',
             align: 'center'
         },
           {
               field: 'Name',
               title: '姓名',
               align: 'center'
           }, {
               field: 'Tel',
               title: '电话',
               align: 'center'
           }
           , {
               field: 'WorkID',
               title: '账号',
               align: 'center'
           }
           , {
               field: 'WorkPwd',
               title: '密码',
               align: 'center'
           }
           ,
           {
               field: 'CreateUser',
               title: '创建人',
               align: 'center'
           },
           {
               field: 'CreateDate',
               title: '创建时间',
               align: 'center'
           }
        ,
        {
            field: 'TypeClass',
            title: '操作',
            align: 'center',
            width: 200,
            formatter: function (value, row, index) {
                var Btn = "";
                var Del = '<a href="#"  id="BtnItemDel" SID="' + row.ID + '" class="btn btn-sm glyphicon glyphicon glyphicon-remove">删除</a>';

                Btn = Del;


                return Btn;
            }
        }],
        pagination: true
    });




});