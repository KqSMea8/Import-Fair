var LSMScreen = LSMScreen || {};
/**
 * 端到端大屏数据请求
 * @class LSMScreen.DataManager
 * @classdesc 端到端大屏数据请求管理
 */
LSMScreen.DataManager=function(){
	if(LSMScreen.DataManager.instance==null){
		this.initialize.apply(this, arguments);
	}else{
		throw("重复创建DataManager");
	}
};

LSMScreen.DataManager.minBack=-10;
LSMScreen.DataManager.formatSpecialCompare0="yyyy-MM-dd 00:00:00";
LSMScreen.DataManager.formatSpecialCompare="yyyy-MM-dd hh:mm:ss";
LSMScreen.DataManager.specificTbTime=1440;
/**
 * DataManager实例
 * @private
 * @type {LSMScreen.DataManager} 
 */
LSMScreen.DataManager.instance=null;

/** 
 * 获取实例
 * @protected
 * @function 
 * @returns {LSMScreen.DataManager} DataManager实例
 */
LSMScreen.DataManager.getInstance=function(){
	if(LSMScreen.DataManager.instance==null){
		return new LSMScreen.DataManager();
	}else{
		return LSMScreen.DataManager.instance;
	}
};
/** 
 * 构造方法
 * @protected
 * @function 
 * @param {Object} maskParent loadmask的父容器dom节点
 */
LSMScreen.DataManager.prototype.initialize=function(maskParent){
	LSMScreen.DataManager.instance=this;
};

/** 
 * 热点全天累计用户数,流量
 * @public
 * @function 
 * @param {Array} hotspots_ 热点区域
 * @example
 * ["迪士尼"]
 * @param {String} time_ 时间，为null时取倒推20分钟
 * @example
 * 2016-01-01 12:12:12
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotCustomerCountAndFlow = function(hotSpots_, time_,timeType_, callBack_, failCallBack_)
{
	if (time_ == null)
	{
		var _format="yyyy-MM-dd hh:mm:ss";
		time_ = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, _format);
	}
	
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspots-day-time";
	
	if (timeType_ != null)
	{
		_url=LSMConsts.G_URLCONFIG.urlStream+"/union/"+timeType_+"/hotspots-day-time";
	}
	_url+="?time=" + time_;
	
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(hotSpots_),
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

/** 
 * 热点全天累计用户数,流量对比
 * @public
 * @function 
 * @param {Array} hotspots_ 热点区域
 * @example
 * ["迪士尼"]
 * @param {String} time_ 时间，为null时取倒推20分钟
 * @example
 * 2016-01-01 12:12:12
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotCustomerCountAndFlowCompare = function(hotSpots_, time_,timeCompare_,timeType_, callBack_, failCallBack_)
{
	var _format="yyyy-MM-dd hh:mm:ss";
	if (time_ == null)
	{
		time_ = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, _format);
	}
	if (timeCompare_ == null)
	{
		timeCompare_ = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack*2,SUtils.TIME_TYPE.MIN, _format);
	}
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspots-day-time-compare";
	
	if (timeType_ == "hour")
	{
		_url=LSMConsts.G_URLCONFIG.urlStream+"/union/"+timeType_+"/hotspots-day-time-compare";
	}else if (timeType_ == "day")
	{
		_url=LSMConsts.G_URLCONFIG.urlWs+"/metro/hotspots-time-compare";
	}else if (timeType_ == "month")
	{
		_url=LSMConsts.G_URLCONFIG.urlWs+"/metro/hotspots-time-compare";
	}
	_url+="?time=" + time_+ "&timeCompare=" + timeCompare_+"&timeType="+timeType_;
	
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(hotSpots_),
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

/** 
 * 热点全天累计用户数,流量 趋势
 * @public
 * @function 
 * @param {Array} hotspots_ 热点区域
 * @example
 * {
 * 	time:"",
 *  timeType:"hour",
 *  hotspot:"迪士尼"
 * }
 * @param {String} time_ 时间，为null时取倒推20分钟
 * @example
 * 2016-01-01 12:12:12
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotCustomerCountAndFlowTrend = function(param, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
		timeBegin:SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN,format),
		timeEnd:SUtils.getNowDateTime(format)
	}; 
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspot-day-times";
	
	if (config.timeType != null)
	{
		_url=LSMConsts.G_URLCONFIG.urlStream+"/union/"+config.timeType+"/hotspot-day-times";
	}
	_url+="?timeBegin=" + config.timeBegin+"&timeEnd="+config.timeEnd+"&hotspot="+config.hotspot;
	
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
/** 
 * 热点全天累计用户数,流量 趋势 包含对比
 * @public
 * @function 
 * @param {Array} hotspots_ 热点区域
 * @example
 * {
 * 	time:"",
 *  timeType:"hour",
 *  hotspot:"迪士尼"
 * }
 * @param {String} time_ 时间，为null时取倒推20分钟
 * @example
 * 2016-01-01 12:12:12
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotCustomerCountAndFlowCompareTrend = function(param, callBack_, failCallBack_)
{
	var format0="yyyy-MM-dd 00:00:00";
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
		timeBegin:SUtils.getNowDateTime(format0),
		timeEnd:SUtils.getNowDateTime(format),
		timeBeginCompare:SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare0),
		timeEndCompare:SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare)
	}; 
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspot-day-times-compare";
	
	if (config.timeType != null)
	{
		_url=LSMConsts.G_URLCONFIG.urlStream+"/union/"+config.timeType+"/hotspot-day-times";
	}
	_url+="?timeBegin=" + config.timeBegin+"&timeEnd="+config.timeEnd+"&hotspot="+config.hotspot
	+"&timeBeginCompare=" + config.timeBeginCompare + "&timeEndCompare=" + config.timeEndCompare;
	
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
/** 
 * 热点话务量
 * @public
 * @function 
 * @param {Object} params 参数
 * @example
 * {hotspot:null,
 * cell_name:null,
 * lac_ci:null,
 * timeType:null,
 * time:null,
 * startTime:null,
 * endTime:null,
 * timeRange:false}
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotTrafficFlow = function(params_, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/area/pm";
	
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(params_),
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

/** 
 * 网管指标 查询多个热点
 * @public
 * @function 
 * @param {Object} params 参数
 * @example
 * {hotspot:null,
 * cell_name:null,
 * lac_ci:null,
 * timeType:null,
 * time:null,
 * startTime:null,
 * endTime:null,
 * timeRange:false}
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotTrafficFlows = function(params_, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/area/pms";
	
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(params_),
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

//网管指标数据(新数据源)
LSMScreen.DataManager.prototype.getXpmData = function(params_, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/area/xpm";
	
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(params_),
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
//网管指标数据(新数据源) 同时查2g,4g
LSMScreen.DataManager.prototype.getXpmDataMerge = function(params_, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/area/xpm";
	var param4g=$.extend({},params_);
	var param2g=$.extend({},params_);
	
	param4g.domains='4g';
	param4g.hb_domains='4g';
	param4g.hb_time_minutes=15;
	
	param2g.domains='2g';
	param2g.hb_domains='2g';
	param2g.hb_time_minutes=60;
	
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(param4g),
  		url:encodeURI(_url),
  		success : function(result4g) 
  		{
  			SUtils.crossSafeAjax({
  		  		type:"POST",
  		  		async:false,
  		  		dataType:"application/json",
  		  		contentType:"application/json",
  		  		processData:false,
  		  		data:JSON.stringify(param2g),
  		  		url:encodeURI(_url),
  		  		success : function(result2g) 
  		  		{
  		  			
  		  		},
  		  		error:failCallBack_
  			});
  			
  		},
  		error:failCallBack_
	});
};

/** 
 * 热点下的所有指标
 * @public
 * @function 
 * @param {Array} hotspots_ 热点区域
 * @example
 * ["迪士尼"]
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotsKpis = function(hotSpots_, time_,timeType_, callBack_, failCallBack_,isRoll,indicatorNameList)
{
	var tag="-time";
	var centerTag="union";
	if(isRoll){
		tag="-roll";
		centerTag="totalnum";
	}
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspots-time";
	if (timeType_ != null)
	{
		if(timeType_=="day"||timeType_=="month"){
			_url = LSMConsts.G_URLCONFIG.urlWs+"/metro/hotspots-time";
		}else if(timeType_=="hour"){
			_url=LSMConsts.G_URLCONFIG.urlStream+"/"+centerTag+"/"+timeType_+"/hotspots"+tag;
		}
		
	}
	if (time_ == null)
	{
		var _format="yyyy-MM-dd hh:mm:ss";
		if(timeType_=="hour"){
			time_ = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.HOUR, _format);
		}else if(timeType_=="day"){
			time_ = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE, _format);
		}else if(timeType_=="month"){
			time_ = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.MONTH, _format);
		}else{
			time_ = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, _format);
		}
	}
	
	_url+="?time=" + time_;
	if(timeType_=="day"||timeType_=="month"){
		_url+="&timeType="+timeType_;
	}
	if(indicatorNameList!=null&&indicatorNameList!=''){
		_url+="&indicatorNameList="+indicatorNameList;
	}
	
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(hotSpots_),
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

/** 
 * 热点下单时间点所有指标--同历史数据比
 * @public
 * @function 
 * @param {Array} hotspots_ 热点区域
 * @example
 * ["迪士尼"]
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotsKpisTimeCompared = function(hotSpots_, time_, timeCompare_, callBack_, failCallBack_,timeType_,isRoll,indicatorNameList)
{
	var _format="yyyy-MM-dd hh:mm:ss";
	
	if (time_ == null)
	{
		if(timeType_=="hour"){ 
			time_ = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.HOUR, _format);
		}else if(timeType_=="day"){
			time_ = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE, _format);
		}else if(timeType_=="month"){
			time_ = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.MONTH, _format);
		}else{
			time_ = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, _format);
		}
		
	}
	if (timeCompare_ == null)
	{
		if(timeType_=="hour"){
			timeCompare_ = SUtils.getDiffDateTimeFromNow(-2,SUtils.TIME_TYPE.HOUR, _format);
		}else if(timeType_=="day"){
			timeCompare_ = SUtils.getDiffDateTimeFromNow(-2,SUtils.TIME_TYPE.DATE, _format);
		}else if(timeType_=="month"){
			timeCompare_ = SUtils.getDiffDateTimeFromNow(-2,SUtils.TIME_TYPE.MONTH, _format);
		}else{
			timeCompare_ = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack*2,SUtils.TIME_TYPE.MIN, _format);
		}
		
	}
	var rollTag="";
	if(isRoll){
		rollTag="-roll";
	}
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspots-time-compare"+"?time=" 
	+ time_ + "&timeCompare=" + timeCompare_;
	if(timeType_=="hour"){
		_url = LSMConsts.G_URLCONFIG.urlStream+"/union/hour/hotspots-time-compare"+rollTag+"?time=" 
		+ time_ + "&timeCompare=" + timeCompare_;
	}else if(timeType_!="null"&&timeType_!=null){
		_url = LSMConsts.G_URLCONFIG.urlWs+"/metro/hotspots-time-compare"+"?time=" 
		+ time_ + "&timeCompare=" + timeCompare_;
		_url+="&timeType="+timeType_;
	}
	if(indicatorNameList!=null&&indicatorNameList!=''){
		_url+="&indicatorNameList="+indicatorNameList;
	}
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(hotSpots_),
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

/** 
 * TDD/FDD 热点下单时间点所有指标--同历史数据比
 * @public
 * @function 
 * @param {Array} hotspots_ 热点区域
 * @example
 * ["迪士尼"]
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotsKpisTimeComparedTddFdd = function(params, callBack_, failCallBack_)
{
	var _format="yyyy-MM-dd hh:mm:ss";
	var config={
		hotspots:[],
		time:null,
		timeCompare:null,
		timeType:null,
		siteType:'FDD'
	};
	config=$.extend(config,params);
	if (config.time == null)
	{
		config.time = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, _format);
	}
	if (config.timeCompare == null)
	{
		config.timeCompare = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack*2,SUtils.TIME_TYPE.MIN, _format);
	}
	var granularity=5;
	if(config.timeType=="hour"){
		granularity=60;
	}
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspots-sitetype-time-compare"+"?time=" 
	+ config.time + "&timeCompare=" + config.timeCompare+"&granularity="+granularity+"&sitetype="+config.siteType;
	
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(config.hotspots),
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

/** 
 * TDD/FDD 日累计 热点下单时间点所有指标--同历史数据比
 * @public
 * @function 
 * @param {Array} hotspots_ 热点区域
 * @example
 * ["迪士尼"]
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotsKpisTimeComparedTddFddDay = function(params, callBack_, failCallBack_)
{
	var _format="yyyy-MM-dd hh:mm:ss";
	var config={
		hotspots:[],
		time:null,
		timeCompare:null,
		timeType:null,
		siteType:'FDD'
	};
	config=$.extend(config,params);
	if (config.time == null)
	{
		config.time = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, _format);
	}
	if (config.timeCompare == null)
	{
		config.timeCompare = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack*2,SUtils.TIME_TYPE.MIN, _format);
	}
	var granularity=5;
	if(config.timeType=="hour"){
		granularity=60;
	}
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspots-sitetype-day-time-compare"+"?time=" 
	+ config.time + "&timeCompare=" + config.timeCompare+"&granularity="+granularity+"&sitetype="+config.siteType;
	
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(config.hotspots),
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
/** 
 * 热点下单时间点所有指标--同历史数据比
 * @public
 * @function 
 * @param {String} hotspot_ 热点区域
 * @param {String} timeType_ 时间类型 默认null->5分钟 ,hour->小时
 * @example
 * "迪士尼"
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotsKpisCompared = function(hotSpot_, timeBegin_, 
		timeEnd_, timeBeginCompare_, timeEndCompare_,timeType_, callBack_, failCallBack_,isRoll,indicatorNameList,reverse)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var _format0="yyyy-MM-dd 00:00:00";
	var rollTag="";
	if(isRoll){
		rollTag="-roll";
	}
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspot-times-compare"+rollTag;
	if (timeType_ != null)
	{
		if (timeType_ == "hour"){
			_url=LSMConsts.G_URLCONFIG.urlStream+"/union/"+timeType_+"/hotspot-times-compare"+rollTag;
			if (timeBegin_ == null)
			{
				timeBegin_ = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.MIN,_format0);
			}
			if (timeEnd_ == null)
			{
				timeEnd_ = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.MIN,format);
			}
			if (timeBeginCompare_ == null)
			{
				timeBeginCompare_ = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare0);
			}
			if (timeEndCompare_ == null)
			{
				timeEndCompare_ = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare);
			}
		}else if (timeType_ == "day"){
			_url=LSMConsts.G_URLCONFIG.urlWs+"/metro/hotspot-times-compare";
			if (timeBegin_ == null)
			{
				timeBegin_ = SUtils.getDiffDateTimeFromNow(-7,SUtils.TIME_TYPE.DATE,_format0);
			}
			if (timeEnd_ == null)
			{
				timeEnd_ = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.DATE,format);
			}
			if (timeBeginCompare_ == null)
			{
				timeBeginCompare_ = SUtils.getDiffDateTimeFromNow(-14,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare0);
			}
			if (timeEndCompare_ == null)
			{
				timeEndCompare_ = SUtils.getDiffDateTimeFromNow(-7,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare);
			}
		}else if (timeType_ == "month"){
			_url=LSMConsts.G_URLCONFIG.urlWs+"/metro/hotspot-times-compare";
			if (timeBegin_ == null)
			{
				timeBegin_ = SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.MONTH,_format0);
			}
			if (timeEnd_ == null)
			{
				timeEnd_ = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.DATE,format);
			}
			if (timeBeginCompare_ == null)
			{
				timeBeginCompare_ = SUtils.getDiffDateTimeFromNow(-24,SUtils.TIME_TYPE.MONTH,LSMScreen.DataManager.formatSpecialCompare0);
			}
			if (timeEndCompare_ == null)
			{
				timeEndCompare_ = SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.MONTH,LSMScreen.DataManager.formatSpecialCompare);
			}
		}
		
	}else{
		if (timeBegin_ == null)
		{
			timeBegin_ = SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		}
		if (timeEnd_ == null)
		{
			timeEnd_ = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		}
		if (timeBeginCompare_ == null)
		{
			timeBeginCompare_ = SUtils.getDiffDateTimeFromNow(-1620+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,LSMScreen.DataManager.formatSpecialCompare);
		}
		if (timeEndCompare_ == null)
		{
			timeEndCompare_ = SUtils.getDiffDateTimeFromNow(-1440+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,LSMScreen.DataManager.formatSpecialCompare);
		}
	}
	
	_url+="?hotspot=" + hotSpot_ + "&timeType="+timeType_+
	"&timeBegin=" + timeBegin_ +"&timeEnd=" + timeEnd_ + 
	"&timeBeginCompare=" + timeBeginCompare_ + "&timeEndCompare=" + timeEndCompare_;
	
	if(indicatorNameList!=null&&indicatorNameList!=''){
		_url+="&indicatorNameList="+indicatorNameList;
	}
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				if(reverse){
  					result_=result_.reverse();
  				}
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

/** 
 * TDD/FDD热点下单时间点所有指标--同历史数据比
 * @public
 * @function 
 * @param {String} hotspot_ 热点区域
 * @param {String} timeType_ 时间类型 默认null->5分钟 ,hour->小时
 * @example
 * "迪士尼"
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotsKpisComparedFddTdd = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var _format0="yyyy-MM-dd 00:00:00";
	var config={
		hotspot:'',
		timeBegin:null,
		timeEnd:null,
		timeBeginCompare:null,
		timeEndCompare:null,
		timeType:null,
		siteType:'FDD'
	};
	
	config=$.extend(config,params);
	
	var granularity=5;
	
	if (config.timeType =='hour')
	{
		granularity=60;
		if (config.timeBegin == null)
		{
			config.timeBegin = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.MIN,_format0);
		}
		if (config.timeEnd == null)
		{
			config.timeEnd = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.MIN,format);
		}
		if (config.timeBeginCompare == null)
		{
			config.timeBeginCompare = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare0);
		}
		if (config.timeEndCompare == null)
		{
			config.timeEndCompare = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare);
		}
	}else{
		if (config.timeBegin == null)
		{
			config.timeBegin = SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		}
		if (config.timeEnd == null)
		{
			config.timeEnd = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		}
		if (config.timeBeginCompare == null)
		{
			config.timeBeginCompare = SUtils.getDiffDateTimeFromNow(-1620+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,LSMScreen.DataManager.formatSpecialCompare);
		}
		if (config.timeEndCompare == null)
		{
			config.timeEndCompare = SUtils.getDiffDateTimeFromNow(-1440+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,LSMScreen.DataManager.formatSpecialCompare);
		}
	}
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspot-sitetype-times-compare";
	_url+="?hotspot=" + config.hotspot + 
	"&timeBegin=" + config.timeBegin +"&timeEnd=" + config.timeEnd + 
	"&timeBeginCompare=" + config.timeBeginCompare + "&timeEndCompare=" + config.timeEndCompare
	+"&granularity=" + granularity
	+"&sitetype=" + config.siteType;
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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

/** 
 * TDD/FDD日累计 热点下单时间点所有指标--同历史数据比
 * @public
 * @function 
 * @param {String} hotspot_ 热点区域
 * @param {String} timeType_ 时间类型 默认null->5分钟 ,hour->小时
 * @example
 * "迪士尼"
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotSpotsKpisComparedFddTddDay = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var _format0="yyyy-MM-dd 00:00:00";
	var config={
		hotspot:'',
		timeBegin:null,
		timeEnd:null,
		timeBeginCompare:null,
		timeEndCompare:null,
		timeType:null,
		siteType:'FDD'
	};
	
	config=$.extend(config,params);
	
	var granularity=5;
	
	if (config.timeType =='hour')
	{
		granularity=60;
		if (config.timeBegin == null)
		{
			config.timeBegin = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.MIN,_format0);
		}
		if (config.timeEnd == null)
		{
			config.timeEnd = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.MIN,format);
		}
		if (config.timeBeginCompare == null)
		{
			config.timeBeginCompare = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare0);
		}
		if (config.timeEndCompare == null)
		{
			config.timeEndCompare = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare);
		}
	}else{
		if (config.timeBegin == null)
		{
			config.timeBegin = SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		}
		if (config.timeEnd == null)
		{
			config.timeEnd = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		}
		if (config.timeBeginCompare == null)
		{
			config.timeBeginCompare = SUtils.getDiffDateTimeFromNow(-1620+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,LSMScreen.DataManager.formatSpecialCompare);
		}
		if (config.timeEndCompare == null)
		{
			config.timeEndCompare = SUtils.getDiffDateTimeFromNow(-1440+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,LSMScreen.DataManager.formatSpecialCompare);
		}
	}
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspot-sitetype-day-times-compare";
	_url+="?hotspot=" + config.hotspot + 
	"&timeBegin=" + config.timeBegin +"&timeEnd=" + config.timeEnd + 
	"&timeBeginCompare=" + config.timeBeginCompare + "&timeEndCompare=" + config.timeEndCompare
	+"&granularity=" + granularity
	+"&sitetype=" + config.siteType;
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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

/** 
 * 小区网管指标对比趋势图
 * @public
 * @function 
 * @param {String} params 热点区域
 * @example
 * {
 * 	timeType:""//hour 
 * 	timeBegin:"2016-05-20 15:00:00"
 * 	timeEnd
 * 	timeBeginCompare
 * 	timeEndCompare
 * 	site:""//lac:ci
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getCellKpisCompared = function(params, callBack_, failCallBack_)
{
	var format0="yyyy-MM-dd 00:00:00";
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			timeBegin:SUtils.getNowDateTime(format0),
			timeEnd:SUtils.getNowDateTime(format),
			timeBeginCompare:SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare0),
			timeEndCompare:SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare)
		}; 
	config=$.extend(config,params);
	
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/union/site-times-compare";
	if (config.timeType != null&&config.timeType!="")
	{
		_url=LSMConsts.G_URLCONFIG.urlStream+"/union/"+config.timeType+"/site-times-compare";
	}
	_url+="?site=" + config.site + 
	"&timeBegin=" + config.timeBegin +"&timeEnd=" + config.timeEnd + 
	"&timeBeginCompare=" + config.timeBeginCompare + "&timeEndCompare=" + config.timeEndCompare;
	
	if(config.indicatorNameList!=null&&config.indicatorNameList!=''){
		_url+="&indicatorNameList="+config.indicatorNameList;
	}
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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

/** 
 * 获取告警流水(黄文接口)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	DS:"",
 *  DS_NAME:"",
 *  ALARM_LEVEL
 *  NE_NAME
 *  mtime:"10",
 *  hotspot:"迪士尼"
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @example
 * {
 * 	"mmeAlarmInfo":{"time":"最近1小时","value":"告警量0条","unit":null,"level":0,"bak":null},
 * "saegwAlarmInfo":{"time":"最近1小时","value":"告警量0条","unit":null,"level":0,"bak":null}
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getAlarmFLow=function(params,callBack,failCallBack){
	//默认参数
	var config={
		mtime:20
	};
	config=$.extend(config,params);
	
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/eaebm/kpi/streamAlarm?mtime="+config.mtime;
	if(config.DS!=""&&config.DS!=null){
		url+="&DS="+config.DS;
	}	
	if(config.DS_NAME!=""&&config.DS_NAME!=null){
		url+="&DS_NAME="+config.DS_NAME;
	}	
	if(config.ALARM_LEVEL!=""&&config.ALARM_LEVEL!=null){
		url+="&ALARM_LEVEL="+config.ALARM_LEVEL;
	}	
	if(config.NE_NAME!=""&&config.NE_NAME!=null){
		url+="&NE_NAME="+config.NE_NAME;
	}	
	if(config.NE_NAME!=""&&config.NE_NAME!=null){
		url+="&NE_NAME="+config.NE_NAME;
	}	
	if(config.hotspot!=""&&config.hotspot!=null){
		url+="&hotspot="+config.hotspot;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 获取告警流水(黄文接口)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	startTime:201605191100,
 *  endTime:201605202100
 * 
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getComplainList=function(params,callBack,failCallBack){
	//默认参数
	var format0="yyyyMMdd000000";
	var format="yyyyMMddhhmmss";
	var config={
		startTime:SUtils.getNowDateTime(format0),
		endTime:SUtils.getNowDateTime(format)
	};
	config=$.extend(config,params);
	
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/kpi/cimOrder";
	url+="?startTime="+config.startTime;
	url+="&endTime="+config.endTime;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			var result=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [result]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 拨测告警(黄文接口)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  timeBegin
 *  timeEnd //默认最近一小时
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getFaultRecords=function(params,callBack,failCallBack){
	//默认参数
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
		timeBegin:SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	if(params!=null){
		for(var key in params){
			config[key]=params[key];
		}
	}
	
	
	
	var url=LSMConsts.G_URLCONFIG.urlStream+"/fault/records";
	url+="?timeBegin="+config.timeBegin;
	url+="&timeEnd="+config.timeEnd;
	
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
/** 
 * 获取黄文鱼骨图接口 用于拨测和拓扑的告警(黄文接口)
 * @public
 * @function 
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @example
 * {
 * 	"mmeAlarmInfo":{"time":"最近1小时","value":"告警量0条","unit":null,"level":0,"bak":null},
 * "saegwAlarmInfo":{"time":"最近1小时","value":"告警量0条","unit":null,"level":0,"bak":null}
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getDnmsFishbone=function(callBack,failCallBack){
	
	var url=LSMConsts.G_URLCONFIG.urlGsma+"/dnms/fishbone";
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 获取全网活跃用户数(趋势图)(娄耀佳接口)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	hours:"",//从startTime向前取的小时数 即startTime-hours~startTime
 *  startTime:"yyyy-MM-dd hh:mm:ss",//开始时间 默认当前时间前推20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @example
 * [
 * 	{
 * 		"time":"2016-04-08 15:10:00",
 * 		"2G":0,
 * 		"3G":0,
 * 		"4G":0,
 * 		"其他":0,
 * 		"total":0
 *  },
 * ....
 * ]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getActiveUser=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		hours:2,
	 	startTime:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	
	
	var url=LSMConsts.G_URLCONFIG.urlStream+"/usernum/all?hours="+config.hours;
		url+="&startTime="+config.startTime;
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 获取业务大类活跃用户数(时间点)(娄耀佳接口)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	major:"",//业务大类 不填查所有大类
 *  time:"yyyy-MM-dd hh:mm:ss",//时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @example
 * {
 * 	"视频":{
 * 		"time":"2016-04-08 15:10:00",
 * 		"2G":0,
 * 		"3G":0,
 * 		"4G":0,
 * 		"其他":0,
 * 		"total":0
 * },
 * ....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMajorActiveUser=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		major:"",
	 	time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	
	
	var url=LSMConsts.G_URLCONFIG.urlStream+"/apps/usernum/major?time="+config.time;
	if(config.major!=null&&config.major!=""){
		url+="&major="+config.major;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
/** 
 * 获取业务大类活跃用户数(趋势图)(娄耀佳接口)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	major:"",//业务大类 不填查所有大类
 *  time:"yyyy-MM-dd hh:mm:ss",//时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @example
 * {
 * 	"视频":{
 * 		"time":"2016-04-08 15:10:00",
 * 		"2G":0,
 * 		"3G":0,
 * 		"4G":0,
 * 		"其他":0,
 * 		"total":0
 * },
 * ....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMajorActiveUserTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		major:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-3,SUtils.TIME_TYPE.HOUR,format),
	 	timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	
	
	var url=LSMConsts.G_URLCONFIG.urlStream+"/apps/usernum/major?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd;
	if(config.major!=null&&config.major!=""){
		url+="&major="+config.major;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
/** 
 * 获取单指标趋势图(娄耀佳接口)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	idrFilter:"4G附着成功率",//指标ID
 *  granularity:1,//时间粒度 默认1分钟(1->1分钟，5->5分钟)
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近3小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @example
 * [
 * 	{"4G附着成功率":{"reqCnt":75254,"time":"2016-04-07 10:45:00","sucCnt":71216,"value":0.9463417}},
 * 	{"4G附着成功率":{"reqCnt":74678,"time":"2016-04-07 10:46:00","sucCnt":70569,"value":0.9449771}}
 * ]
 * "4G附着成功率"->指标ID
 * time->时间
 * value->指标值 百分比为0-1之间
 * reqCnt->请求数
 * sucCnt->成功数
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getSingleKpiTrendChartDataStream=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
	 	idrFilter:"",
	 	granularity:1,
	 	timeBegin:SUtils.getDiffDateTimeFromNow(-3,SUtils.TIME_TYPE.HOUR,format),
	 	timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	
	
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/signal-all-times-level?granularity="+config.granularity
			+"&timeBegin="+config.timeBegin
			+"&timeEnd="+config.timeEnd
			+"&idrFilter="+config.idrFilter;
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 获取单指标趋势图(黄文接口)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	idrFilter:"dnsParseRate",//指标ID
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @example
 * [
 * 	{"time":"2016-04-07 10:45:00","value":99.22},
 * 	{"time":"2016-04-07 10:46:00","value":88.77}
 * ]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getSingleKpiTrendChartDataWs=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
	 	idrFilter:"",
	 	timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
	 	timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/gsma/ipnet/dnmsFishboneTrend"
			+"?startTime="+config.timeBegin
			+"&endTime="+config.timeEnd
			+"&name="+config.idrFilter;
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 错误码分布
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
	{
		"-1": "3868",//具体错误码分布
        "0": "13691",
        "3": "62",
        "7": "289",
        "8": "553",
        ...
        "req_cnt": "405835",//请求总数
        "succ_cnt": "382278",//成功数
        "fail_cnt": "23557",//失败数
        "time": "2016-04-08 10:05:00"//时间点
    }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @example
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getErrorCodeDistribution=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		filterKey:"MMEALL",
		isX2:false,
		type:"mme",
	 	time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url="";
	if(config.isX2){
		url=LSMConsts.G_URLCONFIG.urlStream+"/failcode/mmes-x2-time";
	}else{
		if(config.type=="city"){
			url=LSMConsts.G_URLCONFIG.urlStream+"/failcode/sds-time";
		}else if(config.type=="mme"){
			url=LSMConsts.G_URLCONFIG.urlStream+"/failcode/mmes-time";
		}
	}
	url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData[config.filterKey];
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * 业务大类的网络质量指标查询（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	major:"视频",//业务大类 
 *  app:"",//业务小类
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近3小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * [
 * 	{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 	},
 * 	....
 * ]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMajorQuality=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		major:"视频",
		timeBegin:SUtils.getDiffDateTimeFromNow(-3,SUtils.TIME_TYPE.HOUR,format),
	 	timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url="";
	var filterKey="";
	if(config.app!=null&&config.app!=""){
		filterKey=config.major+":"+config.app;
		url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/apps/all-times";
		url+="?timeBegin="+config.timeBegin;
		url+="&timeEnd="+config.timeEnd;
		url+="&minor="+filterKey;
	}else{
		filterKey=config.major;
		url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/majors-times";
		url+="?timeBegin="+config.timeBegin;
		url+="&timeEnd="+config.timeEnd;
		if(config.major!=""&&config.major!=null){
			url+="&major="+config.major;
		}
	}
		
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=[];
  			if(config.app!=""&&config.app!=null){
  				chartData=rawData;
  			}else if(config.major!=""&&config.major!=null){
  				chartData=rawData[filterKey];
  			}else{
  				chartData=rawData;
  			}
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//视频特殊指标趋势图 
LSMScreen.DataManager.prototype.getVideoQuality=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		majorName:"视频",
		timeBegin:SUtils.getDiffDateTimeFromNow(-3,SUtils.TIME_TYPE.HOUR,format),
	 	timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url="";
	url=LSMConsts.G_URLCONFIG.urlStream+"/"+this.getMajorPathParam(config.majorName)+"/all-times";
	url+="?timeBegin="+config.timeBegin;
	url+="&timeEnd="+config.timeEnd;
	url+="&majorName="+config.majorName;
		
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 业务大类的网络质量指标查询（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	major:"视频",//业务大类 
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * {
 * "视频":
 * 	{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 	},
 * 	....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMajorQualityRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		major:"视频",
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/majors-time";
		url+="?time="+config.time;
	if(config.major!=""&&config.major!=null){
		url+="&major="+config.major;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//视频特殊指标
LSMScreen.DataManager.prototype.getVideoQualityRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		majorName:"视频",
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/"+this.getMajorPathParam(config.majorName)+"/all-time";
		url+="?time="+config.time;
		url+="&majorName="+config.majorName;
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//全网quality union
LSMScreen.DataManager.prototype.getAllUnionQualityRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
		timeType:null
		
	};
	for(var key in params){
		config[key]=params[key];
	}
	
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/all-time";
	if(config.timeType=="hour"){
		url=LSMConsts.G_URLCONFIG.urlStream+"/union/hour/all-time";
	}
		url+="?time="+config.time;
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//热点下小类的信令指标
LSMScreen.DataManager.prototype.getMinorKpisByHotspot=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		hotspot:"",
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	if(params.timeType=="hour"){
		config.time=SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN,format);
	}
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+'/union/apps/hotspot-time?hotspot='+config.hotspot+'&time='+config.time;
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

LSMScreen.DataManager.prototype.getMinorKpisByHotspotRank=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		major:'',
		hotspot:'',
		granularity:5,
		order:"desc",
		sortKey:"4G下行速率500k",
		exclude0:true,
		num:-1,
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	config=$.extend(config,params);
	if(config.time==null){
		config.time=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/apps/hotspot-time-rank";
		url+="?time="+config.time;
		url+="&order="+config.order;
		url+="&sortKey="+config.sortKey;
		url+="&num="+config.num;
		url+="&granularity="+config.granularity;
		url+="&hotspot="+config.hotspot;
		url+="&exclude0="+config.exclude0
		if(config.major!=null&&config.major!=''){
			url+="&major="+config.major;
		}
		if(config.indicatorNameList!=null&&config.indicatorNameList!=''){
			url+="&indicatorNameList="+config.indicatorNameList;
		}
		
		
		
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				var map={};
  				for(var i=0;i<chartData.length;i++){
  					var record=chartData[i];
  					map[record.element]=record;
  				}
  				callBack.apply(this, [map]);
  			}
  		},
  		error:failCallBack
	});
};
//视频特殊指标-根据热点查询
LSMScreen.DataManager.prototype.getVideoQualityRecordByHotspot=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
			majorName:"视频",
			hotspots:[],
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/"+this.getMajorPathParam(config.majorName)+"/hotspots-time";
		url+="?time="+config.time;
		url+="&majorName="+config.majorName;
	SUtils.crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		data:JSON.stringify(config.hotspots),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//视频特殊指标-业务小类
LSMScreen.DataManager.prototype.getVideoMinorQualityRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
			majorName:"视频",
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	if(params.timeType=="hour"){
		config.time=SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN,format);
	}
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/"+this.getMajorPathParam(config.majorName)+"/apps-time";
		url+="?time="+config.time;
		url+="&minor="+config.minor;
		url+="&majorName="+config.majorName;
	if(config.timeType=="hour"){
		url+="&granularity=60";
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//视频特殊指标-业务小类-趋势图
LSMScreen.DataManager.prototype.getVideoMinorQualityTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
			majorName:"视频",
			granularity:5,
			timeBegin:SUtils.getDiffDateTimeFromNow(-3,SUtils.TIME_TYPE.HOUR,format),
		 	timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/"+this.getMajorPathParam(config.majorName)+"/app-times";
		url+="?timeBegin="+config.timeBegin;
		url+="&timeEnd="+config.timeEnd;
		url+="&minor="+config.minor;
		url+="&granularity="+config.granularity;
		url+="&majorName="+config.majorName;
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//视频特殊指标-质差 业务小类-分sgw spip host 终端 小区
LSMScreen.DataManager.prototype.getVideoMinorSortRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		majorName:"视频",
		type:'sgws',
		sortKey:'4G用户数',
		num:10,
		order:'desc',
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	if(params.timeType=="hour"){
		config.time=SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN,format);
	}
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/"+this.getMajorPathParam(config.majorName)+"/app-"+config.type+"-time";
		url+="?time="+config.time;
		url+="&minor="+config.minor;
		url+="&sortKey="+config.sortKey;
		url+="&num="+config.num;
		url+="&order="+config.order;
		url+="&majorName="+config.majorName;
	if(config.timeType=="hour"){
		url+="&granularity=60";
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//视频特殊指标SP流向
LSMScreen.DataManager.prototype.getVideoSpDirList=function(params,callBack,failCallBack,echoData){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		majorName:"视频",
		type:'spsystem',
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
		sortKey:'4G用户数',
		order:'desc',
		num:20
	};
	if(params.timeType=="hour"){
		config.time=SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN,format);
	}
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/"+this.getMajorPathParam(config.majorName)+"/"+config.type+"-time";
		url+="?time="+config.time;
		url+="&sortKey="+config.sortKey;
		url+="&order="+config.order;
		url+="&num="+config.num;
		url+="&majorName="+config.majorName;
	
	if(config.spsystem!=null&&config.spsystem!=""){
		url+="&spsystem="+config.spsystem;
	}
	if(config.sphome!=null&&config.sphome!=""){
		url+="&sphome="+config.sphome;
	}
	
	if(config.timeType=="hour"){
		url+="&granularity=60";
	}
	
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData,echoData]);
  			}
  		},
  		error:failCallBack
	});
};

//通用SP流向环形图  陈晨
LSMScreen.DataManager.prototype.getCommonSpDirList=function(params,callBack,failCallBack,echoData){
	var format="yyyyMMdd0000";
	//默认参数
	var config={
			"area_id":"",
			"app_type_id":"",
			"app_subtype_id":"",
			"time":SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,format),
			"level":"day"
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/selfMonitor-flowAnalysis-rate";
	
	SUtils.crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify(config),
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//视频特殊指标分地市
LSMScreen.DataManager.prototype.getVideoMapData=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		majorName:"视频",
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/"+this.getMajorPathParam(config.majorName)+"/sds-time";
		url+="?time="+config.time;
		url+="&majorName="+config.majorName;
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 业务大类特殊指标(这里是视频播放成功率)（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	major:"视频",//业务大类 
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * {
 * "time":"",
 * "视频":
 * 	{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 	},
 * 	....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMajorSpecRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		major:"视频",
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/spec/major-all-time";
		url+="?time="+config.time;
	if(config.major!=""&&config.major!=null){
		url+="&major="+config.major;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 全网网络质量指标查询（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 	}
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getQualityRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/all-time";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 全网流量指标接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 	}
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getBytesRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/bytes/all-time?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 业务源散点图接口
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	major:"视频",//业务大类 
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近10分钟
 *  group:"IDC",//分类 IDC,国际... 不填为查询major下所有
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * {
 * 	"IDC":
 * 	{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        ....
        
 * 	},
 * 	....
 * "time": "2016-04-08 12:10:00"
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getBusinessSourceQuality=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		major:"视频",
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
		gourp:""
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/ipgroups-major-time";
		url+="?major="+config.major;
		url+="&time="+config.time;
	if(config.group!=null&&config.gourp!=""){
		url+="&group="+config.group;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 业务源趋势图接口
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	major:"视频",//业务大类 
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近3小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间
 *  group:"Cache",//分类 IDC,国际... 不填为查询major下所有
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * [
 * 	{"time":"2016-04-08 15:25:00",
 * 		"IDC":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632
 * 		}
 *  },
 * 	....
 * ]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getBusinessSourceTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		major:"视频",
		gourp:"Cache",
		timeBegin:SUtils.getDiffDateTimeFromNow(-3,SUtils.TIME_TYPE.HOUR,format),
	 	timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/ipgroups-major-times";
		url+="?major="+config.major;
		url+="&timeBegin="+config.timeBegin;
		url+="&timeEnd="+config.timeEnd;
	if(config.group!=null&&config.gourp!=""){
		url+="&group="+config.group;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * 终端排名接口
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	topN:"8",//数量
 *  type:"brand",//brand|model 按品牌或型号分
 *  app_type_name:"视频",//业务大类
 *  app_subtype_name:""//业务小类
 *  terminal_brand:""//终端品牌 当type=model时
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * [
 * 	{
 * 		"time":"2016-04-09 12:00:00",
 * 		"terminal_brand":"苹果",//品牌
 * 		"terminal_model":"苹果",//型号
 * 		"terimalCnt":33086152,//用户数
 * 		"terimalTotal":78383240//全局总用户数
 *  },
 * 	....
 * ]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getTerminalRank=function(params,callBack,failCallBack){
	//默认参数
	var config={
		topN:8,
		type:"brand",
		app_type_name:"",
		app_subtype_name:"",
		terminal_brand:"",
		fdd:false
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/eaebm/dnms/terminalRank";
		url+="?topN="+config.topN;
		url+="&type="+config.type;
	if(config.app_type_name!=null&&config.app_type_name!=""){
		url+="&app_type_name="+config.app_type_name;
	}
	if(config.app_subtype_name!=null&&config.app_subtype_name!=""){
		url+="&app_subtype_name="+config.app_subtype_name;
	}
	if(config.terminal_brand!=null&&config.terminal_brand!=""){
		url+="&terminal_brand="+config.terminal_brand;
	}
	if(config.fdd!=null&&config.fdd!=""){
		url+="&fdd="+config.fdd;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//终端排名 分场景
LSMScreen.DataManager.prototype.getTerminalRankByHot=function(params,callBack,failCallBack){
	//默认参数
	var config={
		topN:8,
		hotspot:'',
		type:"brand",
		terminal_brand:""
	};
	for(var key in params){
		config[key]=params[key];
	}
	if(config.type=='brand'){
		config.type='vendor';
	}
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/re/terminalRank";
		url+="?topN="+config.topN;
		url+="&type="+config.type;
		url+="&hotspot="+config.hotspot;
	if(config.terminal_brand!=null&&config.terminal_brand!=""){
		url+="&terminal_brand="+config.terminal_brand;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 获取地址池利用率等(黄文接口)目前无热点参数
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	name:"ipPoolUntity"//不知道什么用查地址池利用率时用
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * [
 * 	{
 * 		"time":"2016-04-09 13:15:00",
 * 		"ipPoolUntity":3.49,
 * 		"pdpSuccRate":100
 * },
 *  ....
 * ]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getIagwKpiTrend=function(params,callBack,failCallBack){
	//默认参数
	var config={
		name:"ipPoolUntity"
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlGsma+"/dnms/fw";
	if(config.name!=null&&config.name!=""){
		url+="?name="+config.name;
	}
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * 质差终端(黄文接口)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	vendor:"苹果",//品牌 不填查全部
 *  zbu:,//占比大于
 *  slu:,//速率小于
 *  topN:8
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * [
 * 	{
 * 		"timeid":"2016-04-09 20:00:00",
 * 		"vendor":"苹果",
 * 		"model":"IPHONE6S",
 * 		"zbu":15.59000000000000000000000000,
 * 		"slu":805.260000000000000
 * },
 *  ....
 * ]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getTerminalZC=function(params,callBack,failCallBack){
	//默认参数
	var config={
		topN:6,
		zbu:1,
		slu:1,
		vendor:LSMConsts.commonMobiles
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/gsma/kpi/terninalFilterByZc";
		url+="?topN="+config.topN;
		
	if(config.zbu!=null&&config.zbu!=""){
		url+="&zbu="+config.zbu;
	}
	if(config.slu!=null&&config.slu!=""){
		url+="&slu="+config.slu;
	}
	if(config.vendor!=null&&config.vendor!=""){
		url+="&vendor="+config.vendor;
	}
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};



/** 
 * SAEGW速率指标接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getSaegwRatesRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/sgws-time";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * SAEGW速率指标接口（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	sgw:"",//sgw名称
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getSaegwRatesTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		sgw:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/sgws-times";
	url+="?timeBegin="+config.timeBegin;
	url+="&timeEnd="+config.timeEnd;
	url+="&sgw="+config.sgw;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * ENB厂商速率指标接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getENBVendorRatesRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/enbvendors-time";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * ENB厂商速率指标接口（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
  * 	vendor:"",
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getENBVendorRatesTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
			vendor:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/enbvendors-times";
	url+="?timeBegin="+config.timeBegin;
	url+="&timeEnd="+config.timeEnd;
	url+="&vendor="+config.vendor;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * ENB厂商-地市指标接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getENBVendorCityRatesRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/vendors-sds-time";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * ENB-IP速率指标接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getENBIpRatesRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/enbipcs-time";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 属地分ENB-IP统计 速率指标接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  sd:"",//属地 xx分公司
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getCityENBIpRatesRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/sds-enbipc-time";
		url+="?time="+config.time;
		if(config.sd!=null&&config.sd!=""){
			url+="&sd="+config.sd;
		}
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * 地市速率指标接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getCityRatesRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/sds-time";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 地市速率指标接口（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	sd:"",
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getCityRatesTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		sd:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/sds-times";
	url+="?timeBegin="+config.timeBegin;
	url+="&timeEnd="+config.timeEnd;
	url+="&sd="+config.sd;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 热点速率指标排序接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 *  granularity:"1",//粒度
 *  order:"desc",//排序
 *  sortKey:"",//排序指标
 *  num:""//topn
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotspotRatesRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		granularity:1,
		order:"desc",
		sortKey:"4G下行速率500k",
		num:22,
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/hotspots-time-rank";
		url+="?time="+config.time;
		url+="&order="+config.order;
		url+="&sortKey="+config.sortKey;
		url+="&num="+config.num;
		url+="&granularity="+config.granularity;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

LSMScreen.DataManager.prototype.getHotspotUnionRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		hotspots:[],
		granularity:1,
		order:"desc",
		sortKey:"4G下行速率500k",
		num:22,
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	config=$.extend(config,params);
	var pathParam="";
	if(config.timeType!=null){
		pathParam="/"+config.timeType;
	}
	if(config.time==null){
		config.time=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union"+pathParam+"/hotspots-time-rank";
		url+="?time="+config.time;
		url+="&order="+config.order;
		url+="&sortKey="+config.sortKey;
		url+="&num="+config.num;
		url+="&granularity="+config.granularity;
	
	SUtils.crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify(config.hotspots),
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
/** 
 * 热点速率指标 POST传热点名称 （时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	hotspots:"",
 *  time:"yyyy-MM-dd hh:mm:ss",//默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotspotRatesRecordByNames=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/hotspots-time";
	url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify(config.hotspots),
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 热点速率指标（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	hotspot:"",
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotspotRatesTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		hotspot:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/hotspot-times";
	url+="?timeBegin="+config.timeBegin;
	url+="&timeEnd="+config.timeEnd;
	url+="&hotspot="+config.hotspot;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 模糊匹配热点名称
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  match:"",//.*xxxx.*
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotspotNameMatch=function(params,callBack,failCallBack){
	//默认参数
	var config={
		match:".*.*"
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/info/hotspots-match";
		url+="?match="+config.match;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};



/** 
 * ENB-IP速率指标接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getENBIpRatesRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/enbipcs-time";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * ENB-IP速率指标接口（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	ipc:"",
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getENBIpRatesTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		ipc:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/rates/enbipcs-times";
	url+="?timeBegin="+config.timeBegin;
	url+="&timeEnd="+config.timeEnd;
	url+="&ipc="+config.ipc;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * ENB-IP网络质量指标接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getENBIpQualityRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/enbipc-time";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * ENB-IP网络质量指标接口（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	ipc:"",//ENBIP
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getENBIpQualityTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		ipc:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/enbipc-times";
		url+="?ipc="+config.ipc;
		url+="&timeBegin="+config.timeBegin;
		url+="&timeEnd="+config.timeEnd;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * ENB-厂商网络质量指标接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getENBVendorQualityRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/enbvendors-time";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
/** 
 * ENB-厂商网络质量指标接口（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  vendor:"",//厂商名称
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getENBVendorQualityTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
			vendor:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/enbvendors-times";
		url+="?vendor="+config.vendor;
		url+="&timeBegin="+config.timeBegin;
		url+="&timeEnd="+config.timeEnd;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * MMEGROUP成功率接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 *  group:"诺西,爱立信",
 *  aggregation："false"
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMMEGroupSuccRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/signal/mmes-group-time";
		url+="?time="+config.time;
	if(config.group!=""&&config.group!=null){
		url+="&group="+config.group.split(",").join("&group=");
	}
	if(config.aggregation!=""&&config.aggregation!=null){
		url+="&aggregation="+config.aggregation;
	}
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * MMEGROUP成功率接口（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
  * 	group:"",//MME名称
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMMEGroupSuccTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		group:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/signal/mmes-group-times";
	url+="?timeBegin="+config.timeBegin;
	url+="&timeEnd="+config.timeEnd;
	url+="&group="+config.group;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * MME成功率接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMMESuccRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/signal/mmes-time";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * MME成功率接口（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	mme:"",//MME名称
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMMESuccTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		mme:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/signal/mmes-times";
		url+="?timeBegin="+config.timeBegin;
		url+="&timeEnd="+config.timeEnd;
		url+="&mme="+config.mme;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};




/** 
 * 查询地市附着成功率（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	granularity:"1",//时间粒度1分钟 5分钟
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近10分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 *		"上海市":{"4GE-RAB建立请求成功率":0.9990268,"4GE-RAB建立请求时延":61.523624....},
 *		"崇明分公司":{"4GE-RAB建立请求成功率":0.9990268,"4GE-RAB建立请求时延":61.523624....},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getCityQualitySignalRecord=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		granularity:1,
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/sds-signal-time";
		url+="?time="+config.time;
		url+="&granularity="+config.granularity;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 查询地市附着成功率（趋势图）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	sd:"",//MME名称
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getCityQualitySignalTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		sd:"",
		timeBegin:SUtils.getDiffDateTimeFromNow(-12,SUtils.TIME_TYPE.HOUR,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/sds-signal-times";
	url+="?timeBegin="+config.timeBegin;
	url+="&timeEnd="+config.timeEnd;
	url+="&sd="+config.sd;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 查询地市附着成功率（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	granularity:"1",//时间粒度1分钟 5分钟
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近30分钟
 *  sortKey:"4G用户数",//排序指标
 *  major:"视频"//多选以逗号分隔
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	[
 *		{"总用户数":417822,"time":"2016-04-10 10:00:00","element":"微信"},
 * .....
 * ]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getAppRankByKpiAndMajor=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
			sortKey:"4G用户数",
			major:"视频",
		granularity:1,
		time:SUtils.getDiffDateTimeFromNow(-30,SUtils.TIME_TYPE.MIN,format)
	};
	for(var key in params){
		config[key]=params[key];
	}
	
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/apps/all-time-rank";
		url+="?time="+config.time;
		url+="&granularity="+config.granularity;
		url+="&sortKey="+config.sortKey;
		if(config.major!=""&&config.major!=null){
			url+="&major="+config.major.split(",").join("&major=");
		}
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * 查询ENBIP分厂商分地市网络质量指标（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近30分钟
 *  vendor:"厂商1,厂商2"
 * }
 * @param {Function} callBack 回调方法
 * @param {Object} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getEnbipc_sds_vendors=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(-30,SUtils.TIME_TYPE.MIN,format)
		
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/enbipc-sds-vendors-time";
		url+="?time="+config.time;
		if(config.vendor!=""&&config.vendor!=null){
			url+="&vendor="+config.vendor.split(",").join("&vendor=");
		}
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * 查询设备告警统计（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  groupname:"NE_NAME",//分组字段
 *  mtime:10"//最近10分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Object} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 * @example
 * [{"NE_NAME":"SHMME06BNK","AL":"2","cnt":6},{"NE_NAME":"SHMME07BNK","AL":"3","cnt":7},{"NE_NAME":"SHMME09BNK","AL":"2","cnt":1},{"NE_NAME":"SHMME15BER","AL":"3","cnt":10}]
 */
LSMScreen.DataManager.prototype.getDeviceAlarm=function(params,callBack,failCallBack){
	//默认参数
	var config={
		mtime:10,
		groupname:"NE_NAME"
	};
	for(var key in params){
		config[key]=params[key];
	}
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/eaebm/kpi/streamAlarmSummary";
		url+="?groupname="+config.groupname;
		url+="&mtime="+config.mtime;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
/////////////////大屏 右侧  客流分布 START///////////////////////
/** 
 * 省际漫游来访用户数(分省) 分热点
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  hotspot:"迪士尼",//分组字段
 *  time:"yyyy-MM-dd hh:mm:ss//最近10分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Object} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 * @example
 * {"北京":{"time":"2016-05-09 10:05:00","2G":16,"3G":13,"4G":116,"其他":0,"total":145},{..},..}
 */
LSMScreen.DataManager.prototype.getProvinceDistribute=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/totalnum/roam/hotspot-province";
		url+="?time="+config.time;
		url+="&hotspot="+config.hotspot;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 省际漫游来访用户数(分省) 全网
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss//最近10分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Object} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 * @example
 * {"北京":{"time":"2016-05-09 10:05:00","2G":16,"3G":13,"4G":116,"其他":0,"total":145},{..},..}
 */
LSMScreen.DataManager.prototype.getProvinceDistributeAll=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/totalnum/roam/province";
		url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};


/** 
 * 国际漫游来访用户数(时间点) 全网
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss//最近10分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Object} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 * @example
 * {"北京":{"time":"2016-05-09 10:05:00","2G":16,"3G":13,"4G":116,"其他":0,"total":145},{..},..}
 */
LSMScreen.DataManager.prototype.getWorldDistributeAll=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/totalnum/roam/country";
		url+="?time="+config.time;
		url+="&hotspot="+config.hotspot;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 国际漫游来访用户数(时间点) 热点
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  hotspot:"迪士尼",//分组字段
 *  time:"yyyy-MM-dd hh:mm:ss//最近10分钟
 * }
 * @param {Function} callBack 回调方法
 * @param {Object} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 * @example
 * {"北京":{"time":"2016-05-09 10:05:00","2G":16,"3G":13,"4G":116,"其他":0,"total":145},{..},..}
 */
LSMScreen.DataManager.prototype.getWorldDistribute=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/totalnum/roam/hotspot-country";
		url+="?time="+config.time;
		url+="&hotspot="+config.hotspot;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 国际漫游来访用户数(趋势图)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	hotspot:"迪士尼",
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近3小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间
 * }
 * @param {Function} callBack 回调方法
 * @param {Object} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 * @example
 * [{"瑞士":{"time":"2016-05-09 17:05:00","2G":0,"3G":0,"4G":1,"其他":0,"total":1},"xx":{}...}]
 */
LSMScreen.DataManager.prototype.getWorldDistributeTrend=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		timeBegin:SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN,format),
		timeEnd:SUtils.getNowDateTime(format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/totalnum/roam/hotspot-country";
		url+="?timeBegin="+config.timeBegin;
		url+="&timeEnd="+config.timeEnd;
		url+="&hotspot="+config.hotspot;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/////////////////迪士尼大屏 右侧 END///////////////////////


/** 
 * 根据热点名称查询归属小区
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  hotspot:"迪士尼"
 * }
 * @param {Function} callBack 回调方法
 * @param {Object} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 * @example
 * {"result":1,"message":"success","rows":[{"businessCirclesId":"58420","businessCirclesName":"2016-F1周边区域","lacci":"6183-17154","lac":"6183","ci":"17154","cellId":null,"cellName":"DA-嘉泰富_2","cellNt":"2G","dataSource":null,"insertTimestamp":"2016-04-15 13:53:23","cellLongitude":"121.211661","cellLatitude":"31.324125","cellSdName":null,"carriers":null},...]}
 */
LSMScreen.DataManager.prototype.getCellsByHotspot=function(params,callBack,failCallBack){
	//默认参数
	var config={
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/re/re_cellByHotname?hotspot="+config.hotspot;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

LSMScreen.DataManager.prototype.getCellCntsByHotspots=function(params,callBack,failCallBack){
	//默认参数
	var config={
		hotspots:''
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/pm/areaCellCnt?hotspot="+config.hotspots;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
/** 
 * 根据热点名称查询应急通信车
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  hot_name:""
 * }
 */
LSMScreen.DataManager.prototype.getEmerCarByHotspotsPost=function(params,callBack,failCallBack){
	//默认参数
	var config={
		hot_name:''
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/area-cfg-hot-query-emer"
	SUtils.crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		data:JSON.stringify(config),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
LSMScreen.DataManager.prototype.getCellCntsByHotspotsPost=function(params,callBack,failCallBack){
	//默认参数
	var config={
		hotspots:''
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/area-areaCellCnt"
	SUtils.crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		data:JSON.stringify({hotspot:config.hotspots}),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 根据热点名称查询归属小区
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  laccis:["lac:ci","lac:ci",...],
 *  time:"",
 * }
 * @param {Function} callBack 回调方法
 * @param {Object} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 * @example
 * {"109705:22":{"2G用户数":0,"3G用户数":0,....},....}
 */
LSMScreen.DataManager.prototype.getCellsStreamKpiByCells=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
	 	time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
	 	indicatorNameList:null
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/sites-time?time="+config.time;
	if(config.indicatorNameList!=null){
		url+="&indicatorNameList="+config.indicatorNameList;
	}
	SUtils.crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify(config.laccis),
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//根据父热点名称查小区信令数据
LSMScreen.DataManager.prototype.getCellsStreamKpiByHotspot=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		hotspot:'',
	 	time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
	 	indicatorNameList:null
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/hotspot-sites-time?time="+config.time;
	url+="&hotspot="+config.hotspot;
	if(config.indicatorNameList!=null){
		url+="&indicatorNameList="+config.indicatorNameList;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 获取保障区域的热点名称 总热点，场内，场外
 * @public
 * @function 
 * @param {Object} param 暂时无参数
 * @param {Object} callBack.result 返回数据 取content的hotCellNowName hotCellInName hotCellOutName
 * @example
 * [{"id":"保障名称","name":"保障名称","content":"{\"supportName\":\"上海迪士尼保障\",\"hotCellNow\":\"20160504141508\",\"hotCellNowName\":\"迪士尼\",\"hotCellIn\":\"20160504141508\",\"hotCellInName\":\"迪士尼\",\"hotCellOut\":\"20160504141508\",\"hotCellOutName\":\"迪士尼\"}","type":"area"}]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getBaseHotspots = function(param, callBack_, failCallBack_)
{
	var config={
		id:"",
		isDefault:true
	};
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/ipmsdm/cfg-hotConfigQueryContent?1=1";
	if(config.isDefault!=null){
		_url+="&isDefault="+config.isDefault;
	}
	if(config.id!=""&&config.id!=null){
		_url+="&id="+config.id;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};

/** 
 * 获取所有保障区域列表
 * @public
 * @function 
 * @param {Object} param 暂时无参数
 * @param {Object} callBack.result 返回数据 取content的hotCellNowName hotCellInName hotCellOutName
 * @example
 * [{"id":"保障名称","name":"保障名称","content":"{\"supportName\":\"上海迪士尼保障\",\"hotCellNow\":\"20160504141508\",\"hotCellNowName\":\"迪士尼\",\"hotCellIn\":\"20160504141508\",\"hotCellInName\":\"迪士尼\",\"hotCellOut\":\"20160504141508\",\"hotCellOutName\":\"迪士尼\"}","type":"area"}]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getBaseHotspotsList = function(param, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlInasSml+"/query/common";
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		data:'{"ifId":"area-cfg-hotQueryByAllArea"}',
  		success : function(result) 
  		{
  			var list=result.data;
  			for(var i=0;i<list.length;i++){
  				list[i].id=list[i].hot_id;
  				list[i].name=list[i].hot_name;
  			}
  			if(callBack_!=null)
  			{
  				callBack_(list);
  			}
  		},
  		error:failCallBack_
	});
};
/** 
 * 获取所有保障区域列表 排除迪士尼和高铁
 * @public
 * @function 
 * @param {Object} param 暂时无参数
 * @param {Object} callBack.result 返回数据 取content的hotCellNowName hotCellInName hotCellOutName
 * @example
 * [{"id":"保障名称","name":"保障名称","content":"{\"supportName\":\"上海迪士尼保障\",\"hotCellNow\":\"20160504141508\",\"hotCellNowName\":\"迪士尼\",\"hotCellIn\":\"20160504141508\",\"hotCellInName\":\"迪士尼\",\"hotCellOut\":\"20160504141508\",\"hotCellOutName\":\"迪士尼\"}","type":"area"}]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getBaseHotspotsListEx = function(param, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlInasSml+"/query/common";
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		data:'{"ifId":"area-cfg-hotQueryByAllArea"}',
  		success : function(result) 
  		{
  			var list=result.data;
  			var exList=[];
  			for(var i=0;i<list.length;i++){
  				if(list[i].hot_name.indexOf("迪士尼")==-1//除外迪士尼
						&&list[i].hot_name!="高铁"//屏蔽高铁
						){
  					list[i].id=list[i].hot_id;
  	  				list[i].name=list[i].hot_name;
  	  				exList.push(list[i]);
				}
  				
  			}
  			if(callBack_!=null)
  			{
  				callBack_(exList);
  			}
  		},
  		error:failCallBack_
	});
};
/** 
 * 热点下的子热点
 * @public
 * @function 
 * @param {Object} param 
 * @example
 * {
 * 	hotspot:"迪士尼",//父热点
 *  hot_type:"0,1" //0逻辑 1物理
 * }
 * @param {Object} callBack.result 返回数据 取content的hotCellNowName hotCellInName hotCellOutName
 * @example
 * [{"id":"保障名称","name":"保障名称","content":"{\"supportName\":\"上海迪士尼保障\",\"hotCellNow\":\"20160504141508\",\"hotCellNowName\":\"迪士尼\",\"hotCellIn\":\"20160504141508\",\"hotCellInName\":\"迪士尼\",\"hotCellOut\":\"20160504141508\",\"hotCellOutName\":\"迪士尼\"}","type":"area"}]
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getSubHotspots = function(param, callBack_, failCallBack_)
{
	var config={
			hot_type:"0,1"
	};
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/re/re_areaHotRel";
	_url+="?hotspot="+config.hotspot;
	_url+="&hot_type="+config.hot_type;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};


/** 
 * 查询保障区域的告警列表
 * @public
 * @function 
 * @param {Object} param 
 * @example
 * {
 * 	area:"迪士尼保障",//保障区域名称
 * }
 * @param {Object} callBack.result 返回告警列表
 * @example
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getAlarmListByArea = function(param, callBack_, failCallBack_)
{
	var config={
	};
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlZhjkfault+"/statis/alarmbyarea?area_name="+config.area;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};

LSMScreen.DataManager.prototype.getAlarmListByAreaNew = function(param, callBack_, failCallBack_)
{
	var config={
		hotspot:"",
//		time:SUtils.getNowDateTime("yyyyMMdd")
		time:SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,"yyyyMMdd")
	};
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlInasSml+"/query/area-cellAlarm?hotspot="+config.hotspot+"&time="+config.time;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result.data);
  			}
  		},
  		error:failCallBack_
	});
};

/** 
 * 查询阈值列表
 * @public
 * @function 
 * @param {Object} param 
 * @example
 * {
 * 	stat_level:"重要区域"
 * }
 * @param {Object} callBack.result 返回告警列表
 * @example
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getAlarmPolicy = function(param, callBack_, failCallBack_)
{
	var config={
		stat_level:"",
		alarm_fucn_switch:"开",
		alam_mode:"静态门限",
		group_id:"0",
	};
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/info/alarm-policy?1=1";
	
	if(config.stat_level!=""&&config.stat_level!=null){
		_url+="&stat_level="+config.stat_level;
	}
	if(config.alarm_fucn_switch!=""&&config.alarm_fucn_switch!=null){
		_url+="&alarm_fucn_switch="+config.alarm_fucn_switch;
	}
	if(config.alam_mode!=""&&config.alam_mode!=null){
		_url+="&alam_mode="+config.alam_mode;
	}
	if(config.group_id!=""&&config.group_id!=null){
		_url+="&group_id="+config.group_id;
	}
	
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};


/** 
 * 全网趋势图 娄瑶佳接口
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * granularity:5,//1,5
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getAllStreamTrendHour=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	var format0="yyyy-MM-dd 00:00:00";
	//默认参数
	var config={
		timeBegin:SUtils.getNowDateTime(format0),
		timeEnd:SUtils.getNowDateTime(format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/hour/all-times";
	
	url+="?timeBegin="+config.timeBegin;
	url+="&timeEnd="+config.timeEnd;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

LSMScreen.DataManager.prototype.getAllStreamRecordHour=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/hour/all-time";
	
	url+="?time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
LSMScreen.DataManager.prototype.getAllStreamRecordDayMonth=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		time:SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,format),
		timeType:"day"
	};
	if(params.timeType=="day"){
		config.time=SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,format)
	}else if(params.timeType=="month"){
		config.time=SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.MONTH,format)
	}
	config=$.extend(config,params);
	
	var url=LSMConsts.G_URLCONFIG.urlWs+"/metro/all-time";
	
	url+="?time="+config.time+"&timeType="+config.timeType;
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 获取全网趋势图 全网全指标 分三个接口插(娄耀佳接口)
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * idrFilter:"",//指标ID
 *  granularity:5,//时间粒度 默认5分钟(1->1分钟，5->5分钟)
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近3小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getAllStreamTrendRealTime=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		idrFilter:"",
	 	granularity:5,
	 	timeBegin:SUtils.getDiffDateTimeFromNow(-3,SUtils.TIME_TYPE.HOUR,format),
	 	timeEnd:SUtils.getNowDateTime(format)
	};
	
	for(var key in params){
		config[key]=params[key];
	}
	
	
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/quality/all-times?granularity="+config.granularity
			+"&timeBegin="+config.timeBegin
			+"&timeEnd="+config.timeEnd;
	if(config.idrFilter!=""&&config.idrFilter!=null){
		url+="&idrFilter="+config.idrFilter;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//全网数据union版
LSMScreen.DataManager.prototype.getAllStreamTrendUnion=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	var format0="yyyy-MM-dd 00:00:00";
	//默认参数
	var config={
	 	granularity:5,
	 	timeBegin:SUtils.getDiffDateTimeFromNow(-3,SUtils.TIME_TYPE.HOUR,format),
	 	timeEnd:SUtils.getNowDateTime(format)
	};
	
	if (params.granularity ==60)
	{
		config.timeBegin = SUtils.getDiffDateTimeFromNow(-0,SUtils.TIME_TYPE.MIN,format0);
		config.timeEnd = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.MIN,format);
		config.timeBeginCompare = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare0);
		config.timeEndCompare = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare);
	}else{
		config.timeBegin = SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		config.timeEnd = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		config.timeBeginCompare = SUtils.getDiffDateTimeFromNow(-1620+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,LSMScreen.DataManager.formatSpecialCompare);
		config.timeEndCompare = SUtils.getDiffDateTimeFromNow(-1440+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,LSMScreen.DataManager.formatSpecialCompare);
	}
	for(var key in params){
		config[key]=params[key];
	}
	
	
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/all-times-compare?granularity="+config.granularity
			+"&timeBegin="+config.timeBegin
			+"&timeEnd="+config.timeEnd
			+"&timeBeginCompare="+config.timeBeginCompare
			+"&timeEndCompare="+config.timeEndCompare;
	if(config.indicatorNameList!=null){
		url+="&indicatorNameList="+config.indicatorNameList;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				chartData=chartData.reverse();
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 专线信息
 * @public
 * @function 
 */
LSMScreen.DataManager.prototype.getLineInfoList = function(param, callBack_, failCallBack_)
{
	var config={
			hotspot:"",
			line_id:null
		};
		config=$.extend(config,param);
		var _url = LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/pm/lineAlarm?hotspot="+config.hotspot;
		if(config.line_id!=null){
			_url+="&line_id="+config.line_id;
		}
		SUtils.crossSafeAjax({
	  		type:"GET",
	  		async:false,
	  		dataType:"application/json",
	  		contentType:"application/json",
	  		processData:false,
	  		url:encodeURI(_url),
	  		success : function(result) 
	  		{
	  			if(callBack_!=null)
	  			{
	  				callBack_(result);
	  			}
	  		},
	  		error:failCallBack_
		});
};

/** 
 * 专线信息钻取趋势图
 * @public
 * @function 
 */
LSMScreen.DataManager.prototype.getLineTrend = function(param, callBack_, failCallBack_)
{
	var config={
			line_id:''
	};
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/pm/lineKpi?line_id="+config.line_id;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};
/** 
 * 专线信息钻取
 * @public
 * @function 
 */
LSMScreen.DataManager.prototype.getLineDetailList = function(param, callBack_, failCallBack_)
{
	var config={
		lineName:""
	};
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/fast_query/gsma/ipnet/boceDetail?name="+config.lineName;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};


/** 
 * 保存配置信息
 * @public
 * @function 
 * @example
 * {
		"tableName":"dm_co_ba_cfg_bs",
		"type":"update",
		"conditions":["id"],
		"data":{
			"id":"areaKpiConfig",
			"content":"配置"
		}
	};
	
	表名指定：tableName
	操作指定：type    update|insert|delete 默认insert
	conditions:   更新的字段，增加不用填
	data:  更新对象
 */
LSMScreen.DataManager.prototype.configOperate = function(param, callBack_, failCallBack_)
{
	var config={
		"tableName":"dm_co_ba_cfg_bs",
		"type":"update",
		"conditions":["id"]
	};
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/fast_update/common";
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		data : JSON.stringify(config),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};

/** 
 * 根据热点查业务大类下的APP或小类排名也可查全网
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	hotspot:"",
 * 	majors:"",//&major=major&major=xxx.... majors和minors 只有一个生效
 * 	minors:"",//&minor=major:minor&minor=xxx.... 
 *  granularity:1,//时间粒度 默认5分钟(1->1分钟，5->5分钟)
 *  time:"yyyy-MM-dd hh:mm:ss",
 *  num:10,//返回记录数量
 *  sortKey:"4G流量比",//排序字段
 *  order:"desc"//升降序
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getAppRank=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		hotspot:"",
	 	granularity:5,
	 	time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
	 	majors:"",
	 	minors:"",
	 	num:6,
	 	sortKey:"4G流量比",
	 	order:"desc"
	};
	if(params.timeType=="hour"){
		config.granularity=60;
		config.time=SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN,format);
	}
	config=$.extend(config,params);
	if(config.granularity>60){
		config.granularity=5;
	}
	if(config.time==null) 
		config.time=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
	var pathParam="all";
	if(config.hotspot!=""&&config.hotspot!=null){
		pathParam="hotspot";
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/apps/"+pathParam+"-time-rank?time="+config.time
			+"&granularity="+config.granularity
			+"&num="+config.num
			+"&sortKey="+config.sortKey
			+"&order="+config.order
			+config.majors
			+config.minors;
	if(config.hotspot!=""&&config.hotspot!=null){
		url+="&hotspot="+config.hotspot;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//根据热点和应用小类查指标趋势
LSMScreen.DataManager.prototype.getHotspotAppKpisCompared=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
			minor:"",
			hotspot:"",
			indicatorNameList:'',
			granularity:5,
			timeBegin:SUtils.getDiffDateTimeFromNow(-3,SUtils.TIME_TYPE.HOUR,format),
		 	timeEnd:SUtils.getNowDateTime(format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/apps/hotspot-times";
		url+="?timeBegin="+config.timeBegin;
		url+="&timeEnd="+config.timeEnd;
		url+="&minor="+config.minor;
		url+="&granularity="+config.granularity;
		url+="&hotspot="+config.hotspot;
		
		if(config.indicatorNameList!=null&&config.indicatorNameList!=''){
			url+="&indicatorNameList="+config.indicatorNameList;
		}
		
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
//视频特殊指标
LSMScreen.DataManager.prototype.getVideoAppRank=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		majorName:"视频",
		hotspot:"",
	 	granularity:5,
	 	time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
	 	majors:"",
	 	minors:"",
	 	num:6,
	 	sortKey:"4G流量比",
	 	order:"desc"
	};
	if(params.timeType=="hour"){
		config.granularity=60;
		config.time=SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN,format);
	}
	config=$.extend(config,params);
	if(config.time==null) 
		config.time=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
//	var pathParam="all";
//	if(config.hotspot!=""&&config.hotspot!=null){
//		pathParam="hotspot";
//	}
//	var url=LSMConsts.G_URLCONFIG.urlStream+"/"+this.getMajorPathParam(config.majorName)+"/apps/"+pathParam+"-time-rank?time="+config.time
	var url=LSMConsts.G_URLCONFIG.urlStream+"/"+this.getMajorPathParam(config.majorName)+"/apps/select-time-rank?time="+config.time
//			+"&majorName="+config.majorName
			+"&granularity="+config.granularity
			+"&num="+config.num
			+"&sortKey="+config.sortKey
			+"&order="+config.order;
//	if(config.hotspot!=""&&config.hotspot!=null){
//		url+="&hotspot="+config.hotspot;
//	}
	SUtils.crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data : JSON.stringify(config.minors),
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData,config]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 根据热点查业务大类排名
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	hotspot:"",
 * 	majors:"",//&major=major&major=xxx.... 
 *  granularity:1,//时间粒度 默认5分钟(1->1分钟，5->5分钟)
 *  time:"yyyy-MM-dd hh:mm:ss",
 *  num:10,//返回记录数量
 *  sortKey:"4G流量比",//排序字段
 *  order:"desc"//升降序
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMajorRankByHotspot=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		hotspot:"",
	 	granularity:1,
	 	time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
	 	majors:"",
	 	num:6,
	 	sortKey:"4G流量比",
	 	order:"desc"
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/union/majors/hotspot-time-rank?time="+config.time
			+"&granularity="+config.granularity
			+"&num="+config.num
			+"&sortKey="+config.sortKey
			+"&order="+config.order
			+"&hotspot="+config.hotspot
			+config.majors;
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 全网流量比
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	hotspot:"",
 *  time:"yyyy-MM-dd hh:mm:ss",
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getBytesDataByHotspot=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		hotspot:"",
	 	time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/ue/bytes/hotspots-time?time="+config.time
			+"&hotspot="+config.hotspot;
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 大客流用户数
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 * 	hotspot:"",
 *  time:"yyyy-MM-dd hh:mm:ss",
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getGridHotPftTrend=function(params,callBack,failCallBack){
	var format0="yyyyMMdd00";
	var format="yyyyMMddhh";
	//默认参数
	var config={
		hotspot:"",
	 	startTime:SUtils.getNowDateTime(format0),
	 	endTime:SUtils.getNowDateTime(format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/d/gridHotPftTrend?startTime="+config.startTime+"&endTime="+config.endTime;
	if(config.hotspot!=""&&config.hotspot!=null){
		url+="&hotspot="+config.hotspot;
	}
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 保存配置信息
 * @public
 * @function 
 *
*/
LSMScreen.DataManager.prototype.getConfigData = function(param, callBack_, failCallBack_)
{
	var config={
		type:"config",
		id:null
	};
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/fast_query/eaebm/cfg/bsParCfg?type="+config.type;
	if(config.id!=null){
		_url+='&id='+config.id;
	}
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};

/**页面加载时间记录接口*/
LSMScreen.DataManager.prototype.saveRequestDelay=function(param,callBack){
	var userName=$.cookie("inas_portallogin_user_username");
	var config={
		"host":LSMConsts.IPPORTARR[0],
		"logLevel":"1",
		"operateType":"01",
		"moduleCode":"",
		"message":"",
		"userName":userName,
		"optReason":"local_sh",
		"qryusedTime":""
	};
	config=$.extend(config,param);
	SUtils.crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : LSMConsts.G_URLCONFIG.baseUrl + '/INAS/rest/srptlog/buildTake',
  		data : JSON.stringify(config),
  		success : function(data) {
  		}
	});
};

/** 
 * 热点VOLTE指标
 * @public
 * @function 
 * @param {String} params 热点区域
 * @example
 * {
 * 	timeType:""//hour 
 * 	timeBegin:"2016-05-20 15:00:00"
 * 	timeEnd
 * 	timeBeginCompare
 * 	timeEndCompare
 * 	site:""//lac:ci
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotspotVolteTime = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			timeType:null,
			hotspot:null,
			time:null
		}; 
	config=$.extend(config,params);
	var timeTag="";
	if(config.timeType=="hour"){
		timeTag="hour/";
	}
	if(config.time==null){
		if(config.timeType=="hour"){
			config.time=SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN, format);
		}else{
			config.time=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, format);
		}
	}
	
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/ue/bytes/"+timeTag+"hotspot-majors-time?hotspot="+config.hotspot+"&time="+config.time+"&major=VOLTE视频&major=VOLTE语音";
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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

/** 
 * 多热点VOLTE指标
 * @public
 * @function 
 * @param {String} params 热点区域
 * @example
 * {
 * 	timeType:""//hour 
 * 	timeBegin:"2016-05-20 15:00:00"
 * 	timeEnd
 * 	timeBeginCompare
 * 	timeEndCompare
 * 	site:""//lac:ci
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotspotsVolteTime = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			timeType:null,
			hotspots:[],
			time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, format)
		}; 
	config=$.extend(config,params);
//	var _url = LSMConsts.G_URLCONFIG.urlStream+"/ue/bytes/"+timeTag+"hotspot-majors-time?hotspot="+config.hotspot+"&time="+config.time+"&major=VOLTE视频&major=VOLTE语音";
	var _url=LSMConsts.G_URLCONFIG.urlStream+"/ue/bytes/hotspots-majors-time?time="+config.time+"&major=VOLTE语音&major=VOLTE视频";
	SUtils.crossSafeAjax({
  		type : "POST",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(_url),
  		data:JSON.stringify(config.hotspots),
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

/** 
 * 多小区VOLTE指标
 * @public
 * @function 
 * @param {String} params 热点区域
 * @example
 * {
 * 	timeType:""//hour 
 * 	timeBegin:"2016-05-20 15:00:00"
 * 	timeEnd
 * 	timeBeginCompare
 * 	timeEndCompare
 * 	site:""//lac:ci
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getSitesVolteTime = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			timeType:null,
			sites:[],
			time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, format)
		}; 
	config=$.extend(config,params);
//	var _url = LSMConsts.G_URLCONFIG.urlStream+"/ue/bytes/"+timeTag+"hotspot-majors-time?hotspot="+config.hotspot+"&time="+config.time+"&major=VOLTE视频&major=VOLTE语音";
	var _url=LSMConsts.G_URLCONFIG.urlStream+"/ue/bytes/hotspots-majors-time?time="+config.time+"&major=VOLTE语音&major=VOLTE视频";
	SUtils.crossSafeAjax({
  		type : "POST",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(_url),
  		data:JSON.stringify(config.sites),
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


/** 
 * 热点VOLTE指标
 * @public
 * @function 
 * @param {String} params 热点区域
 * @example
 * {
 * 	timeType:""//hour 
 * 	timeBegin:"2016-05-20 15:00:00"
 * 	timeEnd
 * 	timeBeginCompare
 * 	timeEndCompare
 * 	site:""//lac:ci
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getHotspotVolteTrend = function(params, callBack_, failCallBack_)
{
	var format0="yyyy-MM-dd 00:00:00";
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			timeBegin:SUtils.getNowDateTime(format0),
			timeEnd:SUtils.getNowDateTime(format),
			timeBeginCompare:SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare0),
			timeEndCompare:SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare),
			timeType:null,
			hotspot:null
		}; 
	
	if (params.timeType != null)
	{
		config.timeBegin = SUtils.getDiffDateTimeFromNow(-0,SUtils.TIME_TYPE.MIN,format0);
		config.timeEnd = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.MIN,format);
		config.timeBeginCompare = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare0);
		config.timeEndCompare = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,LSMScreen.DataManager.formatSpecialCompare);
	}else{
		config.timeBegin = SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		config.timeEnd = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		config.timeBeginCompare = SUtils.getDiffDateTimeFromNow(-1620+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,LSMScreen.DataManager.formatSpecialCompare);
		config.timeEndCompare = SUtils.getDiffDateTimeFromNow(-1440+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,LSMScreen.DataManager.formatSpecialCompare);
	}
	
	config=$.extend(config,params);
	var timeTag="";
	if(config.timeType=="hour"){
		timeTag="&granularity=60";
	}
	
	
	
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/ue/bytes/hotspot-majors-times-compare?hotspot="+config.hotspot+"&major=VOLTE视频&major=VOLTE语音"+timeTag
	+"&timeBegin=" + config.timeBegin+"&timeEnd="+config.timeEnd
	+"&timeBeginCompare=" + config.timeBeginCompare + "&timeEndCompare=" + config.timeEndCompare;
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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


/////////////////////////////////////地铁接口



/** 
 * 获取地铁各条线路的开通站点数
 * @public
 * @function 
 * @param {String} params 
 * @example
 * {
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMetroLineStationCount = function(params, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/metro/info/lines-station-num";
//	var _url = "http://10.221.247.7:8299/stream/metro/info/lines-station-num";
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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


/** 
 * 获取所有地铁站点网络类型
 * @public
 * @function 
 * @param {String} params 
 * @example
 * {
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMetroLineStationCellType = function(params, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/metro/info/stations-nt";
//	var _url = "http://10.221.247.7:8299/stream/metro/info/stations-nt";
	SUtils.crossSafeAjax({//http://10.221.247.7:8080
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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


/** 
 * 获取所有地铁站点地上地下类型
 * @public
 * @function 
 * @param {String} params 
 * @example
 * {
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMetroLineStationUpDown = function(params, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/metro/info/stations-type";
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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

//专线列表
LSMScreen.DataManager.prototype.getSpList = function(param, callBack_, failCallBack_)
{
	var config={
		hotspot:"",
		line_id:null,
		time:null
	};
	config=$.extend(config,param);
	var _url = LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/pm/lineAlarm";//+config.hotspot;
	if(config.line_id!=null){
		_url+="?line_id="+config.line_id;
	}else if(config.hotspot!=null){
		_url+="?hotspot="+config.hotspot;
	}
	
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};


/** 
 * 获取地铁站点指标排名
 * @public
 * @function 
 * @param {String} params 热点区域
 * @example
 * {
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMetroStationKpiRank = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, format),
			sortKey:"4G用户数",
			num:10,
			order:"desc",
			exclude0:false, 
			line:null,
			threshold:null,
			timeType:null
		}; 
	
	config=$.extend(config,params);
	if(config.time==null) 
		config.time=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
	
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/metro/stations-time-rank?time="+config.time
				+"&exclude0="+config.exclude0
				+"&sortKey="+config.sortKey
				+"&num="+config.num
				+"&order="+config.order;
	if(config.timeType=="day"||config.timeType=="month"){
		_url=_url.replace(LSMConsts.G_URLCONFIG.urlStream,LSMConsts.G_URLCONFIG.urlWs);
		_url+="&timeType="+config.timeType;
	}
	
	if(config.line!=null){
		_url+="&line="+config.line;
	}
	if(config.threshold!=null){
		_url+="&threshold="+config.threshold;
	}
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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

/** 
 * 获取地铁站点指标排名--移动用户
 * @public
 * @function 
 * @param {String} params 热点区域
 * @example
 * {
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMetroStationKpiRankRoute = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, format),
			sortKey:"4G流量",
			num:10,
			order:"desc",
			exclude0:false, 
			line:null,
			threshold:null,
			timeType:null
		}; 
	
	config=$.extend(config,params);
	if(config.time==null) 
		config.time=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
	
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/metro/stations-time-rank-route?time="+config.time
				+"&exclude0="+config.exclude0
				+"&sortKey="+config.sortKey
				+"&num="+config.num
				+"&order="+config.order;
	if(config.line!=null){
		_url+="&line="+config.line;
	}
	if(config.threshold!=null){
		_url+="&threshold="+config.threshold;
	}
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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

/** 
 * 获取地铁站点指标排名--进出站 两个接口同时查
 * @public
 * @function 
 * @param {String} params 热点区域
 * @example
 * {
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMetroStationKpiRankInout = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, format),
			sortKey:"总用户数",
			num:10,
			order:"desc",
			exclude0:false, 
			line:null,
			threshold:null,
			addKey:"总用户数",
			timeType:null
		}; 
	
	config=$.extend(config,params);
	if(config.time==null) 
		config.time=SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN,format);
	
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/metro/stations-totalnum-rin-rank?time="+config.time
				+"&exclude0="+config.exclude0
				+"&sortKey="+config.sortKey
				+"&num="+config.num
				+"&order="+config.order;
	if(config.line!=null){
		_url+="&line="+config.line;
	}
	if(config.threshold!=null){
		_url+="&threshold="+config.threshold;
	}
	
	var _url2=_url.replace("stations-totalnum-rin-rank","stations-totalnum-rout-rank");
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(_url),
  		success : function(inResult) 
  		{
  			SUtils.crossSafeAjax({
  		  		type : "GET",
  		  		async : false,
  		  		dataType : "application/json",
  		  		contentType : "application/json",
  		  		processData : false,
  		  		url:encodeURI(_url2),
  		  		success : function(outResult) 
  		  		{
  		  			if(callBack_!=null)
  		  			{
  		  				var addKey=config.addKey;
	  		  			var inMap={};
	  		  			for(var i=0;i<inResult.length;i++){
	  		  				var inRecord=inResult[i];
	  		  				inMap[inRecord.line+inRecord.station]=inRecord[addKey];
	  		  			}
	  		  			for(var j=0;j<outResult.length;j++){
	  		  				var outRecord=outResult[j];
	  		  				var inData=inMap[outRecord.line+outRecord.station];
	  		  				if(!isNaN(inData)){
	  		  					outResult[j]["进出站总用户数"]=parseFloat(outRecord[addKey])+parseFloat(inData);
	  		  				}
	  		  			}
  		  				callBack_(outResult);
  		  			}
  		  		},
  		  		error:failCallBack_
  			});
  		},
  		error:failCallBack_
	});
};
/** 
 * 获取地铁站点指标趋势图 用于地图播放功能 同时查三个接口
 * @public
 * @function 
 */
LSMScreen.DataManager.prototype.getMetroAllStationKpiTrend = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			timeBegin:SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
			timeEnd:SUtils.getNowDateTime(format),
			timeType:null
		}; 
	
	config=$.extend(config,params);
	if(config.timeBegin==null){
		config.timeBegin=SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
	}
	
	if(config.timeEnd==null){
		config.timeEnd=SUtils.getNowDateTime(format);
	}
	
	var url1 = LSMConsts.G_URLCONFIG.urlStream+"/metro/stations-totalnum-times?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd;
	var url2 = LSMConsts.G_URLCONFIG.urlStream+"/metro/stations-totalnum-in-times?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd;
	var url3 = LSMConsts.G_URLCONFIG.urlStream+"/metro/stations-totalnum-out-times?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd;
	var doneURLList=[];
	var finalResult={};
	var tmpResult={};
	
	if(config.timeType=="day"||config.timeType=="month"){
		url1=url1.replace(LSMConsts.G_URLCONFIG.urlStream,LSMConsts.G_URLCONFIG.urlWs);
		url1+="&timeType="+config.timeType;
		
		url2=url2.replace(LSMConsts.G_URLCONFIG.urlStream,LSMConsts.G_URLCONFIG.urlWs);
		url2+="&timeType="+config.timeType;
		
		url3=url3.replace(LSMConsts.G_URLCONFIG.urlStream,LSMConsts.G_URLCONFIG.urlWs);
		url3+="&timeType="+config.timeType;
	}
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url1),
  		success : function(result1) 
  		{
  			mergeResult(result1,'url1');
  		},
  		error:failCallBack_
	});
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url2),
  		success : function(result2) 
  		{
  			mergeResult(result2,'url2');
  		},
  		error:failCallBack_
	});
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url3),
  		success : function(result3) 
  		{
  			mergeResult(result3,'url3');
  		},
  		error:failCallBack_
	});
	
	function mergeResult(result,type){
		for(var line in result){
			var lineData=result[line];
			for(var station in lineData){
				var arr=lineData[station];
				for(var i=0;i<arr.length;i++){
					var dataRecord=arr[i];
					var time=dataRecord.time;
					var key=line+station;
					if(tmpResult[time]==null){
						tmpResult[time]={};
						tmpResult[time][key]={};
					}else if(tmpResult[time][key]==null){
						tmpResult[time][key]={};
					}
					if(type=="url1"){
						tmpResult[time][key]=$.extend(tmpResult[time][key],dataRecord);
					}else if(type=="url2"||type=="url3"){
						if(isNaN(tmpResult[time][key]["进出站总用户数"])){
							tmpResult[time][key]["进出站总用户数"]=0;
						}
						tmpResult[time][key]["进出站总用户数"]+=dataRecord["总用户数"];
					}
				}
			}
		}
		
		doneURLList.push(type);
		if(doneURLList.length==3){
			if(callBack_!=null)
  			{
				for(var timeKey in tmpResult){
					var timeRecord=tmpResult[timeKey];
					finalResult[timeKey]=[];
					for(var lineAndStationKey in timeRecord){
						var record=timeRecord[lineAndStationKey];
						finalResult[timeKey].push(record);
					}
				}
  				callBack_(finalResult);
  			}
		}
	}
};

/** 
 * 获取地铁全网指标趋势图 用于地图播放功能 同时查三个接口
 * @public
 * @function 
 */
LSMScreen.DataManager.prototype.getMetroAllKpiTrend = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			timeBegin:SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
			timeEnd:SUtils.getNowDateTime(format)
		}; 
	
	config=$.extend(config,params);
	if(config.timeBegin==null){
		config.timeBegin=SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
	}
	
	if(config.timeEnd==null){
		config.timeEnd=SUtils.getNowDateTime(format);
	}
	
	var url1 = LSMConsts.G_URLCONFIG.urlStream+"/union/hotspot-times?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd+"&hotspot=地铁";
	var url2 = LSMConsts.G_URLCONFIG.urlStream+"/metro/totalnum-rin-times?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd;
	var url3 = LSMConsts.G_URLCONFIG.urlStream+"/metro/totalnum-rout-times?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd;
	var doneURLList=[];
	var tmpResult={};
	
	if(config.timeType=="day"||config.timeType=="month"){
		url1=url1.replace(LSMConsts.G_URLCONFIG.urlStream+"/union",LSMConsts.G_URLCONFIG.urlWs+"/metro");
		url1+="&timeType="+config.timeType;
		
		url2=url2.replace(LSMConsts.G_URLCONFIG.urlStream,LSMConsts.G_URLCONFIG.urlWs);
		url2+="&timeType="+config.timeType;
		
		url3=url3.replace(LSMConsts.G_URLCONFIG.urlStream,LSMConsts.G_URLCONFIG.urlWs);
		url3+="&timeType="+config.timeType;
	}
	
	
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url1),
  		success : function(result1) 
  		{
  			mergeResult(result1,'url1');
  		},
  		error:failCallBack_
	});
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url2),
  		success : function(result2) 
  		{
  			mergeResult(result2,'url2');
  		},
  		error:failCallBack_
	});
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url3),
  		success : function(result3) 
  		{
  			mergeResult(result3,'url3');
  		},
  		error:failCallBack_
	});
	
	function mergeResult(result,type){
		var arr=result;
		for(var i=0;i<arr.length;i++){
			var dataRecord=arr[i];
			var time=dataRecord.time;
			if(tmpResult[time]==null){
				tmpResult[time]={};
			}
			if(type=="url1"){
				tmpResult[time]=$.extend(tmpResult[time],dataRecord);
			}else if(type=="url2"||type=="url3"){
				if(isNaN(tmpResult[time]["进出站总用户数"])){
					tmpResult[time]["进出站总用户数"]=0;
				}
				tmpResult[time]["进出站总用户数"]+=dataRecord["总用户数"];
			}
		}
		
		
		doneURLList.push(type);
		if(doneURLList.length==3){
			if(callBack_!=null)
  			{
				callBack_(tmpResult);
  			}
		}
	}
};
/** 
 * 获取地铁站点指标排名 根据类型切换调用不同的接口
 * @public
 * @function 
 */
LSMScreen.DataManager.prototype.getMetroStationKpiRankMultiType = function(params, callBack_, failCallBack_)
{
	var interfaceType=params.interfaceType;
	var dm=LSMScreen.DataManager.getInstance();
	if(interfaceType=="ws"){//黄文接口
		dm.getHotSpotTrafficFlow(params, callBack_, failCallBack_);
	}else{//娄瑶佳接口
		var format="yyyy-MM-dd hh:mm:ss";
		var config={
				time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, format),
				sortKey:"4G用户数",
				num:10,
				order:"desc",
				exclude0:false, 
				line:null,
				threshold:null,
				interfaceType:null,
				timeType:null
			}; 
		config=$.extend(config,params);
		if(config.timeType=="day"||config.timeType=="month"){
			dm.getMetroStationKpiRank(config, callBack_, failCallBack_);//天月数据统一使用朱雪雯接口
		}else{
			if(interfaceType==null||interfaceType=="common"){// 一般 娄瑶佳接口
				dm.getMetroStationKpiRank(config, callBack_, failCallBack_);
			}else if(interfaceType=="inout"){//进出站
				dm.getMetroStationKpiRankInout(config, callBack_, failCallBack_);
			}else if(interfaceType=="route"){//移动用户
				if(config.time==null) config.time=SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN, format);
				dm.getMetroStationKpiRankRoute(config, callBack_, failCallBack_);
			}
		}
	}
	 
};

/** 
 * 获取某个地铁站点指标
 * @public
 * @function 
 * @param {String} params 热点区域
 * @example
 * {
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMetroStationsKpi = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, format),
			timeType:null,
			line:1
		}; 
	
	config=$.extend(config,params);
	if(config.time==null){
		config.time=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, format);
	}
	
//	var _url = "http://10.221.247.7:8299/stream/metro/stations-time?time="+config.time
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/metro/stations-time?time="+config.time
				+"&line="+config.line;
	
	if(config.timeType=="day"||config.timeType=="month"){
		_url=_url.replace(LSMConsts.G_URLCONFIG.urlStream,LSMConsts.G_URLCONFIG.urlWs);
		_url+="&timeType="+config.timeType;
	}
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
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

/** 
 * 获取某个地铁站点指标 趋势图
 * @public
 * @function 
 * @param {String} params 热点区域
 * @example
 * {
 * }
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMetroStationsKpiTrend = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			timeBegin:SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
			timeEnd:SUtils.getNowDateTime(format),
			timeBeginCompare:SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
			timeEndCompare:SUtils.getNowDateTime(format),
			timeType:null,
			line:1
		}; 
	
	config=$.extend(config,params);
	if(config.timeBegin==null){
		config.timeBegin=SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
	}
	
	if(config.timeEnd==null){
		config.timeEnd=SUtils.getNowDateTime(format);
	}
	
	
	
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/metro/station-times-compare?timeBegin="+config.timeBegin
				+"&timeEnd="+config.timeEnd
				+"&timeBeginCompare="+config.timeBeginCompare
				+"&timeEndCompare="+config.timeEndCompare
				+"&line="+config.line
				+"&station="+config.station;
	

	if(config.timeType=="day"||config.timeType=="month"){
		_url=_url.replace(LSMConsts.G_URLCONFIG.urlStream,LSMConsts.G_URLCONFIG.urlWs);
		_url+="&timeType="+config.timeType;
	}
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				if(result_!=null){
  					result_=result_.reverse();
  				}
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

/** 
 * 根据地铁站查小区
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  line:2,//地铁线
 *  station:"人民广场"
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMetroSites=function(params,callBack,failCallBack){
	var config={};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/metro/info/station-sites";
		url+="?line="+config.line;
		url+="&station="+config.station;
	
	SUtils.crossSafeAjax({
			type : 'GET',
			async : false,
			dataType : "application/json",
			contentType : "application/json",
			processData : false,
			url : encodeURI(url),
			success : function(rawData) {
				//data convert process...
				var chartData=rawData;
				if(callBack!=null){
					callBack.apply(this, [chartData]);
				}
			},
			error:failCallBack
	});
};

/** 
 * 根据小区查指标排序POST
 * @public
 * @function 
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getSitesKpisRank = function(params,callBack,failCallBack)
{
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		hotspot:null,
		sites:[],
		order:"asc",
		sortKey:"下行速率500k",
		num:5,
		exclude0:false,
//		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
		time:SUtils.getDiffDateTimeFromNow(-15,SUtils.TIME_TYPE.MIN,format)//卞臻 倒推10分钟概率性无数据
	};
	config=$.extend(config,params);
	var method="POST";
	var url=LSMConsts.G_URLCONFIG.urlStream+"/rank/sites-allidrs-time";
	if(config.timeType=="hour"){
		url=LSMConsts.G_URLCONFIG.urlStream+"/rank/hour/sites-time";//暂时满足需求 只能进行小数据量查询
	}else{
		config.timeType=null;
	}
	
	if(config.time==null){
		config.time=SUtils.getDiffDateTimeFromNow(-15,SUtils.TIME_TYPE.MIN,format);//卞臻 倒推10分钟概率性无数据
	}
	url+="?time="+config.time;
	url+="&order="+config.order;
	url+="&sortKey="+config.sortKey;
	url+="&exclude0="+config.exclude0;
	url+="&num="+config.num;
	if(config.rat!=""&&config.rat!=null){
		url+="&rat="+config.rat;
	}
	if(config.hotspot!=""&&config.hotspot!=null){
		url+="&hotspot="+config.hotspot;
	}
	if(config.hotspot!=""&&config.hotspot!=null&&config.timeType!="hour"){
		method="GET";
	}
	SUtils.crossSafeAjax({
  		type:method,
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		data:JSON.stringify(config.sites),
  		url:encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};
/** 
 * 小区指标排序接口（时间点）
 * @public
 * @function 
 * @param {Object} params 查询参数
 * @example
 * {
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近20分钟
 *  hotspot:"地铁",//父热点
 *  order:"desc",//排序
 *  sortKey:"",//排序指标
 *  num:""//topn
 * }
 * @param {Function} callBack 回调方法
 * @param {Array} callBack.chartData 图表数据 返回了网络质量的所有指标数据和time
 * @example
 * 	{
 * 		"SHSAEGW15BER":{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632,
        "time": "2016-04-08 12:10:00"
 * 		},
 * .....
 * }
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getMetroCellRank=function(params,callBack,failCallBack){
	var format="yyyy-MM-dd hh:mm:ss";
	//默认参数
	var config={
		hotspot:"地铁",
		order:"asc",
		sortKey:"下行速率500k",
		num:5,
		exclude0:false,
//		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
		time:SUtils.getDiffDateTimeFromNow(-15,SUtils.TIME_TYPE.MIN,format)//卞臻 倒推10分钟概率性无数据
	};
	config=$.extend(config,params);
	if(config.time==null) 
		config.time=SUtils.getDiffDateTimeFromNow(-15,SUtils.TIME_TYPE.MIN,format);//卞臻 倒推10分钟概率性无数据
	var url=LSMConsts.G_URLCONFIG.urlStream+"/rank/sites-allidrs-time";
		url+="?time="+config.time;
		url+="&order="+config.order;
		url+="&sortKey="+config.sortKey;
		url+="&exclude0="+config.exclude0;
		url+="&num="+config.num;
		url+="&hotspot="+config.hotspot;
		if(config.rat!=""&&config.rat!=null){
			url+="&rat="+config.rat;
		}
	
	SUtils.crossSafeAjax({
  		type : 'GET',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : encodeURI(url),
  		success : function(rawData) {
  			//data convert process...
  			var chartData=rawData;
  			if(callBack!=null){
  				callBack.apply(this, [chartData]);
  			}
  		},
  		error:failCallBack
	});
};

/** 
 * 地铁站点下时间趋势图--同历史数据比
 * @public
 * @function 
 * @param {String} hotspot_ 热点区域
 * @param {String} timeType_ 时间类型 默认null->5分钟 ,hour->小时
 * @example
 * "迪士尼"
 * @param {Function} callBack_ 回调方法
 * @param {Function} failCallBack 查询失败回调方法
 */
LSMScreen.DataManager.prototype.getStationKpisCompared = function(param, callBack_, failCallBack_)
{
	var line_=param.line;
	var station_=param.station;
	var timeBegin_=param.timeBegin;
	var timeEnd_=param.timeEnd;
	var timeBeginCompare_=param.timeBeginCompare;
	var timeEndCompare_=param.timeEndCompare;
	var timeType_=param.timeType;
	var format="yyyy-MM-dd hh:mm:ss";
	var _format0="yyyy-MM-dd 00:00:00";
	var _url = LSMConsts.G_URLCONFIG.urlStream+"/metro/station-times-compare";
//	var _url = "http://10.221.247.7:8299/stream/metro/station-times-compare";
	if (timeType_ != null)
	{
//		_url=LSMConsts.G_URLCONFIG.urlStream+"/union/"+timeType_+"/hotspot-times-compare";
		if (timeBegin_ == null)
		{
			timeBegin_ = SUtils.getDiffDateTimeFromNow(-0,SUtils.TIME_TYPE.MIN,_format0);
		}
		if (timeEnd_ == null)
		{
			timeEnd_ = SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.MIN,format);
		}
		if (timeBeginCompare_ == null)
		{
			timeBeginCompare_ = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,_format0);
		}
		if (timeEndCompare_ == null)
		{
			timeEndCompare_ = SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE,format);
		}
	}else{
		if (timeBegin_ == null)
		{
			timeBegin_ = SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		}
		if (timeEnd_ == null)
		{
			timeEnd_ = SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		}
		if (timeBeginCompare_ == null)
		{
			timeBeginCompare_ = SUtils.getDiffDateTimeFromNow(-1620+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		}
		if (timeEndCompare_ == null)
		{
			timeEndCompare_ = SUtils.getDiffDateTimeFromNow(-1440+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
		}
	}
	
	_url+="?station=" + station_ + "&line="+line_+
	"&timeBegin=" + timeBegin_ +"&timeEnd=" + timeEnd_ + 
	"&timeBeginCompare=" + timeBeginCompare_ + "&timeEndCompare=" + timeEndCompare_;
	
	if(timeType_=="day"||timeType_=="month"){
		_url=_url.replace(LSMConsts.G_URLCONFIG.urlStream,LSMConsts.G_URLCONFIG.urlWs);
		_url+="&timeType="+timeType_;
	}
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(_url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				if(timeType_=="day"||timeType_=="month"){
  					result_.reverse();
  				}
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

/**热点峰值数据*/
LSMScreen.DataManager.prototype.getPeakHotspotKpi = function(params, callBack_, failCallBack_)
{
	var config={};
	config=$.extend(config,params);
	var timePath="";
	if(config.timeType!=null&&config.timeType!=""){
		timePath="/"+config.timeType;
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/max"+timePath+"/hotspots-"+config.type ;
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
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

/**热点峰值数据*/
LSMScreen.DataManager.prototype.getMetroInOutCustomer = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
		granularity:5,
		type:"in",//in,out
		time:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	config=$.extend(config,params);
	if(config.time==null||config.time=="null"){
		config.time=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
	}
	var url=LSMConsts.G_URLCONFIG.urlStream+"/metro/stations-totalnum-r"+config.type+"?time="+config.time;
	if(config.line!=null&&config.line!=""){
		url+="&line="+config.line;
	}
	if(config.granularity==5||config.granularity==60||config.granularity==null){
		url+="&granularity="+config.granularity;
	}else{
		url=url.replace(LSMConsts.G_URLCONFIG.urlStream,LSMConsts.G_URLCONFIG.urlWs);
		if(config.granularity==1440){
			url+="&timeType=day";
		}else if(config.granularity==43200){
			url+="&timeType=month";
		}
	}
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
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

LSMScreen.DataManager.prototype.getMetroLineInOutCustomerTrend = function(params, callBack_, failCallBack_)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
			type:"in",
			line:null,
			timeBegin:SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format),
			timeEnd:SUtils.getNowDateTime(format),
			granularity:5
		}; 
	
	config=$.extend(config,params);
	if(config.timeBegin==null){
		config.timeBegin=SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);
	}
	
	if(config.timeEnd==null){
		config.timeEnd=SUtils.getNowDateTime(format);
	}
	 
	var url = "";
	if(config.granularity==5||config.granularity==60||config.granularity==null){
		if(config.line!=null&&config.line!=""){
			url = LSMConsts.G_URLCONFIG.urlStream+"/metro/line-totalnum-r"+config.type+"-times-compare?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd;
			url+="&line="+config.line;
		}else{
			url = LSMConsts.G_URLCONFIG.urlStream+"/metro/totalnum-r"+config.type+"-times-compare?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd;
		}
		if(config.timeBeginCompare!=null&&config.timeEndCompare!=null){

			url+="&timeBeginCompare=" + config.timeBeginCompare + "&timeEndCompare=" + config.timeEndCompare;
		}
		url+="&granularity="+config.granularity;
	}else{
		if(config.line!=null&&config.line!=""){
			url = LSMConsts.G_URLCONFIG.urlWs+"/metro/line-totalnum-r"+config.type+"-times-compare?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd;
			url+="&line="+config.line;
		}else{
			url = LSMConsts.G_URLCONFIG.urlWs+"/metro/totalnum-r"+config.type+"-times-compare?timeBegin="+config.timeBegin+"&timeEnd="+config.timeEnd;
		}
		if(config.timeBeginCompare!=null&&config.timeEndCompare!=null){

			url+="&timeBeginCompare=" + config.timeBeginCompare + "&timeEndCompare=" + config.timeEndCompare;
		}
		if(config.granularity==1440){
			url+="&timeType=day";
		}else if(config.granularity==43200){
			url+="&timeType=month";
		}
	}
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				if(result_!=null){
  					result_=result_.reverse();
  				}
  				callBack_(result_);
  			}
  		},
  		error:failCallBack_
	});
};

//============移动数据管理 START==============================================================
LSMScreen.DataManager.prototype.getMobileDataKpiTrend = function(params, callBack_, failCallBack_)
{
	var format="yyyyMMdd0000";
	var config={
		startTime:SUtils.getDiffDateTimeFromNow(-7,SUtils.TIME_TYPE.DATE,format),
		endTime:SUtils.getDiffDateTimeFromNow(0,SUtils.TIME_TYPE.MIN,format),
		kpi_name:"kpi_001"
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/lsc-cfg-kpiTrend";
	
	SUtils.crossSafeAjax({
  		type : "POST",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify(config),
  		url:encodeURI(url),
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


LSMScreen.DataManager.prototype.getMobileDataKpiCalculater = function(params, callBack_, failCallBack_)
{
	var config={
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/lsc-cfg-kpiCalculater";
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
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


LSMScreen.DataManager.prototype.getRightScreenRoamData = function(params, callBack_, failCallBack_)
{
	var config={
		queryType:"total"
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlWs+"/rest/sml/query/inter-cfg-query-big-screen";
	
	SUtils.crossSafeAjax({
  		type : "POST",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify(config),
  		url:encodeURI(url),
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

LSMScreen.DataManager.prototype.getRightScreenRoamData = function(params, callBack_, failCallBack_)
{
	var config={
		queryType:"total"
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlWs+"/rest/sml/query/inter-cfg-query-big-screen";
	
	SUtils.crossSafeAjax({
  		type : "POST",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify(config),
  		url:encodeURI(url),
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
//省际漫游用户接口 根据热点查询
LSMScreen.DataManager.prototype.getRightScreenRoamDataPro = function(params, callBack_, failCallBack_)
{
	var config={
			"page":"1",
			"limit":"10",
			"queryType":"select",
			"sidx":"USER_CNT",
			"sord":"desc",
			"hot_name":""
		};
		config=$.extend(config,params);
		var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/area-cfg-hot-area-pro";
		
		SUtils.crossSafeAjax({
	  		type : "POST",
	  		async : false,
	  		dataType : "application/json",
	  		contentType : "application/json",
	  		processData : false,
	  		data:JSON.stringify(config),
	  		url:encodeURI(url),
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
//国际漫游用户接口 根据热点查询
LSMScreen.DataManager.prototype.getRightScreenRoamDataIntl = function(params, callBack_, failCallBack_)
{

	var config={
			"page":"1",
			"limit":"10",
			"queryType":"select",
			"sidx":"USER_CNT",
			"sord":"desc",
			"hot_name":""
		};
		config=$.extend(config,params);
		var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/area-cfg-hot-area-intl";
		
		SUtils.crossSafeAjax({
	  		type : "POST",
	  		async : false,
	  		dataType : "application/json",
	  		contentType : "application/json",
	  		processData : false,
	  		data:JSON.stringify(config),
	  		url:encodeURI(url),
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
//省际国际际漫游用户总数接口 根据热点查询
LSMScreen.DataManager.prototype.getRightScreenRoamDataTotal = function(params, callBack_, failCallBack_)
{
	var config={"hot_name":""};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/srpt-cfg-hot-area-pro-intl";
	
	SUtils.crossSafeAjax({
  		type : "POST",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify(config),
  		url:encodeURI(url),
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
//地铁终端网络类型分布
LSMScreen.DataManager.prototype.getMetroTerminalDistribute = function(params, callBack_, failCallBack_)
{
	var config={
			type:"dm_sn_metro_line",//type:根据地铁或线路--dm_sn_metro_line,根据站点--dm_sn_metro_line_station
		timeType:"h",//h,d
			name:"地铁"
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/area-cfg-hot234Gterminals";
	
	SUtils.crossSafeAjax({
  		type : "POST",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		data:JSON.stringify(config),
  		url:encodeURI(url),
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

//
LSMScreen.DataManager.prototype.getDDHMASKpis = function(params, callBack_, failCallBack_)
{
	var format="yyyyMMddhhmmss";
	var config={
		type:"e2e",
		spcode:"479423",
		time:SUtils.getDiffDateTimeFromNow(-60,SUtils.TIME_TYPE.MIN, format)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.baseUrl+"/subject_rest_service/rest/fast_query/secele-mas-"+config.type+"?spcode="+config.spcode+"&time="+config.time;
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
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
LSMScreen.DataManager.prototype.getMajorPathParam=function(major){
	var pathParam="";
	switch(major){
		case "视频":
			pathParam="video";
			break;
		default:
			pathParam="ownbiz";
			break;
	}
	return pathParam;
};

LSMScreen.DataManager.prototype.getMinorsByMajor = function(params, callBack_, failCallBack_)
{
	var config={
		major:""
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/info/minors?major="+config.major;
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
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
LSMScreen.DataManager.prototype.getMajors = function(params, callBack_, failCallBack_)
{
	var config={
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlStream+"/info/majors?all=true";
	
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
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

/** 
 * 互联网电视质量指标
 */
LSMScreen.DataManager.prototype.getInternetTvQualityTrend = function(param, callBack_, failCallBack_)
{
	var format0="yyyyMMdd0000";
	var format="yyyyMMddhhmm";
	var config={
		stat_time:SUtils.getNowDateTime(format0),
		end_time:SUtils.getNowDateTime(format)
	};
	config=$.extend(config,params);
	var _url = LSMConsts.G_URLCONFIG.urlInasSml+"/query/cfg-screen-tv-kpi";
	SUtils.crossSafeAjax({
  		type:"POST",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		data:JSON.stringify(hotSpots_),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};
//============移动数据管理 END==============================================================

//============全网指标(新增页面)START==============================================================

LSMScreen.DataManager.prototype.getAllKpiTrendWs = function(params, callBack_, failCallBack_)
{
	var config={
		qry:'',//gsm lte,
		startTime:null,
		endTime:null,
		mtime:1440
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/area-qwzb_trend?qry="+config.qry;
	url+='&mtime='+config.mtime;
	if(config.startTime!=null&&config.startTime!=''){
		url+='&startTime='+config.startTime;
	}
	if(config.endTime!=null&&config.endTime!=''){
		url+='&endTime='+config.endTime;
	}
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_,params);
  			}
  		},
  		error:failCallBack_
	});
};

LSMScreen.DataManager.prototype.getAllKpiRecordWs = function(params, callBack_, failCallBack_)
{
	var config={
		qry:'',//gsm lte,
		time:null
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlInasSml+"/query/area-qwzb?qry="+config.qry;
	if(config.time!=null&&config.time!=''){
		url+='&time='+config.time;
	}
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_,params);
  			}
  		},
  		error:failCallBack_
	});
};

LSMScreen.DataManager.prototype.getAllKpiRecordWsNew2 = function(params, callBack_, failCallBack_)
{
	var config={
		timeType:'',//min hour day,
		time:null,
		hbm:null,//环比时间差(周期数)
		tbm:null//同比时间差(周期数)
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/kpi/bzdx?timeType="+config.timeType;
	if(config.time!=null&&config.time!=''){
		url+='&time='+config.time;
	}
	if(config.hbm!=null&&config.hbm!=''){
		url+='&hbm='+config.hbm;
	}
	if(config.tbm!=null&&config.tbm!=''){
		url+='&tbm='+config.tbm;
	}
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_,params);
  			}
  		},
  		error:failCallBack_
	});
};
LSMScreen.DataManager.prototype.getAllKpiTrendWsNew2 = function(params, callBack_, failCallBack_)
{
	var config={
		timeType:'',//min hour day
		startTime:null,
		endTime:null,
		mtime:1440
	};
	config=$.extend(config,params);
	var url=LSMConsts.G_URLCONFIG.urlWs+"/fast_query/area/kpi/bzdx_trend?timeType="+config.timeType;
	url+='&mtime='+config.mtime;
	if(config.startTime!=null&&config.startTime!=''){
		url+='&startTime='+config.startTime;
	}
	if(config.endTime!=null&&config.endTime!=''){
		url+='&endTime='+config.endTime;
	}
	SUtils.crossSafeAjax({
  		type : "GET",
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url:encodeURI(url),
  		success : function(result_) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result_,params);
  			}
  		},
  		error:failCallBack_
	});
};
//查询排序过的一级热点
LSMScreen.DataManager.prototype.getRangedAreas = function(param, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlInasSml+"/query/area-region-query";
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
};



//============全网指标(新增页面) END==============================================================

//============集客接口 START==============================================================

LSMScreen.DataManager.prototype.getJKStatistic = function(param, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlJK+"/subject/sml/query/countCustAndLine";
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
}

LSMScreen.DataManager.prototype.getJKFaultAndComplainStatistic = function(param, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlJK+"/subject/sml/query/countTsAndGz";
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
}
LSMScreen.DataManager.prototype.getJKInternetFlowTrend = function(param, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlJK+"/subject/sml/query/internetFlowTrend";
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
}
LSMScreen.DataManager.prototype.getJKSingleTrend = function(param, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlJK+"/subject/sml/query/singleInternetTrend";
	_url+='?lineId='+param.lineId;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
}
LSMScreen.DataManager.prototype.getJKSplines = function(param, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlJK+"/shjkws/rest/zbzx/all_topic";
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
}

LSMScreen.DataManager.prototype.getJKSplineTopo = function(param, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlJK+'/shjkws/rest/group/topo/business_type/'+param.BUSINESS_TYPE+'/product_examples_logo/'+param.PRODUCT_EXAMPLES_LOGO;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/xml",
  		contentType:"application/xml",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
}

LSMScreen.DataManager.prototype.getJKDeviceInfo = function(param, callBack_, failCallBack_)
{
	var _url = LSMConsts.G_URLCONFIG.urlJK+'/subject/sml/query/c_ne_info?EQUIP_NAME='+param.EQUIP_NAME;
	SUtils.crossSafeAjax({
  		type:"GET",
  		async:false,
  		dataType:"application/json",
  		contentType:"application/json",
  		processData:false,
  		url:encodeURI(_url),
  		success : function(result) 
  		{
  			if(callBack_!=null)
  			{
  				callBack_(result);
  			}
  		},
  		error:failCallBack_
	});
}

//============集客接口 END==============================================================


//http://10.221.247.7:8299/stream/max/hotspots-rates
//	下载速率峰值
//	http://10.221.247.7:8299/stream/max/hotspots-bytes
//	流量峰值
//	http://10.221.247.7:8299/stream/max/hotspots-totalnum
//	用户数峰值
//	http://10.221.247.7:8299/stream/max/hotspots-totalnum-day
//	全天累计用户数峰值

/**测试时使用，阀值配置查询接口*/
LSMScreen.DataManager.prototype.getTestData=function(callBack){
	SUtils.crossSafeAjax({
  		type : 'POST',
  		async : false,
  		dataType : "application/json",
  		contentType : "application/json",
  		processData : false,
  		url : LSMConsts.G_URLCONFIG.baseUrl + '/services/ws/rest/query/report_query/20006/query',
  		data : '{"rowPerPage":100}',
  		success : function(data) {
  			alert(data);
  		}
	});
};