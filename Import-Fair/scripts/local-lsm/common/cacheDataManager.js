var LSMScreen = LSMScreen || {};
/**
 * 端到端大屏数据请求
 * @class LSMScreen.CacheDataManager
 * @classdesc 端到端大屏数据请求管理
 */
LSMScreen.CacheDataManager=function(){
	if(LSMScreen.CacheDataManager.instance==null){
		this.initialize.apply(this, arguments);
	}else{
		throw("重复创建CacheDataManager");
	}
};
LSMScreen.CacheDataManager.DEFAULTIPPORT="http://10.222.42.22:8080";
LSMScreen.CacheDataManager.IPPORT=eastcom.baseURL.indexOf("localhost")==-1?
		eastcom.baseURL.substring(0,eastcom.baseURL.lastIndexOf("/"))+""
		:LSMScreen.CacheDataManager.DEFAULTIPPORT;
LSMScreen.CacheDataManager.baseUrl=LSMScreen.CacheDataManager.IPPORT+'/lsmWs';

LSMScreen.CacheDataManager.StreamUrl =LSMScreen.CacheDataManager.IPPORT;

//LSMScreen.CacheDataManager.baseUrl=LSMScreen.CacheDataManager.IPPORT+'/lsmWs';
LSMScreen.CacheDataManager.minBack=-10;
LSMScreen.CacheDataManager.formatSpecialCompare0="yyyy-MM-dd 00:00:00";
LSMScreen.CacheDataManager.formatSpecialCompare="yyyy-MM-dd hh:mm:ss";
LSMScreen.CacheDataManager.specificTbTime=1440;
LSMScreen.CacheDataManager.doSmooth=true;
LSMScreen.CacheDataManager.roadCountry='蒙古国,新加坡,马来西亚,印度尼西亚,缅甸,泰国,老挝,柬埔寨,越南,文莱和菲律宾,伊朗,伊拉克,土耳其,叙利亚,约旦,黎巴嫩,以色列,巴勒斯坦,沙特阿拉伯,也门,阿曼,阿联酋,卡塔尔,科威特,巴林,希腊,塞浦路斯和埃及的西奈半岛,印度,巴基斯坦,孟加拉,阿富汗,斯里兰卡,马尔代夫,尼泊尔,不丹,哈萨克斯坦,乌兹别克斯坦,土库曼斯坦,塔吉克斯坦,吉尔吉斯斯坦,俄罗斯,乌克兰,白俄罗斯,格鲁吉亚,阿塞拜疆,亚美尼亚,摩尔多瓦,波兰,立陶宛,爱沙尼亚,拉脱维亚,捷克,斯洛伐克,匈牙利,斯洛文尼亚,克罗地亚,波黑,黑山,塞尔维亚,阿尔巴尼亚,罗马尼亚,保加利亚,马其顿';
LSMScreen.CacheDataManager.provIncetry='安徽,澳门,北京,重庆,福建,甘肃,广东,广西,贵州,海南,河北,黑龙江,河南,湖北,湖南,江苏,江西,吉林,辽宁,内蒙古,宁夏,青海,山东,上海,陕西,山西,四川,台湾,天津,香港,新疆,西藏,云南,浙江';

/**
 * DataManager实例
 * @private
 * @type {LSMScreen.CacheDataManager} 
 */
LSMScreen.CacheDataManager.instance=null;

/** 
 * 获取实例
 * @protected
 * @function 
 * @returns {LSMScreen.CacheDataManager} DataManager实例
 */
LSMScreen.CacheDataManager.getInstance=function(){
	LSMScreen.CacheDataManager.doSmooth=$.cookie('dataSmooth')=="true";
	if(LSMScreen.CacheDataManager.instance==null){
		return new LSMScreen.CacheDataManager();
	}else{
		return LSMScreen.CacheDataManager.instance;
	}
};

LSMScreen.CacheDataManager.prototype.initialize=function(maskParent){
	LSMScreen.CacheDataManager.instance=this;
};

LSMScreen.CacheDataManager.prototype.getStreamRecord = function(param,callBack_,failCallBack_)
{
	var config={
		cache:true,
		smooth:false,
		ids:'',
		kpis:'time'
	}; 
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/stream/lsm-hot-kpi'
			+'?cache='+config.cache
			+'&smooth='+LSMScreen.CacheDataManager.doSmooth
			+'&ids='+config.ids
			+'&kpis='+config.kpis;
	
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//权限
LSMScreen.CacheDataManager.prototype.getCiieAuthList = function(param,callBack_,failCallBack_)
{
	var config={
			"name":"",
			"tel":"",
			"descr":""
		};
		config=$.extend(config,param);
		var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/sys-cfg-queryTel';
		
		SUtils.crossSafeAjax({
	  		type:"POST",
	  		async:false,
	  		dataType:"application/json",
	  		contentType:"application/json",
	  		processData:false,
	  		url:encodeURI(_url),
	  		data : JSON.stringify(config),
	  		success : function(result_)
	  		{
	  			if(callBack_!=null)
	  			{
	  				callBack_(result_);
	  			}
	  		},
	  		error:failCallBack_
		});
};
/////////////////////////////漫游/////////////////////////////
//国际漫入
LSMScreen.CacheDataManager.prototype.getIntlRoamIn = function(param,callBack_,failCallBack_)
{
	var config={
		intl_name:null,
		hot_name:null
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-intl?1=1&smooth='+LSMScreen.CacheDataManager.doSmooth;
	
	if(!utils.isStringEmpty(config.hot_name)){
		_url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-hotintl?1=1&smooth='+LSMScreen.CacheDataManager.doSmooth;
		_url+='&hot_name='+config.hot_name;
	}
	if(!utils.isStringEmpty(config.intl_name)){
		_url+='&intl_name='+config.intl_name;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//国际漫入趋势
LSMScreen.CacheDataManager.prototype.getIntlRoamInTrend = function(param,callBack_,failCallBack_)
{
	var config={
			intl_name:null,
			hot_name:null
		};
		config=$.extend(config,param);
		var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-intl-trend?1=1';
		
		if(!utils.isStringEmpty(config.hot_name)){
			_url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-hotintl-trend?1=1';
			_url+='&hot_name='+config.hot_name;
		}
		if(!utils.isStringEmpty(config.intl_name)){
			_url+='&intl_name='+config.intl_name;
		}
		_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
		SUtils.crossSafeAjax({
	  		type:"GET",
	  		async:false,
	  		dataType:"application/json",
	  		contentType:"application/json",
	  		processData:false,
	  		url:encodeURI(_url),
	  		success : function(result_) 
	  		{
	  			if(callBack_!=null)
	  			{
	  				callBack_(result_);
	  			}
	  		},
	  		error:failCallBack_
		});
};
//省际漫入
LSMScreen.CacheDataManager.prototype.getProvRoamIn = function(param,callBack_,failCallBack_)
{
	var config={
		intl_name:null,
		hot_name:null
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-pro?1=1';
	
	if(!utils.isStringEmpty(config.hot_name)){
		_url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-hotpro?1=1';
		_url+='&hot_name='+config.hot_name;
	}
	if(!utils.isStringEmpty(config.intl_name)){
		_url+='&intl_name='+config.intl_name;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

//省际漫入 趋势
LSMScreen.CacheDataManager.prototype.getProvRoamInTrend = function(param,callBack_,failCallBack_)
{
	var config={
		intl_name:null,
		hot_name:null
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-pro-trend?1=1';
	
	if(!utils.isStringEmpty(config.hot_name)){
		_url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-hotpro-trend?1=1';
		_url+='&hot_name='+config.hot_name;
	}
	if(!utils.isStringEmpty(config.intl_name)){
		_url+='&intl_name='+config.intl_name;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//TOPN
LSMScreen.CacheDataManager.prototype.getIntlRoamTopN = function(param,callBack_,failCallBack_)
{
	var config={
		intl_name:null,
		hot_name:null,
		topN:8
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-intl-top?topN='+config.topN;
	if(!utils.isStringEmpty(config.hot_name)&&config.hot_name!="上海"){
		_url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-hotintl-top?topN='+config.topN+'&hot_name='+config.hot_name;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	if(!utils.isStringEmpty(config.intl_name)){
		_url+='&intl_name='+config.intl_name;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

LSMScreen.CacheDataManager.prototype.getProRoamTopN = function(param,callBack_,failCallBack_)
{
	var config={
		intl_name:null,
		hot_name:null,
		topN:8
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-pro-top?topN='+config.topN;
	if(!utils.isStringEmpty(config.hot_name)&&config.hot_name!="上海"){
		_url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-hotpro-top?topN='+config.topN+'&hot_name='+config.hot_name;
	}
	if(!utils.isStringEmpty(config.intl_name)){
		_url+='&intl_name='+config.intl_name;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//终端
LSMScreen.CacheDataManager.prototype.getTerminalTopN = function(param,callBack_,failCallBack_)
{
	var config={
		intl_name:null,
		hot_name:null,
		topN:8,
		roamType:'intl'//intl pro
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-'+config.roamType+'-tm-top?topN='+config.topN;
	if(!utils.isStringEmpty(config.hot_name)){
		_url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-'+config.roamType+'-tm-top?hot_name='+config.hot_name+'&topN='+config.topN;
	}
	if(!utils.isStringEmpty(config.intl_name)){
		_url+='&intl_name='+config.intl_name;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//应用
LSMScreen.CacheDataManager.prototype.getAppRank = function(param,callBack_,failCallBack_)
{
	var config={
		intl_name:null,
		hot_name:null,
		roamType:'intl'//intl pro
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-hot'+config.roamType+'-app?1=1';
	if(utils.isStringEmpty(config.hot_name)){
		_url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-'+config.roamType+'-app?1=1';
	}
	if(!utils.isStringEmpty(config.hot_name)){
		_url += '&hot_name='+config.hot_name;
	}
	if(!utils.isStringEmpty(config.intl_name)){
		_url+='&intl_name='+config.intl_name;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};


//累计用户数
LSMScreen.CacheDataManager.prototype.getUserDistAll = function(param,callBack_,failCallBack_)
{
	var config={
		intl_name:null,
		hot_name:null,
		roamType:'intl'//intl pro
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-userdistall?1=1';;

	if(!utils.isStringEmpty(config.hot_name)){
		_url += '&hotspot='+config.hot_name;
	}
	if(!utils.isStringEmpty(config.intl_name)){
		_url+='&ids='+config.intl_name;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

//累计用户数国家//省份
LSMScreen.CacheDataManager.prototype.getUserDist = function(param,callBack_,failCallBack_)
{
	var config={
		hot_name:null,
		topN:null,
		roamType:'intl'//intl pro
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-userdist'+config.roamType+'?1=1&topN='+config.topN;
	if(!utils.isStringEmpty(config.hot_name)){
		_url+='&hotspot='+config.hot_name;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

//趋势(元首参会国,省际,国际及港澳台)
LSMScreen.CacheDataManager.prototype.getNewRoamInTrend = function(param,callBack_,failCallBack_)
{
	var config={
			hotspot:null,
			type:null//intl pro
		};
		config=$.extend(config,param);
		var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-myv-userdistall-trend??1=1';
		
		if(!utils.isStringEmpty(config.type)){
			_url+='&type='+config.type;
		}
		if(!utils.isStringEmpty(config.hotspot)){
			_url+='&hotspot='+config.hotspot;
		}
		_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
		SUtils.crossSafeAjax({
	  		type:"GET",
	  		async:false,
	  		dataType:"application/json",
	  		contentType:"application/json",
	  		processData:false,
	  		url:encodeURI(_url),
	  		success : function(result_) 
	  		{
	  			if(callBack_!=null)
	  			{
	  				callBack_(result_);
	  			}
	  		},
	  		error:failCallBack_
		});
};


//////////////////////////////////////
//热点指标
LSMScreen.CacheDataManager.prototype.getHotspotKpi = function(param,callBack_,failCallBack_)
{
	var config={
		ids:null,
		time:null
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/lsm-hot-kpi?cache=true';
	
	if(config.ids!=null&&config.ids!=''){
		_url+='&ids='+config.ids;
	}
	if(config.time!=null&&config.time!=''){
		_url+='&time='+config.time;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//热点指标
LSMScreen.CacheDataManager.prototype.getHotspotKpiTrend= function(param,callBack_,failCallBack_)
{
	var config={
		ids:null,
		time:null
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/stream/lsm-hot-kpi-trend?cache=true';
	
	if(config.ids!=null&&config.ids!=''){
		_url+='&hotspot='+config.ids;
	}
	if(config.time!=null&&config.time!=''){
		_url+='&time='+config.time;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
/*  		data:JSON.stringify(config),*/
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//4G流量趋势图
LSMScreen.CacheDataManager.prototype.getHotkpiTrend = function(param,callBack_,failCallBack_)
{
	var config={
		ids:null
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/stream/lsm-hot-kpi-trend?cache=true';
	
	if(config.ids!=null&&config.ids!=''){
		_url+='&hotspot='+config.ids;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//4G话务趋势图
LSMScreen.CacheDataManager.prototype.getHotlteWg = function(param,callBack_,failCallBack_)
{
	var config={
		ids:null
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.StreamUrl+'/lsmWs/sml/pm/wg/lsm-hot-lte-wg-trend?cache=true';
	
	if(config.ids!=null&&config.ids!=''){
		_url+='&hotspot='+config.ids;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//top趋势图
LSMScreen.CacheDataManager.prototype.getHotspotrank= function(param,callBack_,failCallBack_)
{
	var config={
		ids:null,
		time_bool:false,
		num:6,
		sortKey:"总用户数"
	};
	var time=utils.getNowstrhourOfgetMinutes(-20,"-",":",config.time_bool);
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.StreamUrl+'/stream/union/majors/hotspot-time-rank?&order=desc&sortKey='+config.sortKey+'&num='+config.num+'&granularity=5&exclude0=true&time='+time;
	if(config.ids!=null&&config.ids!=''){
		_url+='&hotspot='+config.ids;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//top5趋势图
LSMScreen.CacheDataManager.prototype.getHotspotTimerank= function(param,callBack_,failCallBack_)
{
	var config={
		hotspot:null,
		major:null,
		minor:null,
		time_bool:false,
		num:5,
		sortKey:"总用户数"
	};
	var time=utils.getNowstrhourOfgetMinutes(-20,"-",":",config.time_bool);
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.StreamUrl+'/stream/union/apps/hotspot-time-rank?time='+time+'&order=desc&sortKey='+config.sortKey+'&num='+config.num+'&granularity=5&exclude0=false';
	if(config.hotspot!=null&&config.hotspot!=''){
		_url+='&hotspot='+config.hotspot;
	}
	if(config.major!=null&&config.major!=''){
		_url+='&major='+config.major;
	}
	if(!utils.isStringEmpty(config.minor)){
		_url+=config.minor;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//终端分布图
LSMScreen.CacheDataManager.prototype.getIsmTerminalRank= function(param,callBack_,failCallBack_)
{
	var config={
		hotspot:null,
		type:"brand",
		topN:"5",
		terminal_brand:""
	};
	config=$.extend(config,param);
	if(config.terminal_brand!=null&&config.terminal_brand!=''){
		config.type="model";
		config.topN="10";
	}
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-terminalRank';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		data:JSON.stringify(config),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//政企信息
LSMScreen.CacheDataManager.prototype.getIsmTerm= function(param,callBack_,failCallBack_)
{
	/*var config={
		hotspot:null,
		type:"model",
		topN:"10",
		terminal_brand:""
	};
	config=$.extend(config,param);*/
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-gl-jk';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		/*data:JSON.stringify(config),*/
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//全网政企信息
LSMScreen.CacheDataManager.prototype.getIsmallTerm= function(param,callBack_,failCallBack_)
{
	var config={
		type:""
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-gl-jk';
	if(utils.isStringEmpty(config.type)){
		_url+='?type=全网';
	}else{
		_url+='?type='+config.type;
	}
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
/*  		data:JSON.stringify(config),*/
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//家庭宽带
LSMScreen.CacheDataManager.prototype.getFbbWg= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-fbb-wg';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}

//家庭宽带小时
LSMScreen.CacheDataManager.prototype.getFbbWgH= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-fbbh-wg';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}

//家庭宽带 趋势
LSMScreen.CacheDataManager.prototype.getFbbWgTrend= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-fbb-wg-trend';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}

//家庭宽带小时
LSMScreen.CacheDataManager.prototype.getFbbWgHTrend= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-fbbh-wg-trend';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}

//车联网
LSMScreen.CacheDataManager.prototype.getApnln= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-apnln';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}

//网管15分钟
LSMScreen.CacheDataManager.prototype.getIsmAllltewg= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-lte-wg';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//网管15分钟
LSMScreen.CacheDataManager.prototype.getIsmHotltewg= function(param,callBack_,failCallBack_)
{
	var config={
			ids:null,
			time:null
		};
		config=$.extend(config,param);
		var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-hot-lte-wg?cache=true';
		
		if(config.ids!=null&&config.ids!=''){
			_url+='&ids='+config.ids;
		}
		if(config.time!=null&&config.time!=''){
			_url+='&time='+config.time;
		}
		_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		data:JSON.stringify(config),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//网管15分钟ALL
LSMScreen.CacheDataManager.prototype.getIsmAllltewgTrend= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-lte-wg-trend';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//进博会 网管15分钟ALL
LSMScreen.CacheDataManager.prototype.getIsmHotlteTrend= function(param,callBack_,failCallBack_)
{
	
	var config={
			ids:null,
			time:null
		};
		config=$.extend(config,param);
		var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-hot-lte-wg-trend?cache=true';
		
		if(config.ids!=null&&config.ids!=''){
			_url+='&ids='+config.ids;
		}
		if(config.time!=null&&config.time!=''){
			_url+='&time='+config.time;
		}
		_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//网管60分钟
LSMScreen.CacheDataManager.prototype.getIsmAllgsmwg= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-gsm-wg';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//网管60分钟
LSMScreen.CacheDataManager.prototype.getIsmHotgsm= function(param,callBack_,failCallBack_)
{

	var config={
			ids:null,
			time:null
		};
		config=$.extend(config,param);
		var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-hot-gsm-wg?cache=true';
		
		if(config.ids!=null&&config.ids!=''){
			_url+='&ids='+config.ids;
		}
		if(config.time!=null&&config.time!=''){
			_url+='&time='+config.time;
		}
		_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	config=$.extend(config,param);
	SUtils.crossSafeAjax({
		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		/*data:JSON.stringify(config),*/
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//网管60分钟
LSMScreen.CacheDataManager.prototype.getIsmAllgsmwgTrend= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-gsm-wg-trend';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//进博会 网管60分钟all
LSMScreen.CacheDataManager.prototype.getIsmHotgsmTrend= function(param,callBack_,failCallBack_)
{
	var config={
			ids:null,
			time:null
		};
		config=$.extend(config,param);
		var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-hot-gsm-wg-trend?cache=true';
		
		if(config.ids!=null&&config.ids!=''){
			_url+='&ids='+config.ids;
		}
		if(config.time!=null&&config.time!=''){
			_url+='&time='+config.time;
		}
		_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//信令
LSMScreen.CacheDataManager.prototype.getIsmallkpi= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-kpi';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//信令
LSMScreen.CacheDataManager.prototype.getIsmallkpiTrend= function(param,callBack_,failCallBack_)
{
		var config={
				ids:null,
				time:null
			};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-kpi-trend';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(config),
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//CMNET
LSMScreen.CacheDataManager.prototype.getCMNET= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-cmnet-wg';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//CMNET
LSMScreen.CacheDataManager.prototype.getCMNETTrend= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-cmnet-wg-trend';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
LSMScreen.CacheDataManager.prototype.getCMNEPtnflow= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-ptnflow';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//查询天气
LSMScreen.CacheDataManager.prototype.getWeather= function(param,callBack_,failCallBack_)
{
	var config={
			stat_time:null
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cfg-weather';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	if(config.stat_time!=null&&config.stat_time!=''){
		_url+='&stat_time='+config.stat_time;
	}
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//查询日程安排
LSMScreen.CacheDataManager.prototype.getSchedule= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-msg-rcap';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//网络安全
LSMScreen.CacheDataManager.prototype.getIsmNetsafety= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-net-safety';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//添加指标
LSMScreen.CacheDataManager.prototype.getIsmAdu= function(param,callBack_,failCallBack_)
{
	var _config={
			"type":"CIIENEW_OVERVIEW",//自定义的分类
			"id":$.cookie('phoneNum'),//自定义的id
			"content":null//配置内容 字符串
		};
	var config={
			"tableName":"dm_co_ba_cfg_bs",
			"type":"adu",//第一次插入时请使用insert
			"conditions":["id","type"],
			"data":null
	};
	_config=$.extend(_config,param);
	config.data=_config;
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/update/common';
	if(config.ids!=null&&config.ids!=''){
		_url+='?ids='+config.ids;
	}
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		data:JSON.stringify(config),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//修改指标
/*LSMScreen.CacheDataManager.prototype.getIsmUpdate= function(param,callBack_,failCallBack_)
{
	var _config={
			"type":"CIIENEW_OVERVIEW",//自定义的分类
			"id":$.cookie('phoneNum'),//自定义的id
			"content":null//配置内容 字符串
		};
	var config={
			"tableName":"dm_co_ba_cfg_bs",
			"type":"update",//第一次插入时请使用insert
			"conditions":["id"],
			"data":null
	};
	_config=$.extend(_config,param);
	config.data=_config;
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/update/common';
	if(config.ids!=null&&config.ids!=''){
		_url+='?ids='+config.ids;
	}
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		data:JSON.stringify(config),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}*/
//查询指标
LSMScreen.CacheDataManager.prototype.getIsmEaebmCfg= function(param,callBack_,failCallBack_)
{
	var config={
			id:null
		};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/eaebm-bsParCfg?type=CIIENEW_OVERVIEW';
	if(config.id!=null&&config.id!=''){
		_url+='&id='+config.id;
	}
	SUtils.crossSafeAjax({
		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}


//查询重要网站
LSMScreen.CacheDataManager.prototype.getAllWebsite= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-site-wg';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}


//劣化渲染
LSMScreen.CacheDataManager.prototype.getThresCfg= function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/sys-thres-cfg-2';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	_url+='&group_id=jbh123456789';
	SUtils.crossSafeAjax({
		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}

//添加指标
LSMScreen.CacheDataManager.prototype.getIsmAduto= function(param,callBack_,failCallBack_)
{
	var _config={
			"type":"CIIE_RIGHT",//自定义的分类
			"id":$.cookie('phoneNum'),//自定义的id
			"content":null//配置内容 字符串
		};
	var config={
			"tableName":"dm_co_ba_cfg_bs",
			"type":"adu",//第一次插入时请使用insert
			"conditions":["id","type"],
			"data":null
	};
	_config=$.extend(_config,param);
	config.data=_config;
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/update/common';
	if(config.ids!=null&&config.ids!=''){
		_url+='?ids='+config.ids;
	}
	SUtils.crossSafeAjax({
		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		data:JSON.stringify(config),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//查询指标
LSMScreen.CacheDataManager.prototype.getIsmEaebmCfgto= function(param,callBack_,failCallBack_)
{
	var config={
			id:null
		};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/eaebm-bsParCfg?type=CIIE_RIGHT';
	if(config.id!=null&&config.id!=''){
		_url+='&id='+config.id;
	}
	SUtils.crossSafeAjax({
		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}



//小区指标
LSMScreen.CacheDataManager.prototype.getCellKpiTopN = function(param,callBack_,failCallBack_)
{
	var config={
			lat:'',
			lon:'',
		netType:'',//lte gsm
		hotspot:'',
		lteType:'',//TDD FDD
		sidx:'',
		sord:'desc',
		topN:'50',
		baseStationKey:'',
		kpis:'',
		ids:'',
		filterFormat:'',
		ifId:'',
		baseStationLaccis:''
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/lsm-cell-kpi?cache=true'
				+'&sidx='+config.sidx
				+'&topN='+config.topN;
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	if(config.lat!=null&&config.lat!=''){
		_url+='&lat='+config.lat;
	}
	if(config.sidx=='ulmeannl_prb'||config.sidx=='lte_ul_interfere_level_'){
		_url+='&sord=asc';
	}else{
		_url+='&sord='+config.sord;
	}
	if(config.lon!=null&&config.lon!=''){
		_url+='&lon='+config.lon;
	}
	if(config.netType!=null&&config.netType!=''){
		_url+='&netType='+config.netType;
	}
	if(config.hotspot!=null&&config.hotspot!=''){
		_url+='&hotspot='+config.hotspot;
	}
	if(config.lteType!=null&&config.lteType!=''){
		_url+='&lteType='+config.lteType;
	}
	if(config.ids!=null&&config.ids!=''){
		_url+='&ids='+config.ids;
	}
	if(config.filterFormat!=null&&config.filterFormat!=''){
		_url+='&filterFormat='+config.filterFormat;
	}
	if(config.kpis!=null&&config.kpis!=''){
		_url+='&kpis='+config.kpis;
	}
	if(config.baseStationKey!=null&&config.baseStationKey!=''){
		_url+='&baseStationKey='+config.baseStationKey;
	}
	if(config.ifId!=null&&config.ifId!=''){
		_url+='&ifId='+config.ifId;
	}
	if(config.baseStationLaccis!=null&&config.baseStationLaccis!=''&&config.baseStationLaccis!=""){
		_url+='&baseStationLaccis='+config.baseStationLaccis;
	}		
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}

//热力图时间点
LSMScreen.CacheDataManager.prototype.getHeatTimeLine = function(param,callBack_,failCallBack_)
{
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/getHotChartTimes';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//路段图数据
LSMScreen.CacheDataManager.prototype.getRoadData = function(param,callBack_,failCallBack_)
{
    var config={
        hotspot:'',
        time:''
    };
    config=$.extend(config,param);
    //var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/getHotChartData?hotspot='+config.hotspot+'&time='+config.time;
    var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-grid?8=8';
    _url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
    SUtils.crossSafeAjax({
        type:"GET",
        async:false,
        dataType:"application/json",
        contentType:"application/json",
        processData:false,
        url:encodeURI(_url),
        success : function(result_)
        {
            if(callBack_!=null)
            {
                callBack_(result_);
            }
        },
        error:failCallBack_
    });
};
//热力图数据
LSMScreen.CacheDataManager.prototype.getHeatData = function(param,callBack_,failCallBack_)
{
	var config={
		hotspot:'',
		time:''
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/getHotChartData?hotspot='+config.hotspot+'&time='+config.time;
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//获取全网热力图数据
LSMScreen.CacheDataManager.prototype.getHeatDataOfAllNet = function(param,callBack_,failCallBack_)
{
    var config={
        hotspot:'',
        time:''
    };
    config=$.extend(config,param);
    //var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/getHotChartData?hotspot='+config.hotspot+'&time='+config.time;
    var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-all-hotchart?1=1';
    _url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
    SUtils.crossSafeAjax({
        type:"GET",
        async:false,
        dataType:"application/json",
        contentType:"application/json",
        processData:false,
        url:encodeURI(_url),
        success : function(result_)
        {
            if(callBack_!=null)
            {
                callBack_(result_);
            }
        },
        error:failCallBack_
    });
};

//查询子热点
LSMScreen.CacheDataManager.prototype.getSubHotspots = function(param,callBack_,failCallBack_)
{
	var config={
		hot_type:"0,1",
		hotspot:'进口博览会'
	};
	config=$.extend(config,param);///fast_query/area-re_areaHotRel
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-re_areaHotRel?hot_type='+config.hot_type;
	_url+="&hotspot="+config.hotspot;
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

//查询热点配置（树图结构）进博会
LSMScreen.CacheDataManager.prototype.getHotspotTree = function(param,callBack_,failCallBack_)
{
	var config={
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/rm/hots';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

//查询热点配置
LSMScreen.CacheDataManager.prototype.getBaseHotspots = function(param,callBack_,failCallBack_)
{
	var config={
		id:"",
		isDefault:true
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/area-cfg-hotConfigQueryContent?id='+config.id;
	_url+="&isDefault="+config.isDefault;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

//查询应急资源
LSMScreen.CacheDataManager.prototype.getEmers = function(param,callBack_,failCallBack_)
{
	var config={
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cfg-emer';
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//基站运行情况的接口
LSMScreen.CacheDataManager.prototype.getBaseStationOperation = function(param,callBack_,failCallBack_)
{
	var config={
			hotspot:null,
			ifId:''
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/baseStationOperationNew2';
	if(config.hotspot!=null&&config.hotspot!=''){
		_url+='?hotspot='+config.hotspot;
	}
	if(config.ifId!=null&&config.ifId!=''){
		_url+='&ifId='+config.ifId;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

//基站前五个时间点
LSMScreen.CacheDataManager.prototype.getTopCellKp = function(param,callBack_,failCallBack_)
{
	var config={
			ids:null,
			type:null
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/pm/getTopCellKpi?ids='+config.ids;
	if(config.type!=null&&config.type!=''){
		_url+='&type='+config.type;
	}
	_url+='&smooth=true'
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
LSMScreen.CacheDataManager.prototype.getMaintainMan = function(param,callBack_,failCallBack_)
{
	var config={
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cfg-emer-person';
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

//查询WIFI信息
LSMScreen.CacheDataManager.prototype.getWiFi = function(param,callBack_,failCallBack_)
{
	var config={
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-cfg-wifi-sr';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//专线接口
LSMScreen.CacheDataManager.prototype.getSplineStatistic = function(param,callBack_,failCallBack_)
{
	var config={
		type:"进博会"//[全网，进博会]
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-gl-jk';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	_url+='&type='+config.type;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}

LSMScreen.CacheDataManager.prototype.getSplineTrend = function(param,callBack_,failCallBack_)
{
	var config={
		line_id:null//null 为全量统计
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-jk-net-trend';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	if(config.line_id!=null){
		_url+='&line_id='+config.line_id;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
LSMScreen.CacheDataManager.prototype.getSplineCustomers = function(param,callBack_,failCallBack_)
{
	var config={
			isLocal:false,//null 为全量统计
			customers_name:null,
			isM:null
		};
		config=$.extend(config,param);
		var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-jk-custDetail';
		_url+='?isLocal='+config.isLocal;
		_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
		if(!utils.isStringEmpty(config.customers_name)){
			_url+='&condition_like_customers_name='+config.customers_name;
		}
		if(!utils.isStringEmpty(config.isM)){
			_url+='&isM='+config.isM;
		}
		SUtils.crossSafeAjax({
	  		type:"GET",
	  		async:false,
	  		dataType:"application/json",
	  		contentType:"application/json",
	  		processData:false,
	  		url:encodeURI(_url),
	  		success : function(result_)
	  		{
	  			if(callBack_!=null)
	  			{
	  				callBack_(result_);
	  			}
	  		},
	  		error:failCallBack_
		});
};
LSMScreen.CacheDataManager.prototype.getSplineLines = function(param,callBack_,failCallBack_)
{
	var config={
		isLocal:false,//null 为全量统计
		customers_num:null,
		condition_eq_is_media:null
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-jk-lineDetail';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	if(config.customers_num!=null&&config.customers_num!=''){
		_url+='&customers_num='+config.customers_num;
	}
	if(config.condition_eq_is_media!=null&&config.condition_eq_is_media!=''){
		_url+='&condition_eq_is_media='+config.condition_eq_is_media;
	}
	if(config.condition_eq_is_guozhan_line!=null&&config.condition_eq_is_guozhan_line!=''){
		_url+='&condition_eq_is_guozhan_line='+config.condition_eq_is_guozhan_line;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
LSMScreen.CacheDataManager.prototype.getSplineLinesDetail = function(param,callBack_,failCallBack_)
{
	var config={
		isLocal:false,//null 为全量统计
		condition_eq_business_type:null,
		isFo:false,
		isTs:false
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-jk-lineDetail';
	_url+='?smooth='+LSMScreen.CacheDataManager.doSmooth;
	if(config.condition_eq_business_type!=null&&config.condition_eq_business_type!=''){
		_url+='&condition_eq_business_type='+config.condition_eq_business_type;
	}
	if(config.isFo!=null&&config.isFo!=''){
		_url+='&isFo='+config.isFo;
	}
	if(config.isTs!=null&&config.isTs!=''){
		_url+='&isTs='+config.isTs;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//专线拓扑
LSMScreen.CacheDataManager.prototype.getSplineTopo = function(param,callBack_,failCallBack_)
{
	var config={
		line_id:''
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-jk-transln?line_id='+config.line_id;
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
LSMScreen.CacheDataManager.prototype.getSplineCircleTopo = function(param,callBack_,failCallBack_)
{
	var config={
		line_id:'',
		type:''//[transln|netln]
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/jk/router?line_id='+config.line_id
	+'&type='+config.type;
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
LSMScreen.CacheDataManager.prototype.getRouterList = function(param,callBack_,failCallBack_)
{
	var config={
		line_id:'',
		type:''//[transln|netln]
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-jk-router-2?line_id='+config.line_id
	+'&type='+config.type;
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
LSMScreen.CacheDataManager.prototype.getSplineResources = function(param,callBack_,failCallBack_)
{
	var config={
		line_id:''
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-jk-accsPoint?line_id='+config.line_id;
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
LSMScreen.CacheDataManager.prototype.getSplineLightCircuit = function(param,callBack_,failCallBack_)
{
	var config={
		line_id:'',
		type:''//[transln|netln]
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-jk-opticalGis?line_id='+config.line_id
	_url+='&smooth='+LSMScreen.CacheDataManager.doSmooth;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

//传输光缆列表
LSMScreen.CacheDataManager.prototype.getTransCables= function(param,callBack_,failCallBack_)
{
	var config={
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-jk-cable';
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
}
//WIFI运行质量
LSMScreen.CacheDataManager.prototype.getWifiQuality= function(param,callBack_,failCallBack_)
{
	var config={
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-wifi-acinfo';
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//AP运行质量
LSMScreen.CacheDataManager.prototype.getApQuality= function(param,callBack_,failCallBack_)
{
	var config={
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-wifi-st';
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};
//AP列表
LSMScreen.CacheDataManager.prototype.getApList= function(param,callBack_,failCallBack_)
{
	var config={
		hh:'',//场馆
		state:''
	};
	config=$.extend(config,param);
	var _url = LSMScreen.CacheDataManager.baseUrl+'/sml/query/lsm-wifi-apinfo?hh='+config.hh;
	if(config.state!=null&&config.state!=''&&config.state!='null'){
		_url+='&state='+config.state;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result_)
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};



