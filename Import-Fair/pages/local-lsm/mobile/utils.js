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
		case "UC网站访问":
			iconName="018.png";
			break;
		case "QQ音乐":
			iconName="019.png";
			break;
		case "阿基米德":
			iconName="020.png";
			break;
		case "奇艺影音":
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
		case "QQ应用宝":
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
		case "苹果云服务":
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
		case "携程旅行":
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
		case "优酷网":
			iconName="089.png";
			break;
		case "有你短信":
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
		case "微信抢红包":
			iconName="095.png";
			break;
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
		for(var kpiI=0;kpiI<configKpiArr.length;kpiI++){
			configKpiArr[kpiI].generateId=kpiI;
		}
		LSMConsts.kpiChooserSource=configKpiArr;
		//保障区域列表
		dm.getBaseHotspotsList(null,function(list){
			var areas=[];
			for(var i=0;i<list.length;i++){
				if(list[i].hot_name.indexOf("迪士尼")==-1){
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
SUtils.updeteBaseHotspotsById=function(id,callback){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getBaseHotspots({id:id,isDefault:false},function(result){
		var content= JSON.parse(result[0].content);
		LSMConsts.lng=content.lon;
		LSMConsts.lat=content.lat;
		LSMConsts.area=content.supportName;
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
				obj[key]=(record[key]).toFixed(2);
			}else if(key.indexOf("率")!=-1){
				obj[key]=(record[key]*100).toFixed(2);
			}else if(key.indexOf("流量比")!=-1){
				obj[key]=(record[key]*100).toFixed(2);
			}else if(key.indexOf("流量")!=-1){
				obj[key]=(record[key]/LSMConsts.byteDivider).toFixed(2);
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

/** 执行兼容性处理方法*/
(function () { 
	SUtils.extendBaseFunction();
}());



 