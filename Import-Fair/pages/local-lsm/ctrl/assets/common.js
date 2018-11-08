
function crossSafeAjax(configParam){
	//url,method,postStr,header,func
	var url=configParam.url;
	var method=configParam.type;
	var postStr=configParam.data;
	var func=configParam.success;
	var errFunc=configParam.error;
	
	var accept=configParam.dataType==null?"application/json":configParam.dataType;
	var contentType=configParam.contentType==null?"application/json":configParam.contentType;
	
	
	
	var ajax = null;
	
	/** 不同浏览器判定*/
	if (window.ActiveXObject || "ActiveXObject" in window) { 
		try {
			ajax = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {

		try {

			ajax = new ActiveXObject("Microsoft.XMLHTTP");

		} catch (e) {}

		}

	}else if(window.XMLHttpRequest) { 

		ajax = new XMLHttpRequest();

		if (ajax.overrideMimeType) {

			ajax.overrideMimeType("text/xml");

		}

	}

	if (ajax==null) { 

		return null;

	}        

//	if(url.indexOf("?")==-1){
//
//		url+="?random="+new Date().getTime();
//
//	}else{
//
//		url+="&random="+new Date().getTime();
//
//	}

//	url=encodeURI(url); 不在这里进行encode
	ajax.open(method, url, true);


	
	ajax.setRequestHeader('Content-Type',contentType);
	ajax.setRequestHeader('Accept',accept);

	ajax.send(postStr);

	ajax.onreadystatechange = function() {

		if (ajax.readyState == 4 && (ajax.status == 200||ajax.status== 204)) {

		    var result=ajax.responseText;
		    switch(contentType){
		    	case "application/json":
		    		if(result!=""){
		    			try{
		    				result=JSON.parse(result);
		    			}catch(e){
		    				result=null;
		    			}
		    		}else{
		    			result={};
		    		}
		    		break;
		    }
		    if(func){
		   		func.call(this,result);
		    }
		}else if(ajax.readyState == 4){
			if(errFunc){
				errFunc.call(this,ajax,ajax.status,null);
			}
		}
	}; 
	
	return ajax;
};