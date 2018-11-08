/**
 * 大屏工具方法
 * @namespace
 */
var SUtils = SUtils || {};

/**
 * 是否调试模式
 * @type {Boolean}
 * */
SUtils.DEBUG=true;
/**
 * 时间类型枚举
 * @readonly
 * @enum {String}
 */
SUtils.TIME_TYPE={
	MS:"MS",
	MIN:"MIN",
	HOUR:"HOUR",
	DATE:"DATE",
	WEEK:"WEEK",
	MONTH:"MONTH",
	QUATER:"QUATER",
	YEAR:"YEAR"
};


/**
 * 浏览器兼容性处理以及扩展JS基本方法和类型，例如Date.Format
 * @function
 */
SUtils.extendBaseFunction=function(){
	//jQuery.support.cors = true;
	/** 使bind方法兼容低版本浏览器 */
	if(Function.prototype.bind==null){
		Function.prototype.bind= function(obj){
		    var _self = this, args = arguments;
		    return function() {
		    	_self.apply(obj, Array.prototype.slice.call(args, 1));
		    };
		};
	}
	
	
	/** 实现Date的Format方法 */
	Date.prototype.Format = function(fmt)   
	{ //author: meizz   
	  var o = {   
	    "M+" : this.getMonth()+1,                 //月份   
	    "d+" : this.getDate(),                    //日   
	    "h+" : this.getHours(),                   //小时   
	    "m+" : this.getMinutes(),                 //分   
	    "s+" : this.getSeconds(),                 //秒   
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	    "S"  : this.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	};  
	
	
	/**扩展Math Math.uuid() 生成uuid*/
	/*!
	Math.uuid.js (v1.4)
	http://www.broofa.com
	mailto:robert@broofa.com
	 
	Copyright (c) 2010 Robert Kieffer
	Dual licensed under the MIT and GPL licenses.
	*/
	 
	/*
	 * Generate a random uuid.
	 *
	 * USAGE: Math.uuid(length, radix)
	 *   length - the desired number of characters
	 *   radix  - the number of allowable values for each character.
	 *
	 * EXAMPLES:
	 *   // No arguments  - returns RFC4122, version 4 ID
	 *   >>> Math.uuid()
	 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
	 *
	 *   // One argument - returns ID of the specified length
	 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
	 *   "VcydxgltxrVZSTV"
	 *
	 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
	 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
	 *   "01001010"
	 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
	 *   "47473046"
	 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
	 *   "098F4D35"
	 */
	// Private array of chars to use
	  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	 
	  Math.uuid = function (len, radix) {
	    var chars = CHARS, uuid = [], i;
	    radix = radix || chars.length;
	 
	    if (len) {
	      // Compact form
	      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	    } else {
	      // rfc4122, version 4 form
	      var r;
	 
	      // rfc4122 requires these characters
	      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	      uuid[14] = '4';
	 
	      // Fill in random data.  At i==19 set the high bits of clock sequence as
	      // per rfc4122, sec. 4.1.5
	      for (i = 0; i < 36; i++) {
	        if (!uuid[i]) {
	          r = 0 | Math.random()*16;
	          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	        }
	      }
	    }
	 
	    return uuid.join('');
	  };
	 
	  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
	  // by minimizing calls to random()
	  Math.uuidFast = function() {
	    var chars = CHARS, uuid = new Array(36), rnd=0, r;
	    for (var i = 0; i < 36; i++) {
	      if (i==8 || i==13 ||  i==18 || i==23) {
	        uuid[i] = '-';
	      } else if (i==14) {
	        uuid[i] = '4';
	      } else {
	        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
	        r = rnd & 0xf;
	        rnd = rnd >> 4;
	        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	      }
	    }
	    return uuid.join('');
	  };
	 
	  // A more compact, but less performant, RFC4122v4 solution:
	  Math.uuidCompact = function() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	      return v.toString(16);
	    });
	  };
};

/**
 * 用XMLHttpRequest 来解决ajax的跨域问题
 * @function
 * @param {Object} configParam 参数类同jquery.ajax的配置参数
 * @returns {Object} IE内核返回ActiveXObject;非IE内核返回XMLHttpRequest
 * @example
 * {
 *		type : 'POST',
 *		async : false,
 *		dataType : "application/json",
 *		contentType : "application/json",
 *		processData : false,
 *		url : G_URLCONFIG.baseUrl + '/services/ws/rest/query/report_query/20006/query',
 *		data : '{"rowPerPage":100}', //字符串
 *		success : function(data) {
 *		},
 *		error : function(XMLHttpRequest, textStatus, errorThrown){
 *		}
 * }
 */
SUtils.crossSafeAjax=function(configParam){
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
	ajax.setRequestHeader('If-Modified-Since', '0');


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
//	原生jquery的ajax
//	$.ajax({
//  		type : 'POST',
//  		async : false,
//  		dataType : "jsonp",
//  		contentType : "json",
//  		processData : false,
//  		url : G_URLCONFIG.baseUrl + '/services/ws/rest/query/report_query/20006/query',
//  		data : '{"rowPerPage":100}',
//  		success : function(data) {
//  			alert(data);
//  		}
//	});

};

/**
 * 获取从当前时间开始推算的差值时间
 * @function
 * @param {Number} [diff] 差值
 * @param {SUtils.TIME_TYPE} [type] 时间类型
 * @param {String} [format] 格式化字符串 yyyy-MM-dd hh:mm:ss
 * @returns {Date|String} 计算后的时间
 */
SUtils.getDiffDateTimeFromNow=function(diff,type,format){
	diff=diff==null?0:diff;
	type=type==null?SUtils.TIME_TYPE.MIN:type;
	
	var date=new Date();
	
	if(diff!=0){
		var time=date.getTime();
		var deltaMS=0;
		switch(type){
			case SUtils.TIME_TYPE.MS:
				deltaMS=diff;
				break;
			case SUtils.TIME_TYPE.SEC:
				deltaMS=diff*1000;
				break;
			case SUtils.TIME_TYPE.MIN:
				deltaMS=diff*60*1000;
				break;
			case SUtils.TIME_TYPE.HOUR:
				deltaMS=diff*60*60*1000;
				break;
			case SUtils.TIME_TYPE.DATE:
				deltaMS=diff*24*60*60*1000;
				break;
			case SUtils.TIME_TYPE.MONTH:
				date.setMonth(date.getMonth()+diff);
				if(format==null){
					return date;
				}else{
					return date.Format(format);
				}
				break;
			case SUtils.TIME_TYPE.YEAR:
				date.setFullYear(date.getFullYear()+diff);
				if(format==null){
					return date;
				}else{
					return date.Format(format);
				}
				break;
		}
		time+=deltaMS;
		date=new Date(time);
	}
	
	
	if(format==null){
		return date;
	}else{
		return date.Format(format);
	}
};

/**
 * 获取从当前时间
 * @function
 * @param {String} [format] 格式化字符串 yyyy-MM-dd hh:mm:ss
 * @returns {Date|String} 当前时间
 */
SUtils.getNowDateTime=function(format){
	var date=new Date();
	if(format==null){
		return date;
	}else{
		return date.Format(format);
	}
};


/**
 * 按5分钟格式化时间
 * @function
 * @param {String} time 当前时间 格式 yyyy-MM-dd hh:mm:ss
 * @param {Boolean} stepUp 是否要向后推5分钟
 * @returns {String} 当前时间
 */
SUtils.getHourAndMinuteFive=function(time,stepUp){
	var hour=time.substring(11,13);
	var minute=time.substring(14,16);
	var num=Number(minute);
	var intNum=Math.floor(num/5);
	if(stepUp){
		intNum+=1;
	}
	intNum*=5;
	var finalMin="";
	
	if(intNum<10){
		finalMin="0"+intNum;
	}else if(intNum>59){
		finalMin="00";
		var h=Number(hour)+1;
		if(h>23){
			hour="00";
		}else if(h<10){
			hour="0"+h;
		}else{
			hour=""+h;
		}
	}else{
		finalMin=""+intNum;
	}
	num=num/5*5;
	return hour+":"+finalMin;
};
 
/**
 * 记录日志信息
 * @function
 * @param {String} [format] 格式化字符串 yyyy-MM-dd hh:mm:ss
 * @returns {Date|String} 当前时间
 */
SUtils.log=function(infoStr){
	if(SUtils.DEBUG){
		console.log(infoStr);
	}
};

/**
 * 获取业务小类图标
 * @function
 * @param {String} appName 业务小类名称
 * @returns {String} 图片名称
 */
SUtils.getAppIconPath=function(appName){
	var iconName="";
	switch(appName){
		case "新浪微博":
			iconName="001.png";
			break;
		case "腾讯视频":
			iconName="002.png";
			break;
		case "Chrome浏览器":
			iconName="003.png";
			break;
		case "大众点评":
			iconName="004.png";
			break;
		case "同花顺":
			iconName="005.png";
			break;
		case "大智慧":
			iconName="006.png";
			break;
		case "QQ":
			iconName="007.png";
			break;
		case "京东":
			iconName="008.png";
			break;
		case "墨迹天气":
			iconName="009.png";
			break;
		case "飞信":
			iconName="010.png";
			break;
		case "QQ浏览器":
			iconName="011.png";
			break;
		case "百度地图":
			iconName="012.png";
			break;
		case "淘宝":
			iconName="013.png";
			break;
		case "微信":
			iconName="014.png";
			break;
		case "支付宝":
			iconName="015.png";
			break;
		case "SAFARI浏览器":
			iconName="016.png";
			break;
		case "移动掌上营业厅":
			iconName="017.png";
			break;
//		case "UC浏览器":
		case "UC网站":
			iconName="018.png";
			break;
		case "QQ音乐":
			iconName="019.png";
			break;
		case "阿基米德":
			iconName="020.png";
			break;
		case "爱奇艺":
			iconName="021.png";
			break;
		case "嘀嘀打车":
			iconName="022.png";
			break;
		case "澎湃新闻":
			iconName="023.png";
			break;
		case "AppStore":
			iconName="024.png";
			break;
		case "腾讯新闻":
			iconName="025.png";
			break;
		case "56视频":
			iconName="026.png";
			break;
		case "91助手":
			iconName="027.png";
			break;
		case "163网盘":
			iconName="028.png";
			break;
		case "360手机助手":
			iconName="029.png";
			break;
		case "AOL AIM":
			iconName="030.png";
			break;
		case "CNTV":
			iconName="031.png";
			break;
		case "HO米":
			iconName="032.png";
			break;
		case "ICQ":
			iconName="033.png";
			break;
		case "IKu":
			iconName="034.png";
			break;
		case "Jego":
			iconName="035.png";
			break;
		case "Mobile Market":
			iconName="036.png";
			break;
		case "NetChat":
			iconName="037.png";
			break;
		case "PP助手":
			iconName="038.png";
			break;
		case "QQLive":
			iconName="039.png";
			break;
		case "QQ空间":
			iconName="040.png";
			break;
		case "应用宝":
			iconName="041.png";
			break;
		case "SAMSUNG应用商店":
			iconName="042.png";
			break;
		case "WhatsApp":
			iconName="043.png";
			break;
		case "ZOL应用中心":
			iconName="044.png";
			break;
		case "安智市场":
			iconName="045.png";
			break;
		case "安卓市场":
			iconName="046.png";
			break;
		case "百度":
			iconName="047.png";
			break;
		case "百度Hi":
			iconName="048.png";
			break;
		case "百度电视剧":
			iconName="049.png";
			break;
		case "百度手机浏览器":
			iconName="050.png";
			break;
		case "百度搜索":
			iconName="051.png";
			break;
		case "电影网":
			iconName="052.png";
			break;
		case "东方财富网":
			iconName="053.png";
			break;
		case "都秀":
			iconName="054.png";
			break;
		case "番茄社区":
			iconName="055.png";
			break;
		case "凤凰网":
			iconName="056.png";
			break;
		case "好豆菜谱":
			iconName="057.png";
			break;
		case "汇天地手机应用商店":
			iconName="058.png";
			break;
		case "金鹰网":
			iconName="059.png";
			break;
		case "酷6网":
			iconName="060.png";
			break;
		case "乐视网":
			iconName="061.png";
			break;
		case "联通掌上视频":
			iconName="062.png";
			break;
		case "芒果TV":
			iconName="063.png";
			break;
		case "米聊":
			iconName="064.png";
			break;
		case "陌陌":
			iconName="065.png";
			break;
		case "啪啪":
			iconName="066.png";
			break;
		case "iCloud云服务":
			iconName="067.png";
			break;
		case "人人桌面":
			iconName="068.png";
			break;
		case "手机电视Dopool":
			iconName="069.png";
			break;
		case "搜狐视频":
			iconName="070.png";
			break;
		case "搜狐网":
			iconName="071.png";
			break;
		case "苏宁应用商店":
			iconName="072.png";
			break;
		case "天翼Live":
			iconName="073.png";
			break;
		case "同步推":
			iconName="074.png";
			break;
		case "土豆网":
			iconName="075.png";
			break;
		case "豌豆荚":
			iconName="076.png";
			break;
		case "网易网":
			iconName="077.png";
			break;
		case "网易新闻":
			iconName="078.png";
			break;
		case "沃商店":
			iconName="079.png";
			break;
		case "小米应用商店":
			iconName="080.png";
			break;
		case "携程":
			iconName="081.png";
			break;
		case "新浪视频":
			iconName="082.png";
			break;
		case "新浪网":
			iconName="083.png";
			break;
		case "星光时代会员客户端":
			iconName="084.png";
			break;
		case "雅虎通":
			iconName="085.png";
			break;
		case "和视频":
			iconName="086.png";
			break;
		case "应用帮":
			iconName="087.png";
			break;
		case "优度直播":
			iconName="088.png";
			break;
		case "优酷":
			iconName="089.png";
			break;
		case "有你":
			iconName="090.png";
			break;
		case "智汇云":
			iconName="091.png";
			break;
		case "MSN":
			iconName="092.png";
			break;
		case "阿里旺旺":
			iconName="093.png";
			break;
		case "天猫":
			iconName="094.png";
			break;
//		case "微信抢红包":
//			iconName="095.png";
//			break;
		case "360影视大全":
			iconName="096.png";
			break;
		case "金鹰网（jinying）":
			iconName="097.png";
			break;
		case "斗鱼":
			iconName="098.png";
			break;
		case "美图秀秀":
			iconName="099.png";
			break;
		case "高德地图":
			iconName="100.png";
			break;
		case "当当":
			iconName="101.png";
			break;
		case "国美在线":
			iconName="102.png";
			break;
		case "亚马逊":
			iconName="103.png";
			break;
		case "1号店":
			iconName="104.png";
			break;
		case "微信抢红包":
			iconName="105.png";
			break;
		case "支付宝红包":
			iconName="106.png";
			break;
			
		case "Gif快手":
			iconName="107.png";
			break;
		case "秒拍":
			iconName="108.png";
			break;
		case "魅族":
			iconName="109.png";
			break;
		case "苹果官网":
			iconName="110.png";
			break;
		case "新浪新闻":
			iconName="111.png";
			break;
		case "微软官网":
			iconName="112.png";
			break;
		case "浦发银行":
			iconName="113.png";
			break;
		case "百度输入法":
			iconName="114.png";
			break;
		case "MM商城":
			iconName="115.png";
			break;
		case "360安全卫士":
			iconName="116.png";
			break;
		case "华为应用市场":
			iconName="117.png";
			break;
		case "摩拜单车":
			iconName="118.png";
			break;
		case "熊猫TV":
			iconName="119.png";
			break;
		case "腾讯地图":
            iconName="120.png";
            break;
		case "米柚":
			iconName="121.png";
			break;
		case "360手机卫士":
			iconName="122.png";
			break;
		case "中国移动":
			iconName="123.png";
			break;
		case "QQ邮箱":
			iconName="124.png";
			break;
		case "哔哩哔哩":
			iconName="125.png";
			break;
		case "百度视频":
			iconName="126.png";
			break;
		case "凤凰视频":
			iconName="127.png";
			break;
		case "开迅视频":
			iconName="128.png";
			break;
		case "咪咕视频":
			iconName="129.png";
			break;
		case "苏宁易购":
			iconName="130.png";
			break;
		case "银联在线":
			iconName="131.png";
			break;
		case "Apple官网":
			iconName="132.png";
			break;
		case "Facebook":
			iconName="133.png";
			break;
		case "Twitter":
			iconName="134.png";
			break;
		default:
			iconName="000.png";
			break;
	}
	
	return iconName;
};

/**
 * 娄耀佳的接口 根据指标名称获取单位和换算因子
 * @function
 * @param {String} appName 业务小类名称
 * @param {Boolean} down 速率和流量指标降一级 GB->MB Mbps->Kbps
 * @returns {Object} {unit:"%",fact:100}
 */
SUtils.getKpiInfo=function(kpiId,down){
	if(kpiId.indexOf("速率")!=-1){
		if(down){
			return {percise:2,unit:"Kbps",fact:1};
		}else{
			return {percise:2,unit:"Mbps",fact:1/LSMConsts.byteDivider};
		}
		
	}else if(kpiId.indexOf("率")!=-1){
		return {percise:2,unit:"%",fact:100};
	}else if(kpiId.indexOf("流量")!=-1){
		if(down){
			return {percise:2,unit:"MB",fact:1/LSMConsts.byteDivider};
		}else{
			return {percise:2,unit:"GB",fact:1/LSMConsts.byteDivider/LSMConsts.byteDivider};
		}
	}else{
		return {percise:0,unit:"",fact:1};
	}
};

/**
 * 清除jqGrid的数据
 * @function
 */
SUtils.clearGrid=function(grid){
	var len = grid.jqGrid("getGridParam","records");
	while(len>0){
		grid.jqGrid("delRowData", len); 
		len--;
	}
};
/**
 * 大屏文件配置 视频与图片区分
 */
SUtils.getFileNode=function(fileName,fileWidth,fileHeight,autostart){
	var node='';
	var fileUrl=LSMConsts.serviceUrl+"/upload/"+fileName;
	if(fileName.indexOf(".mp4")!=-1){
		node='<embed src="'+fileUrl+'" ShowControls="0" wmode="transparent"  windowlessvideo="true" autostart="'+autostart+'" loop="true" width="'+fileWidth+'" height="'+fileHeight+'" />';
	}else{
		node='<img  src="'+fileUrl+'" width="'+fileWidth+'" height="'+fileHeight+'" />';
	}
	return node;
};

/**
 * 从value反查map的key
 * @function
 * @param {Object} map
 * @param {String} value 
 * @returns {String} key
 * 
 */
SUtils.getMapKey=function(map,value){
	for(var key in map){
		if(map[key]==value){
			return key;
		}
	}
};

/**
 * 初始化场景所需要的参数 LSMConsts
 * 保障区域名称
 * 主热点 场内 场外
 * 阈值 
 * @function
 * 
 */
SUtils.initCommonScene=function(callBack){
	var dm=LSMScreen.DataManager.getInstance();
	//指标配置
	dm.getConfigData(null,function(configResult){
//		var configKpiArr=LSMConsts.kpiChooserSource;
		var configKpiArr=JSON.parse(configResult.areaKpiConfig.content);
		var customMessage=configResult.customMessage.content;
		LSMConsts.customMessage=customMessage;
		
		for(var kpiI=0;kpiI<configKpiArr.length;kpiI++){
			configKpiArr[kpiI].generateId=kpiI;
		}
		LSMConsts.kpiChooserSource=configKpiArr;
		//保障区域列表
		dm.getBaseHotspotsList(null,function(list){
			var areas=[];
			for(var i=0;i<list.length;i++){
				if(list[i].hot_name.indexOf("迪士尼")==-1//除外迪士尼
						&&list[i].id!="20170314140128"//屏蔽高铁
						){
					areas.push(list[i]);
				}
			}
			LSMConsts.allAreas=areas;
			//默认保障区域
			dm.getBaseHotspots({},function(result){
				var content= JSON.parse(result[0].content);
				var contrastTime=content.contrastTime;
				if(contrastTime!=null&&contrastTime.length>=8){
					var formatStr=contrastTime.substring(0,4)+"-"+contrastTime.substring(4,6)+"-"+contrastTime.substring(6,8);
					LSMScreen.DataManager.formatSpecialCompare0=formatStr+" 00:00:00";
					LSMScreen.DataManager.formatSpecialCompare=formatStr+" hh:mm:ss";
					var str =formatStr+" 00:00:00";
					str = str.replace(/-/g,"/");
					var date = new Date(str);
					var today=new Date();
					today.setHours(0, 0, 0, 0);
					
					var delta=today.getTime()-date.getTime();
					var lag=delta/1000/60;
					LSMScreen.DataManager.specificTbTime=lag;
				}
				
				LSMConsts.lng=content.lon;
				LSMConsts.lat=content.lat;
				LSMConsts.area=content.supportName;
				LSMConsts.areaId=content.hotCellNow;
				LSMConsts.hotspots=[content.hotCellNowName,content.hotCellInName,content.hotCellOutName];
				
				$("#mainTitle").text(content.vice_supportName.replace("--",""));
				//告警阈值
				dm.getAlarmPolicy(null,function(thresholds){
					var thresholsMap={};
					var cellThresholdsMap={};
					for(var i=0;i<thresholds.length;i++){
						var record=thresholds[i];
						if(record.alarm_fucn_switch=="开"&&record.alam_mode=="静态门限"){
							if(record.stat_level=="重要区域"){
								thresholsMap[record.indicator_name]=record;
							}else if(record.stat_level=="小区"){
								cellThresholdsMap[record.indicator_name]=record;
							}
						}
					}
					LSMConsts.cellThresholdsMap=cellThresholdsMap;
					LSMConsts.thresholsMap=thresholsMap;
					if(callBack!=null){
						callBack();
					}
				});
			});
		});
	});
};

/**
 * 初始化场景所需要的参数 LSMConsts 迪士尼
 * 保障区域名称
 * 主热点 场内 场外
 * 阈值 
 * @function
 * 
 */
SUtils.initScene=function(callBack){
	var dm=LSMScreen.DataManager.getInstance();
	//指标配置
	dm.getConfigData(null,function(configResult){
//		var configKpiArr=LSMConsts.kpiChooserSource;
		var configKpiArr=JSON.parse(configResult.areaKpiConfig.content);  
		for(var kpiI=0;kpiI<configKpiArr.length;kpiI++){
			configKpiArr[kpiI].generateId=kpiI;
		}
		
		LSMConsts.kpiChooserSource=configKpiArr;
		//保障区域列表
		dm.getBaseHotspotsList(null,function(list){
			LSMConsts.allAreas=list;
			var areaId="";
			for(var i=0;i<list.length;i++){
				if(list[i].hot_name.indexOf("迪士尼")!=-1){
					areaId=list[i].id;
					break;
				}
			}
			//默认保障区域
			dm.getBaseHotspots({isDefault:false,id:areaId},function(result){
				var content= JSON.parse(result[0].content);
				LSMConsts.lng=content.lon;
				LSMConsts.lat=content.lat;
				LSMConsts.area=content.supportName;
				LSMConsts.areaId=content.hotCellNow;
				LSMConsts.hotspots=[content.hotCellNowName,content.hotCellInName,content.hotCellOutName];
//				LSMConsts.area="迪士尼园区";
//				LSMConsts.hotspots=["迪士尼","核心区域","周边区域"];
				//告警阈值
				dm.getAlarmPolicy(null,function(thresholds){
					var thresholsMap={};
					var cellThresholdsMap={};
					for(var i=0;i<thresholds.length;i++){
						var record=thresholds[i];
						if(record.alarm_fucn_switch=="开"&&record.alam_mode=="静态门限"){
							if(record.stat_level=="重要区域"){
								thresholsMap[record.indicator_name]=record;
							}else if(record.stat_level=="小区"){
								cellThresholdsMap[record.indicator_name]=record;
							}
						}
					}
					LSMConsts.cellThresholdsMap=cellThresholdsMap;
					LSMConsts.thresholsMap=thresholsMap;
					if(callBack!=null){
						callBack();
					}
				});
			});
		});
	});
};
SUtils.updeteBaseHotspotsById=function(id,callback,hotspotName){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getBaseHotspots({id:id,isDefault:false},function(result){
		var content= {};
		try{
			content= JSON.parse(result[0].content);
		}catch(e){
			content= {
				lon:0,
				lat:0,
				supportName:'区域实时保障',
				vice_supportName:'区域实时保障',
				hotCellNow:id,
				hotCellNowName:hotspotName,
				hotCellInName:hotspotName,
				hotCellOutName:hotspotName
			};
		}
		LSMConsts.lng=content.lon;
		LSMConsts.lat=content.lat;
		LSMConsts.area=content.supportName;
		LSMConsts.areaId=content.hotCellNow;
		if(content.vice_supportName){
			$("#mainTitle").text(content.vice_supportName.replace("--",""));
		}else{
			$("#mainTitle").text(content.supportName.replace("--",""));
		}
		LSMConsts.hotspots=[content.hotCellNowName,content.hotCellInName,content.hotCellOutName];
		if(callback!=null){
			callback();
		}
	});
};
SUtils.updeteBaseHotspotsByName=function(name,callback){
	var arr=LSMConsts.allAreas;
	for(var i=0;i<arr.length;i++){
		var record=arr[i];
		if(name==record.name){
			SUtils.updeteBaseHotspotsById(name,callback);
			break;
		}
	}
};
//与娄瑶佳接口的原始值比较
SUtils.getAlarmLevelByThresholdMap=function(kpiId,kpiValue,thresholsMap){
	if(thresholsMap==null) thresholsMap=LSMConsts.thresholsMap;
	var lv=0;
	var threshold=thresholsMap[kpiId];
	kpiValue=parseFloat(kpiValue);
	if(threshold!=null){
		var unit=threshold.unit;
		var level_3_threshold_left_value=SUtils.formatThresholdValue(threshold.level_3_threshold_left_value,unit);
		var level_3_threshold_right_value=SUtils.formatThresholdValue(threshold.level_3_threshold_right_value,unit);
		var level_2_threshold_left_value=SUtils.formatThresholdValue(threshold.level_2_threshold_left_value,unit);
		var level_2_threshold_right_value=SUtils.formatThresholdValue(threshold.level_2_threshold_right_value,unit);
		var level_1_threshold_left_value=SUtils.formatThresholdValue(threshold.level_1_threshold_left_value,unit);
		var level_1_threshold_right_value=SUtils.formatThresholdValue(threshold.level_1_threshold_right_value,unit);
		
		if(kpiValue<level_3_threshold_right_value&&kpiValue>=level_3_threshold_left_value){
			lv=3;
		}else if(kpiValue<level_2_threshold_right_value&&kpiValue>=level_2_threshold_left_value){
			lv=2;
		}else if(kpiValue<level_1_threshold_right_value&&kpiValue>=level_1_threshold_left_value){
			lv=1;
		}
	}
	
	return lv;
};
//与娄瑶佳接口的转换后的值比较
SUtils.getAlarmLevelByThresholdMapConverted=function(kpiId,kpiValue,thresholsMap){
	if(thresholsMap==null) thresholsMap=LSMConsts.thresholsMap;
	var lv=0;
	var threshold=thresholsMap[kpiId];
	kpiValue=parseFloat(kpiValue);
	if(threshold!=null){
		var unit=threshold.unit;
		var level_3_threshold_left_value=SUtils.formatThresholdValueForCompare(threshold.level_3_threshold_left_value,unit);
		var level_3_threshold_right_value=SUtils.formatThresholdValueForCompare(threshold.level_3_threshold_right_value,unit);
		var level_2_threshold_left_value=SUtils.formatThresholdValueForCompare(threshold.level_2_threshold_left_value,unit);
		var level_2_threshold_right_value=SUtils.formatThresholdValueForCompare(threshold.level_2_threshold_right_value,unit);
		var level_1_threshold_left_value=SUtils.formatThresholdValueForCompare(threshold.level_1_threshold_left_value,unit);
		var level_1_threshold_right_value=SUtils.formatThresholdValueForCompare(threshold.level_1_threshold_right_value,unit);
		
		if(kpiValue<level_3_threshold_right_value&&kpiValue>=level_3_threshold_left_value){
			lv=3;
		}else if(kpiValue<level_2_threshold_right_value&&kpiValue>=level_2_threshold_left_value){
			lv=2;
		}else if(kpiValue<level_1_threshold_right_value&&kpiValue>=level_1_threshold_left_value){
			lv=1;
		}
	}
	
	return lv;
};
//将阈值格式化成原始的单位值（娄瑶佳接口）
SUtils.formatThresholdValue=function(value,unit){
	var result=0;
	if(value==null){
		result=Number.POSITIVE_INFINITY;
	}else{
		value=value.replace(unit,"");
		if(value=="∞"){
			result=Number.POSITIVE_INFINITY;
		}else if(value=="-∞"){
			result=Number.NEGATIVE_INFINITY;
		}else if(unit=="%"){
			result=value/100;
		}else{
			result=value;
		}
	}
	return parseFloat(result);
};
//将阈值格式化成转换后的单位值（娄瑶佳接口）
SUtils.formatThresholdValueForCompare=function(value,unit){
	var result=0;
	if(value==null){
		result=Number.POSITIVE_INFINITY;
	}else{
		value=value.replace(unit,"");
		if(value=="∞"){
			result=Number.POSITIVE_INFINITY;
		}else if(value=="-∞"){
			result=Number.NEGATIVE_INFINITY;
		}else if(unit=="%"){
			result=value;
		}else if(unit=="kbps"){
			result=value/LSMConsts.byteDivider;
		}else{
			result=value;
		}
	}
	return parseFloat(result);
};

SUtils.convertRecordMetro=function(record){
	//娄瑶佳接口数据换算
	var obj={};
	for(var key in record){
		try{
			if(key.indexOf("速率")!=-1){
				obj[key]=(record[key]).toFixed(0);
			}else if(key.indexOf("话务量")!=-1){
				obj[key]=(record[key]).toFixed(0);
			}else if(key.indexOf("率")!=-1){
				obj[key]=(record[key]*100).toFixed(2);
			}else if(key.indexOf("流量比")!=-1){
				obj[key]=(record[key]*100).toFixed(2);
			}else if(key.indexOf("流量")!=-1){
				obj[key]=(record[key]/LSMConsts.byteDivider).toFixed(0);
			}else if(key.indexOf("比例")!=-1){
				obj[key]=(record[key]*100).toFixed(2);
			}else if(key.indexOf("时延")!=-1){
				obj[key]=(record[key]).toFixed(0);
			}else if(key.indexOf("人均")!=-1){
				obj[key]=(record[key]).toFixed(2);
			}else{
				obj[key]=record[key];
			}
		}catch(e){
			obj[key]=record[key];
			console.log(key+":"+e.message);
		}
	}
	return obj;
};

SUtils.convertRecordMetroAvg=function(record){
	//娄瑶佳接口数据换算
	var obj={};
	for(var key in record){
		try{
			if(key.indexOf("速率")!=-1){
				obj[key]=(record[key]).toFixed(2);
			}else if(key.indexOf("率")!=-1){
				obj[key]=(record[key]*100).toFixed(2);
			}else if(key.indexOf("流量比")!=-1){
				obj[key]=(record[key]*100).toFixed(2);
			}else if(key.indexOf("流量")!=-1){
				obj[key]=(record[key]/LSMConsts.byteDivider/LSMConsts.totalMetroStations).toFixed(2);
			}else if(key.indexOf("比例")!=-1){
				obj[key]=(record[key]*100).toFixed(2);
			}else if(key.indexOf("时延")!=-1){
				obj[key]=(record[key]).toFixed(0);
			}else if(key.indexOf("人均")!=-1){
				obj[key]=(record[key]).toFixed(2);
			}else if(key.indexOf("用户数")!=-1&&key.indexOf("比")==-1){
				obj[key]=(record[key]/LSMConsts.totalMetroStations).toFixed(0);
			}else{
				obj[key]=record[key];
			}
		}catch(e){
			obj[key]=record[key];
			console.log(key+":"+e.message);
		}
	}
	return obj;
};
///////////////////////////微信功能START///////////
//根据质差规则，返回质差指标列表
SUtils.getDegradationKpisList=function (record,thresholdConsts,noConvert){
	var list=[];
	var thresholds=[];
	if(thresholdConsts==null){
		thresholds=WXCONSTS.degradationHotspotThresholds;
	}else{
		thresholds=thresholdConsts;
	}
	for(var i=0;i<thresholds.length;i++){
		var threshold=thresholds[i];
		var exp=threshold.exp;
		var infos=threshold.kpiInfos;
		for(var key in record){
			var value=null;
			if(noConvert==true){
				value=record[key];
			}else{
				value=SUtils.getConvertedKpiValue(record,key);
			}
			var reg=new RegExp(key,'gim')
			exp=exp.replace(reg,value);
		}
		try{
			if(eval(exp)==true){
				for(var j=0;j<infos.length;j++){
					var info=infos[j];
					list.push({
						showExp:threshold.showExp,
						key:info.key,
						name:info.name,
						value:SUtils.getConvertedKpiValue(record,info.key),
						unit:info.unit,
						source:info.source,
						period:info.period
						});
				}
			} 
		}catch(e){
//			console.log(e.message);
		}
		
	}
	return list;
};
SUtils.getConvertedKpiValue=function (record,key){
	var value='';
	if(key=='VOLTEeSRVCC成功率'&&record[key]==0){
		value=100;
	}else if(key.indexOf('速率')!=-1){
		value=(record[key]*1).toFixed(0);
	}else if(key.indexOf('率')!=-1){
		value=(record[key]*100).toFixed(2);
	}else if(key.indexOf('流量')!=-1){
		value=(record[key]/1024).toFixed(2);
	}else if(key.indexOf('时延')!=-1){
		value=(record[key]*1).toFixed(0); 
	}else{
		value=record[key]*1;
	}
	return value;
}
SUtils.getConvertedKpiValueType2=function (record,key){
	var value='';
	if(key=='VOLTEeSRVCC成功率'&&record[key]<0.8){
		value=(96+3*Math.random()).toFixed(2);
	}else if(key=='HTTP下行速率500k'&&record[key]<2048){
		value=(3+2*Math.random()).toFixed(2);
	}else if(key.indexOf('速率')!=-1){
		value=(record[key]*1/1024).toFixed(2);
	}else if(key.indexOf('率')!=-1){
		value=(record[key]*100).toFixed(2);
	}else if(key.indexOf('流量')!=-1){
		value=(record[key]/1024).toFixed(2);
	}else if(key.indexOf('时延')!=-1){
		value=(record[key]*1).toFixed(0); 
	}else{
		value=record[key]*1;
	}
	return value;
}
/////////////微信功能END////////////////////////////
//无分页表格导出
SUtils.exportJQGrid=function(grid,title,allData){//allData 表格数据,如不提供直接从grid内获取
	var params=grid.getGridParam();
	
	var datasArr=[];
	var propertys=[];
	var headers=[];
	
	var colModel=params.colModel;
	var colNames=params.colNames;
	var i=0;
	var j=0;
	
	for(i=0;i<colModel.length;i++){
		var model=colModel[i];
		var colName=colNames[i];
		if(model.hidden!=true){
			if(colName.indexOf("</")!=-1){
				colName=$('<span>'+colName+'</span>').text();
			}
			headers.push(colName);
			propertys.push(model.index);
		}
	}
	
	if(allData==null){
		i=1;
		var row=grid.getRowData(i);
		while(row!=null){
			var tmp=[];
			var isAllNull=true;
			for(j=0;j<propertys.length;j++){
				if(row[propertys[j]]!=null){
					isAllNull=false;
				}
				var value=row[propertys[j]];
				if(value==null||value==""){
					value="-";
				}
				var htmlTitle=$(value).attr("title");
				var exportByText=$(value).attr("exportByText");
				var exportByAttrText=$(value).attr("exportByAttrText");
				if(exportByAttrText=="true"){
					value=$(value).attr('text');
				}else if(exportByText=="true"){
					value=$('<span>'+value+'</span>').text();
				}else if(htmlTitle!=undefined){
					value=htmlTitle;
				}else if(value.indexOf("</")!=-1){
					value=value.split("</")[0];
					value=value.substring(value.lastIndexOf(">")+1,value.length);
				}
				
				tmp.push(value);
			}
			if(isAllNull){
				break;
			}
			datasArr.push(tmp);
			i++;
			row=grid.getRowData(i);
		}
	}else{
		for(i=0;i<allData.length;i++){
			var tmp=[];
			var record=allData[i];
			for(j=0;j<propertys.length;j++){
				var value=record[propertys[j]];
				tmp.push(value);
			}
			datasArr.push(tmp);
		}
	}
	
	
	var exportParam = {
        "type": "xls",
        "title": title,
        "propertys":propertys,             //["TIMEID", "USER_NAME"],
        "heads": headers,                    //["时间", "客户名称"],
        "ifId": "",
        "datas": datasArr,
        "params": {}
    };
	
	var exportParams = JSON.stringify(exportParam);
    var exportURL = LSMConsts.G_URLCONFIG.urlInasSml + "/export/exportOriginal";

    var myForm = document.createElement("form");
    myForm.method = "post";
    myForm.target = "_blank";
    myForm.acceptCharset = "utf-8";
    myForm.action = exportURL;
    document.body.appendChild(myForm);
    var newElement = document.createElement("input");
    newElement.setAttribute("name", "params");
    newElement.setAttribute("type", "hidden");
    newElement.setAttribute("value", exportParams);
    myForm.appendChild(newElement);
    myForm.submit();
    document.body.removeChild(myForm);
};
SUtils.loadXML=function(xmlString){
	var xmlDoc=null;
	//判断浏览器的类型
	//支持IE浏览器
	if(!window.DOMParser && window.ActiveXObject){ //window.DOMParser 判断是否是非ie浏览器
	var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
	for(var i=0;i<xmlDomVersions.length;i++){
	try{
	xmlDoc = new ActiveXObject(xmlDomVersions[i]);
	xmlDoc.async = false;
	xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
	break;
	}catch(e){
	}
	}
	}
	//支持Mozilla浏览器
	else if(window.DOMParser && document.implementation && document.implementation.createDocument){
	try{
	/* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
	* 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
	* parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
	* 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
	*/
	domParser = new DOMParser();
	xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
	}catch(e){
	}
	}
	else{
	return null;
	}
	return xmlDoc;

};
//获取假数据
SUtils.getFakeRecordNbiot=function(date){
	var hour=date.getHours();
	var min=date.getMinutes();
	var min15=Math.floor(min/15)*15;
	var hourStr=hour;
	min15=min15<10?("0"+min15):min15;
	var timeKey=hourStr+":"+min15;
	var result={};
	for(var i=0;i<FAKE_NBIOT.length;i++){
		var record=FAKE_NBIOT[i];
		if(record.time==timeKey){
			result=record;
			break;
		}
	}
	return result;
};
SUtils.getFakeRecord=function(date,isHour){
	var hour=date.getHours();
	var min=date.getMinutes();
	var min5=Math.floor(min/5)*5;
	var hourStr=hour<10?("0"+hour):hour;
	if(isHour){
		min5="0";
	}
	var result={};
	for(var i=0;i<FAKE_DATA.length;i++){
		var record=FAKE_DATA[i];
		if(record["时段"]==hourStr&&record["分钟"]==min5){
			result=record;
			break;
		}
	}
	return result;
};

SUtils.getFakeTrend=function(startdate,enddate,isHour){
	var hour_s=startdate.getHours();
	var min_s=startdate.getMinutes();
	var min5_s=Math.floor(min_s/5)*5;
	var hourStr_s=hour_s<10?("0"+hour_s):hour_s;
	
	var hour_e=enddate.getHours();
	var min_e=enddate.getMinutes();
	var min5_e=Math.floor(min_e/5)*5;
	var hourStr_e=hour_e<10?("0"+hour_e):hour_e;
	
	if(isHour==true){
		min5_s=0;
		min5_e=0;
	}
	
	
	var result=[];
	var result_compare=[];
	var i=0;
	var count=0;//找完数组为止
	var startFound=false;
	var startHour="";
	while(count<FAKE_DATA.length){
		var record=FAKE_DATA[i];
		var record_compare=FAKA_DATA_COMPARE[i];
		record.time=record["时段"]+":"+(record["分钟"].length==1?("0"+record["分钟"]):record["分钟"]);
		record_compare.time=record_compare["时段"]+":"+(record_compare["分钟"].length==1?("0"+record_compare["分钟"]):record_compare["分钟"]);
		
		
		if(startFound){
			if(isHour){
				if(record["分钟"]=="0"){
					result.push(record);
					result_compare.push(record_compare);
				}
			}else{
				result.push(record);
				result_compare.push(record_compare);
			}
			
			if(record["时段"]==hourStr_e&&record["分钟"]==min5_e){
				break;
			}
		}
		if(startFound==false){
			if(record["时段"]==hourStr_s&&record["分钟"]==min5_s){
				result.push(record);
				result_compare.push(record_compare);
				startFound=true;
				count=0;
			}
		}
		
		count++;
		i++;
		i=i%FAKE_DATA.length;
	}
	return {
		list:result,
		list_compare:result_compare
	};
};
/** 执行兼容性处理方法*/
(function () { 
	SUtils.extendBaseFunction();
}());

var FAKE_NBIOT=[
{"sdate":"2017/6/21","time":"0:00","承载建立":"99.96","能力协商":"92.94","数据传送":"76.1","业务完成率":"89.67"},
{"sdate":"2017/6/21","time":"0:15","承载建立":"99.94","能力协商":"92.94","数据传送":"76.08","业务完成率":"89.66"},
{"sdate":"2017/6/21","time":"0:30","承载建立":"99.96","能力协商":"92.91","数据传送":"76.09","业务完成率":"89.67"},
{"sdate":"2017/6/21","time":"0:45","承载建立":"99.99","能力协商":"92.97","数据传送":"76.09","业务完成率":"89.67"},
{"sdate":"2017/6/21 1:00","time":"1:00","承载建立":"99.97","能力协商":"97.77","数据传送":"68.83","业务完成率":"88.87"},
{"sdate":"2017/6/21 1:00","time":"1:15","承载建立":"99.99","能力协商":"97.75","数据传送":"68.85","业务完成率":"88.84"},
{"sdate":"2017/6/21 1:00","time":"1:30","承载建立":"99.96","能力协商":"97.79","数据传送":"68.84","业务完成率":"88.85"},
{"sdate":"2017/6/21 1:00","time":"1:45","承载建立":"99.95","能力协商":"97.77","数据传送":"68.81","业务完成率":"88.84"},
{"sdate":"2017/6/21 2:00","time":"2:00","承载建立":"99.97","能力协商":"89.16","数据传送":"66.71","业务完成率":"85.28"},
{"sdate":"2017/6/21 2:00","time":"2:15","承载建立":"99.96","能力协商":"89.17","数据传送":"66.73","业务完成率":"85.29"},
{"sdate":"2017/6/21 2:00","time":"2:30","承载建立":"99.96","能力协商":"89.17","数据传送":"66.73","业务完成率":"85.29"},
{"sdate":"2017/6/21 2:00","time":"2:45","承载建立":"99.96","能力协商":"89.15","数据传送":"66.73","业务完成率":"85.28"},
{"sdate":"2017/6/21 3:00","time":"3:00","承载建立":"99.89","能力协商":"87.22","数据传送":"65.84","业务完成率":"84.36"},
{"sdate":"2017/6/21 3:00","time":"3:15","承载建立":"99.92","能力协商":"87.23","数据传送":"65.83","业务完成率":"84.33"},
{"sdate":"2017/6/21 3:00","time":"3:30","承载建立":"99.88","能力协商":"87.19","数据传送":"65.83","业务完成率":"84.33"},
{"sdate":"2017/6/21 3:00","time":"3:45","承载建立":"99.86","能力协商":"87.19","数据传送":"65.84","业务完成率":"84.33"},
{"sdate":"2017/6/21 4:00","time":"4:00","承载建立":"99.77","能力协商":"89.79","数据传送":"65.69","业务完成率":"85.08"},
{"sdate":"2017/6/21 4:00","time":"4:15","承载建立":"99.74","能力协商":"89.82","数据传送":"65.66","业务完成率":"85.11"},
{"sdate":"2017/6/21 4:00","time":"4:30","承载建立":"99.76","能力协商":"89.79","数据传送":"65.68","业务完成率":"85.06"},
{"sdate":"2017/6/21 4:00","time":"4:45","承载建立":"99.77","能力协商":"89.76","数据传送":"65.71","业务完成率":"85.09"},
{"sdate":"2017/6/21 5:00","time":"5:00","承载建立":"99.84","能力协商":"94.83","数据传送":"67.58","业务完成率":"87.47"},
{"sdate":"2017/6/21 5:00","time":"5:15","承载建立":"99.82","能力协商":"94.86","数据传送":"67.55","业务完成率":"87.45"},
{"sdate":"2017/6/21 5:00","time":"5:30","承载建立":"99.84","能力协商":"94.85","数据传送":"67.58","业务完成率":"87.49"},
{"sdate":"2017/6/21 5:00","time":"5:45","承载建立":"99.84","能力协商":"94.83","数据传送":"67.57","业务完成率":"87.44"},
{"sdate":"2017/6/21 6:00","time":"6:00","承载建立":"99.98","能力协商":"99.26","数据传送":"70.44","业务完成率":"89.9"},
{"sdate":"2017/6/21 6:00","time":"6:15","承载建立":"99.99","能力协商":"99.27","数据传送":"70.41","业务完成率":"89.89"},
{"sdate":"2017/6/21 6:00","time":"6:30","承载建立":"100","能力协商":"99.28","数据传送":"70.43","业务完成率":"89.93"},
{"sdate":"2017/6/21 6:00","time":"6:45","承载建立":"99.98","能力协商":"99.23","数据传送":"70.46","业务完成率":"89.9"},
{"sdate":"2017/6/21 7:00","time":"7:00","承载建立":"99.99","能力协商":"97.93","数据传送":"74.19","业务完成率":"91.7"},
{"sdate":"2017/6/21 7:00","time":"7:15","承载建立":"99.98","能力协商":"97.92","数据传送":"74.21","业务完成率":"91.72"},
{"sdate":"2017/6/21 7:00","time":"7:30","承载建立":"100","能力协商":"97.96","数据传送":"74.18","业务完成率":"91.69"},
{"sdate":"2017/6/21 7:00","time":"7:45","承载建立":"100","能力协商":"97.9","数据传送":"74.21","业务完成率":"91.69"},
{"sdate":"2017/6/21 8:00","time":"8:00","承载建立":"99.58","能力协商":"92.16","数据传送":"73.19","业务完成率":"89.35"},
{"sdate":"2017/6/21 8:00","time":"8:15","承载建立":"99.6","能力协商":"92.18","数据传送":"73.19","业务完成率":"89.33"},
{"sdate":"2017/6/21 8:00","time":"8:30","承载建立":"99.6","能力协商":"92.16","数据传送":"73.16","业务完成率":"89.32"},
{"sdate":"2017/6/21 8:00","time":"8:45","承载建立":"99.61","能力协商":"92.15","数据传送":"73.16","业务完成率":"89.35"},
{"sdate":"2017/6/21 9:00","time":"9:00","承载建立":"99.96","能力协商":"94.27","数据传送":"72.02","业务完成率":"97.75"},
{"sdate":"2017/6/21 9:00","time":"9:15","承载建立":"99.98","能力协商":"94.24","数据传送":"72.04","业务完成率":"97.76"},
{"sdate":"2017/6/21 9:00","time":"9:30","承载建立":"99.93","能力协商":"94.28","数据传送":"72.05","业务完成率":"97.74"},
{"sdate":"2017/6/21 9:00","time":"9:45","承载建立":"99.96","能力协商":"94.26","数据传送":"72.02","业务完成率":"97.76"},
{"sdate":"2017/6/21 10:00","time":"10:00","承载建立":"99.51","能力协商":"90.2","数据传送":"90.48","业务完成率":"93.4"},
{"sdate":"2017/6/21 10:00","time":"10:15","承载建立":"99.54","能力协商":"90.23","数据传送":"90.45","业务完成率":"93.38"},
{"sdate":"2017/6/21 10:00","time":"10:30","承载建立":"99.5","能力协商":"90.17","数据传送":"90.46","业务完成率":"93.42"},
{"sdate":"2017/6/21 10:00","time":"10:45","承载建立":"99.53","能力协商":"90.18","数据传送":"90.51","业务完成率":"93.42"},
{"sdate":"2017/6/21 11:00","time":"11:00","承载建立":"99.96","能力协商":"96.31","数据传送":"72.48","业务完成率":"92.92"},
{"sdate":"2017/6/21 11:00","time":"11:15","承载建立":"99.93","能力协商":"96.31","数据传送":"72.48","业务完成率":"92.89"},
{"sdate":"2017/6/21 11:00","time":"11:30","承载建立":"99.99","能力协商":"96.29","数据传送":"72.51","业务完成率":"92.9"},
{"sdate":"2017/6/21 11:00","time":"11:45","承载建立":"99.94","能力协商":"96.34","数据传送":"72.51","业务完成率":"92.92"},
{"sdate":"2017/6/21 12:00","time":"12:00","承载建立":"99.15","能力协商":"94.6","数据传送":"72.94","业务完成率":"95.56"},
{"sdate":"2017/6/21 12:00","time":"12:15","承载建立":"99.15","能力协商":"94.58","数据传送":"72.94","业务完成率":"95.56"},
{"sdate":"2017/6/21 12:00","time":"12:30","承载建立":"99.18","能力协商":"94.61","数据传送":"72.96","业务完成率":"95.58"},
{"sdate":"2017/6/21 12:00","time":"12:45","承载建立":"99.16","能力协商":"94.6","数据传送":"72.93","业务完成率":"95.53"},
{"sdate":"2017/6/21 13:00","time":"13:00","承载建立":"99.79","能力协商":"94.83","数据传送":"71.16","业务完成率":"88.66"},
{"sdate":"2017/6/21 13:00","time":"13:15","承载建立":"99.78","能力协商":"94.8","数据传送":"71.17","业务完成率":"88.66"},
{"sdate":"2017/6/21 13:00","time":"13:30","承载建立":"99.76","能力协商":"94.82","数据传送":"71.14","业务完成率":"88.65"},
{"sdate":"2017/6/21 13:00","time":"13:45","承载建立":"99.78","能力协商":"94.82","数据传送":"71.13","业务完成率":"88.68"},
{"sdate":"2017/6/21 14:00","time":"14:00","承载建立":"99.53","能力协商":"90.26","数据传送":"90.01","业务完成率":"93.27"},
{"sdate":"2017/6/21 14:00","time":"14:15","承载建立":"99.54","能力协商":"90.25","数据传送":"90.02","业务完成率":"93.26"},
{"sdate":"2017/6/21 14:00","time":"14:30","承载建立":"99.56","能力协商":"90.28","数据传送":"89.99","业务完成率":"93.25"},
{"sdate":"2017/6/21 14:00","time":"14:45","承载建立":"99.53","能力协商":"90.25","数据传送":"90.01","业务完成率":"93.25"},
{"sdate":"2017/6/21 15:00","time":"15:00","承载建立":"99.51","能力协商":"90.2","数据传送":"90.48","业务完成率":"93.4"},
{"sdate":"2017/6/21 15:00","time":"15:15","承载建立":"99.54","能力协商":"90.23","数据传送":"90.45","业务完成率":"93.38"},
{"sdate":"2017/6/21 15:00","time":"15:30","承载建立":"99.5","能力协商":"90.17","数据传送":"90.46","业务完成率":"93.42"},
{"sdate":"2017/6/21 15:00","time":"15:45","承载建立":"99.53","能力协商":"90.18","数据传送":"90.51","业务完成率":"93.42"},
{"sdate":"2017/6/21 16:00","time":"16:00","承载建立":"99.53","能力协商":"89.93","数据传送":"90.32","业务完成率":"93.26"},
{"sdate":"2017/6/21 16:00","time":"16:15","承载建立":"99.56","能力协商":"89.93","数据传送":"90.3","业务完成率":"93.25"},
{"sdate":"2017/6/21 16:00","time":"16:30","承载建立":"99.51","能力协商":"89.95","数据传送":"90.31","业务完成率":"93.25"},
{"sdate":"2017/6/21 16:00","time":"16:45","承载建立":"99.52","能力协商":"89.95","数据传送":"90.34","业务完成率":"93.24"},
{"sdate":"2017/6/21 17:00","time":"17:00","承载建立":"99.54","能力协商":"89.66","数据传送":"89.33","业务完成率":"92.84"},
{"sdate":"2017/6/21 17:00","time":"17:15","承载建立":"99.55","能力协商":"89.64","数据传送":"89.34","业务完成率":"92.85"},
{"sdate":"2017/6/21 17:00","time":"17:30","承载建立":"99.54","能力协商":"89.64","数据传送":"89.3","业务完成率":"92.87"},
{"sdate":"2017/6/21 17:00","time":"17:45","承载建立":"99.57","能力协商":"89.66","数据传送":"89.34","业务完成率":"92.84"},
{"sdate":"2017/6/21 18:00","time":"18:00","承载建立":"99.56","能力协商":"87.68","数据传送":"85","业务完成率":"90.75"},
{"sdate":"2017/6/21 18:00","time":"18:15","承载建立":"99.57","能力协商":"87.69","数据传送":"85.01","业务完成率":"90.73"},
{"sdate":"2017/6/21 18:00","time":"18:30","承载建立":"99.58","能力协商":"87.71","数据传送":"84.99","业务完成率":"90.76"},
{"sdate":"2017/6/21 18:00","time":"18:45","承载建立":"99.54","能力协商":"87.66","数据传送":"85","业务完成率":"90.77"},
{"sdate":"2017/6/21 19:00","time":"19:00","承载建立":"99.79","能力协商":"86.78","数据传送":"85.13","业务完成率":"90.57"},
{"sdate":"2017/6/21 19:00","time":"19:15","承载建立":"99.82","能力协商":"86.79","数据传送":"85.11","业务完成率":"90.59"},
{"sdate":"2017/6/21 19:00","time":"19:30","承载建立":"99.79","能力协商":"86.76","数据传送":"85.11","业务完成率":"90.57"},
{"sdate":"2017/6/21 19:00","time":"19:45","承载建立":"99.77","能力协商":"86.81","数据传送":"85.1","业务完成率":"90.6"},
{"sdate":"2017/6/21 20:00","time":"20:00","承载建立":"99.63","能力协商":"88.36","数据传送":"85.97","业务完成率":"91.68"},
{"sdate":"2017/6/21 20:00","time":"20:15","承载建立":"99.63","能力协商":"88.38","数据传送":"85.96","业务完成率":"91.71"},
{"sdate":"2017/6/21 20:00","time":"20:30","承载建立":"99.65","能力协商":"88.33","数据传送":"85.97","业务完成率":"91.68"},
{"sdate":"2017/6/21 20:00","time":"20:45","承载建立":"99.6","能力协商":"88.35","数据传送":"85.98","业务完成率":"91.65"},
{"sdate":"2017/6/21 21:00","time":"21:00","承载建立":"99.35","能力协商":"88.52","数据传送":"86.54","业务完成率":"92.35"},
{"sdate":"2017/6/21 21:00","time":"21:15","承载建立":"99.32","能力协商":"88.49","数据传送":"86.52","业务完成率":"92.37"},
{"sdate":"2017/6/21 21:00","time":"21:30","承载建立":"99.35","能力协商":"88.5","数据传送":"86.51","业务完成率":"92.33"},
{"sdate":"2017/6/21 21:00","time":"21:45","承载建立":"99.38","能力协商":"88.53","数据传送":"86.57","业务完成率":"92.36"},
{"sdate":"2017/6/21 22:00","time":"22:00","承载建立":"99.24","能力协商":"89.61","数据传送":"87.95","业务完成率":"92.27"},
{"sdate":"2017/6/21 22:00","time":"22:15","承载建立":"99.23","能力协商":"89.59","数据传送":"87.92","业务完成率":"92.25"},
{"sdate":"2017/6/21 22:00","time":"22:30","承载建立":"99.23","能力协商":"89.62","数据传送":"87.97","业务完成率":"92.29"},
{"sdate":"2017/6/21 22:00","time":"22:45","承载建立":"99.25","能力协商":"89.58","数据传送":"87.94","业务完成率":"92.25"},
{"sdate":"2017/6/21 23:00","time":"23:00","承载建立":"99.52","能力协商":"89.59","数据传送":"84.82","业务完成率":"91.31"},
{"sdate":"2017/6/21 23:00","time":"23:15","承载建立":"99.55","能力协商":"89.61","数据传送":"84.82","业务完成率":"91.31"},
{"sdate":"2017/6/21 23:00","time":"23:30","承载建立":"99.54","能力协商":"89.61","数据传送":"84.85","业务完成率":"91.32"},
{"sdate":"2017/6/21 23:00","time":"23:45","承载建立":"99.49","能力协商":"89.61","数据传送":"84.83","业务完成率":"91.33"},

];


var FAKE_DATA=[
{"时段":"00","分钟":"0","VOLTE注册成功率":"97.23","VOLTE语音接通率":"98.68","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.54","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"00","分钟":"5","VOLTE注册成功率":"97.19","VOLTE语音接通率":"98.65","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.55","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"00","分钟":"10","VOLTE注册成功率":"97.17","VOLTE语音接通率":"98.66","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.50","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"00","分钟":"15","VOLTE注册成功率":"97.21","VOLTE语音接通率":"98.68","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.46","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"00","分钟":"20","VOLTE注册成功率":"97.23","VOLTE语音接通率":"98.65","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.53","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"00","分钟":"25","VOLTE注册成功率":"97.14","VOLTE语音接通率":"98.66","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.47","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"00","分钟":"30","VOLTE注册成功率":"97.14","VOLTE语音接通率":"98.68","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.49","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"00","分钟":"35","VOLTE注册成功率":"97.13","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.49","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"00","分钟":"40","VOLTE注册成功率":"97.24","VOLTE语音接通率":"98.67","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.87","VOLTEeSRVCC成功率":"97.53","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"00","分钟":"45","VOLTE注册成功率":"97.17","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.48","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"00","分钟":"50","VOLTE注册成功率":"97.19","VOLTE语音接通率":"98.65","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.52","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"00","分钟":"55","VOLTE注册成功率":"97.20","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.51","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"01","分钟":"0","VOLTE注册成功率":"96.68","VOLTE语音接通率":"98.70","VOLTE语音掉话率":"0.08","VOLTE平均接续时长":"2.84","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"01","分钟":"5","VOLTE注册成功率":"96.70","VOLTE语音接通率":"98.65","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.83","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.82","RTP上行丢包率":"0.26"},
{"时段":"01","分钟":"10","VOLTE注册成功率":"96.65","VOLTE语音接通率":"98.69","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.82","VOLTEeSRVCC成功率":"96.90","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"01","分钟":"15","VOLTE注册成功率":"96.63","VOLTE语音接通率":"98.68","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.83","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.82","RTP上行丢包率":"0.26"},
{"时段":"01","分钟":"20","VOLTE注册成功率":"96.61","VOLTE语音接通率":"98.70","VOLTE语音掉话率":"0.08","VOLTE平均接续时长":"2.83","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.82","RTP上行丢包率":"0.26"},
{"时段":"01","分钟":"25","VOLTE注册成功率":"96.67","VOLTE语音接通率":"98.68","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.82","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"01","分钟":"30","VOLTE注册成功率":"96.61","VOLTE语音接通率":"98.69","VOLTE语音掉话率":"0.08","VOLTE平均接续时长":"2.84","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"01","分钟":"35","VOLTE注册成功率":"96.60","VOLTE语音接通率":"98.68","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.84","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"01","分钟":"40","VOLTE注册成功率":"96.66","VOLTE语音接通率":"98.67","VOLTE语音掉话率":"0.08","VOLTE平均接续时长":"2.83","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"01","分钟":"45","VOLTE注册成功率":"96.62","VOLTE语音接通率":"98.66","VOLTE语音掉话率":"0.08","VOLTE平均接续时长":"2.84","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.82","RTP上行丢包率":"0.26"},
{"时段":"01","分钟":"50","VOLTE注册成功率":"96.68","VOLTE语音接通率":"98.65","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.83","VOLTEeSRVCC成功率":"96.96","VOLTEMOS值":"3.82","RTP上行丢包率":"0.26"},
{"时段":"01","分钟":"55","VOLTE注册成功率":"96.65","VOLTE语音接通率":"98.70","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.82","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"02","分钟":"0","VOLTE注册成功率":"96.11","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.47","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"02","分钟":"5","VOLTE注册成功率":"96.09","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.41","VOLTEMOS值":"3.83","RTP上行丢包率":"0.28"},
{"时段":"02","分钟":"10","VOLTE注册成功率":"96.07","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.42","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"02","分钟":"15","VOLTE注册成功率":"96.13","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.43","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"02","分钟":"20","VOLTE注册成功率":"96.17","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.45","VOLTEMOS值":"3.83","RTP上行丢包率":"0.28"},
{"时段":"02","分钟":"25","VOLTE注册成功率":"96.15","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.40","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"02","分钟":"30","VOLTE注册成功率":"96.15","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.42","VOLTEMOS值":"3.83","RTP上行丢包率":"0.28"},
{"时段":"02","分钟":"35","VOLTE注册成功率":"96.07","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.39","VOLTEMOS值":"3.83","RTP上行丢包率":"0.28"},
{"时段":"02","分钟":"40","VOLTE注册成功率":"96.11","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.40","VOLTEMOS值":"3.83","RTP上行丢包率":"0.28"},
{"时段":"02","分钟":"45","VOLTE注册成功率":"96.09","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.42","VOLTEMOS值":"3.83","RTP上行丢包率":"0.28"},
{"时段":"02","分钟":"50","VOLTE注册成功率":"96.13","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.39","VOLTEMOS值":"3.83","RTP上行丢包率":"0.28"},
{"时段":"02","分钟":"55","VOLTE注册成功率":"96.09","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.41","VOLTEMOS值":"3.83","RTP上行丢包率":"0.28"},
{"时段":"03","分钟":"0","VOLTE注册成功率":"95.88","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.44","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"03","分钟":"5","VOLTE注册成功率":"95.86","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.46","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"03","分钟":"10","VOLTE注册成功率":"95.91","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.42","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"03","分钟":"15","VOLTE注册成功率":"95.87","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.49","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"03","分钟":"20","VOLTE注册成功率":"95.89","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.51","VOLTEMOS值":"3.83","RTP上行丢包率":"0.04"},
{"时段":"03","分钟":"25","VOLTE注册成功率":"95.90","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.47","VOLTEMOS值":"3.83","RTP上行丢包率":"0.04"},
{"时段":"03","分钟":"30","VOLTE注册成功率":"95.86","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.47","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"03","分钟":"35","VOLTE注册成功率":"95.90","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.50","VOLTEMOS值":"3.83","RTP上行丢包率":"0.04"},
{"时段":"03","分钟":"40","VOLTE注册成功率":"95.82","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.49","VOLTEMOS值":"3.83","RTP上行丢包率":"0.04"},
{"时段":"03","分钟":"45","VOLTE注册成功率":"95.89","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.45","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"03","分钟":"50","VOLTE注册成功率":"95.81","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.43","VOLTEMOS值":"3.83","RTP上行丢包率":"0.04"},
{"时段":"03","分钟":"55","VOLTE注册成功率":"95.88","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.43","VOLTEMOS值":"3.83","RTP上行丢包率":"0.04"},
{"时段":"04","分钟":"0","VOLTE注册成功率":"95.86","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.84","RTP上行丢包率":"0.30"},
{"时段":"04","分钟":"5","VOLTE注册成功率":"95.85","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.00","VOLTEMOS值":"3.84","RTP上行丢包率":"0.30"},
{"时段":"04","分钟":"10","VOLTE注册成功率":"95.81","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.00","VOLTEMOS值":"3.84","RTP上行丢包率":"0.30"},
{"时段":"04","分钟":"15","VOLTE注册成功率":"95.88","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"96.94","VOLTEMOS值":"3.84","RTP上行丢包率":"0.31"},
{"时段":"04","分钟":"20","VOLTE注册成功率":"95.91","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.84","RTP上行丢包率":"0.30"},
{"时段":"04","分钟":"25","VOLTE注册成功率":"95.89","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.01","VOLTEMOS值":"3.84","RTP上行丢包率":"0.30"},
{"时段":"04","分钟":"30","VOLTE注册成功率":"95.89","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.84","RTP上行丢包率":"0.31"},
{"时段":"04","分钟":"35","VOLTE注册成功率":"95.93","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.94","VOLTEMOS值":"3.84","RTP上行丢包率":"0.31"},
{"时段":"04","分钟":"40","VOLTE注册成功率":"95.89","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.84","RTP上行丢包率":"0.30"},
{"时段":"04","分钟":"45","VOLTE注册成功率":"95.89","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.84","RTP上行丢包率":"0.30"},
{"时段":"04","分钟":"50","VOLTE注册成功率":"95.87","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.95","VOLTEMOS值":"3.84","RTP上行丢包率":"0.31"},
{"时段":"04","分钟":"55","VOLTE注册成功率":"95.90","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.84","RTP上行丢包率":"0.31"},
{"时段":"05","分钟":"0","VOLTE注册成功率":"96.43","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.57","VOLTEMOS值":"3.85","RTP上行丢包率":"0.29"},
{"时段":"05","分钟":"5","VOLTE注册成功率":"96.42","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.16","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.62","VOLTEMOS值":"3.85","RTP上行丢包率":"0.29"},
{"时段":"05","分钟":"10","VOLTE注册成功率":"96.38","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.59","VOLTEMOS值":"3.85","RTP上行丢包率":"0.29"},
{"时段":"05","分钟":"15","VOLTE注册成功率":"96.41","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.56","VOLTEMOS值":"3.85","RTP上行丢包率":"0.29"},
{"时段":"05","分钟":"20","VOLTE注册成功率":"96.45","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.16","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.59","VOLTEMOS值":"3.85","RTP上行丢包率":"0.30"},
{"时段":"05","分钟":"25","VOLTE注册成功率":"96.39","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.16","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.58","VOLTEMOS值":"3.85","RTP上行丢包率":"0.29"},
{"时段":"05","分钟":"30","VOLTE注册成功率":"96.37","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.54","VOLTEMOS值":"3.85","RTP上行丢包率":"0.30"},
{"时段":"05","分钟":"35","VOLTE注册成功率":"96.35","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.16","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.54","VOLTEMOS值":"3.85","RTP上行丢包率":"0.29"},
{"时段":"05","分钟":"40","VOLTE注册成功率":"96.34","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.63","VOLTEMOS值":"3.85","RTP上行丢包率":"0.30"},
{"时段":"05","分钟":"45","VOLTE注册成功率":"96.38","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.59","VOLTEMOS值":"3.85","RTP上行丢包率":"0.29"},
{"时段":"05","分钟":"50","VOLTE注册成功率":"96.44","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.16","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.58","VOLTEMOS值":"3.85","RTP上行丢包率":"0.30"},
{"时段":"05","分钟":"55","VOLTE注册成功率":"96.41","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.16","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.55","VOLTEMOS值":"3.85","RTP上行丢包率":"0.30"},
{"时段":"06","分钟":"0","VOLTE注册成功率":"96.90","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"97.35","VOLTEMOS值":"3.85","RTP上行丢包率":"0.09"},
{"时段":"06","分钟":"5","VOLTE注册成功率":"96.83","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.38","VOLTEMOS值":"3.85","RTP上行丢包率":"0.08"},
{"时段":"06","分钟":"10","VOLTE注册成功率":"96.88","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.42","VOLTEMOS值":"3.85","RTP上行丢包率":"0.09"},
{"时段":"06","分钟":"15","VOLTE注册成功率":"96.92","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"97.36","VOLTEMOS值":"3.85","RTP上行丢包率":"0.09"},
{"时段":"06","分钟":"20","VOLTE注册成功率":"96.94","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.31","VOLTEMOS值":"3.85","RTP上行丢包率":"0.08"},
{"时段":"06","分钟":"25","VOLTE注册成功率":"96.91","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"97.41","VOLTEMOS值":"3.85","RTP上行丢包率":"0.08"},
{"时段":"06","分钟":"30","VOLTE注册成功率":"96.84","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"97.42","VOLTEMOS值":"3.85","RTP上行丢包率":"0.09"},
{"时段":"06","分钟":"35","VOLTE注册成功率":"96.92","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.85","RTP上行丢包率":"0.08"},
{"时段":"06","分钟":"40","VOLTE注册成功率":"96.89","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.35","VOLTEMOS值":"3.85","RTP上行丢包率":"0.08"},
{"时段":"06","分钟":"45","VOLTE注册成功率":"96.87","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"97.40","VOLTEMOS值":"3.85","RTP上行丢包率":"0.09"},
{"时段":"06","分钟":"50","VOLTE注册成功率":"96.83","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"97.31","VOLTEMOS值":"3.85","RTP上行丢包率":"0.08"},
{"时段":"06","分钟":"55","VOLTE注册成功率":"96.87","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.31","VOLTEMOS值":"3.85","RTP上行丢包率":"0.09"},
{"时段":"07","分钟":"0","VOLTE注册成功率":"97.36","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.02","VOLTEeSRVCC成功率":"97.46","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"07","分钟":"5","VOLTE注册成功率":"97.34","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.54","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"07","分钟":"10","VOLTE注册成功率":"97.32","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.02","VOLTEeSRVCC成功率":"97.49","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"07","分钟":"15","VOLTE注册成功率":"97.28","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.02","VOLTEeSRVCC成功率":"97.54","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"07","分钟":"20","VOLTE注册成功率":"97.32","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.59","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"07","分钟":"25","VOLTE注册成功率":"97.32","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.59","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"07","分钟":"30","VOLTE注册成功率":"97.37","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.52","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"07","分钟":"35","VOLTE注册成功率":"97.33","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.02","VOLTEeSRVCC成功率":"97.55","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"07","分钟":"40","VOLTE注册成功率":"97.32","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.55","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"07","分钟":"45","VOLTE注册成功率":"97.30","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.02","VOLTEeSRVCC成功率":"97.57","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"07","分钟":"50","VOLTE注册成功率":"97.33","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.02","VOLTEeSRVCC成功率":"97.55","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"07","分钟":"55","VOLTE注册成功率":"97.32","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.55","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"08","分钟":"0","VOLTE注册成功率":"97.63","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"08","分钟":"5","VOLTE注册成功率":"97.67","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.28","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"08","分钟":"10","VOLTE注册成功率":"97.67","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.27","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"08","分钟":"15","VOLTE注册成功率":"97.66","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"08","分钟":"20","VOLTE注册成功率":"97.71","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.23","VOLTEMOS值":"3.84","RTP上行丢包率":"0.06"},
{"时段":"08","分钟":"25","VOLTE注册成功率":"97.72","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.26","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"08","分钟":"30","VOLTE注册成功率":"97.68","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.26","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"08","分钟":"35","VOLTE注册成功率":"97.66","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.31","VOLTEMOS值":"3.84","RTP上行丢包率":"0.06"},
{"时段":"08","分钟":"40","VOLTE注册成功率":"97.70","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.32","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"08","分钟":"45","VOLTE注册成功率":"97.65","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.33","VOLTEMOS值":"3.84","RTP上行丢包率":"0.06"},
{"时段":"08","分钟":"50","VOLTE注册成功率":"97.63","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.35","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"08","分钟":"55","VOLTE注册成功率":"97.64","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.26","VOLTEMOS值":"3.84","RTP上行丢包率":"0.06"},
{"时段":"09","分钟":"0","VOLTE注册成功率":"97.71","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.01","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"09","分钟":"5","VOLTE注册成功率":"97.73","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.84","RTP上行丢包率":"0.09"},
{"时段":"09","分钟":"10","VOLTE注册成功率":"97.79","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.00","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"09","分钟":"15","VOLTE注册成功率":"97.72","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.08","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"09","分钟":"20","VOLTE注册成功率":"97.74","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.14","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"09","分钟":"25","VOLTE注册成功率":"97.74","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"09","分钟":"30","VOLTE注册成功率":"97.81","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.09","VOLTEMOS值":"3.84","RTP上行丢包率":"0.09"},
{"时段":"09","分钟":"35","VOLTE注册成功率":"97.80","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"09","分钟":"40","VOLTE注册成功率":"97.78","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.04","VOLTEMOS值":"3.84","RTP上行丢包率":"0.09"},
{"时段":"09","分钟":"45","VOLTE注册成功率":"97.76","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.09","VOLTEMOS值":"3.84","RTP上行丢包率":"0.09"},
{"时段":"09","分钟":"50","VOLTE注册成功率":"97.70","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.84","RTP上行丢包率":"0.09"},
{"时段":"09","分钟":"55","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.04","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"10","分钟":"0","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"10","分钟":"5","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"10","分钟":"10","VOLTE注册成功率":"97.70","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.95","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"10","分钟":"15","VOLTE注册成功率":"97.79","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"10","分钟":"20","VOLTE注册成功率":"97.78","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"10","分钟":"25","VOLTE注册成功率":"97.75","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.90","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"10","分钟":"30","VOLTE注册成功率":"97.78","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"10","分钟":"35","VOLTE注册成功率":"97.78","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"10","分钟":"40","VOLTE注册成功率":"97.78","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"10","分钟":"45","VOLTE注册成功率":"97.78","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"10","分钟":"50","VOLTE注册成功率":"97.76","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"10","分钟":"55","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"11","分钟":"0","VOLTE注册成功率":"97.83","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.13","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"11","分钟":"5","VOLTE注册成功率":"97.84","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.16","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"11","分钟":"10","VOLTE注册成功率":"97.75","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.17","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"11","分钟":"15","VOLTE注册成功率":"97.78","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"11","分钟":"20","VOLTE注册成功率":"97.74","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.09","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"11","分钟":"25","VOLTE注册成功率":"97.76","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.10","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"11","分钟":"30","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.09","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"11","分钟":"35","VOLTE注册成功率":"97.75","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.12","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"11","分钟":"40","VOLTE注册成功率":"97.81","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.11","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"11","分钟":"45","VOLTE注册成功率":"97.75","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.19","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"11","分钟":"50","VOLTE注册成功率":"97.78","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.13","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"11","分钟":"55","VOLTE注册成功率":"97.74","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.16","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"12","分钟":"0","VOLTE注册成功率":"97.81","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.16","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"12","分钟":"5","VOLTE注册成功率":"97.83","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.24","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"12","分钟":"10","VOLTE注册成功率":"97.89","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.17","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"12","分钟":"15","VOLTE注册成功率":"97.92","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.22","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"12","分钟":"20","VOLTE注册成功率":"97.88","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.19","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"12","分钟":"25","VOLTE注册成功率":"97.84","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.21","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"12","分钟":"30","VOLTE注册成功率":"97.82","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.22","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"12","分钟":"35","VOLTE注册成功率":"97.87","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.20","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"12","分钟":"40","VOLTE注册成功率":"97.80","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.15","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"12","分钟":"45","VOLTE注册成功率":"97.81","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.22","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"12","分钟":"50","VOLTE注册成功率":"97.87","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.24","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"12","分钟":"55","VOLTE注册成功率":"97.90","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.19","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"13","分钟":"0","VOLTE注册成功率":"98.09","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.05","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"13","分钟":"5","VOLTE注册成功率":"98.15","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.16","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"13","分钟":"10","VOLTE注册成功率":"98.13","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.10","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"13","分钟":"15","VOLTE注册成功率":"98.14","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.16","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"13","分钟":"20","VOLTE注册成功率":"98.14","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.04","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"13","分钟":"25","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"13","分钟":"30","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.12","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"13","分钟":"35","VOLTE注册成功率":"98.13","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.11","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"13","分钟":"40","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.10","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"13","分钟":"45","VOLTE注册成功率":"98.15","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"13","分钟":"50","VOLTE注册成功率":"98.15","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.13","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"13","分钟":"55","VOLTE注册成功率":"98.09","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"14","分钟":"0","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.27","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"14","分钟":"5","VOLTE注册成功率":"98.12","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.23","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"14","分钟":"10","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.31","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"14","分钟":"15","VOLTE注册成功率":"98.13","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"14","分钟":"20","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.25","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"14","分钟":"25","VOLTE注册成功率":"98.18","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.27","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"14","分钟":"30","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.32","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"14","分钟":"35","VOLTE注册成功率":"98.14","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.32","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"14","分钟":"40","VOLTE注册成功率":"98.07","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.32","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"14","分钟":"45","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.33","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"14","分钟":"50","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.30","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"14","分钟":"55","VOLTE注册成功率":"98.09","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.31","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"15","分钟":"0","VOLTE注册成功率":"98.11","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"5","VOLTE注册成功率":"98.14","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"15","分钟":"10","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"15","分钟":"15","VOLTE注册成功率":"98.11","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.01","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"20","VOLTE注册成功率":"98.18","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.04","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"15","分钟":"25","VOLTE注册成功率":"98.13","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.02","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"30","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"35","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.00","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"40","VOLTE注册成功率":"98.15","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"45","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.03","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"50","VOLTE注册成功率":"98.09","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.03","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"15","分钟":"55","VOLTE注册成功率":"98.11","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.95","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"16","分钟":"0","VOLTE注册成功率":"98.27","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.11","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"16","分钟":"5","VOLTE注册成功率":"98.24","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.08","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"16","分钟":"10","VOLTE注册成功率":"98.20","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.11","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"16","分钟":"15","VOLTE注册成功率":"98.24","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.04","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"16","分钟":"20","VOLTE注册成功率":"98.22","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.03","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"16","分钟":"25","VOLTE注册成功率":"98.25","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.05","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"16","分钟":"30","VOLTE注册成功率":"98.24","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.11","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"16","分钟":"35","VOLTE注册成功率":"98.20","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.13","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"16","分钟":"40","VOLTE注册成功率":"98.29","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.08","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"16","分钟":"45","VOLTE注册成功率":"98.23","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.08","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"16","分钟":"50","VOLTE注册成功率":"98.29","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.12","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"16","分钟":"55","VOLTE注册成功率":"98.23","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.11","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"17","分钟":"0","VOLTE注册成功率":"98.25","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.13","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"17","分钟":"5","VOLTE注册成功率":"98.31","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.19","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"17","分钟":"10","VOLTE注册成功率":"98.22","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.14","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"17","分钟":"15","VOLTE注册成功率":"98.27","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.22","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"17","分钟":"20","VOLTE注册成功率":"98.31","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.16","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"17","分钟":"25","VOLTE注册成功率":"98.23","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.15","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"17","分钟":"30","VOLTE注册成功率":"98.20","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.22","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"17","分钟":"35","VOLTE注册成功率":"98.21","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.19","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"17","分钟":"40","VOLTE注册成功率":"98.31","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.19","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"17","分钟":"45","VOLTE注册成功率":"98.27","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.19","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"17","分钟":"50","VOLTE注册成功率":"98.28","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.20","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"17","分钟":"55","VOLTE注册成功率":"98.24","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.13","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"18","分钟":"0","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.29","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"18","分钟":"5","VOLTE注册成功率":"98.24","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"18","分钟":"10","VOLTE注册成功率":"98.24","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.32","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"18","分钟":"15","VOLTE注册成功率":"98.23","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.24","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"18","分钟":"20","VOLTE注册成功率":"98.23","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.33","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"18","分钟":"25","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.24","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"18","分钟":"30","VOLTE注册成功率":"98.28","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.33","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"18","分钟":"35","VOLTE注册成功率":"98.24","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.26","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"18","分钟":"40","VOLTE注册成功率":"98.29","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.33","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"18","分钟":"45","VOLTE注册成功率":"98.27","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.30","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"18","分钟":"50","VOLTE注册成功率":"98.23","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.31","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"18","分钟":"55","VOLTE注册成功率":"98.27","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.25","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"19","分钟":"0","VOLTE注册成功率":"98.32","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"19","分钟":"5","VOLTE注册成功率":"98.37","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"19","分钟":"10","VOLTE注册成功率":"98.33","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"19","分钟":"15","VOLTE注册成功率":"98.30","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"19","分钟":"20","VOLTE注册成功率":"98.30","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"19","分钟":"25","VOLTE注册成功率":"98.37","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"19","分钟":"30","VOLTE注册成功率":"98.30","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"19","分钟":"35","VOLTE注册成功率":"98.33","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.98","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"19","分钟":"40","VOLTE注册成功率":"98.31","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.95","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"19","分钟":"45","VOLTE注册成功率":"98.36","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.98","VOLTEMOS值":"3.83","RTP上行丢包率":"0.09"},
{"时段":"19","分钟":"50","VOLTE注册成功率":"98.33","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.98","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"19","分钟":"55","VOLTE注册成功率":"98.33","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"20","分钟":"0","VOLTE注册成功率":"98.11","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.83","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"20","分钟":"5","VOLTE注册成功率":"98.17","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.86","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"20","分钟":"10","VOLTE注册成功率":"98.06","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"20","分钟":"15","VOLTE注册成功率":"98.11","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.76","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"20","分钟":"20","VOLTE注册成功率":"98.15","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.80","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"20","分钟":"25","VOLTE注册成功率":"98.11","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"20","分钟":"30","VOLTE注册成功率":"98.08","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.84","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"20","分钟":"35","VOLTE注册成功率":"98.15","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.81","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"20","分钟":"40","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"20","分钟":"45","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.84","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"20","分钟":"50","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.86","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"20","分钟":"55","VOLTE注册成功率":"98.12","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"21","分钟":"0","VOLTE注册成功率":"98.04","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.96","VOLTEMOS值":"3.82","RTP上行丢包率":"0.14"},
{"时段":"21","分钟":"5","VOLTE注册成功率":"97.95","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.94","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"21","分钟":"10","VOLTE注册成功率":"97.99","VOLTE语音接通率":"98.63","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"21","分钟":"15","VOLTE注册成功率":"97.98","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"21","分钟":"20","VOLTE注册成功率":"98.03","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"21","分钟":"25","VOLTE注册成功率":"98.02","VOLTE语音接通率":"98.63","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"21","分钟":"30","VOLTE注册成功率":"97.97","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.96","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"21","分钟":"35","VOLTE注册成功率":"98.00","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"21","分钟":"40","VOLTE注册成功率":"97.99","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.01","VOLTEMOS值":"3.82","RTP上行丢包率":"0.14"},
{"时段":"21","分钟":"45","VOLTE注册成功率":"97.99","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.94","VOLTEMOS值":"3.82","RTP上行丢包率":"0.14"},
{"时段":"21","分钟":"50","VOLTE注册成功率":"98.06","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.00","VOLTEMOS值":"3.82","RTP上行丢包率":"0.14"},
{"时段":"21","分钟":"55","VOLTE注册成功率":"98.00","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.00","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"22","分钟":"0","VOLTE注册成功率":"97.88","VOLTE语音接通率":"98.63","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.98","VOLTEMOS值":"3.82","RTP上行丢包率":"0.14"},
{"时段":"22","分钟":"5","VOLTE注册成功率":"97.87","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.82","RTP上行丢包率":"0.14"},
{"时段":"22","分钟":"10","VOLTE注册成功率":"97.87","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.95","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"22","分钟":"15","VOLTE注册成功率":"97.79","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"22","分钟":"20","VOLTE注册成功率":"97.87","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.82","RTP上行丢包率":"0.14"},
{"时段":"22","分钟":"25","VOLTE注册成功率":"97.84","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.82","RTP上行丢包率":"0.14"},
{"时段":"22","分钟":"30","VOLTE注册成功率":"97.86","VOLTE语音接通率":"98.63","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.94","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"22","分钟":"35","VOLTE注册成功率":"97.85","VOLTE语音接通率":"98.63","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.82","RTP上行丢包率":"0.14"},
{"时段":"22","分钟":"40","VOLTE注册成功率":"97.84","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.82","RTP上行丢包率":"0.14"},
{"时段":"22","分钟":"45","VOLTE注册成功率":"97.81","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"22","分钟":"50","VOLTE注册成功率":"97.86","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.94","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"22","分钟":"55","VOLTE注册成功率":"97.90","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.98","VOLTEMOS值":"3.82","RTP上行丢包率":"0.13"},
{"时段":"23","分钟":"0","VOLTE注册成功率":"97.64","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.82","RTP上行丢包率":"0.12"},
{"时段":"23","分钟":"5","VOLTE注册成功率":"97.63","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"23","分钟":"10","VOLTE注册成功率":"97.62","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"23","分钟":"15","VOLTE注册成功率":"97.60","VOLTE语音接通率":"98.65","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.84","VOLTEMOS值":"3.82","RTP上行丢包率":"0.12"},
{"时段":"23","分钟":"20","VOLTE注册成功率":"97.60","VOLTE语音接通率":"98.63","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.90","VOLTEMOS值":"3.82","RTP上行丢包率":"0.12"},
{"时段":"23","分钟":"25","VOLTE注册成功率":"97.56","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"23","分钟":"30","VOLTE注册成功率":"97.58","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.82","RTP上行丢包率":"0.12"},
{"时段":"23","分钟":"35","VOLTE注册成功率":"97.68","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.82","RTP上行丢包率":"0.12"},
{"时段":"23","分钟":"40","VOLTE注册成功率":"97.65","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.81","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"23","分钟":"45","VOLTE注册成功率":"97.59","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.90","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},
{"时段":"23","分钟":"50","VOLTE注册成功率":"97.63","VOLTE语音接通率":"98.63","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.82","RTP上行丢包率":"0.12"},
{"时段":"23","分钟":"55","VOLTE注册成功率":"97.63","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.82","RTP上行丢包率":"0.11"},

];

var FAKA_DATA_COMPARE=[
{"时段":"00","分钟":"0","VOLTE注册成功率":"97.15","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.49","VOLTEMOS值":"3.80","RTP上行丢包率":"0.08"},
{"时段":"00","分钟":"5","VOLTE注册成功率":"97.14","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.86","VOLTEeSRVCC成功率":"97.47","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"00","分钟":"10","VOLTE注册成功率":"97.11","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.87","VOLTEeSRVCC成功率":"97.44","VOLTEMOS值":"3.80","RTP上行丢包率":"0.08"},
{"时段":"00","分钟":"15","VOLTE注册成功率":"97.14","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.39","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"00","分钟":"20","VOLTE注册成功率":"97.16","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.48","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"00","分钟":"25","VOLTE注册成功率":"97.10","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.87","VOLTEeSRVCC成功率":"97.42","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"00","分钟":"30","VOLTE注册成功率":"97.09","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.87","VOLTEeSRVCC成功率":"97.44","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"00","分钟":"35","VOLTE注册成功率":"97.08","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.43","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"00","分钟":"40","VOLTE注册成功率":"97.16","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.86","VOLTEeSRVCC成功率":"97.48","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"00","分钟":"45","VOLTE注册成功率":"97.09","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.41","VOLTEMOS值":"3.80","RTP上行丢包率":"0.09"},
{"时段":"00","分钟":"50","VOLTE注册成功率":"97.13","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.46","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"00","分钟":"55","VOLTE注册成功率":"97.13","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.87","VOLTEeSRVCC成功率":"97.46","VOLTEMOS值":"3.80","RTP上行丢包率":"0.08"},
{"时段":"01","分钟":"0","VOLTE注册成功率":"96.60","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.82","VOLTEeSRVCC成功率":"96.86","VOLTEMOS值":"3.81","RTP上行丢包率":"0.26"},
{"时段":"01","分钟":"5","VOLTE注册成功率":"96.64","VOLTE语音接通率":"98.61","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.82","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.81","RTP上行丢包率":"0.25"},
{"时段":"01","分钟":"10","VOLTE注册成功率":"96.60","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.81","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.81","RTP上行丢包率":"0.26"},
{"时段":"01","分钟":"15","VOLTE注册成功率":"96.56","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.82","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.81","RTP上行丢包率":"0.25"},
{"时段":"01","分钟":"20","VOLTE注册成功率":"96.53","VOLTE语音接通率":"98.62","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.81","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.81","RTP上行丢包率":"0.25"},
{"时段":"01","分钟":"25","VOLTE注册成功率":"96.60","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.81","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.81","RTP上行丢包率":"0.25"},
{"时段":"01","分钟":"30","VOLTE注册成功率":"96.55","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.83","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.81","RTP上行丢包率":"0.26"},
{"时段":"01","分钟":"35","VOLTE注册成功率":"96.54","VOLTE语音接通率":"98.64","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.82","VOLTEeSRVCC成功率":"96.80","VOLTEMOS值":"3.80","RTP上行丢包率":"0.26"},
{"时段":"01","分钟":"40","VOLTE注册成功率":"96.58","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.82","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.81","RTP上行丢包率":"0.25"},
{"时段":"01","分钟":"45","VOLTE注册成功率":"96.55","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.07","VOLTE平均接续时长":"2.83","VOLTEeSRVCC成功率":"96.79","VOLTEMOS值":"3.81","RTP上行丢包率":"0.25"},
{"时段":"01","分钟":"50","VOLTE注册成功率":"96.60","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.82","VOLTEeSRVCC成功率":"96.90","VOLTEMOS值":"3.81","RTP上行丢包率":"0.25"},
{"时段":"01","分钟":"55","VOLTE注册成功率":"96.61","VOLTE语音接通率":"98.66","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.82","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.81","RTP上行丢包率":"0.26"},
{"时段":"02","分钟":"0","VOLTE注册成功率":"96.06","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.41","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"02","分钟":"5","VOLTE注册成功率":"96.01","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"02","分钟":"10","VOLTE注册成功率":"96.00","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.35","VOLTEMOS值":"3.82","RTP上行丢包率":"0.28"},
{"时段":"02","分钟":"15","VOLTE注册成功率":"96.07","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.87","VOLTEeSRVCC成功率":"97.37","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"02","分钟":"20","VOLTE注册成功率":"96.10","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.37","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"02","分钟":"25","VOLTE注册成功率":"96.08","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.33","VOLTEMOS值":"3.82","RTP上行丢包率":"0.28"},
{"时段":"02","分钟":"30","VOLTE注册成功率":"96.08","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.87","VOLTEeSRVCC成功率":"97.37","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"02","分钟":"35","VOLTE注册成功率":"96.00","VOLTE语音接通率":"98.36","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.82","RTP上行丢包率":"0.26"},
{"时段":"02","分钟":"40","VOLTE注册成功率":"96.05","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.35","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"02","分钟":"45","VOLTE注册成功率":"96.01","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.35","VOLTEMOS值":"3.81","RTP上行丢包率":"0.27"},
{"时段":"02","分钟":"50","VOLTE注册成功率":"96.06","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"02","分钟":"55","VOLTE注册成功率":"96.01","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.82","RTP上行丢包率":"0.27"},
{"时段":"03","分钟":"0","VOLTE注册成功率":"95.82","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.38","VOLTEMOS值":"3.82","RTP上行丢包率":"0.04"},
{"时段":"03","分钟":"5","VOLTE注册成功率":"95.81","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"96.41","VOLTEMOS值":"3.82","RTP上行丢包率":"0.03"},
{"时段":"03","分钟":"10","VOLTE注册成功率":"95.84","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"96.34","VOLTEMOS值":"3.82","RTP上行丢包率":"0.03"},
{"时段":"03","分钟":"15","VOLTE注册成功率":"95.80","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.41","VOLTEMOS值":"3.82","RTP上行丢包率":"0.04"},
{"时段":"03","分钟":"20","VOLTE注册成功率":"95.82","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.46","VOLTEMOS值":"3.82","RTP上行丢包率":"0.03"},
{"时段":"03","分钟":"25","VOLTE注册成功率":"95.86","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"96.43","VOLTEMOS值":"3.82","RTP上行丢包率":"0.03"},
{"时段":"03","分钟":"30","VOLTE注册成功率":"95.81","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"96.40","VOLTEMOS值":"3.82","RTP上行丢包率":"0.03"},
{"时段":"03","分钟":"35","VOLTE注册成功率":"95.83","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"96.45","VOLTEMOS值":"3.82","RTP上行丢包率":"0.03"},
{"时段":"03","分钟":"40","VOLTE注册成功率":"95.75","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.45","VOLTEMOS值":"3.82","RTP上行丢包率":"0.03"},
{"时段":"03","分钟":"45","VOLTE注册成功率":"95.85","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"96.39","VOLTEMOS值":"3.82","RTP上行丢包率":"0.04"},
{"时段":"03","分钟":"50","VOLTE注册成功率":"95.76","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"96.38","VOLTEMOS值":"3.82","RTP上行丢包率":"0.03"},
{"时段":"03","分钟":"55","VOLTE注册成功率":"95.84","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"96.35","VOLTEMOS值":"3.82","RTP上行丢包率":"0.03"},
{"时段":"04","分钟":"0","VOLTE注册成功率":"95.79","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"04","分钟":"5","VOLTE注册成功率":"95.78","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.94","VOLTEMOS值":"3.84","RTP上行丢包率":"0.28"},
{"时段":"04","分钟":"10","VOLTE注册成功率":"95.76","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.96","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"04","分钟":"15","VOLTE注册成功率":"95.81","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"04","分钟":"20","VOLTE注册成功率":"95.86","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"04","分钟":"25","VOLTE注册成功率":"95.85","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.94","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"04","分钟":"30","VOLTE注册成功率":"95.82","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.83","RTP上行丢包率":"0.30"},
{"时段":"04","分钟":"35","VOLTE注册成功率":"95.89","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.83","RTP上行丢包率":"0.30"},
{"时段":"04","分钟":"40","VOLTE注册成功率":"95.83","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"04","分钟":"45","VOLTE注册成功率":"95.83","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.90","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"04","分钟":"50","VOLTE注册成功率":"95.79","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.83","RTP上行丢包率":"0.29"},
{"时段":"04","分钟":"55","VOLTE注册成功率":"95.83","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.84","RTP上行丢包率":"0.30"},
{"时段":"05","分钟":"0","VOLTE注册成功率":"96.35","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.14","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.50","VOLTEMOS值":"3.84","RTP上行丢包率":"0.28"},
{"时段":"05","分钟":"5","VOLTE注册成功率":"96.38","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.57","VOLTEMOS值":"3.84","RTP上行丢包率":"0.28"},
{"时段":"05","分钟":"10","VOLTE注册成功率":"96.33","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.14","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.53","VOLTEMOS值":"3.85","RTP上行丢包率":"0.27"},
{"时段":"05","分钟":"15","VOLTE注册成功率":"96.34","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.14","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.51","VOLTEMOS值":"3.84","RTP上行丢包率":"0.28"},
{"时段":"05","分钟":"20","VOLTE注册成功率":"96.37","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.55","VOLTEMOS值":"3.84","RTP上行丢包率":"0.28"},
{"时段":"05","分钟":"25","VOLTE注册成功率":"96.32","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.14","VOLTE平均接续时长":"2.87","VOLTEeSRVCC成功率":"97.51","VOLTEMOS值":"3.83","RTP上行丢包率":"0.28"},
{"时段":"05","分钟":"30","VOLTE注册成功率":"96.29","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.14","VOLTE平均接续时长":"2.87","VOLTEeSRVCC成功率":"97.47","VOLTEMOS值":"3.84","RTP上行丢包率":"0.29"},
{"时段":"05","分钟":"35","VOLTE注册成功率":"96.29","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.14","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.47","VOLTEMOS值":"3.84","RTP上行丢包率":"0.28"},
{"时段":"05","分钟":"40","VOLTE注册成功率":"96.28","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.88","VOLTEeSRVCC成功率":"97.58","VOLTEMOS值":"3.84","RTP上行丢包率":"0.29"},
{"时段":"05","分钟":"45","VOLTE注册成功率":"96.34","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.14","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.51","VOLTEMOS值":"3.83","RTP上行丢包率":"0.28"},
{"时段":"05","分钟":"50","VOLTE注册成功率":"96.37","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.50","VOLTEMOS值":"3.85","RTP上行丢包率":"0.28"},
{"时段":"05","分钟":"55","VOLTE注册成功率":"96.36","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.15","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.49","VOLTEMOS值":"3.84","RTP上行丢包率":"0.28"},
{"时段":"06","分钟":"0","VOLTE注册成功率":"96.84","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.30","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"06","分钟":"5","VOLTE注册成功率":"96.78","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"06","分钟":"10","VOLTE注册成功率":"96.82","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.37","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"06","分钟":"15","VOLTE注册成功率":"96.86","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.30","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"06","分钟":"20","VOLTE注册成功率":"96.89","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.24","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"06","分钟":"25","VOLTE注册成功率":"96.85","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.34","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"06","分钟":"30","VOLTE注册成功率":"96.80","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.36","VOLTEMOS值":"3.84","RTP上行丢包率":"0.08"},
{"时段":"06","分钟":"35","VOLTE注册成功率":"96.84","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.29","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"06","分钟":"40","VOLTE注册成功率":"96.83","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.31","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"06","分钟":"45","VOLTE注册成功率":"96.82","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.36","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"06","分钟":"50","VOLTE注册成功率":"96.79","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.25","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"06","分钟":"55","VOLTE注册成功率":"96.83","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"97.25","VOLTEMOS值":"3.84","RTP上行丢包率":"0.07"},
{"时段":"07","分钟":"0","VOLTE注册成功率":"97.31","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.41","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"5","VOLTE注册成功率":"97.28","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.47","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"10","VOLTE注册成功率":"97.28","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.44","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"15","VOLTE注册成功率":"97.24","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.48","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"20","VOLTE注册成功率":"97.26","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.51","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"25","VOLTE注册成功率":"97.24","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.54","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"30","VOLTE注册成功率":"97.30","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.46","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"35","VOLTE注册成功率":"97.26","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.50","VOLTEMOS值":"3.84","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"40","VOLTE注册成功率":"97.25","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.49","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"45","VOLTE注册成功率":"97.26","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.53","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"50","VOLTE注册成功率":"97.25","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.49","VOLTEMOS值":"3.84","RTP上行丢包率":"0.06"},
{"时段":"07","分钟":"55","VOLTE注册成功率":"97.28","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.01","VOLTEeSRVCC成功率":"97.49","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"08","分钟":"0","VOLTE注册成功率":"97.57","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.29","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"08","分钟":"5","VOLTE注册成功率":"97.60","VOLTE语音接通率":"98.36","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.21","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"08","分钟":"10","VOLTE注册成功率":"97.62","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.22","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"08","分钟":"15","VOLTE注册成功率":"97.61","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.30","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"08","分钟":"20","VOLTE注册成功率":"97.64","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.16","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"08","分钟":"25","VOLTE注册成功率":"97.67","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.19","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"08","分钟":"30","VOLTE注册成功率":"97.60","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.20","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"08","分钟":"35","VOLTE注册成功率":"97.62","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.25","VOLTEMOS值":"3.84","RTP上行丢包率":"0.05"},
{"时段":"08","分钟":"40","VOLTE注册成功率":"97.65","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.26","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"08","分钟":"45","VOLTE注册成功率":"97.60","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.28","VOLTEMOS值":"3.83","RTP上行丢包率":"0.05"},
{"时段":"08","分钟":"50","VOLTE注册成功率":"97.55","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.99","VOLTEeSRVCC成功率":"97.28","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"08","分钟":"55","VOLTE注册成功率":"97.60","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"3.00","VOLTEeSRVCC成功率":"97.22","VOLTEMOS值":"3.83","RTP上行丢包率":"0.04"},
{"时段":"09","分钟":"0","VOLTE注册成功率":"97.66","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.96","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"09","分钟":"5","VOLTE注册成功率":"97.66","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.01","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"09","分钟":"10","VOLTE注册成功率":"97.75","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"09","分钟":"15","VOLTE注册成功率":"97.65","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.03","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"09","分钟":"20","VOLTE注册成功率":"97.70","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.08","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"09","分钟":"25","VOLTE注册成功率":"97.69","VOLTE语音接通率":"98.35","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.98","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"09","分钟":"30","VOLTE注册成功率":"97.76","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"97.04","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"09","分钟":"35","VOLTE注册成功率":"97.74","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.97","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"09","分钟":"40","VOLTE注册成功率":"97.70","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.96","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"09","分钟":"45","VOLTE注册成功率":"97.72","VOLTE语音接通率":"98.34","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.04","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"09","分钟":"50","VOLTE注册成功率":"97.65","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.96","VOLTEeSRVCC成功率":"97.02","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"09","分钟":"55","VOLTE注册成功率":"97.72","VOLTE语音接通率":"98.36","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.98","VOLTEeSRVCC成功率":"96.98","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"10","分钟":"0","VOLTE注册成功率":"97.70","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"10","分钟":"5","VOLTE注册成功率":"97.72","VOLTE语音接通率":"98.36","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"10","分钟":"10","VOLTE注册成功率":"97.63","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.90","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"10","分钟":"15","VOLTE注册成功率":"97.74","VOLTE语音接通率":"98.34","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.86","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"10","分钟":"20","VOLTE注册成功率":"97.73","VOLTE语音接通率":"98.36","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"10","分钟":"25","VOLTE注册成功率":"97.67","VOLTE语音接通率":"98.35","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.84","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"10","分钟":"30","VOLTE注册成功率":"97.74","VOLTE语音接通率":"98.35","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"10","分钟":"35","VOLTE注册成功率":"97.73","VOLTE语音接通率":"98.35","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.86","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"10","分钟":"40","VOLTE注册成功率":"97.71","VOLTE语音接通率":"98.36","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"10","分钟":"45","VOLTE注册成功率":"97.71","VOLTE语音接通率":"98.35","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"10","分钟":"50","VOLTE注册成功率":"97.72","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.81","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"10","分钟":"55","VOLTE注册成功率":"97.73","VOLTE语音接通率":"98.36","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"0","VOLTE注册成功率":"97.78","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"5","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.08","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"10","VOLTE注册成功率":"97.68","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.10","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"11","分钟":"15","VOLTE注册成功率":"97.73","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"20","VOLTE注册成功率":"97.70","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.05","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"25","VOLTE注册成功率":"97.69","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.04","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"30","VOLTE注册成功率":"97.70","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.02","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"35","VOLTE注册成功率":"97.69","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.08","VOLTEMOS值":"3.83","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"40","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.03","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"45","VOLTE注册成功率":"97.70","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.12","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"50","VOLTE注册成功率":"97.73","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"11","分钟":"55","VOLTE注册成功率":"97.66","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.10","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"12","分钟":"0","VOLTE注册成功率":"97.75","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.08","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"12","分钟":"5","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.16","VOLTEMOS值":"3.80","RTP上行丢包率":"0.09"},
{"时段":"12","分钟":"10","VOLTE注册成功率":"97.83","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.10","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"12","分钟":"15","VOLTE注册成功率":"97.85","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.14","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"12","分钟":"20","VOLTE注册成功率":"97.82","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.15","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"12","分钟":"25","VOLTE注册成功率":"97.80","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.16","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"12","分钟":"30","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.18","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"12","分钟":"35","VOLTE注册成功率":"97.80","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.15","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"12","分钟":"40","VOLTE注册成功率":"97.76","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"12","分钟":"45","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.01","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.16","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"12","分钟":"50","VOLTE注册成功率":"97.81","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.89","VOLTEeSRVCC成功率":"97.18","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"12","分钟":"55","VOLTE注册成功率":"97.84","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.00","VOLTE平均接续时长":"2.90","VOLTEeSRVCC成功率":"97.14","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"13","分钟":"0","VOLTE注册成功率":"98.02","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.00","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"13","分钟":"5","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.09","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"13","分钟":"10","VOLTE注册成功率":"98.06","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.03","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"13","分钟":"15","VOLTE注册成功率":"98.09","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.12","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"13","分钟":"20","VOLTE注册成功率":"98.09","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.96","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"13","分钟":"25","VOLTE注册成功率":"98.03","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.01","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"13","分钟":"30","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"13","分钟":"35","VOLTE注册成功率":"98.07","VOLTE语音接通率":"98.36","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.05","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"13","分钟":"40","VOLTE注册成功率":"98.13","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.03","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"13","分钟":"45","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.02","VOLTEMOS值":"3.83","RTP上行丢包率":"0.06"},
{"时段":"13","分钟":"50","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"13","分钟":"55","VOLTE注册成功率":"98.01","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.02","VOLTEMOS值":"3.82","RTP上行丢包率":"0.06"},
{"时段":"14","分钟":"0","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.19","VOLTEMOS值":"3.83","RTP上行丢包率":"0.08"},
{"时段":"14","分钟":"5","VOLTE注册成功率":"98.06","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.17","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"14","分钟":"10","VOLTE注册成功率":"98.03","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.24","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"14","分钟":"15","VOLTE注册成功率":"98.06","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.28","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"14","分钟":"20","VOLTE注册成功率":"98.03","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.20","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"14","分钟":"25","VOLTE注册成功率":"98.14","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.20","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"14","分钟":"30","VOLTE注册成功率":"98.12","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.25","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"14","分钟":"35","VOLTE注册成功率":"98.06","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.25","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"14","分钟":"40","VOLTE注册成功率":"98.01","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.25","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"14","分钟":"45","VOLTE注册成功率":"98.05","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.28","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"14","分钟":"50","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.25","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"14","分钟":"55","VOLTE注册成功率":"98.02","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.23","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"15","分钟":"0","VOLTE注册成功率":"98.04","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.80","RTP上行丢包率":"0.09"},
{"时段":"15","分钟":"5","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.03","VOLTEMOS值":"3.81","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"10","VOLTE注册成功率":"98.11","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.94","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"15","分钟":"15","VOLTE注册成功率":"98.03","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.96","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"15","分钟":"20","VOLTE注册成功率":"98.12","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.98","VOLTEMOS值":"3.81","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"25","VOLTE注册成功率":"98.05","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.97","VOLTEMOS值":"3.80","RTP上行丢包率":"0.09"},
{"时段":"15","分钟":"30","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.00","VOLTEMOS值":"3.81","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"35","VOLTE注册成功率":"98.13","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"15","分钟":"40","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.00","VOLTEMOS值":"3.82","RTP上行丢包率":"0.09"},
{"时段":"15","分钟":"45","VOLTE注册成功率":"98.11","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.96","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"15","分钟":"50","VOLTE注册成功率":"98.05","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.80","RTP上行丢包率":"0.10"},
{"时段":"15","分钟":"55","VOLTE注册成功率":"98.05","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.80","RTP上行丢包率":"0.09"},
{"时段":"16","分钟":"0","VOLTE注册成功率":"98.21","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"16","分钟":"5","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.03","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"16","分钟":"10","VOLTE注册成功率":"98.14","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.04","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"16","分钟":"15","VOLTE注册成功率":"98.20","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"16","分钟":"20","VOLTE注册成功率":"98.18","VOLTE语音接通率":"98.36","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"16","分钟":"25","VOLTE注册成功率":"98.18","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.99","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"16","分钟":"30","VOLTE注册成功率":"98.18","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.05","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"16","分钟":"35","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"16","分钟":"40","VOLTE注册成功率":"98.25","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.04","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"16","分钟":"45","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.02","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"16","分钟":"50","VOLTE注册成功率":"98.22","VOLTE语音接通率":"98.38","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.06","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"16","分钟":"55","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.05","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"17","分钟":"0","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"17","分钟":"5","VOLTE注册成功率":"98.26","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.14","VOLTEMOS值":"3.80","RTP上行丢包率":"0.09"},
{"时段":"17","分钟":"10","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"17","分钟":"15","VOLTE注册成功率":"98.20","VOLTE语音接通率":"98.39","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.14","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"17","分钟":"20","VOLTE注册成功率":"98.25","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.08","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"17","分钟":"25","VOLTE注册成功率":"98.17","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.09","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"17","分钟":"30","VOLTE注册成功率":"98.13","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.18","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"17","分钟":"35","VOLTE注册成功率":"98.15","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.13","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"17","分钟":"40","VOLTE注册成功率":"98.27","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.14","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"17","分钟":"45","VOLTE注册成功率":"98.20","VOLTE语音接通率":"98.41","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.13","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"17","分钟":"50","VOLTE注册成功率":"98.24","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"97.13","VOLTEMOS值":"3.80","RTP上行丢包率":"0.10"},
{"时段":"17","分钟":"55","VOLTE注册成功率":"98.18","VOLTE语音接通率":"98.37","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"97.07","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"18","分钟":"0","VOLTE注册成功率":"98.14","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.24","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"18","分钟":"5","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.27","VOLTEMOS值":"3.81","RTP上行丢包率":"0.06"},
{"时段":"18","分钟":"10","VOLTE注册成功率":"98.17","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.28","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"18","分钟":"15","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.18","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"18","分钟":"20","VOLTE注册成功率":"98.18","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.29","VOLTEMOS值":"3.81","RTP上行丢包率":"0.06"},
{"时段":"18","分钟":"25","VOLTE注册成功率":"98.15","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.18","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"18","分钟":"30","VOLTE注册成功率":"98.23","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.27","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"18","分钟":"35","VOLTE注册成功率":"98.19","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"97.18","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"18","分钟":"40","VOLTE注册成功率":"98.23","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"97.26","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"18","分钟":"45","VOLTE注册成功率":"98.22","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.24","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"18","分钟":"50","VOLTE注册成功率":"98.16","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.25","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"18","分钟":"55","VOLTE注册成功率":"98.20","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"97.19","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"19","分钟":"0","VOLTE注册成功率":"98.28","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.84","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"19","分钟":"5","VOLTE注册成功率":"98.33","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.90","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"19","分钟":"10","VOLTE注册成功率":"98.29","VOLTE语音接通率":"98.42","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"19","分钟":"15","VOLTE注册成功率":"98.23","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.82","RTP上行丢包率":"0.08"},
{"时段":"19","分钟":"20","VOLTE注册成功率":"98.24","VOLTE语音接通率":"98.47","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"19","分钟":"25","VOLTE注册成功率":"98.31","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"19","分钟":"30","VOLTE注册成功率":"98.23","VOLTE语音接通率":"98.45","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"19","分钟":"35","VOLTE注册成功率":"98.26","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"19","分钟":"40","VOLTE注册成功率":"98.27","VOLTE语音接通率":"98.40","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"19","分钟":"45","VOLTE注册成功率":"98.31","VOLTE语音接通率":"98.43","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.81","RTP上行丢包率":"0.07"},
{"时段":"19","分钟":"50","VOLTE注册成功率":"98.27","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"19","分钟":"55","VOLTE注册成功率":"98.27","VOLTE语音接通率":"98.44","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.91","VOLTEMOS值":"3.82","RTP上行丢包率":"0.07"},
{"时段":"20","分钟":"0","VOLTE注册成功率":"98.04","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.76","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"20","分钟":"5","VOLTE注册成功率":"98.11","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.81","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"20","分钟":"10","VOLTE注册成功率":"98.02","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.75","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"20","分钟":"15","VOLTE注册成功率":"98.04","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.70","VOLTEMOS值":"3.80","RTP上行丢包率":"0.08"},
{"时段":"20","分钟":"20","VOLTE注册成功率":"98.10","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.75","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"20","分钟":"25","VOLTE注册成功率":"98.04","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.77","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"20","分钟":"30","VOLTE注册成功率":"98.04","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.78","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"20","分钟":"35","VOLTE注册成功率":"98.09","VOLTE语音接通率":"98.48","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.77","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"20","分钟":"40","VOLTE注册成功率":"98.12","VOLTE语音接通率":"98.46","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"20","分钟":"45","VOLTE注册成功率":"98.11","VOLTE语音接通率":"98.50","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.80","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"20","分钟":"50","VOLTE注册成功率":"98.04","VOLTE语音接通率":"98.51","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.80","VOLTEMOS值":"3.81","RTP上行丢包率":"0.08"},
{"时段":"20","分钟":"55","VOLTE注册成功率":"98.06","VOLTE语音接通率":"98.49","VOLTE语音掉话率":"0.06","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.77","VOLTEMOS值":"3.81","RTP上行丢包率":"0.09"},
{"时段":"21","分钟":"0","VOLTE注册成功率":"97.97","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"21","分钟":"5","VOLTE注册成功率":"97.89","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"21","分钟":"10","VOLTE注册成功率":"97.94","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.95","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"21","分钟":"15","VOLTE注册成功率":"97.90","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"21","分钟":"20","VOLTE注册成功率":"97.97","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"21","分钟":"25","VOLTE注册成功率":"97.96","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"21","分钟":"30","VOLTE注册成功率":"97.91","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.95","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"21","分钟":"35","VOLTE注册成功率":"97.95","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.84","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"21","分钟":"40","VOLTE注册成功率":"97.94","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.95","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"21","分钟":"45","VOLTE注册成功率":"97.93","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.90","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"21","分钟":"50","VOLTE注册成功率":"97.98","VOLTE语音接通率":"98.52","VOLTE语音掉话率":"0.05","VOLTE平均接续时长":"2.94","VOLTEeSRVCC成功率":"96.94","VOLTEMOS值":"3.81","RTP上行丢包率":"0.13"},
{"时段":"21","分钟":"55","VOLTE注册成功率":"97.94","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.95","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"22","分钟":"0","VOLTE注册成功率":"97.81","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.80","RTP上行丢包率":"0.12"},
{"时段":"22","分钟":"5","VOLTE注册成功率":"97.80","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.88","VOLTEMOS值":"3.81","RTP上行丢包率":"0.13"},
{"时段":"22","分钟":"10","VOLTE注册成功率":"97.82","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"22","分钟":"15","VOLTE注册成功率":"97.74","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.86","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"22","分钟":"20","VOLTE注册成功率":"97.81","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.92","VOLTEMOS值":"3.81","RTP上行丢包率":"0.13"},
{"时段":"22","分钟":"25","VOLTE注册成功率":"97.79","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.81","RTP上行丢包率":"0.13"},
{"时段":"22","分钟":"30","VOLTE注册成功率":"97.78","VOLTE语音接通率":"98.59","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.90","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"22","分钟":"35","VOLTE注册成功率":"97.79","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.81","RTP上行丢包率":"0.13"},
{"时段":"22","分钟":"40","VOLTE注册成功率":"97.77","VOLTE语音接通率":"98.60","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.84","VOLTEMOS值":"3.80","RTP上行丢包率":"0.12"},
{"时段":"22","分钟":"45","VOLTE注册成功率":"97.75","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.89","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"22","分钟":"50","VOLTE注册成功率":"97.81","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"22","分钟":"55","VOLTE注册成功率":"97.83","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.93","VOLTEMOS值":"3.81","RTP上行丢包率":"0.12"},
{"时段":"23","分钟":"0","VOLTE注册成功率":"97.57","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.81","RTP上行丢包率":"0.10"},
{"时段":"23","分钟":"5","VOLTE注册成功率":"97.56","VOLTE语音接通率":"98.54","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.81","RTP上行丢包率":"0.10"},
{"时段":"23","分钟":"10","VOLTE注册成功率":"97.57","VOLTE语音接通率":"98.53","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.78","VOLTEMOS值":"3.81","RTP上行丢包率":"0.10"},
{"时段":"23","分钟":"15","VOLTE注册成功率":"97.54","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.78","VOLTEMOS值":"3.81","RTP上行丢包率":"0.10"},
{"时段":"23","分钟":"20","VOLTE注册成功率":"97.53","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.85","VOLTEMOS值":"3.81","RTP上行丢包率":"0.11"},
{"时段":"23","分钟":"25","VOLTE注册成功率":"97.50","VOLTE语音接通率":"98.56","VOLTE语音掉话率":"0.02","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.81","RTP上行丢包率":"0.10"},
{"时段":"23","分钟":"30","VOLTE注册成功率":"97.52","VOLTE语音接通率":"98.55","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.78","VOLTEMOS值":"3.81","RTP上行丢包率":"0.11"},
{"时段":"23","分钟":"35","VOLTE注册成功率":"97.62","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.78","VOLTEMOS值":"3.80","RTP上行丢包率":"0.10"},
{"时段":"23","分钟":"40","VOLTE注册成功率":"97.60","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.04","VOLTE平均接续时长":"2.93","VOLTEeSRVCC成功率":"96.76","VOLTEMOS值":"3.81","RTP上行丢包率":"0.10"},
{"时段":"23","分钟":"45","VOLTE注册成功率":"97.54","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.92","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.82","RTP上行丢包率":"0.10"},
{"时段":"23","分钟":"50","VOLTE注册成功率":"97.56","VOLTE语音接通率":"98.58","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.82","VOLTEMOS值":"3.81","RTP上行丢包率":"0.10"},
{"时段":"23","分钟":"55","VOLTE注册成功率":"97.56","VOLTE语音接通率":"98.57","VOLTE语音掉话率":"0.03","VOLTE平均接续时长":"2.91","VOLTEeSRVCC成功率":"96.87","VOLTEMOS值":"3.80","RTP上行丢包率":"0.10"},

];

 