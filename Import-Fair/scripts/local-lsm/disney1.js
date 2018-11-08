var DisneyScreen=DisneyScreen||{};
DisneyScreen.ScreenController=function (hotSpot_)
{
//	this.initGridCols();
//	return;
	_hotSpot = hotSpot_;
	this.initData();
	this.initialize.apply(this, arguments);
	this.initComponents();
};
/** 从ScreenBase继承*/
DisneyScreen.ScreenController.prototype=Object.create(SceneBase.ScreenController.prototype);
DisneyScreen.ScreenController.prototype.constructor=DisneyScreen.ScreenController;
DisneyScreen.ScreenController.prototype.subMenus=["小区详情","小区用户数详情","大数据客流分析系统"];

DisneyScreen.ScreenController.prototype.initObjects=function()
{
	/**
	 * 同比表对象
	 * @private
	 * @type {SceneBase.CompareChart} 
	 */
	this.compareChart=new DisneyScreen.CompareChart
	(
			$("#compareChart")[0],
			{title:"",contentHeight:this.baseChartHeight0},
			this.chartReady.bind(this)
	);
	
	this.customerCompareChart = new DisneyScreen.CustomerCompareChart
	(
			$("#customerCompareChart")[0],
			{title:"",contentHeight:this.baseChartHeight1},
			this.chartReady.bind(this)
	);
	
	this.trafficFlowCompareChart = new DisneyScreen.TrafficFlowCompareChart
	(
			$("#trafficFlowCompareChart")[0],
			{title:"",contentHeight:this.baseChartHeight1},
			this.chartReady.bind(this)
	);
	
	this.flowCompareChart = new DisneyScreen.FlowCompareChart
	(
			$("#flowCompareChart")[0],
			{title:"",contentHeight:this.baseChartHeight1},
			this.chartReady.bind(this)
	);
	
	this.regionDetail=new DisneyScreen.RegionDetail($(".DL4_right_content")[0],_hotSpot,this.changeHotspot.bind(this),this.zoomRegionDetail.bind(this));
	this.regionDetail.drillCompareCallBack=this.loadCustomCompareChartData.bind(this);
	this.regionDetail.kpiType=LSMConsts.kpiTypeSig;
	this.regionDetail.update(true);
	
	
	this.alarmList=new DisneyScreen.AlarmList(_hotSpot);
	this.alarmList.update(true);
};

DisneyScreen.ScreenController.prototype.zoomRegionDetail = function(){
	var winWidth=1600;
	var winHeight=1150;
	var totalJQ=$(".DL4_right");
	var totalDom=totalJQ[0];
	var originTotalWidth=1170;//totalJQ.width();
	var originTotalHeight=388;//totalJQ.height();
	var parentJQ=totalJQ.parent();
	
	var gridJQ=$(".DL4_right_content");
	var gridDom=gridJQ[0];
	var originWidth=gridJQ.width();
	var originHeight=gridJQ.height();
	var originGridHeight=this.regionDetail.gridHeight;
	var originTitleWidth=$("#cellCtrlTitle").width();
	var originMargin=$(".subtitle_txt_right").css("margin");
	var win=new LSMScreen.SimpleWindow({
		title:"",
		width:winWidth,
		height:winHeight,
		x:0,
		y:0,
		beforeClose:function(){
			$("#cellCtrlTitle").width(originTitleWidth);
			$("#regionDetailKpiType").css("display","none");
			$(".regionDetailZoom").css("display","block");
			$(".subtitle_txt_right").css("margin",originMargin);
			$(gridDom).width(originWidth);
			$(gridDom).height(originHeight);
			totalJQ.width(originTotalWidth);
			totalJQ.height(originTotalHeight);
			totalJQ.removeClass("noBG");
			parentJQ.append(totalDom);
			this.regionDetail.useLargerRow=false;
			this.regionDetail.showAllTable=false;
			this.regionDetail.gridHeight=originGridHeight;
			this.regionDetail.resetGrid();
		}.bind(this)
	});
	$(win.content).append(totalDom);
	$("#cellCtrlTitle").width(1550);
	$("#regionDetailKpiType").css("display","block");
	$(".regionDetailZoom").css("display","none");
	$(".subtitle_txt_right").css("margin","0px");//20px 0 0 140px
	totalJQ.addClass("noBG");
	totalJQ.width(winWidth);
	totalJQ.height(winHeight);
	$(gridDom).width(winWidth-50);//左右边距
	$(gridDom).height(winHeight-160);//头部标题 控制按钮高度
	this.regionDetail.useLargerRow=true;
	this.regionDetail.gridHeight=winHeight-260;
	this.regionDetail.resetGrid();
};


DisneyScreen.CompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

DisneyScreen.CompareChart.prototype=Object.create(SceneBase.CompareChart.prototype);
DisneyScreen.CompareChart.prototype.constructor=DisneyScreen.CompareChart;

DisneyScreen.CustomerCompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

DisneyScreen.CustomerCompareChart.prototype=Object.create(SceneBase.CustomerCompareChart.prototype);
DisneyScreen.CustomerCompareChart.prototype.constructor=DisneyScreen.CustomerCompareChart;

DisneyScreen.TrafficFlowCompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

DisneyScreen.TrafficFlowCompareChart.prototype=Object.create(SceneBase.TrafficFlowCompareChart.prototype);
DisneyScreen.TrafficFlowCompareChart.prototype.constructor=DisneyScreen.TrafficFlowCompareChart;

DisneyScreen.FlowCompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

DisneyScreen.FlowCompareChart.prototype=Object.create(SceneBase.FlowCompareChart.prototype);
DisneyScreen.FlowCompareChart.prototype.constructor=DisneyScreen.FlowCompareChart;


/////////////////////////////////////

/**
 * 区域详情
 */
DisneyScreen.RegionDetail=function (dom,hotspot,_spotChangeCallBack,_zoomCallBack)
{
	this.spotChangeCallBack=_spotChangeCallBack;
	this.zoomCallBack=_zoomCallBack;
	this.hotspot=hotspot;
	this.initialize.apply(this, [dom]);
	this.createComponent();
};
DisneyScreen.RegionDetail.prototype=Object.create(SceneBase.RegionDetail.prototype);
DisneyScreen.RegionDetail.prototype.constructor=DisneyScreen.RegionDetail;


////////////////////////////////////

/**
 * 告警列表
 */
DisneyScreen.AlarmList=function (hotspot)
{
	this.hotspot=hotspot;
	this.createComponent();
};

DisneyScreen.AlarmList.prototype=Object.create(SceneBase.AlarmList.prototype);
DisneyScreen.AlarmList.prototype.constructor=DisneyScreen.AlarmList;

DisneyScreen.AlarmList.prototype.neAlarmDataHandler=function(result){
	var filterFlag=true;//this.isFilter();
	var maxCount=3;
	var list=[];
	var tmp=[];
	var count=0;
	
	if(filterFlag){
		for(var i=0;i<result.length;i++){
			var record=result[i];
			if(record.severity==1){
				tmp.push(record);
			}
		}
	}else{
		tmp=result;
	}
	for(var i=0;i<tmp.length;i++){
		var record=tmp[i];
		if(record.cell_name.indexOf("迪")!=-1){
			list.push(record);
			count++;
			if(count>=maxCount){
				break;
			}
		}
	}
	this.neAlarmList=list;
	this.updateGridData();
};


