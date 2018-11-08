var KpiView = KpiView || {};
//var dm=LSMScreen.DataManager.getInstance();
//dm.getAllKpiTrendWs
KpiView.TYPE_GSM='gsm';
KpiView.TYPE_LTE='lte';
KpiView.SOURCE_WS='网管';
KpiView.SOURCE_STREAM='信令';
KpiView.CONFIG_ID='EXTRAPAGE_ALL_TREND_KPIS';
KpiView.GSM_LASTYEAR=null;
KpiView.LTE_LASTYEAR=null;
KpiView.LASTYEAR_MAP={
		lte_mme_sub_nbrsub:true,
		volte_scscf_register_user_cnt:true,
		lte_flow_sgi:true,
		volte_wireless_enb_c:true,
		volte_scscf_voice_teletraffic:true,
		msc_subscrib_in_vlr:true,
		gsm_teletraffic:true
};
KpiView.GROUPS=[
            	{
            		group:'用户数',
            		kpis:[
            		   {name:'全网VLR用户数',key:'msc_subscrib_in_vlr',source:KpiView.SOURCE_WS,unit:'万人',rate:1/10000,fixed:2,period:60,type:KpiView.TYPE_GSM},
            		   {name:'LTE附着用户数',key:'lte_mme_sub_nbrsub',source:KpiView.SOURCE_WS,unit:'万人',rate:1/10000,fixed:2,period:15,type:KpiView.TYPE_LTE},
            		   {name:'VOLTE注册用户数',key:'volte_scscf_register_user_cnt',source:KpiView.SOURCE_WS,unit:'万人',rate:1/10000,fixed:2,fixed:0,period:15,type:KpiView.TYPE_LTE}
            		]
            	},{
            		group:'业务量',
            		kpis:[
            		   {name:'LTE SGI流量',key:'lte_flow_sgi',source:KpiView.SOURCE_WS,unit:'GB',rate:1/1024,fixed:0,period:15,type:KpiView.TYPE_LTE},
            		   {name:'VOLTE语音话务量（SCSCF）',key:'volte_scscf_voice_teletraffic',source:KpiView.SOURCE_WS,unit:'万Erl',rate:1/10000,fixed:1,period:15,type:KpiView.TYPE_LTE},
            		   {name:'GSM空口流量',key:'gsm_flow_all',source:KpiView.SOURCE_WS,unit:'GB',rate:1/1024,fixed:2,period:60,type:KpiView.TYPE_GSM},
            		   {name:'GSM话务量',key:'gsm_teletraffic',source:KpiView.SOURCE_WS,unit:'万Erl',rate:1/10000,fixed:1,period:60,type:KpiView.TYPE_GSM},
//            		   {name:'WLAN AC流量',key:'',source:KpiView.SOURCE_WS,unit:'MB',rate:1,fixed:0,period:60,selected:false,type:KpiView.TYPE_GSM},
            		   {name:'VOLTE语音无线话务量',key:'volte_wireless_enb_c',source:KpiView.SOURCE_WS,unit:'万Erl',rate:1/10000,fixed:1,period:15,selected:false,type:KpiView.TYPE_LTE},
            		   {name:'LTE上行流量',key:'lte_flow_ul',source:KpiView.SOURCE_WS,unit:'GB',rate:1/1024,fixed:2,period:15,selected:false,type:KpiView.TYPE_LTE},
            		   {name:'LTE下行流量',key:'lte_flow_dl',source:KpiView.SOURCE_WS,unit:'GB',rate:1/1024,fixed:2,period:15,selected:false,type:KpiView.TYPE_LTE}
            		]
            	},{
            		group:'LTE&EPC指标',
            		kpis:[
            		   {name:'LTE无线接通率',key:'lte_wireless_conn_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:15,type:KpiView.TYPE_LTE},
            		   {name:'LTE附着成功率',key:'lte_attach_succ_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:15,type:KpiView.TYPE_LTE},
            		   {name:'上行PRB利用率',key:'lte_ul_prb_use_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:15,type:KpiView.TYPE_LTE},
            		   {name:'下行PRB利用率',key:'lte_dl_prb_use_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:15,type:KpiView.TYPE_LTE},
            		   {name:'LTE无线掉线率',key:'lte_wireless_drop_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:15,selected:false,type:KpiView.TYPE_LTE,ymax:5},
            		   {name:'LTE无线切换成功率',key:'lte_sw_succ_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:15,selected:false,type:KpiView.TYPE_LTE},
            		   {name:'LTE TAU成功率',key:'lte_tau_succ_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:15,selected:false,type:KpiView.TYPE_LTE}
            		]
            	},{
            		group:'语音质量',
            		kpis:[
            		   {name:'VOTLE语音无线接通率',key:'volte_voice_conn_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:15,type:KpiView.TYPE_LTE},
            		   {name:'GSM无线接通率',key:'gsm_wireless_conn_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:60,type:KpiView.TYPE_GSM},
            		   {name:'VOLTE语音无线掉线率',key:'volte_voice_drop_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:15,type:KpiView.TYPE_LTE,ymax:10},
            		   {name:'GSM接通率（GSM无线接入性）',key:'gsm_conn_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:60,type:KpiView.TYPE_GSM},
            		   {name:'GSM无线掉话率',key:'gsm_wireless_drop_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:60,selected:false,type:KpiView.TYPE_GSM,ymax:10}
            		]
            	},{
            		group:'无线小区',
            		kpis:[
            		   {name:'LTE低接入小区数',key:'low_join_cell_cnt',source:KpiView.SOURCE_WS,unit:'个',rate:1,fixed:0,period:15,type:KpiView.TYPE_LTE},
            		   {name:'LTE高掉话小区数',key:'high_drop_cell_cnt',source:KpiView.SOURCE_WS,unit:'个',rate:1,fixed:0,period:15,type:KpiView.TYPE_LTE},
            		   {name:'LTE上行PRB利用率高小区数',key:'high_prb_ul_util_cell_cnt',source:KpiView.SOURCE_WS,unit:'个',rate:1,fixed:0,period:15,type:KpiView.TYPE_LTE},
            		   {name:'LTE下行PRB利用率高小区数',key:'high_prb_dl_util_cell_cnt',source:KpiView.SOURCE_WS,unit:'个',rate:1,fixed:0,period:15,type:KpiView.TYPE_LTE},
            		   {selected:false,name:'LTE高干扰小区数',key:'lte_high_disturb_cell_cnt',source:KpiView.SOURCE_WS,unit:'个',rate:1,fixed:0,period:15,type:KpiView.TYPE_LTE},
            		   {selected:false,name:'VOLTE高掉话小区数',key:'volte_high_drop_cell_cnt',source:KpiView.SOURCE_WS,unit:'个',rate:1,fixed:0,period:15,type:KpiView.TYPE_LTE},
            		   {selected:false,name:'VOLTE低接通小区数',key:'volte_low_conn_cell_cnt',source:KpiView.SOURCE_WS,unit:'个',rate:1,fixed:0,period:15,type:KpiView.TYPE_LTE},
            		   {selected:false,name:'GSM高干扰小区数',key:'gsm_high_disturb_cell_cnt',source:KpiView.SOURCE_WS,unit:'个',rate:1,fixed:0,period:60,type:KpiView.TYPE_GSM},
            		   {selected:false,name:'GSM高掉话小区数',key:'gsm_high_drop_cell_cnt',source:KpiView.SOURCE_WS,unit:'个',rate:1,fixed:0,period:60,type:KpiView.TYPE_GSM}
            		]
            	},{
            		group:'其他',
            		kpis:[
            		   {name:'短信流量MO+AO',key:'message_flow',source:KpiView.SOURCE_WS,unit:'万条',rate:1/10000,fixed:2,period:60,type:KpiView.TYPE_GSM},
            		   {name:'短信接通率',key:'message_conn_ratio',source:KpiView.SOURCE_WS,unit:'%',rate:1,fixed:2,period:60,type:KpiView.TYPE_GSM}
            		]
            	},{
            		group:'业务感知指标',
            		kpis:[
            		   {name:'TCP二三次握手成功率',key:'TCP第二、三次握手成功率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'TCP二三次握手时延',key:'TCP第二、三次握手时延',source:KpiView.SOURCE_STREAM,unit:'ms',rate:1,fixed:0,period:5,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'HTTP响应成功率',key:'HTTP响应成功率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'HTTP大包下载速率',key:'HTTP下行速率500k',source:KpiView.SOURCE_STREAM,unit:'Kbps',rate:1,fixed:2,period:5,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'TCP成功率',key:'TCP成功率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'TCP时延',key:'TCP时延',source:KpiView.SOURCE_STREAM,unit:'ms',rate:1,fixed:0,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'TCP一二次握手成功率',key:'TCP第一、二次握手成功率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'TCP一二次握手时延',key:'TCP第一、二次握手时延',source:KpiView.SOURCE_STREAM,unit:'ms',rate:1,fixed:0,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'HTTP请求成功率',key:'HTTP成功率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'HTTP响应时延',key:'HTTP响应时延',source:KpiView.SOURCE_STREAM,unit:'ms',rate:1,fixed:0,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'HTTP大包<250kbps占比',key:'大包下载小于250kbps占比',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'HTTP大包<500kbps占比',key:'大包下载小于500kbps占比',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'HTTP大包>2500kbps占比',key:'大包下载大于2.5mbps占比',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'TCP上行重传率',key:'TCP上行重传率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:false},
            		   {name:'TCP上行乱序率',key:'TCP上行乱序率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:false},
            		   {name:'TCP下行重传率',key:'TCP下行重传率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:false},
            		   {name:'TCP下行乱序率',key:'TCP下行乱序率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:false},
            		   {name:'视频业务HTTP请求成功率',key:'视频业务HTTP请求成功率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'浏览业务HTTP请求成功率',key:'浏览业务HTTP请求成功率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'视频业务大包下载速率',key:'视频业务大包下载速率',source:KpiView.SOURCE_STREAM,unit:'Kbps',rate:1,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'浏览业务大包下载速率',key:'浏览业务大包下载速率',source:KpiView.SOURCE_STREAM,unit:'Kbps',rate:1,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE,skip0:true}
            		]
            	},{
            		group:'VOLTE信令指标',
            		kpis:[
            		   {name:'VOLTE语音网络接通率',key:'VOLTE语音接通率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,type:KpiView.TYPE_LTE,skip0:true},
//            		   {name:'VOLTE语音掉话率',key:'VOLTE语音掉话率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,type:KpiView.TYPE_LTE},
            		   {name:'IMS初始注册成功率(含用户原因)',key:'VOLTEIMS初始注册成功率(含用户原因)',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'V-V接续时长',key:'VOLTE平均接续时长',source:KpiView.SOURCE_STREAM,unit:'ms',rate:1,fixed:0,period:5,selected:true,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'ESRVCC切换成功率',key:'VOLTEeSRVCC成功率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:true,type:KpiView.TYPE_LTE,skip0:true},
            		   {name:'VOLTE语音MOS值',key:'VOLTEMOS值',source:KpiView.SOURCE_STREAM,unit:'',rate:1,fixed:1,period:2,selected:false,type:KpiView.TYPE_LTE,skip0:true}
//            		   {name:'RTP上行丢包率',key:'VOLTERTP上行丢包率',source:KpiView.SOURCE_STREAM,unit:'%',rate:100,fixed:2,period:5,selected:false,type:KpiView.TYPE_LTE}
            		]
            	}     
];
KpiView.GETNOWPARAM=function (){
	var date=new Date();
	date.setMinutes(date.getMinutes()-20);
	var endDateStr=date.Format('yyyy-MM-dd hh:mm');
	date.setHours(date.getHours()-12);
	var startDateStr=date.Format('yyyy-MM-dd hh:mm');
	
	var wsStart=startDateStr.replace(/:/g,'').replace(/-/g,'').replace(' ','');
	var wsEnd=endDateStr.replace(/:/g,'').replace(/-/g,'').replace(' ','');
	
	var streamTimeBegin=startDateStr+':00';
	var streamTimeEnd=endDateStr+':00';
	
	var params={
		wsStart:wsStart,
		wsEnd:wsEnd,
		streamTimeBegin:streamTimeBegin,
		streamTimeEnd:streamTimeEnd
	};
	return params;
};
KpiView.UPDATEWS=function (params){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getAllKpiTrendWs(params,params.callback);
};

KpiView.UPDATESTREAM=function (params){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getAllStreamTrendUnion(params,params.callback);
	
};
//所有指标组
KpiView.ChartGroupList=function ()
{
	this.initialize.apply(this, arguments);
};
KpiView.ChartGroupList.prototype.constructor=KpiView.ChartGroupList;
KpiView.ChartGroupList.prototype.chartGroups=[];
KpiView.ChartGroupList.prototype.indicatorNameList='';//信令指标过滤参数
KpiView.ChartGroupList.prototype.initialize=function(targetId){
	require(['echarts','echarts/chart/line'],function(ec){
		var dm=LSMScreen.DataManager.getInstance();
		dm.getConfigData({type:KpiView.CONFIG_ID},function(result){
			KpiView.GROUPS=JSON.parse(result[KpiView.CONFIG_ID].content);
			
			var date=new Date();
			date.setDate(date.getDate()-1);
			var startDateStr=date.Format('yyyy-MM-dd');
			var groups=KpiView.GROUPS;
			var streamKpiList=['time'];
			for(var i=0;i<groups.length;i++){
				var group=groups[i];
				var kpis=group.kpis;
				var chartGroup=new KpiView.ChartGroup(group,ec);
				this.chartGroups.push(chartGroup);
				$('#'+targetId).append(chartGroup.jqGroup);
				
				for(var j=0;j<kpis.length;j++){
					var kpi=kpis[j];
					if(kpi.source==KpiView.SOURCE_STREAM){
						streamKpiList.push(kpi.key);
						streamKpiList.push(kpi.key+'历史比');
					}
				}
			}
			var queryTools='<div style="position:absolute;top:10px;right:100px;line-height:15px;color:white;">'
							+'平时：<input id="normalTime" readonly="readonly" type="text" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd\'})" class="Wdate" style="width:120px;height:25px;color:white;"/>'
							+'<button id="queryBtn" type="button" class="btn btn-success btn-xs" style="margin-top:-5px;margin-left:10px;">查询</button>'
							+'</div>';
			$('#'+targetId).append(queryTools);
			$('#normalTime').val(startDateStr);
			$('#queryBtn').on('click',this.update.bind(this));
			this.indicatorNameList=streamKpiList.join(',');
			
			this.queryLastYear();
			
			
		}.bind(this));
	}.bind(this));
	
};
KpiView.ChartGroupList.prototype.queryLastYear=function(){
	var lastYearStart='201701270000';
	var lastYearEnd='201701272359';
	var gsmParams={
		qry:KpiView.TYPE_GSM,
		startTime:lastYearStart,
		endTime:lastYearEnd,
		callback:function(gsmLastYear){
			var list=gsmLastYear.data;
			KpiView.GSM_LASTYEAR={};
			for(var i=0;i<list.length;i++){
				var record=list[i];
				var timeKey=record.time_id.substring(11,16);
				KpiView.GSM_LASTYEAR[timeKey]=record;
			}
			this.start();
		}.bind(this)
	}
	var lteParams={
		qry:KpiView.TYPE_LTE,
		startTime:lastYearStart,
		endTime:lastYearEnd,
		callback:function(lteLastYear){
			var list=lteLastYear.data;
			KpiView.LTE_LASTYEAR={};
			for(var i=0;i<list.length;i++){
				var record=list[i];
				var timeKey=record.time_id.substring(11,16);
				KpiView.LTE_LASTYEAR[timeKey]=record;
			}
			this.start();
		}.bind(this)
	}
	
	KpiView.UPDATEWS(gsmParams);
	KpiView.UPDATEWS(lteParams);
};
KpiView.ChartGroupList.prototype.start=function(){
	if(KpiView.GSM_LASTYEAR!=null&&KpiView.LTE_LASTYEAR!=null){
		this.showLoading();
		this.update();
		setInterval(this.update.bind(this),5*60*1000);
	}
};

KpiView.ChartGroupList.prototype.update=function(){
	var nowParams=KpiView.GETNOWPARAM();
	var selectedDateStr=$('#normalTime').val();
	
	var wsStart=nowParams.wsStart;
	var wsEnd=nowParams.wsEnd;
	
	var streamTimeBegin=nowParams.streamTimeBegin;
	var streamTimeEnd=nowParams.streamTimeEnd;
	
	var streamTimeBeginDate = new Date(Date.parse(streamTimeBegin.replace(/-/g,   "/")));
	var streamTimeEndDate = new Date(Date.parse(streamTimeEnd.replace(/-/g,   "/")));
	
	
	
	var selectedDate=new Date(Date.parse((selectedDateStr+' 00:00:00').replace(/-/g,   "/")));
	var now=new Date(Date.parse((nowParams.streamTimeEnd.split(' ')[0]+' 00:00:00').replace(/-/g,   "/")));
	var deltaTime=now.getTime()-selectedDate.getTime();
	var mtime=deltaTime/1000/60;
	var deltaDay=mtime/1440;
	
	streamTimeBeginDate.setDate(streamTimeBeginDate.getDate()-deltaDay);
	streamTimeEndDate.setDate(streamTimeEndDate.getDate()-deltaDay);
	
	var streamTimeBeginCompare=streamTimeBeginDate.Format('yyyy-MM-dd hh:mm:00');
	var streamTimeEndCompare=streamTimeEndDate.Format('yyyy-MM-dd hh:mm:00');
	
	var gsmParams={
		qry:KpiView.TYPE_GSM,
		startTime:wsStart,
		endTime:wsEnd,
		mtime:mtime,
		callback:this.renderChartWs.bind(this)
	}
	var lteParams={
		qry:KpiView.TYPE_LTE,
		startTime:wsStart,
		endTime:wsEnd,
		mtime:mtime,
		callback:this.renderChartWs.bind(this)
	}
	var streamParams={
		timeBegin:streamTimeBegin,
		timeEnd:streamTimeEnd,
		timeBeginCompare:streamTimeBeginCompare,
		timeEndCompare:streamTimeEndCompare,
		indicatorNameList:this.indicatorNameList,
		callback:this.renderChartStream.bind(this)
	}
	
	KpiView.UPDATEWS(gsmParams);
	KpiView.UPDATEWS(lteParams);
	KpiView.UPDATESTREAM(streamParams);
};

KpiView.ChartGroupList.prototype.showLoading=function(){
	var ilength=this.chartGroups.length;
	for(var i=0;i<ilength;i++){
		this.chartGroups[i].showLoading();
	}
};
KpiView.ChartGroupList.prototype.hideLoading=function(){
	var ilength=this.chartGroups.length;
	for(var i=0;i<ilength;i++){
		this.chartGroups[i].hideLoading();
	}
};
KpiView.ChartGroupList.prototype.renderChartWs=function(result,queryInfo){
	var groups=this.chartGroups;
	var wsData=result.data;
	for(var i=0;i<groups.length;i++){
		var group=groups[i];
		group.updateChartsByData(wsData,queryInfo.qry,KpiView.SOURCE_WS);
	}
};

KpiView.ChartGroupList.prototype.renderChartStream=function(result){
	var groups=this.chartGroups;
	var streamData=result;
	for(var i=0;i<groups.length;i++){
		var group=groups[i];
		group.updateChartsByData(streamData,KpiView.TYPE_LTE,KpiView.SOURCE_STREAM);
	}
};

//指标组
KpiView.ChartGroup=function ()
{
	this.initialize.apply(this, arguments);
};
KpiView.ChartGroup.prototype.constructor=KpiView.ChartGroup;
KpiView.ChartGroup.prototype.groupName='';
KpiView.ChartGroup.prototype.chartComponents=[];
KpiView.ChartGroup.prototype.jqGroup=null;
KpiView.ChartGroup.prototype.kpis=[];
KpiView.ChartGroup.prototype.initialize=function(groupConfig,ec){
	var groupName=groupConfig.group;
	var kpis=groupConfig.kpis;
	this.kpis=kpis;
	this.groupName=groupName;
	this.chartComponents=[];
	
	var btnVisible='';
	var marginStyle='';
	if(kpis.length<5){
		btnVisible='display:none;';
		marginStyle='margin-right:20px;';
	}
	var html='<div class="kpiview_content" >'
			    +'<div class="kpiview_titleBar" >'
				    +'<div class="kpiview_titleColorIcon"></div>'
				    +'<span class="kpiview_titleTxt">'+this.groupName+'</span>'
				    +'<div class="kpiview_toExpand kpiview_ctrlBtn" style="'+btnVisible+'" ></div>'
				    +'<div class="kpiview_colconfig"  style="'+marginStyle+'"></div>'
				    
			    +'</div>'
				+'<div class="kpiview_charts" ></div>'
			+'</div>';
	
	this.jqGroup=$(html);
	var jqChartPanel=this.jqGroup.find('.kpiview_charts');
	this.jqGroup.find('.kpiview_ctrlBtn').on('click',this.ctrlChartShow.bind(this));
	this.jqGroup.find('.kpiview_colconfig').on('click',this.kpiConfig.bind(this));
	for(var i=0;i<kpis.length;i++){
		var kpi=kpis[i];
		var chartComponent=new KpiView.ChartComponent(kpi,ec);
		chartComponent.index=i;
		this.chartComponents.push(chartComponent);
		jqChartPanel.append(chartComponent.jqChart);
	}
};
KpiView.ChartGroup.prototype.kpiConfig=function(e){
	var allCols=this.kpis;
	var selectedCols=[];
	var winWidth=500;
	var winHeight=300;
	var winX=($('body').width()-winWidth)/2;
	var winY=$(e.currentTarget).offset().top;
	var i=0;
	var groups=KpiView.GROUPS;
	
	
	var win=new LSMScreen.SimpleWindow({
		title:"指标配置",
		width:winWidth,
		height:winHeight,
		x:winX,
		y:winY,
		modal:true
	});
	$(".tempWinTitle").height(25);
	
	
	for(i=0;i<allCols.length;i++){
		var col=allCols[i];
		if(col.selected==true||col.selected==null){
			selectedCols.push(col);
		}
	}
	var selectedMap={};
	var html='<ul class="colchooser">';
	
	for(i=0;i<selectedCols.length;i++){
		selectedMap[selectedCols[i].key]=(i+1);
	}
	//先插入选中的排序好的列
	for(i=0;i<selectedCols.length;i++){
		var kpiConfig=selectedCols[i];
		var kpiId=kpiConfig.key;
		var kpiName=kpiConfig.name;
		var checked="";
		checked='checked="checked"';
		html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
	}
	//将未选中的列排在最后
	for(i=0;i<allCols.length;i++){
		var kpiConfig=allCols[i];
		var kpiId=kpiConfig.key;
		var kpiName=kpiConfig.name;
		var checked="";
		if(selectedMap[kpiId]){
		}else{
			html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
		}
		
	}
	
	
	html+="</ul>";
	html+='<div class="kpiChooserWinFoot" style="position:absolute;top:0px;">';
	html+="<div>";
	html+='<input type="button" class="btn btn-primary btn-xs" value="确定"></input>';
	html+="&nbsp;&nbsp;&nbsp;&nbsp;";
	html+='<input type="button" class="btn btn-primary btn-xs" value="取消"></input>';
	html+="</div>";
	html+="</div>";
	$(win.content).css("overflow","auto");
	$(win.content).html(html);
	var lisJQ=$(win.content).find("li");
	var lis=[];
	for(i=0;i<lisJQ.length;i++){
		lis.push(lisJQ[i]);
	}
	initLisEvent(lis);
	$(win.content).find(":button").on('click',function(evt){
		if($(evt.currentTarget).val()=="确定"){
			var oUl= $(".colchooser")[0];
			var aLi = oUl.getElementsByTagName("li");
			var ilength=aLi.length;//Math.min(list.length,this.showKpiCount);
			var allCols=[];
			var allColsMap={};
			var finalSelected=[];
			var sortArr=[];
			var i=0;
			var count=0;

			allCols=this.kpis;
			
			for(i=0;i<allCols.length;i++){
				var kpiId=allCols[i].key;
				allColsMap[kpiId]=allCols[i];
			}
			for(i=0;i<ilength;i++){
				var show=$(aLi[i]).find("input[type='checkbox']").is(':checked');
				var selectedId=$(aLi[i]).find("input").val();
				var left=$(aLi[i]).css("left").replace("px","");
				var top=$(aLi[i]).css("top").replace("px","");
				var sortValue=left*1+top*10000;
				var record=allColsMap[selectedId];
				record.selected=show;
				finalSelected.push(record);
				sortArr.push({index:count,sortValue:sortValue});
				count++;
				
			}
			//按top left 排序
			sortArr=sortArr.sort(function(a,b){return a["sortValue"]-b["sortValue"];});
			var sortCols=[];
			for(i=0;i<sortArr.length;i++){
				var sortRecord=sortArr[i];
				sortCols.push(finalSelected[sortRecord.index]);
			}
			var groups=KpiView.GROUPS;
			for(i=0;i<groups.length;i++){
				if(groups[i].group==this.groupName){
					groups[i].kpis=sortCols;
				}
			}
			var saveId=KpiView.CONFIG_ID;
			var dm=LSMScreen.DataManager.getInstance();
			dm.configOperate(
					{
						"data":{
							"id":saveId,
							"content":JSON.stringify(groups)
						}
					},
					function(){
						console.log(saveId+"保存成功");
						this.currentColumns=sortCols;
						window.location.href=window.location.href;
					}.bind(this),
					function(){console.log(saveId+"保存失败");}
			);
		}
		win.closeWin();
	}.bind(this));
};
KpiView.ChartGroup.prototype.showLoading=function(){
	var ilength=this.chartComponents.length;
	for(var i=0;i<ilength;i++){
		this.chartComponents[i].showLoading();
	}
};
KpiView.ChartGroup.prototype.hideLoading=function(){
	var ilength=this.chartComponents.length;
	for(var i=0;i<ilength;i++){
		this.chartComponents[i].hideLoading();
	}
};
KpiView.ChartGroup.prototype.updateChartsByData=function(list,type,source){
	var cmps=this.chartComponents;
	for(var i=0;i<cmps.length;i++){
		var cmp=cmps[i];
		var config=cmp.kpiConfig;
		if(config.source==source&&config.type==type){
			cmp.dataCache=list;
			if(cmp.jqChart.css('display')!='none'){
				cmp.updateChartByData(); 
			}
		}
	}
};
KpiView.ChartGroup.prototype.ctrlChartShow=function(e){
	if($(e.currentTarget).hasClass('kpiview_toCollapse')){
		$(e.currentTarget).removeClass('kpiview_toCollapse').addClass('kpiview_toExpand');
		this.hideCharts();
	}else if($(e.currentTarget).hasClass('kpiview_toExpand')){
		$(e.currentTarget).removeClass('kpiview_toExpand').addClass('kpiview_toCollapse');
		this.showCharts();
	}
};
KpiView.ChartGroup.prototype.showCharts=function(){
	var cmps=this.chartComponents;
	console.log(cmps.length);
	for(var i=0;i<cmps.length;i++){
		var cmp=cmps[i];
		cmp.show();
	}
};
KpiView.ChartGroup.prototype.hideCharts=function(){
	var cmps=this.chartComponents;
	for(var i=0;i<cmps.length;i++){
		var cmp=cmps[i];
		cmp.hide();
	}
};
//单个图表
KpiView.ChartComponent=function ()
{
	this.initialize.apply(this, arguments);
};
KpiView.ChartComponent.prototype.constructor=KpiView.ChartComponent;
KpiView.ChartComponent.prototype.dataCache=[];
KpiView.ChartComponent.prototype.kpiConfig={};
KpiView.ChartComponent.prototype.title='';
KpiView.ChartComponent.prototype.jqChart=null;
KpiView.ChartComponent.prototype.ec=null;
KpiView.ChartComponent.prototype.chart=null;
KpiView.ChartComponent.prototype.timeWin=null;
KpiView.ChartComponent.prototype.index=0;
KpiView.ChartComponent.prototype.colors=['#2883f3','#f0ff00','#05ff1d'];//,'#33cffc'
KpiView.ChartComponent.prototype.initialize=function(kpiConfig,ec){
	this.kpiConfig=kpiConfig;
	this.title=kpiConfig.name+'('+kpiConfig.unit+')';
	var visibleStyle='';
	if(this.kpiConfig.selected==false){
		visibleStyle='display:none;';
	}
	var html='<div class="kpiview_chart_parent" style="'+visibleStyle+'">'
				+'<div class="kpiview_chart_cmp_parent" ><div class="kpiview_chart_cmp"></div></div>'
				+'<div class="kpiview_charttitle">'+this.title+'</div>'
				+'<div class="kpiview_chartinfo"></div>'
//				+'<div class="kpiview_charttime" style="position:absolute;right:24px;top:3px;"></div>'
				+'<div class="kpiview_chartmax" style="position:absolute;right:5px;top:5px;"></div>'
			+'</div>';
	this.jqChart=$(html);
	this.jqChart.find('.kpiview_chartmax').on('click',this.toMax.bind(this));
	this.jqChart.find('.kpiview_charttime').on('click',this.showTimeChooser.bind(this));
	this.ec=ec;
	this.chart=ec.init(this.jqChart.find('.kpiview_chart_cmp')[0],'macarons');
	
};
KpiView.ChartComponent.prototype.showTimeChooser=function(e){
	if(this.timeWin==null){
		var docWidth=$('body').width();
		var winWidth=docWidth*0.24*0.9;
		var winHeight=110;
		var winX=this.jqChart.offset().left+winWidth*0.05;
		var winY=this.jqChart.offset().top+30;
		
		this.timeWin=new LSMScreen.SimpleWindow({
			title:"平时时间选择",
			width:winWidth,
			height:winHeight,
			x:winX,
			y:winY,
			modal:true,
			beforeClose:function(){
			}.bind(this)
		});
		var timeInputHtml='<div class="kpiview_timewin">'
							  +'平时：<input readonly="readonly" type="text" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd\'})" class="Wdate kpiview_timechooser" style="width:120px;height:25px;"/>'
							  +'&nbsp;&nbsp;<button type="button" class="kpiview_query btn btn-primary btn-xs active">查询</button>'
						  +'</div>';
		
		$(this.timeWin.content).html(timeInputHtml);
		$(this.timeWin.content).find('.kpiview_query').on('click',this.queryChart.bind(this));
		
		var date=new Date();
		date.setDate(date.getDate()-1);
		var startDateStr=date.Format('yyyy-MM-dd');
		$(this.timeWin.content).find('.kpiview_timechooser').val(startDateStr);
	}else{
		$('body').append(this.timeWin.win);
	}
	
};
KpiView.ChartComponent.prototype.toMax=function(e){
	var docWidth=$('body').width();
	var docHeight=$('body').height();
	var winWidth=docWidth*0.8;
	var winHeight=400;
	var win=new LSMScreen.SimpleWindow({
		title:this.title,
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)/2,
		y:50,
		modal:true,
		beforeClose:function(){
			this.jqChart.append($(win.content).find('.kpiview_chart_cmp_parent'));
			this.chart.resize();
		}.bind(this)
	});
	
	$(win.content).append(this.jqChart.find('.kpiview_chart_cmp_parent'));
	this.chart.resize();
};
KpiView.ChartComponent.prototype.show=function(){
	this.jqChart.css('display','inline-block');
	if(this.kpiConfig.selected==false){
		this.updateChartByData();
	}
};
KpiView.ChartComponent.prototype.hide=function(){
	if(this.kpiConfig.selected==false){
		this.jqChart.css('display','none');
	}
};
KpiView.ChartComponent.prototype.queryChart=function(e){
	var selectedDateStr=$(e.currentTarget).parent().find('.kpiview_timechooser').val();
	var selectedDate=new Date();
	if(selectedDateStr!=null&&selectedDateStr!=''){
		selectedDate = new Date(Date.parse((selectedDateStr+' 00:00:00').replace(/-/g,   "/")));
	}
	var nowParams=KpiView.GETNOWPARAM();
	this.showLoading();
	if(this.kpiConfig.source==KpiView.SOURCE_WS){
		var wsStart=nowParams.wsStart;
		var wsEnd=nowParams.wsEnd;
		var now=new Date(Date.parse((nowParams.streamTimeEnd.split(' ')[0]+' 00:00:00').replace(/-/g,   "/")));
		var deltaTime=now.getTime()-selectedDate.getTime();
		var mtime=deltaTime/1000/60
		
		var params={
			qry:this.kpiConfig.type,
			startTime:wsStart,
			endTime:wsEnd,
			mtime:mtime,
			callback:this.queryDataHandlerWs.bind(this)
		}
		KpiView.UPDATEWS(params);
	}else if(this.kpiConfig.source==KpiView.SOURCE_STREAM){
		var streamTimeBegin=nowParams.streamTimeBegin;
		var streamTimeEnd=nowParams.streamTimeEnd;
		
		var now=new Date(Date.parse((streamTimeEnd.split(' ')[0]+' 00:00:00').replace(/-/g,   "/")));
		var deltaTime=now.getTime()-selectedDate.getTime();
		
		var streamTimeBeginDate = new Date(Date.parse(streamTimeBegin.replace(/-/g,   "/")));
		var streamTimeEndDate = new Date(Date.parse(streamTimeEnd.replace(/-/g,   "/")));
		
		streamTimeBeginDate=new Date(streamTimeBeginDate.getTime()-deltaTime);
		streamTimeEndDate=new Date(streamTimeEndDate.getTime()-deltaTime);
		
		var streamTimeBeginCompare=streamTimeBeginDate.Format('yyyy-MM-dd hh:mm:00');
		var streamTimeEndCompare=streamTimeEndDate.Format('yyyy-MM-dd hh:mm:00');
		var indicatorNameList='time,'+this.kpiConfig.key+','+this.kpiConfig.key+'历史比';
		
		var streamParams={
			timeBegin:streamTimeBegin,
			timeEnd:streamTimeEnd,
			timeBeginCompare:streamTimeBeginCompare,
			timeEndCompare:streamTimeEndCompare,
			indicatorNameList:indicatorNameList,
			callback:this.queryDataHandlerStream.bind(this)
		}
		
		KpiView.UPDATESTREAM(streamParams);
	}
	
	this.timeWin.closeWin();
	
};
KpiView.ChartComponent.prototype.showLoading=function(){
	this.jqChart.mask(' ');
};
KpiView.ChartComponent.prototype.hideLoading=function(){
	this.jqChart.unmask();
};
KpiView.ChartComponent.prototype.queryDataHandlerWs=function(result){
	var wsData=result.data;
	this.dataCache=wsData;
	this.updateChartByData();
};
KpiView.ChartComponent.prototype.queryDataHandlerStream=function(result){
	var streamData=result;
	this.dataCache=streamData;
	this.updateChartByData();
};
KpiView.ChartComponent.prototype.updateChartByData=function(){
//	this.ecChart.setOption(option,true);
	this.chart=this.ec.init(this.jqChart.find('.kpiview_chart_cmp')[0],'macarons');
	this.hideLoading();
	var list=this.dataCache;
	var config=this.kpiConfig;
	var key=config.key;
	var type=config.type;
	var skip0=config.skip0;
	
	var yaxisName='('+config.unit+')';
	var xArr=[];
	var dataArrNow=[];
	var dataArrCompare=[];
	var dataArrLastYear=[];
	var legends=['当前','平时'];
	var lastValue='--';
	var lastTime='';
	
	
	
	if(config.source==KpiView.SOURCE_WS){
		for(var i=0;i<list.length;i++){
			var record=list[i];
			var time=record.time_id;
			var value=record[key];
			var compareValue=record[key+'_'];
			if(value==null){
				value=NaN;
			}else{
				value=(value*config.rate).toFixed(config.fixed);
			}
			if(compareValue==null){
				compareValue=NaN;
			}else{
				compareValue=(compareValue*config.rate).toFixed(config.fixed);
			}
			
			if(skip0==true&&value==0){
				continue;
			}
			
			lastValue=value;
			lastTime=time;
			time=time.substring(11,16);
			xArr.push(time);
			dataArrNow.push(value);
			dataArrCompare.push(compareValue);
			if(KpiView.LASTYEAR_MAP[key]==true){
				var lastYearRecord={};
				if(type==KpiView.TYPE_GSM){
					lastYearRecord=KpiView.GSM_LASTYEAR[time];
				}else{
					lastYearRecord=KpiView.LTE_LASTYEAR[time];
				}
				
				var lastYearValue=lastYearRecord[key];
				if(lastYearValue==null){
					lastYearValue=NaN;
				}else{
					lastYearValue=(lastYearValue*config.rate).toFixed(config.fixed);
				}
				dataArrLastYear.push(lastYearValue);
				
			}
		}
	}else if(config.source==KpiView.SOURCE_STREAM){
		for(var i=0;i<list.length;i++){
			var record=list[i];
			var time=record.time;
			var value=record[key];
			var compareValue=value/record[key+'历史比'];
			if(value==null){
				value=NaN;
				compareValue=NaN;
			}else{
				value=(value*config.rate).toFixed(config.fixed);
				compareValue=(compareValue*config.rate).toFixed(config.fixed);
			}
			if(skip0==true&&value==0){
				continue;
			}
			lastValue=value;
			lastTime=time;
			time=time.substring(11,16);
			xArr.push(time);
			dataArrNow.push(value);
			dataArrCompare.push(compareValue);
		}
	}
	
	if(lastTime==''){
		this.jqChart.find('.kpiview_chartinfo').text('');
	}else{
		var period=config.period;
		var date = new Date(Date.parse(lastTime.replace(/-/g,"/")));
		var start=date.Format('hh:mm');
		date.setMinutes(date.getMinutes()+period*1);
		var end=date.Format('hh:mm');
		var info='当前值:'+lastValue+' '+config.unit+''+'  /  时间:'+start+'-'+end;
		this.jqChart.find('.kpiview_chartinfo').text(info);
	}
	
	
	var lineColor=this.colors[this.index%this.colors.length];
	var series=[{
        name: '当前',
        type: 'line',
        data: dataArrNow
    },{
        name: '平时',
        type: 'line',
        data: dataArrCompare
    }];
	if(KpiView.LASTYEAR_MAP[key]==true){
		var series=[{
	        name: '当前',
	        type: 'line',
	        data: dataArrNow
	    },{
	        name: '平时',
	        type: 'line',
	        data: dataArrCompare
	    },{
	        name: '历史',
	        type: 'line',
	        data: dataArrLastYear
	    }];
		legends=['当前','平时','历史'];
	}
	
	var option = {
			color:[lineColor,'#ececec','#ffd9ff'],
			title: {
				text: config.name+'('+config.unit+')',
				show:false,
				x:'center',
				textStyle:{
            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor
            	}
				
			},
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	show : true,
		    	data:legends,
		    	y:'bottom',
		    	x:'center',
		    	textStyle:{
            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor
            	}
		    },
	        grid: {
	            x: 45,
	            y: 50,
	            x2: 25,
	            y2: 55,
	            borderWidth:0
	        },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : xArr,
		            axisLine:{show:true,lineStyle:{color:'#0d2a52',width:1}},
		            splitLine:{show:false},
		            axisLabel:{
		            	textStyle:{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor
		            	}
		            },
		            axisTick:{show:true,lineStyle:{color:'#fff'}}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            min:0,
		            max:config.ymax,
		            axisLine:{show:true,lineStyle:{color:'#0d2a52',width:1}},
		            splitLine:{show:true,lineStyle:{color:'#0d2a52'}},
		            splitArea:{show:false},
		            axisLabel:{
		            	textStyle:{color:LSMScreen.CHARTCONFIG.yAxisLabelColor}
		            }
		        }
		    ],
		    series : series
		};
	this.chart.resize();
	this.chart.setOption(option,true);
};





