
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
    $("#btnAddPMenu").live("click", function () {
        $('#DivAddPMenu').modal()
    });



    //新建根菜单保存按钮
    $("#btnSavePMenu").live("click", function () {

        var PUserType = $("#PUserType").val();
        var PUrlName = $("#PUrlName").val();
        var PIsSort = $("#PIsSort").val();
        var PIcon = $("#PIcon").val();
        
        //必填项检查
        if ($.checkEmpty("PUserType", PUserType, "该项为必填项!")) { return false; };
        if ($.checkEmpty("PUrlName", PUrlName, "该项为必填项!")) { return false; };
        if ($.checkEmpty("PIsSort", PIsSort, "该项为必填项!")) { return false; };
        if ($.checkEmpty("PIcon", PIcon, "该项为必填项!")) { return false; };

        var obj = {
            Url: "../../../BLL/HQ/Base/Menu/frmMenu.ashx",
            Action: "addPMenu",
            FormId: "FormAddPMenu"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivAddPMenu').modal('hide');
                $.EmptyForm("FormAddPMenu");
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

    //新建子菜单按钮
    $("#btnAddCMenu").live("click", function () {

        $('#DivAddCMenu').modal()

    });


    //新建内容页面
    $("#BtnItemAdd").live("click", function () {

        $('#DivSubAdd').modal()

        var OrgType = $(event.target).attr("OrgType");
        var PID = $(event.target).attr("PID");
        var SID = $(event.target).attr("SID");
        var Name = $(event.target).attr("Name");
       // var IsSort = $(event.target).attr("IsSort");
        var PName = $(event.target).attr("PName");
        
        $("#ItemOrgType").val(OrgType);
        $("#ItemPName").val(PName);
        $("#ItemCName").val(Name);

        $("#ItemSID").val(SID);
        $("#HideOrgType").val(OrgType);

       // $("#EditPUrlName").val(Name);
       // $("#EditPUrlName").val(Name);
      //  var Url = $(event.target).attr("Url");
      //  var Icon = $(event.target).attr("Icon");
      //  if (OrgType == "优品端") OrgType = "C";
      //  if (OrgType == "公司端") OrgType = "B";
      //  if (OrgType == "门店端") OrgType = "W";
      //  $("#HideSID").val(SID);
      //  $("#HideCSID").val(SID);
        

        //<a href="#"  id="BtnItemAdd" SID="' + row.ID + '" PID="' + row.PID + '" PName="' + row.PName + '"  OrgType="' + row.OrgType + '" class="btn btn-sm glyphicon glyphicon-sort-by-alphabet-alt">管理内容页</a>



    });

     



    //新建子菜单保存按钮
    $("#btnSaveCMenu").live("click", function () {

        var OrgType = $("#OrgType").val();
        var PMenu = $("#PMenu").val();
        var CUrlName = $("#CUrlName").val();
        var CUrl = $("#CUrl").val();
        var CIsSort = $("#CIsSort").val();


        var CIcon = $("#CIcon").val();
         
        


        //必填项检查
        if ($.checkEmpty("OrgType", OrgType, "该项为必填项!")) { return false; };
        if ($.checkEmpty("PMenu", PMenu, "该项为必填项!")) { return false; };
        if ($.checkEmpty("CUrlName", CUrlName, "该项为必填项!")) { return false; };
        if ($.checkEmpty("CUrl", CUrl, "该项为必填项!")) { return false; };
        if ($.checkEmpty("CIsSort", CIsSort, "该项为必填项!")) { return false; };
        if ($.checkEmpty("CIcon", CIcon, "该项为必填项!")) { return false; };

        var obj = {
            Url: "../../../BLL/HQ/Base/Menu/frmMenu.ashx",
            Action: "addCMenu",
            FormId: "FormAddCMenu"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivAddCMenu').modal('hide');
                $.EmptyForm("FormAddCMenu");
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
    //新建子菜单  菜单类型改变事件
    $("#OrgType").on('change', function (event) {
        var SOrgType = $("#OrgType option:selected").val();

        var obj = {

            Url: "../../../BLL/HQ/Base/Menu/frmMenu.ashx",
            Action: "OrgTypeChange",
            Data: { "OrgType": SOrgType }
        };

        //提交表单
        $.SubmitPostData(obj);
        var jsonText = obj.jsonText;
        $.FillSelectOption("PMenu", jsonText);
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
                        Url: "../../../BLL/HQ/Base/Menu/frmMenu.ashx",
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







    //编辑按钮
    $("#BtnItemEdit").live("click", function (event) {
        var OrgType = $(event.target).attr("OrgType");
        var PID = $(event.target).attr("PID");
        var SID = $(event.target).attr("SID");
        var Name = $(event.target).attr("Name");
        var IsSort = $(event.target).attr("IsSort");
        var PName = $(event.target).attr("PName");
        var Url = $(event.target).attr("Url");
        var Icon = $(event.target).attr("Icon");
        var AsName = $(event.target).attr("AsName");
        console.log(AsName);
        if (OrgType == "优品端") OrgType = "C";
        if (OrgType == "公司端") OrgType = "B";
        if (OrgType == "门店端") OrgType = "W";
        $("#HideSID").val(SID);
        $("#HideCSID").val(SID);
        if (PID == "0") {


            $("#HideEditPOrgType").val(OrgType);

            $("#EditPOrgType").val(OrgType);
            $('#DivEditPMenu').modal();
            $("#EditPUrlName").val(Name);
            $("#EditPIsSort").val(IsSort);
            $("#EditPIcon").val(Icon);
            $("#EditPAsName").val(AsName);
            
        }
        else {


            $("#HideEditCOrgType").val(OrgType);
            $("#EditCOrgType").val(OrgType);

            $("#EditCUrlName").val(Name);
            $("#EditCUrl").val(Url);

            $("#EditCIsSort").val(IsSort);
            $("#EditCIcon").val(Icon);
            $("#EditCAsName").val(AsName);


            $("#EditCMenu").val(PName);
            $('#DivEditCMenu').modal()


        }
    });





    //编辑 根目录 保存按钮
    $("#btnSaveEditPMenu").live("click", function () {

        var EditPUrlName = $("#EditPUrlName").val();
        var EditPIsSort = $("#EditPIsSort").val();
        var EditPIcon = $("#EditPIcon").val();

        //必填项检查
        if ($.checkEmpty("EditPUrlName", EditPUrlName, "该项为必填项!")) { return false; };
        if ($.checkEmpty("EditPIsSort", EditPIsSort, "该项为必填项!")) { return false; };
        if ($.checkEmpty("EditPIcon", EditPIcon, "该项为必填项!")) { return false; };

        var obj = {
            Url: "../../../BLL/HQ/Base/Menu/frmMenu.ashx",
            Action: "EditPMenu",
            FormId: "FormEditPMenu"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivEditPMenu').modal('hide');
                $.EmptyForm("FormAddPMenu");
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



    //编辑 子级 保存按钮
    $("#btnSaveEditCMenu").live("click", function () {



        var EditCUrlName = $("#EditCUrlName").val();
        var EditCUrl = $("#EditCUrl").val();

        var EditCIsSort = $("#EditCIsSort").val();
        var EditCIcon = $("#EditCIcon").val();



        //必填项检查
        if ($.checkEmpty("EditCUrlName", EditCUrlName, "该项为必填项!")) { return false; };
        if ($.checkEmpty("EditCUrl", EditCUrl, "该项为必填项!")) { return false; };
        if ($.checkEmpty("EditCIsSort", EditCIsSort, "该项为必填项!")) { return false; };
        if ($.checkEmpty("EditCIcon", EditCIcon, "该项为必填项!")) { return false; };

        var obj = {
            Url: "../../../BLL/HQ/Base/Menu/frmMenu.ashx",
            Action: "EditCMenu",
            FormId: "FormEditCMenu"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivEditCMenu').modal('hide');
                $.EmptyForm("FormAddCMenu");
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



    //保存 新增内容页 
    $("#btnItemSave").live("click", function () {



        var ItemSubName = $("#ItemSubName").val();
        var ItemSubUrl = $("#ItemSubUrl").val(); 


        //必填项检查
        if ($.checkEmpty("ItemSubName", ItemSubName, "该项为必填项!")) { return false; };
        if ($.checkEmpty("ItemSubUrl", ItemSubUrl, "该项为必填项!")) { return false; }; 
        var obj = {
            Url: "../../../BLL/HQ/Base/Menu/frmMenu.ashx",
            Action: "ItemSave",
            FormId: "FormItemMenu"
        };

        //提交表单
        $.SubmitFormData(obj);
        try {
            var jsonText = obj.jsonText.data;

            if (jsonText.Msg == "OK") {
                $.Alert("操作成功!");
                $('#DivSubAdd').modal('hide');
                $.EmptyForm("FormItemMenu");
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
            Url: "../../../BLL/HQ/Base/Menu/frmMenu.ashx",//数据源URL
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
        url: "../../../BLL/HQ/Base/Menu/frmMenu.ashx?Action=Query",
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
            title: '菜单类型',
            align: 'center'
        },

        {
            field: 'PName',
            title: '上级菜单',
            align: 'center'
        },
         {
             field: 'PID',
             title: '上级菜单',
             align: 'center',
             visible: false
         },
        {
            field: 'Name',
            title: '菜单名称',
            align: 'center'
        }, {
            field: 'AsName',
            title: '菜单名称别名',
            align: 'center'
        },
         {
             field: 'Url',
             title: '页面地址',
             align: 'center'
         },
           {
               field: 'IsSort',
               title: '排序编号',
               align: 'center'
           },
           {
               field: 'Icon',
               title: '图标设置',
               align: 'center'
           },



        {
            field: 'TypeClass',
            title: '操作',
            align: 'center',
            width: 250,
            formatter: function (value, row, index) {
                var Btn = "";
                var Del = '<a href="#"  id="BtnItemDel" SID="' + row.ID + '" class="btn btn-danger">删除</a>';
                var Edit = '<a href="#"  id="BtnItemEdit" OrgType="' + row.OrgType + '" PID="' + row.PID + '"  AsName="' + row.AsName + '"  PName="' + row.PName + '"   SID="' + row.ID + '"  Name="' + row.Name + '"  Url="' + row.Url + '"  IsSort="' + row.IsSort + '" Icon="' + row.Icon + '" class="btn btn-primary">编辑</a>';

                var AddMenu = '<a href="#"  id="BtnItemAdd" SID="' + row.ID + '" PID="' + row.PID + '" AsName="' + row.AsName + '" PName="' + row.PName + '"  OrgType="' + row.OrgType + '" Name="' + row.Name + '" class="btn btn-warning">新增内容页</a>';
                if (row.PName == "根目录") {
                    Btn =  Edit + Del;
                }
                else {

                    Btn = AddMenu + Edit + Del;
                }


                return Btn;
            }
        }],
        pagination: true
    });




});