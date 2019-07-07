$(document).attr("title", "洋祺智能科技有限公司");//修改title值


/**   *BASE64 Encode and Decode By UTF-8 unicode *可以和java的BASE64编码和解码互相转化 */
(function () {
    var BASE64_MAPPING = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
		'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
		'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
		'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
		'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
		'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
		'w', 'x', 'y', 'z', '0', '1', '2', '3',
		'4', '5', '6', '7', '8', '9', '+', '/'
    ];

    /**
	 *ascii convert to binary
	 */
    var _toBinary = function (ascii) {
        var binary = new Array();
        while (ascii > 0) {
            var b = ascii % 2;
            ascii = Math.floor(ascii / 2);
            binary.push(b);
        }
        /*
		var len = binary.length;
		if(6-len > 0){
			for(var i = 6-len ; i > 0 ; --i){
				binary.push(0);
			}
		}*/
        binary.reverse();
        return binary;
    };

    /**
	 *binary convert to decimal
	 */
    var _toDecimal = function (binary) {
        var dec = 0;
        var p = 0;
        for (var i = binary.length - 1 ; i >= 0 ; --i) {
            var b = binary[i];
            if (b == 1) {
                dec += Math.pow(2, p);
            }
            ++p;
        }
        return dec;
    };

    /**
	 *unicode convert to utf-8
	 */
    var _toUTF8Binary = function (c, binaryArray) {
        var mustLen = (8 - (c + 1)) + ((c - 1) * 6);
        var fatLen = binaryArray.length;
        var diff = mustLen - fatLen;
        while (--diff >= 0) {
            binaryArray.unshift(0);
        }
        var binary = [];
        var _c = c;
        while (--_c >= 0) {
            binary.push(1);
        }
        binary.push(0);
        var i = 0, len = 8 - (c + 1);
        for (; i < len ; ++i) {
            binary.push(binaryArray[i]);
        }

        for (var j = 0 ; j < c - 1 ; ++j) {
            binary.push(1);
            binary.push(0);
            var sum = 6;
            while (--sum >= 0) {
                binary.push(binaryArray[i++]);
            }
        }
        return binary;
    };

    var __BASE64 = {
        /**
         *BASE64 Encode
         */
        encoder: function (str) {
            var base64_Index = [];
            var binaryArray = [];
            for (var i = 0, len = str.length ; i < len ; ++i) {
                var unicode = str.charCodeAt(i);
                var _tmpBinary = _toBinary(unicode);
                if (unicode < 0x80) {
                    var _tmpdiff = 8 - _tmpBinary.length;
                    while (--_tmpdiff >= 0) {
                        _tmpBinary.unshift(0);
                    }
                    binaryArray = binaryArray.concat(_tmpBinary);
                } else if (unicode >= 0x80 && unicode <= 0x7FF) {
                    binaryArray = binaryArray.concat(_toUTF8Binary(2, _tmpBinary));
                } else if (unicode >= 0x800 && unicode <= 0xFFFF) {//UTF-8 3byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(3, _tmpBinary));
                } else if (unicode >= 0x10000 && unicode <= 0x1FFFFF) {//UTF-8 4byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(4, _tmpBinary));
                } else if (unicode >= 0x200000 && unicode <= 0x3FFFFFF) {//UTF-8 5byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(5, _tmpBinary));
                } else if (unicode >= 4000000 && unicode <= 0x7FFFFFFF) {//UTF-8 6byte
                    binaryArray = binaryArray.concat(_toUTF8Binary(6, _tmpBinary));
                }
            }

            var extra_Zero_Count = 0;
            for (var i = 0, len = binaryArray.length ; i < len ; i += 6) {
                var diff = (i + 6) - len;
                if (diff == 2) {
                    extra_Zero_Count = 2;
                } else if (diff == 4) {
                    extra_Zero_Count = 4;
                }
                //if(extra_Zero_Count > 0){
                //	len += extra_Zero_Count+1;
                //}
                var _tmpExtra_Zero_Count = extra_Zero_Count;
                while (--_tmpExtra_Zero_Count >= 0) {
                    binaryArray.push(0);
                }
                base64_Index.push(_toDecimal(binaryArray.slice(i, i + 6)));
            }

            var base64 = '';
            for (var i = 0, len = base64_Index.length ; i < len ; ++i) {
                base64 += BASE64_MAPPING[base64_Index[i]];
            }

            for (var i = 0, len = extra_Zero_Count / 2 ; i < len ; ++i) {
                base64 += '=';
            }
            return base64;
        },
        /**
         *BASE64  Decode for UTF-8 
         */
        decoder: function (_base64Str) {
            var _len = _base64Str.length;
            var extra_Zero_Count = 0;
            /**
             *计算在进行BASE64编码的时候，补了几个0
             */
            if (_base64Str.charAt(_len - 1) == '=') {
                //alert(_base64Str.charAt(_len-1));
                //alert(_base64Str.charAt(_len-2));
                if (_base64Str.charAt(_len - 2) == '=') {//两个等号说明补了4个0
                    extra_Zero_Count = 4;
                    _base64Str = _base64Str.substring(0, _len - 2);
                } else {//一个等号说明补了2个0
                    extra_Zero_Count = 2;
                    _base64Str = _base64Str.substring(0, _len - 1);
                }
            }

            var binaryArray = [];
            for (var i = 0, len = _base64Str.length; i < len ; ++i) {
                var c = _base64Str.charAt(i);
                for (var j = 0, size = BASE64_MAPPING.length ; j < size ; ++j) {
                    if (c == BASE64_MAPPING[j]) {
                        var _tmp = _toBinary(j);
                        /*不足6位的补0*/
                        var _tmpLen = _tmp.length;
                        if (6 - _tmpLen > 0) {
                            for (var k = 6 - _tmpLen ; k > 0 ; --k) {
                                _tmp.unshift(0);
                            }
                        }
                        binaryArray = binaryArray.concat(_tmp);
                        break;
                    }
                }
            }

            if (extra_Zero_Count > 0) {
                binaryArray = binaryArray.slice(0, binaryArray.length - extra_Zero_Count);
            }

            var unicode = [];
            var unicodeBinary = [];
            for (var i = 0, len = binaryArray.length ; i < len ;) {
                if (binaryArray[i] == 0) {
                    unicode = unicode.concat(_toDecimal(binaryArray.slice(i, i + 8)));
                    i += 8;
                } else {
                    var sum = 0;
                    while (i < len) {
                        if (binaryArray[i] == 1) {
                            ++sum;
                        } else {
                            break;
                        }
                        ++i;
                    }
                    unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 1, i + 8 - sum));
                    i += 8 - sum;
                    while (sum > 1) {
                        unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 2, i + 8));
                        i += 8;
                        --sum;
                    }
                    unicode = unicode.concat(_toDecimal(unicodeBinary));
                    unicodeBinary = [];
                }
            }
            return unicode;
        }
    };

    window.BASE64 = __BASE64;
})();






$("#menu").click(function () {
    //存在则移除反之则加上

    $("#gncd").toggleClass("Menu");

});



/**
*
*RefreshTable：刷新表单
*/
jQuery.RefreshTable = function (obj) {
    var searchform = $('#' + obj.SearchformID).serialize(); //获取查询表单的内容

    var SubmitFormData = BASE64.encoder(searchform);
    //初始化参数
    var opt = {
        url: obj.Url + "?Action=" + obj.Action,
        data: {
            PageIndex: 1,
            PageSize: 10,
            JsonDataNew: SubmitFormData
        }
    };

    //进入查询方法
    $('#' + obj.RefreshTableID).bootstrapTable('refresh', opt);
}


//Form表单数据提交数据
jQuery.SubmitFormData = function (obj) {
    console.log(obj.FormId);
    var searchform = $('#' + obj.FormId).serialize();//获取到FORM提交的数据
    console.log(searchform);
    var SFData = BASE64.encoder(searchform);//将获取到的数据进行编码 
    console.log(SFData);
    if (SFData.length > 0) {
        $.ajax({
            type: "POST",
            url: obj.Url + "?Action=" + obj.Action,
            data: { "JsonDataNew": SFData },
            async: false,
            success: function (jsonText) {
                obj.jsonText = JSON.parse(jsonText);
            },
            error: function (ex) {
                obj.jsonText = JSON.parse(ex);

            }
        });
    }
    else {
        obj.jsonText = "";
    }
}

//Form表单数据提交数据
jQuery.SubmitFormAndFile = function (obj) {
    var $form = $('#' + obj.FormId);
    var searchform = $form.serialize();//获取到FORM提交的数据
    var SFData = BASE64.encoder(searchform);//将获取到的数据进行编码 

    var __formdata = new FormData();
    __formdata.append("JsonDataNew", SFData);
    $form.find("input[type='file']").each(function (index, element) {
        for (var i = 0; i < element.files.length; ++i) {
            __formdata.append(element.name, element.files[0], element.files[0].name);
        }
    });

    if (SFData.length > 0) {
        $.ajax({
            type: "POST",
            url: obj.Url + "?Action=" + obj.Action,
            data: __formdata,
            async: false,
            processData: false,
            contentType: false,
            success: function (jsonText) {
                obj.jsonText = JSON.parse(jsonText);
            },
            error: function (ex) {
                obj.jsonText = JSON.parse(ex);

            }
        });
    }
    else {
        obj.jsonText = "";
    }
}









//Form表单数据提交数据
jQuery.SubmitPrintData = function (obj) {

    var SFData = BASE64.encoder(obj.Data);//将获取到的数据进行编码 
    //var SFData = BASE64.encoder(searchform);//将获取到的数据进行编码 

    if (SFData.length > 0) {
        $.ajax({
            type: "POST",
            url: obj.Url + "?Action=" + obj.Action,
            data: { "JsonDataNew": SFData },
            async: false,

            success: function (jsonText) {
                obj.jsonText = JSON.parse(jsonText);
            },
            error: function (ex) {
                obj.jsonText = JSON.parse(ex);

            }
        });
    }
    else {
        obj.jsonText = "";
    }
}





//Form表单数据提交数据导出Excel
jQuery.SubmitFormOutExcelData = function (obj) {
    var searchform = $('#' + obj.FormId).serialize();//获取到FORM提交的数据
    var SFData = BASE64.encoder(searchform);//将获取到的数据进行编码 
    window.location.href = obj.Url + "?Action=" + obj.Action + "&JsonDataNew=" + SFData;
}






//Form表单数据提交数据导出Excel
jQuery.PrintData = function (obj) {
    //console.log(obj.Data);
    var SFData = BASE64.encoder(obj.Data);//将获取到的数据进行编码 

    window.location.href = obj.Url + "?Action=" + obj.Action + "&JsonDataNew=" + SFData;
}




jQuery.ShowLoader = function (context) {

    var $loadingToast = $('#loadingToast');

    $("#loadingToastContext").text(context);
    if ($loadingToast.css('display') != 'none') {
        return;
    }
    $loadingToast.show();

};

jQuery.HideLoader = function () {
    var $loadingToast = $('#loadingToast');
    $loadingToast.hide();
};




//直接POST异步提交数据
jQuery.SubmitPostData = function (obj) {

    var BMData = "";
    var SFData = " ";
    try {
        $.each(obj.Data, function (key, val) {
            BMData = BMData + key + "=" + val + "&";
        });
        SFData = BASE64.encoder(BMData.substring(0, BMData.length - 1));
    } catch (ex) {

    }


    if (SFData.length > 0) {
        $.ajax({
            type: "POST",
            url: obj.Url + "?Action=" + obj.Action,
            data: { "JsonDataNew": SFData },
            async: false,
            success: function (jsonText) {
                obj.jsonText = JSON.parse(jsonText);
            },
            error: function (ex) {
                obj.jsonText = JSON.parse(ex);

            }
        });
    }
    else {
        obj.jsonText = "";
    }
}


//验证输入的内容是否为空，如果为空则边框变为红色，再次提交后验证通过后改变颜色
jQuery.checkEmpty = function (CntrolID, Val, msg) {


    try {
        if (Val.length <= 0) {

            $("#" + CntrolID).css({ "border": "1px solid red" });
            $.Alert(msg);
            return true;
        }
        if (Val == null) {

            $("#" + CntrolID).css({ "border": "1px solid red" });
            $.Alert(msg);
            return true;
        }
        //else {

        //    console.log("3");
        //    $("#" + CntrolID).css({ "border": "1px solid #eeeeee" });
        //    return false;
        //}
    } catch (e) {
        console.log(CntrolID);
        $("#" + CntrolID).css({ "border": "1px solid red" });
        $.Alert(msg);
        return true;
    }


}



//提示框
jQuery.Alert = function (Msg) {

    //var html = "<div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>";
    var html = "<div class='modal-dialog' role='document'>";
    html += "<div class='modal-content'>";
    html += "<div class='modal-header'>";
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'></span></button>";
    html += "<h4 class='modal-title' id='myModalLabel' style='font-weight:bold;font-size:16px;'>温馨提醒:</h4>";
    html += "</div>";
    html += "<div class='modal-body'>";
    html += Msg;
    html += "</div>";
    html += "<div class='modal-footer'>";
    html += "<button type='button' class='btn btn-primary' data-dismiss='modal'>知道了</button> ";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    //html += "</div>";
    $('#myModal').html(html);
    $('#myModal').modal()
}




//提示框
jQuery.AlertTitleMsgText = function (Title, Msg, Text) {

    //var html = "<div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>";
    var html = "<div class='modal-dialog' role='document'>";
    html += "<div class='modal-content'>";
    html += "<div class='modal-header'>";
    html += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'></span></button>";
    html += "<h4 class='modal-title' id='myModalLabel' style='font-weight:bold;font-size:16px;'>" + Title + ":</h4>";
    html += "</div>";
    html += "<div class='modal-body'>";
    html += Msg;
    html += "</div>";
    html += "<div class='modal-footer'>";
    html += "<button type='button' class='btn btn-primary' data-dismiss='modal'>" + Text + "</button> ";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    //html += "</div>";
    $('#myModal').html(html);
    $('#myModal').modal()
}





/**
*
*清空 指定范围的内容
*/
jQuery.EmptyForm = function (ID) {
    $('#' + ID)[0].reset();
}


//下拉列表
jQuery.FillSelectOption = function (ID, jsonText) {


    $("#" + ID).html('');
    $("#" + ID).append("<option value=''>请选择</option>");

    $.each(jsonText.data, function (key, val) {
        //BMData = BMData + key + "=" + val + "&";
        //$("#" + ID).append(data);
        // console.log("============1========");

        //  console.log(jsonText.data);
        // console.log(val.ID);
        //  console.log(val.Name);
        $("#" + ID).append("<option value='" + val.ID + "'>" + val.Name + "</option>");
        // console.log("============2========");


    });


    //$("#" + ID).append(data);
}


jQuery.FillSelectOptionName = function (ID, jsonText) {
    // console.log(jsonText);
    $("#" + ID).html('');
    //$("#" + ID).append("<option value=''>请选择</option>");

    $.each(jsonText.data, function (key, val) {
        $("#" + ID).append("<option value='" + val.ID + "'>" + val.Name + "</option>");
    });
}






//下拉列表
jQuery.FillSelectOptionSelectedText = function (ID, jsonText, SelectedText) {


    $("#" + ID).html('');
    $("#" + ID).append("<option value=''>请选择</option>");

    $.each(jsonText.data, function (key, val) {
        //BMData = BMData + key + "=" + val + "&";
        //$("#" + ID).append(data);
        // console.log("============1========");

        //  console.log(jsonText.data);
        // console.log(val.ID);
        //  console.log(val.Name);
        if (SelectedText == val.Name) {
            $("#" + ID).append("<option value='" + val.ID + "' selected>" + val.Name + "</option>");
        }
        else {
            $("#" + ID).append("<option value='" + val.ID + "'>" + val.Name + "</option>");
        }

        // console.log("============2========");


    });


    //$("#" + ID).append(data);
}





//下拉列表
jQuery.FillSelectOptionSelectedVal = function (ID, jsonText, SelectedVal) {


    $("#" + ID).html('');
    $("#" + ID).append("<option value=''>请选择</option>");

    $.each(jsonText.data, function (key, val) {
        //BMData = BMData + key + "=" + val + "&";
        //$("#" + ID).append(data);
        // console.log("============1========");

        //  console.log(jsonText.data);
        // console.log(val.ID);
        //  console.log(val.Name);
        if (SelectedVal == val.ID) {
            $("#" + ID).append("<option value='" + val.ID + "' selected>" + val.Name + "</option>");
        }
        else {
            $("#" + ID).append("<option value='" + val.ID + "'>" + val.Name + "</option>");
        }

        // console.log("============2========");


    });


    //$("#" + ID).append(data);
}








//页面跳转
jQuery.Redirect = function (url) {
    $(location).attr('href', url);
}






/**
*
*清空 指定范围的内容
*/
jQuery.EmptyForm = function (ID) {
    $('#' + ID)[0].reset();
}







//手机号码位数验证
jQuery.checkMobileLen = function (CntrolID, Val, msg) {
    if (Val.length != 11) {
        $("#" + CntrolID).css({ "border": "1px solid red" });
        $.Alert(msg);
        return true;
    }
    else {
        $("#" + CntrolID).css({ "border": "1px solid #eeeeee" });
        return false;
    }
}



//手机号码验证
jQuery.checkMobile = function (CntrolID, Val, msg) {
    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(Val))) {
        $("#" + CntrolID).css({ "border": "1px solid red" });
        $.Alert(msg);
        return true;
    }
    else {
        $("#" + CntrolID).css({ "border": "1px solid #eeeeee" });
        return false;
    }
}

// 字母或数字或字母数字组合
jQuery.checkZiMu_Number = function (CntrolID, Val, msg) {


    if (!(/^[0-9a-zA-Z]+$/.test(Val))) {
        $("#" + CntrolID).css({ "border": "1px solid red" });
        $.Alert(msg);
        return true;
    }
    else {
        $("#" + CntrolID).css({ "border": "1px solid #eeeeee" });
        return false;
    }
}


// 大写字母，小写字母，特殊字符四选三组成的密码强度，且长度在8到30个数之间
jQuery.checkZiMu_Number_ZiFu = function (CntrolID, Val, msg) {//{8,}
    if (!(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{6,30}$/.test(Val))) {
        $("#" + CntrolID).css({ "border": "1px solid red" });
        $.Alert(msg);
        return true;
    }
    else {
        $("#" + CntrolID).css({ "border": "1px solid #eeeeee" });
        return false;
    }
}




























//初始化时间控件 设置默认值
jQuery.SetDatePickerSetVal = function (CntrolID, Val) {

    $("#" + CntrolID).datepicker({
        autoclose: true,
        todayHighlight: true,
        language: "zh-CN",
        format: "yyyy-mm-dd"
    });

    if (Val.length > 0) {
        $('#' + CntrolID).datepicker('setDate', Val);
    }

}

//初始化时间控件
jQuery.SetDatePicker = function (CntrolID) {


    $("#" + CntrolID).datepicker({
        autoclose: true,
        todayHighlight: true,
        language: "zh-CN",
        format: "yyyy-mm-dd"
    });

}












//获取当月第一天
jQuery.NowMonthFirstDay = function () {


    var myDate = new Date();

    var year = myDate.getFullYear();

    var month = myDate.getMonth() + 1;

    if (month < 10) {
        month = "0" + month;
    }

    var firstDay = year + "-" + month + "-" + "01";
    return firstDay;
}


function getNow(s) {
    return s < 10 ? '0' + s : s;
}





//获取当前日期
jQuery.NowMonthNowDay = function () {

    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();

    var now = year + '-' + getNow(month) + "-" + getNow(date);
    return now;
}






//获取当月第一天
jQuery.NowMonthLastDay = function () {


    var myDate = new Date();

    var year = myDate.getFullYear();

    var month = myDate.getMonth() + 1;

    myDate = new Date(year, month, 0);

    var lastDay = +year + "-" + month + "-" + myDate.getDate();

    return lastDay;
}




function IEVersion() {
    if (''.trimEnd === undefined) {
        return 100;
    }
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if (isEdge) {
        return 'edge';//edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1;//不是ie浏览器
    }
}
if (IEVersion() > -1) {
    String.prototype.trimEnd = function (c) {
        if (this.length == 0) return this;

        c = c ? c : ' ';
        var arg_i = c.length;
        var i = this.length - arg_i;

        for (; i >= 0 && this.substring(i, i + arg_i) === c; i -= arg_i);
        return this.substring(0, i + arg_i);
    }
}