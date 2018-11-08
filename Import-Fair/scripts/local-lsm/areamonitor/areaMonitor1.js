var CommonScreen=CommonScreen||{};
CommonScreen.ScreenController=function (hotSpot_)
{
//	this.initGridCols();
//	return;
	_hotSpot = hotSpot_;
	this.delayCode=LSMConsts.sceneDelayCode;
	this.initData();
	this.initialize.apply(this, arguments);
	this.initComponents();
};
/** 从ScreenBase继承*/
CommonScreen.ScreenController.prototype=Object.create(SceneBase.ScreenController.prototype);
CommonScreen.ScreenController.prototype.constructor=CommonScreen.ScreenController;
CommonScreen.ScreenController.prototype.subMenus=["区域选择","小区详情","专线信息","短信专线","全网概览","自定义窗口"];
CommonScreen.ScreenController.prototype.jsps=["areaMonitor1.jsp","areaMonitor2.jsp","areaMonitor3.jsp"];


CommonScreen.ScreenController.prototype.initObjects=function()
{
	/**
	 * 同比表对象
	 * @private
	 * @type {SceneBase.CompareChart} 
	 */
	this.compareChart=new CommonScreen.CompareChart
	(
			$("#compareChart")[0],
			{title:"",contentHeight:this.baseChartHeight0},
			this.chartReady.bind(this)
	);
	
	this.customerCompareChart = new CommonScreen.CustomerCompareChart
	(
			$("#customerCompareChart")[0],
			{title:"",contentHeight:this.baseChartHeight1},
			this.chartReady.bind(this)
	);
	
	this.trafficFlowCompareChart = new CommonScreen.TrafficFlowCompareChart
	(
			$("#trafficFlowCompareChart")[0],
			{title:"",contentHeight:this.baseChartHeight1},
			this.chartReady.bind(this)
	);
	
	this.flowCompareChart = new CommonScreen.FlowCompareChart
	(
			$("#flowCompareChart")[0],
			{title:"",contentHeight:this.baseChartHeight1},
			this.chartReady.bind(this)
	);
	
	this.regionDetail=new CommonScreen.RegionDetail($(".DL4_right_content")[0],_hotSpot,this.changeHotspot.bind(this),this.zoomRegionDetail.bind(this));
	this.regionDetail.drillCompareCallBack=this.loadCustomCompareChartData.bind(this);
	this.regionDetail.kpiType=LSMConsts.kpiTypeSig;
	this.regionDetail.update(true);
	
	
	this.alarmList=new CommonScreen.AlarmList(_hotSpot);
	this.alarmList.update(true);
	
	this.additionalKpiInfo=new SceneBase.AdditionalKpiInfo(_hotSpot);
	this.additionalKpiInfo.update(true);
};
CommonScreen.ScreenController.prototype.expandMenuHandler = function(evt){
	var type=evt.type;
	var targetId=$(evt.currentTarget).attr("id");
	var menuBgJQ=$("#lbMenu_expand_bg");
	var basicSrc=menuBgJQ.attr("src");
	basicSrc=basicSrc.substring(0,basicSrc.lastIndexOf("/")+1);
	switch(type){
		case "click":
			switch(targetId){
				case "menu4":
					this.showSubMenuWin();
					break;
				case "menu1":
					window.location.href="areaMonitor1.jsp";
					break;
				case "menu2":
					window.location.href="areaMonitor2.jsp";
					break;
				case "menu3":
					window.location.href="areaMonitor3.jsp";
					break;
			}
			break;
		case "mouseover":
			menuBgJQ.attr("src",basicSrc+targetId+".png");
			break;
		case "mouseout":
			menuBgJQ.attr("src",basicSrc+"menu.png");
			break;
	}
};


CommonScreen.CompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

CommonScreen.CompareChart.prototype=Object.create(SceneBase.CompareChart.prototype);
CommonScreen.CompareChart.prototype.constructor=CommonScreen.CompareChart;

CommonScreen.CustomerCompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

CommonScreen.CustomerCompareChart.prototype=Object.create(SceneBase.CustomerCompareChart.prototype);
CommonScreen.CustomerCompareChart.prototype.constructor=CommonScreen.CustomerCompareChart;

CommonScreen.TrafficFlowCompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

CommonScreen.TrafficFlowCompareChart.prototype=Object.create(SceneBase.TrafficFlowCompareChart.prototype);
CommonScreen.TrafficFlowCompareChart.prototype.constructor=CommonScreen.TrafficFlowCompareChart;

CommonScreen.FlowCompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

CommonScreen.FlowCompareChart.prototype=Object.create(SceneBase.FlowCompareChart.prototype);
CommonScreen.FlowCompareChart.prototype.constructor=CommonScreen.FlowCompareChart;


/////////////////////////////////////

/**
 * 区域详情
 */
CommonScreen.RegionDetail=function (dom,hotspot,_spotChangeCallBack,_zoomCallBack)
{
	this.spotChangeCallBack=_spotChangeCallBack;
	this.zoomCallBack=_zoomCallBack;
	this.hotspot=hotspot;
	this.gridHeight=175;
	this.initialize.apply(this, [dom]);
	this.createComponent();
};
CommonScreen.RegionDetail.prototype=Object.create(SceneBase.RegionDetail.prototype);
CommonScreen.RegionDetail.prototype.constructor=CommonScreen.RegionDetail;

////////////////////////////////////

/**
 * 告警列表
 */
CommonScreen.AlarmList=function (hotspot)
{
	this.hotspot=hotspot;
	this.createComponent();
};

CommonScreen.AlarmList.prototype=Object.create(SceneBase.AlarmList.prototype);
CommonScreen.AlarmList.prototype.constructor=CommonScreen.AlarmList;

CommonScreen.AlarmList.prototype.neAlarmDataHandler=function(result){
	var filterFlag=true;//this.isFilter();
	var maxCount=4;
	var list=[];
	var tmp=[];
	var count=0;
	result=result.sort(function(a,b){
		var stra =a["EVENTTIME"];
		if(stra!=null&&strb!=null){
			stra = stra.replace(/-/g,"/");
			var datea = new Date(stra );
			
			var strb =b["EVENTTIME"];
			strb = strb.replace(/-/g,"/");
			var dateb = new Date(strb );
			
			return dateb.getTime()-datea.getTime();
		}else{
			return -1;
		}
		
	});
	
	if(filterFlag){
		for(var i=0;i<result.length;i++){
			var record=result[i];
			if(record.ALARMSERVERITY==1){
				tmp.push(record);
			}
		}
	}else{
		tmp=list;
	}
	for(var i=0;i<tmp.length;i++){
		var record=tmp[i];
		if(record.NENAME.indexOf("迪")==-1){
			list.push(record);
			count++;
			if(count>=maxCount){
				break;
			}
		}
	}
	this.neAlarmList=list;
	
	//在网元告警列表中插入专线告警
//	var dm=LSMScreen.DataManager.getInstance();
//	dm.getSpList({hotspot:this.hotspot},this.spAlarmDataHandler.bind(this));
	
	this.updateGridData();
	
};
CommonScreen.AlarmList.prototype.spAlarmDataHandler=function(result){
	
	
//	{colName:'时间',name : 'EVENTTIME',index : 'EVENTTIME',width : 260},
//    {colName:'告警对象名称',name : 'LOCATENENAME',index : 'LOCATENENAME',width : 260},
//    {colName:'告警标题',name : 'ALARMTITLE',index : 'ALARMTITLE',width : 300},
//    {colName:'小区名称',name : 'NENAME',index : 'NENAME',width : 260},
//    {colName:'定位信息',name : 'LOCATEINFO',index : 'LOCATEINFO',width : 260},
//    {colName:'告警流水号',name : 'ALARMUNIQUEID',index : 'ALARMUNIQUEID',width : 260},
//    {colName:'告警正文',name : 'ALARMTEXT',index : 'ALARMTEXT',width : 800},
//    {colName:'告警级别',name : 'ALARMSERVERITY',index : 'ALARMSERVERITY',width : 0,hidden:true}
	
//	 {colName:'时间',name : 'time',index : 'time',width : 260},
//     {colName:'告警对象名称',name : 'hot_name',index : 'hot_name',width : 260},
//     {colName:'告警标题',name : 'title',index : 'title',width : 300},
//     {colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 260},
//     {colName:'告警流水号',name : 'record_id',index : 'record_id',width : 260},
////     {colName:'定位信息',name : 'LOCATEINFO',index : 'LOCATEINFO',width : 260},
////     {colName:'告警正文',name : 'ALARMTEXT',index : 'ALARMTEXT',width : 800},
//     {colName:'告警级别',name : 'severity',index : 'severity',width : 0,hidden:true}
	for(var i=0;i<result.length;i++){
		var record=result[i];
		if(record.time!=null){
			this.neAlarmList.push({
				time:record.time,
				hot_name:record.alarm_object,
				title:record.alarm_caption,
				LOCATEINFO:record.line_addr
				});
		}
		
	}
	
	this.updateGridData();
};