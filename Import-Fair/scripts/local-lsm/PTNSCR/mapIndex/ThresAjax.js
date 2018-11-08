function commonAjax(url,dataStr,type,async,callback){
	 var result = "";
       if(!type ||type =="" ||type ==null){type = 'POST';};
       if(async =="" ||async ==null){async = false;};
	    $.ajax({
			        url :eastcom.baseURL+url ,
			        type : type,
			        async : async,
			        dataType : "json",
			        contentType :"application/json",
			        data:dataStr,
			        success : function(data) {
		                  result = data;
		                  if(callback){
		                  	callback(data);
		                  }
			        },
			        error:function () {
			        	eastcom.showMsg("info", "接口请求异常！");   
						setTimeout("clearMsg('one')",3000);
			        }
			});
	     return result;
};
function commonInterface (tableName,type,data,conditions,async,backFun) {
	var dbId = "ipmsdw";
	var strPort = {
		dbId:dbId,
		tableName:tableName,
	}
	var isArray = Object.prototype.toString.call(data).indexOf("Array")>-1;
	strPort[isArray?"datas":"data"] = data;
	if(type == "update"){
		strPort ["conditions"] = conditions;
	}
	var url = "/sml/update/" + type;
	commonAjax(url,JSON.stringify(strPort),"post",async,backFun);
}
//清除提示
function clearMsg(th){
	if(th == "one"){
		var tan = $(".alert-dismissible");
		tan.eq(tan.length-1).remove();
	}
	var allElements = window.top.document.getElementsByTagName('div');
	    for (var i=0; i< allElements.length; i++ ){
	       if (allElements[i].classList[0] == 'alert'&&allElements[i].classList[2]=="alert-dismissible" ) {
	        $(allElements[i]).remove();
	        return;
	       }
   }				
}