﻿
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


    //新建根菜单按钮
    $("#btnAddCompany").live("click", function () {
        $('#DivAddCompany').modal();
        LoadProductList();
    });

    function LoadProductList() {

        var obj = {

            Url: "../../../BLL/HQ/Organization/Company/frmCompany.ashx",
            Action: "LoadProductList"//,
            //Data: { "OrgType": SOrgType }
        };

        //提交表单
        $.SubmitPostData(obj);
        var jsonText = obj.jsonText;
        $.FillSelectOption("ProductId", jsonText);
    }

    $("#btnSaveAddCompany").live("click", function () {




        var ProductId = $("#ProductId").val();
        var addBranchCode = $("#addBranchCode").val();
        var addCompanyName = $("#addCompanyName").val();
        var addCompanyAddress = $("#addCompanyAddress").val();
        var addCompanyContactUser = $("#addCompanyContactUser").val();
        var addCompanyContactTel = $("#addCompanyContactTel").val();

        //必填项检查
        if ($.checkEmpty("ProductId", ProductId, "该项为必填项!")) { return false; };
        if ($.checkEmpty("addBranchCode", addBranchCode, "该项为必填项!")) { return false; };
        if ($.checkEmpty("addCompanyName", addCompanyName, "该项为必填项!")) { return false; };
        if ($.checkEmpty("addCompanyAddress", addCompanyAddress, "该项为必填项!")) { return false; };

        if ($.checkEmpty("addCompanyContactUser", addCompanyContactUser, "该项为必填项!")) { return false; };
        if ($.checkEmpty("addCompanyContactTel", addCompanyContactTel, "该项为必填项!")) { return false; };

        var obj = {
            Url: "../../../BLL/HQ/Organization/Company/frmCompany.ashx",
            Action: "addCompany",
            FormId: "FormAddCompany"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivAddCompany').modal('hide');
                $.EmptyForm("FormAddCompany");
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
                        Url: "../../../BLL/HQ/Organization/Company/frmCompany.ashx",
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
            Url: "../../../BLL/HQ/Organization/Company/frmCompany.ashx",//数据源URL
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
        url: "../../../BLL/HQ/Organization/Company/frmCompany.ashx?Action=Query",
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
            field: 'CompanyName',
            title: '公司名称',
            align: 'center'
        },

        {
            field: 'BranchCode',
            title: '公司代码',
            align: 'center'
        }
        ,

        {
            field: 'CompanyAddress',
            title: '公司地址',
            align: 'center'
        }
        ,

        {
            field: 'CompanyContactUser',
            title: '负责人',
            align: 'center'
        }
        ,

        {
            field: 'CompanyContactTel',
            title: '负责人电话',
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
            width: 100,
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