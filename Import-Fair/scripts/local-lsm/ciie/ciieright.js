var CIIE=CIIE||{};
var BMapExtension=null;
var echarts=null;
CIIE.Screen=function ()
{
	this.initialize.apply(this,arguments);
};
CIIE.Screen.prototype.constructor=CIIE.Screen;
CIIE.Screen.prototype.lineWidth=5;
CIIE.Screen.prototype.chartLabelSize=24;
CIIE.Screen.prototype.hotspot=null;
CIIE.Screen.prototype.selectedHotspot=null;
CIIE.Screen.prototype.hotspotInfo=null;
CIIE.Screen.prototype.hotspotList=[];
CIIE.Screen.prototype.centerStreamCache=[];
CIIE.Screen.prototype.majorDataMap={};
CIIE.Screen.prototype.roamRankChartType='国际';
CIIE.Screen.prototype.steamNeiKpis='VOLTEeSRVCC成功率,HTTP响应成功率,HTTP响应时延,HTTP成功率,HTTP下行速率500k,'
	+'视频业务HTTP请求成功率,视频业务HTTP响应时延,'
	+'游戏业务HTTP请求成功率,游戏业务HTTP响应时延,'
	+'即时通信HTTP请求成功率,即时通信HTTP响应时延,'
	+'time';
CIIE.Screen.prototype.centerChartKpiConfig={
	'日累计核心区域用户数':{name:'核心区域用户数',key:'总用户数',hotType:'core',source:'streamDay',ratio:1,unit:'人',fixed:0},
	'日累计语音话务量':{name:'语音话务量',key:'volte_voice_teletraffic',source:'ws',ratio:1,unit:'Erl',fixed:1},
	'日累计数据流量':{name:'数据流量',key:'总流量',source:'streamDay',ratio:1/1024/1024,unit:'GB',fixed:2},
	'用户数':{name:'用户数',key:'总用户数',source:'stream',ratio:1,unit:'人',fixed:0}
};
CIIE.Screen.prototype.centerChartKpi={name:'用户数',key:'总用户数',source:'stream',ratio:1,unit:'人',fixed:0};


CIIE.Screen.prototype.centerKpiTop={
	key:'总用户数',
	name:'用户数',
	unit:'人',
	fakeValue:'--'
};
CIIE.Screen.prototype.centerKpis=[{
	key:'volte_voice_teletraffic',//gsm_teletraffic,volte_voice_teletraffic,volte_video_teletraffic
	name:'话务量',
	unit:'Erl',
	fakeValue:'--'
},{
	key:'总流量MB',
	name:'流量',
	unit:'MB',
	fakeValue:'--'
}];
                                
CIIE.Screen.prototype.hotspots=null;


CIIE.Screen.prototype.initialize=function(_hotspot){
	this.hotspot=_hotspot;
	this.selectedHotspot=_hotspot;
	this.dm=LSMScreen.DataManager.getInstance();
	//this.map=new CIIE.Map('map',this.hotspot,'topleft',BASEPATH,true);
	this.initTable();
	this.initAppTable();
	require(['echarts',  
	            'echarts/chart/line', 
	            'echarts/chart/bar',
	            'echarts/chart/funnel',
	            'echarts/chart/map',
	            'echarts/chart/pie',
	            'echarts/chart/radar'
	            ],this.initEcharts.bind(this));
	$('#hotListReturn').on('click',this.resetGridHot.bind(this));
	$('#terminalReturn').on('click',this.terminalReturn.bind(this));
	$('.rightTableTitleFunc').on('click',this.rightTableChange.bind(this));
	$('.ppTypeBtn').on('click',this.ppTypeChange.bind(this));
	$('.mtTypeBtn').on('click',this.mtTypeChange.bind(this));
	$('.needPause').on('mouseover',this.addPauseClass.bind(this));
	$('.needPause').on('mouseout',this.removePauseClass.bind(this));
	
	setInterval(this.update.bind(this),5*60*1000);
};
CIIE.Screen.prototype.addPauseClass=function(e){
	$(e.currentTarget).addClass('pauseHighLight');
};
CIIE.Screen.prototype.removePauseClass=function(e){
	$(e.currentTarget).removeClass('pauseHighLight');
};
CIIE.Screen.prototype.initEcharts=function(ec){
	this.ec=echarts=ec;
	this.ec=echarts;
	this.ecConfig = require('echarts/config');
	
	this.majorRankChart=echarts.init($("#majorRankChart")[0],'marcarons');
//	this.majorRankChart = new AnyChart(JSLIB+'/anychart/AnyChart.swf');
//	this.majorRankChart.width = $("#majorRankChart").width();
//	this.majorRankChart.height = $("#majorRankChart").height();
//	this.majorRankChart.wMode = "transparent";
//	this.majorRankChart.write('majorRankChart');
	
	this.terminalRankChart=echarts.init($("#terminalRankChart")[0],'marcarons');
	this.terminalRankChart.on(this.ecConfig.EVENT.CLICK, this.drillTerminalModel.bind(this));
	
//	this.terminalRankChart = new AnyChart(JSLIB+'/anychart/AnyChart.swf');
//	this.terminalRankChart.width = $("#terminalRankChart").width();
//	this.terminalRankChart.height = $("#terminalRankChart").height();
//	this.terminalRankChart.wMode = "transparent";
//	this.terminalRankChart.write('terminalRankChart');
	
	
	this.initBaseInfo();
};
CIIE.Screen.prototype.initBaseInfo=function(){
	this.dm.getBaseHotspotsList(null,function(list){
		var areas=[];
		for(var i=0;i<list.length;i++){
			if(list[i].hot_name==this.hotspot){
				this.dm.getBaseHotspots({id:list[i].id,isDefault:false},function(hotInfo){
					this.hotspotInfo=JSON.parse(hotInfo[0].content);
					
					this.centerChartKpi=this.centerChartKpiConfig['日累计核心区域用户数'];
					this.centerChartKpi.hot=this.hotspotInfo.hotCellInName;
					//hotCellInName lat lon
					this.dm.getSubHotspots({hotspot:this.hotspot},this.subHotspotDataHandler.bind(this));
				}.bind(this));
				break;
			}
		}
		
	}.bind(this));
};
CIIE.Screen.prototype.update=function(){
	this.updateCenter();
	
	this.updateGrid();
	
	this.updateMajorRank();
	
	this.updateAppRank();
	
	this.updateTerminalRank();
};

CIIE.Screen.prototype.refreshTime=function(){
	var date=new Date();
	var space='        ';
	var showTime=date.Format('yyyy-MM-dd'+space+'hh:mm:ss');
	var weekday=new Array(7);
	weekday[0]="星期日";
	weekday[1]="星期一";
	weekday[2]="星期二";
	weekday[3]="星期三";
	weekday[4]="星期四";
	weekday[5]="星期五";
	weekday[6]="星期六";
	showTime+=space+weekday[date.getDay()];
	$('#screenTitleTime').text(showTime);
};

CIIE.Screen.prototype.mtTypeChange=function(e){
	if($(e.currentTarget).hasClass('btn-major')){
		$('.rankchart').css('display','none');
		$('.rankchart:eq(1)').css('display','block');
	}else if($(e.currentTarget).hasClass('btn-terminal')){
		$('.rankchart').css('display','none');
		$('.rankchart:eq(0)').css('display','block');
	}
};
CIIE.Screen.prototype.ppTypeChange=function(e){
	if($(e.currentTarget).hasClass('btn-higher')){
		$('.pptable').css('display','none');
		$('#pplow').css('display','block');
	}else if($(e.currentTarget).hasClass('btn-lower')){
		$('.pptable').css('display','none');
		$('#pphigh').css('display','block');
	}
};

CIIE.Screen.prototype.roamTypeChange=function(e){
	var type=$(e.currentTarget).text();
	this.roamRankChartType=type;
	var list=$('.roamTypeBtn');
	$('.roamTypeBtn').removeClass('btn-primary');
	$('.roamTypeBtn').removeClass('btn-default');
	for(var i=0;i<list.length;i++){
		if($(list[i]).text()==type){
			$(list[i]).addClass('btn-primary');
		}else{
			$(list[i]).addClass('btn-default');
		}
	}
	this.updateRoam();
};
CIIE.Screen.prototype.checkRoamDisplay=function(e){
	var type=this.roamRankChartType;
	var list=$('.roamTypeBtn');
	$('.roamChart').css('display','none');
	for(var i=0;i<list.length;i++){
		if($(list[i]).text()==type){
			$('.'+$(list[i]).attr('target')).css('display','block');
			break;
		}else{
		}
	}
};
CIIE.Screen.prototype.modalConfirm=function(e){
	var title=$('#modalWinTitle').text();
	if(title=='网络指标配置'){
		var list=this.netQualityKpisList;
		var allKpisMap={};
		var finalSelectedMap={};
		var finalSelected=[];
		var sortArr=[];
		var finalAll=[];
		var sortArrAll=[];
		var i=0;
		var aLi=$('#modalWinBody').find("li");
		var count=0;
		for(i=0;i<list.length;i++){
			allKpisMap[list[i].key]=list[i];
		}
		for(i=0;i<aLi.length;i++){
			var show=$(aLi[i]).find("input[type='checkbox']").is(':checked');
			var selectedId=$(aLi[i]).find("input").val();
			var left=$(aLi[i]).css("left").replace("px","");
			var top=$(aLi[i]).css("top").replace("px","");
			var sortValue=left*1+top*10000;
			if(show==true){
				finalSelectedMap[selectedId]=true;
				finalSelected.push(allKpisMap[selectedId]);
				sortArr.push({index:count,sortValue:sortValue});
				count++;
			}
			finalAll.push(allKpisMap[selectedId]);
			sortArrAll.push({index:i,sortValue:sortValue});
		}
		//按top left 排序
		sortArrAll=sortArrAll.sort(function(a,b){return a["sortValue"]-b["sortValue"];});
		sortArr=sortArr.sort(function(a,b){return a["sortValue"]-b["sortValue"];});
		
		var sortKpi=[];
		var sortKpiAll=[];
		
		for(i=0;i<sortArr.length;i++){
			var sortRecord=sortArr[i];
			sortKpi.push(finalSelected[sortRecord.index]);
		}
		for(i=0;i<sortArrAll.length;i++){
			var sortRecordAll=sortArrAll[i];
			var kpiInfoRecord=finalAll[sortRecordAll.index];
			sortKpiAll.push(kpiInfoRecord);
			sortKpiAll[i].selected=finalSelectedMap[kpiInfoRecord.key]==true;
		}
		this.netQualityKpisList=sortKpiAll;
		this.netQualityKpis=sortKpiAll;
		this.drawNetQualityKpis();
		this.updateNEI();
	}
	$('#modalWin').modal('hide');
	
};
CIIE.Screen.prototype.kpiconfig=function(e){
//	key:'VOLTEeSRVCC成功率',
//	name:'ESRVCC切换成功率',
//	unit:'%',
//	ratio:100,
//	fixed:2
	var selectedMap={};
	var list=this.netQualityKpisList;
	var selectedList=[];
	var html='<ul class="colchooser">';
	var i=0;
	for(i=0;i<list.length;i++){
		if(list[i].selected==true){
			selectedList.push(list[i]);
			selectedMap[list[i].key]=true;
		}
		
	}
	//先插入选中的排序好的列
	for(i=0;i<selectedList.length;i++){
		var kpiConfig=selectedList[i];
		var kpiId=kpiConfig.key;
		var kpiName=kpiConfig.name;
		var checked="";
		checked='checked="checked"';
		html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
	}
	//将未选中的列排在最后
	for(i=0;i<list.length;i++){
		var kpiConfig=list[i];
		var kpiId=kpiConfig.key;
		var kpiName=kpiConfig.name;
		var checked="";
		if(selectedMap[kpiId]!=null){
		}else{
			html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
		}
		
	}
	
	
	html+="</ul>";
	
	$('#modalWinTitle').text('网络指标配置');
	$('#modalWinBody').html('');
	$('#modalWin').modal();
	$('#modalWinBody').html(html);
	
	setTimeout(function(){
		var lisJQ=$('#modalWinBody').find("li");
		var lis=[];
		for(i=0;i<lisJQ.length;i++){
			lis.push(lisJQ[i]);
		}
		initLisEvent(lis);
	},2000);
	
	
};
CIIE.Screen.prototype.rightTableChange=function(e){
	var title=$(e.currentTarget).attr('name');
	if(title=='场馆列表'){
		$('#rightTableTitle').text('小区列表');
		$('#rightTableIcon').removeClass('icon-hot');
		$('#rightTableIcon').addClass('icon-cell');
		$('.rightTableTitleFunc').attr('name','小区列表');
		$('#jqgh_table_hot_name').text('小区名称');
	}else{
		$('#rightTableTitle').text('场馆列表');
		$('#rightTableIcon').removeClass('icon-cell');
		$('#rightTableIcon').addClass('icon-hot');
		$('.rightTableTitleFunc').attr('name','场馆列表');
		$('#jqgh_table_hot_name').text('场馆名称');
	}
	this.updateGrid();
};
CIIE.Screen.prototype.alarmNumPlateClick=function(e){
	$('#modalWin').modal();
	var id=$(e.currentTarget).attr('id');
	var colNames=[];
	var cols=[];
	var dataList=[];
	var gridHeight=460;
	var gridWidth=820;
	$('#modalWinBody').html('<table id="modalWinTable"></table>');
	switch(id){
		case 'neAlarmCount':
			$('#modalWinTitle').text('网元告警');
			cols=[
				{colName:'时间',name : 'time',index : 'time',width : 260},
				{colName:'告警对象名称',name : 'hot_name',index : 'hot_name',width : 260},
				{colName:'告警标题',name : 'title',index : 'title',width : 300},
				{colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 260},
				{colName:'告警流水号',name : 'record_id',index : 'record_id',width : 260},
				{colName:'告警级别',name : 'severity',index : 'severity',width : 0,hidden:true}
			];
			dataList=this.neAlarmList;
			break;
		case 'performanceAlarmCount':
			$('#modalWinTitle').text('性能告警');
			cols=[
			      {colName:'时间',name : 'TIME_STAMP',index : 'TIME_STAMP',width : 260},
		          {colName:'对象名称',name : 'DS_NAME',index : 'DS_NAME',width : 260},
		          {colName:'下限',name : 'FLOOR_LIMIT',index : 'FLOOR_LIMIT',width : 200},
		          {colName:'上限',name : 'UPPER_LIMIT',index : 'UPPER_LIMIT',width : 200},
		          {colName:'告警正文',name : 'CONTENT',index : 'CONTENT',width : 800},
		          {colName:'告警级别',name : 'ALARM_LEVEL',index : 'ALARM_LEVEL',width : 0,hidden:true}
		    ];
			dataList=this.performanceAlarmList;
			break;
		case 'complainCount':
			$('#modalWinTitle').text('用户投诉');
			cols=[
			      {colName:'受理时间',name : 'KF_ACCEPT_TIME',index : 'KF_ACCEPT_TIME',width : 260},
		          {colName:'工单号',name : 'KF_ORDERID',index : 'KF_ORDERID',width : 260},
		          {colName:'场馆',name : 'DISNEYLAND_SITE',index : 'DISNEYLAND_SITE',width : 260},
		          {colName:'业务类型',name : 'BUSINESS_TYPE',index : 'BUSINESS_TYPE',width : 800}
			];
			dataList=this.complainList;
			break;
	}
	for(var i=0;i<cols.length;i++){
		colNames.push(cols[i].colName);
	}
	$('#modalWinTable').jqGrid({
        datatype : function(){},
        colNames:colNames,
        colModel : cols,
        loadui:'disable',
        height:gridHeight,
        width:gridWidth,
        rowNum:1000,
        autoWidth:true,
        shrinkToFit:true,
        autoScroll: false
	});
	$('#modalWinTable')[0].addJSONData(dataList);
};
CIIE.Screen.prototype.kpiClick=function(e){
	var kpi=$(e.currentTarget).attr('kpi');
	this.centerChartKpi=this.centerChartKpiConfig[kpi];
	if(kpi=='日累计核心区域用户数'){
		this.centerChartKpi.hot=this.hotspotInfo.hotCellInName;
	}else{
		this.centerChartKpi.hot=this.hotspot;
	}
	this.updateCenterChart(true);
};
CIIE.Screen.prototype.updateNEI=function(){
	this.dm.getHotSpotsKpis([this.hotspot],null,null,this.neiStreamNowHandler.bind(this),null,false,this.steamNeiKpis);
	var paramLte = 
	{
		"hotspot":this.hotspot,
		"timeRange":"false",
		"group":"all",
		"max_threads":"10",
		"domains":"4g",
		"tb_domains":"4g",
		"hb_domains":"4g",
		"current_day_domains":"4g",
		"tb_time_minutes":1440,
		"hb_time_minutes":15,
		"all_fields":null,
		"hot_fields":null
	};
	this.dm.getXpmData(paramLte, 
			this.neiWsHandler.bind(this));
	
	var paramGsm = 
	{
		"hotspot":this.hotspot,
		"timeRange":"false",
		"group":"all",
		"max_threads":"10",
		"domains":"2g",
		"tb_domains":"2g",
		"hb_domains":"2g",
		"current_day_domains":"2g",
		"tb_time_minutes":1440,
		"hb_time_minutes":60,
		"all_fields":null,
		"hot_fields":null
	};
	this.dm.getXpmData(paramGsm, 
			this.neiWsHandler.bind(this));
	
	var paramAll = 
	{
		timeType:'min',
		hbm:1,
		tbm:7
		
	};
	this.dm.getAllKpiRecordWsNew2(paramAll, 
			this.neiWsAllHandler.bind(this));
	
};
CIIE.Screen.prototype.setNeiWsKpi=function(record,source){
	for(var key in record){
		var domId='netQuality_'+this.encodeDomId(key);
		var hbDomId='netQuality_hb_'+this.encodeDomId(key);
		var tbDomId='netQuality_tb_'+this.encodeDomId(key);
		var hb=record[key+'Hb']*1;
		var tb=record[key+'Tb']*1;
		var normal=record[key]*1;
		var domSource=$('#'+domId).attr('source');
		if($('#'+domId).length>0&&domSource==source){
			$('#'+domId).text(normal);
			
			var ratioHb=((normal-hb)/hb*100).toFixed(1);
			var absHb=Math.abs(ratioHb)+'%';
			
			
			if(ratioHb>0){
				$('#'+hbDomId).prev().attr('class','icon-up');
			}else if(ratioHb<0){
				$('#'+hbDomId).prev().attr('class','icon-down');
			}else{
				$('#'+hbDomId).prev().attr('class','');
			}
			if(isNaN(ratioHb)||hb==0){
				$('#'+hbDomId).text('--');
			}else{
				$('#'+hbDomId).text(absHb);
				$('#'+hbDomId).prev().attr('class','');
			}
			
			var ratioTb=((normal-tb)/tb*100).toFixed(1);
			var absTb=Math.abs(ratioTb)+'%';
			
			if(ratioTb>0){
				$('#'+tbDomId).prev().attr('class','icon-up');
			}else if(ratioTb<0){
				$('#'+tbDomId).prev().attr('class','icon-down');
			}else{
				$('#'+tbDomId).prev().attr('class','');
			}
			if(isNaN(ratioTb)||tb==0){
				$('#'+tbDomId).text('--');
				$('#'+tbDomId).prev().attr('class','');
			}else{
				$('#'+tbDomId).text(absTb);
			}
			
		}
	}
};
CIIE.Screen.prototype.neiWsHandler=function(result){
	var record=result;
	this.setNeiWsKpi(record,'ws');
};
CIIE.Screen.prototype.neiWsAllHandler=function(result){
	var list=[];
	for(var time in result){
		result[time].time=Date.parse(time.replace(/-/g,"/"));
		list.push(result[time]);
	}
	list=list.sort(function(a,b){return b.time-a.time;});
	
	var record={};
	var key='';
	if(list.length>0){
		record=$.extend(record,list[0]);
	}
	if(list.length>1){
		for(key in list[1]){
			record[key+'Hb']=list[1][key];
		}
	}
	if(list.length>2){
		for(key in list[2]){
			record[key+'Tb']=list[2][key];
		}
	}
	this.setNeiWsKpi(record,'wsAll');
	
};
CIIE.Screen.prototype.neiStreamNowHandler=function(result){
	var record=result[this.hotspot];
	for(var key in record){
		var domId='netQuality_'+this.encodeDomId(key);
		$('#'+domId).text(SUtils.getConvertedKpiValue(record,key));
	}
	var _format="yyyy-MM-dd hh:mm:ss";
	var hbTime=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack-5,SUtils.TIME_TYPE.MIN, _format);
	var tbTime=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack-24*60,SUtils.TIME_TYPE.MIN, _format);
	this.dm.getHotSpotsKpis([this.hotspot],hbTime,null,this.neiStreamHbHandler.bind(this),null,false,this.steamNeiKpis);
	this.dm.getHotSpotsKpis([this.hotspot],tbTime,null,this.neiStreamTbHandler.bind(this),null,false,this.steamNeiKpis);
};
CIIE.Screen.prototype.neiStreamHbHandler=function(result){
	var record=result[this.hotspot];
	for(var key in record){
		var domId='netQuality_'+this.encodeDomId(key);
		var cmpDomId='netQuality_hb_'+this.encodeDomId(key);
		var value=SUtils.getConvertedKpiValue(record,key)*1;
		var normal=$('#'+domId).text()*1;
		var ratio=((normal-value)/value*100).toFixed(1);
		var abs=Math.abs(ratio)+'%';
		$('#'+cmpDomId).text(abs);
		if(value==0){
			$('#'+cmpDomId).text('--');
			$('#'+cmpDomId).prev().attr('class','');
		}else if(ratio>0){
			$('#'+cmpDomId).prev().attr('class','icon-up');
		}else if(ratio<0){
			$('#'+cmpDomId).prev().attr('class','icon-down');
		}else {
			$('#'+cmpDomId).prev().attr('class','');
		}
		
	}
};
CIIE.Screen.prototype.neiStreamTbHandler=function(result){
	var record=result[this.hotspot];
	for(var key in record){
		var domId='netQuality_'+this.encodeDomId(key);
		var cmpDomId='netQuality_tb_'+this.encodeDomId(key);
		var value=SUtils.getConvertedKpiValue(record,key)*1;
		var normal=$('#'+domId).text()*1;
		var ratio=((normal-value)/value*100).toFixed(1);
		var abs=Math.abs(ratio)+'%';
		$('#'+cmpDomId).text(abs);
		if(value==0){
			$('#'+cmpDomId).text('--');
			$('#'+cmpDomId).prev().attr('class','');
		}else if(ratio>0){
			$('#'+cmpDomId).prev().attr('class','icon-up');
		}else if(ratio<0){
			$('#'+cmpDomId).prev().attr('class','icon-down');
		}else{
			$('#'+cmpDomId).prev().attr('class','');
		}
	}
};
CIIE.Screen.prototype.updateCenterChart=function(showLoading){
	var kpiConfig=this.centerChartKpi;
	$('#centerChartTitle').text(kpiConfig.name);
	if(showLoading){
		$('#centerChartParent').mask(' ');
	}
	switch(kpiConfig.source){
		case 'streamDay':
			this.updateStreamDay();
			break;
		case 'wsDay':
			this.updateWsDay();
			break;
		case 'wsAll':
			this.updateWs();
			break;
		case 'stream':
			this.updateStream();
			break;
		case 'ws':
			this.updateWs();
			break;
	}
};
//中间地图联动///////////////////////////////////////
CIIE.Screen.prototype.updateStreamDay=function(){
	
	var kpiConfig=this.centerChartKpi;
	var format="yyyy-MM-dd hh:mm:ss";
	var config={
		hotspot:kpiConfig.hot,
		timeBegin:SUtils.getDiffDateTimeFromNow(-4,SUtils.TIME_TYPE.HOUR, format),
		timeEnd:SUtils.getNowDateTime(format),
		timeBeginCompare:SUtils.getDiffDateTimeFromNow(-28,SUtils.TIME_TYPE.HOUR, format),
		timeEndCompare:SUtils.getDiffDateTimeFromNow(-24,SUtils.TIME_TYPE.HOUR, format)
	}; 
	this.dm.getHotSpotCustomerCountAndFlowCompareTrend(config, this.drawCenterChartStreamDay.bind(this));
};
CIIE.Screen.prototype.updateWsDay=function(){
	
};
CIIE.Screen.prototype.updateStream=function(){
	var kpiConfig=this.centerChartKpi;
	this.dm.getHotSpotsKpisCompared(kpiConfig.hot, null, null, null, null,null,
			this.drawCenterChartStream.bind(this),null,false,kpiConfig.key+','+kpiConfig.key+'历史比,time');
};
CIIE.Screen.prototype.updateWs=function(){
	var kpiConfig=this.centerChartKpi;
	var _params = 
	{
	    hotspot:kpiConfig.hot,    
	    timeRange:"true",
	    group:"all",            
	    max_threads:"10",
	    "domains": "2g,4g",
	    "tb_domains": "2g,4g",
	    "current_day_domains": "2g,4g",
		tb_time_minutes:1440,
		all_fields:null,
		hot_fields:null
	};
	this.dm.getXpmData(_params, 
			this.drawCenterChartWs.bind(this));
};

CIIE.Screen.prototype.drawCenterChartStreamDay=function(result){
	if(result==null||isNaN(result.length)){
		result=[];
	}
	result=result.reverse();//反向数组
	this.drawCenterChartStream(result);
};
CIIE.Screen.prototype.drawCenterChartStream=function(result){
	$('#demo').css('display','block');
	$('#centerChartParent').unmask();
	var kpiConfig=this.centerChartKpi;
	var xArr=[];
	var userArr=[];
	var userArrLast=[];
	var userArrLastBase=[];
	var kpiKey=kpiConfig.key;
	result=result.reverse();//反向数组
	if(result==null||isNaN(result.length)){
		result=[];
	}
	var last='--';
	var lastTime='--:--';
	var i=0;
	for(i=0;i<result.length;i++){
		var record=result[i];
		var time=record.time;
		var hour=time.substring(11,16);
		xArr.push(hour);
		last=(record[kpiKey]*kpiConfig.ratio).toFixed(kpiConfig.toFixed);
		lastTime=hour;
		var lastDay=(record[kpiKey]/record[kpiKey+"历史比"]*kpiConfig.ratio).toFixed(kpiConfig.toFixed);
		if(kpiKey=='VOLTEeSRVCC成功率'&&last==0){
			last=100;
		}
		if(kpiKey=='VOLTEeSRVCC成功率'&&lastDay==0){
			lastDay=100;
		}
		userArr.push(last);
		userArrLast.push(lastDay);
	}
	$('#centerChartTime').text('('+last+kpiConfig.unit+')'+'【'+lastTime+'】');
	
	var option = {
			color:['#ffa526','#1991e9','#1991e9'],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['昨日','今日'],
		        textStyle:{color:'#ffffff'}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    grid:{
		    	borderWidth:0,
		    	x:100,
		    	y:30,
		    	x2:0,
		    	y2:30
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : xArr,
		            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            splitLine:{show:false},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        },{
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    series : [{
	        	name:'今日',
	            type:'bar',
	            symbol:'emptyCircle',
	            data:userArr,
	            smooth:true,
	            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
	        },{
		            name:'昨日',
		            type:'line',
		            symbol:'rectangle',
		            showAllSymbol:true,
		            symbolSize:[6,2],
		            data:userArrLast,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:0}}}
		    }]
		};
	
	this.userChart.setOption(option,true);

};
CIIE.Screen.prototype.drawCenterChartWs=function(result){
	$('#centerChartParent').unmask();
	var kpiConfig=this.centerChartKpi;
	var xArr=[];
	var userArr=[];
	var userArrLast=[];
	
	var kpiKey=kpiConfig.key;
	
	if(result==null||isNaN(result.length)){
		result=[];
	}
	var last='--';
	var lastTime='--:--';
	for(var i=0;i<result.length;i++){
		var record=result[i];
		var time=record.time;
		var hour=time.substring(11,16);
		xArr.push(hour);
		last=record[kpiKey];
		lastTime=hour;
		userArr.push(record[kpiKey]);
		userArrLast.push(record[kpiKey+'Tb']);
	}
	$('#centerChartTime').text('('+last+kpiConfig.unit+')'+'【'+lastTime+'】');
	
	var option = {
			color:['#e1ff00','#09ddef'],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['昨日','今日'],
		        textStyle:{color:'#ffffff'}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    grid:{
		    	borderWidth:0,
		    	x:100,
		    	y:30,
		    	x2:50,
		    	y2:30
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : xArr,
		            axisLine:{show:true,lineStyle:{color:'#adc7dd'}},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            splitLine:{show:false},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        },{
		            type : 'value',
		            axisLine:{show:false},
		            splitLine:{show:false},
		            axisLabel:{textStyle:{color:'#adc7dd',fontSize:this.chartLabelSize}},
		            axisTick:{show:true,lineStyle:{color:'#adc7dd'}}
		        }
		    ],
		    series : [
		        {
		            name:'昨日',
		            type:'line',
		            symbol:'emptyCircle',
		            data:userArrLast,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
		        },{
		        	name:'今日',
		            type:'line',
		            symbol:'emptyCircle',
		            data:userArr,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
		        }
		        
		    ]
		};
	
	this.userChart.setOption(option,true);

};
//中间地图联动 END///////////////////////////////////////
CIIE.Screen.prototype.updateTerminalRank=function(terminal_brand){
	var queryConfig={
		topN:7,
		type:"brand",
		terminal_brand:"",
		hotspot:this.selectedHotspot
		
	};
	if(terminal_brand!=null&&terminal_brand!=''){
		queryConfig.type='model';
		queryConfig.terminal_brand=terminal_brand;
		$('#terminalRankTitle').text(terminal_brand+'型号排名');
	}else{
		$('#terminalRankTitle').text('终端排名');
	}
	this.dm.getTerminalRankByHot(queryConfig,function(result){
		this.drawTerminalRankChart(result);
	}.bind(this));
	
};
CIIE.Screen.prototype.terminalReturn=function(e){
	$('#terminalReturn').css('display','none');
	this.updateTerminalRank();
};
CIIE.Screen.prototype.drillTerminalModel=function(e){
	if($('#terminalReturn').css('display')=='none'){
		var brand=e.name;
		if(brand!='其他'){
			this.updateTerminalRank(brand);
			$('#terminalReturn').css('display','block');
		}
	}
};
CIIE.Screen.prototype.drawTerminalRankChart=function(result){
	//有色圆环样式
	var dataStyle = {
	    normal: {
	        label: {
	        	show:true,
	        	position:"outter",
	        	textStyle:{fontSize:this.chartLabelSize},
	        	formatter:"{b}:\n{c}%"
	        },
	        labelLine: {show:true,length:20}
	    }
	};
	var datas=[];
	var legends=[];
	var othersValue=0;
	var othersName='其他';
	for(var i=0;i<result.length;i++){
		var record=result[i];
		var terminalCnt=record.device_count;
		var brand=record.terminal_brand;
		var model=record.terminal_model;
		var total=record.device_total_count;
		var showName=brand;
		var showCnt=terminalCnt;//(terminalCnt/10000).toFixed(0);
		var rank=i+1;
		if(i==0){
			max=terminalCnt;
		}
		if(model!=null){
			brand='';
			showName=model;
			seriesName='型号';
		}
		var value=terminalCnt/total*100;
		if(value<5){
			othersValue+=value;
		}else{
			legends.push(showName);
			datas.push({value:(value).toFixed(2), name:showName});
		}
	}
	if(othersValue>0){
		legends.push(othersName);
		datas.push({value:(othersValue).toFixed(2), name:othersName});
	}
	//datas.sort(function(a,b){return b["value"]-a["value"];});//按value 降序
	var series=[{
            name:'',
            type:'pie',
            clockWise:false,
            radius : [0, '65%'],
            itemStyle : dataStyle,
            data:datas
        }];
	var option=this.getOptionByData(legends, series,{show:false});
	option.color=['#aee9b9','#54cbed','#5491ec','#715bee','#bf5bef','#e65c5c','#f0c044'];
	this.terminalRankChart.setOption(option,true);
	this.terminalRankChart.refresh();
};
//CIIE.Screen.prototype.drawTerminalRankChart=function(result){
//	var max=0;
//	var legend=[];
//	var datas=[];
//	var seriesName='品牌';
//	$('.cls-16').text('--');
//	$('.cls-18').text('--');
//	for(var i=0;i<result.length;i++){
//		var record=result[i];
//		var terminalCnt=record.device_count;
//		var brand=record.terminal_brand;
//		var model=record.terminal_model;
//		var total=record.device_total_count;
//		var showName=brand;
//		var showCnt=terminalCnt;//(terminalCnt/10000).toFixed(0);
//		var rank=i+1;
//		if(i==0){
//			max=terminalCnt;
//		}
//		var maxBarWidth=290;
//		var barPercent=terminalCnt/max;
//		var barWidth=barPercent*maxBarWidth;
//		var rankColor='';
//		if(rank==1){
//			rankColor="background:#f1028d;";
//		}else if(rank==2){
//			rankColor="background:#fea945;";
//		}else if(rank==3){
//			rankColor="background:#047ec1;";
//		}
//		if(model!=null){
//			brand='';
//			showName=model;
//			seriesName='型号';
//		}
//		legend.push(showName);
////		var value=(barPercent*100).toFixed(2);
//		var value=100-(100/result.length)*(i);
//		datas.push({value:value, name:showName});
//		
//		$('#rank'+i).text(showName);
//		$('#rank'+i+'_value').text((terminalCnt/total*100).toFixed(2)+'%');
//		
//		$('.pyramid'+i).attr('name',showName);
//		
//	}
//
//};
//CIIE.Screen.prototype.drawTerminalRankChart=function(result){
//	var max=0;
//	var html='';
//	for(var i=0;i<result.length;i++){
//		var record=result[i];
//		var terminalCnt=record.device_count;
//		var brand=record.terminal_brand;
//		var model=record.terminal_model;
//		var showName=brand;
//		var showCnt=terminalCnt;//(terminalCnt/10000).toFixed(0);
//		var rank=i+1;
//		if(i==0){
//			max=terminalCnt;
//		}
//		var maxBarWidth=290;
//		var barPercent=terminalCnt/max;
//		var barWidth=barPercent*maxBarWidth;
//		var rankColor='';
//		if(rank==1){
//			rankColor="background:#f1028d;";
//		}else if(rank==2){
//			rankColor="background:#fea945;";
//		}else if(rank==3){
//			rankColor="background:#047ec1;";
//		}
//		if(model!=null){
//			brand='';
//			showName=model;
//		}
//		var div='<div class="terminalRow" style="width:100%;height:30px;margin-top:25px;font-size:24px;cursor:pointer;" brand="'+brand+'">'
//				+'<div style="width:35px;height:35px;border-radius:35px;float:left;text-align:center;'+rankColor+'">'+rank+'</div>'
//				+'<div style="width:115px;height:35px;float:left;text-align:right;">'+showName+'</div>'
//				+'<div class="gradientBar" style="margin-top:5px;margin-left:5px;width:'+barWidth+'px;height:25px;float:left;"></div>'
//				+'<div style="color:#49deee;margin-left:5px;float:left;font-weight:bold;">'+showCnt+'</div>'
//				+'</div>';
//		div+='<div style="clear:both;"></div>';
//		html+=div;
//	}
//	$('#terminalrankChart').html(html);
//	
//	$('.terminalRow').on('click',this.terminalBrandClick.bind(this));
//};
CIIE.Screen.prototype.terminalBrandClick=function(e){
	var brand=$(e.currentTarget).attr('brand');
	this.updateTerminalRank(brand);
};
CIIE.Screen.prototype.roamChartPlay=function(e){
	if($('.roamRankChart').css('display')=='none'){
		$('.roamChinaChart').css('display','none');
		$('.roamWorldChart').css('display','none');
		$('.roamRankChart').css('display','block');
		if(this.roamRankChartType=='省际'){
			$('.roamChinaTotal').css('display','block');
		}else if(this.roamRankChartType=='国际'){
			$('.roamWorldTotal').css('display','block');
		}
		this.drawRoamRankChart();
	}else{
		this.checkRoamDisplay();
	}
};

CIIE.Screen.prototype.updateRoam=function(){
	this.checkRoamDisplay();
	if(this.roamRankChartType=='国际'){
		this.dm.getRightScreenRoamDataIntl({hot_name:this.hotspot},this.contryRoamDataHandler.bind(this));
	}else if(this.roamRankChartType=='省际'){
		this.dm.getRightScreenRoamDataPro({hot_name:this.hotspot},this.provinceRoamDataHandler.bind(this));
	}
};
CIIE.Screen.prototype.contryRoamDataHandler=function(result){
	var arr=result.data.datas;
	this.internationalCache=arr;
	var total=arr[0].user_cnt_all*1;
	var totalStr=total+'';
	this.countryTotal=total;
	var list=$('.intlroamuser');
	var lastIndex=list.length-1;
	for(var i=totalStr.length-1;i>=0;i--){
		$(list[lastIndex]).text(totalStr[i]);
		lastIndex--;
	}
	this.drawWorldChart(this.internationalCache);
};
CIIE.Screen.prototype.provinceRoamDataHandler=function(result){
	var arr=result.data.datas;
	this.interprovinceCache=arr;
	var total=arr[0].user_cnt_all*1;
	this.provinceTotal=total;
	var totalStr=total+'';
	var list=$('.proroamuser');
	var lastIndex=list.length-1;
	for(var i=totalStr.length-1;i>=0;i--){
		$(list[lastIndex]).text(totalStr[i]);
		lastIndex--;
	}
	//this.drawRoamPieChart(this.countryTotal,this.provinceTotal);
	
	//this.drawRoamRankChart();
	
	this.drawChinaChart(this.interprovinceCache);
};
CIIE.Screen.prototype.drawRoamRankChart=function(){

	var xArr=[];
	var userArr=[];
	var type=this.roamRankChartType;
	var xKey='';
	var list=[];
	if(type=='国际'){
		xKey='intl_name';
		list=this.internationalCache;
	}else{
		xKey='pro_name';
		list=this.interprovinceCache;
	}
	if(list==null){
		return;
	}
	for(var i=0;i<list.length;i++){
		xArr.push(list[i][xKey].split('(')[0]);
		userArr.push(list[i]['user_cnt']);
	}
	userArr=userArr.sort(function(a,b){return b-a;});
	var option = {
			color:['#41c450','#f9a03c'],
		    title : {
		        show:false
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['用户数'],
		        show:false,
		        textStyle:{color:'#ffffff'}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    grid:{
		    	borderWidth:0,
		    	x:70,
		    	y:70,
		    	x2:50,
		    	y2:50
		    },
		    yAxis : [{
	            type : 'value',
	            axisLine:{show:false},
	            splitLine:{show:false},
	            axisLabel:{textStyle:{color:'#ffffff',fontSize:this.chartLabelSize*0.7}},
	            axisTick:{show:true,lineStyle:{color:'#ffffff'}}
	        }],
		    xAxis : [{
	            type : 'category',
	            data : xArr,
	            axisLine:{show:true,lineStyle:{color:'#ffffff'}},
	            axisLabel:{textStyle:{color:'#ffffff',fontSize:this.chartLabelSize*0.7}},
	            splitLine:{show:false}
	        }],
		    series : [
		        {
		            name:'用户数',
		            type:'bar',
		            data:userArr,
		            barWidth:30,
		            itemStyle:{
		            	normal:{
		            		barBorderRadius:8
		            	}
		            }
		        }
		    ]
		};
	
	this.roamRankChart.setOption(option,true);
	
};
CIIE.Screen.prototype.updateTopKpi=function(){
	this.dm.getHotSpotCustomerCountAndFlowTrend({hotspot:this.hotspotInfo.hotCellInName}, this.drawTopUser.bind(this));
	var _params = 
	{
	    hotspot:this.hotspot,    
	    timeRange:"true",
	    group:"all",            
	    max_threads:"10",
	    "domains": "2g,4g",
		all_fields:null,
		hot_fields:null
	};
	this.dm.getXpmData(_params, 
			this.drawTopTraffic.bind(this));
};
CIIE.Screen.prototype.drawTopTraffic=function(result){
	var option = {
		    calculable : false,
		    color:['#00d1ff'],
		    grid:{
		    	borderWidth:0,
		    	x:30,
		    	y:0,
		    	x2:0,
		    	y2:0
		    },tooltip : {
		        trigger: 'axis',
		        formatter:'时间:{b}<br>值:{c}'
		    },
		    xAxis : [
		        {
		        	show:false,
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		        	show:false,
		        }
		    ],
		    series : [
		        {
		            type:'line',
		            data:[],
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
		        }
		    ]
		};
	var _curTrafficFlows=result;
	if(_curTrafficFlows.length>0){
		var last=0;
		var lastTime='';
		for (var i = 0; i < _curTrafficFlows.length; ++i)
		{
			var _data = _curTrafficFlows[i];
			if(!isNaN(_data['volte_voice_teletraffic']*1)){
				last=_data['volte_voice_teletraffic']*1;//+_data['volte_video_teletraffic']*1;
			}
			lastTime=_data.time.substring(11, 16);
			option.xAxis[0].data.push(_data.time.substring(11, 16));
			option.series[0].data.push(last);
		}
		$('#topvalue0_1').text(last);
		$('#time0_1').text(lastTime);
		this.chart01.setOption(option,true);
	}
	
};
CIIE.Screen.prototype.drawTopUser=function(result){
	var option = {
		    calculable : false,
		    color:['#67da7d'],
		    grid:{
		    	borderWidth:0,
		    	x:30,
		    	y:0,
		    	x2:0,
		    	y2:0
		    },tooltip : {
		        trigger: 'axis',
		        formatter:'时间:{b}<br>值:{c}'
		    },
		    xAxis : [
		        {
		        	show:false,
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		        	show:false,
		        }
		    ],
		    series : [
		        {
		        	name:'核心区域用户数',
		            type:'line',
		            data:[],
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
		        }
		    ]
		};
	
	var _selectedKpiName = "总用户数";
	var dataSource=result;
	var ignoreLag=0;//10*60*1000;
	var currentDate=new Date();
	dataSource=dataSource.reverse();
	if(dataSource!=null&&dataSource.length>0){
		var last=0;
		var lastTime='';
		for (var i = 0; i < dataSource.length; ++i)
		{
			var _data = dataSource[i];
			
			var pointDate=new Date(_data.time.replace(/-/g,"/"));
			lag=currentDate-pointDate;
			if(lag>ignoreLag){
				lastTime=_data.time.substring(11, 16);
				option.xAxis[0].data.push(lastTime);
				option.series[0].data.push(_data[_selectedKpiName]);
				last=_data[_selectedKpiName];
			}
		}
		$('#topvalue0_0').text(last);
		$('#time0_0').text(lastTime);
		this.chart00.setOption(option,true);
	}
	this.drawTopFlow(result);
};
CIIE.Screen.prototype.drawTopFlow=function(result){
	var option = {
		    calculable : false,
		    color:['#fdec30'],
		    grid:{
		    	borderWidth:0,
		    	x:30,
		    	y:0,
		    	x2:0,
		    	y2:0
		    },tooltip : {
		        trigger: 'axis',
		        formatter:'时间:{b}<br>值:{c}'
		    },
		    xAxis : [
		        {
		        	show:false,
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		        	show:false,
		        }
		    ],
		    series : [
		        {
		            type:'line',
		            data:[],
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
		        }
		    ]
		};
	
	var _selectedKpiName = "总流量";
	var dataSource=result;
	var ignoreLag=0;//10*60*1000;
	var currentDate=new Date();
	//dataSource=dataSource.reverse();
	if(dataSource!=null&&dataSource.length>0){
		var last=0;
		var lastTime='';
		for (var i = 0; i < dataSource.length; ++i)
		{
			var _data = dataSource[i];
			
			var pointDate=new Date(_data.time.replace(/-/g,"/"));
			lag=currentDate-pointDate;
			if(lag>ignoreLag){
				var value=(_data[_selectedKpiName]/1024/1024).toFixed(2);
				lastTime=_data.time.substring(11, 16);
				option.xAxis[0].data.push(lastTime);
				option.series[0].data.push(value);
				last=value;
			}
		}
		$('#topvalue0_2').text(last);
		$('#time0_2').text(lastTime);
		
		this.chart02.setOption(option,true);
	}
};
CIIE.Screen.prototype.updateUserChart=function(){
	this.dm.getHotSpotsKpisCompared(this.hotspot, null, null, null, null,null,
			this.drawUserChart.bind(this),null,false,'总用户数,总用户数历史比,time');
};

CIIE.Screen.prototype.updateAlarm=function(){
	this.dm.getAlarmListByAreaNew({hotspot:this.hotspot},this.neAlarmDataHandler.bind(this));
	this.dm.getAlarmFLow({hotspot:this.hotspot},this.performanceAlarmDataHandler.bind(this));
	this.dm.getComplainList({},this.complainDataHandler.bind(this));
};
CIIE.Screen.prototype.neAlarmDataHandler=function(list){
	var tmp=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		if(record.severity<=2){
			tmp.push(record);
		}
	}
	this.neAlarmList=tmp;
	$('#neAlarmCount').text(tmp.length);
};
CIIE.Screen.prototype.performanceAlarmDataHandler=function(list){
	var tmp=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		if(record.ALARM_LEVEL<=2){
			tmp.push(record);
		}
	}
	this.performanceAlarmList=tmp;
	$('#performanceAlarmCount').text(tmp.length);
};
CIIE.Screen.prototype.complainDataHandler=function(list){
	var tmp=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		if(record.IF_DISNEYLAND=="是"){
			tmp.push(record);
		}
	}
	this.complainList=tmp;
	$('#complainCount').text(tmp.length);
};
CIIE.Screen.prototype.subHotspotDataHandler=function(result){
	var hotspots=[];
	var centerHotspots=[];
	var centerHotspotList=[];
	for(var i=0;i<result.length;i++){
		hotspots.push(result[i].hot_name);
		if(result[i].hot_type==0){
			centerHotspots.push({name:result[i].hot_name,icon:'shniec'});
			centerHotspotList.push(result[i].hot_name);
		}
		
	}
	this.hotspotList=hotspots;
	this.centerHotspotList=centerHotspotList;
	this.update();
};

CIIE.Screen.prototype.updateGrid=function(){
	var title=$('#rightTableTitle').text();
	if(title=='场馆列表'){
		this.dm.getSubHotspots({hotspot:this.selectedHotspot},function(result){
			var hotspots=[];
			for(var i=0;i<result.length;i++){
				hotspots.push(result[i].hot_name);
			}
			this.dm.getHotSpotsKpis(hotspots,null,null,this.gridDataHandler.bind(this),null,false,'总用户数,总流量,下行速率500k,HTTP时延,time');
		}.bind(this));
	}else{
//		this.selectedHotspot
		this.dm.getCellsByHotspot({hotspot:this.selectedHotspot},this.cellInfoHandler.bind(this));
	}
};
CIIE.Screen.prototype.gridDataHandler=function(result){
	if($('#rightTableTitle').text()=='场馆列表'){
		var list=[];
		var kpiRecord={};
		for(var key in result){
			var record=result[key];
			record.hot_name=key;
			record["总流量MB"]=(record["总流量"]/1024).toFixed(2);
			record["总流量"]=(record["总流量"]/1024/1024).toFixed(2);
			
			record["下行速率500k"]=(record["下行速率500k"]/1024).toFixed(2);
			record["HTTP时延"]=(record["HTTP时延"]*1).toFixed(0);
			list.push(record);
		}
		list.sort(function(a,b){return b["总用户数"]-a["总用户数"];});
		clearInterval(this.tableAutoScrollKey);
		if(list[0]["总流量MB"]==0){
			return;
		}
		var first=list[0];
		var prefix=first.hot_name+'_center_';
		var domId=prefix;
		var key='总用户数';
		domId=this.encodeDomId(prefix+key);
		$('#'+domId).text(first[key]);
		key='总流量MB';
		domId=this.encodeDomId(prefix+'总流量MB');
		$('#'+domId).text(first[key]);
		
		$('#gview_table').find('.ui-jqgrid-bdiv').scrollTop(0);
		if(list.length>5){
			this.tableAutoScrollKey=setInterval(this.tableAutoScroll.bind(this),5000);
		}else{
			clearInterval(this.tableHotAutoScrollKey);
			this.tableHotAutoScrollKey=setInterval(this.nextHot.bind(this),5000);
		}
		$('#table')[0].addJSONData(list);
	}
	
	
};
CIIE.Screen.prototype.tableAutoScroll=function(){
	if(!$('#scrollTable').hasClass('pauseHighLight')){
		var scrollTop=$('#gview_table').find('.ui-jqgrid-bdiv').scrollTop();
		var tableHeight=$('#table').height()*1;
		var pageSize=528;
		var next=scrollTop*1+pageSize*1;
		if(next>=tableHeight-5){//实际计算到最后next会等于tableHeight-1
			next=0;
			this.tableAutoScrollEnd();
		}else if(next>=tableHeight-pageSize){
			next=tableHeight-pageSize;
		}
		$('#gview_table').find('.ui-jqgrid-bdiv').animate({scrollTop:next},1000);
	}
};
CIIE.Screen.prototype.tableAutoScrollEnd=function(){
	clearInterval(this.tableAutoScrollKey);
	clearInterval(this.tableHotAutoScrollKey);
	this.tableHotAutoScrollKey=setInterval(this.nextHot.bind(this),5000);
};
CIIE.Screen.prototype.nextHot=function(){
	if(!$('#scrollTable').hasClass('pauseHighLight')){
		clearInterval(this.tableHotAutoScrollKey);
		var list=$('.centerHotspotKpiFrame:visible');
		var selectedHot=$('.icon-selected').attr('hot');
		var nextIndex=0;
		for(var i=0;i<list.length;i++){
			if($(list[i]).attr('hot')==selectedHot){
				nextIndex=(i+1)%list.length;
				break;
			}
		} 
		if(nextIndex>4){
			$('#centerKpi').animate({scrollTop:'+=220'},1000);
		}else if(nextIndex==0){
			$('#centerKpi').animate({scrollTop:0},1000);
		}
		$('.icon-selected').removeClass('icon-selected');
		$(list[nextIndex]).find('.icon-check').addClass('icon-selected');
		selectedHot=$('.icon-selected').attr('hot');
		this.updateRightHot(selectedHot);
	}
};
CIIE.Screen.prototype.cellInfoHandler=function(result){
	var cellMap={};
	for(var i=0;i<result.length;i++){
		var lacci=result[i].lac+':'+result[i].ci;
		cellMap[lacci]=result[i].cell_name;
	}
	this.cellMap=cellMap;
	this.dm.getCellsStreamKpiByHotspot({hotspot:this.selectedHotspot,indicatorNameList:'总用户数,总流量,下行速率500k,HTTP时延,time'},this.gridCellDataHandler.bind(this));
};
CIIE.Screen.prototype.gridCellDataHandler=function(result){
	if($('#rightTableTitle').text()=='小区列表'){
		var list=[];
		var kpiRecord={};
		for(var key in result){
			var record=result[key];
			record.hot_name=this.cellMap[key];
			record["总流量MB"]=(record["总流量"]/1024).toFixed(2);
			record["总流量"]=(record["总流量"]/1024/1024).toFixed(2);
			
			record["下行速率500k"]=(record["下行速率500k"]/1024).toFixed(2);
			record["HTTP时延"]=(record["HTTP时延"]*1).toFixed(0);
			list.push(record);
		}
		list.sort(function(a,b){return b["总用户数"]-a["总用户数"];});
		$('#table')[0].addJSONData(list);
		clearInterval(this.tableAutoScrollKey);
		$('#gview_table').find('.ui-jqgrid-bdiv').scrollTop(0);
		if(list.length>5){
			this.tableAutoScrollKey=setInterval(this.tableAutoScroll.bind(this),5000);
		}
	}
	
};

CIIE.Screen.prototype.updateCenter=function(){
	this.dm.getHotSpotsKpis(this.centerHotspotList,null,null,this.centerStreamDataHandler.bind(this),null,false,'总用户数,总流量,下行速率500k,HTTP时延,time');
};
CIIE.Screen.prototype.centerStreamDataHandler=function(result){
	var list=[];
	var kpiRecord={};
	for(var key in result){
		var record=result[key];
		record.hot_name=key;
		record["总流量MB"]=(record["总流量"]/1024).toFixed(2);
		record["总流量"]=(record["总流量"]/1024/1024).toFixed(2);
		
		record["下行速率500k"]=(record["下行速率500k"]/1024).toFixed(2);
		record["HTTP时延"]=(record["HTTP时延"]*1).toFixed(0);
		list.push(record);
	}
	this.centerStreamCache=list;
	var params={
			"hotspot":this.centerHotspotList.join(','),
			"group":"hot",
			"hot_fields":"hot_name",
			"hot_type":"0",
			"domains":"2g,4g",
			"hb_domains":"2g,4g",
			"hb_time_minutes":15,
			"multi":"true"
	};
	this.dm.getXpmData(params, 
			this.centerWsDataHandler.bind(this));
};
CIIE.Screen.prototype.centerWsDataHandler=function(wsData){
	var i=0;
	var j=0;
	var topConfig=this.centerKpiTop;
	var centerConfig=this.centerKpis;
	var streamData=this.centerStreamCache;
	var wsDataMap={};
	var count=0;
	for(i=0;i<wsData.length;i++){
		wsDataMap[wsData[i].hot_name]=wsData[i];
	}
	streamData=streamData.sort(function(a,b){return b['总用户数']-a['总用户数'];});
	var tmp=[];
	for(i=0;i<streamData.length;i++){
		if(streamData[i].hot_name=='新国展_'){
			tmp.unshift(streamData[i]);
		}else if(streamData[i].hot_name=='嘉里中心'){
			tmp.unshift(streamData[i]);
		}else{
			tmp.push(streamData[i]);
		}
	}
	streamData=tmp;
	if(this.hotspots==null){
		this.hotspots=streamData;
		this.drawCenterKpis();
	}
	
	var lastDom=null;
	for(i=0;i<streamData.length;i++){
		var streamRecord=streamData[i];
		var hot=streamRecord.hot_name;
		var wsRecord=wsDataMap[hot];
		var prefix=hot+'_center_';
		var key=topConfig.key
		var domId=prefix+key;
		domId=this.encodeDomId(domId);
		var hotDomId=this.encodeDomId(prefix);
		var allRecord=$.extend(wsRecord,streamRecord);
		var value=allRecord[key];
		$('#'+domId).text(value);
		if(hot!=this.hotspot&&count<4){
			$('#'+hotDomId).css('display','block');
			if(lastDom!=null){
				$('#'+hotDomId).insertAfter(lastDom);
			}
			lastDom=$('#'+hotDomId);
			count++;
		}else if(hot!=this.hotspot){
			//$('#'+hotDomId).css('display','none');
		}
		for(j=0;j<centerConfig.length;j++){
			key=centerConfig[j].key;
			domId=prefix+key;
			domId=this.encodeDomId(domId);
			value=allRecord[key];
			if(value==0||isNaN(value)){
				continue;
//				$('#'+domId).text('--');
			}else{
				$('#'+domId).text(value);
			}
			
		}
		
	}
};

CIIE.Screen.prototype.drawCenterKpis=function(){
	var hotspots=this.hotspots;
	var html='';
	for(var i=0;i<hotspots.length;i++){
		if(hotspots[i].hot_name!=this.hotspot){
			html+=this.getCenterKpiDiv(hotspots[i].hot_name);
		}
	}
	$('#centerKpi0').html(this.getCenterKpiDiv(this.hotspot,20));
	$('#centerKpi').html(html);
	$('.centerHotspotKpiFrame:eq(0)').find('.icon-check').addClass('icon-selected');
	$('.centerKpiTitle').on('click',this.centerHotClick.bind(this));
};

CIIE.Screen.prototype.resetGridHot=function(e){
	$('#hotListReturn').css('display','none');
	$('.centerHotspotKpiFrame').find('.icon-check').removeClass('icon-selected');
	this.selectedHotspot=this.hotspot;
	this.updateGrid();
	this.updateMajorRank();
	this.updateAppRank();
	this.updateMapHotspot();
};
CIIE.Screen.prototype.centerHotClick=function(e){
	var hot=$(e.currentTarget).attr('hot');
	$('.centerHotspotKpiFrame').find('.icon-check').removeClass('icon-selected');
	$(e.currentTarget).parent().find('.icon-check').addClass('icon-selected');
//	$('#hotListReturn').css('display','block');
	clearTimeout(this.tableHotAutoScrollKey);
	this.updateRightHot(hot);
	this.updateMapHotspot(hot);
};
CIIE.Screen.prototype.updateRightHot=function(hot){
	
	this.selectedHotspot=hot;
	this.updateGrid();
	this.updateMajorRank();
	this.updateAppRank();
//	this.updateMapHotspot();
};
CIIE.Screen.prototype.updateMapHotspot=function(){
	parent.updateMapHotspot(this.selectedHotspot);
	
};
CIIE.Screen.prototype.scrollCenterKpis=function(){
	var top=$('#centerKpi').css('top').replace('px','');
	var height=$('#centerKpi').height();
	var step=300;
	var next=top-step;
	if(top==-(height-step*2)){
		next=0;
	}else if(next<-(height-step*2)){
		next=-(height-step*2);
	}
	$('#centerKpi').animate({top:next});
};
CIIE.Screen.prototype.getCenterKpiDiv=function(hotspot,nomargin){
	var kpis=this.centerKpis;
	var kpiTop=this.centerKpiTop;
	var style='';
	var spotname=hotspot;
	var prefix=spotname+'_center_';
	style='style="position:relative;height:220px;"';
	
	var div='<div id="'+this.encodeDomId(prefix)+'" class="centerHotspotKpiFrame" hot="'+spotname+'" '+style+'>'
				+'<div class="ciietitle centerKpiTitle" style="cursor:pointer;border-bottom:solid 2px #173789;" hot="'+spotname+'">'
					+'<div style="margin-left:120px;border-left:solid 2px #173789;margin-top:8px;padding-left:10px;line-height:30px;">'+spotname+'</div>'
					+'<div class="toolbox">'
						+'<div class="kpitopbg">'
							+'<span>'+kpiTop.name+'</span>'
							+'<span id="'+this.encodeDomId(prefix+kpiTop.key)+'">--</span>'
							+'<span>'+kpiTop.unit+'</span>'
						+'</div>'
					+'</div>'
				+'</div>'
				+'<div style="width:100%;padding-left:100px;">';
				
			
	for(var j=0;j<kpis.length;j++){
		var kpi=kpis[j];
		div+='<div class="kpicenter">';
		div+='<div class="kpicenterTitle" >'+kpi.name+'('+kpi.unit+')</div>';
		div+='<div class="kpicenterValue" id="'+this.encodeDomId(prefix+kpi.key)+'">--</div>';
		div+='</div>';
	}
	div+='</div>';
	div+='<div style="width:1px;height:100%;position:absolute;top:0;left:55px;border:dashed 1px #173789;"></div>';
	
	div+='<div class="icon-check" hot="'+spotname+'" style="position:absolute;top:30px;left:30px;">'
		+'</div>';
	
	div+='</div>';
	div+='<div style="clear:both;"></div>';
	return div;
};


CIIE.Screen.prototype.initTable=function(){
	
	var colNames=['场馆名称','用户数(人)','总流量(GB)','下载速率(Mbps)','HTTP时延(ms)'];
	var colModel=[
	    {colName:'hot_name',name : 'hot_name',index : 'hot_name'},
	    {colName:'总用户数',name : '总用户数',index : '总用户数'},
	    {colName:'总流量',name : '总流量',index : '总流量'},
	    {colName:'下行速率500k',name : '下行速率500k',index : '下行速率500k'},
	    {colName:'HTTP时延',name : 'HTTP时延',index : 'HTTP时延'}
	];
	var opt1={
	        datatype : function(){},
	        colNames:colNames,
	        colModel : colModel,
	        loadui:'disable',
	        width:'100%',
	        height:470,
	        rowNum:1000,
	        autowidth: true,
	        shrinkToFit: true
		};
	
	$('#table').jqGrid(opt1);
	
	$('#gview_table').find('.ui-jqgrid-bdiv').css('overflow','hidden');
	$('#gview_table').find('.ui-jqgrid-bdiv').width($('#gview_table').width());
	$('#table').width($('#gview_table').width());
	
//	$('#content').niceScroll({
//	    cursorcolor: "#ccc",//#CC0071 光标颜色
//	    cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
//	    touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
//	    cursorwidth: "5px", //像素光标的宽度
//	    cursorborder: "0", // 游标边框css定义
//	    cursorborderradius: "5px",//以像素为光标边界半径
//	    autohidemode: false //是否隐藏滚动条
//	});
};
CIIE.Screen.prototype.initAppTable=function(){
	this.grid=$('#appHigher').jqGrid({
        datatype : "json",
		colNames : [ '','业务','业务', '流量占比(%)', '全网对比(%)'],
        colModel : [ 
                     {name : 'rank',index : 'rank',width : 50}, 
                     {name : 'element',index : 'element',width : 50}, 
                     {name : 'element',index : 'element',width : 220}, 
                     {name : 'disneyPercent',index : 'disneyPercent',width : 150}, 
                     {name : 'allPercent',index : 'allPercent',width : 150}
                   ],
        loadui:'disable',
        afterInsertRow:this.rowHandler.bind(this),
        width:620,
        height:430,
        autowidth: false,
        shrinkToFit: false
	});
	this.grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide(); //隐藏表头方法
	
	this.grid2=$('#appLower').jqGrid({
        datatype : "json",
		colNames : ['', '业务','业务', '流量占比(%)', '全网对比(%)'],
        colModel : [ 
                     {name : 'rank',index : 'rank',width : 50}, 
                     {name : 'element',index : 'element',width : 50}, 
                     {name : 'element',index : 'element',width : 220}, 
                     {name : 'disneyPercent',index : 'disneyPercent',width : 150}, 
                     {name : 'allPercent',index : 'allPercent',width : 150}
                   ],
        loadui:'disable',
        afterInsertRow:this.rowHandler2.bind(this),
        width:620,
        height:430,
        autowidth: false,
        shrinkToFit: false
	});
	this.grid2.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide(); //隐藏表头方法
	
};

CIIE.Screen.prototype.rowHandler=function(rowid,rowdata){
	var grid=this.grid;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	var iconPath=BASEPATH+"/static/styles/local-lsm/app/"+SUtils.getAppIconPath(rowdata.element);
	var plus="";
	if(rowdata["allPercent"]>0){
		plus="+";
	}
	var color='#499bb8';
	if(rowid==1){
		color='#e95f57';
	}else if(rowid==2){
		color='#eeaa59';
	}else if(rowid==3){
		color='#efcd52';
	}
	$(tds[0]).html('<div style="background:'+color+';color:#ffffff;font-size:16px;border-radius:5px;width:25px;height:25px;text-align:center;">'+rowid+'</div>');
	$(tds[1]).html('<img src="'+iconPath+'"></img>');
	
	$(tds[3]).text(rowdata["disneyPercent"]+"%");
	$(tds[4]).text(plus+rowdata["allPercent"]+"PP");
};
CIIE.Screen.prototype.rowHandler2=function(rowid,rowdata){
	var grid=this.grid2;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	var icon=SUtils.getAppIconPath(rowdata.element);
	var iconPath=BASEPATH+"/static/styles/local-lsm/app/"+icon;
	var plus="";
	if(rowdata["allPercent"]>0){
		plus="+";
	}
	var color='#499bb8';
	if(rowid==1){
		color='#e95f57';
	}else if(rowid==2){
		color='#eeaa59';
	}else if(rowid==3){
		color='#efcd52';
	}
	$(tds[0]).html('<div style="background:'+color+';color:#ffffff;font-size:16px;border-radius:5px;width:25px;height:25px;text-align:center;">'+rowid+'</div>');
	
	$(tds[1]).html('<img src="'+iconPath+'"></img>');
	
	$(tds[3]).text(rowdata["disneyPercent"]+"%");
	$(tds[4]).text(plus+rowdata["allPercent"]+"PP");
	
};
CIIE.Screen.prototype.drawChinaChart=function(result){
	
	var lineData=[];
	var pointData=[];
	
	var data=result;
	var list=[];
	var max=1;
	var total=0;
	var time="";
	var dataKey=this.showValueKey;
	for(var key in data){
		var record=data[key];
		var pro=record.pro_name;
		var cnt=record.user_cnt;
		if(pro=="上海") continue;
		list.push({key:pro,value:cnt});
		time=record.time_id+':00';
		max=Math.max(cnt,max);
		total=record.user_cnt_all;
	}
	list.sort(function(a,b){return b.value-a.value;});//按value 降序
	
	$(this.rankDom).find(".content_title").html(
			'<h>省际漫入</h>'
		    +'<h3>'+total.toFixed(2)+'<span>&nbsp;万</span></h3>'
//		    +'<h3>15<span>&nbsp;%</span></h3>'
	);
	
	var rankTable=$(this.rankDom).find("table");
	this.rankMax=100;
	this.mapShowMax=100;
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var num=record.value;
		var percent=(num/total)*100;
		if(i<this.rankMax){
			var rankHTML='<td class="t1">'+record.key+'</td>'
							     +'<td class="t2">'
							     +'<div class="t2_content">'
							     +'<div class="t'+(i+2)+'_box1"></div>'
							     +'<div class="t2_txt">'+num.toFixed(2)+'<span>&nbsp;万</span></div>'
							     +'</div>'
							     +'</td>'
							     +'<td class="t3"><div class="t2_txt">'+percent.toFixed(2)+'<span>&nbsp;%</span></div></td>';
			rankTable.find("tr:eq("+i+")").html(rankHTML);
		}
		if(i<this.mapShowMax){
			lineData.push([{name:record.key,value:parseFloat(num.toFixed(2))},{name:'上海'}]);
			pointData.push({name:record.key,value:parseFloat(num.toFixed(2))});
		}
	}
	
	if(time!=""&&time!=null){
//		$(".DR2_TIME").text(time.substring(5, 16));
	}
	
	var option = {
		backgroundColor:'rgba(0,0,0,0)',
	    color: ['gold','aqua','lime'],
	    title : {
	    	show:false
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: function (v) {
	            return v[1].replace(':', ' > ')+":"+v.value;
	        },
        	textStyle :
    		{
        		fontSize:LSMConsts.CHARTCONFIG.axisLabelSize
    		}
	    },
	    legend: {
	        orient: 'vertical',
	        x:'left',
	        data:['上海'],
	        selectedMode: 'single',
	        show : false,
	        selected:{
	            '上海' : true
	        }
	    },
	    toolbox: {
	        show : false
	    },
	    dataRange: {
	        min : 0,
	        max : max,
	        y: 'bottom',
	        dataRange:0,
	        calculable : true,
	        formatter:function(v){
	        	return parseInt(v);
	        },
	        color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
        	textStyle :
    		{
        		color:LSMConsts.baseFontColor,
        		fontSize:LSMConsts.CHARTCONFIG.axisLabelSize
    		}
	    },
	    series : [
   		        {
   		        	clickable:false,
   		        	scaleLimit:{max:6,min:6},
		            name:'上海',
		            type:'map',
		            mapType: 'none',
		            data:[],
		            geoCoord: {
		            	'北京':[116.39737,39.939502],
		            	'天津':[117.133262,39.256321],
		            	'上海':[121.36464,31.303465],
		            	'重庆':[106.32485,29.895013],
		            	'河北':[114.336873,38.21885],
		            	'山西':[112.349964,38.044464],
		            	'辽宁':[123.241164,41.948112],
		            	'吉林':[125.228072,43.894927],
		            	'黑龙江':[126.479088,45.985284],
		            	'江苏':[118.715429,32.246466],
		            	'浙江':[120.040035,30.350837],
		            	'安徽':[117.170056,31.99595],
		            	'福建':[119.156964,26.182279],
		            	'江西':[115.808656,28.774611],
		            	'山东':[116.912494,36.812038],
		            	'河南':[113.453802,34.895028],
		            	'湖北':[114.116105,30.764814],
		            	'湖南':[112.800698,28.474291],
		            	'广东':[113.233035,23.224606],
		            	'海南':[110.179083,19.921006],
		            	'四川':[103.924003,30.796585],
		            	'贵州':[106.499624,26.844365],
		            	'云南':[102.599397,25.248948],
		            	'陕西':[108.780889,34.408508],
		            	'甘肃':[103.66644,36.218003],
		            	'青海':[101.605943,36.752842],
		            	'西藏':[90.972306,29.838888],
		            	'广西':[108.265765,23.020403],
		            	'内蒙古':[111.614073,40.951504],
		            	'宁夏':[106.094884,38.624116],
		            	'新疆':[87.476819,43.894927],
		            	'香港':[114.1529,22.542716],
		            	'澳门':[113.417008,22.337477],
		            	'台湾':[121.36464,25.248948]
   		        },

		            markLine : {
		            	clickable:false,
		                smooth:true,
		                effect : {
		                    show: true,
		                    scaleSize: 1,
		                    period: 30,
		                    color: '#fff',
		                    shadowBlur: 10
		                },
		                itemStyle : {
		                    normal: {
		                        borderWidth:1,
		                        lineStyle: {
		                            type: 'solid',
		                            shadowBlur: 10
		                        },
		                        label:{
		                        	show:true,
		                        	position:"start",
		                        	textStyle :
				            		{
					            		fontSize:LSMConsts.CHARTCONFIG.axisLabelSize
				            		}
		                        }
		                    }
		                },
		                data : lineData
		            },
		            markPoint : {
		            	clickable:false,
		                symbol:'emptyCircle',
		                symbolSize : function (v){
		                    return 10 + v/max;
		                },
		                effect : {
		                    show: false,
		                    shadowBlur : 0
		                },
		                itemStyle:{
		                    normal:{
		                        label:{show:false}
		                    }
		                },
		                data : pointData
		            }
		            
		        }
		    ]
	};
	this.BMapExt.setOption(option, true);
	this.BMapExt.refresh();
	$('#roamChinaChart').css('backgroundColor','rgba(0,0,0,0)');
};
CIIE.Screen.prototype.drawWorldChart=function(result){
	var data=result;
	var mapData=[];
	var max=0;
	var time="";
	var total=0;
	var nationNameMap=LSMConsts.NATION_NAME_MAP;
	var dataKey=this.showValueKey;
	
	for(var key in data){
		var record=data[key];
		var intl=record.intl_name;
		var cnt=record.user_cnt;
		if(intl=="中国"||intl=="国外") continue;
		time=record.time_id+':00';
		total=record.user_cnt_all;
		mapData.push({key:intl.substring(0,2),name:intl.substring(0,2),value:cnt});
		max=Math.max(max,cnt);
	}
	mapData.sort(function(a,b){return b.value-a.value;});//按value 降序
	
	var rankTable=$(this.rankDom).find("table");
	for(var i=0;i<mapData.length;i++){
		var record=mapData[i];
		var num=record.value;
		var percent=(num/total)*100;
		if(i<this.rankMax){
			var rankHTML='<td class="t1">'+record.key+'</td>'
							     +'<td class="t2">'
							     +'<div class="t2_content">'
							     +'<div class="t'+(i+2)+'_box1"></div>'
							     +'<div class="t2_txt">'+num.toFixed(2)+'<span>&nbsp;万</span></div>'
							     +'</div>'
							     +'</td>'
							     +'<td class="t3"><div class="t2_txt">'+percent.toFixed(2)+'<span>&nbsp;%</span></div></td>';
			rankTable.find("tr:eq("+i+")").html(rankHTML);
		}
	}
	
	$(this.rankDom).find(".content_title").html(
			'<h>国际漫入</h>'
		    +'<h3>'+total.toFixed(2)+'<span>&nbsp;万</span></h3>'
//		    +'<h3>15<span>&nbsp;%</span></h3>'
	);
	if(time!=""&&time!=null){
//		$(".DR2_TIME").text(time.substring(5, 16));
	}
	var option = {
			backgroundColor:'rgba(0,0,0,0)',
		    title : {
		    	show:false
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter : function (params) {
		            var value = (params.value + '').split('.');
		            value = value[0];
		            return params.name + ' : ' + value;
		        }
		    },
		    toolbox: {
		        show : false
		    },
		    dataRange: {
		        min : 0,
		        max : max,
		        y: 'bottom',
		        dataRange:0,
		        calculable : true,
		        formatter:function(v){
		        	return parseInt(v);
		        },
		        color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
	        	textStyle :
	    		{
	        		color:LSMConsts.baseFontColor,
	        		fontSize:LSMConsts.CHARTCONFIG.axisLabelSize
	    		}
		    },
		    series : [
		        {
		            name: '国际用户分布',
		            type: 'map',
		            mapType: 'world',
		            roam: true,
		            mapLocation: {
		                y : 60
		            },
		            itemStyle:{
		                emphasis:{label:{show:true}}
		            },
		            data:mapData,
		            nameMap : nationNameMap
		        }
		    ]
		};
	if(this.echartCom!=null){
		this.echartCom.setOption(option,true);
	}
	$('#roamWorldChart').css('backgroundColor','rgba(0,0,0,0)');
};
CIIE.Screen.prototype.updateAppRank=function(){
	//全网流量
	this.dm.getBytesRecord({},this.allBytesDataHandler.bind(this));
	
};
CIIE.Screen.prototype.allBytesDataHandler=function(result){
	this.allFlow=result["4G流量"];
	this.dm.getAppRank({//热点下app数据
		hotspot:this.selectedHotspot,num:-1
	},this.hotspotAppDataHandler.bind(this));
};
CIIE.Screen.prototype.hotspotAppDataHandler=function(result){
	this.hotspotAppData=result;
	this.dm.getAppRank({//全网app数据
		num:-1
	},this.allAppRankHandler.bind(this));
};
CIIE.Screen.prototype.allAppRankHandler=function(result){
	this.allAppData=result;
	
	var kpiKey="4G流量";
	var disneyMap={};
	var allMap={};
	var list=[];
	var i=0;
	var key="";
	var topList=[];
	var bottomList=[];
	var maxRow=7;
	var lastTime="";
	for(i=0;i<this.allAppData.length;i++){
		allMap[this.allAppData[i].element]=this.allAppData[i];
	}
	for(i=0;i<this.hotspotAppData.length;i++){
		disneyMap[this.hotspotAppData[i].element]=this.hotspotAppData[i];
	}
	for(key in disneyMap){
		var disneyRecord=disneyMap[key];
		var allRecord=allMap[key];
		lastTime=disneyRecord.time;
		disneyRecord.disneyPercent=(disneyRecord[kpiKey]/this.hotspotTotalFlow*100).toFixed(2);
		disneyRecord.allPercent=parseFloat((disneyRecord[kpiKey]/this.hotspotTotalFlow*100-allRecord[kpiKey]/this.allFlow*100).toFixed(2));
		disneyRecord.senseValue=((disneyRecord["4GHTTP成功率"]*100)*(disneyRecord["4GHTTP成功率"]*100)/100-disneyRecord["4GHTTP时延"]/100-disneyRecord["4GTCP时延"]/100).toFixed(2);
		list.push(disneyRecord);
	}
	if(lastTime!=null&&lastTime!=""){
//		$("#rightTime").text(lastTime.substring(11, 16));
		$("#rightTime").text(SUtils.getHourAndMinuteFive(lastTime,true));//强制向后推五分钟
	}
	list.sort(function(a,b){return b["总流量"]-a["总流量"];});
	list=list.slice(0, list.length/2);
	list.sort(function(a,b){return b.allPercent-a.allPercent;});//按allPercent 降序
	
	var topTotal=0;
	var bottomTotal=0;
	for(i=0;i<maxRow&&i<list.length;i++){
		topTotal+=list[i].disneyPercent*1;
		topList.push(list[i]);
	}
	for(i=list.length-1;i>=list.length-maxRow&&i>=0;i--){
		bottomTotal+=list[i].disneyPercent*1;
		bottomList.push(list[i]);
	}
	
	if(topTotal==0||isNaN(topTotal)){
		
	}else{
		this.grid[0].addJSONData(topList);
	}
	if(bottomTotal==0||isNaN(bottomTotal)){
		
	}else{
		this.grid2[0].addJSONData(bottomList);
	}
	
	
	
};

CIIE.Screen.prototype.updateMajorRank=function(){
	this.dm.getBytesDataByHotspot({//整个热点流量
		hotspot:this.selectedHotspot
	},this.bytesDataHandler.bind(this));
	
};
CIIE.Screen.prototype.bytesDataHandler=function(result){
	this.hotspotTotalFlow=result[this.selectedHotspot]["4G流量"];
	this.dm.getMajorRankByHotspot({
		hotspot:this.selectedHotspot,num:100,order:"desc"
	},this.majorRankHandler.bind(this));
};
CIIE.Screen.prototype.majorRankHandlerAny=function(chartDataArr){
	
	var seriesName="4G流量占比";
	var dataArr=[];
	var tmp=[];
	var legends=[];
	var otherValue=0;
	var otherName="其他";
	chartDataArr.sort(function(a,b){return b["4G流量"]-a["4G流量"];});//按value 降序
	var i=0;
	for(i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i];
		var cnts=(record["4G流量"]/this.hotspotTotalFlow*100).toFixed(1);
		var pointName=record.element;
		if(pointName==otherName){
			otherValue+=parseFloat(cnts);
		}else{
			dataArr.push({
	            value:cnts,
	            name:pointName
	        });
		}
	}
	for(i=0;i<dataArr.length;i++){
		if(i<5){
			legends.push(dataArr[i].name);
			tmp.push(dataArr[i]);
		}else{
			otherValue+=parseFloat(dataArr[i].value);
		}
	}
	dataArr=tmp;
	legends.push(otherName);
	dataArr.push({
        value:otherValue.toFixed(1),
        name:otherName
    });
	dataArr.sort(function(a,b){return b["value"]-a["value"];});//按value 降序
	
	var colors=['#aee9b9','#54cbed','#5491ec','#715bee','#bf5bef','#e65c5c','#f0c044'];
	var series='<series name="'+seriesName+'" type="Pie" palette="Default">';
	for(i=0;i<dataArr.length;i++){
		series+='<point name="'+dataArr[i].name+'" y="'+dataArr[i].value+'" color="'+colors[i%colors.length]+'" />';
	}
	series+='</series>';
	
	this.majorRankChart.setXMLData(this.getAnyChartXML(series));
	
};
CIIE.Screen.prototype.getAnyChartXML=function(series){
	var xml='<anychart>'
		+'<margin all="-20"/>'
		+'<settings>'
			+'<animation enabled="false" />'
		+'</settings>'
		+'<charts>'
			+'<chart plot_type="Doughnut">'
				+'<data_plot_settings default_series_type="Pie" enable_3d_mode="True">'
					+'<pie_series start_angle="0">'
						+'<tooltip_settings enabled="true">'
							+'<font color="#000000" size="18" bold="true" />'
							+'<format>'
								+'{%Name} \n {%YValue}{numDecimals:1}%'
							+'</format>'
						+'</tooltip_settings>'
						+'<label_settings mode="Outside" enabled="true" color="#ffffff">'
							+'<font render_as_html="true" color="#ffffff" size="18" bold="true" />'
							+'<format>'
								+'<![CDATA[<font size="18" face="微软雅黑" bold="true" color="#ffffff">{%Name}</font> <br> <font size="18" bold="true" face="微软雅黑" color="#faff48">{%YValue}{numDecimals:1}%</font >]]>'
							+'</format>'
//							+'<format><![CDATA[%cbegin <b>Name:</b> {%Name} %cend]]></format>'
						+'</label_settings>'
						+'<connector enabled="true" color="#ffffff" padding="30"/>'
					+'</pie_series>'
				+'</data_plot_settings>'
				+'<chart_settings>'
					+'<title enabled="false">'
						+'<text></text>'
					+'</title>'
					+'<chart_background enabled="false"><fill opacity="0" enabled="false"></fill></chart_background>'
					+'<data_plot_background enabled="false"><fill opacity="0" enabled="false"></fill></data_plot_background>'
					+'<axes>'
						+'<y_axis>'
							+'<title>'
								+'<text>人数</text>'
							+'</title>'
							+'<labels align="Inside">'
								+'<format>{%Value}{numDecimals:0}</format>'
							+'</labels>'
						+'</y_axis>'
						+'<x_axis>'
							+'<labels align="Outside" rotation="90" />'
							+'<title enabled="false">'
								+'<text>Products</text>'
							+'</title>'
						+'</x_axis>'
					+'</axes>'
				+'</chart_settings>'
				+'<data>'
				+series
				+'</data>'
			+'</chart>'
		+'</charts>'
	+'</anychart>';

return xml;
};
CIIE.Screen.prototype.getAnyChartXMLRadar=function(series){
	var xml='<anychart>'
		+'<margin all="-20"/>'
		+'<settings>'
			+'<animation enabled="false" />'
		+'</settings>'
		+'<charts>'
			+'<chart plot_type="Radar">'
				+'<data_plot_settings default_series_type="Pie" enable_3d_mode="True">'
					+'<pie_series start_angle="0">'
						+'<tooltip_settings enabled="true">'
							+'<font color="#000000" size="18" bold="true" />'
							+'<format>'
								+'{%Name} \n {%YValue}{numDecimals:1}%'
							+'</format>'
						+'</tooltip_settings>'
						+'<label_settings mode="Outside" enabled="true" color="#ffffff">'
							+'<font render_as_html="true" color="#ffffff" size="18" bold="true" />'
							+'<format>'
								+'<![CDATA[<font size="18" face="微软雅黑" bold="true" color="#ffffff">{%Name}</font> <br> <font size="18" bold="true" face="微软雅黑" color="#faff48">{%YValue}{numDecimals:1}%</font >]]>'
							+'</format>'
//							+'<format><![CDATA[%cbegin <b>Name:</b> {%Name} %cend]]></format>'
						+'</label_settings>'
						+'<connector enabled="true" color="#ffffff" padding="30"/>'
					+'</pie_series>'
				+'</data_plot_settings>'
				+'<chart_settings>'
					+'<title enabled="false">'
						+'<text></text>'
					+'</title>'
					+'<chart_background enabled="false"><fill opacity="0" enabled="false"></fill></chart_background>'
					+'<data_plot_background enabled="false"><fill opacity="0" enabled="false"></fill></data_plot_background>'
					+'<axes>'
						+'<y_axis>'
							+'<title>'
								+'<text>人数</text>'
							+'</title>'
							+'<labels align="Inside">'
								+'<format>{%Value}{numDecimals:0}</format>'
							+'</labels>'
						+'</y_axis>'
						+'<x_axis>'
							+'<labels align="Outside" rotation="90" />'
							+'<title enabled="false">'
								+'<text>Products</text>'
							+'</title>'
						+'</x_axis>'
					+'</axes>'
				+'</chart_settings>'
				+'<data>'
				+series
				+'</data>'
			+'</chart>'
		+'</charts>'
	+'</anychart>';

return xml;
};

CIIE.Screen.prototype.majorRankHandler=function(chartDataArr){
	
	var defaultMajors={
		"即时通信":true,
		"浏览下载":true,
		"视频":true,
		"应用商店":true
	};
	//有色圆环样式
	var dataStyle = {
	    normal: {
	        label: {
	        	show:true,
	        	position:"outter",
	        	textStyle:{fontSize:this.chartLabelSize},
	        	formatter:"{b}:\n{c}%"
	        },
	        labelLine: {show:true,length:50}
	    }
	};
	var seriesName="4G流量占比";
	var dataArr=[];
	var legends=[];
	var total=0;
	var otherValue=0;
	var otherName="其他";
	chartDataArr.sort(function(a,b){return b["4G流量"]-a["4G流量"];});//按value 降序
	var count=0;
	for(var i=0;i<chartDataArr.length;i++){
		var record=chartDataArr[i];
		var cnts=(record["4G流量"]/this.hotspotTotalFlow*100).toFixed(1);
		var pointName=record.element;
		this.majorDataMap[pointName]=cnts;
		total+=cnts;
		if(i<6){
			legends.push(pointName);
			dataArr.push({
	            value:cnts,
	            name:pointName=="其他"?"各类APP":pointName
	        });
		}else{
			otherValue+=parseFloat(cnts);
		}
		count++;
	}
	if(total==0) return;
	legends.push(otherName);
	dataArr.push({
        value:otherValue.toFixed(1),
        name:otherName
    });
	dataArr.sort(function(a,b){return b["value"]-a["value"];});//按value 降序
	var series=[{
            name:seriesName,
            type:'pie',
            clockWise:false,
            radius : [0, '45%'],
            itemStyle : dataStyle,
            data:dataArr
        }];
	var option=this.getOptionByData(legends, series,{show:false});
	option.color=['#aee9b9','#54cbed','#5491ec','#715bee','#bf5bef','#e65c5c','#f0c044'];
	this.majorRankChart.setOption(option,true);
	this.majorRankChart.refresh();
};
CIIE.Screen.prototype.getOptionByData=function(legends,series,legendOption,tipFunc){
	var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter:tipFunc
		    },
		    legend: {
		    	show : false,
		    	data:legends,
		    	x:'left',
		    	orient:'vertical',
		    	textStyle:{
		    		color:LSMConsts.baseFontColor,
		    		fontSize:this.chartLabelSize}
		    },
		    toolbox: {
		        show : false
		    },
//		    grid:{
//		    	borderWidth:0
//		    },
		    calculable : false,
		    series : series
		};
	if(legendOption!=null){
		for(var key in legendOption){
			option.legend[key]=legendOption[key];
		}
	}
	return option;
};
CIIE.Screen.prototype.encodeDomId=function(hotname){
	var encoded=hotname.replace(/\./g,'_');
	return encoded;
};