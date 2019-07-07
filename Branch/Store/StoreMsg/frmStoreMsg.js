
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

   

  





    //刷新数据源
    function RefreshTable() {
        var obj = {
            SearchformID: "searchform",//查询条件ID
            Url: "../../../BLL/Branch/Store/StoreMsg/frmStoreMsg.ashx",//数据源URL
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
        url: "../../../BLL/Branch/Store/StoreMsg/frmStoreMsg.ashx?Action=Query",
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
            field: 'SiteCode',
            title: '门店代码',
            align: 'center'
        }
        ,
         {
             field: 'SiteName',
             title: '门店名称',
             align: 'center'
         }
        ,
         {
             field: 'SiteUser',
             title: '门店联系人',
             align: 'center'
         }
        ,
         {
             field: 'SiteTel',
             title: '门店联系电话',
             align: 'center'
         },
         {
             field: 'OpenDate',
             title: '开通日期',
             align: 'center'
         },
         {
             field: 'EndDate',
             title: '到期日期',
             align: 'center'
         }
        ,
         {
             field: 'SiteAddress',
             title: '门店地址',
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
        }//,
        //{
        //    field: 'TypeClass',
        //    title: '操作',
        //    align: 'center',
        //    width: 200,
        //    formatter: function (value, row, index) {
        //        var Btn = "";
        //        var Del = '<a href="#"  id="BtnItemEdit" SID="' + row.ID + '" class="btn btn-sm glyphicon glyphicon glyphicon-edit">编辑</a>';

        //        Btn = Del;


        //        return Btn;
        //    }
        //}
        ],
        pagination: true
    });




});