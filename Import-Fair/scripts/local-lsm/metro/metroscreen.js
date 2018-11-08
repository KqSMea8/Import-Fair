var MetroScreenNew = MetroScreenNew || {};
MetroScreenNew.ScreenController=function (stationTypeMap){
	this.stationTypeMap=stationTypeMap;
	this.initialize.apply(this, arguments);
};
MetroScreenNew.ScreenController.prototype=Object.create(LSMScreen.ScreenBase.prototype);
MetroScreenNew.ScreenController.prototype.constructor=MetroScreenNew.ScreenController;

MetroScreenNew.ScreenController.prototype.stationTypeMap={};
MetroScreenNew.ScreenController.prototype.userLineTopN=[];
MetroScreenNew.ScreenController.prototype.mainHotspot="地铁";

MetroScreenNew.ScreenController.prototype.mapSelectedHotspot="地铁";//地图点选

MetroScreenNew.ScreenController.prototype.selectedStation="";//表格点选 站点级时查质差小区
MetroScreenNew.ScreenController.prototype.selectedHotspot="";//表格点选
MetroScreenNew.ScreenController.prototype.selectedBusinessKpi="总用户数";//表格点选
MetroScreenNew.ScreenController.prototype.businessSortKey="总用户数";//业务表格排序值
MetroScreenNew.ScreenController.prototype.businessSortKeyDirection="desc";//业务表格排序方式
MetroScreenNew.ScreenController.prototype.cellSortKey="";//劣化小区表格排序值
MetroScreenNew.ScreenController.prototype.cellSortKeyDirection="desc";//劣化小区表格排序方式

MetroScreenNew.ScreenController.prototype.selectedBrand="";//终端点选

MetroScreenNew.ScreenController.prototype.selectedTime=null;//选择时间 空字符串为默认时间

MetroScreenNew.ScreenController.prototype.totalFlow=1;//选择时间 空字符串为默认时间
MetroScreenNew.ScreenController.prototype.totalMetroFlow=1;//选择时间 空字符串为默认时间

MetroScreenNew.ScreenController.prototype.allAppData=[];

MetroScreenNew.ScreenController.prototype.kpiType=LSMConsts.kpiTypeSig;
MetroScreenNew.ScreenController.prototype.cellType="4g";
MetroScreenNew.ScreenController.prototype.kpiConfigMap={};
MetroScreenNew.ScreenController.prototype.currentAllCol1Origin=[];
MetroScreenNew.ScreenController.prototype.currentAllCol2Origin=[];
MetroScreenNew.ScreenController.prototype.currentAllCol1=[];
MetroScreenNew.ScreenController.prototype.currentShowCol1=[];
MetroScreenNew.ScreenController.prototype.currentAllCol2=[];
MetroScreenNew.ScreenController.prototype.currentShowCol2=[];
MetroScreenNew.ScreenController.prototype.baseKpiColWidth=110;
MetroScreenNew.ScreenController.prototype.appRankGridNt="总";//业务小类排名表格 网络类型前缀 总,2G,3G,4G

MetroScreenNew.ScreenController.prototype.lineStationGridHeight=260;
MetroScreenNew.ScreenController.prototype.cellGridHeight=215;
MetroScreenNew.ScreenController.prototype.cellTopN=5;

MetroScreenNew.ScreenController.prototype.businessFirstColWidth=135;

MetroScreenNew.ScreenController.prototype.peakCache={};
MetroScreenNew.ScreenController.prototype.peakCacheDone=0;

MetroScreenNew.ScreenController.prototype.lastChartHotspot=null;
MetroScreenNew.ScreenController.prototype.lastChartLine=null;
MetroScreenNew.ScreenController.prototype.customStart=null;
MetroScreenNew.ScreenController.prototype.customEnd=null;
MetroScreenNew.ScreenController.prototype.timeType=null;//null=5分钟  hour=小时
MetroScreenNew.ScreenController.prototype.tb_time_minutes=1440;
MetroScreenNew.ScreenController.prototype.granularity=5;//5=5分钟  60=小时

MetroScreenNew.ScreenController.prototype.setMapSelectedHotspot=function(hotspot){
	this.selectedHotspot="";
	this.selectedStation="";
	this.mapSelectedHotspot=hotspot;
};
MetroScreenNew.ScreenController.prototype.initConfigs=function(){
	//this.dataManager=new LSMScreen.DataManager();
	this.queryColConfig(this.initComponents.bind(this));
	this.initMenu();
};
MetroScreenNew.ScreenController.prototype.initMenu=function(){
	//左下角菜单
	$("#lbMenu").on('click',this.lbMenuHandler.bind(this));
	$("#lbMenu_expand div").on('mouseover',this.expandMenuHandler.bind(this));
	$("#lbMenu_expand div").on('mouseout',this.expandMenuHandler.bind(this));
	$("#lbMenu_expand div").on('click',this.expandMenuHandler.bind(this));
};

MetroScreenNew.ScreenController.prototype.initComponents=function(){
	$(".icon_exportPic").on('click',this.exportGrid.bind(this));
	$("#subtitleSpan").on('click',this.lineKpiWinHandler.bind(this));
	$("#mainReturnBtn").on("click",this.returnMainHotspot.bind(this));
	$("#terminalReturnBtn").on("click",this.terminalReturnBrand.bind(this));
	$("#expandBtn").on('click',this.changeDetailShow.bind(this));
	$(".timeTypeRadio").on('click',this.changeTimeType.bind(this));
	$(".kpiDrillMain").on('click',this.showMainSpotCompareChart.bind(this));
	
	$(".kpiTypeBtn").on('click',this.kpiTypeChange.bind(this));
	$("#hotAppBtn").on('click',this.hotAppTypeChange.bind(this));
	$(".terminalBtn").on('click',this.terminalTypeChange.bind(this));
	$(".cellType").on('click',this.cellTypeChange.bind(this));
	$("#businessGridColConfig").on('click',this.updateHotspotColConfig.bind(this));
	$("#worstCellGridColConfig").on('click',this.updateCellColConfig.bind(this));
	
	
	
	this.hotAppGrid=$("#hotAppGrid").jqGrid({
        datatype : function(){},
		colNames : ['','用户数','流量(MB)','流量比(PP)','使用次数'],
        colModel : [
                    {name : 'element',index : 'element',width : 85},
                    {name : '用户数',index : '用户数',width : 120},
                    {name : '流量',index : '流量',width : 120},
                    {name : 'allPercent',index : 'allPercent',width : 120},
                    {name : 'HTTP请求次数',index : 'HTTP请求次数',width : 120}
                  ],
        loadui:'disable',
        scrollOffset:0,
        afterInsertRow:this.appRowHandler.bind(this),
        height:290,
        onSortCol:function(index, colindex, sortorder){
        	if(colindex>0){
        		this.hotAppSortKey=index;
        		this.hotAppSortDirection="desc";//sortorder;//业务表格排序方式
	        	this.updateHotAppDataByCache();
        	}
        }.bind(this)
	});
	
	this.businessChart=new LSMScreen.SimpleChart($("#businessChart")[0],{},function(){
			
		this.chartTerminalRank=new P2PScreen.TerminalBarChart(
				$("#terminalChart")[0],
				{},
				function(isReady,echart){
					var ecConfig = require('echarts/config');
					echart.on(ecConfig.EVENT.CLICK,this.terminalRankChartClickHandler.bind(this));
					this.customerCompareChart=new LSMScreen.SimpleChart($("#customerCompareChart")[0],{},function(){
						this.trafficFlowCompareChart=new LSMScreen.SimpleChart($("#trafficFlowCompareChart")[0],{},function(){
							this.flowCompareChart=new LSMScreen.SimpleChart($("#flowCompareChart")[0],{},function(){
								this.trafficCompareChart=new LSMScreen.SimpleChart($("#trafficCompareChart")[0],{},function(){
									this.hotAppChart=new LSMScreen.SimpleChart($("#hotAppChart")[0],{require:['echarts','echarts/chart/bar']},function(){
										this.terminalNtChart=new LSMScreen.DataChartPie($("#terminalNtChart")[0],{require:['echarts','echarts/chart/pie']},function(){
											this.terminalNtChart.echart.on(ecConfig.EVENT.PIE_SELECTED,this.terminalNtChartClickHandler.bind(this));
											this.initPeakData();
											
										}.bind(this));
									}.bind(this));
								}.bind(this));
							}.bind(this));
						}.bind(this));
					}.bind(this));
					
					
				}.bind(this)
		);
		this.chartTerminalRank.showLegend=false;
		this.businessChart.gobackPasser=this.terminalReturnBrand.bind(this);
		
	}.bind(this));
};
MetroScreenNew.ScreenController.prototype.exportGrid=function(e){
	var id=$(e.currentTarget).attr("id");
	switch(id){
	case "exportHotAppGrid":
		SUtils.exportJQGrid(this.hotAppGrid,"热门应用排行");
		break;
	case "exportBusinessGrid":
		SUtils.exportJQGrid(this.businessGrid,"业务指标");
		break;
	case "exportWorstCellGrid":
		SUtils.exportJQGrid(this.worstCellGrid,"质差小区");
		break;
	}
};
MetroScreenNew.ScreenController.prototype.getTimeParamsBySelectedTime=function(){
	var timeType=this.timeType
	var timeBegin=null;
	var timeEnd=null;
	var timeBeginCompare=null;
	var timeEndCompare=null;
	var format="yyyy-MM-dd hh:mm:00";
	if(this.selectedTime!=null){ 
		var endDate = new Date(this.selectedTime.replace(/-/g,"/") );
		timeEnd=endDate.Format(format);
		if(timeType=="day"){
			endDate.setDate(endDate.getDate()-7);
			timeBegin=endDate.Format(format);
			
			endDate = new Date(this.selectedTime.replace(/-/g,"/") );
			endDate.setDate(endDate.getDate()-7);
			timeEndCompare=endDate.Format(format);
			
			endDate = new Date(this.selectedTime.replace(/-/g,"/") );
			endDate.setDate(endDate.getDate()-14);
			timeBeginCompare=endDate.Format(format);
		}else if(timeType=="month"){
			var monthFormat="yyyy-MM-01 00:00:00";
			endDate.setYear(endDate.getFullYear()-1);
			timeBegin=endDate.Format(monthFormat);
			
			endDate = new Date(this.selectedTime.replace(/-/g,"/") );
			endDate.setYear(endDate.getFullYear()-1);
			timeEndCompare=endDate.Format(monthFormat);
			
			endDate = new Date(this.selectedTime.replace(/-/g,"/") );
			endDate.setYear(endDate.getFullYear()-2);
			timeBeginCompare=endDate.Format(monthFormat);
		}else{
			endDate.setMinutes(endDate.getMinutes()-180);
			timeBegin=endDate.Format(format);
			
			endDate = new Date(this.selectedTime.replace(/-/g,"/") );
			endDate.setMinutes(endDate.getMinutes()-1440);
			timeEndCompare=endDate.Format(format);
			
			endDate = new Date(this.selectedTime.replace(/-/g,"/") );
			endDate.setMinutes(endDate.getMinutes()-1620);
			timeBeginCompare=endDate.Format(format);
		}
	}
	
	return {
		timeBegin:timeBegin,
		timeEnd:timeEnd,
		timeBeginCompare:timeBeginCompare,
		timeEndCompare:timeEndCompare
	};
};
MetroScreenNew.ScreenController.prototype.changeTimeType = function(evt){
	var type=$(evt.currentTarget).attr("name");
	$(".timeTypeRadio").removeClass("customRadioSelected");
	$(".timeTypeRadio[name='"+type+"']").addClass("customRadioSelected");
	if(this.timeType==null){
		this.timeMin5Cache=$("#selectedTimeLabel").text();
	}else if(this.timeType=="hour"){
		this.timeHourCache=$("#selectedTimeLabel").text();
	}else if(this.timeType=="day"){
		this.timeDayCache=$("#selectedTimeLabel").text();
	}else if(this.timeType=="month"){
		this.timeMonthCache=$("#selectedTimeLabel").text();
	}
	
	var format="yyyy-MM-dd hh:mm:ss";
	var selectedDate=new Date();
	var now=new Date();//昨天
	var month=new Date();
	selectedDate.setHours(0,0,0,0);
	now.setDate(now.getDate()-1);
	now.setHours(0,0,0,0);
	month.setMonth(month.getMonth()-1);
	month.setHours(0,0,0,0);
	
	
	if(this.selectedTime!=null){
		selectedDate=new Date(this.selectedTime.replace(/-/g,"/") );
	}
	var selectedDateTime=selectedDate.getTime();
	var nowDateTime=now.getTime();
	var monthTime=month.getTime();
	if(type=="min5"){
		this.timeType=null;
		this.granularity=5;
		this.tb_time_minutes=1440;
		if(this.timeMin5Cache!=null){
			$("#selectedTimeLabel").text(this.timeMin5Cache);
		}
		$("#selectedTimeLabel").width(340);
//		this.update();
		selectTimePicked();
	}else if(type=="hour"){
		this.timeType=type;
		this.granularity=60;
		this.tb_time_minutes=1440;
		if(this.timeHourCache!=null){
			$("#selectedTimeLabel").text(this.timeHourCache);
		}else if(this.timeMin5Cache!=null){
			$("#selectedTimeLabel").text(this.timeMin5Cache);
		}
		$("#selectedTimeLabel").width(340);
//		this.update();
		selectTimePicked();
	}else if(type=="day"){
		this.timeType=type;
		this.granularity=1440;
		this.tb_time_minutes=1440*7;
		if(this.timeDayCache!=null){
			$("#selectedTimeLabel").text(this.timeDayCache);
		}else if(selectedDateTime>=nowDateTime){
			$("#selectedTimeLabel").text(now.Format(format));
		}
		$("#selectedTimeLabel").width(180);
		selectTimePicked();
	}else if(type=="month"){
		this.timeType=type;
		this.granularity=43200;
		this.tb_time_minutes=1440*365;
		if(this.timeMonthCache!=null){
			$("#selectedTimeLabel").text(this.timeMonthCache);
		}else if(selectedDateTime>=monthTime){
			$("#selectedTimeLabel").text(month.Format("yyyy-MM-01 00:00:00"));
		}
		$("#selectedTimeLabel").width(130);
		selectTimePicked();
	}
//	var endDate = new Date(this.selectedTime.replace(/-/g,"/") );
	
	
};
MetroScreenNew.ScreenController.prototype.initPeakData = function(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getPeakHotspotKpi({type:"rates"}, this.peakDataInitHandler.bind(this));
	dm.getPeakHotspotKpi({type:"bytes"}, this.peakDataInitHandler.bind(this));
	dm.getPeakHotspotKpi({type:"totalnum"}, this.peakDataInitHandler.bind(this));
};
MetroScreenNew.ScreenController.prototype.peakDataInitHandler = function(result){
	this.extendPeakCache(result);
	this.peakCacheDone++;
	if(this.peakCacheDone==3){
		this.update();
	}
};
MetroScreenNew.ScreenController.prototype.extendPeakCache = function(data){
	for(var hotspot in data){
		if(this.peakCache[hotspot]==null){
			this.peakCache[hotspot]=data[hotspot];
		}else{
			var kpis=data[hotspot];
			for(var kpi in kpis){
				this.peakCache[hotspot][kpi]=kpis[kpi];
			}
		}
	}
};
MetroScreenNew.ScreenController.prototype.updateHotspotColConfig = function(evt){
	this.showColConfig(true,"",this.updateLineAndStationGrid.bind(this));
};
MetroScreenNew.ScreenController.prototype.updateCellColConfig = function(evt){
	var cellType=this.getCellType();
	this.showColConfig(false,cellType,this.refreshCellGrid.bind(this));
};
MetroScreenNew.ScreenController.prototype.cellTypeChange = function(evt){
	var name=$(evt.currentTarget).attr("name");
	this.cellType=name;
	switch(name){
		case "2g":
			$(".cellType").css("text-decoration","none");
			$(".cellType:eq(0)").css("text-decoration","underline");
			break;
		case "3g":
			$(".cellType").css("text-decoration","none");
			$(".cellType:eq(1)").css("text-decoration","underline");
			break;
		case "4g":
			$(".cellType").css("text-decoration","none");
			$(".cellType:eq(2)").css("text-decoration","underline");
			break;
	}
	this.cellSortKey="";
	this.queryColConfig(this.refreshCellGrid.bind(this));
};
MetroScreenNew.ScreenController.prototype.hotAppTypeChange = function(evt){
	var name=$(evt.currentTarget).attr("title");
	switch(name){
		case "表":
			$(evt.currentTarget).attr("title","图");
			$("#hotAppGridParent").css("display","block");
			$("#hotAppChart").css("display","none");
			$(".hotAppBtn").css("text-decoration","none");
			$(".hotAppBtn:eq(0)").css("text-decoration","underline");
			break;
		case "图":
			$(evt.currentTarget).attr("title","表");
			$("#hotAppGridParent").css("display","none");
			$("#hotAppChart").css("display","block");
			this.hotAppChart.echart.resize();
			$(".hotAppBtn").css("text-decoration","none");
			$(".hotAppBtn:eq(1)").css("text-decoration","underline");
			break;
	}
};
MetroScreenNew.ScreenController.prototype.terminalTypeChange = function(evt){
	var name=$(evt.currentTarget).attr("title");
	switch(name){
		case "终端":
			$("#terminalChart").css("display","block");
			$("#terminalNtChart").css("display","none");
			$("#termianlNtHotspot").css("display","none");
			$(".terminalBtn").css("text-decoration","none");
			$(".terminalBtn:eq(0)").css("text-decoration","underline");
			break;
		case "占比":
			$("#terminalChart").css("display","none");
			$("#terminalNtChart").css("display","block");
			$("#termianlNtHotspot").css("display","block");
			
			$(".terminalBtn").css("text-decoration","none");
			$(".terminalBtn:eq(1)").css("text-decoration","underline");
			this.terminalNtChart.echart.resize();
			break;
	}
};
MetroScreenNew.ScreenController.prototype.kpiTypeChange = function(evt){
	var name=$(evt.currentTarget).text();
	switch(name){
		case "信":
			this.cellSortKey="";
			this.businessSortKey="";
			this.kpiType=LSMConsts.kpiTypeSig;
			this.setMapSelectedHotspot(this.mapSelectedHotspot);//重置参数
			this.queryColConfig(function(){
				this.selectedBusinessKpi=this.currentShowCol1[0].index;
				this.updateLineAndStationGrid();
				this.updateCellGrid(this.mapSelectedHotspot,this.selectedStation);
			}.bind(this));
			$(".kpiTypeBtn").css("text-decoration","none");
			$(".kpiTypeBtn:eq(0)").css("text-decoration","underline");
			$(".cellType3G").css("display","inline-block");
			break;
		case "统":
			this.cellSortKey="";
			this.businessSortKey="";
			this.kpiType=LSMConsts.kpiTypeNet;
			this.setMapSelectedHotspot(this.mapSelectedHotspot);//重置参数
			this.queryColConfig(function(){
				this.selectedBusinessKpi=this.currentShowCol1[0].index;
				this.updateLineAndStationGrid();
				this.updateCellGrid(this.mapSelectedHotspot,this.selectedStation);
			}.bind(this));
			$(".kpiTypeBtn").css("text-decoration","none");
			$(".kpiTypeBtn:eq(1)").css("text-decoration","underline");
			$(".cellType3G").css("display","none");
			break;
		case "全":
			$("#businessGridRowLimit").text("N");
			this.updateLineAndStationGridRowLimit();
			break;
		case "N":
			$("#businessGridRowLimit").text("全");
			this.updateLineAndStationGridRowLimit();
			break;
	}
};
MetroScreenNew.ScreenController.prototype.showMainSpotCompareChart = function(evt){
	var name=$(evt.currentTarget).attr("name");
	this.selectedHotspot=this.mapSelectedHotspot;
	switch(name){
		case "用户数":
			this.selectedBusinessKpi="总用户数";
			this.updateBusinessAndQualityChart(this.mapSelectedHotspot);
			break;
		case "下载速率":
			this.selectedBusinessKpi="下行速率500k";
			this.updateBusinessAndQualityChart(this.mapSelectedHotspot);
			break;
		case "数据流量":
			this.selectedBusinessKpi="总流量";
			this.updateBusinessAndQualityChart(this.mapSelectedHotspot);
			break;
		case "话务量":
//			this.selectedBusinessKpi="hwl";
//			this.updateBusinessAndQualityChart(this.mapSelectedHotspot);
			break;
		case "进站":
			this.selectedBusinessKpi="进站用户数";
			this.updateBusinessAndQualityChart(this.mapSelectedHotspot);
			break;
		case "出站":
			this.selectedBusinessKpi="出站用户数";
			this.updateBusinessAndQualityChart(this.mapSelectedHotspot);
			break;
	}
	
};
MetroScreenNew.ScreenController.prototype.changeDetailShow = function(){
	var src=$("#expandBtn").attr("src");
	if($(".DL2").hasClass("largeDL2")){
		$(".DL2").removeClass("largeDL2");
		$(".detailTable").css("display","none");
		$("#expandBtn").attr("src",src.replace("toCollapse.png","toExpand.png"));
	}else{
		$(".DL2").addClass("largeDL2");
		$(".detailTable").css("display","block");
		$("#expandBtn").attr("src",src.replace("toExpand.png","toCollapse.png"));
	}
};
MetroScreenNew.ScreenController.prototype.lineKpiWinHandler=function(){
	var line=this.mapSelectedHotspot;
	var key=line.replace("地铁","").replace("号线","");
	var detail=new KpiComponent.DetailQuery();
	detail.LINE_NAME=line;
	detail.LINE_INDEX=key;
	detail.showLineKpi();
};
MetroScreenNew.ScreenController.prototype.returnMainHotspot=function(){
	this.setMapSelectedHotspot(this.mainHotspot);
	this.update();
	
	var iframe=$("#metroSwfFrame")[0];
	if(iframe){
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.NS_SW_resetHighlightLine();
	}
	
};
MetroScreenNew.ScreenController.prototype.terminalReturnBrand=function(){
	this.selectedBrand="";
	$("#terminalReturnBtn").css("display","none");
	this.updateTerminalChart(this.selectedBrand,this.mapSelectedHotspot);
};

MetroScreenNew.ScreenController.prototype.update=function(){
//	this.updateTextInfo();
	if(this.granularity>1440){
		this.selectedTime=this.selectedTime.substring(0,7)+"-01 00:00:00";
	}
	if(this.mapSelectedHotspot==this.mainHotspot){
		$("#subtitleSpan").html("地铁场景");
		$("#mainReturnBtn").css("display","none");
	}else{
		var colorSpan='';
		var key=this.mapSelectedHotspot.replace("地铁","").replace("号线","");
		var color=LSMConsts.metroLineColorMap[key];
		if(color!=null){
			colorSpan="地铁场景--"+'<span style="cursor:pointer;color:#ffffff;background:'+color+'">&nbsp&nbsp'+this.mapSelectedHotspot+'&nbsp&nbsp</span>';
		}else{
			colorSpan="地铁场景--"+this.mapSelectedHotspot;
		}
		$("#subtitleSpan").html(colorSpan);
		$("#mainReturnBtn").css("display","inline-block");
	}
	this.updateTerminalNtChart(this.mapSelectedHotspot,this.timeType);
	this.updateOverview();
	this.updateLineAndStationGrid();
	this.updateAppGrid();
	this.updateTerminalChart(this.selectedBrand,this.mapSelectedHotspot);//this.mapSelectedHotspot
	this.updateCellGrid(this.mapSelectedHotspot,this.selectedStation);
	
};

MetroScreenNew.ScreenController.prototype.updateTerminalNtChart=function(hotspot,timeType){
	var dm=LSMScreen.DataManager.getInstance();
	var timeType="h";
	var type="dm_sn_metro_line";
	var name=hotspot;
	if(hotspot.indexOf("地铁")!=-1){
		type="dm_sn_metro_line";
	}else{
		type="dm_sn_metro_line_station";
	}
	if(timeType=="day"){
		timeType="d";
	}
	$("#termianlNtHotspot").text(hotspot);
	dm.getMetroTerminalDistribute({timeType:timeType,type:type,name:name},this.terminalNTChartDataHandler.bind(this));
};
MetroScreenNew.ScreenController.prototype.terminalNTChartDataHandler=function(result){
	
	var pieData=result.data==null||result.data.length<1?{}:result.data[0];
	var legends=['占比'];
	var series=[{
		name:'占比',
        type:'pie',
        radius : '55%',
        center: ['50%', '50%'],
        selectedMode:'single',
        data:[
            {value:pieData['2G'], name:'2G'},
            {value:pieData['3G'], name:'3G'},
            {value:pieData['4G'], name:'4G'}
        ]
	}];
	this.terminalNtChart.updateData(this.terminalNtChart.getOptionByData(legends,series,{},'{a} <br/>{b} : {c} ({d}%)'), true);
};

MetroScreenNew.ScreenController.prototype.terminalNtChartClickHandler=function(param,param2){
	var selected = param.selected[0];
    var ntType = "总";
    for(var i=0;i<selected.length;i++){
    	if(selected[i]==true){
    		ntType=param.target;
    		break;
    	}
    }
    this.appRankGridNt=ntType;
	this.updateAppGrid(); 
};
MetroScreenNew.ScreenController.prototype.terminalRankChartClickHandler=function(param){
	if (param.type == 'click'&&param.seriesName.indexOf("  ")!=-1) {
		var brand=param.name;
		this.selectedBrand=brand;		
		this.updateTerminalChart(this.selectedBrand,this.mapSelectedHotspot);
		$("#terminalReturnBtn").css("display","block");
	}
};

MetroScreenNew.ScreenController.prototype.updateTerminalChart=function(brand,hotspot){
	var option={
			topN:8,
			type:"brand"
		};
	if(brand!=""&&brand!=null){
		option.type="model";
		option.terminal_brand=brand;
	}
	this.chartTerminalRank.update(false,option);
};


MetroScreenNew.ScreenController.prototype.updateAppGrid=function(){
	if(this.granularity>60){
		return;
	}
	var dm=LSMScreen.DataManager.getInstance();
	
	if(this.timeType=="hour"){
		dm.getAllStreamRecordHour({},this.allBytesDataHandler.bind(this));
	}else{
		dm.getBytesRecord({},this.allBytesDataHandler.bind(this));
	}
	
	
};
MetroScreenNew.ScreenController.prototype.allBytesDataHandler=function(result){
	this.totalFlow=result[this.appRankGridNt+"流量"];
	var dm=LSMScreen.DataManager.getInstance();
	dm.getAppRank({
		granularity:this.granularity,
		num:-1,
		time:this.selectedTime
	},this.allAppGridDataHandler.bind(this));
	
};
MetroScreenNew.ScreenController.prototype.allAppGridDataHandler=function(arr){//全网业务数据
	this.allAppData=arr;
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getAppRank({
		sortKey:this.appRankGridNt+"用户数",
		granularity:this.granularity,
		hotspot:this.mapSelectedHotspot,
		time:this.selectedTime,
		num:-1
	},this.appGridDataHandler.bind(this));
};
MetroScreenNew.ScreenController.prototype.appGridDataHandler=function(arr){
	var kpiKey=this.appRankGridNt+"流量";
	var gridData=[];
	var allMap={};
	var i=0;
	for(i=0;i<this.allAppData.length;i++){
		allMap[this.allAppData[i].element]=this.allAppData[i];
	}
	for(i=0;i<arr.length;i++){
		var record=arr[i];
		var allRecord=allMap[record.element];
		record["用户数"]=record[this.appRankGridNt+"用户数"];
		record["流量"]=record[this.appRankGridNt+"流量"];
		record.allPercent=parseFloat((record[kpiKey]/this.totalMetroFlow*100-allRecord[kpiKey]/this.totalFlow*100).toFixed(2));
		if(parseFloat(record.allPercent)>0){
			record.allPercent="+"+record.allPercent;
		}
		gridData.push(record);
	}
	var typeAppend=this.appRankGridNt;
	if(typeAppend=="总"){
		$("#hotAppGridLegend").css("fontSize",20);
		typeAppend="";
	}else{
		$("#hotAppGridLegend").css("fontSize",14);
		typeAppend="<br>-"+this.appRankGridNt;
	}
	if(this.mapSelectedHotspot==this.mainHotspot){
		$("#hotAppGridLegend").css("fontSize",20);
		$("#hotAppGridLegend").html(""+typeAppend.replace("<br>-",""));
	}else{
		$("#hotAppGridLegend").html(this.mapSelectedHotspot.replace("地铁", "")+typeAppend);
	}
	var convertedData=this.arrDataConvert(gridData);
	this.appGridDataCache=convertedData;
	
	this.updateHotAppDataByCache();
	
	
};
MetroScreenNew.ScreenController.prototype.updateHotAppDataByCache=function(){
	if(this.hotAppSortKey==null){
		this.hotAppSortKey=this.appRankGridNt+"用户数";
	}
	if(this.hotAppSortDirection==null){
		this.hotAppSortDirection="desc";
	}
	if(this.hotAppSortDirection=="asc"){
		this.appGridDataCache.sort(function(a,b){return a[this.hotAppSortKey]-b[this.hotAppSortKey];}.bind(this));
	}else{
		this.appGridDataCache.sort(function(a,b){return b[this.hotAppSortKey]-a[this.hotAppSortKey];}.bind(this));
	}
	var temp=[];
	for(var i=0;i<6&&i<this.appGridDataCache.length;i++){
		temp.push(this.appGridDataCache[i]);
	}
	
	this.hotAppGrid.clearGridData();
	this.hotAppGrid[0].addJSONData(temp);
	this.updateHotAppChart(temp);
};
MetroScreenNew.ScreenController.prototype.updateHotAppChart=function(arr){
	var data1=[];
	var xArr=[];
	var kpi=this.hotAppSortKey;
	var seriesName=kpi;
	if(kpi=="allPercent"){
		seriesName="流量比";
	}
	for(var i=arr.length-1;i>=0;i--){
		var record=arr[i];//this.recordDataConvert(arr[i]);
		xArr.push(record.element);
		data1.push(record[kpi]);
	}
	var dataStyle = {
		    normal: {
		        label: {show:true,position:"outter",textStyle:{fontSize:LSMScreen.CHARTCONFIG.labelSize}},
		        labelLine: {show:true,length:0}
		    }
		};
	var series=[{
        name:seriesName,
        type:'bar',
        itemStyle : dataStyle,
        data:data1
    }];
	var option = {
			color:["#0f84f6"],
		    tooltip : {
		        trigger: 'item',
		        formatter:'{b}<br/>'
		    		+'{a0}:{c0}<br/>'
		    },
		    legend: {
		    	show : false,
		    	data:[seriesName],
		    	selectedMode:false,
		    	textStyle:{
		    		fontSize:20,
		    		color:"#ffffff"
		    	}
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'value',
		            min:0,
		            position:'top',
		            scale:true,
		            splitNumber:2,
		            axisLabel:{
		            	textStyle:{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
		            	}
		            },
		            splitLine:{show:false},
		            axisLine:{show:false}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            boundaryGap : true,
		            data : xArr,
		            axisLabel:{
		            	textStyle:{color:LSMScreen.CHARTCONFIG.yAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize}
		            },
		            splitLine:{show:false},
		            axisLine:{show:false}
		        }
		    ],
		    grid:{
		    	borderWidth:0,
		    	x:120,
		    	y2:10
		    },
		    series : series
		};
	
	this.hotAppChart.updateData(option, true);
};
MetroScreenNew.ScreenController.prototype.refreshCellGrid=function(){
	this.updateCellGrid(this.mapSelectedHotspot,this.selectedStation);
};
MetroScreenNew.ScreenController.prototype.updateCellGrid=function(line,station){
	if(this.granularity>60){
		return;
	}
	var colNames=[''];
	var cols=[];
	if(this.kpiType==LSMConsts.kpiTypeSig){
		cols=[{name : "name",index : "name",width : 310,frozen:true}];
	}else{
		cols=[{name : "cell_name",index : "cell_name",width : 310,frozen:true}];
	}
	var selectedCols=this.currentShowCol2;
	var width1=0;
	width1+=cols[0].width;
	for(var i=0;i<selectedCols.length;i++){
		var colRecord=selectedCols[i];
		colNames.push(colRecord.colName);
		colRecord.formatter=this.compositeColRenderer.bind(this);
		cols.push(colRecord);
		width1+=colRecord.width;
	}
	if(this.cellSortKey==""){ 
		this.cellSortKey=selectedCols[0].index;
	}
	var opt1={
	        datatype : function(){},
			colNames : colNames,
	        colModel : cols,
	        loadui:'disable',
	        scrollOffset:0,
	        autowidth:true,
	        shrinkToFit:false,
	        autoScroll: false,
	        height:this.cellGridHeight,
	        onSortCol:function(index, colindex, sortorder){
	        	if(colindex>0){
	        		this.cellSortKey=index;
	        		this.cellSortKeyDirection=sortorder;//业务表格排序方式
		        	this.updateCellGridDataOnly(this.mapSelectedHotspot,this.selectedStation);
	        	}
	        }.bind(this)
		};
	
	var baseWidth=$("#worstCellGrid").parent().width();
	if(width1-baseWidth<50){
		opt1.width=baseWidth;
		opt1.shrinkToFit=true;
		opt1.scrollOffset=0;
	}
	if(this.worstCellGrid) this.worstCellGrid.GridUnload("worstCellGrid");
	this.worstCellGrid=$("#worstCellGrid").jqGrid(opt1);
	this.updateCellGridDataOnly(line,station);
};
MetroScreenNew.ScreenController.prototype.updateCellGridDataOnly=function(line,station){
	if(this.granularity>60){
		return;
	}
	var dm=LSMScreen.DataManager.getInstance();
	var cellType=this.getCellType();
	var param={
		    "hotspot": line,    
		    "group": "cell",           
		    "max_threads": "10",
		    "cell_fields": "cell_name",
		    "domains": cellType,
		    "all_fields":null,
			"hot_fields":null,
			"timeType":this.timeType,
			"orderName":this.cellSortKey,
		    "orderType":this.cellSortKeyDirection,
		    "topN":this.cellTopN
		};
	if(station!=""&&station!=null){
		if(this.kpiType==LSMConsts.kpiTypeSig){
			dm.getMetroSites({
				line:line.replace("地铁","").replace("号线",""),
				station:station,
				time:this.selectedTime
			},this.cellGridSitesHandler.bind(this));
		}else{
			param.hotspot=station;
			dm.getXpmData(param,this.wsCellGridDataHandler.bind(this));
		}
	}else{
		if(this.kpiType==LSMConsts.kpiTypeSig){
			dm.getSitesKpisRank({
				exclude0:false,
				hotspot:line,
				timeType:this.timeType,
				time:this.selectedTime,
				sortKey:this.cellSortKey,
				order:this.cellSortKeyDirection,
				rat:cellType.toUpperCase(),
				sites:null,
				num:this.cellTopN
			},this.cellGridDataHandler.bind(this));
		}else{
			dm.getXpmData(param,this.wsCellGridDataHandler.bind(this));
		}
		
	}
};
MetroScreenNew.ScreenController.prototype.cellGridSitesHandler=function(arr){
	if(this.granularity>60){
		return;
	}
	var cellType=this.getCellType();
	var dm=LSMScreen.DataManager.getInstance();
	dm.getSitesKpisRank({
		timeType:this.timeType,
		exclude0:true,
		sites:arr,
		time:this.selectedTime,
		sortKey:this.cellSortKey,
		order:this.cellSortKeyDirection,
		rat:cellType.toUpperCase(),
		num:this.cellTopN
	},this.cellGridDataHandler.bind(this));
};
MetroScreenNew.ScreenController.prototype.wsCellGridDataHandler=function(result){
	var cellData=result;
	var topNData=[];
	var sortKey=this.cellSortKey;
	if(this.cellSortKeyDirection=="desc"){
		cellData.sort(function(a,b){return b[sortKey]-a[sortKey];});
	}else{
		cellData.sort(function(a,b){return a[sortKey]-b[sortKey];});
	}
	for(var i=0;i<cellData.length&&i<this.cellTopN;i++){
		topNData.push(cellData[i]);
	}
	this.worstCellGrid.clearGridData();
	this.worstCellGrid[0].addJSONData(topNData);
};
MetroScreenNew.ScreenController.prototype.cellGridDataHandler=function(result){
//	var station=this.selectedStation;
//	if(station!=""&&station!=null){
//		$("#jqgh_worstCellGrid_name").text("质差小区("+station+")");
//	}else if(this.mapSelectedHotspot==this.mainHotspot){
//		$("#jqgh_worstCellGrid_name").text("质差小区");
//	}else{
//		$("#jqgh_worstCellGrid_name").text("质差小区("+this.mapSelectedHotspot.replace("地铁", "")+")");
//	}
	for(var i=0;i<result.length;i++){
		this.processDataByKpiMap(result[i]);
	}
	this.worstCellGrid.clearGridData();
	this.worstCellGrid[0].addJSONData(result);
};
MetroScreenNew.ScreenController.prototype.updateBusinessAndQualityChart=function(hotspot,line){
	var kpiType=this.kpiType;
	this.lastChartHotspot=hotspot;
	this.lastChartLine=line;
	
	var dm=LSMScreen.DataManager.getInstance();
	var timeBegin=null;
	var timeEnd=null;
	var timeBeginCompare=null;
	var timeEndCompare=null;
	var format="yyyy-MM-dd hh:mm:00";
	if(this.customStart!=null&&this.customEnd!=null&&this.customStart!=""&&this.customEnd!=""){
		var customStartDate = new Date(this.customStart.replace(/-/g,"/") );
		var customEndDate = new Date(this.customEnd.replace(/-/g,"/") );
		timeBegin=customStartDate.Format(format);
		timeEnd=customEndDate.Format(format);
		customStartDate.setMinutes(customStartDate.getMinutes()-1440);
		customEndDate.setMinutes(customEndDate.getMinutes()-1440);
		timeBeginCompare=customStartDate.Format(format);
		timeEndCompare=customEndDate.Format(format);
	}else if(this.selectedTime!=null){ 
		var timeParams=this.getTimeParamsBySelectedTime();
		timeBegin=timeParams.timeBegin;
		timeEnd=timeParams.timeEnd;
		timeBeginCompare=timeParams.timeBeginCompare;
		timeEndCompare=timeParams.timeEndCompare;
	}else{
		var format5="yyyy-MM-dd 05:00:00";
		var format23="yyyy-MM-dd hh:mm:00";
		var date = new Date();
		timeEnd=date.Format(format23);
		timeBegin=date.Format(format5);
		date.setMinutes(date.getMinutes()-60*24);
		timeEndCompare=date.Format(format23);
		timeBeginCompare=date.Format(format5);
	}
	if(this.selectedBusinessKpi=="进站用户数"){
		dm.getMetroLineInOutCustomerTrend({granularity:this.granularity,type:"in",line:line,timeBegin:timeBegin,timeEnd:timeEnd,timeBeginCompare:timeBeginCompare,timeEndCompare:timeEndCompare},this.businessAndQualityChartDataHandler.bind(this));
	}else if(this.selectedBusinessKpi=="出站用户数"){
		dm.getMetroLineInOutCustomerTrend({granularity:this.granularity,type:"out",line:line,timeBegin:timeBegin,timeEnd:timeEnd,timeBeginCompare:timeBeginCompare,timeEndCompare:timeEndCompare},this.businessAndQualityChartDataHandler.bind(this));
	}else if(kpiType==LSMConsts.kpiTypeNet||this.selectedBusinessKpi=="hwl"){
		var targetName=hotspot;
		var targetType="hotspot";
		if(targetType=="hotspot"){
			var _params = 
			{
			    hotspot:targetName,    
			    timeRange:"true",
			    group:"all",            
			    max_threads:"10",
			    all_fields:"time",
			    "domains": "2g,4g",
			    "tb_domains": "2g,4g",
			    "hb_domains": "2g,4g",
				tb_time_minutes:this.tb_time_minutes,
				timeType:this.timeType,
			    "all_fields":null,
				hot_fields:null,
				startTime:timeBegin,
				endTime:timeEnd
			};
			
			LSMScreen.DataManager.prototype.getXpmData(_params, 
					function(result){
				this.businessAndQualityChartDataHandler(result);
			}.bind(this));
		}else if(targetType=="cell"){
			var _params = 
			{
				lac_ci:targetName.replace(":","-"),    
			    timeRange:"true",
			    group:"all",            
			    max_threads:"10",
			    "domains": "2g,4g",
			    "tb_domains": "2g,4g",
			    "hb_domains": "2g,4g",
				tb_time_minutes:this.tb_time_minutes,
				timeType:this.timeType,
			    "all_fields":null,
				hot_fields:null,
				startTime:timeBegin,
				endTime:timeEnd
			};
			LSMScreen.DataManager.prototype.getXpmData(_params, 
					function(result){
				this.businessAndQualityChartDataHandler(result);
			}.bind(this));
		}
	}else if(kpiType==LSMConsts.kpiTypeSig){
//		if(hotspot.indexOf("地铁")!=-1){
//			dm.getHotSpotsKpisCompared(hotspot, timeBegin, timeEnd, timeBeginCompare, timeEndCompare,this.timeType,this.businessAndQualityChartDataHandler.bind(this));
//		}else{
//			dm.getMetroStationsKpiTrend({timeType:this.timeType,line:line,station:hotspot,timeBegin:timeBegin,timeEnd:timeEnd,timeBeginCompare:timeBeginCompare,timeEndCompare:timeEndCompare},this.businessAndQualityChartDataHandler.bind(this));
//		}
		if(hotspot.indexOf("地铁")!=-1){
		}else{
			hotspot=line+"号线-"+hotspot;
		}
		dm.getHotSpotsKpisCompared(hotspot, timeBegin, timeEnd, timeBeginCompare, timeEndCompare,this.timeType,this.businessAndQualityChartDataHandler.bind(this),null,null,null,true);
	}
	
};
MetroScreenNew.ScreenController.prototype.businessAndQualityChartDataHandler=function(arr){
	var selectedBusinessKpi=this.selectedBusinessKpi;
	var config=this.kpiConfigMap[selectedBusinessKpi];
	var kpiName=selectedBusinessKpi;
	var kpiKey=selectedBusinessKpi;
	if(selectedBusinessKpi.indexOf(',')!=-1){
		return;
	}
	if(config!=null){
		kpiKey=config.kpiFullName;
		kpiName=config.kpiName;
	}
	var businessData=[];
	var compareData=[];
	var peakData=[];
	var xArr=[];
	var peakValue=null;
	var startTime="";
	var endTime="";
	if(this.peakCache[this.selectedHotspot]!=null){
		if(this.peakCache[this.selectedHotspot][kpiKey]!=null){
			peakValue=this.processValueByKpiKey(this.peakCache[this.selectedHotspot][kpiKey],kpiKey);
		}
	}
	var businessSeries=[];
	var tipFormatter='{b}<br/>'
		+'{a0}:{c0}<br/>'
		+'{a1}:{c1}<br/>';
	var legendArr=["当前","同比"];
	
	if(kpiKey=="总流量"){
		legendArr=["2G","3G","4G","总流量"];
//		tipFormatter='{b}<br/>'
//			+'{a0}:{c0}<br/>'
//			+'{a1}:{c1}<br/>'
//			+'{a2}:{c2}<br/>'
//			+'{a3}:{c3}<br/>';
		
		tipFormatter=function(params){
			var tip="流量<br/>"
				+params[0].seriesName+':'+params[0].value+'('+(params[0].value/params[3].value*100).toFixed(2)+'%)'+'<br/>'
				+params[1].seriesName+':'+params[1].value+'('+(params[1].value/params[3].value*100).toFixed(2)+'%)'+'<br/>'
				+params[2].seriesName+':'+params[2].value+'('+(params[2].value/params[3].value*100).toFixed(2)+'%)'+'<br/>'
				+params[3].seriesName+':'+params[3].value;
			return tip;
		}; 
		
		var keyAll="总流量";
		var key2g="2G流量";
		var key3g="3G流量";
		var key4g="4G流量";
		var dataAll=[];
		var data2g=[];
		var data3g=[];
		var data4g=[];
		for(var i=0;i<arr.length;i++){
			
			
			var record=arr[i];
			var time=record.time;
			var valueAll=(record[keyAll]/1024).toFixed(2);
			var value2g=(record[key2g]/1024).toFixed(2);
			var value3g=(record[key3g]/1024).toFixed(2);
			var value4g=(record[key4g]/1024).toFixed(2);
			var showTime="";
			if(this.timeType=="day"){
				showTime=time.substring(5,10);
			}else if(this.timeType=="month"){
				showTime=time.substring(5,7)+"月";
			}else{
				showTime=time.substring(11,16);
			}
			
			xArr.push(showTime);
			if(i==arr.length-1&&i>1){
				var lastValue2g=data2g[i-1];
				var lastlastValue2g=data2g[i-2];
				
				var lastValue3g=data3g[i-1];
				var lastlastValue3g=data3g[i-2];
				
				var lastValue4g=data4g[i-1];
				var lastlastValue4g=data4g[i-2];
				
				var lastValueAll=dataAll[i-1];
				var lastlastValueAll=dataAll[i-2];
				
				if(value2g<lastValue2g*0.7){
					value2g=lastValue2g-(lastlastValue2g-lastValue2g);
					value2g=value2g.toFixed(2);
				}
				
				if(value3g<lastValue3g*0.7){
					value3g=lastValue3g-(lastlastValue3g-lastValue3g);
					value3g=value3g.toFixed(2);
				}
				
				if(value4g<lastValue4g*0.7){
					value4g=lastValue4g-(lastlastValue4g-lastValue4g);
					value4g=value4g.toFixed(2);
				}
				
				if(valueAll<lastValueAll*0.7){
					valueAll=lastValueAll-(lastlastValueAll-lastValueAll);
					valueAll=valueAll.toFixed(2);
				}
			}
			dataAll.push(valueAll);
			data2g.push(value2g);
			data3g.push(value3g);
			data4g.push(value4g);
			if(i==0){
				startTime=time.substring(5,16);
			}
			if(i==arr.length-1){
				endTime=time.substring(5,16);
			}
		}
		
		businessSeries=[{
	        name:"4G",//this.selectedHotspot+":"+kpiName,
	        type:'line',
	        data:data4g,
	        itemStyle:{normal:{lineStyle:{width:2}}},
	        markPoint : {
	        	itemStyle:{normal:{color:"#ff0000"}},
	            data : []
	        }
	    },{
	        name:"3G",//this.selectedHotspot+":"+kpiName,
	        type:'line',
	        data:data3g,
	        itemStyle:{normal:{lineStyle:{width:2}}},
	        markPoint : {
	        	itemStyle:{normal:{color:"#ff0000"}},
	            data : []
	        }
	    },{
	        name:"2G",//this.selectedHotspot+":"+kpiName,
	        type:'line',
	        data:data2g,
	        itemStyle:{normal:{lineStyle:{width:2}}},
	        markPoint : {
	        	itemStyle:{normal:{color:"#ff0000"}},
	            data : []
	        }
	    },{
	        name:"总流量",//this.selectedHotspot+":"+kpiName,
	        type:'line',
	        data:dataAll,
	        itemStyle:{normal:{lineStyle:{width:2}}},
	        markPoint : {
	        	itemStyle:{normal:{color:"#ff0000"}},
	            data : []
	        }
	    }
	    ];
	}else{
		for(var i=0;i<arr.length;i++){
			
			var record=arr[i];
			var time=record.time;
			var businessValue=this.processValueByKpiKey(record[kpiKey],kpiKey);
			var compareValue=this.processValueByKpiKey(record[kpiKey]/record[kpiKey+"历史比"],kpiKey);
			if(isNaN(compareValue)){
				compareValue=this.processValueByKpiKey(record[kpiKey+"_hb"],kpiKey);
			}
			if(kpiKey=="hwl"){
				var hwl2g=record["2ghwl"];
				var hwl3g=record["3ghwl"];
				
				var hwl2g_hb=record["2ghwlHb"];
				var hwl3g_hb=record["3ghwlHb"];
				
				if(isNaN(hwl2g)&&isNaN(hwl3g)){
					businessValue=NaN;
				}else{
					if(isNaN(hwl2g)){
						hwl2g=0;
					}
					if(isNaN(hwl3g)){
						hwl3g=0;
					}
					businessValue=this.processValueByKpiKey(hwl2g*1+hwl3g*1,kpiKey);
				}
				
				if(isNaN(hwl2g_hb)&&isNaN(hwl3g_hb)){
					compareValue=NaN;
				}else{
					if(isNaN(hwl2g_hb)){
						hwl2g_hb=0;
					}
					if(isNaN(hwl3g_hb)){
						hwl3g_hb=0;
					}
					compareValue=this.processValueByKpiKey(hwl2g_hb*1+hwl3g_hb*1,kpiKey);
				}
			}
			if(isNaN(businessValue)){
				continue;
			}
			
			
			var showTime="";
			if(this.timeType=="day"){
				showTime=time.substring(5,10);
			}else if(this.timeType=="month"){
				showTime=time.substring(5,7)+"月";
			}else{
				showTime=time.substring(11,16);
			}
			
			xArr.push(showTime);
			if(i==arr.length-1&&i>1){
				var lastValue=businessData[i-1];
				var lastlastValue=businessData[i-2];
				
				if(businessValue<lastValue*0.7){
					businessValue=lastValue-(lastlastValue-lastValue);
				}
				
			}
			peakData.push(peakValue);
			businessData.push(businessValue);
			compareData.push(compareValue);
			if(i==0){
				startTime=time.substring(5,16);
			}
			if(i==arr.length-1){
				endTime=time.substring(5,16);
			}
		}
		
		businessSeries=[{
	        name:"当前",//this.selectedHotspot+":"+kpiName,
	        type:'line',
	        data:businessData,
	        itemStyle:{normal:{lineStyle:{width:2}}},
	        markPoint : {
	        	itemStyle:{normal:{color:"#ff0000"}},
	            data : []
	        }
	    }
		,{
	        name:"同比",
	        type:'line',
	        data:compareData,
	        itemStyle:{normal:{lineStyle:{width:2}}}
	    }
	    ];
	}
	
	
	if(peakValue!=null){
//		businessSeries.push({
//			name:"历史峰值",
//	        type:'line',
//	        data:peakData,
//	        itemStyle:{normal:{lineStyle:{width:2}}}
//		});
//		tipFormatter='{b}<br/>'
//			+'{a0}:{c0}<br/>'
//			+'{a1}:{c1}<br/>'
//			+'{a2}:{c2}<br/>';
//		legendArr=["当前","同比","历史峰值"];
	}
	var unit="";
	var config=this.kpiConfigMap[selectedBusinessKpi];
	if(config!=null){
		unit="("+config.unit+")";
	}
	var titleHtml=this.selectedHotspot+":"+kpiName+unit+'&nbsp&nbsp&nbsp&nbsp<span class="compareTimeValueBtn"  style="text-decoration:underline;">时间</span>：'
				+startTime
				+'~'
				+endTime;
	$("#compareTitle").html(titleHtml);
	$(".compareTimeValueBtn").on('click',this.showCompareTimeChooser.bind(this));
	this.businessChart.reinitEChart();
	this.businessChart.updateData(this.getSimpleChartOption(businessSeries,xArr,legendArr,tipFormatter,""), true);
};
MetroScreenNew.ScreenController.prototype.getSimpleChartOption=function(series,xArr,legends,tipFormatter,title){
	if(tipFormatter==null){
		tipFormatter='{a0}<br/>时间:{b0}<br/>值:{c0}';
	}
	var option = {
			title:{
				show:true,
				text:title,
				textStyle:{
					color:"#ffffff"
				}
			},
			color:['#00ff5a','#fced00','#7B68EE','#33ccff'],
		    legend: {
		        data:legends,
		        x:"right",
		        textStyle :
        		{
		        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
        		},
		    },
			grid:{
		    	borderWidth:0,
		    	x:100,
		    	y:50,
		    	x2:30,
		    	y2:70
		    },
		    tooltip : {
		        trigger: 'axis',
		        formatter:tipFormatter
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'category',
		            axisLabel : {
		            	textStyle :
		            		{
			            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
			            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
		            		}
		            },
		            axisLine:{
		            	lineStyle:{
		            		color: LSMScreen.CHARTCONFIG.xAxisColor,
			                width: 2,
			                type: 'solid'
		            	}
		            },
		            splitLine:{
		            	lineStyle:{
		            		color: LSMScreen.CHARTCONFIG.xAxisColor,
		            		width: 1,
			                type: 'solid'
		            	}
		            },
		            formatter: '{value}',
		            data : xArr
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel : {
		            	textStyle :
		            		{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize
		            		}
		            },
		            axisLine:{
		            	lineStyle:{
		            		color: LSMScreen.CHARTCONFIG.yAxisColor,
			                width: 2,
			                type: 'solid'
		            	}
		            },
		            splitLine:{
		            	lineStyle:{
		            		color:LSMScreen.CHARTCONFIG.yAxisColor,
		            		width: 1,
			                type: 'solid'
		            	}
		            },
		            formatter: '{value}',
		            min:0
		        }
		    ],
		    series : series,
		};
	return option;
};
MetroScreenNew.ScreenController.prototype.getExtremeSimpleChartOption=function(data,xArr,type){
	if(type==null){
		type="line";
	}
	var option = {
		    calculable : false,
		    color:['#f4008b'],
		    grid:{
		    	borderWidth:0,
		    	x:30,
		    	y:0,
		    	x2:0,
		    	y2:0
		    },
		    xAxis : [
		        {
		        	show:false,
		            data : xArr
		        }
		    ],
		    yAxis : [
		        {
		        	show:false,
		        }
		    ],
		    series : [
		        {
		            type:type,
		            data:data
		        }
		    ]
		};
	return option;
};
MetroScreenNew.ScreenController.prototype.updateOverview=function(){
	var timeType=this.timeType;
	var format="yyyy-MM-dd hh:mm:ss";
	var dm=LSMScreen.DataManager.getInstance();
	
	var timeBegin=null;
	var timeEnd=null;
	var timeBeginCompare=null;
	var timeEndCompare=null;
	
	if(this.selectedTime!=null){
		var timeParams=this.getTimeParamsBySelectedTime();
		timeBegin=timeParams.timeBegin;
		timeEnd=timeParams.timeEnd;
		timeBeginCompare=timeParams.timeBeginCompare;
		timeEndCompare=timeParams.timeEndCompare;
	}
	dm.getHotSpotsKpisTimeCompared([this.mapSelectedHotspot], timeEnd,timeEndCompare,
			this.overviewDataHandler.bind(this),null,timeType);
	if(this.timeType=="day"||this.timeType=="month"){
		 $(".peakAndAcc").css("display","none");
	}else{
		$(".peakAndAcc").css("display","table-row");
		dm.getPeakHotspotKpi({type:"rates",timeType:timeType}, this.peakDataHandler.bind(this));
		dm.getPeakHotspotKpi({type:"bytes",timeType:timeType}, this.peakDataHandler.bind(this));
		dm.getPeakHotspotKpi({type:"totalnum",timeType:timeType}, this.peakDataHandler.bind(this));
		dm.getPeakHotspotKpi({type:"totalnum-day"}, this.totalPeakDataHandler.bind(this));
		dm.getPeakHotspotKpi({type:"bytes-day"}, this.totalPeakDataHandler.bind(this));
	}
	
	
	dm.getHotSpotCustomerCountAndFlowCompare([this.mapSelectedHotspot], timeEnd,timeEndCompare,timeType,
			this.totalDataHandler.bind(this));
	
//	dm.getMetroInOutCustomer({granularity:this.granularity,time:SUtils.getDiffDateTimeFromNow(-90,SUtils.TIME_TYPE.MIN,format),type:"in",line:this.mapSelectedHotspot.replace("地铁","").replace("号线","")}, this.metroInDataHandler.bind(this));
//	dm.getMetroInOutCustomer({granularity:this.granularity,time:SUtils.getDiffDateTimeFromNow(-90,SUtils.TIME_TYPE.MIN,format),type:"out",line:this.mapSelectedHotspot.replace("地铁","").replace("号线","")}, this.metroOutDataHandler.bind(this));
	
	dm.getMetroInOutCustomer({granularity:this.granularity,time:timeEnd,type:"in",line:this.mapSelectedHotspot.replace("地铁","").replace("号线","")}, this.metroInDataHandler.bind(this));
	dm.getMetroInOutCustomer({granularity:this.granularity,time:timeEnd,type:"out",line:this.mapSelectedHotspot.replace("地铁","").replace("号线","")}, this.metroOutDataHandler.bind(this));
	
	//标题话务量
	var _params = 
	{
		hotspot:this.mapSelectedHotspot,
		domains:"2g,4g",
		"current_day_domains": "2g,4g",
		cascade: true, 
		group:"hot",
		"hb_domains": "2g,4g",
		hb_time_minutes:Math.abs(LSMScreen.DataManager.minBack*2),
		timeType:timeType,
	    "all_fields":null,
		hot_fields:null
	};
	
	LSMScreen.DataManager.prototype.getXpmData(_params, 
			this.getMetroTrafficFlowCompleteHandler.bind(this));
	
	
	
	
	//速率 流量 用户 趋势
//	var timeBegin=null;
//	var timeEnd=null;
//	var timeBeginCompare=null;
//	var timeEndCompare=null;
//	
//	if(this.selectedTime!=null){
//		var timeParams=this.getTimeParamsBySelectedTime();
//		timeBegin=timeParams.timeBegin;
//		timeEnd=timeParams.timeEnd;
//		timeBeginCompare=timeParams.timeBeginCompare;
//		timeEndCompare=timeParams.timeEndCompare;
//	}
	
	dm.getHotSpotsKpisCompared(this.mapSelectedHotspot, timeBegin, timeEnd, timeBeginCompare, timeEndCompare,timeType,
			this.overviewChartDataHandler.bind(this));
	
	var format="yyyy-MM-dd hh:mm:ss";
	if(timeBegin==null){
		timeBegin=SUtils.getDiffDateTimeFromNow(-180+LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format);;
	}
	//标题话务量趋势
	var _params2 = 
	{
	    hotspot:this.mapSelectedHotspot,    
	    timeRange:"true",
	    group:"all",            
	    max_threads:"10",
	    startTime:timeBegin,
	    endTime:timeEnd,
	    all_fields:"time",
	    "domains": "2g,4g",
	    "tb_domains": "2g,4g",
	    "hb_domains": "2g,4g",
	    "current_day_domains": "2g,4g",
	    "accumulation":"2g,4g",
		tb_time_minutes:this.tb_time_minutes,
		timeType:timeType,
		all_fields:null,
		hot_fields:null
	};
	
	LSMScreen.DataManager.prototype.getXpmData(_params2, 
			this.getMetroTrafficFlowTrendCompleteHandler.bind(this));
};
MetroScreenNew.ScreenController.prototype.getMetroTrafficFlowTrendCompleteHandler=function(result_){
	var _curTrafficFlows=result_;
//	var hwl2gKey="2ghwlDist";
//	var hwl3gKey="3ghwlDist";
	var hwl2gKey="volte_voice_teletraffic";
	var hwl3gKey="volte_video_teletraffic";
	var option = {
		    calculable : false,
		    color:['#f4008b'],
		    grid:{
		    	borderWidth:0,
		    	x:30,
		    	y:0,
		    	x2:0,
		    	y2:0
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
		            data:[]
		        }
		    ]
		};
	if(_curTrafficFlows.length>0){
		for (var i = 0; i < _curTrafficFlows.length; ++i)
		{
			var _data = _curTrafficFlows[i];
			if(_data[hwl2gKey]==null) _data[hwl2gKey]=0;
			if(_data[hwl3gKey]==null) _data[hwl3gKey]=0;
			option.xAxis[0].data.push(_data.time.substring(11, 16));
			option.series[0].data.push(_data[hwl2gKey] + _data[hwl3gKey]);
		}
		
		this.trafficCompareChart.updateData(option);
	}
};
MetroScreenNew.ScreenController.prototype.getMetroTrafficFlowCompleteHandler=function(result_){
	var rebuildData={};
//	var hwl2gKey="2ghwlDay";
//	var hwl3gKey="3ghwlDay";
	var hwl2gKey="gsm_teletraffic";
	var hwl4gKey="volte_voice_teletraffic";
	var hwl4gKey2="volte_video_teletraffic";
	
	for (var i = 0; i < result_.length; ++i)
	{
		var _data = result_[i];
		rebuildData[_data.hot_name]=_data;
		if(_data.time){
			
			if(_data[hwl2gKey]==null) _data[hwl2gKey]=0;
			if(_data[hwl4gKey]==null) _data[hwl4gKey]=0;
			if(_data[hwl4gKey2]==null) _data[hwl4gKey2]=0;
			
			switch (_data.hot_name)
			{
				case this.mapSelectedHotspot:
					var value=_data[hwl2gKey]*1+_data[hwl4gKey]*1+_data[hwl4gKey2]*1;
					var _flow = (value).toFixed(1);
					if(!isNaN(_flow)) $("#labelTraffic").html( "<h1>" + _flow + "&nbsp;<span>Erl</span></h1>");
					
					var time=_data.time;
					var time1=time;
					if(this.timeType=="day"){
						time1=time1.substring(5, 10);
					}else if(this.timeType=="month"){
						time1=time1.substring(5, 7)+"月";
					}else{
						time1=time1.substring(11, 16);
					}
					
					$("#labelTrafficTime").text(time1);
					
					$("#labelKpiValueNow2").text(_flow);
					if(_data[hwl2gKey]!=0) $("#labelKpiValue2G2").text((_data[hwl2gKey]).toFixed(1));
					if(_data[hwl4gKey]!=0) $("#labelKpiValue4G2").text((_data[hwl4gKey]*1+_data[hwl4gKey2]*1).toFixed(1));
					
					break;
			}
		}
	}
};
MetroScreenNew.ScreenController.prototype.metroInDataHandler=function(result){
	var kpiKey="总用户数";
	var total=0;
	for(var line in result){
		var lineRecord=result[line];
		for(var station in lineRecord){
			total+=parseInt(lineRecord[station][kpiKey]);
		}
	}
	$("#label01").text(total);
};
MetroScreenNew.ScreenController.prototype.metroOutDataHandler=function(result){
	var kpiKey="总用户数";
	var total=0;
	for(var line in result){
		var lineRecord=result[line];
		for(var station in lineRecord){
			total+=parseInt(lineRecord[station][kpiKey]);
		}
	}
	$("#label05").text(total);
};
MetroScreenNew.ScreenController.prototype.totalDataHandler=function(result){
	var record=result[this.mapSelectedHotspot];
	if(record!=null){
		if(record["总用户数"]!=null){
			$("#label03").text(record["总用户数"]);
		}
		if(record["总流量"]!=null){
			$("#label22").text((record["总流量"] / LSMConsts.byteDivider / LSMConsts.byteDivider).toFixed(1));
		}
	}
};
MetroScreenNew.ScreenController.prototype.totalPeakDataHandler=function(result){
	var record=result[this.mapSelectedHotspot];
	if(record!=null){
		if(record["总用户数"]!=null){
			$("#label07").text(record["总用户数"]);
		}
		if(record["总流量"]!=null){
			$("#label25").text((record["总流量"] / LSMConsts.byteDivider / LSMConsts.byteDivider/ LSMConsts.byteDivider).toFixed(1));
		}
	}
};
MetroScreenNew.ScreenController.prototype.peakDataHandler=function(result){
	this.extendPeakCache(result);
	var record=result[this.mapSelectedHotspot];
	if(record!=null){
		if(record["下行速率500k"]!=null){
			$("#label10").text((record["下行速率500k"]*1).toFixed(1));
			$("#label12").text(record["时间"].substring(5,16));
		}
		if(record["总流量"]!=null){
			$("#label20").text((record["总流量"] / LSMConsts.byteDivider / LSMConsts.byteDivider/ LSMConsts.byteDivider).toFixed(1));
			$("#label23").text(record["时间"].substring(5,16));
		}
		if(record["总用户数"]!=null){
			$("#label00").text(record["总用户数"]);
			$("#label04").text(record["时间"].substring(5,16));
		}
	}
};
MetroScreenNew.ScreenController.prototype.overviewChartDataHandler=function(arr){
	var data1=[];
	var data2=[];
	var data3=[];
	var xArr=[];
	arr=arr.reverse();
	for(var i=0;i<arr.length;i++){
		var record=arr[i];//this.recordDataConvert(arr[i]);
		var time=record.time;
		var showTime="";
		if(this.timeType=="day"){
			showTime=time.substring(5,10);
		}else if(this.timeType=="month"){
			showTime=time.substring(5,7)+"月";
		}else{
			showTime=time.substring(11,16);
		}
		xArr.push(showTime);
		data1.push(record["总用户数"]);
		data2.push(record["下行速率500k"]);
		data3.push(record["总流量"]);
		
	}
	
	this.customerCompareChart.updateData(this.getExtremeSimpleChartOption(data1,xArr), true);
	this.trafficFlowCompareChart.updateData(this.getExtremeSimpleChartOption(data2,xArr), true);
	this.flowCompareChart.updateData(this.getExtremeSimpleChartOption(data3,xArr), true);
	
	
};
MetroScreenNew.ScreenController.prototype.overviewDataHandler=function(result){
	var _hotSpot=this.mapSelectedHotspot;
	var time=result[_hotSpot].time;
	var time1=time;
	if(this.timeType=="day"){
		time1=time1.substring(5, 10);
	}else if(this.timeType=="month"){
		time1=time1.substring(5, 7)+"月";
	}else{
		time1=time1.substring(11, 16);
	}
	
	$("#labelFlowTime").text(time1);
	$("#labelTrafficFlowTime").text(time1);
	$("#labelCustomerTime").text(time1);
	$("#selectedTimeLabel").text(time);
	
	if(result[_hotSpot]["总流量"]!=0&&!isNaN(result[_hotSpot]["总流量"])){
		this.totalMetroFlow=result[_hotSpot]["总流量"] ;
		
		if(this.timeType=="day"){
			$("#totalFlow").html ( "<h1>" + (result[_hotSpot]["总流量"] / LSMConsts.byteDivider / LSMConsts.byteDivider/ LSMConsts.byteDivider).toFixed(1) + "&nbsp;<span>TB</span></h1>");
			
		}else if(this.timeType=="month"){
			$("#totalFlow").html ( "<h1>" + (result[_hotSpot]["总流量"] / LSMConsts.byteDivider / LSMConsts.byteDivider/ LSMConsts.byteDivider).toFixed(1) + "&nbsp;<span>TB</span></h1>");
			
		}else{
			$("#totalFlow").html ( "<h1>" + (result[_hotSpot]["总流量"] / LSMConsts.byteDivider / LSMConsts.byteDivider).toFixed(1) + "&nbsp;<span>GB</span></h1>");
			
		}
		
		$("#label21").text((result[_hotSpot]["2G流量"] / LSMConsts.byteDivider / LSMConsts.byteDivider).toFixed(1));
		$("#label24").text((result[_hotSpot]["4G流量"] / LSMConsts.byteDivider / LSMConsts.byteDivider).toFixed(1));
	} 
	if(result[_hotSpot]["下行速率500k"]!=0&&!isNaN(result[_hotSpot]["下行速率500k"])){
		$("#labelTrafficFlow").html ( "<h1>" + (result[_hotSpot]["下行速率500k"]*1  ).toFixed(1) + "&nbsp;<span>Kbps</span></h1>");
		
		$("#label11").text((result[_hotSpot]["2G下行速率500k"]*1).toFixed(1));
		$("#label13").text((result[_hotSpot]["4G下行速率500k"]*1).toFixed(1));
	}
	if(result[_hotSpot]["总用户数"]!=0&&!isNaN(result[_hotSpot]["总用户数"])){
		$("#labelCustomerCount").html ( "<h1>" +result[_hotSpot]["总用户数"] + "&nbsp;<span>人</span></h1>");
		
		$("#label02").text(result[_hotSpot]["2G用户数"]);
		$("#label06").text(result[_hotSpot]["4G用户数"]);
	}
};
MetroScreenNew.ScreenController.prototype.updateLineAndStationGrid=function(){
	var nameIndex="";
	if(this.kpiType==LSMConsts.kpiTypeSig){
		nameIndex="station";
	}else if(this.kpiType==LSMConsts.kpiTypeNet){
		nameIndex="hot_name";
	}
	
	var colNames=[''];
	var cols=[{name : nameIndex,index : nameIndex,width : this.businessFirstColWidth,frozen:true}];
	var selectedCols=this.currentShowCol1;
	
	var width1=0;
	width1+=cols[0].width;
	for(var i=0;i<selectedCols.length;i++){
		var colRecord=selectedCols[i];
		colNames.push(colRecord.colName);
		colRecord.formatter=this.compositeColRenderer.bind(this);
		cols.push(colRecord);
		width1+=colRecord.width;
	}
	var opt1={
	        datatype : function(){},
	        autowidth:true,
	        shrinkToFit:false,
	        autoScroll: false,
			colNames : colNames,
	        colModel : cols,
	        loadui:'disable',
	        afterInsertRow:this.businessRowHandler.bind(this),
	        sortable:true,
	        height:this.lineStationGridHeight,
	        rowNum:999,
	        onSortCol:function(index, colindex, sortorder){
	        	if(colindex>0){
	        		this.businessSortKey=index;
	        		this.businessSortKeyDirection=sortorder;//业务表格排序方式
		        	this.updateLineAndStationGridDataOnly();
	        	}
	        }.bind(this)
		};
	
	var baseWidth=$("#businessGrid").parent().width();
	if(width1-baseWidth<50){
		opt1.width=baseWidth;
		opt1.shrinkToFit=true;
		opt1.scrollOffset=0;
	}
	colNames.push("线路");
	cols.push({name : 'line',index : 'line',width : 110,hidden:true});
	
	
	if(this.businessGrid) this.businessGrid.GridUnload("businessGrid");
	this.businessGrid=$("#businessGrid").jqGrid(opt1);
	$("#businessGrid").jqGrid('setFrozenColumns');
	this.updateLineAndStationGridDataOnly();
	
};
MetroScreenNew.ScreenController.prototype.compositeColRenderer=function(cellvalue,config,rowData){
	var key=config.colModel.index;
	var tmp=key.split(',');
	if(tmp.length>1){
		var allNaN=true;
		var total=0;
		for(var i=0;i<tmp.length;i++){
			var value=rowData[tmp[i]];
			if(value!=null&&!isNaN(value)){
				total+=value*1;
				allNaN=false;
			}
		}
		if(allNaN){
			return '';
		}else{
			return total.toFixed(1);
		}
	}else{
		if(cellvalue=='null'||cellvalue==null){
			return '';
		}else{
			return cellvalue;
		}
		
	}
};
MetroScreenNew.ScreenController.prototype.updateLineAndStationGridDataOnly=function(){
	var line=this.mapSelectedHotspot;
	var dm=LSMScreen.DataManager.getInstance();
	if(this.businessSortKey==""){
		var selectedCols=this.currentShowCol1;
		this.businessSortKey=selectedCols[0].index;
		this.businessSortKeyDirection="desc";
	}
	var allLineNames=[];
	var lines=LSMConsts.metroLines;
	for(var i=0;i<lines.length;i++){
		var colId="地铁"+lines[i]+"号线";
		allLineNames.push(colId);
	}
	if(this.kpiType==LSMConsts.kpiTypeSig){
		if(line==null||line==this.mainHotspot){
			
			dm.getHotSpotsKpis(allLineNames,this.selectedTime,this.timeType,this.lineLevelGridHandler.bind(this));
		}else{
			dm.getHotSpotsKpis([line],this.selectedTime,this.timeType,this.handlerStationLevelLine.bind(this));
		}
	}else if(this.kpiType==LSMConsts.kpiTypeNet){
		var hotspot="";
		if(line==null||line==this.mainHotspot){
			var param={
				    "hotspot": this.mainHotspot,    
				    "group": "hot",     
				    "hot_type":"0",
				    "max_threads": "15",
				    "hot_fields": "hot_name",
				    "domains": "2g,4g",
				    "orderName":this.businessSortKey,
				    "orderType":this.businessSortKeyDirection
				};
			dm.getXpmData(param,this.handlerLineAndStationGridNet.bind(this));
		}else{
			dm.getHotspotNameMatch({match:"^"+line.replace("地铁","")+"-.*?$"},function(stations){
				hotspot=line+','+stations.join(',');
				var param={
					    "hotspot": hotspot,    
					    "group": "hot",      
					    "hot_type":"0,1",
					    "max_threads": "15",
					    "hot_fields": "hot_name",
					    "domains": "2g,4g",
					    "orderName":this.businessSortKey,
					    "orderType":this.businessSortKeyDirection
					};
				dm.getXpmData(param,this.handlerLineAndStationGridNet.bind(this));
			}.bind(this));
		}
	}
};
MetroScreenNew.ScreenController.prototype.handlerLineAndStationGridNet=function(result){
	var sortArr=[];
	for(var i=0;i<result.length;i++){
		var hot_name=result[i].hot_name;
		if(hot_name!="地铁"){
			sortArr.push(this.processDataByKpiMap(result[i]));
		}
	}
	var sortKey=this.businessSortKey;
	if(this.businessSortKeyDirection=="desc"){
		sortArr.sort(function(a,b){return b[sortKey]-a[sortKey];});
	}else{
		sortArr.sort(function(a,b){return a[sortKey]-b[sortKey];});
	}
	this.userLineTopN=sortArr;
	this.updateLineAndStationGridRowLimit();
};
MetroScreenNew.ScreenController.prototype.updateLineAndStationGridRowLimit=function(){
	this.businessGrid.clearGridData();
	if(this.userLineTopN.length>0){
		if(this.selectedHotspot==""||this.selectedHotspot==null){
			this.selectedHotspot=this.userLineTopN[0].hot_name;
		}
		if(this.selectedHotspot.indexOf("地铁")==-1){
			this.updateBusinessAndQualityChart(this.selectedHotspot,this.mapSelectedHotspot.replace("地铁","").replace("号线",""));
		}else{
			this.updateBusinessAndQualityChart(this.selectedHotspot);
		}
		
	}
	if($("#businessGridRowLimit").text()=="全"){
		this.businessGrid[0].addJSONData(this.userLineTopN);
	}else{
		var arr=[];
		for(var i=0;i<6&&i<this.userLineTopN.length;i++){
			arr.push(this.userLineTopN[i]);
		}
		this.businessGrid[0].addJSONData(arr);
	}
	this.businessGrid.find("tr:odd").addClass("oddGrayTableRow");
};
MetroScreenNew.ScreenController.prototype.handlerStationLevelLine=function(result){
	var sortKey=this.businessSortKey;
	var lineSpot=this.mapSelectedHotspot;
	var sortList=[];
	for(var line in result){
		result[line].line=line.replace("地铁","").replace("号线","");
		result[line].station=line;
		sortList.push(result[line]);
	}
	this.userLineTopN=[];
	
	for(var i=0;i<sortList.length;i++){
		this.userLineTopN.push(this.processDataByKpiMap(sortList[i]));
	}
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getHotspotNameMatch({match:"^"+lineSpot.replace("地铁","")+"-.*?$"},function(stations){
		dm.getHotspotUnionRecord(
				{timeType:this.timeType,time:this.selectedTime,exclude0:false,sortKey:sortKey,num:1000,order:this.businessSortKeyDirection,hotspots:stations},
				this.lineStationRankHandler.bind(this),this.failHanlder.bind(this));
	}.bind(this));
	
	
};
MetroScreenNew.ScreenController.prototype.lineLevelGridHandler=function(result){
	for(var i=0;i<result.length;i++){
		this.processDataByKpiMap(result[i]);
	}
	var sortKey=this.businessSortKey;
	var sortList=[];
	for(var line in result){
		result[line].line=line.replace("地铁","").replace("号线","");
		result[line].station=line;
		sortList.push(result[line]);
	}
	if(this.businessSortKeyDirection=="desc"){
		sortList.sort(function(a,b){return b[sortKey]-a[sortKey];});
	}else{
		sortList.sort(function(a,b){return a[sortKey]-b[sortKey];});
	}
	
	this.userLineTopN=[];
	
	for(var i=0;i<sortList.length;i++){
		this.userLineTopN.push(this.processDataByKpiMap (sortList[i]));
	}
	if(sortList.length>0){
		if(this.selectedHotspot==""||this.selectedHotspot==null){
			this.selectedHotspot=sortList[0].station;
		}
		this.updateBusinessAndQualityChart(this.selectedHotspot);
	}
	
	this.updateLineAndStationGridRowLimit();
};

MetroScreenNew.ScreenController.prototype.lineStationRankHandler=function(result){
	if(result!=null&&result.length>0){
		var i=0;
		for(i=0;i<result.length;i++){
			var hotspot=result[i].hotspot;
			if(hotspot!=null){
				var tmp=hotspot.split("-");
				if(tmp.length>1){
					hotspot=tmp[1];
				}
			}
			result[i].station=hotspot;
			result[i].line=this.mapSelectedHotspot.replace("地铁","").replace("号线","");
			this.userLineTopN.push(this.processDataByKpiMap(result[i]));
		}
		if(this.selectedHotspot==""||this.selectedHotspot==null){
			this.selectedHotspot=this.userLineTopN[0].station;
		}
//		this.updateBusinessAndQualityChart(this.selectedHotspot);
	}
	this.updateLineAndStationGridRowLimit();
};
MetroScreenNew.ScreenController.prototype.businessRowHandler=function(rowid,rowdata){
	var grid=this.businessGrid;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	var name=$(tds[0]).text();
	var key=name.replace("地铁","").replace("号线","");
	var color=LSMConsts.metroLineColorMap[key];
	if(color!=null){
		var boxSize=36;
		var pWidth=$(tds[0]).width();
		var pHeight=$(tds[0]).height();
//		var left=(pWidth-boxSize)/2;
//		var top=(pHeight-boxSize)/2;
		$(tds[0]).attr("line",name);
//		$(tds[0]).html('<div style="color:white;position:absolute;left:'+left+'px;top:'+top+'px;width:'+boxSize+'px;height:'+boxSize+'px;border-radius:8px;background:'+color+'">'+key+'</div>');
		$(tds[0]).html('<div title="'+name+'" style="color:white;margin-left:50%;width:'+boxSize+'px;height:'+boxSize+'px;border-radius:8px;background:'+color+'">'+key+'</div>');
		
		$(tds[0]).on("click",this.drillLineStation.bind(this));
	}else{
		$(tds[0]).on("click",this.drillStationCell.bind(this));
	}
	var cols=this.currentShowCol1;
	for(var i=1;i<tds.length&&i<=cols.length;i++){
		$(tds[i]).attr("kpi",cols[i-1].index);
		$(tds[i]).attr("hotspot",name);
		$(tds[i]).attr("line",rowdata.line);
		$(tds[i]).on("click",this.businessCellClickHandler.bind(this));
	}
};

MetroScreenNew.ScreenController.prototype.drillStationCell=function(evt){
	var station=$(evt.currentTarget).text();
	this.selectedStation=station;
	this.selectedHotspot=this.selectedStation;
	this.updateBusinessAndQualityChart(this.selectedStation, this.mapSelectedHotspot.replace("地铁","").replace("号线",""));
	this.updateCellGrid(this.mapSelectedHotspot,this.selectedStation);
	this.updateTerminalNtChart(this.selectedStation,this.timeType);
};
MetroScreenNew.ScreenController.prototype.drillLineStation=function(evt){
	var line=$(evt.currentTarget).attr("line");
	this.setMapSelectedHotspot(line);
	this.update();
	
	var iframe=$("#metroSwfFrame")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.NS_SW_setHighlightLine(line.replace("地铁","").replace("号线",""));
};
MetroScreenNew.ScreenController.prototype.businessCellClickHandler=function(evt){
	var kpi=$(evt.currentTarget).attr("kpi");
	var hotspot=$(evt.currentTarget).attr("hotspot");
	var line=$(evt.currentTarget).attr("line");
	this.selectedBusinessKpi=kpi;
	this.selectedHotspot=hotspot;
	this.updateBusinessAndQualityChart(this.selectedHotspot,line);
};
MetroScreenNew.ScreenController.prototype.appRowHandler=function(rowid,rowdata){
	var grid=this.hotAppGrid;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	var icon=SUtils.getAppIconPath(rowdata.element);
	var iconPath=BASEPATH+"/static/styles/local-lsm/app/"+icon;
	$(tds[0]).html('<img title="'+rowdata.element+'" src="'+iconPath+'"></img>');
	
//	$(tds[3]).text(($(tds[2]).text()/this.totalFlow*100).toFixed(2));
	
};

MetroScreenNew.ScreenController.prototype.arrDataConvert=function(arr){
	for(var i=0;i<arr.length;i++){
		arr[i]=this.recordDataConvert(arr[i]);
	}
	return arr;
};
MetroScreenNew.ScreenController.prototype.recordDataConvert=function(record){
	return SUtils.convertRecordMetro(record);
};
MetroScreenNew.ScreenController.prototype.failHanlder=function(){
	
};


MetroScreenNew.ScreenController.prototype.showColConfig = function(isHot,cellType,callBack){
	var allCols=[];
	var selectedCols=[];
	var winWidth=1550;
	var winHeight=1150;
	var win=new LSMScreen.SimpleWindow({
		title:"列配置",
		width:winWidth,
		height:winHeight,
		x:0,
		y:0
	});
	
	if(isHot){
		allCols=this.currentAllCol1;
		selectedCols=this.currentShowCol1;
	}else{
		allCols=this.currentAllCol2;
		selectedCols=this.currentShowCol2;
	}
	
	var selectedMap={};
	var html='<ul class="colchooser">';
	
	var i=0;
	for(i=0;i<selectedCols.length;i++){
		selectedMap[selectedCols[i].index]=(i+1);
	}
	//先插入选中的排序好的列
	for(i=0;i<selectedCols.length;i++){
		var kpiConfig=selectedCols[i];
		var kpiId=kpiConfig.index;
		var kpiName=kpiConfig.colName;
		var checked="";
		checked='checked="checked"';
		html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
	}
	//将未选中的列排在最后
	for(i=0;i<allCols.length;i++){
		var kpiConfig=allCols[i];
		var kpiId=kpiConfig.index;
		var kpiName=kpiConfig.colName;
		var checked="";
		if(selectedMap[kpiId]){
		}else{
			html+='<li ><span><input type="checkbox" index="'+i+'" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></li>';
		}
		
	}
	
	
	html+="</ul>";
	html+='<div class="kpiChooserWinFoot" style="position:absolute;top:0px;">';
	html+="<div>";
	html+='<input type="button" class="btn btn-primary btn-lg" value="确定"></input>';
	html+="&nbsp;&nbsp;&nbsp;&nbsp;";
	html+='<input type="button" class="btn btn-primary btn-lg" value="取消"></input>';
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
			var saveId="";
			if(isHot){
				allCols=this.currentAllCol1Origin;
				if(this.kpiType==LSMConsts.kpiTypeSig){
					saveId=LSMConsts.metroHotspotSigId+"_show";
				}else if(this.kpiType==LSMConsts.kpiTypeNet){
					saveId=LSMConsts.metroHotspotNetId+"_show";
				}
			}else{
				allCols=this.currentAllCol2Origin;
				if(this.kpiType==LSMConsts.kpiTypeSig){
					switch(cellType){
						case "4g":
							saveId=LSMConsts.metroCell4gSigId+"_show";
							break;
						case "3g":
							saveId=LSMConsts.metroCell3gSigId+"_show";
							break;
						case "2g":
							saveId=LSMConsts.metroCell2gSigId+"_show";
							break;
					}
				}else if(this.kpiType==LSMConsts.kpiTypeNet){
					switch(cellType){
						case "4g":
							saveId=LSMConsts.metroCell4gNetId+"_show";
							break;
						case "3g":
							saveId=LSMConsts.metroCell3gNetId+"_show";
							break;
						case "2g":
							saveId=LSMConsts.metroCell2gNetId+"_show";
							break;
					}
				}
				
			}
			
			for(i=0;i<allCols.length;i++){
				var kpiId=allCols[i].kpiFullName;
				allColsMap[kpiId]=allCols[i];
			}
			for(i=0;i<ilength;i++){
				var show=$(aLi[i]).find("input[type='checkbox']").is(':checked');
				var selectedId=$(aLi[i]).find("input").val();
				var left=$(aLi[i]).css("left").replace("px","");
				var top=$(aLi[i]).css("top").replace("px","");
				var sortValue=left*1+top*10000;
				if(show==true){
					finalSelected.push(allColsMap[selectedId]);
					sortArr.push({index:count,sortValue:sortValue});
					count++;
				}
			}
			//按top left 排序
			sortArr=sortArr.sort(function(a,b){return a["sortValue"]-b["sortValue"];});
			var sortCols=[];
			for(i=0;i<sortArr.length;i++){
				var sortRecord=sortArr[i];
				sortCols.push(finalSelected[sortRecord.index]);
			}
			
			var dm=LSMScreen.DataManager.getInstance();
			dm.configOperate(
					{
						"data":{
							"id":saveId,
							"content":JSON.stringify(sortCols)
						}
					},
					function(){
						console.log(saveId+"保存成功");
						this.queryColConfig(callBack);
					}.bind(this),
					function(){console.log(saveId+"保存失败");}
			);
		}
		win.closeWin();
	}.bind(this));
	
	
};
MetroScreenNew.ScreenController.prototype.getCellType=function(){
	var cellType="4g";
	var types=$(".cellType");
	for(var i=0;i<types.length;i++){
		if($(types[i]).css("text-decoration")=="underline"){
			cellType=$(types[i]).attr("name");
			break;
		}
	}
	if(cellType=='3g'&&$('.cellType3G').css('display')=='none'){
		cellType=='4g';
		$(types[2]).css("text-decoration")=="underline"
	}
	return cellType;
};
MetroScreenNew.ScreenController.prototype.queryColConfig=function(callBack){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getConfigData({type:"column"},function(configResult){
		var cellType=this.getCellType();
		var showTag="_show";
		if(this.kpiType==LSMConsts.kpiTypeSig){
			this.currentAllCol1=this.fillCols(JSON.parse(configResult[LSMConsts.metroHotspotSigId].content),1);
			this.currentShowCol1=this.fillCols(JSON.parse(configResult[LSMConsts.metroHotspotSigId+showTag].content));
			
			switch(cellType){
				case "4g":
					this.currentAllCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell4gSigId].content),2);
					this.currentShowCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell4gSigId+showTag].content));
					break;
				case "3g":
					this.currentAllCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell3gSigId].content),2);
					this.currentShowCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell3gSigId+showTag].content));
					break;
				case "2g":
					this.currentAllCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell2gSigId].content),2);
					this.currentShowCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell2gSigId+showTag].content));
					break;
			}
		}else if(this.kpiType==LSMConsts.kpiTypeNet){
			this.currentAllCol1=this.fillCols(JSON.parse(configResult[LSMConsts.metroHotspotNetId].content),1);
			this.currentShowCol1=this.fillCols(JSON.parse(configResult[LSMConsts.metroHotspotNetId+showTag].content));
			
			switch(cellType){
				case "4g":
					this.currentAllCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell4gNetId].content),2);
					this.currentShowCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell4gNetId+showTag].content));
					break;
				case "3g":
					this.currentAllCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell3gNetId].content),2);
					this.currentShowCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell3gNetId+showTag].content));
					break;
				case "2g":
					this.currentAllCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell2gNetId].content),2);
					this.currentShowCol2=this.fillCols(JSON.parse(configResult[LSMConsts.metroCell2gNetId+showTag].content));
					break;
			}
		}
		
		
		
		var i=0;
		var map={};
		for(i=0;i<this.currentAllCol1Origin.length;i++){
			var record=this.currentAllCol1Origin[i];
			map[record.kpiFullName]=record;
		}
		for(i=0;i<this.currentAllCol2Origin.length;i++){
			var record=this.currentAllCol2Origin[i];
			map[record.kpiFullName]=record;
		}
		this.kpiConfigMap=this.appendTitleConfig(map);
		if(callBack!=null){
			callBack();
		}
	}.bind(this));
	
};
//标题处钻取指标的配置
MetroScreenNew.ScreenController.prototype.appendTitleConfig=function(map){
	if(map["下行速率500k"]==null){
		map["下行速率500k"]={
				fixed:2,
				kpiFullName:"下行速率500k",
				kpiName:"下载速率",
				kpiType:"信令",
				netType:"all",
				rate:1,
				source:'stream',
				unit:'Kbps'
		};
	}
	if(map["hwl"]==null){
		map["hwl"]={
				fixed:2,
				kpiFullName:"hwl",
				kpiName:"话务量",
				kpiType:"网管",
				netType:"all",
				rate:1,
				source:'ws',
				unit:'Erl'
		};
	}
	if(map["总流量"]==null){
		map["总流量"]={
				fixed:2,
				kpiFullName:"总流量",
				kpiName:"总流量",
				kpiType:"信令",
				netType:"all",
				rate:1/1024,
				source:'stream',
				unit:'MB'
		};
	}
	if(map["总用户数"]==null){
		map["总用户数"]={
				fixed:0,
				kpiFullName:"总用户数",
				kpiName:"总用户数",
				kpiType:"信令",
				netType:"all",
				rate:1,
				source:'stream',
				unit:'人'
		};
	}
	if(map["进站用户数"]==null){
		map["进站用户数"]={
				fixed:0,
				kpiFullName:"总用户数",
				kpiName:"进站用户数",
				kpiType:"信令",
				netType:"all",
				rate:1,
				source:'stream',
				unit:'人'
		};
	}
	if(map["出站用户数"]==null){
		map["出站用户数"]={
				fixed:0,
				kpiFullName:"总用户数",
				kpiName:"出站用户数",
				kpiType:"信令",
				netType:"all",
				rate:1,
				source:'stream',
				unit:'人'
		};
	}
	return map;
};

MetroScreenNew.ScreenController.prototype.fillCols=function(source,originCopy){
	
	if(originCopy==1){
		this.currentAllCol1Origin=source;
	}else if(originCopy==2){
		this.currentAllCol2Origin=source;
	}
	
	var result=[];
	var all=source;
	var i=0;
	var kpiKey;
	for(i=0;i<all.length;i++){
		var record=all[i];
		kpiKey=record.kpiFullName;
		var title;
		if(record.unit!=null){
			title=record.kpiName+'('+record.unit+')';
		}else{
			title=record.kpiName;
		}
		result.push({
			colName:title,
			name : kpiKey,
			index : kpiKey,
			width : this.baseKpiColWidth,
			unit: record.unit,
			sortable:true
		});
	}
	return result;
};

MetroScreenNew.ScreenController.prototype.processDataByKpiMap=function(record){
	for(var key in record){
		var value=record[key];
		record[key]=this.processValueByKpiKey(value,key);
	}
	return record;
};
MetroScreenNew.ScreenController.prototype.processValueByKpiKey=function(value,key){
	var result=value;
	var config=this.kpiConfigMap[key];
	if(config!=null){
		if(value!=null&&!isNaN(value)){
			var fixed=config.fixed;
			if(key.indexOf("速率")!=-1){
				fixed=0;
			}else if(key.indexOf("话务量")!=-1){
				fixed=0;
			}else if(key.indexOf("流量")!=-1&&key.indexOf("流量比")==-1){
				fixed=0;
			}
			result=(value*config.rate).toFixed(fixed);
		}
	}else{
		if(key.indexOf("hwl")!=-1){
			result=(value*1).toFixed(0);
		}
	}
	return result;
};

MetroScreenNew.ScreenController.prototype.showCompareTimeChooser = function(evt)
{
	if(this.timeChooser==null){
		var docWidth=$(document).width();
		var docHeight=$(document).height();
		var winWidth=500;
		var winHeight=200;
		this.timeChooser=new LSMScreen.SimpleWindow({
			title:"时间范围选择",
			width:winWidth,
			height:winHeight,
			x:(docWidth-winWidth)*0.5,
			y:(docHeight-winHeight)*0.5,
			closeFunc:function(){
				this.timeChooser.hide();
			}.bind(this),
			beforeClose:function(){
				
			}.bind(this)
		});
		var timeInputHtml='<input readonly="readonly" type="text" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\'})" class="Wdate" style="width:300px;height:35px;"/>';
		var html='<div class="timeChooserWin">'
			+'<div>开始时间：'+timeInputHtml+'</div>'
			+'<div style="margin-top:10px;">结束时间：'+timeInputHtml+'</div>';
			
		html+='<div class="kpiChooserWinFoot">';
		
		html+="<div>";
		html+='<input type="button" class="btn btn-primary" value="确定"></input>';
		html+="&nbsp;&nbsp;&nbsp;&nbsp;";
		html+='<input type="button" class="btn btn-primary" value="取消"></input>';
		html+="</div>";
		
		html+="</div>";
		
		html+="</div>";
		$(this.timeChooser.content).css("padding","10px 10px 10px 10px");
		$(this.timeChooser.content).html(html);
		$(this.timeChooser.content).find(":button").on('click',function(evt){
			if($(evt.currentTarget).val()=="确定"){
				var inputs=$(this.timeChooser.content).find("input");
				var startTimeStr=$(inputs[0]).val();
				var endTimeStr=$(inputs[1]).val();
				var startDate=new Date(startTimeStr.replace(/-/g,"/"));
				var endDate=new Date(endTimeStr.replace(/-/g,"/"));
				var compareLag=24*60*60*1000;
				var startTime=startDate.getTime();
				var endTime=endDate.getTime();
				if(endTime<=startTime){
					alert("开始时间必须小于结束时间");
					return;
				}else if(endTime-startTime>compareLag){
					alert("时间区间请限制在24小时内");
					return;
				}else{
					this.customStart=startTimeStr;
					this.customEnd=endTimeStr;
					this.updateBusinessAndQualityChart(this.lastChartHotspot,this.lastChartLine);
				}
				this.timeChooser.hide();
			}else{
				this.timeChooser.hide();
			}
			
		}.bind(this));
	}else{
		this.timeChooser.show();
	}
};

/////////////////左下角菜单处理 START
MetroScreenNew.ScreenController.prototype.lbMenuHandler = function(evt){
	var menuJQ=$("#lbMenu_expand");
	if(menuJQ.css("display")=="none"){
		menuJQ.css("display","block");
	}else{
		menuJQ.css("display","none");
	}
};
MetroScreenNew.ScreenController.prototype.expandMenuHandler = function(evt){
	var type=evt.type;
	var targetId=$(evt.currentTarget).attr("id");
	var menuBgJQ=$("#lbMenu_expand_bg");
	var basicSrc=menuBgJQ.attr("src");
	var classAttr=$(evt.currentTarget).attr("class");
	basicSrc=basicSrc.substring(0,basicSrc.lastIndexOf("/")+1);
	switch(type){
		case "click":
			switch(targetId){
				case "menu1"://业务
					this.createBusinessWindow();
					break;
				case "menu2"://质差
					this.createDegradationWindow();
					break;
				case "menu3"://资源
					this.showResourceMenuWin();
					break;
				
			}
			break;
		case "mouseover":
			$(evt.currentTarget).attr("class",classAttr.replace("_selected","")+"_selected");
			break;
		case "mouseout":
			$(evt.currentTarget).attr("class",classAttr.replace("_selected",""));
			break;
	}
};
MetroScreenNew.ScreenController.prototype.showStationConfigWin = function(){
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=1150;
	var winHeight=800;
	var win=new LSMScreen.SimpleWindow({
		title:"站点信息",
		width:winWidth,
		height:winHeight,
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){
			
		}.bind(this)
	});
	var tableDom=document.createElement("table");
	var tableId=Math.uuid();
	$(win.content).append(tableDom);
	
	
	$(tableDom).attr("id",tableId);
	var cols=[
	    {colName:'线路',name : '线路',index : '线路',width : 100},
	    {colName:'站点',name : '站点',index : '站点',width : 250},
	    {colName:'2G',name : '2G',index : '2G',width : 100},
	    {colName:'3G',name : '3G',index : '3G',width : 100},
	    {colName:'4G',name : '4G',index : '4G',width : 100},
	    {colName:'换乘线路',name : '换乘线路',index : '换乘线路',width : 250},
	    {colName:'地面站',name : '地面站',index : '地面站',width : 100},
	    {colName:'地下站',name : '地下站',index : '地下站',width : 100}
	];
	var opt1={
	        datatype : function(){},
	        colNames:['线路','站点','2G','3G','4G','换乘线路','地面站','地下站'],
	        colModel : cols,
	        loadui:'disable',
	        rowNum:1000000,
	        height:winHeight-100
		};
	
	var grid=$(tableDom).jqGrid(opt1);
	
	var exportBtn=document.createElement("div");
	$(exportBtn).addClass("icon_exportPic");
	$(exportBtn).css("position","absolute");
	$(exportBtn).css("right","5px");
	$(exportBtn).css("top","10px");
	$(win.content).append(exportBtn);
	$(exportBtn).on('click',function(){
		SUtils.exportJQGrid(grid,"站点信息");
	});
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMetroLineStationCellType({}, function(stationCellTypeRes){
		dm.getMetroLineStationUpDown({}, function(updownRes){
			SUtils.crossSafeAjax({
		  		type : "GET",
		  		async : false,
		  		dataType : "application/json",
		  		contentType : "application/json",
		  		processData : false,
		  		url:"metroswf/data/sw_shanghai.json",
		  		success : function(exRes) 
		  		{
		  			var resultArr=[];
		  			var spliter="_";
		  			var lineStationMap={};
		  			var lineNum="";
		  			var lineStations="";
		  			var stationName="";
		  			var key="";
		  			var i=0;
		  			var j=0;
		  			for(lineNum in stationCellTypeRes){
		  				lineStations=stationCellTypeRes[lineNum];
		  				for(stationName in lineStations){
		  					key=lineNum+spliter+stationName;
		  					lineStationMap[key]=lineStations[stationName];
		  					lineStationMap[key]["线路"]=lineNum;
		  					lineStationMap[key]["站点"]=stationName;
		  				}
		  			}
		  			for(lineNum in updownRes){
		  				lineStations=updownRes[lineNum];
		  				for(stationName in lineStations){
		  					key=lineNum+spliter+stationName;
		  					if(lineStationMap[key]==null){
		  						console.log("站点"+key+"不存在于stations-nt接口");
		  						lineStationMap[key]={};
		  						lineStationMap[key]["线路"]=lineNum;
			  					lineStationMap[key]["站点"]=stationName;
		  					}
		  					if(lineStations[stationName]=="地下"){
		  						lineStationMap[key]["地下站"]="1";
		  					}else{
		  						lineStationMap[key]["地面站"]="1";
		  					}
		  				}
		  			}
		  			
		  			for(i=0;i<exRes.length;i++){
		  				lineNum=exRes[i]["-lb"];
		  				lineStations=exRes[i]["p"];//这里是array
		  				for(j=0;j<lineStations.length;j++){
		  					stationName=lineStations[j]["-lb"];
		  					key=lineNum+spliter+stationName;
		  					var ex=lineStations[j]["-ex"];
		  					if(ex=="true"){
		  						var exLines=lineStations[j]["-ln"];
		  						var tmp=exLines.split(",");
		  						var tmpMap={};
		  						var tmpResult=[];
		  						for(var t=0;t<tmp.length;t++){
		  							var exLine=tmp[t];
		  							if(exLine.indexOf("延伸段")!=-1||exLine=="上海市|磁悬浮"){
		  								continue;
		  							}else{
		  								exLine=exLine.replace("上海市|地铁","").replace("号线","");
		  								if(tmpMap[exLine]==null){
		  									tmpMap[exLine]=true;
		  									tmpResult.push(exLine);
		  								}
		  							}
		  						}
		  						lineStationMap[key]["换乘线路"]=tmpResult.join(",");
		  					}
		  					lineStationMap[key]["sortIndex"]=lineNum*10000+j;
		  				}
		  			}
		  			
		  			for(key in lineStationMap){
		  				resultArr.push(lineStationMap[key]);
		  			}
		  			
		  			resultArr.sort(function(a,b){return a["sortIndex"]-b["sortIndex"];});
		  			
		  			grid[0].addJSONData(resultArr);
		  			
		  		}
			});
		});
	});
	
};
MetroScreenNew.ScreenController.prototype.showCellListWin = function(){
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=1250;
	var winHeight=795;
	var win=new LSMScreen.SimpleWindow({
		title:"小区列表",
		width:winWidth,
		height:winHeight,
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){
			
		}.bind(this)
	});
	var tableDom=document.createElement("table");
	var pager=document.createElement("div");
	var tableId=Math.uuid();
	var pagerId=Math.uuid();
	$(win.content).append(tableDom);
	$(win.content).append(pager);
	$(tableDom).attr("id",tableId);
	$(pager).attr("id",pagerId);
	var cols=[
	    {colName:'站点',name : 'hot_name',index : 'hot_name',width : 250},
	    {colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 300},
	    {colName:'小区类型',name : 'cell_nt',index : 'cell_nt',width : 100},
	    {colName:'经度',name : 'lon',index : 'lon',width : 100},
	    {colName:'纬度',name : 'lat',index : 'lat',width : 100},
	    {colName:'LAC-CI',name : 'lac-ci',index : 'lac-ci',width : 200}
	];
	var opt1={
			datatype: 'local',  
	        colNames:['站点','小区名称','小区类型','经度','纬度','LAC-CI'],
	        colModel : cols,
	        loadui:'disable',
	        pager: "#"+pagerId,
	        autowidth:true,
	        shrinkToFit:true,
	        autoScroll: false,
	        viewrecords:true,
	        rowNum:15,
	        height:winHeight-135,
	        prmNames: {
	        	rows:"limit"
            }
		};
	
	var grid=$(tableDom).jqGrid(opt1);
	var exportBtn=document.createElement("div");
	$(exportBtn).addClass("icon_exportPic");
	$(exportBtn).css("position","absolute");
	$(exportBtn).css("right","5px");
	$(exportBtn).css("top","10px");
	$(win.content).append(exportBtn);
	$(exportBtn).on('click',function(){
		ToExcelOrCSVPage({
	        myGrid : grid.jqGrid("getGridParam"),
	        action : LSMConsts.G_URLCONFIG.urlInasSml+"/export/export",
	        title : "小区列表",    //导出的表名
	        isThereCheckBox : false,//第一列是否有选择框或序号，是否导出第一列
	        isHidden : false,//是否导出隐藏列，true 导出
	        isComplexHeader : false//是否多级表头，暂支持两级表头
	      });
	});
	var postData={"hot_name":"地铁","cell_name":"","cell_nt":"","lac_ci":"","ifId":"area-cfg-hotcellQueryByHot"};
//	var postData={"hot_id":"20160506150214","cell_name":"","cell_nt":"","lac_ci":""};
	grid.jqGrid("setGridParam", {
        url: LSMConsts.G_URLCONFIG.urlInasSml+"/query/area-cfg-hotcellQueryByHot",
        datatype: "json",
        mtype: 'POST',
        jsonReader: {
            root: "data.elements",
            records: "data.total",
            total: "data.pageNum",
            page: "data.pageNo"
        },
        postData: {params: JSON.stringify(postData),sord:'desc'},
        page: 1
    }).trigger("reloadGrid");
};
MetroScreenNew.ScreenController.prototype.resourceMenuClick = function(evt){
	var id=$(evt.currentTarget).attr("name");
	switch(id){
		case "站点信息":
			this.showStationConfigWin();
			break;
		case "小区列表":
			this.showCellListWin();
			break;
	}
};
MetroScreenNew.ScreenController.prototype.showResourceMenuWin = function(){
	var docHeight=1200;
	var winWidth=300;
	var winHeight=320;
	var win=new LSMScreen.SimpleWindow({
		title:"资源",
		width:winWidth,
		height:winHeight,
		x:215,
		y:docHeight-winHeight-30,
		beforeClose:function(){
			
		}.bind(this)
	});
	
	var tableDom=document.createElement("table");
	
	$(win.content).append(tableDom);
	
	var cols=[
	    {colName:'功能',name : 'name',index : 'name',width : 300}
	];
	var opt1={
	        datatype : function(){},
	        colNames:['功能'],
	        colModel : cols,
	        loadui:'disable',
	        afterInsertRow:function(rowid,rowdata){
	        	var tr=grid.find("tbody").find("tr")[rowid];
	        	$(tr).attr("name",rowdata.id);
	        	$(tr).on('click',this.resourceMenuClick.bind(this));
	        }.bind(this),
	        height:winHeight-60
		};
	
	var grid=$(tableDom).jqGrid(opt1);
	grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide();
	var arr=["站点信息","小区列表"];
	for(var i=0;i<arr.length;i++){
		var menuName=arr[i];
		var record={id:menuName,name:menuName};
		grid.jqGrid('addRowData', i+1, record);
	}
	
};
MetroScreenNew.ScreenController.prototype.createBusinessWindow=function(){
	$("div[class = 'tempWin']").remove(); 
	var menuBgJQ=$("#lbMenu_expand_bg");
	var basicSrc=menuBgJQ.attr("src");
	basicSrc=basicSrc.substring(0,basicSrc.lastIndexOf("/")+1);

	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=1200;
	var winHeight=800;
	var win=new LSMScreen.SimpleWindow({
		title:"业务量",
		width:winWidth,
		height:winHeight,
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){
			
		}.bind(this)
	});
//	$(win.content) win.content是窗体内容的dom节点 把你的内容挂到下面
var contentHtml =  '<div style="width: 1200px; height: 324px;">'
		    +       '<div style="width: 1200px; height: 40px;">'
		    +        	   '<div id="yewu_day" name="yewu_name" value="1" class="cellTypeBtnDiv" onclick="metroAddBounce_yewu.changeTimeType(\'yewu_day\',\'yewu_name\')">'
		    +        	       '<div class="majorRadio customRadio customRadioSelected" name="日"></div>'
		    +        	   '</div>'
		    +        	   '<div  class="cellTypeTxt">日</div>'
		    +        	   '<div id="yewu_week" name="yewu_name" value="0" class="cellTypeBtnDiv" onclick="metroAddBounce_yewu.changeTimeType(\'yewu_week\',\'yewu_name\')">'
		    +        	        '<div class="majorRadio customRadio" name="周"></div>'
		    +        	   '</div>'
		    +        	   '<div class="cellTypeTxt">周</div>'
		    +              '<div>' 
		    +                  '<span class="cellTypeTxt">截止时间:<span>'  
		    +                  '<input id="timeDay" class="Wdate" style="width: 200px; height: 35px;color: #fff;font-size: 21px;" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd\'})" type="text" readonly="readonly">'
		    +                  '<input id="timeWeek" class="Wdate" style="display:none;width: 200px; height: 35px;color: #fff;font-size: 21px;" type="text" readonly="readonly">'
		    +                  '<span  style="margin-left:10px;cursor:pointer" onclick="metroAddBounce_yewu.doQuery()"><img src ="'+basicSrc+'doQuery.png" style="height:40px"/></span>'
			+             '<a id="main_liuliang_a" onclick="metroAddBounce_yewu.changeEchats(\'main_liuliang\',\'mainEcharts\')" style="cursor: pointer;margin-left:370px;color:#00e7f1;font-size:18px">流量</a>'
			+             '<a id="main_huawuliang_a" onclick="metroAddBounce_yewu.changeEchats(\'main_huawuliang\',\'mainEcharts\')" style="cursor: pointer;margin-left:15px;color:#fff;font-size:18px">话务量</a>'
		    +             '<a id="main_yonghushu_a" onclick="metroAddBounce_yewu.changeEchats(\'main_yonghushu\',\'mainEcharts\')" style="cursor: pointer;margin-left:15px;color:#fff;font-size:18px">用户数</a>'    
		    +               '</div>'  
		    +        '</div>'		  
		    +    	'<div class="chart1_content" style="background-color: transparent; width: 100%; height: 100%; cursor: default;">'
		    +    		'<div id="main_liuliang" name="mainEcharts" style="width: 1200px; height: 280px;"></div>'
		    +    		'<div id="main_huawuliang" name="mainEcharts" style="display:none;width: 1200px; height: 280px;"></div>'
		    +    		'<div id="main_yonghushu" name="mainEcharts" style="display:none;width: 1200px; height: 280px;"></div>'
		    +    	'</div>'
			+  '</div>'
		    +   '<div>'
		    +    	 '<table id="yewutab5"></table>'
	        +        '<div id="yewupager5"></div>'
	        +        '<div class="icon_exportPic" onclick="metroAddBounce_yewu.exportGrid()" style="position:absolute;top:10px;right:5px;"></div>'
		    +   '</div>';
    $(win.content).html(contentHtml);
	$(win.content).css("overflow","auto");	
	metroAddBounce_yewu.init();

};
MetroScreenNew.ScreenController.prototype.createDegradationWindow=function(){
	$("div[class = 'tempWin']").remove(); 
	var menuBgJQ=$("#lbMenu_expand_bg");
	var basicSrc=menuBgJQ.attr("src");
	basicSrc=basicSrc.substring(0,basicSrc.lastIndexOf("/")+1);
	
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=1200;
	var winHeight=800;
	var win=new LSMScreen.SimpleWindow({
		title:" 质差小区TOP10",
		width:winWidth,
		height:winHeight,
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){
			
		}.bind(this)
	});
//	$(win.content) win.content是窗体内容的dom节点 把你的内容挂到下面
	var contentHtml =        '<div style="width: 1200px; height: 40px;margin-bottom:5px">'
				    +        	   '<div id="zhicha_day" name="zhicha_name" value="1" class="cellTypeBtnDiv" onclick="metroAddBounce_zhicha.changeTimeType(\'zhicha_day\',\'zhicha_name\')">'
				    +        	       '<div class="majorRadio customRadio customRadioSelected" name="日"></div>'
				    +        	   '</div>'
				    +        	   '<div class="cellTypeTxt">日</div>'
				    +        	   '<div id="zhicha_week" name="zhicha_name" value="0" class="cellTypeBtnDiv" onclick="metroAddBounce_zhicha.changeTimeType(\'zhicha_week\',\'zhicha_name\')">'
				    +        	        '<div class="majorRadio customRadio" name="周"></div>'
				    +        	   '</div>'
				    +        	   '<div class="cellTypeTxt">周</div>'
			        +              '<div>' 
			        +                  '<span class="cellTypeTxt">时间:<span>'  
			        +                  '<input id="timeDay_zhicha" class="Wdate" style="width: 200px; height: 35px;color: #fff;font-size: 21px;" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd\'})" type="text" readonly="readonly">'
			        +                  '<input id="timeWeek_zhicha" class="Wdate" style="display:none;width: 200px; height: 35px;color: #fff;font-size: 21px;" type="text" readonly="readonly">'
			        +               '</div>' 
				    +              '<div>' 
				    +                  '<span class="cellTypeTxt">线路选择:<span>'  
				    +                  '<select id="lineType" style="color:#000;width:200px;height:36px">'  
				    //+                      '<option value="">--请选择--</option>'  
				    +                      '<option value="">全量</option>'  
				    +                      '<option value="地铁1号线">1号线</option>'  
				    +                      '<option value="地铁2号线">2号线</option>'  
				    +                      '<option value="地铁3号线">3号线</option>'  
				    +                      '<option value="地铁4号线">4号线</option>'  
				    +                      '<option value="地铁5号线">5号线</option>'  
				    +                      '<option value="地铁6号线">6号线</option>'  
				    +                      '<option value="地铁7号线">7号线</option>'  
				    +                      '<option value="地铁8号线">8号线</option>'  
				    +                      '<option value="地铁9号线">9号线</option>'  
				    +                      '<option value="地铁10号线">10号线</option>'  
				    +                      '<option value="地铁11号线">11号线</option>'  
				    +                      '<option value="地铁12号线">12号线</option>'  
				    +                      '<option value="地铁13号线">13号线</option>'  
				    +                      '<option value="地铁16号线">16号线</option>'  
				    +                  '</select>'  
				    +                  '<span  style="margin-left:10px;cursor:pointer" onclick="metroAddBounce_zhicha.doQuery()"><img src ="'+basicSrc+'doQuery.png" style="height:40px"/></span>'                   
				    +               '</div>' 
				    +               '<div style="cursor:pointer;position:absolute;right:30px;top:52px;z-index:9999">' 
				    +               '<a><img onclick="metroAddBounce_zhicha.exportData()" title="导出全量地铁小区" src="'+basicSrc+'exportPic.png" width="30px" height="30px" /></a>' 
				    +               '</div>' 
				    +        '</div>'
				    +        '<div>'
				    +    	     '<table id="zhichatab5"></table>'
			        +            '<div id="zhichapager5"></div>'
				    +        '</div>';
$(win.content).html(contentHtml);
$(win.content).css("overflow","auto");	
metroAddBounce_zhicha.init();
};
/////////////////左下角菜单处理 END