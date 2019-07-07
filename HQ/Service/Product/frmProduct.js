
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


    //新建产品
    $("#btnAddProduct").live("click", function () {
        $('#DivAddProduct').modal()
    });



    $("#btnSaveAddProduct").live("click", function () {

        var addProductName = $("#addProductName").val();
        var addProductRemark = $("#addProductRemark").val(); 

        //必填项检查
        if ($.checkEmpty("addProductName", addProductName, "该项为必填项!")) { return false; };
        if ($.checkEmpty("addProductRemark", addProductRemark, "该项为必填项!")) { return false; };

        var obj = {
            Url: "../../../BLL/HQ/Service/Product/frmProduct.ashx",
            Action: "addProduct",
            FormId: "FormAddProduct"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivAddProduct').modal('hide');
                $.EmptyForm("FormAddProduct");
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
                        Url: "../../../BLL/HQ/Service/Product/frmProduct.ashx",
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


    $("#BtnItemAuth").live("click", function (event) {


        var RoleID = $(event.target).attr("SID");
        var AuthProductName = $(event.target).attr("ProductName");

        $("#HideAuthPID").val(RoleID);
        $("#AuthProductName").val(AuthProductName);





        $('#DivAuthProduct').modal()
        //动态加载公司端 功能列表
        LoadBranchMenuList(RoleID);
        //动态加载门店端 功能列表
        LoadSiteMenuList(RoleID);




    });

    
    function LoadBranchMenuList(RoleID) {


        var obj = {
            Url: "../../../BLL/HQ/Service/Product/frmProduct.ashx",
            Action: "LoadBranchMenuList",
            Data: { "RoleID": RoleID }
        };
        //提交  
        $.SubmitPostData(obj);
        var jsonText = obj.jsonText;
        $("#tab_Branch").html("");
        $("#tab_Branch").append(jsonText.data);
    }

    function LoadSiteMenuList(RoleID) {


        var obj = {
            Url: "../../../BLL/HQ/Service/Product/frmProduct.ashx",
            Action: "LoadSiteMenuList",
            Data: { "RoleID": RoleID }
        };
        //提交  
        $.SubmitPostData(obj);
        var jsonText = obj.jsonText;
        $("#tab_Site").html("");
        $("#tab_Site").append(jsonText.data);
    }


    $("#tab_Branch input").live("click", function () {
        var ClicType = $(this).attr("name").split('_')[0];//得到类型：P表示一级菜单
        var ClicID = $(this).attr("name").split('_')[1]; //得到对应的值



        //用户点击一级菜单
        if (ClicType == "BP") {
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


    $("#tab_Site input").live("click", function () {
        var ClicType = $(this).attr("name").split('_')[0];//得到类型：P表示一级菜单
        var ClicID = $(this).attr("name").split('_')[1]; //得到对应的值



        //用户点击一级菜单
        if (ClicType == "WP") {
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




    $("#btnSaveAuthProduct").live("click", function () {



        var obj = {
            Url: "../../../BLL/HQ/Service/Product/frmProduct.ashx",
            Action: "AuthProduct",
            FormId: "FormAuthProduct"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivAuthProduct').modal('hide');
                $.EmptyForm("FormAuthProduct");
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



    //刷新数据源
    function RefreshTable() {
        var obj = {
            SearchformID: "searchform",//查询条件ID
            Url: "../../../BLL/HQ/Service/Product/frmProduct.ashx",//数据源URL
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
        url: "../../../BLL/HQ/Service/Product/frmProduct.ashx?Action=Query",
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
            field: 'ProductName',
            title: '产品名称',
            align: 'center'
        },

        {
            field: 'Remark',
            title: '产品备注',
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
                var Del = '<a href="#"  id="BtnItemDel" SID="' + row.ID + '" class="btn btn-danger">删除</a>';
                var Auth = '<a href="#"  id="BtnItemAuth" SID="' + row.ID + '" ProductName="' + row.ProductName + '" class="btn btn-primary">产品授权</a>';

                Btn = Auth + Del;


                return Btn;
            }
        }],
        pagination: true
    });




});