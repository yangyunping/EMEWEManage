jQuery(document).ready(function ($) {

    Metronic.init();
    Layout.init();
 
    var urlStr = "../../BLL/SoftwareManage/SoftwareManage.ashx";

    window.onload = function () {
        $.EmptyForm("searchform");
        RefreshTable();
    };

    //查询按钮
    $("#btnQuery").live("click", function () {
        RefreshTable();
    });

    //新建风格
    $("#btnCreate").live("click", function () {
        $.EmptyForm("FormSoftInfo");
        $('#DivSoftInfo').modal();
    });

    //重置
    $("#btnReset").live("click", function () {
        $.EmptyForm("searchform");
    });


    //保存
    $("#btnSave").live("click", function () {
        if ($("#SoftZHName").val() === "" || $("#SoftENName").val() === "" ) {
            $.Alert("请输入软件名称!");
            return;
        }
        if ($.checkEmpty("SoftSqlName", $('#SoftSqlName').val(), "该项为必填项!")) { return false; };
        if ($.checkEmpty("TestConnect", $('#TestConnect').val(), "该项为必填项!")) { return false; };
        if ($.checkEmpty("ComputerID", $('#ComputerID').val(), "该项为必填项!")) { return false; };
        var searchform = $("#FormSoftInfo").serialize(); //获取查询表单的内容   

        //提交
        $("#FormSoftInfo").ajaxSubmit(
            {
                url: urlStr + "?Action=AddOrModify",
                type: "POST",
                data: searchform,
           
                success: function (data) {
                    var NewData = data.replace("<pre style=\"word-wrap: break-word; white-space: pre-wrap;\">", "");
                       NewData = NewData.replace("</pre>", "");
                       NewData = NewData.replace("<pre>", "");

                    if (NewData === "OK") {
                        $('#DivSoftInfo').modal('hide');
                        $.EmptyForm("FormSoftInfo");
                        //刷新表单
                        RefreshTable();
                        $.HideLoader();
                        return;
                    }
                    else {
                        $.Alert(NewData);
                        $.HideLoader();
                        //刷新表单
                        RefreshTable();
                        return;
                    }
                }
            }
        );
    });
    

    //编辑按钮
    $("#BtnItemEdit").live("click", function (event) {
        var softID = $(event.target).attr("SID");
        var NameCH = $(event.target).attr("NameCH");
        var NameEN = $(event.target).attr("NameEN");
        var NameData = $(event.target).attr("NameData");
        var DataConnectionTest = $(event.target).attr("DataConnectionTest");
        var DataConnectionOnline = $(event.target).attr("DataConnectionOnline");
        var ComputerID = $(event.target).attr("ComputerID");
        var ComputerName = $(event.target).attr("ComputerName");
        var CodeFilePath = $(event.target).attr("CodeFilePath");
        var DateFilePath = $(event.target).attr("DateFilePath");
        var Remark = $(event.target).attr("Remark");

        $("#SoftID").val(softID);
        $("#SoftCHName").val(NameCH);
        $("#SoftENName").val(NameEN);
        $("#SoftSqlName").val(NameData);
        $("#TestConnect").val(DataConnectionTest);
        $("#NormalConnect").val(DataConnectionOnline);
        $("#ComputerID").val(ComputerID);
        $("#ComputerName").val(ComputerName);
        $("#CodeFilePath").val(CodeFilePath);
        $("#DateFilePath").val(DateFilePath);
        $("#Remark").val(Remark);
        $('#DivSoftInfo').modal();
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
                        Url: urlStr,
                        Action: "Del",
                        Data: { "ID": SID }
                    };

                    //提交  
                    $.SubmitPostData(obj);
                    var jsonText = obj.jsonText;
                    if (jsonText.data.Msg === "OK") {
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
            }
        });
    });

    //刷新数据源
    function RefreshTable() {
        var obj = {
                SearchformID: "searchform",//查询条件ID
            Url: urlStr,
            Action: "Query",
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
        url: urlStr + "?Action=GetThemeInfo",
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
        idField: "ThemeID",
        columns: [
            {
                checkbox: true,
                visible: false //是否显示复选框  
            },
            {
                field: 'RowIndex',
                title: '序号',
                align: 'center'
            },
            {
                field: 'ID',
                title: '编号',
                align: 'center',
                visible: false
            },

            {
                field: 'NameCH',
                title: '软件中文名称',
                align: 'center'
            },
            {
                field: 'NameEN',
                title: '软件英文名称',
                align: 'center'
            },
            {
                field: 'NameData',
                title: '数据库名称',
                align: 'center'
            },
            {
                field: 'DataConnectionTest',
                title: '测试数据库连接',
                align: 'center'
            },
            {
                field: 'DataConnectionOnline',
                title: '正式数据库连接',
                align: 'center'
            },
            {
                field: 'ComputerID',
                title: '电脑ID',
                align: 'center'
            },
            {
                field: 'ComputerName',
                title: '电脑名',
                align: 'center'
            },
            {
                field: 'CodeFilePath',
                title: '源代码路径',
                align: 'center'
            },
            {
                field: 'DateFilePath',
                title: '数据库备份路径',
                align: 'center'
            },
            {
                field: 'Remark',
                title: '备注',
                align: 'center'
            }, {
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
                    Del = '<a href="#"  id="BtnItemDel" SID="' + row.ID + '" class="btn btn-danger btn-sm glyphicon glyphicon glyphicon-remove">删除</a>';
                    Edit = '<a href="#"  id="BtnItemEdit"  SID="' + row.ID + '"  NameCH="' + row.NameCH + '"  NameEN ="' + row.NameEN + '"    NameData = "' + row.NameData + '"    DataConnectionTest = "' + row.DataConnectionTest + '"   DataConnectionOnline = "' + row.DataConnectionOnline + '"   ComputerID = "' + row.ComputerID + '"    ComputerName = "' + row.ComputerName + '"   CodeFilePath = "' + row.CodeFilePath + '"  DateFilePath = "' + row.DateFilePath + '"   Remark = "' + row.Remark + '"   CreateDate = "' + row.CreateDate + '"  class="btn btn-sm glyphicon glyphicon glyphicon-edit" > 编辑</a > ';
                    Btn = Edit + Del;
                    return Btn;
                }
            }]
    });
});