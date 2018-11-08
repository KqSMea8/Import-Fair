/** 需要consts.js,utils.js,screenbase.js,screenDataManager.js */
/**
 * 端到端大屏命名空间
 * @namespace
 */
var P2PScreen = P2PScreen || {};
/**
 * 端到端大屏控制类
 * @class P2PScreen.ScreenController
 * @extends LSMScreen.ScreenBase
 * @classdesc 继承ScreenBase 绘制大屏组件,控制定时刷新各个组件
 */
P2PScreen.ScreenController=function (){
	this.initialize.apply(this, arguments);
};
/** 从ScreenBase继承*/
P2PScreen.ScreenController.prototype=Object.create(LSMScreen.ScreenBase.prototype);
P2PScreen.ScreenController.prototype.constructor=P2PScreen.ScreenController;
/**
 * 中屏特殊业务大类
 * @private
 * @type {Number} 
 */
P2PScreen.ScreenController.prototype.specificMajor="视频";

/**
 * 图表高度(带标题，只有图表)(特殊，终端)
 * @private
 * @type {Number} 
 */
P2PScreen.ScreenController.prototype.baseChartHeight0=340;
/**
 * 图表高度(无标题，只有图表)
 * @private
 * @type {Number} 
 */
P2PScreen.ScreenController.prototype.baseChartHeight1=360;
/**
 * 图表高度(特殊，地址池利用率)
 * @private
 * @type {Number} 
 */
P2PScreen.ScreenController.prototype.baseChartHeight2=280;

/** 
 * 初始化DataManager
 * @protected
 * @function 
 */
P2PScreen.ScreenController.prototype.initConfigs=function(){
	this.dataManager=new LSMScreen.DataManager();
	this.initComponents();
};

/** 
 * 初始化未绘制的组件
 * @protected
 * @function 
 */
P2PScreen.ScreenController.prototype.initComponents=function(){
	/**
	 * 附着成功率图表对象
	 * @private
	 * @type {P2PScreen.SingleDataChartStream} 
	 */
	this.chartAttachSucc=new P2PScreen.SingleDataChartStream(
			$(".left-Chart1")[0],
			{title:"附着成功率",contentHeight:this.baseChartHeight0,dbclickToMaximum:true,maxParent:$(".ETE_left")[0]},
			this.updateAttachSuccChart.bind(this)
	);
	/**
	 * DNS解析成功率
	 * @private
	 * @type {P2PScreen.SingleDataChartWs} 
	 */
	this.chartDnsParse=new P2PScreen.SingleDataChartWs(
			$(".left-Chart3")[0],
			{title:"DNS解析成功率",contentHeight:this.baseChartHeight0,dbclickToMaximum:true,maxParent:$(".ETE_left")[0]},
			this.updateDNSParseChart.bind(this)
	);
	/**
	 * 错误码分析环形图
	 * @private
	 * @type {P2PScreen.ErrorCodeRingChart} 
	 */
	this.chartErrCode=new P2PScreen.ErrorCodeRingChart(
			$(".left-Chart2")[0],
			{title:"错误码分析",contentHeight:this.baseChartHeight1,dbclickToMaximum:true,maxParent:$(".ETE_left")[0]},
			this.updateErrCodeChart.bind(this)
	);
	/**
	 * 业务流量速率(柱+线)
	 * @private
	 * @type {P2PScreen.MajorQualityChart} 
	 */
	this.chartTrafficAndSpeed=new P2PScreen.MajorQualityChart(
			$(".centre-Chart2")[0],
			{title:"业务流量速率",contentHeight:this.baseChartHeight0},
			this.updateTrafficAndSpeedChart.bind(this)
	);
	this.chartTrafficAndSpeed.gobackPasser=this.resetTrafficAndSpeed.bind(this);
	
	/**
	 * HTTP/TCP成功率(线+线)
	 * @private
	 * @type {P2PScreen.MajorQualityChart} 
	 */
	this.chartHttpAndTcpSucc=new P2PScreen.MajorQualityChart(
			$(".centre-Chart3")[0],
			{title:"HTTP/TCP成功率",contentHeight:this.baseChartHeight0},
			this.updateHttpAndTcpSuccChart.bind(this)
	);
	this.chartHttpAndTcpSucc.gobackPasser=this.resetHttpAndTcpSucc.bind(this);
	
	/**
	 * 业务源(散点图)
	 * @private
	 * @type {P2PScreen.BusinessSourceBubbleChart} 
	 */
	this.chartBusinessSourceBubble=new P2PScreen.BusinessSourceBubbleChart(
			$(".centre-Chart6")[0],
			{title:"业务源",contentHeight:this.baseChartHeight0},
			function(isReady){
				var ecConfig = require('echarts/config');
				this.chartBusinessSourceBubble.echart.on(ecConfig.EVENT.CLICK,this.businessBubbleChartClickHandler.bind(this));
				this.updateBusinessSourceBubbleChart(true);
			}.bind(this)			
	);
	
	
	/**
	 * 业务源趋势图流量速率(柱+线)
	 * @private
	 * @type {P2PScreen.BusinessSourceTrend} 
	 */
	this.chartBusinessSourceTrend=new P2PScreen.BusinessSourceTrend(
			$(".centre-Chart6_under")[0],
			{title:"业务源流量速率",contentHeight:this.baseChartHeight0},
			this.updateBusinessSourceTrendChart.bind(this)
	);
	
	
	/**
	 * 终端排名(玫瑰图)
	 * @private
	 * @type {P2PScreen.TerminalRoseChart} 
	 */
	this.chartTerminalRank=new P2PScreen.TerminalRoseChart(
			$(".centre-Chart4")[0],
			{title:"终端",contentHeight:this.baseChartHeight0},
			function(isReady){
				var ecConfig = require('echarts/config');
				this.chartTerminalRank.echart.on(ecConfig.EVENT.CLICK,this.terminalRankChartClickHandler.bind(this));
				this.updateTerminalRankChart(true);
			}.bind(this)
	);
	this.chartTerminalRank.gobackPasser=this.resetTerminalQuality.bind(this);
	
	/**
	 * 地址池利用率(区域图)
	 * @private
	 * @type {P2PScreen.IagwKpiTrend} 
	 */
	this.chartIpPoolUntity=new P2PScreen.IagwKpiTrend(
			$(".left-Chart6")[0],
			{title:"地址池利用率",contentHeight:this.baseChartHeight2,dbclickToMaximum:true,maxParent:$(".ETE_left")[0]},
			this.updateIpPoolUntityChart.bind(this)
	);
	
	/**
	 * 质差终端
	 * @private
	 * @type {P2PScreen.TerminalQualityTable} 
	 */
	this.tableTerminalQuality=new P2PScreen.TerminalQualityTable($(".Chart4_table")[0]);
	this.updateTableTerminalQuality(true);
	
	
	/////////////////////////以下无update
	/**
	 * 多种设备指标列表
	 * @private
	 * @type {P2PScreen.MultiTypeDeviceKpiTable} 
	 */
	this.tableMultiTypeDevice=new P2PScreen.MultiTypeDeviceKpiTable($(".centre-Chart5")[0],{},{title:"设备下载速率(Kbps)",rowHeight:56});
	this.tableMultiTypeDevice.update(true);
	
	/**
	 * 地市附着成功率电池+设备附着成功率
	 * @private
	 * @type {P2PScreen.AttachSuccCityAndDevice} 
	 */
	this.componentAttachSuccCityAndDevice=new P2PScreen.AttachSuccCityAndDevice($(".left-Chart4")[0],{dbclickToMaximum:true,maxParent:$(".ETE_left")[0]});
	this.componentAttachSuccCityAndDevice.itemClickHandler=this.componentAttachSuccCityAndDeviceClickHandler.bind(this);
	this.componentAttachSuccCityAndDevice.update(true);
	
	/**
	 * 业务散点图
	 * @private
	 * @type {P2PScreen.HotappScatter} 
	 */
	this.componentHotapp=new P2PScreen.HotappScatter($(".centre-Chart1")[0],{},{title:"业务"});
	this.componentHotapp.appClickHandler=this.componentHotappClickHandler.bind(this);
	this.componentHotapp.update(true);
	
	///////////////特殊
	this.swfMap=new P2PScreen.SwfMap($(".left-Chart5")[0]);
	
	this.updateTitle();
	
	this.initAlarmRelated();
};
//////////////////////////////联动事件
/** 
 * 业务源(散点图)点击事件
 * @private
 * @function 
 * @param {Object} param echarts的事件参数
 */
P2PScreen.ScreenController.prototype.businessBubbleChartClickHandler=function(param){
	if (param.type == 'click') {
		var group=param.seriesName;
		this.updateBusinessSourceTrendChart(true,group);
	}
};

/** 
 * 重置 业务流量速率(柱+线)
 * @private
 * @function 
 */
P2PScreen.ScreenController.prototype.resetTrafficAndSpeed=function(){
	var queryConfig={
			major:this.specificMajor,
			app:""
		};
	this.updateTrafficAndSpeedChart(true, queryConfig);
};

/** 
 * 重置 HTTP/TCP成功率(线+线)
 * @private
 * @function 
 */
P2PScreen.ScreenController.prototype.resetHttpAndTcpSucc=function(){
	var queryConfig={
			major:this.specificMajor,
			app:""
		};
	this.updateHttpAndTcpSuccChart(true, queryConfig);
};

/** 
 * 重置质差终端
 * @private
 * @function 
 */
P2PScreen.ScreenController.prototype.resetTerminalQuality=function(){
	this.updateTableTerminalQuality(true,{
		topN:6,
		vendor:LSMConsts.commonMobiles
	});
};

/** 
 * 地市附着成功率电池+设备附着成功率 点击事件
 * @private
 * @function 
 * @param {Object} param echarts的事件参数
 */
P2PScreen.ScreenController.prototype.componentAttachSuccCityAndDeviceClickHandler=function(param){
	var name=param.name;
	if (param.type == 'city') {
		this.updateErrCodeChart(true,{type:'city',filterKey:name+"分公司"});
	}
};
/** 
 * 终端排名(玫瑰图)
 * @private
 * @function 
 * @param {Object} param echarts的事件参数
 */
P2PScreen.ScreenController.prototype.terminalRankChartClickHandler=function(param){
	if (param.type == 'click'&&param.seriesName=="终端品牌排名") {
		var brand=param.name;
		this.updateTerminalRankChart(true, {type:"model",terminal_brand:brand});
		this.updateTableTerminalQuality(true, {vendor:brand});
	}
};

/** 
 * 业务散点点击联动
 * @private
 * @function 
 * @param {Object} param html的事件参数
 */
P2PScreen.ScreenController.prototype.componentHotappClickHandler=function(param){
	var appName=$(param.currentTarget).attr('name');
	var queryConfig={
			major:this.specificMajor,
			app:appName
		};
	this.updateTrafficAndSpeedChart(true, queryConfig);
	this.updateHttpAndTcpSuccChart(true, queryConfig);
	
	$(	this.chartTrafficAndSpeed.backBtnDom).css("display","block");
	$(	this.chartHttpAndTcpSucc.backBtnDom).css("display","block");

};

//////////////////////////////头部数据处理 START
/** 
 * 更新头部指标
 * @private
 * @function 
 */
P2PScreen.ScreenController.prototype.updateTitle=function(){
	var dm=LSMScreen.DataManager.getInstance();
	
	//活跃用户数(全网)
	dm.getActiveUser(
			{},
			function(dataArr){
				
				for(var i=dataArr.length-1;i>=0;i--){
					var userRecord=dataArr[i];
					var userNum=userRecord["4G"]/10000;
					if(userNum>0){
						var titleTime=userRecord.time;
						var timeRange=SUtils.getHourAndMinuteFive(titleTime)+"--"+SUtils.getHourAndMinuteFive(titleTime,true);
						$("#titleTimeRange")[0].innerHTML=timeRange;
						$("#titleKpiUser")[0].innerHTML=userNum.toFixed(0);
						break;
					}
				}
				
			});
	
	
	//鉴权成功率,附着成功率,下载速率(全网)
	dm.getQualityRecord(
			{},
			function(data){
				var authSucc=data["4G鉴权成功率"]*100;
				var attachSucc=data["4G附着成功率"]*100;
				var rate4g=data["4G下行速率500k"]/LSMConsts.byteDivider;
				$("#titleKpiDLSpeed")[0].innerHTML=rate4g.toFixed(2);
				$("#titleKpiAuthSucc")[0].innerHTML=authSucc.toFixed(2);
				$("#titleKpiAttachSucc")[0].innerHTML=attachSucc.toFixed(2);
			});
	
	//数据流量(全网)
	dm.getBytesRecord(
			{},
			function(data){
				var rate4g=data["4G流量"]/LSMConsts.byteDivider/LSMConsts.byteDivider;
				$("#titleKpiTraffic")[0].innerHTML=rate4g.toFixed(0);
			});
	
	
	
	
	//活跃用户数(视屏)
	dm.getMajorActiveUser(
			{major:this.specificMajor},
			function(data){
				$("#titleKpiVideoUser")[0].innerHTML=(data[this.specificMajor]["4G"]/10000).toFixed(0);
			}.bind(this));
	
	//流量,下载速率(视频)
	dm.getMajorQualityRecord(
			{major:this.specificMajor},
			function(data){
				var traffic=data[this.specificMajor]["4G流量"]/LSMConsts.byteDivider/LSMConsts.byteDivider;
				var rate4g=data[this.specificMajor]["4G下行速率500k"]/LSMConsts.byteDivider;
				$("#titleKpiVideoDL")[0].innerHTML=rate4g.toFixed(2);
				$("#titleKpiVideoTraffic")[0].innerHTML=traffic.toFixed(0);
			}.bind(this));
	
	//视频播放成功率(视屏)
	dm.getMajorSpecRecord(
			{major:this.specificMajor},
			function(data){
				$("#titleKpiVideoSucc")[0].innerHTML=(data[this.specificMajor]["4G播放成功率"]*100).toFixed(2);
			}.bind(this));
};


//////////////////////////////头部数据处理 END

/////////////////////////////告警处理 START
/**以后要剥离 暂时放一下*/
P2PScreen.ScreenController.prototype.alarmTitles=[];
P2PScreen.ScreenController.prototype.currentTitleIndex=0;
/** 
 * 初始化告警相关节点
 * @private
 * @function 
 */
P2PScreen.ScreenController.prototype.initAlarmRelated=function(){
	$("#alarmTextSpan");//topo上告警文字框
	$("#alarmBtn").on('click',this.alarmBtnClick.bind(this));//topo上告警钻取按钮
	$(".KPI2").on('click',this.dialAlarmClick.bind(this));//拨测上告警钻取按钮
	$(".KPI3").on('click',this.dialAlarmClick.bind(this));//拨测上告警钻取按钮
	$(".MME").on('click',this.mmeAlarmClick.bind(this));
	$(".ENodeB").on('click',this.enodebAlarmClick.bind(this));
//	$(".MME");//topo上MME节点
//	$(".SAEGW");//topo上SAEGW节点
//	$(".KPI2");//拨测上MME节点
//	$(".KPI3");//拨测上SAEGW节点
	this.updateAlarm();
	setInterval(this.alarmTitleFlip.bind(this), 20);
};
P2PScreen.ScreenController.prototype.mmeAlarmClick=function(){
	new P2PScreen.MMEMatrixWin({
		x:0,
		y:0
	});
};
P2PScreen.ScreenController.prototype.enodebAlarmClick=function(){
	new P2PScreen.ENBMatrixWin({
		x:0,
		y:0
	});
};
P2PScreen.ScreenController.prototype.alarmBtnClick=function(){
	new P2PScreen.AlarmFlowWin({
		title:"告警流水窗",
		width:1200,
		height:400,
		x:0,
		y:0,
		queryConfig:{DS:"MME,SGW/PGW"}
		
	});
};
P2PScreen.ScreenController.prototype.dialAlarmClick=function(param){
	//目前这个MME和SAEGW没有区别 仅有告警时响应
	var nodeClass=$(param.currentTarget).find("div:first").attr("class");
	if(nodeClass=="KPI_red"){
		new P2PScreen.AlarmDrillWin({
			title:"告警列表",
			width:800,
			height:400,
			x:1300,
			y:700,
			queryConfig:{}
		});
	}
	
};
P2PScreen.ScreenController.prototype.alarmTitleFlip=function(){
	if(this.alarmTitles.length>0){
		if(this.currentTitleIndex>=this.alarmTitles.length){
			this.currentTitleIndex=0;
		}
		$("#alarmTextSpan").text(this.alarmTitles[this.currentTitleIndex]);
		
		this.currentTitleIndex++;
	}
};
/** 
 * 更新告警信息
 * @private
 * @function 
 */
P2PScreen.ScreenController.prototype.updateAlarm=function(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getDnmsFishbone(function(data){
		var mmeAlarmInfo=data.mmeAlarmInfo;
		var saegwAlarmInfo=data.saegwAlarmInfo;
		
		this.alarmTitles=[];
		if(saegwAlarmInfo.level>0){
			$(".SAEGW").addClass("alarmTopoNode");
			this.alarmTitles.push(saegwAlarmInfo.value);
			
			$(".KPI3 div").first().attr("class","KPI_red").find(".KPI1_span2").text("ALARM");
		}else{
			$(".SAEGW").removeClass("alarmTopoNode");
			$(".KPI3 div").first().attr("class","KPI_green").find(".KPI1_span2").text("OK");
		}
		
		if(mmeAlarmInfo.level>0){
			$(".MME").addClass("alarmTopoNode");
			this.alarmTitles.push(mmeAlarmInfo.value);
			
			$(".KPI2 div").first().attr("class","KPI_red").find(".KPI1_span2").text("ALARM");
		}else{
			$(".MME").removeClass("alarmTopoNode");
			$(".KPI2 div").first().attr("class","KPI_green").find(".KPI1_span2").text("OK");
		}
		
		if(this.alarmTitles.length==0){
			$(".text_box").removeClass("alarmBox");
			$("#alarmTextSpan").text("当前无设备告警");
		}else{
			$(".text_box").addClass("alarmBox");
			$("#alarmTextSpan").text(this.alarmTitles[0]);
		}
		
	});
	
//	 * {
//		 * 	"mmeAlarmInfo":{"time":"最近1小时","value":"告警量0条","unit":null,"level":0,"bak":null},
//		 * "saegwAlarmInfo":{"time":"最近1小时","value":"告警量0条","unit":null,"level":0,"bak":null}
//		 * }
};
/////////////////////////////////告警处理 END

/** 
 * 更新附着成功率图表数据
 * @public
 * @function 
 */
P2PScreen.ScreenController.prototype.updateAttachSuccChart=function(showLoadMask){
	if(this.chartAttachSucc){
		var queryConfig={
			idrFilter:"4G附着成功率",
			kpiName:"4G附着成功率",
			unit:"%"
			
		};
		this.chartAttachSucc.update(showLoadMask,queryConfig);
	}else{
		SUtils.log("附着成功率图表  未初始化");
	}
};

/** 
 * 更新DNS解析成功率图表数据
 * @public
 * @function 
 */
P2PScreen.ScreenController.prototype.updateDNSParseChart=function(showLoadMask){
	if(this.chartDnsParse){
		var queryConfig={
			idrFilter:"dnsParseRate",
			kpiName:"DNS解析成功率"
		};
		this.chartDnsParse.update(showLoadMask,queryConfig);
	}else{
		SUtils.log("DNS解析成功率图表  未初始化");
	}
};

/** 
 * 更新错误码分析
 * @public
 * @function 
 */
P2PScreen.ScreenController.prototype.updateErrCodeChart=function(showLoadMask,config){
	if(this.chartErrCode){
		var queryConfig={
		};
		if(config!=null){
			queryConfig=config;
		}
		this.chartErrCode.update(showLoadMask,queryConfig);
	}else{
		SUtils.log("错误码分析  未初始化");
	}
};

/** 
 * 更新 业务流量速率(柱+线)
 * @public
 * @function 
 */
P2PScreen.ScreenController.prototype.updateTrafficAndSpeedChart=function(showLoadMask,config){
	if(this.chartTrafficAndSpeed){
		this.chartTrafficAndSpeed.kpiList=[
	          {
	        	  kpiName:"流量",
	        	  kpiId:"4G流量",
	        	  chartType:"bar",
	        	  yAxisIndex:0
	          },{
	        	  kpiName:"下行速率",
	        	  kpiId:"4G下行速率500k",
	        	  chartType:"line",
	        	  yAxisIndex:1
	          }
		];
		var queryConfig={
			major:this.specificMajor
		};
		if(config!=null){
			for(var key in config){
				queryConfig[key]=config[key];
			}
		}
		this.chartTrafficAndSpeed.update(showLoadMask,queryConfig);
	}else{
		SUtils.log("业务流量速率(柱+线)  未初始化");
	}
};

/** 
 * 更新 HTTP/TCP成功率(线+线)
 * @public
 * @function 
 */
P2PScreen.ScreenController.prototype.updateHttpAndTcpSuccChart=function(showLoadMask,config){
	if(this.chartHttpAndTcpSucc){
		this.chartHttpAndTcpSucc.kpiList=[
	          {
	        	  kpiName:"HTTP成功率",
	        	  kpiId:"4GHTTP成功率",
	        	  chartType:"line",
	        	  yAxisIndex:0
	          },{
	        	  kpiName:"TCP成功率",
	        	  kpiId:"4GTCP成功率",
	        	  chartType:"line",
	        	  yAxisIndex:0
	          }
		];
		var queryConfig={
			major:this.specificMajor
		};
		if(config!=null){
			for(var key in config){
				queryConfig[key]=config[key];
			}
		}
		this.chartHttpAndTcpSucc.update(showLoadMask,queryConfig);
	}else{
		SUtils.log("HTTP/TCP成功率(线+线) 未初始化");
	}
};

/** 
 * 更新 业务源(散点图)
 * @public
 * @function 
 */
P2PScreen.ScreenController.prototype.updateBusinessSourceBubbleChart=function(showLoadMask){
	if(this.chartBusinessSourceBubble){
		var queryConfig={
			major:this.specificMajor
		};
		this.chartBusinessSourceBubble.update(showLoadMask,queryConfig);
	}else{
		SUtils.log("业务源(散点图) 未初始化");
	}
};

/** 
 * 更新 业务源趋势图流量速率(柱+线)
 * @public
 * @function 
 */
P2PScreen.ScreenController.prototype.updateBusinessSourceTrendChart=function(showLoadMask,group){
	if(this.chartBusinessSourceTrend){
		group=group==null||group==""?"Cache":group;
		var queryConfig={
			major:this.specificMajor,
			group:group
		};
		this.chartBusinessSourceTrend.update(showLoadMask,queryConfig);
	}else{
		SUtils.log("业务源趋势图流量速率(柱+线) 未初始化");
	}
};

/** 
 * 更新 终端排名(玫瑰图)
 * @public
 * @function 
 */
P2PScreen.ScreenController.prototype.updateTerminalRankChart=function(showLoadMask,config){
	if(this.chartTerminalRank){
		var queryConfig={
			topN:8,
			type:"brand",
			app_type_name:this.specificMajor
		};
		if(config!=null){
			for(var key in config){
				queryConfig[key]=config[key];
			}
		}
		this.chartTerminalRank.update(showLoadMask,queryConfig);
	}else{
		SUtils.log("终端排名(玫瑰图) 未初始化");
	}
};

/** 
 * 更新 地址池利用率(区域图)
 * @public
 * @function 
 */
P2PScreen.ScreenController.prototype.updateIpPoolUntityChart=function(showLoadMask){
	if(this.chartIpPoolUntity){
		var queryConfig={
		};
		this.chartIpPoolUntity.update(showLoadMask,queryConfig);
	}else{
		SUtils.log("地址池利用率(区域图) 未初始化");
	}
};

/** 
 * 更新 质差终端表格
 * @public
 * @function 
 */
P2PScreen.ScreenController.prototype.updateTableTerminalQuality=function(showLoadMask,config){
	if(this.tableTerminalQuality){
		var queryConfig={
			topN:6
		};
		if(config!=null){
			for(var key in config){
				queryConfig[key]=config[key];
			}
		}
		this.tableTerminalQuality.update(showLoadMask,queryConfig);
	}else{
		SUtils.log("附着成功率图表  未初始化");
	}
};

/** 
 * 周期更新数据方法
 * @protected
 * @function 
 */
P2PScreen.ScreenController.prototype.update=function(showLoadMask){
	this.updateAttachSuccChart(showLoadMask);
	this.updateDNSParseChart(showLoadMask);
	this.updateErrCodeChart(showLoadMask);
	this.updateTrafficAndSpeedChart(showLoadMask);
	this.updateHttpAndTcpSuccChart(showLoadMask);
	this.updateBusinessSourceBubbleChart(showLoadMask);
	this.updateBusinessSourceTrendChart(showLoadMask);
	this.updateTerminalRankChart(showLoadMask);
	this.updateIpPoolUntityChart(showLoadMask);
	this.updateTableTerminalQuality(showLoadMask);
	this.tableMultiTypeDevice.update(showLoadMask);
	this.componentAttachSuccCityAndDevice.update(showLoadMask);
	this.componentHotapp.update(showLoadMask);
//	this.swfMap.update(showLoadMask);
	this.updateTitle();
	this.updateAlarm();
	
};


/**
 * 单指标趋势图(娄耀佳接口)
 * @class P2PScreen.SingleDataChartStream
 * @extends LSMScreen.DataChartBase
 * @classdesc 单指标趋势图(娄耀佳接口)
 */
P2PScreen.SingleDataChartStream=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
P2PScreen.SingleDataChartStream.prototype=Object.create(LSMScreen.DataChartBase.prototype);
P2PScreen.SingleDataChartStream.prototype.constructor=P2PScreen.SingleDataChartStream;

/** 用于记录页面加载时延*/
P2PScreen.SingleDataChartStream.prototype.lag=0;
/** 查询开始时间*/
P2PScreen.SingleDataChartStream.prototype.date0;
/** 
 * 请求数据 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	idrFilter:"4G附着成功率",//指标ID
 * 	kpiName:"4G附着成功率",//图表中呈现的名称
 *  granularity:1,//时间粒度 默认1分钟(1->1分钟，5->5分钟)
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近3小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间,
 *  unit:""//单位用于换算
 * }
 */
P2PScreen.SingleDataChartStream.prototype.query=function(queryConfig){
	this.date0=new Date();
	var dm=LSMScreen.DataManager.getInstance();
	dm.getSingleKpiTrendChartDataStream(queryConfig,this.dataHandler.bind(this),this.failHandler.bind(this));
};
/** 
 * 处理数据
 * @protected
 * @function 
 * @param {Array} chartDataArr 
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
 */
P2PScreen.SingleDataChartStream.prototype.dataHandler=function(chartDataArr){
	if(this.lag==0&&this.date0!=null){
		var date1=new Date();
		this.lag=date1.getTime()-this.date0.getTime();
		var dm=LSMScreen.DataManager.getInstance();
		dm.saveRequestDelay({qryusedTime:this.lag+"",moduleCode:LSMConsts.lteDelayCode});
	}
	var kpiKey=this.queryConfig.idrFilter;
	var kpiName=this.queryConfig.kpiName;
//	var unit=this.queryConfig.unit;
	var i=0;
	var xAxisArr=[];
	var dataArr=[];
	var lastTime="";
	for(i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i][kpiKey];
		var time=record.time;
		var value=record.value;//娄耀佳接口百分比在0-1之间
		var kpiInfo=SUtils.getKpiInfo(kpiKey);
		value=(value*kpiInfo.fact).toFixed(kpiInfo.percise);
		time=time.substring(11,16);//时:分
		lastTime=time;
		xAxisArr.push(time);
		dataArr.push(value);
	}
	this.setTime(lastTime);
	var series=[
        {
            name:kpiName,
            type:'line',
            itemStyle:{normal:{color:LSMConsts.baseLineColor}},
            data:dataArr
        }
    ];
	var option=this.getOptionByData([kpiName],xAxisArr, series);
	this.updateData(option,true);
	this.hideLoading();
};




/**
 * 单指标趋势图(黄文接口)
 * @class P2PScreen.SingleDataChartWs
 * @extends LSMScreen.DataChartBase
 * @classdesc 单指标趋势图(黄文接口)
 */
P2PScreen.SingleDataChartWs=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
P2PScreen.SingleDataChartWs.prototype=Object.create(LSMScreen.DataChartBase.prototype);
P2PScreen.SingleDataChartWs.prototype.constructor=P2PScreen.SingleDataChartWs;

/** 
 * 请求数据 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	idrFilter:"dnsParseRate",//指标ID
 * 	kpiName:"DNS解析成功率",//指标呈现名称
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近12小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间
 * }
 */
P2PScreen.SingleDataChartWs.prototype.query=function(queryConfig){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getSingleKpiTrendChartDataWs(queryConfig,this.dataHandler.bind(this),this.failHandler.bind(this));
};
/** 
 * 处理数据
 * @protected
 * @function 
 * @param {Array} chartDataArr 
 * @example
 * [
 * 	{"time":"2016-04-07 10:45:00","value":99.22},
 * 	{"time":"2016-04-07 10:46:00","value":88.77}
 * ]
 */
P2PScreen.SingleDataChartWs.prototype.dataHandler=function(chartDataArr){
	var kpiName=this.queryConfig.kpiName;
	var i=0;
	var xAxisArr=[];
	var dataArr=[];
	var lastTime="";
	for(i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i];
		var time=record.time;
		var value=record.value;//黄文接口 百分比在0-100之间
		time=time.substring(11,16);//时:分
		lastTime=time;
		xAxisArr.push(time);
		dataArr.push(value);
	}
	this.setTime(lastTime);
	var series=[
        {
            name:kpiName,
            itemStyle:{normal:{color:LSMConsts.baseLineColor}},
            type:'line',
            data:dataArr
        }
    ];
	var option=this.getOptionByData([kpiName],xAxisArr, series);
	this.updateData(option,true);
	this.hideLoading();
};




/**
 * 错误码环形图(黄文接口)
 * @class P2PScreen.ErrorCodeRingChart
 * @extends LSMScreen.DataChartPie
 * @classdesc 
 */
P2PScreen.ErrorCodeRingChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
P2PScreen.ErrorCodeRingChart.prototype=Object.create(LSMScreen.DataChartPie.prototype);
P2PScreen.ErrorCodeRingChart.prototype.constructor=P2PScreen.ErrorCodeRingChart;

/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	filterKey:"",//选中地市，具体设备等，对返回数据进行过滤
 *  isX2:false,//boolean 是否是 x2 switch错误码 查mmes-x2-time接口
 *  type:"city",//city:分地市 查sds接口, mme:分mme 查mmes-time接口
 *  time:"yyyy-MM-dd hh:mm:ss"//时间点 默认最近10分钟
 * }
 */
P2PScreen.ErrorCodeRingChart.prototype.query=function(queryConfig){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getErrorCodeDistribution(queryConfig,this.dataHandlerPie.bind(this),this.failHandler.bind(this));
};
P2PScreen.ErrorCodeRingChart.prototype.goback=function(){
	this.update(true,{
		filterKey:"MMEALL",
		isX2:false,
		type:"mme"
	});
};

/** 
 * 处理数据(将数据处理成饼图，环形图label无法控制)
 * 降序取前6个错误码，剩下的归并到"其他"
 * @protected
 * @function 
 * @param {Object} chartData
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
 */
P2PScreen.ErrorCodeRingChart.prototype.dataHandlerPie=function(chartData){
	if(this.backBtnDom!=null){
		var filterKey=this.queryConfig.filterKey;
		if(filterKey!=null&&filterKey!=""&&filterKey!="MMEALL"){
			this.backBtnDom.innerText="当前:"+filterKey+"  返回";
			$(this.backBtnDom).css("display","block");
			
		}else{
			$(this.backBtnDom).css("display","none");
		}
	}
	//有色圆环样式
	var dataStyle = {
	    normal: {
	        label: {
	        	show:true,
	        	position:"outter",
	        	textStyle:{fontSize:LSMScreen.CHARTCONFIG.labelSize}
	        }, 
	        labelLine: {show:true,length:40}
	    }
	};
	
	var otherName="其他";//"其他"的显示名称
	var codeMap=LSMConsts.ERRCODEMAP;
	var maxCodes=5;//最多呈现多少个错误码(除"其他"外) 一共呈现maxCodes+1个环
	var i=0;
	var codeList=[];//错误码列表 用于排序{code:22,count:456}
	var chartCodeList=[];//最终呈现的错误码列表 计算过"其他"之后 降序排序
	var req_cnt=0;
//	成功和失败数暂时用不着
//	var succ_cnt=0;
//	var fail_cnt=0;
	for(var key in chartData){
		if(!isNaN(key)){//数字为错误码
			var codeAndCount={
				code:key,
				count:chartData[key]
			};
			codeList.push(codeAndCount);
		}else{//其他信息
			switch(key){
				case "req_cnt":
					req_cnt=chartData[key];
					break;
//				case "succ_cnt":
//					succ_cnt=chartData[key];
//					break;
//				case "fail_cnt":
//					fail_cnt=chartData[key];
					break;
				case "time":
					var time=chartData[key];
					this.setTime(time.substring(11,16));//时:分
					break;
			}
		}
	}
	
	codeList.sort(function(a,b){return b.count-a.count;});//按count 降序
	var ilength=Math.min(maxCodes,codeList.length);
	
	//前maxCodes个错误码
	for(i=0;i<ilength;i++){
		chartCodeList.push(codeList[i]);
	}
	//计算"其他"
	if(ilength<codeList.length){
		var otherTotal=0;
		for(i=ilength;i<codeList.length;i++){
			var otherRecord=codeList[i];
			var otherCount=otherRecord.count;
			otherTotal+=Number(otherCount);
		}
		chartCodeList.push({code:otherName,count:otherTotal});
		chartCodeList.sort(function(a,b){return b.count-a.count;});//加入"其他"后 再次排序
	}
	
	
	
	var dataArr=[];
	var radius=125;//最外圈radius
	ilength=chartCodeList.length;
	//前maxCodes个错误码
	for(i=0;i<ilength;i++){
		var record=chartCodeList[i];
		var codeNum=record.code;
		var count=record.count;
		var codeDesc=codeMap[codeNum]==null?codeNum:codeMap[codeNum];//"其他"或无对应描述的时候 直接使用code
//		var showPercent=count/chartCodeList[0].count*100*(2/3);//呈现图表时使用的百分比，最大的数据占三分之二圆环(不占满)
		var realPercent=(count/req_cnt*100).toFixed(2);//实际百分比 在tip中呈现
		var tipName="#"+codeNum+":<br/>"+codeDesc+"<br/>"+count+"("+realPercent+"%)";
		dataArr.push({
						tip:tipName,
	                    value:count,
	                    name:"Cause:"+codeNum+"\n"+count+"("+realPercent+"%)"
	                });
		radius-=25;
	}
	legends=["错误码"];
	series=[{
            name:"错误码",
            type:'pie',
			startAngle:-15,
			radius : '70%',
            clockWise:false,
            itemStyle : dataStyle,
            data:dataArr
        }];
	var option=this.getOptionByData(legends, series,{},function(param){
		return param.data.tip;
	});
	this.updateData(option,true);
	this.hideLoading();
	
};

/** 
 * 处理数据
 * 降序取前6个错误码，剩下的归并到"其他"
 * @protected
 * @function 
 * @param {Object} chartData
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
 */
P2PScreen.ErrorCodeRingChart.prototype.dataHandler=function(chartData){
	//有色圆环样式
	var dataStyle = {
	    normal: {
	        label: {show:true,position:"outter"},
	        labelLine: {show:true,length:60}
	    }
	};
	//圆环空白占位样式
	var placeHolderStyle = {
		    normal : {
		        color: 'rgba(0,0,0,0)',
		        label: {show:false},
		        labelLine: {show:false},
		        baseLine:{show:false}
		    },
		    emphasis : {
		        color: 'rgba(0,0,0,0)'
		    }
		};
	
	var otherName="其他";//"其他"的显示名称
	var codeMap=LSMConsts.ERRCODEMAP;
	var maxCodes=5;//最多呈现多少个错误码(除"其他"外) 一共呈现maxCodes+1个环
	var i=0;
	var codeList=[];//错误码列表 用于排序{code:22,count:456}
	var chartCodeList=[];//最终呈现的错误码列表 计算过"其他"之后 降序排序
//	var req_cnt=0;
//	成功和失败数暂时用不着
//	var succ_cnt=0;
//	var fail_cnt=0;
	for(var key in chartData){
		if(!isNaN(key)){//数字为错误码
			var codeAndCount={
				code:key,
				count:chartData[key]
			};
			codeList.push(codeAndCount);
		}else{//其他信息
			switch(key){
				case "req_cnt":
					req_cnt=chartData[key];
					break;
//				case "succ_cnt":
//					succ_cnt=chartData[key];
//					break;
//				case "fail_cnt":
//					fail_cnt=chartData[key];
					break;
				case "time":
					var time=chartData[key];
					this.setTime(time.substring(11,16));//时:分
					break;
			}
		}
	}
	
	codeList.sort(function(a,b){return b.count-a.count;});//按count 降序
	var ilength=Math.min(maxCodes,codeList.length);
	
	//前maxCodes个错误码
	for(i=0;i<ilength;i++){
		chartCodeList.push(codeList[i]);
	}
	//计算"其他"
	if(ilength<codeList.length){
		var otherTotal=0;
		for(i=ilength;i<codeList.length;i++){
			var otherRecord=codeList[i];
			var otherCount=otherRecord.count;
			otherTotal+=Number(otherCount);
		}
		chartCodeList.push({code:otherName,count:otherTotal});
		chartCodeList.sort(function(a,b){return b.count-a.count;});//加入"其他"后 再次排序
	}
	
	
	
	var series=[];
	var legends=[];
	var radius=125;//最外圈radius
	ilength=chartCodeList.length;
	//前maxCodes个错误码
	for(i=0;i<ilength;i++){
		var record=chartCodeList[i];
		var codeNum=record.code;
		var count=record.count;
		var codeDesc=codeMap[codeNum]==null?codeNum:codeMap[codeNum];//"其他"或无对应描述的时候 直接使用code
		var seriesName=codeDesc;
		var showPercent=count/chartCodeList[0].count*100*(2/3);//呈现图表时使用的百分比，最大的数据占三分之二圆环(不占满)
//		var realPercent=count/req_cnt*100;//实际百分比 在tip中呈现
		var chartRecord={
	            name:seriesName,
	            type:'pie',
	            clockWise:false,
	            radius : [radius, radius+23],
	            itemStyle : dataStyle,
	            data:[
	                {
	                    value:showPercent,
	                    name:"Cause:"+codeNum
	                },
	                {
	                    value:100-showPercent,
	                    name:'invisible',
	                    itemStyle : placeHolderStyle
	                }
	            ]
	        };
		series.push(chartRecord);
		legends.push(seriesName);
		
		radius-=25;
	}
	var option=this.getOptionByData(legends, series);
	this.updateData(option,true);
	this.hideLoading();
	
};

/**
 * 业务大类网络质量指标图表(娄耀佳接口)(line bar)
 * @class P2PScreen.MajorQualityChart
 * @extends LSMScreen.DataChartBase
 * @classdesc 多指标根据kpiList的配置来呈现
 */
P2PScreen.MajorQualityChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
P2PScreen.MajorQualityChart.prototype=Object.create(LSMScreen.DataChartBase.prototype);
P2PScreen.MajorQualityChart.prototype.constructor=P2PScreen.MajorQualityChart;

/**
 * 需要呈现的指标列表
 * @public
 * @type {Array} 
 * @example
 * [
 * 	{
 * 		kpiName:"下行速率",//指标呈现名称
 * 		kpiId:"4G下行速率500k",//指标ID 从接口对应
 * 		chartType:"bar",//line|bar 图表类型
 * 		yAxisIndex:0,//默认两个y轴，0->左轴 自适应, 1->右轴 百分比
 * 		
 * 	},
 * 	....
 * ]
 */
P2PScreen.MajorQualityChart.prototype.kpiList=[];

P2PScreen.MajorQualityChart.gobackPasser;

P2PScreen.MajorQualityChart.prototype.goback=function(){
	if(this.gobackPasser!=null){
		this.gobackPasser();
		$(this.backBtnDom).css("display","none");
	}
};

/** 
 * 请求数据 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	major:"视频",//业务大类 
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近3小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间
 * }
 */
P2PScreen.MajorQualityChart.prototype.query=function(queryConfig){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMajorQuality(queryConfig,this.dataHandler.bind(this),this.failHandler.bind(this));
};
/** 
 * 处理数据
 * @protected
 * @function 
 * @param {Array} chartDataArr 
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
 */
P2PScreen.MajorQualityChart.prototype.dataHandler=function(chartDataArr){
	var configList=this.kpiList;
	var app=this.queryConfig.app;
	if(app!=""&&app!=null){
		this.setTitle(this.baseConfig.title+"("+app+")");
	}else{
		this.setTitle(this.baseConfig.title);
	}
	
	var i=0;
	var j=0;
	var xAxisArr=[];
	var dataArrMap={};
	var unitMap={};
	var lastTime="";
	for(i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i];
		var dataRecord;
		if(app!=null&&app!=""){
			dataRecord=record[app];
		}else{
			dataRecord=record;
		}
		var time=record.time;
		time=time.substring(11,16);//时:分
		lastTime=time;
		xAxisArr.push(time);
		
		for(j=0;j<configList.length;j++){
			var configRecord=configList[j];
			var kpiId=configRecord.kpiId;
//			var yAxisIndex=configRecord.yAxisIndex;
			var kpiInfo=SUtils.getKpiInfo(kpiId);
			var value=(dataRecord[kpiId]*kpiInfo.fact).toFixed(kpiInfo.percise);;//娄耀佳接口百分比在0-1之间
			unitMap[kpiId]=kpiInfo.unit;
			if(dataArrMap[kpiId]==null){
				dataArrMap[kpiId]=[];
			}
			dataArrMap[kpiId].push(value);
		}
		
		
	}
	this.setTime(lastTime);
	var series=[];
	var legends=[];
	for(j=0;j<configList.length;j++){
		var cr=configList[j];
		legends.push(cr.kpiName);
		series.push({
            name:cr.kpiName,
            type:cr.chartType,
            yAxisIndex:cr.yAxisIndex,
            data:dataArrMap[cr.kpiId],
            unit:unitMap[cr.kpiId]
        });
	}
	var option=this.getOptionByData(legends,xAxisArr, series,function(param){
		return param.name+"<br/>"+param.seriesName+":"+param.value+" "+param.series.unit;
	});
	this.updateData(option,true);
	this.hideLoading();
};




/**
 * 业务源散点图(娄耀佳接口)
 * @class P2PScreen.BusinessSourceBubbleChart
 * @extends LSMScreen.DataChartBase
 * @classdesc 4G流量->气泡大小 4G流量占比->气泡x轴 4G下行速率500k->气泡y轴 
 */
P2PScreen.BusinessSourceBubbleChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
P2PScreen.BusinessSourceBubbleChart.prototype=Object.create(LSMScreen.DataChartBubble.prototype);
P2PScreen.BusinessSourceBubbleChart.prototype.constructor=P2PScreen.BusinessSourceBubbleChart;

/** 
 * 请求数据 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	major:"视频",//业务大类 
 *  time:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近10分钟
 *  group:"IDC",//分类 IDC,国际... 不填为查询major下所有
 * }
 */
P2PScreen.BusinessSourceBubbleChart.prototype.query=function(queryConfig){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getBusinessSourceQuality(queryConfig,this.dataHandler.bind(this),this.failHandler.bind(this));
};
/** 
 * 处理数据
 * @protected
 * @function 
 * @param {Object} chartData 
 * @example
 * {
 * 	"国际"://业务源
 * 	{	
 * 		"其他上行流量比": 0.06818787060432818,
        "其他流量比": 0.06542045290919127,
        "总流量": 185097632
 * 	},
 * 	....
 *  "time": "2016-04-08 12:10:00"
 * }
 */
P2PScreen.BusinessSourceBubbleChart.prototype.dataHandler=function(chartData){
	//散点样式
	var dataStyle = {
	    normal: {
	        label: {show:true,position:"inside",formatter:"{a}",textStyle:{fontSize:LSMScreen.CHARTCONFIG.labelSize}},
	        labelLine: {show:false}
	    }
	};
	var xKey="4G流量";
	var yKey="4G下行速率500k";
//	var sizeKey="4G流量比";//0-1百分比 tip呈现时才*100
	var timeKey="time";
	
	var xName="4G流量";
	var yName="4G下行速率";
	var sizeName="4G流量比";
	
	var series=[];
	var legends=[];
	var lastTime="";
	var key="";
	var record={};
	var maxSize=0;
	var minSize=1;
	var total=0;
	var xInfo=SUtils.getKpiInfo(xKey,false);
	var yInfo=SUtils.getKpiInfo(yKey,false);
	var maxX=0;
	var maxY=0;
	for(key in chartData){
		if(key==timeKey){
			continue;
		}
		record=chartData[key];
		var currSize=record[xKey];
		maxSize=Math.max(record[xKey],maxSize);
		minSize=Math.min(record[xKey],minSize);
		total+=currSize;
	}
	
	for(key in chartData){
		if(key==timeKey){
			continue;
		}
		record=chartData[key];
		var showName=key;
		var xValue=record[xKey];
		var yValue=record[yKey];
		xValue=(xValue*xInfo.fact).toFixed(xInfo.percise);
		yValue=(yValue*yInfo.fact).toFixed(yInfo.percise);
		maxX=Math.max(maxX,xValue);
		maxY=Math.max(maxY,yValue);
		var sizeValue=xValue/(total*xInfo.fact);
		var point=[xValue,yValue,sizeValue];
		
		legends.push(key);
		series.push({
			name:showName,
            type:'scatter',
            symbol:'circle',
            itemStyle:dataStyle,
            tooltip : {
                trigger: 'item',
                formatter : function (params) {
                    return params.seriesName +'<br/>'
                    	   + xName+':'+params.value[0]+" MB" +'<br/>'
                           + yName+':'+params.value[1]+" Kbps" +'<br/>'
                           + sizeName+':'+(params.value[2]*100).toFixed(2)+" %"; 
                },
                axisPointer:{
                    show: true
                }
            },
            symbolSize: function (value){
            	//最小10 最大40 
            	var currentSize=value[2];
            	var baseBubbleSize=20;
            	var maxDeltaSize=60;
            	
                return baseBubbleSize+maxDeltaSize*currentSize;
            },
            data:[point]
		});
	}
	lastTime=chartData[timeKey];
	this.setTime(lastTime.substring(11,16));

	var option=this.getOptionByData(legends, series,null,maxX,maxY);
	this.updateData(option,true);
	this.hideLoading();
};


/**
 * 业务源趋势图 流量，速率(娄耀佳接口)(line bar)
 * @class P2PScreen.BusinessSourceTrend
 * @extends P2PScreen.MajorQulityChart
 * @classdesc 大致同业务大类多指标图表，只是这里查业务源
 */
P2PScreen.BusinessSourceTrend=function (){
	//默认指标
	this.kpiList=[
          {
        	  kpiName:"4G流量",
        	  kpiId:"4G流量",
        	  chartType:"bar",
        	  yAxisIndex:0
          },{
        	  kpiName:"4G下行速率",
        	  kpiId:"4G下行速率500k",
        	  chartType:"line",
        	  yAxisIndex:1
          }
	];
	this.initialize.apply(this, arguments);
};
/** 从MajorQulityChart继承*/
P2PScreen.BusinessSourceTrend.prototype=Object.create(P2PScreen.MajorQualityChart.prototype);
P2PScreen.BusinessSourceTrend.prototype.constructor=P2PScreen.BusinessSourceTrend;

/** 
 * 请求数据 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	major:"视频",//业务大类 
 *  timeBegin:"yyyy-MM-dd hh:mm:ss",//开始时间 默认最近3小时
 *  timeEnd:"yyyy-MM-dd hh:mm:ss"//结束时间 默认当前时间
 *  group:"IDC",//分类 IDC,国际... 不填为查询major下所有
 * }
 */
P2PScreen.BusinessSourceTrend.prototype.query=function(queryConfig){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getBusinessSourceTrend(queryConfig,this.dataHandler.bind(this),this.failHandler.bind(this));
};
/** 
 * 处理数据
 * @protected
 * @function 
 * @param {Array} chartDataArr 
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
 */
P2PScreen.BusinessSourceTrend.prototype.dataHandler=function(chartDataArr){
	var configList=this.kpiList;
	var group=this.queryConfig.group;
	var i=0;
	var j=0;
	var xAxisArr=[];
	var dataArrMap={};
	var unitMap={};
	var lastTime="";
	for(i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i][group];
		var time=chartDataArr[i].time;
		time=time.substring(11,16);//时:分
		lastTime=time;
		xAxisArr.push(time);
		
		for(j=0;j<configList.length;j++){
			var configRecord=configList[j];
			var kpiId=configRecord.kpiId;
//			var yAxisIndex=configRecord.yAxisIndex;
			var value=record[kpiId];//娄耀佳接口百分比在0-1之间
			var xInfo=SUtils.getKpiInfo(kpiId);
			unitMap[kpiId]=xInfo.unit;
			value=(value*xInfo.fact).toFixed(xInfo.percise);
			if(dataArrMap[kpiId]==null){
				dataArrMap[kpiId]=[];
			}
			dataArrMap[kpiId].push(value);
		}
		
		
	}
	this.setTime(lastTime);
	this.setTitle(this.baseConfig.title+"("+group+")");
	var series=[];
	var legends=[];
	for(j=0;j<configList.length;j++){
		var cr=configList[j];
		legends.push(cr.kpiName);
		series.push({
            name:cr.kpiName,
            type:cr.chartType,
            yAxisIndex:cr.yAxisIndex,
            data:dataArrMap[cr.kpiId],
            unit:unitMap[cr.kpiId]
        });
	}
	var option=this.getOptionByData(legends,xAxisArr, series,function(param){
		return param.name+"<br/>"+param.seriesName+":"+param.value+" "+param.series.unit;
	});
	this.updateData(option,true);
	this.hideLoading();
};


/**
 * 终端排名玫瑰图(黄文接口)
 * @class P2PScreen.TerminalRoseChart
 * @extends LSMScreen.DataChartPie
 * @classdesc 
 */
P2PScreen.TerminalRoseChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
P2PScreen.TerminalRoseChart.prototype=Object.create(LSMScreen.DataChartPie.prototype);
P2PScreen.TerminalRoseChart.prototype.constructor=P2PScreen.TerminalRoseChart;

/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	topN:"8",//数量
 *  type:"brand",//brand|model 按品牌或型号分
 *  app_type_name:"视频",//业务大类
 *  app_subtype_name:""//业务小类
 *  terminal_brand:""//终端品牌 当type=model时
 * }
 */
P2PScreen.TerminalRoseChart.prototype.query=function(queryConfig){
	this.lastQueryConfig=queryConfig;
	if(this.isFDD){
		queryConfig.fdd=true;
	}else{
		queryConfig.fdd=false;
	}
	var dm=LSMScreen.DataManager.getInstance();
	dm.getTerminalRank(queryConfig,this.dataHandler.bind(this),this.failHandler.bind(this));
};

P2PScreen.TerminalRoseChart.prototype.gobackPasser;
P2PScreen.TerminalRoseChart.prototype.showLegend=true;
P2PScreen.TerminalRoseChart.prototype.funcBtnInited=false;
P2PScreen.TerminalRoseChart.prototype.funcBtnId="";
P2PScreen.TerminalRoseChart.prototype.isFDD=false;
P2PScreen.TerminalRoseChart.prototype.lastQueryConfig={};

P2PScreen.TerminalRoseChart.prototype.addFuncBtn=function(){
	var typeDiv=document.createElement("div");
	var allSpan=document.createElement("span");
	var fddSpan=document.createElement("span");
	var spacer=document.createElement("div");
	var uid=Math.uuid(8, 16);
	this.funcBtnId=uid;
	$(allSpan).text("全部");
	$(allSpan).css("text-decoration","underline");
	$(allSpan).css("cursor","pointer");
	$(spacer).css("display","inline-block");
	$(spacer).css("width","8px");
	$(fddSpan).text("FDD");
	$(fddSpan).css("cursor","pointer");
	
	$(allSpan).on("click",this.typeFilter.bind(this));
	$(fddSpan).on("click",this.typeFilter.bind(this));
	
	$(typeDiv).css("position","absolute");
	$(typeDiv).css("font-size","18px");
	$(typeDiv).css("font-weight","bold");
	$(typeDiv).css("color","#ffffff");
	$(typeDiv).css("top","5px");
	$(typeDiv).css("left","5px");
	$(typeDiv).attr("id",uid);
	$(typeDiv).append(allSpan);
	$(typeDiv).append(spacer);
	$(typeDiv).append(fddSpan);
	
	$(this.parentDom).append(typeDiv);
};
P2PScreen.TerminalRoseChart.prototype.typeFilter=function(evt){
	var lb=$(evt.currentTarget).text();
	$("#"+this.funcBtnId+" span").css("text-decoration","none");
	$(evt.currentTarget).css("text-decoration","underline");
	if(lb=="全部"){
		this.isFDD=false;
	}else if(lb=="FDD"){
		this.isFDD=true;
	}
	this.update(true,this.lastQueryConfig);
};
P2PScreen.TerminalRoseChart.prototype.goback=function(){
	this.update(true,{
		topN:8,
		type:"brand",
		app_type_name:"",
		app_subtype_name:"",
		terminal_brand:""
	});
	if(this.gobackPasser!=null){
		this.gobackPasser();
	}
};
/** 
 * 处理数据
 * 降序取前6个错误码，剩下的归并到"其他"
 * @protected
 * @function 
 * @param {Array} chartDataArr
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
 */
P2PScreen.TerminalRoseChart.prototype.dataHandler=function(chartDataArr){
	//有色圆环样式
	var dataStyle = {
	    normal: {
	        label: {show:true,position:"outter",textStyle:{fontSize:LSMScreen.CHARTCONFIG.labelSize}},
	        labelLine: {show:true,length:0}
	    }
	};
	var seriesName="";

	if(this.queryConfig.type=="model"){
		seriesName="终端型号排名";
		this.setTitle("品牌("+this.queryConfig.terminal_brand+")");
		$(this.backBtnDom).css("display","block");
	}else{
		seriesName="终端品牌排名";
		this.setTitle(this.baseConfig.title);
		$(this.backBtnDom).css("display","none");
	}
	
	
	var lastTime="";
	var dataArr=[];
	var legends=[];
	for(var i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i];
		var cnts=record.terimalCnt;
		var time=record.time;
		var pointName=record.terminal_model;
		lastTime=time.substring(11,16);
		legends.push(pointName);
		dataArr.push({
            value:cnts,
            name:pointName
        });
	}
	var series=[{
            name:seriesName,
            type:'pie',
            roseType:'area',
            clockWise:false,
//            sort : 'ascending',
            radius : ['10%', '70%'],
            itemStyle : dataStyle,
            data:dataArr
        }];
	this.setTime(lastTime);
	var option=this.getOptionByData(legends, series,{show:this.showLegend});
	this.updateData(option,true);
	this.hideLoading();
	
	if(!this.funcBtnInited){
		this.addFuncBtn();
		this.funcBtnInited=true;
	}
	
};

/**
 * 质差终端表格
 * @class P2PScreen.TerminalQualityTable
 * @extends LSMScreen.ComponentBase
 * @classdesc 质差终端表格
 */
P2PScreen.TerminalQualityTable=function(){
	this.initialize.apply(this, arguments);
	this.createComponent();
};
/** 从ComponentBase继承*/
P2PScreen.TerminalQualityTable.prototype=Object.create(LSMScreen.ComponentBase.prototype);
P2PScreen.TerminalQualityTable.prototype.constructor=P2PScreen.TerminalQualityTable;

/** 
 * 创建组件内容
 * @public
 * @function 
 */
P2PScreen.TerminalQualityTable.prototype.createComponent=function (){
	var dom=this.contentDom;
	var table=document.createElement("table");
	dom.appendChild(table);
	/**
	 * jqgird对象
	 * @private
	 * @type {Object} 
	 */
	this.grid=$(table).jqGrid({
        datatype : "json",
		colNames : [ '质差终端型号', '流量占比(%)', '下载速率(Mbps)'],
        colModel : [ 
                     {name : 'model',index : 'model',width : 320}, 
                     {name : 'zbu',index : 'zbu',width : 250}, 
                     {name : 'slu',index : 'slu',width : 250}
                   ],
        loadui:'disable',
//		        rowNum : 100,
        height:260
	});
//	.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide(); 隐藏表头方法
};

/** 
 * 更新请求数据
 * @public
 * @function 
 * @param {Boolean} showLoadMask 这次数据更新是否要呈现loadMask
 */
P2PScreen.TerminalQualityTable.prototype.update=function (showLoadMask,queryConfig){
	this.showLoading();
	var dm=LSMScreen.DataManager.getInstance();
	dm.getTerminalZC(queryConfig,this.dataHandler.bind(this),this.failHandler.bind(this));
};
/** 
 * 处理数据
 * @protected
 * @function 
 * @param {Array} chartDataArr 
 * @example
 * [
 * 	{
 * 	vendor:"苹果",//品牌 不填查全部
 *  zbu:,//占比大于
 *  slu:,//速率小于
 *  topN:8
 * },
 *  ....
 * ]
 */
P2PScreen.TerminalQualityTable.prototype.dataHandler=function(chartDataArr){
//	this.grid.clearGridData();
//	this.grid.jqGrid('addJSONData',chartDataArr);
//	this.grid.addJSONData(chartDataArr);
	this.clearGrid();
	if(chartDataArr!=null&&chartDataArr.length>0){
		for ( var i = 0; i < chartDataArr.length; i++){
			this.grid.jqGrid('addRowData', i + 1, chartDataArr[i]);
		}
		this.grid.find("tr").removeClass("oddGrayTableRow");
		this.grid.find("tr:odd").addClass("oddGrayTableRow");
	}
	this.hideLoading();
};

/** 
 * 清空jqgrid数据
 * @protected
 * @function 
 * }
 */
P2PScreen.TerminalQualityTable.prototype.clearGrid=function(){
	SUtils.clearGrid(this.grid);
};
/**
 * 地址池利用率和PDP激活成功率(黄文接口)(area)
 * @class P2PScreen.IagwKpiTrend
 * @extends P2PScreen.MajorQulityChart
 * @classdesc 大致同业务大类多指标图表，只是这里查业务源
 */
P2PScreen.IagwKpiTrend=function (){
	//默认指标
	this.kpiList=[
          {
        	  kpiName:"地址池利用率",
        	  kpiId:"netPoolUtilily",
        	  chartType:"line",
        	  yAxisIndex:0
          }
	];
	this.initialize.apply(this, arguments);
};
/** 从MajorQulityChart继承*/
P2PScreen.IagwKpiTrend.prototype=Object.create(P2PScreen.MajorQualityChart.prototype);
P2PScreen.IagwKpiTrend.prototype.constructor=P2PScreen.IagwKpiTrend;

P2PScreen.IagwKpiTrend.prototype.doResize=function(){
	if(this.isMaximized){
		$(this.contentDom).width($(this.maxDom).width());
		$(this.contentDom).height($(this.maxDom).height()-250);
	}else{
		$(this.contentDom).width($(this.parentDom).width());
		$(this.contentDom).height($(this.parentDom).height()-200);
	}
	
};
/** 
 * 请求数据 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	name:"ipPoolUntity"//不知道什么用查地址池利用率时用
 * }
 */
P2PScreen.IagwKpiTrend.prototype.query=function(queryConfig){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getIagwKpiTrend(queryConfig,this.dataHandler.bind(this),this.failHandler.bind(this));
};

/** 
 * 处理数据
 * @protected
 * @function 
 * @param {Array} chartDataArr 
 * @example
 * [
 * 	{
 * 		"time":"2016-04-09 13:15:00",
 * 		"ipPoolUntity":3.49,
 * 		"pdpSuccRate":100
 * },
 *  ....
 * ]
 */
P2PScreen.IagwKpiTrend.prototype.dataHandler=function(chartDataArr){
	var itemStyle={normal: {areaStyle: {type: 'default'}}};//区域图样式
	
	var configList=this.kpiList;
	var i=0;
	var j=0;
	var xAxisArr=[];
	var dataArrMap={};
	var lastTime="";
	for(i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i];
		var time=record.time;
		time=time.substring(11,16);//时:分
		lastTime=time;
		xAxisArr.push(time);
		
		for(j=0;j<configList.length;j++){
			var configRecord=configList[j];
			var kpiId=configRecord.kpiId;
//			var yAxisIndex=configRecord.yAxisIndex;
			var value=record[kpiId];//黄文接口百分比在0-100之间
			if(dataArrMap[kpiId]==null){
				dataArrMap[kpiId]=[];
			}
			dataArrMap[kpiId].push(value);
		}
		
		
	}
	this.setTime(lastTime);
	var series=[];
	var legends=[];
	for(j=0;j<configList.length;j++){
		var cr=configList[j];
		legends.push(cr.kpiName);
		series.push({
			itemStyle:itemStyle,
            name:cr.kpiName,
            type:cr.chartType,
            yAxisIndex:cr.yAxisIndex,
            data:dataArrMap[cr.kpiId]
        });
	}
	var option=this.getOptionByData(legends,xAxisArr, series);
	this.updateData(option,true);
	this.hideLoading();
};





/**
 * 设备指标表格(头部导航可配)
 * @class P2PScreen.MultiTypeDeviceKpiTable
 * @extends LSMScreen.ComponentBase
 * @classdesc 质差终端表格
 */
P2PScreen.MultiTypeDeviceKpiTable=function(){
	this.initialize.apply(this, arguments);
};
/** 从ComponentBase继承*/
P2PScreen.MultiTypeDeviceKpiTable.prototype=Object.create(LSMScreen.ComponentBase.prototype);
P2PScreen.MultiTypeDeviceKpiTable.prototype.constructor=P2PScreen.MultiTypeDeviceKpiTable;


/** 
 * 上次选中的导航条设备 默认第一个
 * @public
 * @type{String}
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.lastType="";

/** 
 * 排序
 * @public
 * @type{String}
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.sortType="默认";//默认 升序 降序

/** 
 * 由于要多次请求 统一保存一次请求的时间
 * @public
 * @type{String}
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.requestTime="";


/** 
 * 由于要多次请求 暂存enb厂商数据
 * @public
 * @type{Object}
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.vendorMapData={};

/** 
 * 由于要多次请求 暂存MMEGROUP数据
 * @public
 * @type{Array}
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.poolData=[];
/** 
 * 通过Math.uuid()生成的随机id
 * @public
 * @type{String}
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.menuId="MultiTypeDeviceKpiTable_menuel";

/** 
 * 可选设备类型
 * @public
 * @type{String}
 */
P2PScreen.MultiTypeDeviceKpiTable.TYPES={
		SAEGW:"SAEGW",
		ENBVENDOR:"ENB厂商",
		ENBIP:"PTN汇聚环",
		CITY:"属地",
		HOTSPOT:"热点",
		MME:"MME",
		CITY_ENB:"属地分PTN汇聚环统计"//属地下钻取分PTN汇聚环统计 仅速率
};

/** 
 * 可选指标
 * @public
 * @type{String}
 */
P2PScreen.MultiTypeDeviceKpiTable.KPIS={
	ATTACHSUCC4G:"4G附着成功率",
	DLSPEED4G:"4G下行速率500k"
};
/** 
 * 可选菜单
 * @public
 * @type{String}
 */
P2PScreen.MultiTypeDeviceKpiTable.MENUS={
		TREND:"趋势图",
		SPLITENBIP:"分PTN汇聚环统计",
		SPLITCELL:"分小区统计"
};


/** 
 * 构造方法 
 * require部分的配置只在这里执行
 * @protected
 * @function 
 * @param {Object} dom 包含需要绘制图表的节点的外层div节点
 * @param {Object} [_config] 配置项(可选)  P2PScreen.MultiTypeDeviceKpiTable.config
 * @param {Object} [base_config] ComponentBase配置项(可选)  
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.initialize=function (dom,_config,base_config){
	/**
	 * 配置项
	 * @public
	 * @type {Object}
	 * @example 
	 {
	 	deviceTypes:[],//['SAEGW','ENB厂商','PTN汇聚环','属地','热点']4G下行速率500k, ['MME','PTN汇聚环','ENB厂商']4G附着成功率
		navBarDirection:"",//top,bottom
		kpiKey:"",//4G附着成功率 4G下行速率500k
		kpiShowName:""
	 }
	 */
	this.config={
			deviceTypes:['SAEGW','ENB厂商','PTN汇聚环','属地','热点'],//['SAEGW','ENB厂商','PTN汇聚环','属地','热点'] ['MME','PTN汇聚环','ENB厂商']
			navBarDirection:"top",//top,bottom,none 不呈现
			kpiKey:"4G下行速率500k",//4G附着成功率 4G下行速率500k
			kpiShowName:"下行速率",
			width:835,
			height:690,
			rowHeight:56,
			sd:""//地市分enbip统计时的地市参数
	};
	
	
	for(var key in _config){
		this.config[key]=_config[key];
	}
	/** 调用父类构造方法用来构造loadMask */
	Object.create(P2PScreen.MultiTypeDeviceKpiTable.prototype.__proto__).initialize.apply(this, [dom,base_config]);
	
	this.menuId=Math.uuid();
	this.hotspotNameInput;
	this.queryBtn;
	
	this.createMenuByDeviceType(this.config.deviceTypes[0]);
	this.createComponent();
};

P2PScreen.MultiTypeDeviceKpiTable.prototype.redraw=function (){
	this.navObj.setWidth($(this.contentDom).width());
	this.grid.setGridWidth($(this.contentDom).width());
	if(this.lastType==P2PScreen.MultiTypeDeviceKpiTable.TYPES.ENBIP){
		this.grid.setGridHeight($(this.contentDom).height()-this.nav.height()-this.radioDiv.height()-75);
	}else{
		this.grid.setGridHeight($(this.contentDom).height()-this.nav.height()-this.radioDiv.height());
	}
	
};

/** 
 * 根据设备类型获取菜单
 * @public
 * @function 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.createMenuByDeviceType=function (type){
	var menuEl=document.getElementById(this.menuId);
	var ul;
	if(menuEl==null){
//		<div id="context-menu">
//		  <ul class="dropdown-menu" role="menu">
//		    <li><a tabindex="-1" href="#">Action</a></li>
//			...
//		    <li><a tabindex="-1" href="#">Separated link</a></li>
//		  </ul>
//		</div>
		menuEl=document.createElement("div");
		$(menuEl).attr("id",this.menuId);
		$(menuEl).css("display","none");
		ul=document.createElement("ul");
		$(ul).addClass("dropdown-menu");
		$(ul).attr("role","menu");
		menuEl.appendChild(ul);
		document.body.appendChild(menuEl);
	}else{
		ul=$(menuEl).find("ul")[0];
	}
	
	ul.innerHTML="";
	ul.appendChild(this.createMenuItem(P2PScreen.MultiTypeDeviceKpiTable.MENUS.TREND));
	if(type==P2PScreen.MultiTypeDeviceKpiTable.TYPES.CITY){
		ul.appendChild(this.createMenuItem(P2PScreen.MultiTypeDeviceKpiTable.MENUS.SPLITENBIP));
	}
	if(type==P2PScreen.MultiTypeDeviceKpiTable.TYPES.HOTSPOT){
		ul.appendChild(this.createMenuItem(P2PScreen.MultiTypeDeviceKpiTable.MENUS.SPLITCELL));
	}
};
/** 
 * 创建菜单节点
 * @public
 * @function 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.createMenuItem=function (name){
	var trendLi=document.createElement("li");
	var a=document.createElement("a");
	$(a).css("cursor","pointer");
	$(a).attr("tabindex",-1);
	$(a).text(name);
	trendLi.appendChild(a);
	return trendLi;
};

/** 
 * 改变排序方式
 * @public
 * @function 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.sortTypeChange=function (param){
	this.sortType=$(param.currentTarget).attr("value");
	this.update(true);
};
/** 
 * 创建组件内容
 * @public
 * @function 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.createComponent=function (){
	var deviceTypes=this.config.deviceTypes;
	var navBarDirection=this.config.navBarDirection;
	if(deviceTypes.length>0){
		this.lastType=deviceTypes[0];
	}
	
	var dom=this.contentDom;//父容器节点
	
	this.navObj=new LSMScreen.NavBar(deviceTypes,0,this.config.width,this.navClick.bind(this));
	//创建导航栏
	var nav_ul=(this.navObj).navDom;
	var div=document.createElement("div");
	var radioDiv=document.createElement("div");
	
	var hotspotNameInput=document.createElement("input");
	this.hotspotNameInput=hotspotNameInput;
	var queryBtn=document.createElement("input");
	this.queryBtn=queryBtn;
	
	$(this.hotspotNameInput).css("display","none");
	$(this.queryBtn).css("display","none");
	
	var radio0=document.createElement("input");
	var radio1=document.createElement("input");
	var radio2=document.createElement("input");
	
	var label0=document.createElement("span");
	var label1=document.createElement("span");
	var label2=document.createElement("span");
	
	$(label0).text("默认");
	$(label1).text("升序");
	$(label2).text("降序");
	
	$(radio0).on('click',this.sortTypeChange.bind(this));
	$(radio1).on('click',this.sortTypeChange.bind(this));
	$(radio2).on('click',this.sortTypeChange.bind(this));
	
	$(hotspotNameInput).attr("type","text");
	$(hotspotNameInput).css("float","left");
	$(hotspotNameInput).keydown(this.hotspotNameInputKeyDown.bind(this));
	$(queryBtn).css("float","left");
	$(queryBtn).attr("type","button");
	$(queryBtn).attr("value","查询");
	$(queryBtn).addClass("btn btn-primary btn-xs");
	$(queryBtn).on('click',this.queryBtnClick.bind(this));
	
	$(radio0).prop("checked",true);
	$(radio0).attr("type","radio");
	$(radio1).attr("type","radio");
	$(radio2).attr("type","radio");
	$(radio0).attr("name","MDKSortRadio");
	$(radio1).attr("name","MDKSortRadio");
	$(radio2).attr("name","MDKSortRadio");
	$(radio0).attr("value","默认");
	$(radio1).attr("value","升序");
	$(radio2).attr("value","降序");
	
	$(radio0).css("float","right");
	$(radio1).css("float","right");
	$(radio2).css("float","right");
	
	$(label0).css("float","right");
	$(label1).css("float","right");
	$(label2).css("float","right");
	
	
	$(radioDiv).css("float","right");
	$(radioDiv).width("100%");
	$(radioDiv).height(30);
	
	radioDiv.appendChild(hotspotNameInput);
	radioDiv.appendChild(queryBtn);
	
	
	radioDiv.appendChild(label0);
	radioDiv.appendChild(radio0);
	
	radioDiv.appendChild(label1);
	radioDiv.appendChild(radio1);
	
	radioDiv.appendChild(label2);
	radioDiv.appendChild(radio2);
	
	//创建表格本体
	var table=document.createElement("table");
	this.tableUID=Math.uuid();
	$(table).attr("id",this.tableUID);
	dom.appendChild(nav_ul);
	div.appendChild(table);
	div.appendChild(radioDiv);
	dom.appendChild(div);
	
	this.tableDom=table;
	
	this.nav_ul=nav_ul;
	
	
	
	
	/**
	 * 列宽
	 * @private
	 * @type {Number} jquery对象
	 */
	this.colWidth=(this.config.width-5)/4;//-5 边距
	
	/**
	 * 导航条对象
	 * @private
	 * @type {Object} jquery对象
	 */
	this.nav=$(nav_ul);
	
	/**
	 * 单选条件对象
	 * @private
	 * @type {Object} jquery对象
	 */
	this.radioDiv=$(radioDiv);
	
	this.initJqGrid();
	$(dom).addClass('MultiTypeDeviceKpiTable');//特殊控制样式
	//按顺序添加组件
	if(navBarDirection=="bottom"){
		$(nav_ul).css("position","absolute");
		$(nav_ul).css("bottom","5px");
	}else if(navBarDirection=="top"){
		$(div).css("position","absolute");
		$(div).css("bottom","5px");
	}else if(navBarDirection=="none"){
		$(nav_ul).css("position","absolute");
		$(nav_ul).css("display","none");
	}
};


P2PScreen.MultiTypeDeviceKpiTable.prototype.initJqGrid=function (colNames,colModel,groupHeaders){
	if(colNames==null){
		colNames=[ '设备1', '值1', '设备2', '值2'];
	}
	if(colModel==null){
		colModel=[ 
                  {name : 'type1',index : 'type1',width : this.colWidth}, 
                  {name : 'value1',index : 'value1',width : this.colWidth}, 
                  {name : 'type2',index : 'type2',width : this.colWidth}, 
                  {name : 'value2',index : 'value2',width : this.colWidth}
                ];
	}
	//将表格右侧撑满
//	$('.MultiTypeDeviceKpiTable .ui-jqgrid-btable').width($('.MultiTypeDeviceKpiTable .ui-jqgrid-bdiv').width());
	if(this.grid){
		this.grid.GridUnload();
	}
	if(groupHeaders==null){
		this.grid=$("#"+this.tableUID).jqGrid({
	        datatype : "json",
	        colNames : colNames,
	        colModel : colModel,
	        loadui:'disable',
	        afterInsertRow:this.gridAfterInsertHandler.bind(this),
	        height:this.config.height-$(this.nav_ul).height()-$(this.radioDiv).height()
		});
		this.grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide(); //创建jqgrid并隐藏表头
	}else{
		this.grid=$("#"+this.tableUID).jqGrid({
	        datatype : "json",
	        colNames : colNames,
	        colModel : colModel,
	        loadui:'disable',
	        sortable:false,
	        autowidth:true,
	        autoScroll: true,
	        shrinkToFit:false,
	        rowNum:1000000,
	        afterInsertRow:this.gridAfterInsertHandler2.bind(this),
	        height:this.config.height-$(this.nav_ul).height()-$(this.radioDiv).height()-75
		});
		this.grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').show(); //创建jqgrid并隐藏表头
		$("#"+this.tableUID).jqGrid('setGroupHeaders', {
		    useColSpanStyle: true,
		    groupHeaders:groupHeaders
		});
	}
};
P2PScreen.MultiTypeDeviceKpiTable.prototype.gridAfterInsertHandler2=function (rowid,rowdata){
	var max=rowdata.max;
	
	var tr=this.grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	
	//SAEGW的厂商为自己计算的值 无钻取
	if(!(rowid==1&&this.lastType==P2PScreen.MultiTypeDeviceKpiTable.TYPES.SAEGW)){
		tds.contextmenu({
  		  target:'#'+this.menuId, 
  		  onItem: function(context,e) {
  			  var menuName=$(e.currentTarget).text();
  			  var typeName=$(context[0]).attr("typeName");
//  			  typeName=typeName.split("-")[0];
  			  var kpiKey=this.config.kpiKey;
  			  var kpiName=this.config.kpiShowName;
  			  var deviceType=this.lastType;
  			  var deviceTypeTranslate=SUtils.getMapKey(P2PScreen.MultiTypeDeviceKpiTable.TYPES,deviceType);
  			  var kpiType="";
  			  if(kpiKey==P2PScreen.MultiTypeDeviceKpiTable.KPIS.ATTACHSUCC4G){
					  kpiType='quality';
				  }else if(kpiKey==P2PScreen.MultiTypeDeviceKpiTable.KPIS.DLSPEED4G){
					  kpiType='rates';
				  }
  			  var isVendor=this.isVendorKey(typeName);
  			  if(!isVendor&&deviceType==P2PScreen.MultiTypeDeviceKpiTable.TYPES.ENBVENDOR){
  				  deviceTypeTranslate="CITY";
  			  }else if(isVendor&&deviceType==P2PScreen.MultiTypeDeviceKpiTable.TYPES.MME){
					  deviceTypeTranslate="MMEGROUP";
  			  }
  			  if(deviceTypeTranslate=="CITY"){
  				  typeName+="分公司";
  			  }
  			  
  			  var winX=e.pageX;
  			  var winY=e.pageY;
  			  var winWidth=1200;
  			  var winHeight=400;
  			  var pageWidth=$(document).width();
  			  var pageHeight=$(document).height();
  			  if(winX+winWidth>pageWidth){
  				  winX=pageWidth-winWidth;
  				  if (document.documentElement.clientWidth < document.documentElement.offsetWidth){
  					  winX-=30;//滚动条
  				  } 
  			  }
  			  if(winY+winHeight>pageHeight){
  				  winY=pageHeight-winHeight;
  				  if (document.documentElement.clientHeight < document.documentElement.offsetHeight){
  					  winY-=30;//滚动条
  				  } 
  			  }
  			  if(menuName==P2PScreen.MultiTypeDeviceKpiTable.MENUS.TREND){
  				  new P2PScreen.KPIDrillWin({
  						title:typeName+"-"+kpiName,
  						width:winWidth,
  						height:winHeight,
  						x:winX,
  						y:winY,
  						kpiName:kpiName,
  						deviceName:typeName,
  						deviceType:deviceTypeTranslate,
  						kpiKey:kpiKey,
  						kpiType:kpiType
  					});
  			  }else if(menuName==P2PScreen.MultiTypeDeviceKpiTable.MENUS.SPLITENBIP){
  				var wincityenbip=new LSMScreen.SimpleWindow({
  					title:typeName+P2PScreen.MultiTypeDeviceKpiTable.MENUS.SPLITENBIP,
  					width:this.config.width,
  					height:this.config.height,
  					x:$(this.parentDom).offset().left,
  					y:$(this.parentDom).offset().top
  				});
      				var cityenbipDKT=new P2PScreen.MultiTypeDeviceKpiTable(wincityenbip.content,{
      					deviceTypes:['属地分PTN汇聚环统计'],
      					navBarDirection:"none",
      					kpiKey:"4G下行速率500k",
      					kpiShowName:"下行速率",
      					width:this.config.width,
      					height:this.config.height,
      					sd:typeName
      				});
      				cityenbipDKT.update(true);
  			  }else if(menuName==P2PScreen.MultiTypeDeviceKpiTable.MENUS.SPLITCELL){
  				  
  			  }
  		  }.bind(this)
      	});
	}
	
	tds.height(this.config.rowHeight*2);
	for(var i=0;i<tds.length;i++){
		var td=tds[i];
		var key=$(td).attr("aria-describedby");
		var tmp=key.split("_");
		var dataKey=tmp[tmp.length-2]+"_"+tmp[tmp.length-1];
		var cellData=rowdata[dataKey];
		if(cellData!=null&&cellData!=""){
			var tmp2=cellData.split("_");
			var enb=tmp2[0];
			var value=tmp2[1];
			var percent=value/max;
			$(td).attr("typeName",enb);
			
			var tdWidth=$(td).width();
			
			$(td).text("");
			
			var bgDiv=document.createElement("span");
			if(!isNaN(percent)){
				$(bgDiv).height($(td).height());
		    	$(bgDiv).width(tdWidth*percent);
		    	$(bgDiv).addClass("fillCellBg");
		    	$(bgDiv).html(enb+"<br>"+value);
			}
			$(td).append(bgDiv);
		}
		
	}
};
P2PScreen.MultiTypeDeviceKpiTable.prototype.gridAfterInsertHandler=function (rowid,rowdata){
	var max=rowdata.max;
	
	var type1=rowdata.type1;
	var type2=rowdata.type2;
	
	if(rowdata.origin1!=""&&rowdata.origin1!=null){
		type1=rowdata.origin1;
	}
	if(rowdata.origin2!=""&&rowdata.origin2!=null){
		type2=rowdata.origin2;
	}
	
	var value1=rowdata.value1;
	var value2=rowdata.value2;
	
	var percent1=value1/max;
	var percent2=value2/max;
	
	var tr=this.grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	
	//SAEGW的厂商为自己计算的值 无钻取
	if(!(rowid==1&&this.lastType==P2PScreen.MultiTypeDeviceKpiTable.TYPES.SAEGW)){
		tds.contextmenu({
  		  target:'#'+this.menuId, 
  		  onItem: function(context,e) {
  			  var menuName=$(e.currentTarget).text();
  			  var typeName=$(context[0]).attr("typeName");
//  			  typeName=typeName.split("-")[0];
  			  var kpiKey=this.config.kpiKey;
  			  var kpiName=this.config.kpiShowName;
  			  var deviceType=this.lastType;
  			  var deviceTypeTranslate=SUtils.getMapKey(P2PScreen.MultiTypeDeviceKpiTable.TYPES,deviceType);
  			  var kpiType="";
  			  if(kpiKey==P2PScreen.MultiTypeDeviceKpiTable.KPIS.ATTACHSUCC4G){
					  kpiType='quality';
				  }else if(kpiKey==P2PScreen.MultiTypeDeviceKpiTable.KPIS.DLSPEED4G){
					  kpiType='rates';
				  }
  			  var isVendor=this.isVendorKey(typeName);
  			  if(!isVendor&&deviceType==P2PScreen.MultiTypeDeviceKpiTable.TYPES.ENBVENDOR){
  				  deviceTypeTranslate="CITY";
  			  }else if(isVendor&&deviceType==P2PScreen.MultiTypeDeviceKpiTable.TYPES.MME){
					  deviceTypeTranslate="MMEGROUP";
  			  }
  			  if(deviceTypeTranslate=="CITY"){
  				  typeName+="分公司";
  			  }
  			  
  			  var winX=e.pageX;
  			  var winY=e.pageY;
  			  var winWidth=1200;
  			  var winHeight=400;
  			  var pageWidth=$(document).width();
  			  var pageHeight=$(document).height();
  			  if(winX+winWidth>pageWidth){
  				  winX=pageWidth-winWidth;
  				  if (document.documentElement.clientWidth < document.documentElement.offsetWidth){
  					  winX-=30;//滚动条
  				  } 
  			  }
  			  if(winY+winHeight>pageHeight){
  				  winY=pageHeight-winHeight;
  				  if (document.documentElement.clientHeight < document.documentElement.offsetHeight){
  					  winY-=30;//滚动条
  				  } 
  			  }
  			  if(menuName==P2PScreen.MultiTypeDeviceKpiTable.MENUS.TREND){
  				  new P2PScreen.KPIDrillWin({
  						title:typeName+"-"+kpiName,
  						width:winWidth,
  						height:winHeight,
  						x:winX,
  						y:winY,
  						kpiName:kpiName,
  						deviceName:typeName,
  						deviceType:deviceTypeTranslate,
  						kpiKey:kpiKey,
  						kpiType:kpiType
  					});
  			  }else if(menuName==P2PScreen.MultiTypeDeviceKpiTable.MENUS.SPLITENBIP){
  				var wincityenbip=new LSMScreen.SimpleWindow({
  					title:typeName+P2PScreen.MultiTypeDeviceKpiTable.MENUS.SPLITENBIP,
  					width:this.config.width,
  					height:this.config.height,
  					x:$(this.parentDom).offset().left,
  					y:$(this.parentDom).offset().top
  				});
      				var cityenbipDKT=new P2PScreen.MultiTypeDeviceKpiTable(wincityenbip.content,{
      					deviceTypes:['属地分PTN汇聚环统计'],
      					navBarDirection:"none",
      					kpiKey:"4G下行速率500k",
      					kpiShowName:"下行速率",
      					width:this.config.width,
      					height:this.config.height,
      					sd:typeName
      				});
      				cityenbipDKT.update(true);
  			  }else if(menuName==P2PScreen.MultiTypeDeviceKpiTable.MENUS.SPLITCELL){
  				  
  			  }
  		  }.bind(this)
      	});
	}
	
	tds.height(this.config.rowHeight);
	var td1=tds[1];
	var td2=tds[3];
	var tdType1=$(tr).find("td")[0];
	var tdType2=$(tr).find("td")[2];
	
	$(tdType1).attr("typeName",type1);
	$(td1).attr("typeName",type1);
	$(tdType2).attr("typeName",type2);
	$(td2).attr("typeName",type2);
	
//	$(tdType1).attr("kpiKey",this.config.kpiKey);
//	$(td1).attr("kpiKey",this.config.kpiKey);
//	$(tdType2).attr("kpiKey",this.config.kpiKey);
//	$(td2).attr("kpiKey",this.config.kpiKey);
	
	
	var tdWidth1=this.colWidth;
	var tdWidth2=this.colWidth;
	
	if(this.isVendorKey(type1)){
		$(tdType1).addClass("vendorCell");
	}
	if(this.isVendorKey(type2)){
		$(tdType2).addClass("vendorCell");
	}
	
	
	td1.innerText="";
	td2.innerText="";
	
	var bgDiv1=document.createElement("span");
	var bgDiv2=document.createElement("span");
	if(!isNaN(percent1)){
		$(bgDiv1).height($(td1).height());
    	$(bgDiv1).width(tdWidth1*percent1);
    	$(bgDiv1).addClass("fillCellBg");
    	bgDiv1.innerText=value1;
	}
	if(!isNaN(percent2)){
		$(bgDiv2).height($(td2).height());
    	$(bgDiv2).width(tdWidth2*percent2);
    	$(bgDiv2).addClass("fillCellBg");
    	bgDiv2.innerText=value2;
	}
	
	td1.appendChild(bgDiv1);
	td2.appendChild(bgDiv2);
};
/** 
 * 导航条点击事件
 * @public
 * @function 
 * @param {String} 选中的设备类型
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.navClick=function (type){
	this.lastType=type;
	this.update(true, type);
	if(type==P2PScreen.MultiTypeDeviceKpiTable.TYPES.HOTSPOT){
		$(this.hotspotNameInput).css("display","block");
		$(this.queryBtn).css("display","block");
	}else{
		$(this.hotspotNameInput).css("display","none");
		$(this.queryBtn).css("display","none");
	}
	
};
/** 
 * 每次请求前 清除所有暂存数据
 * @public
 * @function 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.clearCache=function (){
	this.vendorMapData={};
	this.poolData=[];
};

/** 
 * 点击查询按钮
 * @public
 * @function 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.queryBtnClick=function (){
	this.update(true);
};
/** 
 * 输入框回车
 * @public
 * @function 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.hotspotNameInputKeyDown=function (event){
	if(event.keyCode==13){
		this.update(true);
	}
};





/** 
 * 更新请求数据
 * @public
 * @function 
 * @param {Boolean} showLoadMask 这次数据更新是否要呈现loadMask
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.update=function (showLoadMask,type){
	if(type==""||type==null){
		type=this.lastType;
	}
	if(showLoadMask){
		this.showLoading();
	}
	this.createMenuByDeviceType(this.lastType);
	
	
	var dm=LSMScreen.DataManager.getInstance();
	this.clearGrid();
	this.clearCache();
	var kpiKey=this.config.kpiKey;
	
//	deviceTypes:['SAEGW','ENB厂商','PTN汇聚环','属地','热点'],//['SAEGW','ENB厂商','PTN汇聚环','属地','热点']速率  ['MME','PTN汇聚环','ENB厂商']成功率
//	kpiKey:"4G下行速率500k",//4G附着成功率 4G下行速率500k
	
	var format="yyyy-MM-dd hh:mm:ss";
	this.requestTime=SUtils.getDiffDateTimeFromNow(-20,SUtils.TIME_TYPE.MIN,format);
	this.setTime(this.requestTime.substring(11,16));
	this.initJqGrid();
	if(kpiKey==P2PScreen.MultiTypeDeviceKpiTable.KPIS.DLSPEED4G){
		switch(type){
			case P2PScreen.MultiTypeDeviceKpiTable.TYPES.SAEGW:
				dm.getSaegwRatesRecord({time:this.requestTime},this.dataHandlerSAEGW.bind(this),this.failHandler.bind(this));
				break;
			case P2PScreen.MultiTypeDeviceKpiTable.TYPES.ENBVENDOR:
				dm.getENBVendorRatesRecord({time:this.requestTime},this.dataHandlerENBV.bind(this),this.failHandler.bind(this));
				break;
			case P2PScreen.MultiTypeDeviceKpiTable.TYPES.ENBIP:
//				dm.getENBIpRatesRecord({time:this.requestTime},this.dataHandlerENPIp.bind(this),this.failHandler.bind(this));
				dm.getEnbipc_sds_vendors({time:this.requestTime,vendor:"华为,诺西"},this.dataHandlerENPVendorCity.bind(this),this.failHandler.bind(this));
				break;
			case P2PScreen.MultiTypeDeviceKpiTable.TYPES.CITY:
				dm.getCityRatesRecord({time:this.requestTime},this.dataHandlerCity.bind(this),this.failHandler.bind(this));
				break;
			case P2PScreen.MultiTypeDeviceKpiTable.TYPES.HOTSPOT:
				this.queryHotspotName(this.requestTime);
				break;
			case P2PScreen.MultiTypeDeviceKpiTable.TYPES.CITY_ENB:
				dm.getCityENBIpRatesRecord({time:this.requestTime,sd:this.config.sd},this.dataHandlerCityENBIp.bind(this),this.failHandler.bind(this));
				break;
		}
	}else if(kpiKey==P2PScreen.MultiTypeDeviceKpiTable.KPIS.ATTACHSUCC4G){
		switch(type){
			case P2PScreen.MultiTypeDeviceKpiTable.TYPES.MME:
				dm.getMMEGroupSuccRecord({time:this.requestTime},this.dataHandlerMMEGroupSucc.bind(this),this.failHandler.bind(this));
				break;
			case P2PScreen.MultiTypeDeviceKpiTable.TYPES.ENBVENDOR:
				dm.getENBVendorQualityRecord({time:this.requestTime},this.dataHandlerENBVendorSucc.bind(this),this.failHandler.bind(this));
				break;
			case P2PScreen.MultiTypeDeviceKpiTable.TYPES.ENBIP:
//				dm.getENBIpQualityRecord({time:this.requestTime},this.dataHandlerENBIPSucc.bind(this),this.failHandler.bind(this));
				dm.getEnbipc_sds_vendors({time:this.requestTime,vendor:"华为,诺西"},this.dataHandlerENPVendorCity.bind(this),this.failHandler.bind(this));
				break;
		}
	}
	this.createMenuItem(type);
};

/** 
 * 清空jqgrid数据
 * @protected
 * @function 
 * }
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.clearGrid=function(){
	SUtils.clearGrid(this.grid);
};

/** 
 * 处理SAEGW数据 
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerSAEGW=function(chartData){
	var kpiKey=this.config.kpiKey;
	var kpiInfo=SUtils.getKpiInfo(kpiKey,true);
	var scale=kpiInfo.fact;
	var percise=0;
//	var kpiShowName=this.config.kpiShowName;
	
	var arr=[];
	var i=0;
	var max=0;
	var rowCount=0;
	
	for(var key in chartData){
		chartData[key].element=key;
		max=Math.max(max,chartData[key][kpiKey]*scale);
		if(chartData[key][kpiKey]!=0){
			arr.push(chartData[key]);
		}
	}
	arr=this.sortSAEGW(arr);
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var type1="";
		var value1="";
		var type2="";
		var value2="";
		var origin1="";
		var origin2="";
		
		if(record.element!=null&&record[kpiKey]!=null){
			type1=record.element;
			origin1=record.originElement;
			value1=(record[kpiKey]*scale).toFixed(percise);
		}
		
		i=i+1;
		if(i<arr.length){
			record=arr[i];
			if(record.element!=null&&record[kpiKey]!=null){
				type2=record.element;
				origin2=record.originElement;
				value2=(record[kpiKey]*scale).toFixed(percise);
			}
		}
		var tableRecord={
				type1:type1,
				origin1:origin1,
				value1:value1,
				type2:type2,
				origin2:origin2,
				value2:value2,
				kpi:kpiKey,
				max:max
			};
		this.grid.jqGrid('addRowData', ++rowCount, tableRecord);
	}
	
};

/** 
 * 处理ENB厂商数据 再请求厂商对应地市数据
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerENBV=function(chartData){
	for(var key in chartData){
		if(this.isEnbVendorKey(key)){//就取三个厂商
			chartData[key].element=key;
			this.vendorMapData[key]=chartData[key];
		}
	}
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getENBVendorCityRatesRecord({time:this.requestTime},this.dataHandlerENBVendorCity.bind(this),this.failHandler.bind(this));
};

P2PScreen.MultiTypeDeviceKpiTable.prototype.isEnbVendorKey=function(key){
	return key=="华为"||key=="诺西";
};
P2PScreen.MultiTypeDeviceKpiTable.prototype.isVendorKey=function(key){
	return key=="华为"||key=="诺西"||key=="爱立信";
};
/** 
 * 根据sortType排序
 * @protected
 * @function 
 * @param {Array} arr 
 * @returns {Array} 排序后的数组
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.sortArrBySortType=function(arr,sortKey){
	if(this.sortType=="默认"){
	}else if(this.sortType=="升序"){
		arr=arr.sort(function(a,b){return a[sortKey]-b[sortKey];});
	}else if(this.sortType=="降序"){
		arr=arr.sort(function(a,b){return b[sortKey]-a[sortKey];});//降序
	}
	return arr;
};
/** 
 * 处理ENB厂商-地市数据 与vendorMapData整合成表格
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerENBVendorCity=function(chartData){
	var kpiKey=this.config.kpiKey;
	var kpiInfo=SUtils.getKpiInfo(kpiKey,true);
	var scale=kpiInfo.fact;
	var percise=kpiKey.indexOf("成功率")==-1?0:2;//kpiInfo.percise;
	
	var arr=[];
	var i=0;
	var max=0;
	var result=chartData;
	var rowCount=0;
	
	for(var vendor in result){
		if(this.isEnbVendorKey(vendor)){
			var cityResult=result[vendor];
			for(var city in cityResult){
				if(city!=LSMConsts.provinceName&&city!=LSMConsts.unknown){
					var cityRecord=cityResult[city];
					cityRecord.element=city;
					cityRecord.vendor=vendor;
					max=Math.max(max,cityResult[city][kpiKey]*scale);
					if(cityResult[city][kpiKey]!=0){
						arr.push(cityRecord);
					}
				}
			}
		}
	}
	max=Math.max(max,this.vendorMapData["华为"][kpiKey]*scale);
	max=Math.max(max,this.vendorMapData["诺西"][kpiKey]*scale);
//	max=Math.max(max,this.vendorMapData["贝尔"][kpiKey]*scale);
	arr=this.sortENBCity(arr,this.vendorMapData);
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var type1=record.element.replace("分公司","");
		var value1=(record[kpiKey]*scale).toFixed(percise);
		var type2="";
		var value2="";
		i=i+1;
		if(i<arr.length){
			record=arr[i];
			if(record!=null&&record.element!=null){
				type2=record.element.replace("分公司","");
				value2=(record[kpiKey]*scale).toFixed(percise);
				maxValue=record.max*scale;
			}else{
				type2="";
				value2="";
				maxValue=0;
			}
		}
		var tableRecord={
				type1:type1,
				value1:value1,
				type2:type2,
				value2:value2,
				kpi:kpiKey,
				max:kpiKey.indexOf("成功率")==-1?max*scale:100
			};
		this.grid.jqGrid('addRowData', ++rowCount, tableRecord);
	}
	
	this.hideLoading();
};

/** 
 * 处理ENBIP数据(新) 厂商-地市-ENBIP
 * @protected
 * @function 
 * @param {Object} chartData 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerENPVendorCity=function(result){
	
	var kpiKey=this.config.kpiKey;
	var kpiInfo=SUtils.getKpiInfo(kpiKey,true);
	var scale=kpiInfo.fact;
	var percise=0;
	var max=0;
	
	var vendorKey="";
	var enbipKey="";
	var cityKey="";
	
	var rows=[];
	var rowIndexMap={};
	
	var colNames=[];
	var colModel=[];
	var groupHeaders=[];
	var colWidth=this.colWidth;
	
	for(vendorKey in result){
		if(vendorKey=="time") continue;
		var vendorCityMap={};
		var vendorRecord=result[vendorKey];
		var colCount=0;
		var startColName=null;
		for(enbipKey in vendorRecord){
			var enbipRecord=vendorRecord[enbipKey];
			for(cityKey in enbipRecord){
				var cityRecord=enbipRecord[cityKey];
				if(cityKey!=LSMConsts.provinceName&&cityKey!=LSMConsts.unknown){
					if(rowIndexMap[enbipKey]==null){
						rowIndexMap[enbipKey]=rows.length;
						rows.push({});
					}
					var citySimple=cityKey.replace("分公司","");
					var value=(cityRecord[kpiKey]*scale).toFixed(percise);
					var colKey=vendorKey+"_"+cityKey;
					max=Math.max(max,value);
					if(citySimple=="浦东"&&enbipKey.indexOf("东区")!=-1){
						rows[rowIndexMap[enbipKey]][colKey]=enbipKey+"_"+value;
					}else if(enbipKey.indexOf(citySimple)==-1){
						rows[rowIndexMap[enbipKey]][colKey]="";
					}else{
						rows[rowIndexMap[enbipKey]][colKey]=enbipKey+"_"+value;
					}
					if(vendorCityMap[cityKey]==null){
						if(startColName==null){
							startColName=colKey;
						}
						vendorCityMap[cityKey]=true;
						colNames.push(citySimple);
						colModel.push({name : colKey,index : colKey,width : colWidth});
						colCount++;
					}
				}
				
			}
		}
		groupHeaders.push({align:'center',startColumnName:startColName, numberOfColumns:colCount, titleText: vendorKey});
	}
	colNames.push("max");
	colModel.push({name : "max",index : "max",width : colWidth,hidden:true});
	this.initJqGrid(colNames,colModel,groupHeaders);
	var id=this.tableUID;
	$("#gbox_"+id).find(".ui-th-ltr").css("border-right","solid 1px #333333");
	$("#gbox_"+id).find(".jqg-second-row-header").find(".ui-th-ltr").css("border-bottom","solid 1px #333333");
	$("#gbox_"+id).find(".ui-th-ltr").css("text-align","center");
	
	//去除数据行中的空值单元格
	var validColRowMap={};
	var finalResult=[];
	for(var i=0;i<rows.length;i++){
		var record=rows[i];
		for(var key in record){
			if(record[key]!=null&&record[key]!=""){
				if(validColRowMap[key]==null){
					validColRowMap[key]=0;
				}
				var index=validColRowMap[key];
				if(index==finalResult.length){
					finalResult.push({max:max});
				}
				finalResult[index][key]=record[key];
				validColRowMap[key]++;
			}
		}
	}
	
	
	this.grid[0].addJSONData(finalResult);
	
	this.hideLoading();
};
/** 
 * 处理ENBIP数据
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerENPIp=function(result){
	
	var kpiKey=this.config.kpiKey;
	var kpiInfo=SUtils.getKpiInfo(kpiKey,true);
	var scale=kpiInfo.fact;
	var percise=0;
	var arr=[];
	var i=0;
	var max=0;
	var rowCount=0;
	for(var key in result){
		result[key].element=key;
		max=Math.max(max,result[key][kpiKey]*scale);
		if(result[key][kpiKey]!=0){
			arr.push(result[key]);
		}
	}
	arr=this.sortArrBySortType(arr, kpiKey);
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var type1=record.element;
		var value1=(record[kpiKey]*scale).toFixed(percise);
		var type2="";
		var value2="";
		i=i+1;
		if(i<arr.length){
			record=arr[i];
			type2=record.element;
			value2=(record[kpiKey]*scale).toFixed(percise);
		}
		
		var tableRecord={
				type1:type1,
				value1:value1,
				type2:type2,
				value2:value2,
				kpi:kpiKey,
				max:max
			};
		this.grid.jqGrid('addRowData', ++rowCount, tableRecord);
	}
	this.hideLoading();
};


/** 
 * 处理地市分ENBIP统计数据
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerCityENBIp=function(result){
	
	var kpiKey=this.config.kpiKey;
	var kpiInfo=SUtils.getKpiInfo(kpiKey,true);
	var scale=kpiInfo.fact;
	var percise=0;
	var arr=[];
	var i=0;
	var max=0;
	var rowCount=0;
	result=result[this.config.sd];
	for(var key in result){
		result[key].element=key;
		max=Math.max(max,result[key][kpiKey]*scale);
		if(result[key][kpiKey]!=0){
			arr.push(result[key]);
		}
	}
	arr=this.sortArrBySortType(arr, kpiKey);arr=this.sortArrBySortType(arr, kpiKey);
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var type1=record.element;
		var value1=(record[kpiKey]*scale).toFixed(percise);
		var type2="";
		var value2="";
		i=i+1;
		if(i<arr.length){
			record=arr[i];
			type2=record.element;
			value2=(record[kpiKey]*scale).toFixed(percise);
		}
		
		var tableRecord={
				type1:type1,
				value1:value1,
				type2:type2,
				value2:value2,
				kpi:kpiKey,
				max:max
			};
		this.grid.jqGrid('addRowData', ++rowCount, tableRecord);
	}
	this.hideLoading();
};


/** 
 * 处理地市速率数据
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerCity=function(result){
	
	var kpiKey=this.config.kpiKey;
	var kpiInfo=SUtils.getKpiInfo(kpiKey,true);
	var scale=kpiInfo.fact;
	var percise=0;
	var arr=[];
	var i=0;
	var max=0;
	var rowCount=0;
	for(var key in result){
		if(key.indexOf("分公司")!=-1){
			result[key].element=key.replace("分公司","");
			max=Math.max(max,result[key][kpiKey]*scale);
			if(result[key][kpiKey]!=0){
				arr.push(result[key]);
			}
		}
	}
	arr=this.sortCity(arr);
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var type1=record.element;
		var value1=(record[kpiKey]*scale).toFixed(percise);
		var type2="";
		var value2="";
		i=i+1;
		if(i<arr.length){
			record=arr[i];
			type2=record.element;
			value2=(record[kpiKey]*scale).toFixed(percise);
		}
		
		var tableRecord={
				type1:type1,
				value1:value1,
				type2:type2,
				value2:value2,
				kpi:kpiKey,
				max:max
			};
		this.grid.jqGrid('addRowData', ++rowCount, tableRecord);
	}
	this.hideLoading();
};

/** 
 * 根据输入的热点名称模糊匹配热点
 * @public
 * @function 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.queryHotspotName=function (time){
	var dm=LSMScreen.DataManager.getInstance();
	var text=$(this.hotspotNameInput).val();
	if(text==""){
		dm.getHotspotRatesRecord({time:time},this.dataHandlerHotspot.bind(this),this.failHandler.bind(this));
	}else{
		dm.getHotspotNameMatch({match:".*"+text+".*"},this.hotspotNamesHandler.bind(this),this.failHandler.bind(this));
	}
};

P2PScreen.MultiTypeDeviceKpiTable.prototype.hotspotNamesHandler=function (result){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getHotspotRatesRecordByNames({time:this.requestTime,hotspots:result},this.hotspotNamesDataHandler.bind(this),this.failHandler.bind(this));
};
P2PScreen.MultiTypeDeviceKpiTable.prototype.hotspotNamesDataHandler=function (result){
	var kpiKey=this.config.kpiKey;
	var arr=[];
	for(var key in result){
		result[key].hotspot=key;
		arr.push(result[key]);
	}
	
	
	var i=0;
	var rowCount=0;
	var max=0;
	for(i=0;i<arr.length;i++){
		max=Math.max(max,arr[i][kpiKey]);
	}
	arr=this.sortArrBySortType(arr, kpiKey);
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var type1=record.hotspot;
		var value1=(record[kpiKey]).toFixed(2);
		var type2="";
		var value2="";
		i=i+1;
		if(i<arr.length){
			record=arr[i];
			type2=record.hotspot;
			value2=(record[kpiKey]).toFixed(2);
		}
		
		var tableRecord={
				type1:type1,
				value1:value1,
				type2:type2,
				value2:value2,
				kpi:kpiKey,
				max:max
			};
		this.grid.jqGrid('addRowData', ++rowCount, tableRecord);
	}
	this.hideLoading();
};
/** 
 * 处理热点速率数据
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerHotspot=function(result){
	
	var kpiKey=this.config.kpiKey;
	var kpiInfo=SUtils.getKpiInfo(kpiKey,true);
	var scale=kpiInfo.fact;
	var percise=0;
	
	var arr=result;
	var i=0;
	var max=0;
	var rowCount=0;
	arr=this.sortArrBySortType(arr, kpiKey);
	for(i=0;i<arr.length;i++){
		max=Math.max(max,arr[i][kpiKey]*scale);
	}
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var type1=record.hotspot;
		var value1=(record[kpiKey]*scale).toFixed(percise);
		var type2="";
		var value2="";
		i=i+1;
		if(i<arr.length){
			record=arr[i];
			type2=record.hotspot;
			value2=(record[kpiKey]*scale).toFixed(percise);
		}
		
		var tableRecord={
				type1:type1,
				value1:value1,
				type2:type2,
				value2:value2,
				kpi:kpiKey,
				max:max
			};
		this.grid.jqGrid('addRowData', ++rowCount, tableRecord);
	}
	this.hideLoading();
};

/** 
 * 缓存MMEGROUP数据 请求MME数据
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerMMEGroupSucc=function(result){
	for(var key in result){
		if(key=="爱立信"||key=="诺西"){
			var record=result[key];
			record.element=key;
			this.poolData.push(record);
		}
	}
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMMESuccRecord({time:this.requestTime},this.dataHandlerMMESucc.bind(this),this.failHandler.bind(this));
	
	
};

/** 
 * 处理MME数据
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerMMESucc=function(result){
	var kpiKey=this.config.kpiKey;
	var arr=result;
	var i=0;
	var rowCount=0;
	for(i=0;i<this.poolData.length;i++){
		arr.unshift(this.poolData[i]);
	}
	arr=this.sortMME(arr);
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var origin1=record.originElement;
		var type1=record.element;
		var value1=(record[kpiKey]*100).toFixed(2);
		var origin2="";
		var type2="";
		var value2="";
		i=i+1;
		if(i<arr.length){
			record=arr[i];
			origin2=record.originElement;
			type2=record.element;
			value2=(record[kpiKey]*100).toFixed(2);
		}
		
		var tableRecord={
				origin1:origin1,
				type1:type1,
				value1:value1,
				origin2:origin2,
				type2:type2,
				value2:value2,
				kpi:kpiKey,
				max:100
			};
		this.grid.jqGrid('addRowData', ++rowCount, tableRecord);
		
	}
	this.hideLoading();
};

/** 
 * ENB-IP成功率数据
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerENBIPSucc=function(result){
	var kpiKey=this.config.kpiKey;
	var arr=[];
	var i=0;
	var rowCount=0;
	var max=0;
	for(var key in result){
		result[key].element=key;
		result[key][kpiKey]=result[key][kpiKey]*100;
		max=Math.max(max,result[key][kpiKey]);
		if(result[key][kpiKey]!=0){
			arr.push(result[key]);
		}
	}
	arr=this.sortArrBySortType(arr, kpiKey);
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var type1=record.element;
		var value1=(record[kpiKey]).toFixed(2);
		var type2="";
		var value2="";
		i=i+1;
		if(i<arr.length){
			record=arr[i];
			type2=record.element;
			value2=(record[kpiKey]).toFixed(2);
		}
		
		var tableRecord={
				type1:type1,
				value1:value1,
				type2:type2,
				value2:value2,
				kpi:kpiKey,
				max:100
			};
		this.grid.jqGrid('addRowData', ++rowCount, tableRecord);
	}
	this.hideLoading();
};

/** 
 * ENB-厂商成功率数据
 * @protected
 * @function 
 * @param {Object} chartData 
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
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.dataHandlerENBVendorSucc=function(chartData){
	for(var key in chartData){
		if(this.isEnbVendorKey(key)){//就取三个厂商
			chartData[key].element=key;
			this.vendorMapData[key]=chartData[key];
		}
	}
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getENBVendorCityRatesRecord({time:this.requestTime},this.dataHandlerENBVendorCity.bind(this),this.failHandler.bind(this));

};



P2PScreen.MultiTypeDeviceKpiTable.prototype.sortMME=function(arr){
	var kpiKey=this.config.kpiKey;
	var result=[];
	var sortArr1=[];
	var sortArr2=[];
	var i=0;
	var translateMap={
			"MME03":"MME03-PD",
			"MME04":"MME04-QZ",
			"MME05":"MME05-QZ",
			"MME06":"MME06-QZ",
			"MME07":"MME07-QZ",
			"MME08":"MME08-PD",
			"MME09":"MME09-PD",
			"MME10":"MME10-PD",
			"MME11":"MME11-QZ",
			"MME12":"MME12-QZ",
			"MME13":"MME13-PD",
			"MME14":"MME14-PD",
			"MME15":"MME15-PD",
			"MME16":"MME16-QZ"
		};
	var nokiaMap={
			"MME03":true,
			"MME04":true,
			"MME05":true,
			"MME06":true,
			"MME07":true,
			"MME08":true,
			"MME09":true,
			"MME10":true
		};
			
	var erricssonMap={
			"MME11":true,
			"MME12":true,
			"MME13":true,
			"MME14":true,
			"MME15":true,
			"MME16":true
		};
	var transName="";
	var vendorER={};
	var vendorNK={};
	for(i=0;i<arr.length;i++){
		var sortRecord=arr[i];
		var key=sortRecord.element;
		sortRecord.originElement=key;
		if(key=="爱立信"){
			vendorER=sortRecord;
//			sortArr1.push(sortRecord);
		}else if(key=="诺西"){
			vendorNK=sortRecord;
//			sortArr2.push(sortRecord);
		}else if(erricssonMap[key]){
			transName=translateMap[sortRecord.element];
			sortRecord.element=transName;
			sortRecord.element2=this.getReverseTransName(transName);
			sortArr1.push(sortRecord);
		}else if(nokiaMap[key]){
			transName=translateMap[sortRecord.element];
			sortRecord.element=transName;
			sortRecord.element2=this.getReverseTransName(transName);
			sortArr2.push(sortRecord);
		}
	}
	
	sortArr1=this.sortArrBySortType(sortArr1, kpiKey);
	sortArr2=this.sortArrBySortType(sortArr2, kpiKey);
	
	sortArr1.unshift(vendorER);
	sortArr2.unshift(vendorNK);
	var max=Math.max(sortArr1.length,sortArr2.length);
	for(i=0;i<max;i++){
		if(i<sortArr2.length){
			result.push(sortArr2[i]);
		}else{
			result.push({});
		}
		
		if(i<sortArr1.length){
			result.push(sortArr1[i]);
		}else{
			result.push({});
		}
	}
	
	return result;
};

/** 
 * MME名称置换
 * @protected
 * @function 
 * @param {String} transName 原始数据 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.getReverseTransName=function(transName){
	var result=transName;
	if(transName!=null){
		var transTmp=[];
		transTmp=transName.split("-");
		if(transTmp.length>1){
			result=transTmp[1]+transTmp[0];
		}
	}
	return result;
};

/** 
 * 为地市速率的数据排序(客户要求的特殊排序 变态)
 * @protected
 * @function 
 * @param {Object} arr 原始数据 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.sortCity=function(arr){
	var kpiKey=this.config.kpiKey;
	var result=[];
	var posMap={
			"浦东":0,
			"嘉定":1,
			"南区":2,
			"宝山":3,
			"西区":4,
			"青浦":5,
			"北区":6,
			"奉贤":7,
			"闵行":8,
			"金山":9,
			"松江":10,
			"崇明":11
		};
	var i=0;
	for(i=0;i<arr.length;i++){
		result.push({});
	}
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var city=record.element;
		var pos=posMap[city];
		if(pos<result.length){
			result[pos]=record;
		}
	}
	result=this.sortArrBySortType(result, kpiKey);
	return result;
};

/** 
 * 为ENB-VENDOR的数据排序(客户要求的特殊排序 变态)
 * @protected
 * @function 
 * @param {Object} arr 原始数据 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.sortENBCity=function(arr,vendors){
	var kpiKey=this.config.kpiKey;
	var result=[];
	var sortArr1=[];
	var sortArr2=[];
	var sortArr3=[];
//	var sortIndex=0;
	var i=0;
	var maxValue=0;
	var sortRecord={};
	for(i=0;i<arr.length;i++){
		sortRecord=arr[i];
		maxValue=Math.max(maxValue,sortRecord[kpiKey]);
	}
	maxValue=Math.max(maxValue,vendors["华为"][kpiKey]);
	maxValue=Math.max(maxValue,vendors["诺西"][kpiKey]);
//	maxValue=Math.max(maxValue,vendors["贝尔"][kpiKey]);
	vendors["华为"].max=maxValue;
	vendors["诺西"].max=maxValue;
//	vendors["贝尔"].max=maxValue;
	for(i=0;i<arr.length;i++){
		sortRecord=arr[i];
		var key=sortRecord.vendor;
		sortRecord.max=maxValue;
		if(key=="华为"){
			sortArr1.push(sortRecord);
		}else if(key=="诺西"){
			sortArr2.push(sortRecord);
		}else if(key=="贝尔"){
			sortArr3.push(sortRecord);
		}
	}
	sortArr1=this.sortArrBySortType(sortArr1, kpiKey);
	sortArr2=this.sortArrBySortType(sortArr2, kpiKey);
	sortArr3=this.sortArrBySortType(sortArr3, kpiKey);
	
	sortArr1.unshift(vendors["华为"]);
	sortArr2.unshift(vendors["诺西"]);
//	sortArr3.unshift(vendors["贝尔"]);
	
	
	
	
	var max=Math.max(sortArr1.length,sortArr2.length,sortArr3.length);
	var min=Math.min(sortArr1.length,sortArr2.length,sortArr3.length);
	
	var maxArr=[];
	var midArr=[];
	var minArr=[];
	var arrMap={};
	if(sortArr1.length==max){
		maxArr=sortArr1;
		arrMap["sortArr1"]=true;
	}else if(sortArr2.length==max){
		maxArr=sortArr2;
		arrMap["sortArr2"]=true;
	}else if(sortArr3.length==max){
		maxArr=sortArr3;
		arrMap["sortArr3"]=true;
	}
	
	if(sortArr1.length==min&&arrMap["sortArr1"]==null){
		minArr=sortArr1;
		arrMap["sortArr1"]=true;
	}else if(sortArr2.length==min&&arrMap["sortArr2"]==null){
		minArr=sortArr2;
		arrMap["sortArr2"]=true;
	}else if(sortArr3.length==min&&arrMap["sortArr3"]==null){
		minArr=sortArr3;
		arrMap["sortArr3"]=true;
	}
	
	if(arrMap["sortArr1"]==null){
		midArr=sortArr1;
	}else if(arrMap["sortArr2"]==null){
		midArr=sortArr2;
	}if(arrMap["sortArr3"]==null){
		midArr=sortArr3;
	}
//	var all=minArr.length+midArr.length+maxArr.length;
	var tmp=[];
	for(i=0;i<maxArr.length;i++){
		tmp.push(maxArr[i]);
	}
	for(i=0;i<midArr.length;i++){
		tmp.push(midArr[i]);
	}
	for(i=0;i<minArr.length;i++){
		tmp.push(minArr[i]);
	}
	var singleRowCount=10;
	for(i=0;i<tmp.length&&i<singleRowCount*2;i++){
		if(i<singleRowCount){
			result.push(tmp[i]);
			result.push(null);
		}else{
			result[(i-singleRowCount)*2+1]=tmp[i];
		}
	}
	return result;
};

/** 
 * 为SAEGW的数据排序(客户要求的特殊排序 变态)
 * @protected
 * @function 
 * @param {Object} arr 原始数据 
 */
P2PScreen.MultiTypeDeviceKpiTable.prototype.sortSAEGW=function(arr){
	var kpiKey=this.config.kpiKey;
	var result=[];
	var i=0;
	var translateMap=SAEGWNameTranslateMap={//特殊规则名称转换
			"SHSAEGW03BNK":"SGW03-QZ",
			"SHSAEGW04BNK":"SGW04-PD",
			"SHSAEGW05BNK":"SGW05-PD",
			"SHSAEGW06BNK":"SGW06-PD",
			"SHSAEGW07BNK":"SGW07-PD",
			"SHSAEGW08BNK":"SGW08-PD",
			"SHSAEGW09BNK":"SGW09-PD",
			"SHSAEGW10BNK":"SGW10-QZ",
			"SHSAEGW11BNK":"SGW11-QZ",
			"SHSAEGW12BNK":"SGW12-QZ",
			"SHSAEGW13BER":"SGW13-QZ",
			"SHSAEGW14BER":"SGW14-QZ",
			"SHSAEGW15BER":"SGW15-QZ",
			"SHSAEGW16BER":"SGW16-PD",
			"SHSAEGW17BER":"SGW17-PD",
			"SHSAEGW18BER":"SGW18-PD",
			"SHSAEGW19BER":"SGW19-PD",
			"SHSAEGW20BER":"SGW20-PD",
			"SHSAEGW21BER":"SGW21-QZ",
			"SHSAEGW22BER":"SGW22-QZ"
	};
	var posMap={//特殊规则 位置转换
			"SHSAEGW03BNK":12,
			"SHSAEGW04BNK":0,
			"SHSAEGW05BNK":2,
			"SHSAEGW06BNK":4,
			"SHSAEGW07BNK":6,
			"SHSAEGW08BNK":8,
			"SHSAEGW09BNK":10,
			"SHSAEGW10BNK":14,
			"SHSAEGW11BNK":16,
			"SHSAEGW12BNK":18,
			"SHSAEGW13BER":11,
			"SHSAEGW14BER":13,
			"SHSAEGW15BER":15,
			"SHSAEGW16BER":1,
			"SHSAEGW17BER":3,
			"SHSAEGW18BER":5,
			"SHSAEGW19BER":7,
			"SHSAEGW20BER":9,
			"SHSAEGW21BER":17,
			"SHSAEGW22BER":19
		};
	var sortArr1=[];
	var sortArr2=[];
	var total1=0;
	var total2=0;
	var avgRecord1={element:"诺西"};
	avgRecord1[kpiKey]=0;
	var avgRecord2={element:"爱立信"};
	avgRecord2[kpiKey]=0;
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var originElement=record.element;
		var newElement=translateMap[originElement];
		var pos=posMap[originElement];
		record.element=newElement;
		record.originElement=originElement;
		record.position=pos;
		if(pos%2==0){
			sortArr1.push(record);
			total1+=Number(record[kpiKey]);
		}else{
			sortArr2.push(record);
			total2+=Number(record[kpiKey]);
		}
	}
	sortArr1.sort(function(a,b){return a.position-b.position;});//按position 升序
	sortArr2.sort(function(a,b){return a.position-b.position;});//按position 升序
	if(sortArr1.length>0){
		avgRecord1[kpiKey]=total1/sortArr1.length;
	}
	if(sortArr2.length>0){
		avgRecord2[kpiKey]=total2/sortArr2.length;
	}
	
	sortArr1=this.sortArrBySortType(sortArr1, kpiKey);
	sortArr2=this.sortArrBySortType(sortArr2, kpiKey);
	
	result.push(avgRecord1);
	result.push(avgRecord2);
	var ilength=Math.max(sortArr1.length,sortArr2.length);
	for(i=0;i<ilength;i++){
		if(i<sortArr1.length){
			result.push(sortArr1[i]);
		}else{
			result.push({});
		}
		
		if(i<sortArr2.length){
			result.push(sortArr2[i]);
		}else{
			result.push({});
		}
	}
	this.hideLoading();
	return result;
};


/**
 * 附着成功率分地市电池图表
 * @class P2PScreen.AttachSuccCityBattery
 * @extends LSMScreen.ComponentBase
 * @classdesc 质差终端表格
 */
P2PScreen.AttachSuccCityBattery=function(){
	this.initialize.apply(this, arguments);
};
/** 从ComponentBase继承*/
P2PScreen.AttachSuccCityBattery.prototype=Object.create(LSMScreen.ComponentBase.prototype);
P2PScreen.AttachSuccCityBattery.prototype.constructor=P2PScreen.AttachSuccCityBattery;

/***
 * 外部点击处理方法
 * @type {Function} 参数 地市名称无分公司
 */
P2PScreen.AttachSuccCityBattery.prototype.cityClickHandler;
/***
 * 缓存数据 用于重绘
 */
P2PScreen.AttachSuccCityBattery.prototype.cacheData={};
/***
 * 导航条对象 LSMScreen.NavBar
 */
P2PScreen.AttachSuccCityBattery.prototype.nav=null;
/** 
 * 更新请求数据
 * @public
 * @function 
 * @param {Object} param html点击事件
 */
P2PScreen.AttachSuccCityBattery.prototype.cityClick=function (param){
	var city=$(param.currentTarget).attr("name");
	if(this.cityClickHandler){
		this.cityClickHandler(city);
	}
};

/** 
 * 更新请求数据
 * @public
 * @function 
 * @param {Boolean} showLoadMask 这次数据更新是否要呈现loadMask
 */
P2PScreen.AttachSuccCityBattery.prototype.update=function (showLoadMask){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getCityQualitySignalRecord({},this.dataHandler.bind(this),this.failHandler.bind(this));
};

P2PScreen.AttachSuccCityBattery.prototype.redraw=function (){
	this.dataHandler(this.cacheData);
};


/** 
 * 更新请求数据
 * @public
 * @function 
 * @param {Object} cityData 地市附着成功率数据
 * @example
 * {
 *		"上海市":{"4GE-RAB建立请求成功率":0.9990268,"4GE-RAB建立请求时延":61.523624....},
 *		"崇明分公司":{"4GE-RAB建立请求成功率":0.9990268,"4GE-RAB建立请求时延":61.523624....},
 * .....
 * }
 */
P2PScreen.AttachSuccCityBattery.prototype.dataHandler=function (chartData){
	this.cacheData=chartData;
	var dom=this.contentDom;
	dom.innerHTML="";//清空原内容
	
	var parentWidth=$(dom).width();
	var parentHeight=$(dom).height();
	
	var record={};
	var tmp=[];
	var kpiKey="4G附着成功率";
	for(var key in chartData){
		if(key=="unknown"||key=="上海市"){//排除全市和unknown
			continue;
		}
		record=chartData[key];
		record.region=key.replace("分公司","");//呈现名称不需要分公司
		record.value=(record[kpiKey]*100).toFixed(2);
		tmp.push(record);
	}
	var table=document.createElement("table");
	$(table).width("100%");
	
	if(tmp.length>0){
		tmp.sort(function(a,b){return b.value-a.value;});//按value 降序
		
		var blockCount=20;//绿块总数
		var baseRowHeight=35;
		
		var rankWidth=parentWidth*0.05;
		var regionWidth=parentWidth*0.1;
		var valueWidth=parentWidth*0.15;
		var totalBlockWidth=parentWidth*0.7;
		var singleBlockWidth=totalBlockWidth/blockCount;
		var blockValueCount=100/blockCount;//一格表示多少数值
		var blockHeight=singleBlockWidth;
		var rowHeight=parentHeight==0?baseRowHeight:parentHeight/tmp.length;
		
		for(var i=0;i<tmp.length;i++){
			record=tmp[i];
			
			var region=record.region;
			var value=record.value;
			var rank=i+1;
			
			var rowDiv=document.createElement("td");
			var rankSpan=document.createElement("div");
			var regionSpan=document.createElement("div");
			
			$(rowDiv).height(rowHeight);
			$(rowDiv).width(parentWidth);
			$(rowDiv).addClass("batteryRow");
			$(rowDiv).css("cursor","pointer");
			$(rowDiv).attr("name",region);
			$(rowDiv).on("click",this.cityClick.bind(this));
			
			$(rankSpan).width(rankWidth);
			$(regionSpan).width(regionWidth);
			
			rankSpan.innerText=rank;
			regionSpan.innerText=region;
			
			rowDiv.appendChild(rankSpan);
			rowDiv.appendChild(regionSpan);
			
			
			for(var j=0;j<blockCount;j++){
				var currentBlockStartValue=(j)*blockValueCount;
				var currentBlockEndValue=(j+1)*blockValueCount;
				var blockSpan=document.createElement("div");
				
				if(value>currentBlockEndValue){
					$(blockSpan).addClass("batteryFull");
				}else if(value>currentBlockStartValue&&value<currentBlockEndValue){
					var subBlock=document.createElement("div");
					var subWidth=(value-currentBlockStartValue)/blockValueCount*singleBlockWidth;//单格差值百分比
					$(blockSpan).addClass("batteryEmpty");
					$(subBlock).addClass("batteryFull");
					$(subBlock).width(subWidth);
					$(subBlock).height(blockHeight);
					blockSpan.appendChild(subBlock);
				}else{
					$(blockSpan).addClass("batteryEmpty");
				}
				$(blockSpan).width(singleBlockWidth-1);
				$(blockSpan).height(blockHeight);
				$(blockSpan).css("margin-left","1px");
				rowDiv.appendChild(blockSpan);
			}
			
			var valueSpan=document.createElement("div");
			$(valueSpan).width(valueWidth);
			$(valueSpan).addClass("batteryValue");
			valueSpan.innerText=value+"%";
			rowDiv.appendChild(valueSpan);
			$(rowDiv).find("div").css("float","left");
			var tr=document.createElement("tr");
			tr.appendChild(rowDiv);
			
			
			table.appendChild(tr);
		}
		dom.appendChild(table);
	}
};


/**
 * 左下角附着成功率 导航栏+分地市电池图表+设备类型指标
 * @class P2PScreen.AttachSuccCityBattery
 * @extends LSMScreen.ComponentBase
 * @classdesc 质差终端表格
 */
P2PScreen.AttachSuccCityAndDevice=function(){
	this.initialize.apply(this, arguments);
};
/** 从ComponentBase继承*/
P2PScreen.AttachSuccCityAndDevice.prototype=Object.create(LSMScreen.ComponentBase.prototype);
P2PScreen.AttachSuccCityAndDevice.prototype.constructor=P2PScreen.AttachSuccCityAndDevice;

/** 
 * 构造方法 
 * require部分的配置只在这里执行
 * @protected
 * @function 
 * @param {Object} dom 包含需要绘制图表的节点的外层div节点
 * @param {Object} [base_config] 配置项(可选)  P2PScreen.MultiTypeDeviceKpiTable.config
 */
P2PScreen.AttachSuccCityAndDevice.prototype.initialize=function (dom,base_config){
	/** 调用父类构造方法用来构造loadMask */
	Object.create(P2PScreen.AttachSuccCityAndDevice.prototype.__proto__).initialize.apply(this, arguments);
	this.createComponent();
};
/** 
 * 创建组件内容
 * @public
 * @type {String} 上次选中的导航栏
 */
P2PScreen.AttachSuccCityAndDevice.prototype.lastType="地市";

P2PScreen.AttachSuccCityAndDevice.prototype.batteryDom=null;
P2PScreen.AttachSuccCityAndDevice.prototype.deviceDom=null;

P2PScreen.AttachSuccCityAndDevice.prototype.originWidth=0;
P2PScreen.AttachSuccCityAndDevice.prototype.originHeight=0;


/** 
 * 最大化最小化时改变组件大小
 * @public
 * @function 
 */
P2PScreen.AttachSuccCityAndDevice.prototype.doResize=function (){
	
	if(this.isMaximized){
		this.originWidth=$(this.batteryDom).width();
		this.originHeight=$(this.batteryDom).height();
		
		this.nav.setWidth($(this.contentDom).width());
		
		$(this.batteryDom).width($(this.contentDom).width()-30);
		$(this.batteryDom).height($(this.contentDom).height()-50);
		
		$(this.deviceDom).width($(this.contentDom).width());
		$(this.deviceDom).height($(this.contentDom).height());
	}else{
		$(this.batteryDom).width(this.originWidth);
		$(this.batteryDom).height(this.originHeight);
		
		$(this.deviceDom).width(this.originWidth);
		$(this.deviceDom).height(this.originHeight);
		
		
		this.nav.setWidth(this.originWidth);
	}
	this.battery.redraw();
	this.device.redraw();
	
};
/** 
 * 创建组件内容
 * @public
 * @function 
 */
P2PScreen.AttachSuccCityAndDevice.prototype.createComponent=function (){
	var dom=this.contentDom;
	$(dom).width($(this.parentDom).width());
	$(dom).height($(this.parentDom).height());
	
	var batteryDom=document.createElement("div");
	var deviceDom=document.createElement("div");
	
	this.batteryDom=batteryDom;
	this.deviceDom=deviceDom;
	
	this.nav=new LSMScreen.NavBar(["地市","设备"],0,$(dom).width(),this.navClick.bind(this));
	var nav_ul=(this.nav).navDom;
	var navHeight=$(nav_ul).height();
	
	$(batteryDom).width($(dom).width());
	$(batteryDom).height($(dom).height()-navHeight);
	
	$(deviceDom).width($(dom).width());
	$(deviceDom).height($(dom).height()-navHeight);
	$(deviceDom).css("display","none");
	
	dom.appendChild(nav_ul);
	dom.appendChild(batteryDom);
	dom.appendChild(deviceDom);
	
	/**
	 * 地市指标组件
	 * @private
	 * @type {P2PScreen.AttachSuccCityBattery} 
	 */
	this.battery=new P2PScreen.AttachSuccCityBattery(batteryDom);
	this.battery.cityClickHandler=this.cityClickHandler.bind(this);
	
	/**
	 * 设备指标组件
	 * @private
	 * @type {P2PScreen.MultiTypeDeviceKpiTable} 
	 */
	this.device=new P2PScreen.MultiTypeDeviceKpiTable(deviceDom,{
		deviceTypes:['MME','PTN汇聚环','ENB厂商'],
		navBarDirection:"bottom",
		kpiKey:"4G附着成功率",
		kpiShowName:"附着成功率",
		width:$(deviceDom).width(),
		height:$(deviceDom).height(),
		rowHeight:40
	});
	
	//导航条在顶部
	$(batteryDom).css("position","absolute");
	$(batteryDom).css("bottom","5px");
	
	$(deviceDom).css("position","absolute");
	$(deviceDom).css("bottom","5px");
	
};
/** 
 * 外部监听点击事件
 * @public
 * @function 
 * @param {String} param 选中的地市
 * @example
 * {
 * 	type:"city",//city mme enb
 *  name:""//名称
 * }
 */
P2PScreen.AttachSuccCityAndDevice.prototype.itemClickHandler=function (param){
	
};

/** 
 * 地市点击事件
 * @public
 * @function 
 * @param {String} city 选中的地市
 */
P2PScreen.AttachSuccCityAndDevice.prototype.cityClickHandler=function (city){
	this.itemClickHandler({type:"city",name:city});
};
/** 
 * 设备点击事件
 * @public
 * @function 
 * @param {String} type 设备类型
 * @param {String} device 设备名称
 */
P2PScreen.AttachSuccCityAndDevice.prototype.deviceClickHandler=function (type,device){
	this.itemClickHandler({type:type,name:device});
};
/** 
 * 导航条点击事件
 * @public
 * @function 
 * @param {String} type 选中的导航栏
 */
P2PScreen.AttachSuccCityAndDevice.prototype.navClick=function (type){
	this.lastType=type;
	switch(type){
		case "地市":
			$(this.battery.parentDom).css("display","block");
			$(this.device.parentDom).css("display","none");
			this.battery.redraw();
			break;
		case "设备":
			$(this.battery.parentDom).css("display","none");
			$(this.device.parentDom).css("display","block");
			this.device.redraw();
			break;
	}
};

/** 
 * 更新请求数据
 * @public
 * @function 
 * @param {Boolean} showLoadMask 这次数据更新是否要呈现loadMask
 */
P2PScreen.AttachSuccCityAndDevice.prototype.update=function (showLoadMask){
	this.battery.update(showLoadMask);
	this.device.update(showLoadMask);
};



/**
 * 热门应用散点图(js绘制)
 * @class P2PScreen.HotappScatter
 * @extends LSMScreen.ComponentBase
 * @classdesc 质差终端表格
 */
P2PScreen.HotappScatter=function(){
	this.initialize.apply(this, arguments);
};
/** 从ComponentBase继承*/
P2PScreen.HotappScatter.prototype=Object.create(LSMScreen.ComponentBase.prototype);
P2PScreen.HotappScatter.prototype.constructor=P2PScreen.HotappScatter;


P2PScreen.HotappScatter.prototype.config={
		appImgPath:"../../static/styles/local-lsm/app/",
		appSize:40,
		xKey:"4G流量",
		yKey:"4G下行速率500k",
		xName:"流量",
		yName:"速率",
		xDivider:LSMConsts.byteDivider*LSMConsts.byteDivider,
		yDivider:LSMConsts.byteDivider,
		xUnit:"GB",
		yUnit:"Mbps",
		xPrecise:2,
		yPrecise:2,
		xAxisWidth:800,
		yAxisHeight:270
		
};

/** 
 * app点击联动
 * @type {Function} html点击事件作为参数
 */

P2PScreen.HotappScatter.prototype.appClickHandler;

/** 
 * 构造方法 
 * require部分的配置只在这里执行
 * @protected
 * @function 
 * @param {Object} dom 包含需要绘制图表的节点的外层div节点
 * @param {Object} [_config] 配置项(可选)  P2PScreen.HotappScatter.config
 * @param {Object} [base_config] ComponentBase配置项(可选)  
 */
P2PScreen.HotappScatter.prototype.initialize=function (dom,_config,base_config){
	for(var key in _config){
		this.config[key]=_config[key];
	}
	/** 调用父类构造方法用来构造loadMask */
	Object.create(P2PScreen.HotappScatter.prototype.__proto__).initialize.apply(this, [dom,base_config]);
};


/** 
 * 更新请求数据
 * @public
 * @function 
 * @param {Boolean} showLoadMask 这次数据更新是否要呈现loadMask
 */
P2PScreen.HotappScatter.prototype.update=function (showLoadMask){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getAppRankByKpiAndMajor({},this.dataHandler.bind(this),this.failHandler.bind(this));
};

/** 
 * 处理数据 
 * @protected
 * @function 
 * @param {Array} chartDataArr
 * @example
 * [
 * 	{"总用户数":417822,"time":"2016-04-10 10:00:00","element":"微信"},
 * .....
 * ]
 */
P2PScreen.HotappScatter.prototype.dataHandler=function(chartDataArr){
	
	var dom=this.contentDom;
	dom.innerHTML="";
	
	
	//config配置
	var xKey=this.config.xKey;
	var yKey=this.config.yKey;
	var xPrecise=this.config.xPrecise;
	var yPrecise=this.config.yPrecise;
	var size=this.config.appSize;
	var xUnit=this.config.xUnit;
	var yUnit=this.config.yUnit;
	var xName=this.config.xName;
	var yName=this.config.yName;
	var xDivider=this.config.xDivider;
	var yDivider=this.config.yDivider;
	var xAxisWidth=this.config.xAxisWidth;
	var yAxisHeight=this.config.yAxisHeight;
	
	
	
	var chart=document.createElement("div");
	$(chart).width(xAxisWidth);
	$(chart).height(yAxisHeight);
	$(chart).addClass("customScatter");
	
	var minX=Number.POSITIVE_INFINITY;
	var maxX=0;
	
	var minY=Number.POSITIVE_INFINITY;
	var maxY=0;
	
//	var minAppName="";
	//记录最大最小值以便画图
	var i=0;
	var record={};
	var xValue=0;
	var yValue=0;
	var lastTime="";
	
	for(i=0;i<chartDataArr.length;i++){
		record=chartDataArr[i];
		xValue=record[xKey];
		yValue=record[yKey];
		lastTime=record.time;
//		if(yValue==0) continue; //屏蔽y值为0的数据
		
		if(minX>xValue){
			minX=xValue;
		}
		if(maxX<xValue){
			maxX=xValue;
		}
		
		if(minY>yValue){
			minY=yValue;
//			minAppName=record.element;//记录y值最差app(原本是联动使用 这里暂无)
		}
		if(maxY<yValue){
			maxY=yValue;
		}
		
	}
	if(lastTime!=""){
		this.setTime(lastTime.substring(11, 16));
	}
	
	for(i=0;i<chartDataArr.length;i++){
		
		record=chartDataArr[i];
		var appName=record["element"];
		xValue=record[xKey];
		yValue=record[yKey];
		if(yValue==0) continue;
		
		var deltaX=maxX-minX;
		var deltaY=maxY-minY;
		if(deltaX==0) deltaX=1;
		if(deltaY==0) deltaY=1;
		
//		var percentX:Number=(xValue-minX)/deltaX;//线性
		var percentX=(Math.log(xValue-minX+1)/Math.log(deltaX));//对数
		percentX=percentX*percentX*percentX;//幂指拉开距离
		var percentY=(yValue-minY)/deltaY;
		if(percentY<0) percentY=0;
		if(percentX==Number.NEGATIVE_INFINITY) percentX=0;
		
		var bc1=document.createElement("img");
		bc1.name=appName;
//		bc1.addEventListener(MouseEvent.CLICK,appClick);
		bc1.src=this.config.appImgPath+SUtils.getAppIconPath(appName);//"assets/images/performance/app/"+appName+".png";
		$(bc1).width(size);
		$(bc1).height(size);
		$(bc1).css("position","absolute");
		if(this.appClickHandler){
			$(bc1).on("click",this.appClickHandler);
		}
		
		var x=percentX*xAxisWidth;
		var y=percentY*yAxisHeight;
		if(x>=xAxisWidth-size){
			x=xAxisWidth-size;
		}
		if(y>=yAxisHeight-size){
			y=yAxisHeight-size;
		}
		$(bc1).css("left",x);
		$(bc1).css("bottom",y);
		
		var showXValue=(xValue/xDivider).toFixed(xPrecise);//ChartUtil.commaNum(xValue,xPrecise);
		var showYValue=(yValue/yDivider).toFixed(yPrecise);
		var tip=appName+"\n"+xName+":"+showXValue+xUnit+"\n"+yName+":"+showYValue+yUnit;
		$(bc1).attr("title",tip);
		$(bc1).attr("name",appName);
		
		chart.appendChild(bc1);
		
	}
	
	dom.appendChild(chart);
	var xAxisLabel=document.createElement("span");
	var yAxisLabel=document.createElement("span");
	xAxisLabel.innerText=xName;
	yAxisLabel.innerText=yName;
	
	$(xAxisLabel).css("position","absolute");
	$(xAxisLabel).css("left",xAxisWidth);
	$(xAxisLabel).css("bottom",5);
	$(xAxisLabel).css("font-size","16px");
	$(xAxisLabel).css("font-weight","bold");
	
	$(yAxisLabel).css("position","absolute");
	$(yAxisLabel).css("left",5);
	$(yAxisLabel).css("bottom",yAxisHeight+30);
	$(yAxisLabel).css("font-size","16px");
	$(yAxisLabel).css("font-weight","bold");
	
	dom.appendChild(xAxisLabel);
	dom.appendChild(yAxisLabel);
};



P2PScreen.SwfMap=function(){
	this.initialize.apply(this, arguments);
};
/** 从ComponentBase继承*/
P2PScreen.SwfMap.prototype=Object.create(LSMScreen.ComponentBase.prototype);
P2PScreen.SwfMap.prototype.constructor=P2PScreen.SwfMap;


/** 
 * 构造方法 
 * require部分的配置只在这里执行
 * @protected
 * @function 
 * @param {Object} dom 包含需要绘制图表的节点的外层div节点
 * @param {Object} [_config] 配置项(可选)  P2PScreen.MultiTypeDeviceKpiTable.config
 * @param {Object} [base_config] ComponentBase配置项(可选)  
 */
P2PScreen.SwfMap.prototype.initialize=function (dom){
	Object.create(P2PScreen.SwfMap.prototype.__proto__).initialize.apply(this, [dom]);
	this.contentDom.innerHTML='<iframe id="mapframe" style="width:625px;height:480px;" allowTransparency="true" frameborder="no" src="../../static/styles/local-lsm/MapJsInterface.html" ></iframe>';
};
///** 
// * 更新方法覆盖 暂不更新
// * @protected
// * @function 
// */
//P2PScreen.SwfMap.prototype.update=function (showLoading){
//	if(showLoading){
//		this.showLoading();
//	}
//	var format="yyyy-MM-dd hh:mm:ss";
//	this.requestTime=SUtils.getDiffDateTimeFromNow(-10,SUtils.TIME_TYPE.MIN,format);
//	var dm=LSMScreen.DataManager.getInstance();
//	dm.getCityQualitySignalRecord({time:this.requestTime},this.dataHandler.bind(this),this.failHandler.bind(this));
//};
///** 
// * 更新请求数据
// * @public
// * @function 
// * @param {Object} cityData 地市附着成功率数据
// * @example
// * {
// *		"上海市":{"4GE-RAB建立请求成功率":0.9990268,"4GE-RAB建立请求时延":61.523624....},
// *		"崇明分公司":{"4GE-RAB建立请求成功率":0.9990268,"4GE-RAB建立请求时延":61.523624....},
// * .....
// * }
// */
//P2PScreen.SwfMap.prototype.dataHandler=function (chartData){
//	var iframe=document.getElementById("mapframe");
//	if(iframe!=null){
//		var kpiKey="4G附着成功率";
//		for(var key in chartData){
//			if(key=="unknown"||key=="上海市"){//排除全市和unknown
//				continue;
//			}
//			var record=chartData[key];
//			var region=key.replace("分公司","");//呈现名称不需要分公司
//			var value=(record[kpiKey]*100).toFixed(2);
//			iframe.setValue(region,value);
//		}
//	}
//	var dm=LSMScreen.DataManager.getInstance();
//	dm.getMMEGroupSuccRecord({time:this.requestTime},this.dataHandlerMMEGroupSucc.bind(this),this.failHandler.bind(this));
//	
//};
//P2PScreen.SwfMap.prototype.dataHandlerMMEGroupSucc=function (chartData){
//	var iframe=document.getElementById("mapframe");
//	if(iframe!=null){
//		var kpiKey="4G附着成功率";
//		for(var key in result){
//			var record=result[key];
//			if(key=="爱立信"){
//				iframe.setValue("内环",(record[kpiKey]*100).toFixed(2));
//			}else if(key=="诺西"){
//				iframe.setValue("外环",(record[kpiKey]*100).toFixed(2));
//			}
//		}
//	}
//	this.hideLoading();
//};
//
//
//
//P2PScreen.SwfMap.prototype.shMapLoaded=function(){
//	this.update(true);
//};
/**
 * 告警流水窗
 */
P2PScreen.AlarmFlowWin=function(){
	this.initialize.apply(this, arguments);
};

P2PScreen.AlarmFlowWin.prototype.initialize=function(_config){
	this.heightFix=50;
	this.loadMask;
	this.config={
		title:"告警流水窗",
		width:1200,
		height:400,
		x:0,
		y:0,
		queryConfig:{}
	};
	if(_config!=null){
		for(var key in _config){
			this.config[key]=_config[key];
		}
	}
	
	this.grid;
	this.win=new LSMScreen.SimpleWindow({
		title:this.config.title,
		width:this.config.width,
		height:this.config.height,
		x:this.config.x,
		y:this.config.y,
		dbclickToMaximum:true,
		doResize:this.doResize.bind(this),
		maxParent:$(".ETE_left")[0]
	});
	this.createGrid();
};
P2PScreen.AlarmFlowWin.prototype.doResize=function(width,hegiht){
	this.grid.setGridWidth(width);
	this.grid.setGridHeight(hegiht-this.heightFix);
};
P2PScreen.AlarmFlowWin.prototype.createGrid=function(){
	var content=this.win.content;
	this.loadMask=new LSMScreen.LoadMask(content);
	var table=document.createElement("table");
	content.appendChild(table);
	var colWidth=120;
	this.grid=$(table).jqGrid({
        datatype : "json",
		colNames : [ '时间', '纬度', '纬度字段', '指标名', '指标值', '单位', '告警级别',
		             '组别', '告警类型(静态,动态)', '门限左值', '门限右值', '告警正文', 'STAT_TIME'],
        colModel : [ 
                     {name : 'TIME_STAMP',index : 'TIME_STAMP',width : colWidth}, 
                     {name : 'DS',index : 'DS',width : colWidth}, 
                     {name : 'DS_NAME',index : 'DS_NAME',width : colWidth}, 
                     {name : 'KPI_NAME',index : 'KPI_NAME',width : colWidth}, 
                     {name : 'KPI_VALUE',index : 'KPI_VALUE',width : colWidth}, 
                     {name : 'UNIT',index : 'UNIT',width : colWidth}, 
                     {name : 'ALARM_LEVEL',index : 'ALARM_LEVEL',width : colWidth}, 
                     {name : 'GROUP_TYPE',index : 'GROUP_TYPE',width : colWidth}, 
                     {name : 'ALARM_TYPE',index : 'ALARM_TYPE',width : colWidth}, 
                     {name : 'UPPER_LIMIT',index : 'UPPER_LIMIT',width : colWidth}, 
                     {name : 'FLOOR_LIMIT',index : 'FLOOR_LIMIT',width : colWidth}, 
                     {name : 'CONTENT',index : 'CONTENT',width : colWidth}, 
                     {name : 'STAT_TIME',index : 'STAT_TIME',width : colWidth}
                   ],
        loadui:'disable',
        height:this.config.height-this.win.config.titleHeight-this.heightFix,
        width:this.config.width,
        afterInsertRow:function(rowid,rowdata){
        	var level=rowdata.ALARM_LEVEL;
        	var tr=this.grid.find("tbody").find("tr")[rowid];
        	var td=$(tr).find("td")[6];
        	
        	var tdWidth=$(td).width();
        	if(level==1){
        		$(td).css('color','#ffffff');
        		$(td).css('background',LSMConsts.alarmColor1);
        		$(td).text('一级告警');
        	}else if(level==2){
        		$(td).css('color','#ffffff');
        		$(td).css('background',LSMConsts.alarmColor2);
        		$(td).text('二级告警');
        	}else if(level==3){
        		$(td).css('color','#000000');
        		$(td).css('background',LSMConsts.alarmColor3);
        		$(td).text('三级告警');
        	}else{
        		$(td).css('color','none');
        		$(td).css('background','none');
        		$(td).text(level);
        	}
        }.bind(this),
	});
	this.update();
};

P2PScreen.AlarmFlowWin.prototype.update=function(){
	this.loadMask.show();
	var dm=LSMScreen.DataManager.getInstance();
	dm.getAlarmFLow(this.config.queryConfig,this.dataHandler.bind(this));
};
P2PScreen.AlarmFlowWin.prototype.dataHandler=function(result){
	var rowCount=0;
	for(var i=0;i<result.length;i++){
		this.grid.jqGrid('addRowData', ++rowCount, result[i]);
	}
	this.grid.find("tr").removeClass("oddGrayTableRow");
	this.grid.find("tr:odd").addClass("oddGrayTableRow");
	this.loadMask.hide();
};


/**
 * 拨测告警钻取
 */
P2PScreen.AlarmDrillWin=function(){
	this.initialize.apply(this, arguments);
};

P2PScreen.AlarmDrillWin.prototype.initialize=function(_config){
	this.heightFix=50;
	this.loadMask;
	this.config={
		title:"告警列表",
		width:600,
		height:400,
		x:0,
		y:0,
		queryConfig:{}
		
	};
	
	if(_config!=null){
		for(var key in _config){
			this.config[key]=_config[key];
		}
	}
	
	this.grid;
	this.win=new LSMScreen.SimpleWindow({
		title:this.config.title,
		width:this.config.width,
		height:this.config.height,
		x:this.config.x,
		y:this.config.y
	}); 
	this.createGrid();
};

P2PScreen.AlarmDrillWin.prototype.createGrid=function(){
	var content=this.win.content;
	this.loadMask=new LSMScreen.LoadMask(content);
	var table=document.createElement("table");
	content.appendChild(table);
	var colWidth=120;
	this.grid=$(table).jqGrid({
        datatype : "json",
		colNames : [ '设备名称', '最高告警级别', '厂商', '告警数'],
        colModel : [ 
                     {name : 'device_name',index : 'device_name',width : colWidth}, 
                     {name : 'severity',index : 'severity',width : colWidth}, 
                     {name : 'device_vendor',index : 'device_vendor',width : colWidth}, 
                     {name : 'counts',index : 'counts',width : colWidth}
                   ],
        loadui:'disable',
        height:this.config.height-this.win.config.titleHeight-this.heightFix,
        width:this.config.width
	});
	this.update();
};

P2PScreen.AlarmDrillWin.prototype.update=function(){
	this.loadMask.show();
	var dm=LSMScreen.DataManager.getInstance();
	dm.getFaultRecords(this.config.queryConfig,this.dataHandler.bind(this));
};
P2PScreen.AlarmDrillWin.prototype.dataHandler=function(result){
	var rowCount=0;
	for(var i=0;i<result.length;i++){
		this.grid.jqGrid('addRowData', ++rowCount, result[i]);
	}
	this.grid.find("tr").removeClass("oddGrayTableRow");
	this.grid.find("tr:odd").addClass("oddGrayTableRow");
	this.loadMask.hide();
};


/**
 * 设备指标表格趋势图钻取
 */
P2PScreen.KPIDrillWin=function(){
	this.initialize.apply(this, arguments);
};

P2PScreen.KPIDrillWin.prototype.initialize=function(_config){
	this.loadMask;
	this.config={
		title:"指标钻取",
		width:600,
		height:400,
		x:0,
		y:0,
		deviceName:"",
		kpiKey:"",
		kpiName:"",
		kpiType:"",//quality rates bytes...
		deviceType:""
		
	};
	$.extend(this.config,_config);
	this.win=new LSMScreen.SimpleWindow({
		title:this.config.title,
		width:this.config.width,
		height:this.config.height,
		x:this.config.x,
		y:this.config.y
	});
	this.createComponent();
	this.chart;
};
P2PScreen.KPIDrillWin.prototype.createComponent=function(){
	if(this.config.deviceType=="MME"){//对比组件
		
	}
	this.loadMask=new LSMScreen.LoadMask(this.win.content);
	this.chart=new LSMScreen.SimpleChart(this.win.content,{},this.update.bind(this));
};
P2PScreen.KPIDrillWin.prototype.update=function(){
	this.loadMask.show();
	var kpiType=this.config.kpiType;
	switch(kpiType){
		case "quality":
			this.updateQuality();
			break;
		case "rates":
			this.updateRates();
			break;
	}
};
P2PScreen.KPIDrillWin.prototype.updateQuality=function(){
	var deviceType=this.config.deviceType;
	var deviceName=this.config.deviceName;
	var dm=LSMScreen.DataManager.getInstance();
	switch(deviceType.toUpperCase()){
		case "MME":
			dm.getMMESuccTrend({mme:deviceName},this.kpiDataHandler.bind(this));
			break;
		case "MMEGROUP":
			dm.getMMEGroupSuccTrend({group:deviceName},this.kpiDataHandler.bind(this));
			break;
		case "CITY":
			dm.getCityQualitySignalTrend({sd:deviceName},this.kpiDataHandler2.bind(this));
			break;
		case "ENBIP":
			dm.getENBIpQualityTrend({ipc:deviceName},this.kpiDataHandler2.bind(this));
			break;
		case "ENBVENDOR":
			dm.getENBVendorQualityTrend({vendor:deviceName},this.kpiDataHandler2.bind(this));
			break;
	}
};
P2PScreen.KPIDrillWin.prototype.updateRates=function(){
	var deviceType=this.config.deviceType;
	var deviceName=this.config.deviceName;
	var dm=LSMScreen.DataManager.getInstance();
	switch(deviceType.toUpperCase()){
		case "SAEGW":
			dm.getSaegwRatesTrend({sgw:deviceName},this.kpiDataHandler.bind(this));
			break;
		case "ENBIP":
			dm.getENBIpRatesTrend({ipc:deviceName},this.kpiDataHandler.bind(this));
			break;
		case "ENBVENDOR":
			dm.getENBVendorRatesTrend({vendor:deviceName},this.kpiDataHandler.bind(this));
			break;
		case "CITY":
			dm.getCityRatesTrend({sd:deviceName},this.kpiDataHandler.bind(this));
			break;
		case "HOTSPOT":
			dm.getHotspotRatesTrend({hotspot:deviceName},this.kpiDataHandler3.bind(this));
			break;
	}
};
P2PScreen.KPIDrillWin.prototype.updateCompare=function(){
	
};
/**指标数据有三种不同的返回形式*/
P2PScreen.KPIDrillWin.prototype.kpiDataHandler=function(result){
	var deviceName=this.config.deviceName;
	var kpiKey=this.config.kpiKey;
	var kpiName=this.config.kpiName;
	var arr=result[deviceName];
	var xAxisArr=[];
	var dataArr=[];
	for(var i=0;i<arr.length;i++){
		var record=arr[i];
		var time=record.time;
		var value=record[kpiKey];
		var kpiInfo=SUtils.getKpiInfo(kpiKey);
		value=(value*kpiInfo.fact).toFixed(kpiInfo.percise);
		time=time.substring(11,16);//时:分
		xAxisArr.push(time);
		dataArr.push(value);
		
	}
	var series=[
        {
            name:kpiName,
            type:'line',
            itemStyle:{normal:{color:LSMConsts.baseLineColor}},
            data:dataArr
        }
    ];
	var option=this.chart.getOptionByData([kpiName], xAxisArr, series);
	this.chart.updateData(option, false);
	this.loadMask.hide();
};
/**指标数据有三种不同的返回形式*/
P2PScreen.KPIDrillWin.prototype.kpiDataHandler2=function(result){
	var deviceName=this.config.deviceName;
	var kpiKey=this.config.kpiKey;
	var kpiName=this.config.kpiName;
	var arr=result;
	var xAxisArr=[];
	var dataArr=[];
	for(var i=0;i<arr.length;i++){
		var record=arr[i][deviceName];
		var time=arr[i].time;
		var value=record[kpiKey];
		var kpiInfo=SUtils.getKpiInfo(kpiKey);
		value=(value*kpiInfo.fact).toFixed(kpiInfo.percise);
		time=time.substring(11,16);//时:分
		xAxisArr.push(time);
		dataArr.push(value);
		
	}
	var series=[
        {
            name:kpiName,
            type:'line',
            itemStyle:{normal:{color:LSMConsts.baseLineColor}},
            data:dataArr
        }
    ];
	var option=this.chart.getOptionByData([kpiName], xAxisArr, series);
	this.chart.updateData(option, false);
	this.loadMask.hide();
};
/**指标数据有三种不同的返回形式*/
P2PScreen.KPIDrillWin.prototype.kpiDataHandler3=function(result){
	var kpiKey=this.config.kpiKey;
	var kpiName=this.config.kpiName;
	var arr=result;
	var xAxisArr=[];
	var dataArr=[];
	for(var i=0;i<arr.length;i++){
		var record=arr[i];
		var time=record.time;
		var value=record[kpiKey];
		var kpiInfo=SUtils.getKpiInfo(kpiKey);
		value=(value*kpiInfo.fact).toFixed(kpiInfo.percise);
		time=time.substring(11,16);//时:分
		xAxisArr.push(time);
		dataArr.push(value);
		
	}
	var series=[
        {
            name:kpiName,
            type:'line',
            itemStyle:{normal:{color:LSMConsts.baseLineColor}},
            data:dataArr
        }
    ];
	var option=this.chart.getOptionByData([kpiName], xAxisArr, series);
	this.chart.updateData(option, false);
	this.loadMask.hide();
};


/**
 * ENODEB设备矩阵
 */
P2PScreen.ENBMatrixWin=function(){
	this.initialize.apply(this, arguments);
};

P2PScreen.ENBMatrixWin.prototype.initialize=function(_config){
	this.loadMask;
	this.heightFix=80;
	this.config={
		title:"EnodeB矩阵",
		width:1325,
		height:600,
		x:0,
		y:0
	};
	$.extend(this.config,_config);
	this.win=new LSMScreen.SimpleWindow({
		title:this.config.title,
		width:this.config.width,
		height:this.config.height,
		x:this.config.x,
		y:this.config.y,
		dbclickToMaximum:true,
		doResize:this.doResize.bind(this),
		maxParent:$(".ETE_left")[0]
	});
	this.grid0;
	this.alarmMap={};
	this.createComponent();
	
	
};
P2PScreen.ENBMatrixWin.prototype.doResize=function(width,hegiht){
	this.grid0.setGridWidth(width);
	this.grid0.setGridHeight(hegiht-this.heightFix);
};

P2PScreen.ENBMatrixWin.prototype.createComponent=function(){
	this.loadMask=new LSMScreen.LoadMask(this.win.content);
	var dom=this.win.content;
	
	var table0=document.createElement("table");
	this.table0=table0;
	$(table0).attr("id",Math.uuid());
	dom.appendChild(table0);
	
	this.update();
	
};
P2PScreen.ENBMatrixWin.prototype.afterInsertRow=function(rowid,rowdata){
	var grid=this.grid0;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	var alarmMap=this.alarmMap;
	for(var i=0;i<tds.length;i++){
		var td=tds[i];
		var deviceName=$(td).text();
		if(alarmMap[deviceName]!=null){
			var level=alarmMap[deviceName];
			if(level==1){
				$(td).css('cursor','pointer');
				$(td).css('color','#ffffff');
				$(td).css('background',LSMConsts.alarmColor1);
				$(td).on('click',this.alarmDrill.bind(this));
        	}else if(level==2){
        		$(td).css('cursor','pointer');
        		$(td).css('color','#ffffff');
        		$(td).css('background',LSMConsts.alarmColor2);
        		$(td).on('click',this.alarmDrill.bind(this));
        	}else if(level==3){
        		$(td).css('cursor','pointer');
        		$(td).css('color','#000000');
        		$(td).css('background',LSMConsts.alarmColor3);
        		$(td).on('click',this.alarmDrill.bind(this));
        	}else{
        		$(td).css('color','none');
        		$(td).css('background','none');
        	}
		}
	}
};
P2PScreen.ENBMatrixWin.prototype.alarmDrill=function(param){
	var device=$(param.currentTarget).text();
	new P2PScreen.AlarmFlowWin({
		title:device+"告警流水窗",
		width:1200,
		height:400,
		x:0,
		y:0,
		queryConfig:{DS:"ENB传输环",DS_NAME:device}
	});
};
P2PScreen.ENBMatrixWin.prototype.update=function(){
	this.loadMask.show();
	var dm=LSMScreen.DataManager.getInstance();
	dm.getDeviceAlarm({},this.alarmHandler.bind(this));
};
P2PScreen.ENBMatrixWin.prototype.alarmHandler=function(result){
	this.alarmMap={};
	for(var i=0;i<result.length;i++){
		var record=result[i];
		this.alarmMap[record.NE_NAME]=record.AL;
	}
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getEnbipc_sds_vendors({vendor:"华为,诺西"},this.dataHandler.bind(this));
};
P2PScreen.ENBMatrixWin.prototype.dataHandler=function(result){
	var vendorKey="";
	var enbipKey="";
	var cityKey="";
	
	var rows=[];
	var rowIndexMap={};
	
	var colNames=[];
	var colModel=[];
	var groupHeaders=[];
	var colWidth=110;
	for(vendorKey in result){
		if(vendorKey=="time") continue;
		var vendorCityMap={};
		var vendorRecord=result[vendorKey];
		var colCount=0;
		var startColName=null;
		for(enbipKey in vendorRecord){
			var enbipRecord=vendorRecord[enbipKey];
			for(cityKey in enbipRecord){
//				var cityRecord=enbipRecord[cityKey];
				if(cityKey!=LSMConsts.provinceName&&cityKey!=LSMConsts.unknown){
					if(rowIndexMap[enbipKey]==null){
						rowIndexMap[enbipKey]=rows.length;
						rows.push({});
					}
					var colKey=vendorKey+"_"+cityKey;
					rows[rowIndexMap[enbipKey]][colKey]=enbipKey;
					if(vendorCityMap[cityKey]==null){
						if(startColName==null){
							startColName=colKey;
						}
						vendorCityMap[cityKey]=true;
						colNames.push(cityKey.replace("分公司",""));
						colModel.push({name : colKey,index : colKey,width : colWidth});
						colCount++;
					}
				}
				
			}
		}
		groupHeaders.push({align:'center',startColumnName:startColName, numberOfColumns:colCount, titleText: vendorKey});
	}
	this.grid0=$(this.table0).jqGrid({
        datatype : "json",
		colNames : colNames,
        colModel : colModel,
        afterInsertRow:this.afterInsertRow.bind(this),
        sortable:false,
        autowidth:true,
        autoScroll: true,
        shrinkToFit:false,
        rowNum:1000000,
        loadui:'disable',
        height:this.config.height-this.win.config.titleHeight-this.heightFix
	});
	$(this.table0).jqGrid('setGroupHeaders', {
	    useColSpanStyle: true,
	    groupHeaders:groupHeaders
	});
	this.grid0[0].addJSONData(rows);
	this.grid0.find("tr").removeClass("oddGrayTableRow");
	this.grid0.find("tr:odd").addClass("oddGrayTableRow");
	
	var id=$(this.table0).attr("id");
	$("#gbox_"+id).find(".ui-th-ltr").css("border-right","solid 1px #333333");
	$("#gbox_"+id).find(".jqg-second-row-header").find(".ui-th-ltr").css("border-bottom","solid 1px #333333");
	$("#gbox_"+id).find(".ui-th-ltr").css("text-align","center");
	
	this.loadMask.hide();
	
};
P2PScreen.ENBMatrixWin.prototype.getGridByLabel=function(vendorKey){
	var grid=null;
	switch(vendorKey){
		case "华为":
			grid=this.grid0;
			break;
		case "诺西":
			grid=this.grid1;
			break;
		case "贝尔":
			grid=this.grid2;
			break;
	}
	return grid;
};
P2PScreen.ENBMatrixWin.prototype.navClick=function(type){
	$(this.win.content).find(".ui-jqgrid").css("display","none");
	switch(type){
		case "华为":
			$(this.win.content).find(".ui-jqgrid:eq(0)").css("display","block");
			break;
		case "诺西":
			$(this.win.content).find(".ui-jqgrid:eq(1)").css("display","block");
			break;
		case "贝尔":
			$(this.win.content).find(".ui-jqgrid:eq(2)").css("display","block");
			break;
	}
};

/**
 * MME设备矩阵
 */
P2PScreen.MMEMatrixWin=function(){
	this.initialize.apply(this, arguments);
};

P2PScreen.MMEMatrixWin.prototype.initialize=function(_config){
	this.loadMask;
	this.heightFix=0;
	this.config={
		title:"MME矩阵",
		width:900,
		height:300,
		x:0,
		y:0
	};
	$.extend(this.config,_config);
	this.win=new LSMScreen.SimpleWindow({
		title:this.config.title,
		width:this.config.width,
		height:this.config.height,
		x:this.config.x,
		y:this.config.y,
		dbclickToMaximum:true,
		doResize:this.doResize.bind(this),
		maxParent:$(".ETE_left")[0]
	});
	this.grid;
	this.alarmMap={};
	this.vendorMap={};
	this.createComponent();
	
	
};
P2PScreen.MMEMatrixWin.prototype.doResize=function(width,hegiht){
	this.grid.setGridWidth(width);
	this.grid.setGridHeight(hegiht-this.heightFix);
};
P2PScreen.MMEMatrixWin.prototype.createComponent=function(){
	this.loadMask=new LSMScreen.LoadMask(this.win.content);
	this.update();
	
};
P2PScreen.MMEMatrixWin.prototype.afterInsertRow=function(rowid,rowdata){
	var grid=this.grid;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	tds.height(120);
	var alarmMap=this.alarmMap;
	for(var i=1;i<tds.length;i++){
		var td=tds[i];
		var deviceName=$(td).text();
		var level=0;
		for(var key in alarmMap){
			if(key.indexOf(deviceName)!=-1){
				level=alarmMap[key];
				break;
			}
		}
		if(level==1){
			$(td).css('cursor','pointer');
			$(td).css('color','#ffffff');
			$(td).css('background',LSMConsts.alarmColor1);
			$(td).attr('alarm',level);
			$(td).on('click',this.alarmDrill.bind(this));
    	}else if(level==2){
    		$(td).css('cursor','pointer');
    		$(td).css('color','#ffffff');
    		$(td).css('background',LSMConsts.alarmColor2);
    		$(td).attr('alarm',level);
    		$(td).on('click',this.alarmDrill.bind(this));
    	}else if(level==3){
    		$(td).css('cursor','pointer');
    		$(td).css('color','#000000');
    		$(td).css('background',LSMConsts.alarmColor3);
    		$(td).attr('alarm',level);
    		$(td).on('click',this.alarmDrill.bind(this));
    	}else{
    		$(td).css('color','none');
    		$(td).css('background','none');
    	}
	}
};
P2PScreen.MMEMatrixWin.prototype.alarmDrill=function(param){
	var device=$(param.currentTarget).text();
	var vendor=this.vendorMap[device];
	switch(vendor){
		case "华为":
			vendor="HW";
			break;
		case "诺西":
			vendor="NK";
			break;
		case "爱立信":
			vendor="ER";
			break;
	}
	var NE_NAME="SH"+device+"B"+vendor;
	new P2PScreen.AlarmFlowWin({
		title:device+"告警流水窗",
		width:1200,
		height:400,
		x:0,
		y:0,
		queryConfig:{NE_NAME:NE_NAME}
	});
};
P2PScreen.MMEMatrixWin.prototype.update=function(){
	this.loadMask.show();
	var dm=LSMScreen.DataManager.getInstance();
	dm.getDeviceAlarm({},this.alarmHandler.bind(this));
};
P2PScreen.MMEMatrixWin.prototype.alarmHandler=function(result){
	this.alarmMap={};
	for(var i=0;i<result.length;i++){
		var record=result[i];
		this.alarmMap[record.NE_NAME]=record.AL;
	}
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMMEGroupSuccRecord({aggregation:"false",group:"诺西,爱立信"},this.dataHandler.bind(this));
};
P2PScreen.MMEMatrixWin.prototype.dataHandler=function(result){
	var vendorKey="";
	var mmeKey="";
	var rows=[];
	var maxDevice=0;
	for(vendorKey in result){
		var vendorRecord=result[vendorKey];
		var gridRecord={vendor:vendorKey};
		var deviceCount=0;
		for(mmeKey in vendorRecord){
			if(mmeKey!="time"){
				gridRecord["device"+deviceCount]=mmeKey;
				deviceCount++;
				this.vendorMap[mmeKey]=vendorKey;
			}
		}
		maxDevice=Math.max(maxDevice,deviceCount);
		rows.push(gridRecord);
	}
	if(this.grid==null){
		var colWidth=100;
		var colNames=["厂商"];
		var colModel=[{name : 'vendor',index : 'vendor',width : colWidth}];
		
		for(var i=0;i<maxDevice;i++){
			colNames.push("设备"+i);
			colModel.push({name : 'device'+i,index : 'device'+i,width : colWidth});
		}
		var dom=this.win.content;
		var table=document.createElement("table");
		dom.appendChild(table);
		this.grid=$(table).jqGrid({
	        datatype : "json",
			colNames : colNames,
	        colModel : colModel,
	        afterInsertRow:this.afterInsertRow.bind(this),
	        loadui:'disable',
	        height:this.config.height-this.win.config.titleHeight-this.heightFix
		});
		this.grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide();
	}
	
	var grid=this.grid;
	if(grid!=null){
		SUtils.clearGrid(grid);
		for ( var i = 0; i < rows.length; i++){
			grid.jqGrid('addRowData', i + 1, rows[i]);
		}
		grid.find("tr").removeClass("oddGrayTableRow");
		grid.find("tr:odd").addClass("oddGrayTableRow");
	}
	this.loadMask.hide();
	
};



/**
 * 终端排名玫瑰图(黄文接口)
 * @class P2PScreen.TerminalBarChart
 * @extends LSMScreen.DataChartPie
 * @classdesc 
 */
P2PScreen.TerminalBarChart=function (){
	this.initialize.apply(this, arguments);
};
/** 从DataChartBase继承*/
P2PScreen.TerminalBarChart.prototype=Object.create(LSMScreen.DataChartBase.prototype);
P2PScreen.TerminalBarChart.prototype.constructor=P2PScreen.TerminalBarChart;

/** 
 * 请求数据接口 由update调用
 * @public
 * @function 
 * @param {Object} queryConfig 查询参数
 * @example
 * {
 * 	topN:"8",//数量
 *  type:"brand",//brand|model 按品牌或型号分
 *  app_type_name:"视频",//业务大类
 *  app_subtype_name:""//业务小类
 *  terminal_brand:""//终端品牌 当type=model时
 * }
 */
P2PScreen.TerminalBarChart.prototype.query=function(queryConfig){
	this.lastQueryConfig=queryConfig;
	queryConfig.topN=10000;
	queryConfig.fdd=false;
	var dm=LSMScreen.DataManager.getInstance();
	dm.getTerminalRank(queryConfig,function(result){
		queryConfig.fdd=true;
		dm.getTerminalRank(queryConfig,function(result2){
			this.dataHandler(result,result2);
		}.bind(this),this.failHandler.bind(this));
	}.bind(this),this.failHandler.bind(this));
};

P2PScreen.TerminalBarChart.prototype.gobackPasser;
P2PScreen.TerminalBarChart.prototype.showLegend=true;
P2PScreen.TerminalBarChart.prototype.funcBtnInited=false;
P2PScreen.TerminalBarChart.prototype.funcBtnId="";
P2PScreen.TerminalBarChart.prototype.isFDD=false;
P2PScreen.TerminalBarChart.prototype.lastQueryConfig={};
P2PScreen.TerminalBarChart.prototype.maxCount=8;

P2PScreen.TerminalBarChart.prototype.addFuncBtn=function(){};
P2PScreen.TerminalBarChart.prototype.typeFilter=function(evt){
	var lb=$(evt.currentTarget).text();
	$("#"+this.funcBtnId+" span").css("text-decoration","none");
	$(evt.currentTarget).css("text-decoration","underline");
	if(lb=="全部"){
		this.isFDD=false;
	}else if(lb=="FDD"){
		this.isFDD=true;
	}
	this.update(true,this.lastQueryConfig);
};
P2PScreen.TerminalBarChart.prototype.goback=function(){
	this.update(true,{
		topN:8,
		type:"brand",
		app_type_name:"",
		app_subtype_name:"",
		terminal_brand:""
	});
	if(this.gobackPasser!=null){
		this.gobackPasser();
	}
};
/** 
 * 处理数据
 * 降序取前6个错误码，剩下的归并到"其他"
 * @protected
 * @function 
 * @param {Array} chartDataArr
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
 */
P2PScreen.TerminalBarChart.prototype.dataHandler=function(chartDataArr,fddChartDataArr){
	//有色圆环样式
	var dataStyle = {
	    normal: {
	        label: {show:true,position:"outter",textStyle:{fontSize:LSMScreen.CHARTCONFIG.labelSize}},
	        labelLine: {show:true,length:0}
	    }
	};
	var seriesName="";
	if(this.queryConfig.type=="model"){
		seriesName="";//"终端型号排名";
		this.setTitle("品牌("+this.queryConfig.terminal_brand+")");
		$(this.backBtnDom).css("display","block");
	}else{
		seriesName="  ";//"终端品牌排名";
		this.setTitle(this.baseConfig.title);
		$(this.backBtnDom).css("display","none");
	}
	
	
	var lastTime="";
	var allArr=[];
	var dataArr=[];
	var fddDataArr=[];
	var xArr=[];
	var legends=["FDD"+seriesName,"全网"+seriesName];
	
	var allMap={};
	var fddMap={};
	var sortArr=[];
	
	for(var i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i];
		var cnts=record.terimalCnt;
		var time=record.time;
		lastTime=time.substring(11,16);
		var pointName=record.terminal_model;
		allMap[pointName]=cnts;
	}
	for(var i=0;i<fddChartDataArr.length;i++){
		var record=fddChartDataArr[i];
		var cnts=record.terimalCnt;
		var pointName=record.terminal_model;
		fddMap[pointName]=cnts;
	}
	for(var key in allMap){
		if(fddMap[key]){
			sortArr.push({name:key,all:allMap[key],fdd:fddMap[key],percent:fddMap[key]/allMap[key]});
		}
	}
	sortArr.sort(function(a,b){return b.all-a.all;});//按percent 降序
	for(var i=0;i<sortArr.length&&i<this.maxCount;i++){
		var finalRecord=sortArr[i];
		xArr.push(finalRecord.name);
		dataArr.push(finalRecord.all-finalRecord.fdd);
		fddDataArr.push(finalRecord.fdd);
		allArr.push(finalRecord.all);
	}
	xArr.reverse();
	dataArr.reverse();
	fddDataArr.reverse();
	allArr.reverse();
	var series=[{
            name:"FDD"+seriesName,
            type:'bar',
            itemStyle : dataStyle,
            stack:"总量",
            data:fddDataArr
        },{
            name:"全网"+seriesName,
            type:'bar',
            itemStyle : dataStyle,
            stack:"总量",
            data:dataArr
        }];
	this.setTime(lastTime);
	var option=this.getOptionByDataReverse(legends,xArr,series, function(info){
		var value=info.data;
		var dataIndex=info.dataIndex;
		var seriesName=info.seriesName;
		var pointName=info.name;
		var percent=(value/allArr[dataIndex]*100).toFixed(2);
		var tip="";
		if(seriesName.indexOf("FDD")!=-1){
			tip="FDD:<br/>"
			+pointName+"<br/>"
			+value+"("+percent+"%)";
		}else{
			tip="全网:<br/>"
				+pointName+"<br/>"
				+allArr[dataIndex];
		}
		return tip;
	},{
    	borderWidth:0,
    	x:120,
    	x2:40,
    	y2:10
    });
	this.updateData(option,true);
	this.hideLoading();
	
	if(!this.funcBtnInited){
		this.addFuncBtn();
		this.funcBtnInited=true;
	}
	
};