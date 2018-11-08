/** 需要consts.js,utils.js,screenbase.js*/
/**
 * 迪士尼命名空间
 * @namespace
 */
var SceneBase = SceneBase || {};
var navBar = null;
var _hotSpot = "";
var _kpis = null;
var _comparedKpis = null;
var _comparedKpisCore = null;
var _comparedKpisOutside = null;

var _comparedKpisRoll = null;
var _comparedKpisRollCore = null;
var _comparedKpisRollOutside = null;

var _selectedKpiIndex = 0;
var _chartReadyCount = 0;
var _curTrafficFlows = null;

//用作指标选择面板的数据源 拖曳后改变顺序
var kpiChooserSource=null;

SceneBase.ScreenController=function (hotSpot_)
{
//	this.initGridCols();
//	return;
	_hotSpot = hotSpot_;
	this.initData();
	this.initialize.apply(this, arguments);
	this.initComponents();
};
/** 从ScreenBase继承*/
SceneBase.ScreenController.prototype=Object.create(LSMScreen.ScreenBase.prototype);
SceneBase.ScreenController.prototype.constructor=SceneBase.ScreenController;

SceneBase.ScreenController.prototype.lineWidth=2;//8
SceneBase.ScreenController.prototype.baseChartHeight0=380;
SceneBase.ScreenController.prototype.baseChartHeight1=80;
SceneBase.ScreenController.prototype.showKpiCount=15;
SceneBase.ScreenController.prototype.selectedKpi;
SceneBase.ScreenController.prototype.dayStreamTrendData;//娄瑶佳当天累计趋势图接口数据缓存
SceneBase.ScreenController.prototype.dayStreamTrendDataRoll;//娄瑶佳当天累计趋势图接口数据缓存 小时粒度 用户数

SceneBase.ScreenController.prototype.qualityDataUser={};//网络质量面板的缓存数据 用户数
SceneBase.ScreenController.prototype.qualityDataNet={};//网络质量面板的缓存数据 网管
SceneBase.ScreenController.prototype.qualityDataSig={};//网络质量面板的缓存数据 信令
SceneBase.ScreenController.prototype.qualityDataNetDay={};//累计数据 网管
SceneBase.ScreenController.prototype.qualityDataSigDay={};//累计数据 信令

SceneBase.ScreenController.prototype.timeChooser=null;
SceneBase.ScreenController.prototype.lagLogged=false;
SceneBase.ScreenController.prototype.chartLoadMask;
SceneBase.ScreenController.prototype.subMenus=["区域选择"];

SceneBase.ScreenController.prototype.initConfigs=function(){
	this.period=2*60*1000;
};
SceneBase.ScreenController.prototype.initGridCols=function()
{
	var dm=LSMScreen.DataManager.getInstance();
	var allCols=LSMConsts.kpis;

	var hotspot_sig=[{kpiName:"热点名称", kpiFullName:"hot_name"},{kpiName:"小区数", kpiFullName:"cell_cnt",unit:"个"}];
	var hotspot_net=[{kpiName:"热点名称", kpiFullName:"hot_name"},{kpiName:"小区数", kpiFullName:"cell_cnt",unit:"个"}];
	
	var cell2g_sig=[{kpiName:"小区名称", kpiFullName:"cell_name"}];
	var cell2g_net=[{kpiName:"小区名称", kpiFullName:"cell_name"}];
	
	var cell3g_sig=[{kpiName:"小区名称", kpiFullName:"cell_name"}];
	var cell3g_net=[{kpiName:"小区名称", kpiFullName:"cell_name"}];
	
	var cell4g_sig=[{kpiName:"小区名称", kpiFullName:"cell_name"}];
	var cell4g_net=[{kpiName:"小区名称", kpiFullName:"cell_name"}];
	
	
	
	for(var i=0;i<allCols.length;i++){
		var record=allCols[i];
		var kpiType=record.kpiType;
		var neType=record.neType;
		
		if(kpiType==LSMConsts.kpiTypeSig){
			if(neType=="all"){
				hotspot_sig.push(record);
				cell2g_sig.push(record);
				cell3g_sig.push(record);
				cell4g_sig.push(record);
			}else if(neType=="4g"){
				hotspot_sig.push(record);
				cell4g_sig.push(record);
			}else if(neType=="3g"){
				cell3g_sig.push(record);
			}else if(neType=="2g"){
				cell2g_sig.push(record);
			}
		}else if(kpiType==LSMConsts.kpiTypeNet){
			hotspot_net.push(record);
			if(neType=="all"){
				cell2g_net.push(record);
				cell3g_net.push(record);
				cell4g_net.push(record);
			}else if(neType=="4g"){
//				hotspot_net.push(record);
				cell4g_net.push(record);
			}else if(neType=="3g"){
				cell3g_net.push(record);
			}else if(neType=="2g"){
				cell2g_net.push(record);
			}
		}
	}
	
	var showTag="";//_show
	
	var hotspotSigId="areaGridColConfig_hotspot_signal"+showTag;
	var hotspotNetId="areaGridColConfig_hotspot_net"+showTag;
	
	var cell2gSigId="areaGridColConfig_cell2g_signal"+showTag;
	var cell2gNetId="areaGridColConfig_cell2g_net"+showTag;
	
	var cell3gSigId="areaGridColConfig_cell3g_signal"+showTag;
	var cell3gNetId="areaGridColConfig_cell3g_net"+showTag;
	
	var cell4gSigId="areaGridColConfig_cell4g_signal"+showTag;
	var cell4gNetId="areaGridColConfig_cell4g_net"+showTag;
	
	//hotspot
	dm.configOperate(
			{
				"data":{
					"id":hotspotSigId,
					"content":JSON.stringify(hotspot_sig)
				},
				"type":"update",
				"conditions":["id"]
			},
			function(){console.log(hotspotSigId+"保存成功");},
			function(){console.log(hotspotSigId+"保存失败");}
	);
	
	dm.configOperate(
			{
				"data":{
					"id":hotspotNetId,
					"content":JSON.stringify(hotspot_net)
				},
				"type":"update",
				"conditions":["id"]
			},
			function(){console.log(hotspotNetId+"保存成功");},
			function(){console.log(hotspotNetId+"保存失败");}
	);
	//cell2g
	dm.configOperate(
			{
				"data":{
					"id":cell2gSigId,
					"content":JSON.stringify(cell2g_sig)
				},
				"type":"update",
				"conditions":["id"]
			},
			function(){console.log(cell2gSigId+"保存成功");},
			function(){console.log(cell2gSigId+"保存失败");}
	);
	
	dm.configOperate(
			{
				"data":{
					"id":cell2gNetId,
					"content":JSON.stringify(cell2g_net)
				},
				"type":"update",
				"conditions":["id"]
			},
			function(){console.log(cell2gNetId+"保存成功");},
			function(){console.log(cell2gNetId+"保存失败");}
	);
	
	//cell3g
	dm.configOperate(
			{
				"data":{
					"id":cell3gSigId,
					"content":JSON.stringify(cell3g_sig)
				},
				"type":"update",
				"conditions":["id"]
			},
			function(){console.log(cell3gSigId+"保存成功");},
			function(){console.log(cell3gSigId+"保存失败");}
	);
	
	dm.configOperate(
			{
				"data":{
					"id":cell3gNetId,
					"content":JSON.stringify(cell3g_net)
				},
				"type":"update",
				"conditions":["id"]
			},
			function(){console.log(cell3gNetId+"保存成功");},
			function(){console.log(cell3gNetId+"保存失败");}
	);
	
	//cell4g
	dm.configOperate(
			{
				"data":{
					"id":cell4gSigId,
					"content":JSON.stringify(cell4g_sig)
				},
				"type":"update",
				"conditions":["id"]
			},
			function(){console.log(cell4gSigId+"保存成功");},
			function(){console.log(cell4gSigId+"保存失败");}
	);
	
	dm.configOperate(
			{
				"data":{
					"id":cell4gNetId,
					"content":JSON.stringify(cell4g_net),
				},
				"type":"update",
				"conditions":["id"]
			},
			function(){console.log(cell4gNetId+"保存成功");},
			function(){console.log(cell4gNetId+"保存失败");}
	);
};
SceneBase.ScreenController.prototype.initData=function()
{
	_kpis = [];
	kpiChooserSource=LSMConsts.kpiChooserSource;
	var i = 0;
	var record={};
	var arr=kpiChooserSource;
	var sigs=[];
	var nets=[];
	var selectedMap={};
	for ( i = 0; i < arr.length; ++i)
	{
		record=arr[i];
		if(record.selected){
			if(record.kpiType==LSMConsts.kpiTypeSig){
				sigs.push(record);
			}else if(record.kpiType==LSMConsts.kpiTypeNet){
				nets.push(record);
			}
			selectedMap[record.generateId]=true;
//			_kpis.push(record);
		}
	}
	if(sigs.length<15||nets.length<15){
		for ( i = 0; i < arr.length; ++i)
		{
			record=arr[i];
			if(record.kpiType==LSMConsts.kpiTypeSig&&selectedMap[record.generateId]==null&&sigs.length<15){
				sigs.push(record);
			}else if(record.kpiType==LSMConsts.kpiTypeNet&&selectedMap[record.generateId]==null&&nets.length<15){
				nets.push(record);
			}
		}
	}
	_kpis=sigs.concat(nets);
	this.selectedKpi=_kpis[0];
};

/** 
 * 初始化未绘制的组件
 * @protected
 * @function 
 */
SceneBase.ScreenController.prototype.initComponents=function()
{
//	navBar = new LSMScreen.NavBar(["网元告警", "性能告警", "用户投诉"],0,$("#tabNavigator").width(),null);
//	nav_ul = navBar.navDom;
//	$("#tabNavigator").append(nav_ul);
	$(".Lnorm1").on('click',this.showDayCompareChart.bind(this));
	$("#btn_period").on('click',this.changePeriod.bind(this));
	$("#expandBtn").on('click',this.changeDetailShow.bind(this));
	$("#kpiChooserBtn").on('click',this.showKpiChooser.bind(this));
	$("#compareChart").on('dblclick',this.zoomCompareChart.bind(this));
	$(".DL4_right .subtitle_txt_right").on('dblclick',this.zoomRegionDetail.bind(this));
	$(".kpiTypeRadio").on('click',this.changeKpiType.bind(this));
	$("#lbMenu").on('click',this.lbMenuHandler.bind(this));
	$("#lbMenu_expand div").on('mouseover',this.expandMenuHandler.bind(this));
	$("#lbMenu_expand div").on('mouseout',this.expandMenuHandler.bind(this));
	$("#lbMenu_expand div").on('click',this.expandMenuHandler.bind(this));
	
	this.chartLoadMask=new LSMScreen.LoadMask($(".DL3_right")[0]);
	this.initObjects();
};

SceneBase.ScreenController.prototype.initObjects=function()
{
	/**
	 * 同比表对象
	 * @private
	 * @type {SceneBase.CompareChart} 
	 */
	this.compareChart=new SceneBase.CompareChart
	(
			$("#compareChart")[0],
			{title:"",contentHeight:this.baseChartHeight0},
			this.chartReady.bind(this)
	);
	
	this.customerCompareChart = new SceneBase.CustomerCompareChart
	(
			$("#customerCompareChart")[0],
			{title:"",contentHeight:this.baseChartHeight1},
			this.chartReady.bind(this)
	);
	
	this.trafficFlowCompareChart = new SceneBase.TrafficFlowCompareChart
	(
			$("#trafficFlowCompareChart")[0],
			{title:"",contentHeight:this.baseChartHeight1},
			this.chartReady.bind(this)
	);
	
	this.flowCompareChart = new SceneBase.FlowCompareChart
	(
			$("#flowCompareChart")[0],
			{title:"",contentHeight:this.baseChartHeight1},
			this.chartReady.bind(this)
	);
	
	this.regionDetail=new SceneBase.RegionDetail($(".DL4_right_content")[0],_hotSpot,this.changeHotspot.bind(this),this.zoomRegionDetail.bind(this));
	this.regionDetail.drillCompareCallBack=this.loadCustomCompareChartData.bind(this);
	this.regionDetail.kpiType=LSMConsts.kpiTypeSig;
	this.regionDetail.update(true);
	
	
	this.alarmList=new SceneBase.AlarmList(_hotSpot);
	this.alarmList.update(true);
};

SceneBase.ScreenController.prototype.lbMenuHandler = function(evt){
	var menuJQ=$("#lbMenu_expand");
	if(menuJQ.css("display")=="none"){
		menuJQ.css("display","block");
	}else{
		menuJQ.css("display","none");
	}
};
SceneBase.ScreenController.prototype.expandMenuHandler = function(evt){
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
					window.location.href="disney1.jsp";
					break;
				case "menu2":
					window.location.href="disney2.jsp";
					break;
				case "menu3":
					window.location.href="disney3.jsp";
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
SceneBase.ScreenController.prototype.showSubMenuWin = function(){
	var docHeight=$(document).height();
	var winWidth=300;
	var winHeight=320;
	var win=new LSMScreen.SimpleWindow({
		title:"其他功能",
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
	        	$(tr).on('click',this.subMenuClick.bind(this));
	        }.bind(this),
	        height:winHeight-60
		};
	
	var grid=$(tableDom).jqGrid(opt1);
	grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide();
	var arr=this.subMenus;
	for(var i=0;i<arr.length;i++){
		var menuName=arr[i];
		var record={id:menuName,name:menuName};
		grid.jqGrid('addRowData', i+1, record);
	}
};
SceneBase.ScreenController.prototype.subMenuClick = function(evt){
	var id=$(evt.currentTarget).attr("name");
	switch(id){
		case "区域选择":
			this.showRegionSelector();
			break;
		case "小区详情":
			this.regionDetail.drillSubCells(LSMConsts.hotspots[0]);
			break;
		case "小区用户数详情":
			this.showUserNumCompare();
			break;
		case "专线信息":
			this.showLineInfo();
			break;
		case "大数据客流分析系统":
			window.open("http://211.136.111.194:9093/DSP-MONITOR/disney/gsma.action", "_blank");
			break;
	}
};
SceneBase.ScreenController.prototype.showUserNumCompare = function(){
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=800;
	var winHeight=800;
	var chartHeight=280;
	var win=new LSMScreen.SimpleWindow({
		title:"小区用户数详情",
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){ 
			
		}.bind(this)
	});
	var chartDom=document.createElement("div");
	var tableDom=document.createElement("table");
	$(chartDom).width(winWidth);
	$(chartDom).height(chartHeight);
	$(win.content).append(chartDom);
	$(win.content).append(tableDom);
	var cols=[
	    {colName:'热点名称',name : 'name',index : 'name',width : 300},
	    {colName:'大客流用户数',name : 'pf_stock',index : 'pf_stock',width : 250},
	    {colName:'信令用户数',name : '总用户数',index : '总用户数',width : 250}
	];
	var opt1={
	        datatype : function(){},
	        colNames:['热点名称','大客流用户数','信令用户数'],
	        colModel : cols,
	        loadui:'disable',
	        afterInsertRow:function(rowid,rowdata){
	        	var tr=grid.find("tbody").find("tr")[rowid];
	        	$(tr).attr("name",rowdata.name);
	        	$(tr).on('click',updateChartEvent);
	        }.bind(this),
	        height:winHeight-chartHeight-80
		};
	
	var grid=$(tableDom).jqGrid(opt1);
	var chart=new LSMScreen.SimpleChart(chartDom,{},function(){
		var dm=LSMScreen.DataManager.getInstance();
		dm.getGridHotPftTrend(
			{},
			function(pftMap){
				dm.getSubHotspots({hotspot:LSMConsts.hotspots[0]},function(data){
					var hotspots=[LSMConsts.hotspots[0]];
					for(var i=0;i<data.length;i++){
						hotspots.push(data[i].hot_name);
					}
					dm.getHotSpotsKpis(hotspots,null,null,function(sigData){
						var arr=[];
						var time="";
						for(var key in sigData){
							var lastRecord=null;
							if(pftMap[key]&&pftMap[key].length>0){
								lastRecord=pftMap[key][pftMap[key].length-1]
							}
							time=sigData[key].time;
							sigData[key]=$.extend(sigData[key],lastRecord); 
							sigData[key]["name"]=key;
							arr.push(sigData[key]);
						}
						arr=arr.sort(function(a,b){return b["总用户数"]-a["总用户数"];});
						for(var i=0;i<arr.length;i++){
							var record=arr[i];
							grid.jqGrid('addRowData', i+1, record);
						}
						grid.find("tr").removeClass("oddGrayTableRow");
						grid.find("tr:odd").addClass("oddGrayTableRow");
						if(arr.length>0){
							updateChart(arr[0]["name"]);
						}
						$(win.title).find(".tempWinTitleTxtSpan").text("小区用户数详情  "+time);
					},function(){console.log("信令用户数请求失败");});
				},function(){console.log("子热点列表请求失败");});
			},
			function(){console.log("小区用户数详情信息请求失败");}
		);
	});
	function updateChartEvent(evt){
		var hotspot=$(evt.currentTarget).attr("name");
		updateChart(hotspot);
	}
	function updateChart(hotspot){
		var dm=LSMScreen.DataManager.getInstance();
		dm.getGridHotPftTrend(
			{},
			function(pftMap){
				LSMScreen.DataManager.prototype.getHotSpotsKpisCompared(hotspot, null, null, null, null,null,
						function(arr){
					
					var pftChartArr=[];
					var sigChartArr=[];
					var xArr=[];
					var pftList=pftMap[hotspot];
					var pftTimeMap={};
					var i=0;
					if(pftList!=null){
						for(i=0;i<pftList.length;i++){
							pftTimeMap[pftList[i].time.substring(11,16)]=pftList[i].pf_stock;
						}
					}
					for(i=0;i<arr.length;i++){
						var record=arr[i];
						var timeTxt=record.time.substring(11,16);
						xArr.push(timeTxt);
						sigChartArr.push(record["总用户数"]);
						pftChartArr.push(pftTimeMap[timeTxt]);
					}
					
					var tipFormatter=hotspot+'<br/>'
					+'{b}<br/>'
					+'{a0}:{c0}<br/>'
					+'{a1}:{c1}<br/>';
					
					var option = {
							color:['#fced00','#00ff5a','#7B68EE'],
						    legend: {
						        data:["大客流用户数","信令用户数"],
						        textStyle :
				        		{
						        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
				            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
				        		},
						    },
							grid:{
						    	borderWidth:0,
						    	x:100,
						    	y:30,
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
						    series : [
						        {
						            name:'大客流用户数',
						            type:'line',
						            data:pftChartArr,
						            itemStyle:{normal:{lineStyle:{width:2}}}
						        },
						        {
						            name:'信令用户数',
						            type:'line',
						            data:sigChartArr,
						            itemStyle:{normal:{lineStyle:{width:2}}}
						        }
						    ],
						};
					chart.updateData(option, true);
				},function(){console.log("信令用户数趋势图请求失败");});
			},
			function(){console.log("小区用户数详情信息请求失败");}
		);
		
	}
};
SceneBase.ScreenController.prototype.showLineInfo = function(){
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=1600;
	var winHeight=600;
	var win=new LSMScreen.SimpleWindow({
		title:"专线信息",
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){ 
			
		}.bind(this),
		tools:[{
			"class":"tempWinReturn",
			callBack:function(){
				$(win.content).children("div:eq(1)").css("display","none");
				$(win.content).children("div:eq(0)").css("display","block");
				$(win.title).find(".tempWinReturn").css("display","none");
			}
		}]
	});
	var tableDom=document.createElement("table");
	var tableDom2=document.createElement("table");
	$(win.content).append(tableDom);
	$(win.content).append(tableDom2);
	var cols=[
	    {colName:'时间',name : 'simpleTime',index : 'simpleTime',width : 100},
	    {colName:'专线名称',name : 'name',index : 'name',width : 400},
	    {colName:'带宽(Mbps)',name : 'speed',index : 'speed',width : 220},
	    {colName:'总流速(Mbps)',name : 'totalFlow',index : 'totalFlow',width : 220},
	    {colName:'上行流速(Mbps)',name : 'upFlow',index : 'upFlow',width : 220},
	    {colName:'下行流速(Mbps)',name : 'downFlow',index : 'downFlow',width : 220},
	    {colName:'带宽利用率(%)',name : 'utility',index : 'utility',width : 220}
	];
	var cols2=[
	  	    {colName:'时间',name : 'simpleTime',index : 'simpleTime',width : 100},
	  	    {colName:'目的地址',name : 'distNode',index : 'distNode',width : 400},
	  	    {colName:'归属地',name : 'apanage',index : 'apanage',width : 220},
	  	    {colName:'丢包(%)',name : 'lostPcRate',index : 'lostPcRate',width : 220},
	  	    {colName:'时延(ms)',name : 'delay',index : 'delay',width : 220},
	  	    {colName:'吞吐率(KB/s)',name : 'swallowRate',index : 'swallowRate',width : 220},
	  	    {colName:'解析成功率(%)',name : 'parseSuccRate',index : 'parseSuccRate',width : 220}
	  	];
	var opt1={
	        datatype : function(){},
	        colNames:['时间','专线名称','带宽(Mbps)','总流速(Mbps)','上行流速(Mbps)','下行流速(Mbps)','带宽利用率(%)'],
	        colModel : cols,
	        loadui:'disable',
	        afterInsertRow:function(rowid,rowdata){
	        	var tr=grid.find("tbody").find("tr")[rowid];
	        	$(tr).attr("name",rowdata.id);
	        	$(tr).on('click',drillLine);
	        }.bind(this),
	        height:winHeight-80
		};
	var opt2={
	        datatype : function(){},
	        colNames:['时间','目的地址','归属地','丢包(%)','时延(ms)','吞吐率(KB/s)','解析成功率(%)'],
	        colModel : cols2,
	        loadui:'disable',
	        afterInsertRow:function(rowid,rowdata){
	        }.bind(this),
	        height:winHeight-80
		};
	
	var grid=$(tableDom).jqGrid(opt1);
	var grid2=$(tableDom2).jqGrid(opt2);
	$(win.content).children("div:eq(1)").css("display","none");
	$(win.title).find(".tempWinReturn").css("display","none");
	var dm=LSMScreen.DataManager.getInstance();
	dm.getLineInfoList(null,
			function(arr){
		for(var i=0;i<arr.length;i++){
			var record=arr[i];
			record.simpleTime=record.time.substring(11,16);
			grid.jqGrid('addRowData', i+1, record);
		}
		grid.find("tr").removeClass("oddGrayTableRow");
		grid.find("tr:odd").addClass("oddGrayTableRow");
	},
	function(){console.log("专线信息请求失败");}
	);
	
	function drillLine(evt){
		$(win.title).find(".tempWinReturn").css("display","block");
		$(win.content).children("div:eq(0)").css("display","none");
		$(win.content).children("div:eq(1)").css("display","block");
		SUtils.clearGrid(grid2);
		var lineName=$(evt.currentTarget).attr("name");
		var dm=LSMScreen.DataManager.getInstance();
		dm.getLineDetailList({lineName:lineName},
				function(arr){
			for(var i=0;i<arr.length;i++){
				var record=arr[i];
				record.simpleTime=record.time.substring(11,16);
				grid2.jqGrid('addRowData', i+1, record);
			}
			grid2.find("tr").removeClass("oddGrayTableRow");
			grid2.find("tr:odd").addClass("oddGrayTableRow");
		},
		function(){console.log("专线信息钻取失败");}
		);
	}
};

SceneBase.ScreenController.prototype.showRegionSelector = function(){
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=500;
	var winHeight=600;
	var win=new LSMScreen.SimpleWindow({
		title:"保障区域",
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){
			
		}.bind(this)
	});
	var tableDom=document.createElement("table");
	$(win.content).append(tableDom);
	var cols=[
	    {colName:'保障区域',name : 'name',index : 'name',width : 500}
	];
	var opt1={
	        datatype : function(){},
	        colNames:['保障区域'],
	        colModel : cols,
	        loadui:'disable',
	        afterInsertRow:function(rowid,rowdata){
	        	var tr=grid.find("tbody").find("tr")[rowid];
	        	$(tr).attr("name",rowdata.id);
	        	$(tr).on('click',this.regionClick.bind(this));
	        }.bind(this),
	        height:winHeight-60
		};
	
	var grid=$(tableDom).jqGrid(opt1);
	grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide();
	var arr=LSMConsts.allAreas;
	for(var i=0;i<arr.length;i++){
		var record=arr[i];
		grid.jqGrid('addRowData', i+1, record);
	}
};
SceneBase.ScreenController.prototype.regionClick = function(evt){
	var id=$(evt.currentTarget).attr("name");
	SUtils.updeteBaseHotspotsById(id,function(){
		this.regionDetail.updateUpSpot(LSMConsts.hotspots[0]);
		this.loadData(true);
		window.parent.changeRegionAndArea(LSMConsts.area,LSMConsts.hotspots,LSMConsts.lng,LSMConsts.lat);
	}.bind(this));
};
SceneBase.ScreenController.prototype.zoomRegionDetail = function(){
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
SceneBase.ScreenController.prototype.zoomCompareChart = function(evt){
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=docWidth*0.8;
	var winHeight=docHeight*0.8;
	var chartDom=$("#compareChart")[0];
	var parentJQ=$("#compareChart").parent();
	var win=new LSMScreen.SimpleWindow({
		title:this.selectedKpi.kpiName,
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){
			$(chartDom).width(parentJQ.width());
			$(chartDom).height(parentJQ.height());
			$(this.compareChart.contentDom).height(parentJQ.height());
			parentJQ.append(chartDom);
			this.compareChart.echart.resize();
		}.bind(this)
	});
	$(win.content).append(chartDom);
	$(chartDom).width(winWidth);
	$(chartDom).height(winHeight);
	$(this.compareChart.contentDom).height(winHeight-20);
	this.compareChart.echart.resize();
};
SceneBase.ScreenController.prototype.changeHotspot = function(spot){
	_hotSpot=spot;
	$(".subtitleSpan").text("--"+spot);
	this.getAllTrend(true);
};
SceneBase.ScreenController.prototype.changeKpiType = function(evt){
	var type=$(evt.currentTarget).attr("name");
	$(".kpiTypeRadio").removeClass("customRadioSelected");
	if(type=="网管指标"){
		$(".kpiTypeRadio[name='网管指标']").addClass("customRadioSelected");
	}else if(type=="信令指标"){
		$(".kpiTypeRadio[name='信令指标']").addClass("customRadioSelected");
	} 
	this.regionDetail.switchTable(this.getKpiType());
	this.updateNetQuality();
	this.showComparedKpi(0);
};
SceneBase.ScreenController.prototype.getKpiType = function(){
	var type=$(".KpiTypeBtnDiv").find(".customRadioSelected").attr("name");
	return type.replace("指标","");
};
SceneBase.ScreenController.prototype.getSelectedKpisByType = function(){
	var type=this.getKpiType();
	var tmp=[];
	for(var i=0;i<_kpis.length;i++){
		var record=_kpis[i];
		if(record.kpiType==type){
			tmp.push(record);
		}
	}
	return tmp;
};

SceneBase.ScreenController.prototype.changeDetailShow = function(){
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
SceneBase.ScreenController.prototype.changePeriod = function(){
	var src=$("#btn_period").attr("src");
	var name=$("#btn_period").attr("name");
	if(name=="realtime"){
		$("#btn_period").attr("name","hour");
		$("#btn_period").attr("src",src.replace("realtime.png","hour.png"));
	}else{
		$("#btn_period").attr("name","realtime");
		$("#btn_period").attr("src",src.replace("hour.png","realtime.png"));
	}
	this.loadData(true);
};
SceneBase.ScreenController.prototype.showKpiChooser = function(){
	var allKpis=kpiChooserSource;
	var docWidth=1590;
	var docHeight=1190;
	var winWidth=docWidth;
	var winHeight=docHeight;
	var win=new LSMScreen.SimpleWindow({
		title:"指标选择",
		width:winWidth,
		height:winHeight,
		x:0,
		y:0
	});
	
	var selectedKpis=_kpis;
	var selectedMap={};
	var html='';
	html+='<div class="kpiChooserWinFoot" style="position:relative;top:0px;">';
	html+="<div>";
	html+='<input type="button" class="btn btn-primary btn-lg" value="确定"></input>';
	html+="&nbsp;&nbsp;&nbsp;&nbsp;";
	html+='<input type="button" class="btn btn-primary btn-lg" value="取消"></input>';
	html+="</div>";
	html+="</div>";
	
	html+='<div style="height:500px;border:solid 2px #ffffff;position:relative;"><ul class="kpichooser">';
	
	var ul1='<div style="height:300px;border:solid 1px #ffffff;color:white;font-size:28px;margin-top:5px;">用户数 话务量 数据流量<ul class="kpiGroup">';//用户数 话务量 流量
	var ul2='<div style="height:300px;border:solid 1px #ffffff;color:white;font-size:28px;margin-top:5px;">2G<ul class="kpiGroup">';//2G
	var ul3='<div style="height:300px;border:solid 1px #ffffff;color:white;font-size:28px;margin-top:5px;">3G<ul class="kpiGroup">';//3G
	var ul4='<div style="height:300px;border:solid 1px #ffffff;color:white;font-size:28px;margin-top:5px;">4G<ul class="kpiGroup">';//4G
	var ul5='<div style="height:300px;border:solid 1px #ffffff;color:white;font-size:28px;margin-top:5px;">信令统计<ul class="kpiGroup">';//信令统计
	var ul6='<div style="height:300px;border:solid 1px #ffffff;color:white;font-size:28px;margin-top:5px;">VOLTE<ul class="kpiGroup">';//VOLTE
	var ul7='<div style="height:300px;border:solid 1px #ffffff;color:white;font-size:28px;margin-top:5px;">干扰<ul class="kpiGroup">';//干扰
	
	var count1=0;
	var count2=0;
	var count3=0;
	var count4=0;
	var count5=0;
	var count6=0;
	var count7=0;
	
	var i=0;
	for(i=0;i<selectedKpis.length;i++){
		selectedMap[selectedKpis[i].generateId]=true;
		var kpiConfig=selectedKpis[i];
		var kpiId=kpiConfig.generateId;
		var kpiName=kpiConfig.kpiName;
		var source=kpiConfig.source;
		var unit=kpiConfig.unit;
		var value=this.getCurrentBoardKpiValue(kpiConfig);
		if(isNaN(value)){
			value="--";
		}
		var checked='checked="checked"';
		var addClass="KPI_blue";
		var divStr='<div class="indicators KPI KPT_marginR" >'
			+'<div class=""></div>'
			+'<div class="KPI_top">'
			+'<h2 class="KPI_bluetxt">' + value + '</h2><div class="KPIUnit">' + unit +'</div>'
			+'</div>'
			+'<div class="KPI_down '+addClass+'"><span class="'+source+'"><input  class="kpichooserCheckBox" type="checkbox" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></div>'
			+'</div>';
		html+='<li class="chooserItem">'+divStr+'</li>';
	}
	
	html+="</ul></div>";
	
	
	for(i=0;i<allKpis.length;i++){
		var kpiConfig=allKpis[i];
		var kpiId=kpiConfig.generateId;
		if(selectedMap[kpiId]){
			continue;
		}
		var kpiName=kpiConfig.kpiName;
		var kpiGroup=kpiConfig.kpiGroup;
		var source=kpiConfig.source;
		var unit=kpiConfig.unit;
		var value=this.getCurrentBoardKpiValue(kpiConfig);
		if(isNaN(value)){
			value="--";
		}
		var checked="";
		
		var addClass="KPI_blue";
		var divStr='<div class="indicators KPI KPT_marginR" >'
			+'<div class=""></div>'
			+'<div class="KPI_top">'
			+'<h2 class="KPI_bluetxt">' + value + '</h2><div class="KPIUnit">' + unit +'</div>'
			+'</div>'
			+'<div class="KPI_down '+addClass+'"><span class="'+source+'"><input class="kpichooserCheckBox" type="checkbox" value="'+kpiId+'" '+checked+'>'+kpiName+'</input></span></div>'
			+'</div>';
		var li='<li class="chooserItem">'+divStr+'</li>';
		switch(kpiGroup){
		case LSMConsts.kpiGroup1:
			ul1+=li;
			count1++;
			break;
		case LSMConsts.kpiGroup2:
			ul2+=li;
			count2++;
			break;
		case LSMConsts.kpiGroup3:
			ul3+=li;
			count3++;
			break;
		case LSMConsts.kpiGroup4:
			ul4+=li;
			count4++;
			break;
		case LSMConsts.kpiGroup5:
			ul5+=li;
			count5++;
			break;
		case LSMConsts.kpiGroup6:
			ul6+=li;
			count6++;
			break;
		case LSMConsts.kpiGroup7:
			ul7+=li;
			count7++;
			break;
		}
		
		
	}
	ul1+="</ul></div>";
	ul2+="</ul></div>";
	ul3+="</ul></div>";
	ul4+="</ul></div>";
	ul5+="</ul></div>";
	ul6+="</ul></div>";
	ul7+="</ul></div>";
	
	html+=ul1;
	html+=ul2;
	html+=ul3;
	html+=ul4;
	html+=ul5;
	html+=ul6;
	html+=ul7;
	
	
	$(win.content).css("overflow","auto");
	$(win.content).html(html);
	initLis();
	$(".kpichooserCheckBox").on('change',function(evt){
		var isChecked=$(evt.currentTarget).is(':checked');
		var li=$(evt.currentTarget).parent().parent().parent().parent()[0];
		var uls=$(win.content).find("ul");
		detachLis();
		if(isChecked){
			$(uls[0]).append(li);
		}else{
			var currentId=$(evt.currentTarget).val();
			var allKpis=kpiChooserSource;
			var allKpisMap={};
			var i=0;
			for(i=0;i<allKpis.length;i++){
				var kpiId=allKpis[i].generateId;
				allKpisMap[kpiId]=allKpis[i];
			}
			var kpiConfig=allKpisMap[currentId];
			var kpiGroup=kpiConfig.kpiGroup;
			switch(kpiGroup){
			case LSMConsts.kpiGroup1:
				$(uls[1]).append(li);
				break;
			case LSMConsts.kpiGroup2:
				$(uls[2]).append(li);
				break;
			case LSMConsts.kpiGroup3:
				$(uls[3]).append(li);
				break;
			case LSMConsts.kpiGroup4:
				$(uls[4]).append(li);
				break;
			case LSMConsts.kpiGroup5:
				$(uls[5]).append(li);
				break;
			case LSMConsts.kpiGroup6:
				$(uls[6]).append(li);
				break;
			case LSMConsts.kpiGroup7:
				$(uls[7]).append(li);
				break;
			}
		}
		initLis();
	});
	
	function initLis(){
		var lisJQ=$(".kpichooser").find("li");
		var lis=[];
		for(i=0;i<lisJQ.length;i++){
			lis.push(lisJQ[i]);
		}
		initLisEvent(lis);
	}
	function detachLis(){
		var lisJQ=$(win.content).find("li");
		var lis=[];
		for(i=0;i<lisJQ.length;i++){
			lis.push(lisJQ[i]);
		}
		detachLisEvent(lis);
	}
	
	$(win.content).find(":button").on('click',function(evt){
		if($(evt.currentTarget).val()=="确定"){
			var lisJQ=$(win.content).find("li");
			var aLi=[];
			var i=0;
			for(i=0;i<lisJQ.length;i++){
				aLi.push(lisJQ[i]);
			}
			var ilength=aLi.length;//Math.min(list.length,this.showKpiCount);
			var allKpis=kpiChooserSource;
			var allKpisMap={};
			var finalSelected=[];
			var finalSelectedMap={};
			var sortArr=[];
			var sortArrAll=[];
			
			var count=0;
			for(i=0;i<allKpis.length;i++){
				var kpiId=allKpis[i].generateId;
				allKpisMap[kpiId]=allKpis[i];
			}
			for(i=0;i<ilength;i++){
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
				var kpiInfoRecord=allKpis[sortRecordAll.index];
				sortKpiAll.push(kpiInfoRecord);
				sortKpiAll[i].selected=finalSelectedMap[kpiInfoRecord.generateId]==true;
			}
			kpiChooserSource=sortKpiAll;
	//		kpiChooserSource.push({kpiType:LSMConsts.kpiTypeSig,kpiFullName:"总用户数", kpiName:"累计用户数",unit:"人", rate:1, fixed:0,source:LSMConsts.kpiSourceStreamDay});
	//		kpiChooserSource.push({kpiType:LSMConsts.kpiTypeSig,targetIndex:1,kpiFullName:"总用户数", kpiName:"核心区域累计用户数",unit:"人", rate:1, fixed:0,source:LSMConsts.kpiSourceStreamDay});
			_kpis=sortKpi;
			this.loadData(true);
			console.log(JSON.stringify(kpiChooserSource));
			var dm=LSMScreen.DataManager.getInstance();
			dm.configOperate(
					{
						"data":{
							"id":"areaKpiConfig",
							"content":JSON.stringify(kpiChooserSource)
						}
					},
					function(){console.log("areaKpiConfig保存成功");},
					function(){console.log("areaKpiConfig保存失败");}
			);
		}
		win.closeWin();
	}.bind(this));

};

SceneBase.ScreenController.prototype.showDayCompareChart = function(evt){
	var name=$(evt.currentTarget).attr("name");
	switch(name){
		case "核心区域用户数":
			this.selectedKpi={ignoreInConfig:true,kpiFullName:"总用户数", kpiName:"核心区域用户数",unit:"人", rate:1, operation:"*", fixed:0,source:LSMConsts.kpiSourceStreamDay};
			this.refreshCompareChart();
			break;
		case "语音话务量":
			this.selectedKpi={ignoreInConfig:true,kpiFullName:"2ghwlDist,3ghwlDist", kpiName:"累计话务量",unit:"Erl", rate:1, operation:"*", fixed:2,source:LSMConsts.kpiSourceWs};
			this.refreshCompareChart();
			break;
		case "数据流量":
			this.selectedKpi={ignoreInConfig:true,kpiFullName:"总流量", kpiName:"累计流量",unit:"GB", rate:1/LSMConsts.byteDivider/LSMConsts.byteDivider, operation:"*", fixed:2,source:LSMConsts.kpiSourceStreamDay};
			this.refreshCompareChart();
			break;
	}
};


SceneBase.ScreenController.prototype.chartReady = function()
{
	++_chartReadyCount;
	
	if (_chartReadyCount == 4)
	{
		this.loadData(false);
	}
};

SceneBase.ScreenController.prototype.getHotSpotCustomerCountAndFlow = function()
{
	var timeType=this.getTimeType();
	var dm=LSMScreen.DataManager.getInstance();
	dm.getHotSpotCustomerCountAndFlowCompare([_hotSpot,LSMConsts.hotspots[1],LSMConsts.hotspots[2]], null,null,timeType,
			this.getHotSpotFlowCompleteHandler.bind(this), this.getHotSpotCustomerCountAndFlowErrorHandler.bind(this));
	dm.getHotSpotsKpisTimeCompared([_hotSpot,LSMConsts.hotspots[1],LSMConsts.hotspots[2]], null,null,
			this.getHotSpotCustomerCompleteHandler.bind(this), this.getHotSpotCustomerCountAndFlowErrorHandler.bind(this),"hour",true);
	
};

SceneBase.ScreenController.prototype.getHotSpotFlowCompleteHandler = function(result_)
{ 
	this.updateKpiDataCache(this.qualityDataSigDay, result_);
	$("#labelFlowTime").text(result_[_hotSpot].time.substring(11, 16));
	
	if(result_[_hotSpot]["总流量"]!=0&&!isNaN(result_[_hotSpot]["总流量"])){
		document.getElementById("totalFlow").innerHTML = "<h1>" + (result_[_hotSpot]["总流量"] / LSMConsts.byteDivider / LSMConsts.byteDivider).toFixed(1) + "&nbsp;<span>GB</span></h1>";
	}
	
	
	var str =result_[_hotSpot].time;
	str = str.replace(/-/g,"/");
	var date = new Date(str );
	date.setTime(date.getTime()+LSMScreen.DataManager.minBack*2*60*1000);
	
	var time=result_[_hotSpot].time.substring(11,16);
//	var timeCompare=date.Format("hh:mm");
	$("#customerNowTime").text(time+": ");
//	$("#customerCompareTime").text(timeCompare+": ");
	$("#flowNowTime").text(time+": ");
//	$("#flowCompareTime").text(timeCompare+": ");
	
	
	if(result_[_hotSpot]["2G流量"]!=0&&!isNaN(result_[_hotSpot]["2G流量"])) $("#labelKpiValue2G3").text((result_[_hotSpot]["2G流量"] /LSMConsts.byteDivider/LSMConsts.byteDivider).toFixed(1));
	if(result_[_hotSpot]["3G流量"]!=0&&!isNaN(result_[_hotSpot]["3G流量"])) $("#labelKpiValue3G3").text((result_[_hotSpot]["3G流量"] /LSMConsts.byteDivider/LSMConsts.byteDivider).toFixed(1));
	if(result_[_hotSpot]["4G流量"]!=0&&!isNaN(result_[_hotSpot]["4G流量"])) $("#labelKpiValue4G3").text((result_[_hotSpot]["4G流量"] /LSMConsts.byteDivider/LSMConsts.byteDivider).toFixed(1));
	if(result_[_hotSpot]["总流量"]!=0&&!isNaN(result_[_hotSpot]["总流量"])) $("#labelKpiValueNow3").text((result_[_hotSpot]["总流量"] /LSMConsts.byteDivider/LSMConsts.byteDivider).toFixed(1));
	if(result_[_hotSpot]["总流量"]!=0&&!isNaN(result_[_hotSpot]["总流量"])) $("#labelKpiValueNowHb3").text(((result_[_hotSpot]["总流量历史比"] - 1) * 100).toFixed(2) + "%");
	if(result_[LSMConsts.hotspots[1]]["总流量"]!=0&&!isNaN(result_[LSMConsts.hotspots[1]]["总流量"])) $("#labelKpiValueIn3").text((result_[LSMConsts.hotspots[1]]["总流量"] /LSMConsts.byteDivider/LSMConsts.byteDivider).toFixed(1));
	if(result_[LSMConsts.hotspots[2]]["总流量"]!=0&&!isNaN(result_[LSMConsts.hotspots[2]]["总流量"])) $("#labelKpiValueOut3").text((result_[LSMConsts.hotspots[2]]["总流量"] /LSMConsts.byteDivider/LSMConsts.byteDivider).toFixed(1));
};

SceneBase.ScreenController.prototype.getHotSpotCustomerCompleteHandler = function(result_)
{ 
	$("#labelCustomerTime").text(result_[_hotSpot].time.substring(11, 16));
	this.updateKpiDataCache(this.qualityDataSigDay, result_);
	
	if(result_[LSMConsts.hotspots[1]]["总用户数"]!=0&&!isNaN(result_[LSMConsts.hotspots[1]]["总用户数"])){
		document.getElementById("labelCustomerCount").innerHTML = "<h1>" + result_[LSMConsts.hotspots[1]]["总用户数"] + "&nbsp;<span>人</span></h1>";
	}
	
	var str =result_[_hotSpot].time;
	str = str.replace(/-/g,"/");
	var date = new Date(str );
	date.setTime(date.getTime()+LSMScreen.DataManager.minBack*2*60*1000);
	
	var time=result_[_hotSpot].time.substring(11,16);
//	var timeCompare=date.Format("hh:mm");
	$("#customerNowTime").text(time+": ");
//	$("#customerCompareTime").text(timeCompare+": ");
	$("#flowNowTime").text(time+": ");
//	$("#flowCompareTime").text(timeCompare+": ");
	
	if(result_[_hotSpot]["2G用户数"]!=0&&!isNaN(result_[_hotSpot]["2G用户数"])) $("#labelKpiValue2G1").text(result_[_hotSpot]["2G用户数"]);
	if(result_[_hotSpot]["3G用户数"]!=0&&!isNaN(result_[_hotSpot]["3G用户数"])) $("#labelKpiValue3G1").text(result_[_hotSpot]["3G用户数"]);
	if(result_[_hotSpot]["4G用户数"]!=0&&!isNaN(result_[_hotSpot]["4G用户数"])) $("#labelKpiValue4G1").text(result_[_hotSpot]["4G用户数"]);
	if(result_[_hotSpot]["总用户数"]!=0&&!isNaN(result_[_hotSpot]["总用户数"])) $("#labelKpiValueNow1").text(result_[_hotSpot]["总用户数"]);
	if(result_[_hotSpot]["总用户数"]!=0&&!isNaN(result_[_hotSpot]["总用户数"])) $("#labelKpiValueNowHb1").text(((result_[_hotSpot]["总用户数历史比"] - 1) * 100).toFixed(2) + "%");
	if(result_[LSMConsts.hotspots[1]]["总用户数"]!=0&&!isNaN(result_[LSMConsts.hotspots[1]]["总用户数"])) $("#labelKpiValueIn1").text(result_[LSMConsts.hotspots[1]]["总用户数"]);
	if(result_[LSMConsts.hotspots[2]]["总用户数"]!=0&&!isNaN(result_[LSMConsts.hotspots[2]]["总用户数"])) $("#labelKpiValueOut1").text(result_[LSMConsts.hotspots[2]]["总用户数"]);
	
};


SceneBase.ScreenController.prototype.getHotSpotCustomerCountAndFlowCompareTrend = function()
{
	var dm=LSMScreen.DataManager.getInstance();
	dm.getHotSpotCustomerCountAndFlowCompareTrend({hotspot:_hotSpot,timeType:this.getTimeType()},
			this.getHotSpotCustomerCountAndFlowTrendCompleteHandler.bind(this), this.getHotSpotCustomerCountAndFlowTrendErrorHandler.bind(this));
};
SceneBase.ScreenController.prototype.getHotSpotCustomerCountAndFlowTrendCompleteHandler = function(result_)
{
	this.dayStreamTrendData=result_;
	var dm=LSMScreen.DataManager.getInstance();
	dm.getHotSpotsKpisCompared(LSMConsts.hotspots[1], null, null, null, null,"hour",
			this.getHotSpotCustomerCountTrendCompleteHandler.bind(this), this.getComparedKpiErrorHandler.bind(this),true);
};
SceneBase.ScreenController.prototype.getHotSpotCustomerCountTrendCompleteHandler = function(result_)
{
	this.dayStreamTrendDataRoll = result_;
	this.refreshCustomerChart();
	this.refreshFlowChart();
};

SceneBase.ScreenController.prototype.getHotSpotCustomerCountAndFlowErrorHandler = function()
{
	console.log("获取用户数信息失败");
};
SceneBase.ScreenController.prototype.getHotSpotCustomerCountAndFlowTrendErrorHandler = function()
{
	console.log("获取累计用户数，流量趋势图失败");
};

SceneBase.ScreenController.prototype.getHotSpotsKpis = function()
{
	
	var date0=new Date();
	var dm=LSMScreen.DataManager.getInstance();
	var timeType=this.getTimeType();
	dm.getHotSpotsKpis([_hotSpot,LSMConsts.hotspots[1],LSMConsts.hotspots[2]], null,timeType,
			function(result_){
		if(!this.lagLogged){
			var date1=new Date();
			var lag=date1.getTime()-date0.getTime();
			dm.saveRequestDelay({qryusedTime:lag+"",moduleCode:LSMConsts.disneyDelayCode});
			this.lagLogged=true;
		}
		dm.getHotSpotsKpisTimeCompared([_hotSpot,LSMConsts.hotspots[1],LSMConsts.hotspots[2]], null,null,
				function(result2){
			this.updateKpiDataCache(this.qualityDataUser, result2);
			this.getHotSpotsKpisCompleteHandler(result_);
		}.bind(this), this.getHotSpotCustomerCountAndFlowErrorHandler.bind(this),"hour",true);
	}.bind(this), this.getHotSpotsKpisErrorHandler.bind(this));
};

SceneBase.ScreenController.prototype.getHotSpotsKpisCompleteHandler = function(result_)
{
//	this.qualityDataSig=result_;
	this.updateKpiDataCache(this.qualityDataSig, result_);
	if(result_[_hotSpot]!=null){
		var time=result_[_hotSpot].time;
		$("#qualityTime").text(time.substring(11,16));
	}
	this.updateNetQuality();
};

SceneBase.ScreenController.prototype.updateNetQuality = function()
{
	var result={};
	var kpiType=this.getKpiType();
	this.updateKpiDataCache(this.qualityDataSig, this.qualityDataUser)
	if(kpiType==LSMConsts.kpiTypeSig){
		result=this.qualityDataSig;
	}else if(kpiType==LSMConsts.kpiTypeNet){
		result=this.qualityDataNet;
	}
	
	
	var i = 0;
	var kpiList=this.getSelectedKpisByType();
	
	for (i = 0; i < kpiList.length; ++i)
	{
		var _kpi = kpiList[i];
		if(_kpi.kpiType!=kpiType){
			continue;
		}
		var dataMap=null;
		if(_kpi.targetIndex!=null){
			dataMap=result[LSMConsts.hotspots[_kpi.targetIndex]];
		}else{
			dataMap=result[_hotSpot];
		}
		if(dataMap!=null){
			var _selectedKpiName=_kpi.kpiFullName;
			var _value=this.getCurrentBoardKpiValue(_kpi);
			var addClass="KPI_blue";
			var lv=SUtils.getAlarmLevelByThresholdMapConverted(_selectedKpiName,_value);
			if(lv==0){
				addClass="KPI_blue";
			}else if(lv==1){
				addClass="alarmLv1";
			}else if(lv==2){
				addClass="alarmLv2";
			}else if(lv==3){
				addClass="alarmLv3";
			}
			if(isNaN(_value)||_value==0){
				$("#labelKpi" + i).html('<h2 class="KPI_bluetxt">--</h2><div class="KPIUnit">' + _kpi.unit +'</div>');
			}else{
				$("#labelKpi" + i).html('<h2 class="KPI_bluetxt">' + _value + '</h2><div class="KPIUnit">' + _kpi.unit +'</div>');
			}
			$("#nameKpi" + i).html(_kpi.kpiName);
			$("#nameKpi" + i).attr("class","KPI_down "+addClass);
		}
	}
	
	 
	for (i=kpiList.length;i<this.showKpiCount;i++)
	{
		$("#labelKpi" + i).html('<h2 class="KPI_bluetxt"></h2><div class="KPIUnit"></div>');
		$("#nameKpi" + i).html("");
	}
};

SceneBase.ScreenController.prototype.getCurrentBoardKpiValue = function(kpiConfig)
{
	var result={};
	var kpiType=kpiConfig.kpiType;
	var source=kpiConfig.source;
	if(kpiType==LSMConsts.kpiTypeSig){
		if(source==LSMConsts.kpiSourceStreamDay){
			result=this.qualityDataSigDay;
		}else{
			result=this.qualityDataSig;
		}
	}else if(kpiType==LSMConsts.kpiTypeNet){
		result=this.qualityDataNet;
	}
	var _kpi = kpiConfig;
	var dataMap=null;
	if(_kpi.targetIndex!=null){
		dataMap=result[LSMConsts.hotspots[_kpi.targetIndex]];
	}else{
		dataMap=result[_hotSpot];
	}
	if(dataMap!=null){
		var _value = null;
		var _selectedKpiName=_kpi.kpiFullName;
		var tmp=_selectedKpiName.split(",");
		var value=0;
		for(var j=0;j<tmp.length;j++){
			value+=parseFloat(dataMap[tmp[j]]);
		}
		_value = (value* _kpi.rate).toFixed(_kpi.fixed);
		return _value;
	}else{
		return null;
	}
};

SceneBase.ScreenController.prototype.getHotSpotsKpisErrorHandler = function()
{
	console.log("获取指标信息失败");
};
SceneBase.ScreenController.prototype.getAllConfigDomain = function()
{
	var arr=LSMConsts.kpis;
	var wsKpis=[];
	for(var i=0;i<arr.length;i++){
		var record=arr[i];
		if(record.kpiType==LSMConsts.kpiTypeSig){
			wsKpis.push(record.kpiFullName);
		}
	}
	return wsKpis.join(",");
};
//话务量
SceneBase.ScreenController.prototype.getHotSpotTrafficFlow = function()
{
	var _params = 
	{
		hotspot:_hotSpot,
		domains:"2ghwl,3ghwl,2g,3g,4g,dtb2,dtb4",
		"current_day_domains": "2ghwl,3ghwl",
		cascade: true, 
		group:"hot",
		"hb_domains": "2ghwl,3ghwl",
		hb_time_minutes:Math.abs(LSMScreen.DataManager.minBack*2),
		timeType:this.getTimeType(),
	    "all_fields":null,
		hot_fields:null
	};
	
	LSMScreen.DataManager.prototype.getHotSpotTrafficFlow(_params, 
			this.getHotSpotTrafficFlowCompleteHandler.bind(this), this.getHotSpotTrafficFlowErrorHandler.bind(this));
};

SceneBase.ScreenController.prototype.getHotSpotTrafficFlowCompleteHandler = function(result_)
{
	var rebuildData={};
	var hwl2gKey="2ghwlDay";
	var hwl3gKey="3ghwlDay";
	
	for (var i = 0; i < result_.length; ++i)
	{
		var _data = result_[i];
		rebuildData[_data.hot_name]=_data;
		if(_data.time){
			
			if(_data[hwl2gKey]==null) _data[hwl2gKey]=0;
			if(_data[hwl3gKey]==null) _data[hwl3gKey]=0;
			var value=_data[hwl2gKey] + _data[hwl3gKey];
			var valueHb=_data[hwl2gKey+"Hb"] + _data[hwl3gKey+"Hb"];
			switch (_data.hot_name)
			{
				case LSMConsts.hotspots[0]:
					var _flow = (value).toFixed(1);
					var _flowHb = (valueHb).toFixed(1);
					if(!isNaN(_flow)) $("#labelTrafficFlow").html( "<h1>" + _flow + "&nbsp;<span>Erl</span></h1>");
					$("#labelTrafficFlowTime").text(_data.time.substring(11, 16));
					
					$("#labelKpiValueNow2").text(_flow);
					if(_data[hwl2gKey]!=0) $("#labelKpiValue2G2").text((_data[hwl2gKey]).toFixed(1));
					if(_data[hwl3gKey]!=0) $("#labelKpiValue3G2").text((_data[hwl3gKey]).toFixed(1));
					
					var current=(_data["2ghwl"] + _data["3ghwl"]);
					_flowHb=(current/(value-current)*100).toFixed(1);
					if(!isNaN(_flowHb)) $("#labelKpiValueNowHb2").text(_flowHb+"%");
					
					
					var str =_data.time;
					str = str.replace(/-/g,"/");
					var date = new Date(str );
					date.setTime(date.getTime()+LSMScreen.DataManager.minBack*2*60*1000);
					
					var time=_data.time.substring(11,16);
//					var compareTime=date.Format("hh:mm");
					
					$("#trafficNowTime").text(time+": ");
//					$("#trafficCompareTime").text(compareTime+": ");
					
					break;
				case LSMConsts.hotspots[1]:
					var _flowIn = (value).toFixed(1);
					if(value!=0) $("#labelKpiValueIn2").text(_flowIn);
					break;
				case LSMConsts.hotspots[2]:
					var _flowOut = (value).toFixed(1);
					if(value!=0) $("#labelKpiValueOut2").text(_flowOut);
					break;
			}
		}
	}
//	this.qualityDataNet=rebuildData;
	this.updateKpiDataCache(this.qualityDataNet, rebuildData);
	this.updateNetQuality();
	
};
SceneBase.ScreenController.prototype.updateKpiDataCache = function(target,source)
{
	for(var hot in source){
		if(target[hot]==null){
			target[hot]=source[hot];
		}else{
			for(var kpi in source[hot]){
				if(!isNaN(source[hot][kpi])&&source[hot][kpi]!=0){
					target[hot][kpi]=source[hot][kpi];
				}
			}
		}
	}
};
SceneBase.ScreenController.prototype.getHotSpotTrafficFlowErrorHandler = function()
{
	console.log("获取话务量信息失败");
};

//全网趋势图链 要请求三个接口
SceneBase.ScreenController.prototype.getAllTrend = function()
{
	var timeType=this.getTimeType();
	var dm=LSMScreen.DataManager.getInstance();
	if(timeType=='hour'){
		dm.getAllStreamTrendHour({timeType:this.getTimeType()},this.streamAllHandler.bind(this));
	}else{
		dm.getAllStreamTrendRealTime({timeType:this.getTimeType()},this.streamAllHandler.bind(this));
	}
};

//娄瑶佳接口 全网趋势图
SceneBase.ScreenController.prototype.streamAllHandler = function(result)
{
	this.streamAll=result;
	
	var _params = 
	{
	    timeRange:"true",
	    group:"all",            
	    max_threads:"10",
	    "domains": "2ghwl,3ghwl,2g,3g,4g,dtb2,dtb4",
	    "tb_domains": "2ghwl,3ghwl,2g,3g,4g",
	    "hb_domains": "2ghwl,3ghwl,2g,3g,4g",
		tb_time_minutes:1440,
		timeType:this.getTimeType(),
		all_fields:null,
		hot_fields:null
	};
	
	LSMScreen.DataManager.prototype.getHotSpotTrafficFlow(_params, 
			this.wsAllHandler.bind(this));
	
	
	
};
//黄文接口 全网趋势图
SceneBase.ScreenController.prototype.wsAllHandler = function(result)
{
	this.wsAll=result;
	this.loadQualityData();
};

//话务量趋势
SceneBase.ScreenController.prototype.getHotSpotTrafficFlowTrend = function()
{
	var _params = 
	{
	    hotspot:_hotSpot,    
	    timeRange:"true",
	    group:"all",            
	    max_threads:"10",
//	    all_fields:"time",
	    "domains": "2ghwl,3ghwl,2g,3g,4g,dtb2,dtb4",
	    "tb_domains": "2ghwl,3ghwl,2g,3g,4g",
	    "hb_domains": "2ghwl,3ghwl,2g,3g,4g",
	    "current_day_domains": "2ghwl,3ghwl",
	    "accumulation":"2ghwl,3ghwl,2ghwlTb,3ghwlTb",
		tb_time_minutes:1440,
		timeType:this.getTimeType(),
		all_fields:null,
		hot_fields:null
	};
	
	LSMScreen.DataManager.prototype.getHotSpotTrafficFlow(_params, 
			this.getHotSpotTrafficFlowTrendCompleteHandler.bind(this), this.getHotSpotTrafficFlowTrendErrorHandler.bind(this));
};

SceneBase.ScreenController.prototype.getHotSpotTrafficFlowTrendCompleteHandler = function(result_)
{
	_curTrafficFlows = result_;
	
	this.refreshTrafficFlowChart();
};

SceneBase.ScreenController.prototype.getHotSpotTrafficFlowTrendErrorHandler = function()
{
	console.log("获取话务量信息失败");
};

SceneBase.ScreenController.prototype.setTabSelectedIndex = function(index)
{
	navBar.setSelectedIndex(index);
};

SceneBase.ScreenController.prototype.setTabSelectedLabel = function(label)
{
	if(this.alarmList!=null){
		this.alarmList.switchTab(label);
	}
};
SceneBase.ScreenController.prototype.getTimeType = function()
{
	var type=$("#btn_period").attr("name");
	if(type=="realtime"){
		type=null;
	}
	return type;
};
SceneBase.ScreenController.prototype.getComparedKpi = function()
{
	LSMScreen.DataManager.prototype.getHotSpotsKpisCompared(_hotSpot, null, null, null, null,this.getTimeType(),
			this.getComparedKpiCompleteHandler.bind(this), this.getComparedKpiErrorHandler.bind(this));
};

SceneBase.ScreenController.prototype.getComparedKpiCompleteHandler = function(result_)
{
	_comparedKpis = result_;
	//场内曲线
	LSMScreen.DataManager.prototype.getHotSpotsKpisCompared(LSMConsts.hotspots[1], null, null, null, null,this.getTimeType(),
			this.getComparedKpiCoreCompleteHandler.bind(this), this.getComparedKpiErrorHandler.bind(this));
};
SceneBase.ScreenController.prototype.getComparedKpiCoreCompleteHandler = function(result_)
{
	_comparedKpisCore = result_;
	//场外曲线
	LSMScreen.DataManager.prototype.getHotSpotsKpisCompared(LSMConsts.hotspots[2], null, null, null, null,this.getTimeType(),
			this.getComparedKpiOutsideCompleteHandler.bind(this), this.getComparedKpiErrorHandler.bind(this));
	
};

SceneBase.ScreenController.prototype.getComparedKpiOutsideCompleteHandler = function(result_)
{
	_comparedKpisOutside = result_;
	this.getComparedKpiRoll();
	
};

///////////////////////////////////////////


SceneBase.ScreenController.prototype.getComparedKpiRoll = function()
{
	LSMScreen.DataManager.prototype.getHotSpotsKpisCompared(_hotSpot, null, null, null, null,"hour",
			this.getComparedKpiRollCompleteHandler.bind(this), this.getComparedKpiErrorHandler.bind(this),true);
};

SceneBase.ScreenController.prototype.getComparedKpiRollCompleteHandler = function(result_)
{
	_comparedKpisRoll = result_;
	//场内曲线
	LSMScreen.DataManager.prototype.getHotSpotsKpisCompared(LSMConsts.hotspots[1], null, null, null, null,"hour",
			this.getComparedKpiRollCoreCompleteHandler.bind(this), this.getComparedKpiErrorHandler.bind(this),true);
};
SceneBase.ScreenController.prototype.getComparedKpiRollCoreCompleteHandler = function(result_)
{
	_comparedKpisRollCore = result_;
	//场外曲线
	LSMScreen.DataManager.prototype.getHotSpotsKpisCompared(LSMConsts.hotspots[2], null, null, null, null,"hour",
			this.getComparedKpiRollOutsideCompleteHandler.bind(this), this.getComparedKpiErrorHandler.bind(this),true);
	
};

SceneBase.ScreenController.prototype.getComparedKpiRollOutsideCompleteHandler = function(result_)
{
	_comparedKpisRollOutside = result_;
	this.refreshCompareChart();
};






///////////////////////////////////////////

SceneBase.ScreenController.prototype.getComparedKpiErrorHandler = function()
{
	console.log("获取同比数据失败");
};


SceneBase.ScreenController.prototype.getHotSpotsKpisTimeComparedErrorHandler = function()
{
	console.log("获取分类同比数据失败");
};
//外部联动调用
SceneBase.ScreenController.prototype.showComparedKpi = function(index_)
{
	var kpiList=this.getSelectedKpisByType();
	if(index_<kpiList.length){
		for (var i = 0; i < this.showKpiCount; ++i)
		{
			if (index_ != i)
			{
				$("#selectBg" + i).css("display", "none");
			}
			else
			{
				$("#selectBg" + i).css("display", "block");
			}
		}
		
		_selectedKpiIndex = index_;
		this.selectedKpi=kpiList[index_];
		if (_comparedKpis != null && this.compareChart != null)
		{
			this.refreshCompareChart();
		}
	}
};

//外部联动调用
SceneBase.ScreenController.prototype.showComparedKpiFromAll = function(index_)
{
	var allKpis=LSMConsts.kpiChooserSource;
	if(index_<allKpis.length){
		this.selectedKpi=allKpis[index_];
		this.refreshCompareChart();
	}
};

/** 
 * 周期更新数据方法
 * @protected
 * @function 
 */
SceneBase.ScreenController.prototype.update=function(showLoadMask)
{
	this.loadData(showLoadMask);
	
	this.regionDetail.update(showLoadMask);
	this.alarmList.update(showLoadMask);
};

SceneBase.ScreenController.prototype.loadData=function(showLoadMask)
{
	//先获取全网趋势 然后调用loadquality
	this.getAllTrend();
	
	//头部用户数流量数据 展开数据
	this.getHotSpotCustomerCountAndFlow();
	this.getHotSpotCustomerCountAndFlowCompareTrend();
	
	//头部话务量数据及展开内容 同时更新网络质量面板值(如果配置了就会更新)
	this.getHotSpotTrafficFlow();
	
	
//	//头部话务量趋势图 牵涉到趋势图全网对比 放入loadQualityData
//	this.getHotSpotTrafficFlowTrend();
	
	//网络质量面板指标值
//	this.getHotSpotsKpis();
//	//网络质量今日昨日对比数据 牵涉到趋势图全网对比 放入loadQualityData
//	this.getComparedKpi();
};
SceneBase.ScreenController.prototype.loadQualityData=function(showLoadMask)
{
	//头部话务量趋势图
	this.getHotSpotTrafficFlowTrend();
	//网络质量面板指标值
	this.getHotSpotsKpis();
	//网络质量今日昨日对比数据
	this.getComparedKpi();
};
SceneBase.ScreenController.prototype.getMarkLine = function(kpiId)
{
	var markLine=null;
	var thresholsMap=LSMConsts.thresholsMap;
	if(thresholsMap[kpiId]!=null){
		var threshold=thresholsMap[kpiId];
		var unit=threshold.unit;
//		var level_3_threshold_left_value=SUtils.formatThresholdValueForCompare(threshold.level_3_threshold_left_value,unit);
		var level_3_threshold_right_value=SUtils.formatThresholdValueForCompare(threshold.level_3_threshold_right_value,unit);
//		var level_2_threshold_left_value=SUtils.formatThresholdValueForCompare(threshold.level_2_threshold_left_value,unit);
		var level_2_threshold_right_value=SUtils.formatThresholdValueForCompare(threshold.level_2_threshold_right_value,unit);
//		var level_1_threshold_left_value=SUtils.formatThresholdValueForCompare(threshold.level_1_threshold_left_value,unit);
		var level_1_threshold_right_value=SUtils.formatThresholdValueForCompare(threshold.level_1_threshold_right_value,unit);
		markLine={
            data : [
//                // 纵轴，默认
				[
				 {name: '一级阈值', value: level_1_threshold_right_value, xAxis: -1, yAxis: level_1_threshold_right_value,itemStyle:{normal:{color:'#ff0000'}}},      // 当xAxis为类目轴时，数值1会被理解为类目轴的index，通过xAxis:-1|MAXNUMBER可以让线到达grid边缘
		        {name: '一级阈值', value: level_1_threshold_right_value,xAxis: 100, yAxis: level_1_threshold_right_value,itemStyle:{normal:{color:'#ff0000'}}}
				],
				[
				 {name: '二级阈值', value: level_2_threshold_right_value, xAxis: -1, yAxis: level_2_threshold_right_value,itemStyle:{normal:{color:'#ff6c00'}}},      // 当xAxis为类目轴时，数值1会被理解为类目轴的index，通过xAxis:-1|MAXNUMBER可以让线到达grid边缘
		        {name: '二级阈值', value: level_2_threshold_right_value,xAxis: 100, yAxis: level_2_threshold_right_value,itemStyle:{normal:{color:'#ff6c00'}}}
				],
				[
				 {name: '三级阈值', value: level_3_threshold_right_value, xAxis: -1, yAxis: level_3_threshold_right_value,itemStyle:{normal:{color:'#FFFF00'}}},      // 当xAxis为类目轴时，数值1会被理解为类目轴的index，通过xAxis:-1|MAXNUMBER可以让线到达grid边缘
		        {name: '三级阈值', value: level_3_threshold_right_value,xAxis: 100, yAxis: level_3_threshold_right_value,itemStyle:{normal:{color:'#FFFF00'}}}
				]
            ]
        };
	}
	return markLine;
};
SceneBase.ScreenController.prototype.refreshCompareChart = function(kpiConfig,resultList,allResult,targetName)
{
	var target=targetName==null?_hotSpot:targetName;
	var kpi=kpiConfig==null?this.selectedKpi:kpiConfig;
	var targetIndex=kpi.targetIndex;
	var _selectedKpiName = kpi.kpiFullName;
	var showName = kpi.kpiName;
	var fixed=kpi.fixed;
	var rate=kpi.rate;
	var unit=kpi.unit;
	var source=kpi.source;
	var ymax=kpi.ymax;
	var ymin=kpi.ymin;
	
	var i = 0;
	var j=0;
	var _data;
	var _dataAll;
	var tmp;
	var markLine=this.getMarkLine(_selectedKpiName);
	$("#compareTitle").text(showName+"("+unit+")");
	if(targetIndex!=null){
		target=LSMConsts.hotspots[targetIndex];
	}
	var hasAll=source!=LSMConsts.kpiSourceStreamDay
						&&_selectedKpiName.indexOf('hwl')==-1
						&&_selectedKpiName.indexOf('用户数')==-1&&_selectedKpiName.indexOf('流量')==-1
						&&showName.indexOf('用户数')==-1&&showName.indexOf('流量')==-1;
	var legends=[];
	var tipFormatter="";
	if(hasAll){
		legends=['昨日','今日','全网'];
		tipFormatter=target+'<br/>'
		+'{b}<br/>'
		+'{a0}:{c0}<br/>'
		+'{a1}:{c1}<br/>'
		+'{a2}:{c2}<br/>';
	}else{
		legends=['昨日','今日'];
		tipFormatter=target+'<br/>'
		+'{b}<br/>'
		+'{a0}:{c0}<br/>'
		+'{a1}:{c1}<br/>';
	}
	var option = {
			color:['#fced00','#00ff5a','#7B68EE'],
		    legend: {
		        data:legends,
		        textStyle :
        		{
		        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
        		},
		    },
			grid:{
		    	borderWidth:0,
//		    	x:40,
		    	y:30,
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
		            data : []
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
		            max:ymax,
		            min:ymin
		        }
		    ],
		    series : [
		        {
		            name:'昨日',
		            type:'line',
		            data:[],
		            markLine:markLine,
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
		        },
		        {
		            name:'今日',
		            type:'line',
		            data:[],
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
		        },
		        {
		            name:'全网',
		            type:'line',
		            data:[],
		            itemStyle:{normal:{lineStyle:{width:this.lineWidth}}}
		        }
		    ],
		};
	
	
	var lastValue="";
	var lastTime="";
	var currentDate=new Date();
	var pointDate;
	var ignoreLag=5*60*1000;
	var timeType=this.getTimeType();
	var lag=0;
	var list=[];
	var allList=[];
	//用户数特殊处理flag
	var userFlag=(source==LSMConsts.kpiSourceStreamDay&&showName=="核心区域用户数")||(source==LSMConsts.kpiSourceStream&&showName.indexOf("用户数")!=-1);
	if(timeType=="hour"){
		ignoreLag=60*60*1000;
	}
	if(userFlag){
		ignoreLag=10*60*1000;
	}
	if(source==LSMConsts.kpiSourceStreamDay){
		var defaultSource=this.dayStreamTrendData;
		if(showName=="核心区域用户数"){
			defaultSource=this.dayStreamTrendDataRoll;
		}
		list=resultList==null?defaultSource:resultList;
		for ( i = 0; i < list.length; ++i)
		{
			_data = list[i];
			tmp=_selectedKpiName.split(",");
			
			var value=0;
			var valueTb=0;
			for(j=0;j<tmp.length;j++){
				value+=parseFloat(_data[tmp[j]]);
				valueTb+=(_data[tmp[j]] / _data[tmp[j] + "历史比"]);
				//parseFloat(_data[tmp[j]+ "历史比"]);
			}
			if(isNaN(value)) continue;
			option.xAxis[0].data.push(_data.time.substring(11, 16));
//			if(isNaN(value)) value=0;
//			if(isNaN(valueTb)) valueTb=0;
			pointDate=new Date(_data.time.replace(/-/g,"/"));
			lag=currentDate-pointDate;
			if(lag>ignoreLag){
				option.series[0].data.push((valueTb*rate).toFixed(fixed));
				lastValue=(value*rate).toFixed(fixed);
				lastTime=_data.time.substring(11, 16);
				option.series[1].data.push((value*rate).toFixed(fixed));
			}
		}
	}else if(source==LSMConsts.kpiSourceWs){
		list=resultList==null?_curTrafficFlows:resultList;
		allList=allResult==null?this.wsAll:allResult;
		for ( i = 0; i < list.length; ++i)
		{
			_data = list[i];
			_dataAll = allList[i];
			tmp=_selectedKpiName.split(",");
			
			var value=0;
			var valueTb=0;
			var valueAll=0;
			if(_dataAll){
				for(j=0;j<tmp.length;j++){
					var tbKey=tmp[j]+ "Tb";
					tbKey=tbKey.replace("DistTb", "TbDist");
					value+=parseFloat(_data[tmp[j]]);
					valueTb+=parseFloat(_data[tbKey]);
					
					valueAll+=parseFloat(_dataAll[tmp[j]]);
				}
			}else{
				valueAll=null;
			}
			
//			if(isNaN(value)) value=0;
//			if(isNaN(valueTb)) valueTb=0;
//			if(isNaN(valueAll)) valueAll=0;
			if(isNaN(value)) continue;
			option.xAxis[0].data.push(_data.time.substring(11, 16));
			
			pointDate=new Date(_data.time.replace(/-/g,"/"));
			lag=currentDate-pointDate;
			if(lag>ignoreLag){
				if(!isNaN(valueTb)){
					option.series[0].data.push((valueTb*rate).toFixed(fixed));
				}
				lastTime=_data.time.substring(11, 16);
				lastValue=(value*rate).toFixed(fixed);
				option.series[1].data.push((value*rate).toFixed(fixed));
				if(hasAll){
					option.series[2].data.push((valueAll*rate).toFixed(fixed));
				}
			}
			
		}
	}else{
		if(resultList==null){
			if(targetIndex==1){
				if(showName.indexOf("用户数")==-1){
					list=_comparedKpisCore;
				}else{
					list=_comparedKpisRollCore;
				}
				
			}else if(targetIndex==2){
				if(showName.indexOf("用户数")==-1){
					list=_comparedKpisOutside;
				}else{
					list=_comparedKpisRollOutside;
				}
			}else{
				if(showName.indexOf("用户数")==-1){
					list=_comparedKpis;
				}else{
					list=_comparedKpisRoll;
				}
			}
		}else{
			list=resultList;
		}
		allList=allResult==null?this.streamAll:allResult;
		for ( i = 0; i < list.length; ++i)
		{
			_data = list[i];
			_dataAll = allList[i];
			pointDate=new Date(_data.time.replace(/-/g,"/"));
			lag=currentDate-pointDate;
			option.xAxis[0].data.push(_data.time.substring(11, 16));
			if(lag>ignoreLag){
				option.series[0].data.push(((_data[_selectedKpiName] / _data[_selectedKpiName + "历史比"])*rate).toFixed(fixed));
				lastTime=_data.time.substring(11, 16);
				lastValue=(_data[_selectedKpiName]*rate).toFixed(fixed);
				option.series[1].data.push((_data[_selectedKpiName]*rate).toFixed(fixed));
				
				//全网对比数据排除用户数和流量
				if(hasAll){
					if(_dataAll){
						option.series[2].data.push((_dataAll[_selectedKpiName]*rate).toFixed(fixed));
					}
				}
			}
			
		}
	}
	if(isNaN(lastValue)){
		lastValue="--";
	}
	var valueHtml="当前值："+lastValue+" "+unit;
	var timeHtml='';
	if(!kpi.ignoreInConfig&&list.length>0&&!userFlag){
		timeHtml='<span class="compareTimeValueBtn" targetName="'+target+'" style="text-decoration:underline;">时间</span>：'
			+list[0].time.substring(5, 16)
			+'~'
			+list[list.length-1].time.substring(5, 16);
	}else{
		timeHtml='<span class="compareTimeValueBtn">时间</span>：'+lastTime;
	}
	$("#compareTimeValue").html(valueHtml+"<br/>"+timeHtml);
	if(!kpi.ignoreInConfig){
		$(".compareTimeValueBtn").on('click',this.showCompareTimeChooser.bind(this));
	}
	this.compareChart.reinitEChart();
	this.compareChart.updateData(option,true);
//	$("#compareChart canvas:last").hide();
};

SceneBase.ScreenController.prototype.showCompareTimeChooser = function(evt)
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
					var queryConfig={
						startTime:startTimeStr,
						endTime:endTimeStr,
						targetName:$(".compareTimeValueBtn").attr("targetName")
					};
					this.loadCompareChartDataByTimeRange(queryConfig);
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

/**
 * @param queryConfig
 * {
 * 	source:LSMConsts.kpiSourceStream|LSMConsts.kpiSourceWs
 *  targetType:"hotspot"|"cell",
 *  targetName:"xxxx",
 *  kpiId:"xxx"
 * }
 */
SceneBase.ScreenController.prototype.loadCustomCompareChartData = function(queryConfig)
{
	
	
	var source=queryConfig.source;
	var targetName=queryConfig.targetName;
	var targetType=queryConfig.targetType;
	var targetCnName=queryConfig.targetCnName;
	var kpiId=queryConfig.kpiId;
	if(kpiId=="hwl"){
		kpiId="2ghwl,3ghwl";
	}
//	LSMConsts.kpiTypeNet
	var kpiConfig=null;
	var arr=LSMConsts.kpis;
	for(var i=0;i<arr.length;i++){
		var record=arr[i];
		if(record.kpiFullName==kpiId&&record.source==source){
			kpiConfig=record;
		}
	}
	if(kpiConfig!=null){
		var dm=LSMScreen.DataManager.getInstance();
		if(source==LSMConsts.kpiSourceStream){
			if(targetType=="hotspot"){
				dm.getHotSpotsKpisCompared(targetName, null, null, null, null,this.getTimeType(),
						function(result){
					this.refreshCompareChart(kpiConfig, result,null,targetCnName);
				}.bind(this));
			}else if(targetType=="cell"){
				dm.getCellKpisCompared({site:targetName,timeType:this.getTimeType()},
						function(result){
					this.refreshCompareChart(kpiConfig, result,null,targetCnName);
				}.bind(this));
			}
		}else if(source==LSMConsts.kpiSourceWs){
			if(targetType=="hotspot"){
				var _params = 
				{
				    hotspot:targetName,    
				    timeRange:"true",
				    group:"all",            
				    max_threads:"10",
				    all_fields:"time",
				    "domains": "2ghwl,3ghwl,2g,3g,4g,dtb2,dtb4",
				    "tb_domains": "2ghwl,3ghwl,2g,3g,4g",
				    "hb_domains": "2ghwl,3ghwl,2g,3g,4g",
					tb_time_minutes:1440,
					timeType:this.getTimeType(),
				    "all_fields":null,
					hot_fields:null
				};
				
				LSMScreen.DataManager.prototype.getHotSpotTrafficFlow(_params, 
						function(result){
					this.refreshCompareChart(kpiConfig, result,null,targetCnName);
				}.bind(this));
			}else if(targetType=="cell"){
				var _params = 
				{
						lac_ci:targetName.replace(":","-"),    
				    timeRange:"true",
				    group:"all",            
				    max_threads:"10",
				    "domains": "2ghwl,3ghwl,2g,3g,4g,dtb2,dtb4",
				    "tb_domains": "2ghwl,3ghwl,2g,3g,4g",
				    "hb_domains": "2ghwl,3ghwl,2g,3g,4g",
					tb_time_minutes:1440,
					timeType:this.getTimeType(),
				    "all_fields":null,
					hot_fields:null
				};
				LSMScreen.DataManager.prototype.getHotSpotTrafficFlow(_params, 
						function(result){
					this.refreshCompareChart(kpiConfig, result,null,targetCnName);
				}.bind(this));
			}
		}
	}
};

SceneBase.ScreenController.prototype.loadCompareChartDataByTimeRange = function(queryConfig)
{
	
	var targetName=queryConfig.targetName;//LSMConsts.hotspots[0];
//	var targetType='hotspot';
	var startTime=queryConfig.startTime;
	var endTime=queryConfig.endTime;
	var startDate=new Date(startTime.replace(/-/g,"/"));
	var endDate=new Date(endTime.replace(/-/g,"/"));
	var compareLag=24*60*60*1000;
	var compareStart=(new Date(startDate.getTime()-compareLag)).Format("yyyy-MM-dd hh:mm:ss");
	var compareEnd=(new Date(endDate.getTime()-compareLag)).Format("yyyy-MM-dd hh:mm:ss");
	var kpiConfig=this.selectedKpi;
	var source=kpiConfig.source;
	if(kpiConfig!=null){
		this.chartLoadMask.show();
		var dm=LSMScreen.DataManager.getInstance();
		if(source==LSMConsts.kpiSourceStream){
			
			var timeType=this.getTimeType();
			if(timeType=='hour'){
				dm.getAllStreamTrendHour({timeBegin:startTime,timeEnd:endTime,timeType:this.getTimeType()},function(allResult){
					dm.getHotSpotsKpisCompared(targetName, startTime, endTime, compareStart, compareEnd,this.getTimeType(),
							function(result){
						this.chartLoadMask.hide();
						this.refreshCompareChart(kpiConfig, result,allResult);
					}.bind(this));
					
				}.bind(this));
			}else{
				dm.getAllStreamTrendRealTime({timeBegin:startTime,timeEnd:endTime,timeType:this.getTimeType()},function(allResult){
					dm.getHotSpotsKpisCompared(targetName, startTime, endTime, compareStart, compareEnd,this.getTimeType(),
							function(result){
						this.chartLoadMask.hide();
						this.refreshCompareChart(kpiConfig, result,allResult);
					}.bind(this));
					
				}.bind(this));
			}
			
		}else if(source==LSMConsts.kpiSourceWs){
			
			var _paramsAll = 
			{
			    timeRange:"true",
			    group:"all",            
			    max_threads:"10",
			    "domains": "2ghwl,3ghwl,2g,3g,4g,dtb2,dtb4",
			    "tb_domains": "2ghwl,3ghwl,2g,3g,4g",
			    "hb_domains": "2ghwl,3ghwl,2g,3g,4g",
				tb_time_minutes:1440,
				startTime:startTime,
			    endTime:endTime,
				timeType:this.getTimeType(),
				all_fields:null,
				hot_fields:null
			};
			
			dm.getHotSpotTrafficFlow(_paramsAll, 
					function(allResult){
				var _params = 
				{
				    hotspot:targetName,    
				    timeRange:"true",
				    group:"all",            
				    max_threads:"10",
				    all_fields:"time",
				    startTime:startTime,
				    endTime:endTime,
				    "domains": "2ghwl,3ghwl,2g,3g,4g,dtb2,dtb4",
				    "tb_domains": "2ghwl,3ghwl,2g,3g,4g",
				    "hb_domains": "2ghwl,3ghwl,2g,3g,4g",
					tb_time_minutes:1440,
					timeType:this.getTimeType(),
				    "all_fields":null,
					hot_fields:null
				};
				
				dm.getHotSpotTrafficFlow(_params, 
						function(result){
					this.chartLoadMask.hide();
					this.refreshCompareChart(kpiConfig, result,allResult);
				}.bind(this));
				
			}.bind(this));
			
			
		}
	}
};



SceneBase.ScreenController.prototype.refreshCustomerChart = function()
{
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
	
	var _selectedKpiName = "总用户数";
	var dataSource=this.dayStreamTrendDataRoll;
	var ignoreLag=10*60*1000;
	var currentDate=new Date();
	if(dataSource!=null&&dataSource.length>0){
		for (var i = 0; i < dataSource.length; ++i)
		{
			var _data = dataSource[i];
			
			var pointDate=new Date(_data.time.replace(/-/g,"/"));
			lag=currentDate-pointDate;
			if(lag>ignoreLag){
				option.xAxis[0].data.push(_data.time.substring(11, 16));
				option.series[0].data.push(_data[_selectedKpiName]);
			}
		}
		
		this.customerCompareChart.updateData(option);
	}
};

SceneBase.ScreenController.prototype.refreshTrafficFlowChart = function()
{
	var hwl2gKey="2ghwlDist";
	var hwl3gKey="3ghwlDist";
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
		
		this.trafficFlowCompareChart.updateData(option);
	}
	
};


SceneBase.ScreenController.prototype.refreshFlowChart = function()
{
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
	
	var _selectedKpiName = "总流量";
	if(this.dayStreamTrendData.length>0){
		for (var i = 0; i < this.dayStreamTrendData.length; ++i)
		{
			var _data = this.dayStreamTrendData[i];
			
			option.xAxis[0].data.push(_data.time.substring(11, 16));
			option.series[0].data.push(_data[_selectedKpiName]);
		}
		
		this.flowCompareChart.updateData(option);
	}
};


SceneBase.ScreenController.prototype.setKpiValue = function(value)
{
	$("#kpiValueLabel").text(value);
};

SceneBase.ScreenController.prototype.setRegionArea = function(area)
{
	SUtils.updeteBaseHotspotsByName(area,function(){
		this.regionDetail.updateUpSpot(area);
		this.loadData(true);
	}.bind(this));
	
//	this.regionDetail.updateUpSpot(area);//regionDetail里面有回调方法更新上部指标数据
};

SceneBase.ScreenController.prototype.setSubArea = function(area,parentHot)
{
	if(area=="子热点"){
		this.regionDetail.drillSubHotspots(parentHot);
	}else if(area=="小区"){
		this.regionDetail.drillSubCells(parentHot);
	}
	
};

SceneBase.ScreenController.prototype.setTitle = function(title)
{
	$(".subtitleSpan").text("--"+title);
};

SceneBase.CompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

SceneBase.CompareChart.prototype=Object.create(LSMScreen.DataChartBase.prototype);
SceneBase.CompareChart.prototype.constructor=SceneBase.CompareChart;

SceneBase.CustomerCompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

SceneBase.CustomerCompareChart.prototype=Object.create(LSMScreen.DataChartBase.prototype);
SceneBase.CustomerCompareChart.prototype.constructor=SceneBase.CustomerCompareChart;

SceneBase.TrafficFlowCompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

SceneBase.TrafficFlowCompareChart.prototype=Object.create(LSMScreen.DataChartBase.prototype);
SceneBase.TrafficFlowCompareChart.prototype.constructor=SceneBase.TrafficFlowCompareChart;

SceneBase.FlowCompareChart=function ()
{
	this.initialize.apply(this, arguments);
};

SceneBase.FlowCompareChart.prototype=Object.create(LSMScreen.DataChartBase.prototype);
SceneBase.FlowCompareChart.prototype.constructor=SceneBase.FlowCompareChart;


/////////////////////////////////////

/**
 * 区域详情
 */
SceneBase.RegionDetail=function (dom,hotspot,_spotChangeCallBack,_zoomCallBack)
{
	this.spotChangeCallBack=_spotChangeCallBack;
	this.zoomCallBack=_zoomCallBack;
	this.hotspot=hotspot;
	this.initialize.apply(this, [dom]);
	this.createComponent();
};
SceneBase.RegionDetail.prototype=Object.create(LSMScreen.ComponentBase.prototype);
SceneBase.RegionDetail.prototype.constructor=SceneBase.RegionDetail;

//区域热点
SceneBase.RegionDetail.prototype.kpiConfigMap={};
//区域热点
SceneBase.RegionDetail.prototype.hotspot="";
//双击表格选中的热点
SceneBase.RegionDetail.prototype.selectedHotspot="";
//双击大标题放大的回调方法
SceneBase.RegionDetail.prototype.spotChangeCallBack;
//双击表格钻取指标趋势图的回调方法
SceneBase.RegionDetail.prototype.drillCompareCallBack;
//放大按钮的回调方法
SceneBase.RegionDetail.prototype.zoomCallBack;

//钻取子热点还是小区
SceneBase.RegionDetail.prototype.drillType="";
SceneBase.RegionDetail.prototype.useLargerRow=false;
SceneBase.RegionDetail.prototype.showAllTable=false;

SceneBase.RegionDetail.prototype.DRILL_CELL="CELL";
SceneBase.RegionDetail.prototype.DRILL_SUBHOTSPOT="SUBHOTSPOT";

//热点缓存数据
SceneBase.RegionDetail.prototype.streamData={};
SceneBase.RegionDetail.prototype.wsData={};
//小区缓存数据
SceneBase.RegionDetail.prototype.cellList=[];
SceneBase.RegionDetail.prototype.streamCellData={};
SceneBase.RegionDetail.prototype.wsCellData={};
SceneBase.RegionDetail.prototype.cellCntMap={};
SceneBase.RegionDetail.prototype.subHotspots=[];

//表格节点 网管
SceneBase.RegionDetail.prototype.tableDom;
//表格节点 信令
SceneBase.RegionDetail.prototype.tableDom2;

//jqgrid的jquery对象 网管
SceneBase.RegionDetail.prototype.grid;
//jqgrid的jquery对象 信令
SceneBase.RegionDetail.prototype.grid2;

SceneBase.RegionDetail.prototype.gridHeight=165;
SceneBase.RegionDetail.prototype.gridWidth=880;
SceneBase.RegionDetail.prototype.pageSize=50;
SceneBase.RegionDetail.baseKpiColWidth=200;


SceneBase.RegionDetail.currentGridData=[];

SceneBase.RegionDetail.currentAllCol1=[];
SceneBase.RegionDetail.currentAllCol2=[];
SceneBase.RegionDetail.currentShowCol1=[];
SceneBase.RegionDetail.currentShowCol2=[];

SceneBase.RegionDetail.currentAllCol1Origin=[];
SceneBase.RegionDetail.currentAllCol2Origin=[];

/** 
 * 创建组件内容
 * @public
 * @function 
 */
SceneBase.RegionDetail.prototype.createComponent=function (){
	$(".cellTypeRadio").on('click',this.cellTypeChange.bind(this));
	$(".cellThresholdRadio").on('click',this.thresholdTypeChange.bind(this));
	$(".regionDetailReturn").on('click',this.returnUpSpot.bind(this));
	$(".regionDetailZoom").on('click',this.zoomCallBack);
	$(".regionDetailColConfig").on('click',this.showColConfig.bind(this));
	
	this.updateGridCol();
	
};

SceneBase.RegionDetail.prototype.cellTypeChange=function(evt){
	var type=$(evt.currentTarget).attr("name");
	$(".cellTypeRadio").removeClass("customRadioSelected");
	if(type=="4g"){
		$(".cellTypeRadio:eq(0)").addClass("customRadioSelected");
	}else if(type=="3g"){
		$(".cellTypeRadio:eq(1)").addClass("customRadioSelected");
	}else if(type=="2g"){
		$(".cellTypeRadio:eq(2)").addClass("customRadioSelected");
	}
	this.update(true);
};
SceneBase.RegionDetail.prototype.thresholdTypeChange=function(evt){
	var type=$(evt.currentTarget).attr("name");
	$(".cellThresholdRadio").removeClass("customRadioSelected");
	if(type=="全部"){
		$(".cellThresholdRadio:eq(0)").addClass("customRadioSelected");
	}else if(type=="劣化"){
		$(".cellThresholdRadio:eq(1)").addClass("customRadioSelected");
	}
	this.loadCacheData();
};
SceneBase.RegionDetail.prototype.switchTable=function(type){
	if(!this.showAllTable){
		if(type==LSMConsts.kpiTypeSig){
			$(this.contentDom).children("div:eq(1)").css("display","none");
			$(this.contentDom).children("div:eq(0)").css("display","block");
		}else if(type==LSMConsts.kpiTypeNet){
			$(this.contentDom).children("div:eq(0)").css("display","none");
			$(this.contentDom).children("div:eq(1)").css("display","block");
		}
	}
	this.kpiType=type;
};

SceneBase.RegionDetail.prototype.updateUpSpot=function(_hotspot){
	this.hotspot=_hotspot;
	this.returnUpSpot();
};
SceneBase.RegionDetail.prototype.returnUpSpot=function(){
	$(".regionDetailCtrl").css("display","none");
	$("#cellThresholdCtrl").css("display","none");
	$(".regionDetailReturn").css("display","none");
	this.drillType="";
	this.selectedHotspot="";
	if(this.spotChangeCallBack!=null){
		this.spotChangeCallBack(this.hotspot);
	}
	this.update(true);
};

SceneBase.RegionDetail.prototype.getColList=function(){
	return this.currentShowCol1;
};
SceneBase.RegionDetail.prototype.getColList2=function(){
	return this.currentShowCol2;
};

SceneBase.RegionDetail.prototype.fillCols=function(source,originCopy){
	
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
			width : SceneBase.RegionDetail.baseKpiColWidth,
			unit: record.unit,
			sortable:true
		});
	}
	return result;
};
SceneBase.RegionDetail.prototype.getColConfigId=function(withShowTag){
	var isHot=this.isHotspot();
	var cellType=this.getCellType();
	var showTag="";//_show
	if(withShowTag){
		showTag="_show";
	}
	
	if(!isHot){
		switch(cellType){
			case "4g":
				if(this.kpiType==LSMConsts.kpiTypeSig){
					return LSMConsts.cell4gSigId+showTag;
				}else if(this.kpiType==LSMConsts.kpiTypeNet){
					return LSMConsts.cell4gNetId+showTag;
				}
				break;
			case "3g":
				if(this.kpiType==LSMConsts.kpiTypeSig){
					return LSMConsts.cell3gSigId+showTag;
				}else if(this.kpiType==LSMConsts.kpiTypeNet){
					return LSMConsts.cell3gNetId+showTag;
				}
				break;
			case "2g":
				if(this.kpiType==LSMConsts.kpiTypeSig){
					return LSMConsts.cell2gSigId+showTag;
				}else if(this.kpiType==LSMConsts.kpiTypeNet){
					return LSMConsts.cell2gNetId+showTag;
				}
				break;
		}
	}else{
		if(this.kpiType==LSMConsts.kpiTypeSig){
			return LSMConsts.hotspotSigId+showTag;
		}else if(this.kpiType==LSMConsts.kpiTypeNet){
			return LSMConsts.hotspotNetId+showTag;
		}
	}
};

SceneBase.RegionDetail.prototype.queryColConfig=function(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getConfigData({type:"column"},function(configResult){
		var isHot=this.isHotspot();
		var cellType=this.getCellType();
		var showTag="_show";//_show
		if(!isHot){
			switch(cellType){
				case "4g":
					this.currentAllCol1=this.fillCols(JSON.parse(configResult[LSMConsts.cell4gSigId].content),1);
					this.currentAllCol2=this.fillCols(JSON.parse(configResult[LSMConsts.cell4gNetId].content),2);
				
					this.currentShowCol1=this.fillCols(JSON.parse(configResult[LSMConsts.cell4gSigId+showTag].content));
					this.currentShowCol2=this.fillCols(JSON.parse(configResult[LSMConsts.cell4gNetId+showTag].content));
					break;
				case "3g":
					this.currentAllCol1=this.fillCols(JSON.parse(configResult[LSMConsts.cell3gSigId].content),1);
					this.currentAllCol2=this.fillCols(JSON.parse(configResult[LSMConsts.cell3gNetId].content),2);
					
					this.currentShowCol1=this.fillCols(JSON.parse(configResult[LSMConsts.cell3gSigId+showTag].content));
					this.currentShowCol2=this.fillCols(JSON.parse(configResult[LSMConsts.cell3gNetId+showTag].content));
					break;
				case "2g":
					this.currentAllCol1=this.fillCols(JSON.parse(configResult[LSMConsts.cell2gSigId].content),1);
					this.currentAllCol2=this.fillCols(JSON.parse(configResult[LSMConsts.cell2gNetId].content),2);
					
					this.currentShowCol1=this.fillCols(JSON.parse(configResult[LSMConsts.cell2gSigId+showTag].content));
					this.currentShowCol2=this.fillCols(JSON.parse(configResult[LSMConsts.cell2gNetId+showTag].content));
					break;
			}
		}else{
			this.currentAllCol1=this.fillCols(JSON.parse(configResult[LSMConsts.hotspotSigId].content),1);
			this.currentAllCol2=this.fillCols(JSON.parse(configResult[LSMConsts.hotspotNetId].content),2);
			
			this.currentShowCol1=this.fillCols(JSON.parse(configResult[LSMConsts.hotspotSigId+showTag].content));
			this.currentShowCol2=this.fillCols(JSON.parse(configResult[LSMConsts.hotspotNetId+showTag].content));
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
		this.kpiConfigMap=map;
		this.updateShowCol();
	}.bind(this));
	
};

SceneBase.RegionDetail.prototype.updateGridCol=function(){
	this.queryColConfig();
};
SceneBase.RegionDetail.prototype.updateShowCol=function(){
	var cols=this.getColList();
	var cols_2=this.getColList2();
	
	var colNames=[];
	var colNames2=[];
	var width1=0;
	var width2=0;
	for(var i=0;i<cols.length;i++){
		colNames.push(cols[i].colName);
		width1+=cols[i].width;
	}
	
	for(var i=0;i<cols_2.length;i++){
		colNames2.push(cols_2[i].colName);
		width2+=cols_2[i].width;
	}
	
	if(this.grid!=null){
		$(this.contentDom).empty();
	}
	var dom=this.contentDom;
	
	this.tableDom=document.createElement("table");
	this.tableDom2=document.createElement("table");
	
	$(this.tableDom).attr("id",Math.uuid());
	$(this.tableDom2).attr("id",Math.uuid());
	
	dom.appendChild(this.tableDom);
	dom.appendChild(this.tableDom2);
	
	this.pager=document.createElement("div");
	this.pager2=document.createElement("div");
	
	$(this.pager).attr("id","gridPager");
	$(this.pager2).attr("id","gridPager2");
	
	dom.appendChild(this.pager);
	dom.appendChild(this.pager2);
	
	var gridHeight=this.gridHeight;
	var opt1={
	        datatype : function(){},
	        colNames:colNames,
	        colModel : cols,
	        loadui:'disable',
	        afterInsertRow:this.afterInsertRow.bind(this),
	        height:gridHeight,
	        onSortCol:function(index, colindex, sortorder){
	        	if(colindex>0){
	        		if(sortorder=="desc"){
		        		this.currentGridData.sort(function(a,b){return b[index]-a[index];});//按value 降序
		        	}else{
		        		this.currentGridData.sort(function(a,b){return a[index]-b[index];});//按value 降序
		        	}
		        	this.loadCacheData();
	        	}
	        }.bind(this),
            pager: "#gridPager",
	        rowNum:this.pageSize,
	        autowidth:true,
	        shrinkToFit:false,
	        autoScroll: false,
	        jsonReader: {
                repeatitems: false,
                rows: "rows",              
                total: "total",
                page: "page",
                records: "records"
            },
            onPaging:this.pagingData.bind(this),
            pgtext : "第 {0}页，共{1}页，每页50条"  
		};
	var opt2={
	        datatype : function(){},
	        colNames:colNames2,
	        colModel : cols_2,
	        loadui:'disable',
	        afterInsertRow:this.afterInsertRow2.bind(this),
	        height:gridHeight,
	        onSortCol:function(index, colindex, sortorder){
	        	if(colindex>0){
	        		if(sortorder=="desc"){
		        		this.currentGridData.sort(function(a,b){return b[index]-a[index];});//按value 降序
		        	}else{
		        		this.currentGridData.sort(function(a,b){return a[index]-b[index];});//按value 降序
		        	}
		        	this.loadCacheData();
	        	}
	        }.bind(this),
            pager: "#gridPager2",
	        rowNum:this.pageSize,
	        autowidth:true,
	        shrinkToFit:false,
	        autoScroll: false,
	        jsonReader: {
                repeatitems: false,
                rows: "rows",              
                total: "total",
                page: "page",
                records: "records"
            },
            onPaging:this.pagingData.bind(this),
	        pgtext : "第 {0}页，共{1}页，每页50条"  
		};
	if(this.showAllTable){
		opt1.height=opt2.height=$(this.contentDom).height()/2;
	}
	
	
	
	
	var table=this.tableDom;
	var table2=this.tableDom2;
	
	
	
	if(width1<$(this.contentDom).width()){
		opt1.width=$(this.contentDom).width();
	}
	if(width2<$(this.contentDom).width()){
		opt2.width=$(this.contentDom).width();
	}
	
	this.grid=$(table).jqGrid(opt1);
	
	this.grid2=$(table2).jqGrid(opt2);
	
	this.switchTable(this.kpiType);
};
SceneBase.RegionDetail.prototype.pagingData=function(btn){
	var pagerId="gridPager";
	var page=this.grid.jqGrid('getGridParam','page');
	var inputPage=$("#gridPager").find(".ui-pg-input").val();
	var nextPage=inputPage;
	switch(btn){
		case "user":
			nextPage=inputPage;
			break;
		case "next_"+pagerId:
			nextPage=page+1;
			break;
		case "prev_"+pagerId:
			nextPage=page-1;
			break;
		case "first_"+pagerId:
			nextPage=1;
			break;
		case "last_"+pagerId:
			nextPage=Number.POSITIVE_INFINITY;
			break;
	}
	this.loadCacheData(nextPage);
};
SceneBase.RegionDetail.prototype.getSelectedRowData=function(){
	var gridJQ=this.grid;
	if(this.kpiType==LSMConsts.kpiTypeSig){
		gridJQ=this.grid;
	}else if(this.kpiType==LSMConsts.kpiTypeNet){
		gridJQ=this.grid2;
	}
	var rowId=gridJQ.jqGrid('getGridParam','selrow');
	var rowData = gridJQ.jqGrid('getRowData',rowId);
	return rowData;
};
SceneBase.RegionDetail.prototype.isHotspot=function(){
	var ctrlDisplay=$(".regionDetailCtrl").css("display");
	return ctrlDisplay=="none";
};
SceneBase.RegionDetail.prototype.getCellType=function(){
//	return $(".cellTypeInput:checked").val();
	var cellType=$(".cellTypeCtrl .customRadioSelected").attr("name");
	return cellType;
};
SceneBase.RegionDetail.prototype.getThresholdType=function(){
//	return $(".cellTypeInput:checked").val();
	var thresholdType=$(".cellThresholdCtrl .customRadioSelected").attr("name");
	return thresholdType;
};
SceneBase.RegionDetail.prototype.getShowType=function(){
	return $(".showTypeInput:checked").val();
};
SceneBase.RegionDetail.prototype.afterInsertRow=function(rowid,rowdata){
	var grid=this.grid;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	var targetName=$(tds[0]).text();
	var cols=this.getColList();
	rowdata=this.processRecordData(rowdata, !this.isHotspot(),true);
	var maxlv=rowdata["maxAlarm"];
	if(maxlv!=null){
		$(tds[0]).addClass("alarmLv"+maxlv+"Txt");
	}
	for(var i=0;i<tds.length;i++){
		var tdJQ=$(tds[i]);
		var kpiId=cols[i].index;
		var lv=rowdata[kpiId+"_alarmLv"];
		if(lv!=null){
			tdJQ.addClass("alarmLv"+lv+"Txt");
		} 
		tdJQ.attr("targetName",targetName);
		tdJQ.attr("colIndex",i);
		tdJQ.attr("rowIndex",rowid);
		tdJQ.attr("grid","grid");
	}
	this.bindMenu(tr);
};
SceneBase.RegionDetail.prototype.afterInsertRow2=function(rowid,rowdata){
	
	var grid=this.grid2;
	var tr=grid.find("tbody").find("tr")[rowid];
	var tds=$(tr).find("td");
	var targetName=$(tds[0]).text();
	var cols=this.getColList2();
	rowdata=this.processRecordData(rowdata, !this.isHotspot(),true);
	var maxlv=rowdata["maxAlarm"];
	if(maxlv!=null){
		$(tds[0]).addClass("alarmLv"+maxlv+"Txt");
	}
	for(var i=0;i<tds.length;i++){
		var tdJQ=$(tds[i]);
		var kpiId=cols[i].index;
		var lv=rowdata[kpiId+"_alarmLv"];
		
		if(lv!=null){
			tdJQ.addClass("alarmLv"+lv+"Txt");
		}
		tdJQ.attr("targetName",targetName);
		tdJQ.attr("colIndex",i);
		tdJQ.attr("rowIndex",rowid);
		tdJQ.attr("grid","grid2");
	}
	this.bindMenu(tr);
	
};

SceneBase.RegionDetail.prototype.bindMenu=function(tr){
	var isHot=this.isHotspot();
	var menuId="#context-menu";
	if(isHot){
		menuId="#context-menu";
	}else{
		menuId="#context-menu-hotcell";
	}
	$(tr).find("td").contextmenu({
		  target:menuId, 
		  before:this.beforeMenu.bind(this),
		  onItem: this.menuHandler.bind(this)
	});
};
SceneBase.RegionDetail.prototype.beforeMenu=function(e,context){
};
SceneBase.RegionDetail.prototype.menuHandler=function(context,e){
	var lb=$(e.currentTarget).text();
	var td=context[0];
	switch(lb){
		case "子热点":
			this.drillSubHotspots($(td).attr("targetName"));
			break;
		case "小区":
			this.drillSubCells($(td).attr("targetName"));
			break;
		case "查看所有指标":
			this.showRecordAllKpis($(td).attr("targetName"),$(td).attr("rowIndex"));
			break;
		case "查看趋势图":
			this.drillCompareChart(td);
			break;
		case "定位小区":
			this.locateCell($(td).attr("targetName"));
			break;
	}
	$(e.currentTarget).parent().parent().hide();//.removeClass("open");
};
SceneBase.RegionDetail.prototype.showRecordAllKpis=function(targetName,rowId){
	var rowData = this.grid.jqGrid('getRowData',rowId);
	var rowData2 = this.grid2.jqGrid('getRowData',rowId);
	var cols1=this.getColList();
	var cols2=this.getColList2();
	rowData=$.extend(rowData,rowData2);
	
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=1280;
	var winHeight=Math.ceil((cols1.length+cols2.length)/7)*125;
	var win=new LSMScreen.SimpleWindow({
		title:targetName+" 指标详情",
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){
		}.bind(this)
	});
	var i=0;
	var kpiHtmls="";
	var kpiMap={};
	var record;
//	{colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 300},
	for(i=0;i<cols1.length;i++){
		record=cols1[i];
		if(record.unit!=null){
			kpiMap[record.index]==true;
			kpiHtmls+=this.getKpiDivTemplate(record.colName,rowData[record.index],record.unit,record.index);
		}
	}
	for(i=0;i<cols2.length;i++){
		record=cols2[i];
		if(record.unit!=null){
			if(!kpiMap[record.index]){
				kpiHtmls+=this.getKpiDivTemplate(record.colName,rowData[record.index],record.unit,record.index);
			}
		}
	}
	var contentHtml='<div class="KPT_marginB">'+kpiHtmls+'</div>';
	$(win.content).html(contentHtml);
};

SceneBase.RegionDetail.prototype.getKpiDivTemplate=function(kpiName,value,unit,kpiId){
	if(isNaN(value)||value==""){
		return "";
	}
	var addClass="KPI_blue";
	if(!this.isHotspot()){
		var lv=SUtils.getAlarmLevelByThresholdMapConverted(kpiId,value,LSMConsts.cellThresholdsMap);
		if(lv==0){
			addClass="KPI_blue";
		}else if(lv==1){
			addClass="alarmLv1";
		}else if(lv==2){
			addClass="alarmLv2";
		}else if(lv==3){
			addClass="alarmLv3";
		}
	}
	var divStr='<div class="indicators KPI KPT_marginR" >'
		+'<div class=""></div>'
		+'<div class="KPI_top">'
		+'<h2 class="KPI_bluetxt">' + value + '</h2><div class="KPIUnit">' + unit +'</div>'
		+'</div>'
		+'<div class="KPI_down '+addClass+'">'+kpiName+'</div>'
		+'</div>';
	return divStr;
};
SceneBase.RegionDetail.prototype.drillCompareChart=function(td){
	var tdJQ=$(td);
	var gridIndicator=tdJQ.attr("grid");
	var colIndex=tdJQ.attr("colIndex");
	var targetName=tdJQ.attr("targetName");
	var targetCnName=targetName;
	var source="";
	var targetType="";
	var kpiId="";
	var isHot=this.isHotspot();
	var cols=[];
	var kpiInfo={};
	if(gridIndicator=="grid"){
		source=LSMConsts.kpiSourceStream;
		cols=this.getColList();
	}else if(gridIndicator=="grid2"){
		source=LSMConsts.kpiSourceWs;
		cols=this.getColList2();
	}
	kpiInfo=cols[colIndex];
	kpiId=kpiInfo.index;
	if(isHot){
		targetType="hotspot";
	}else{
		targetType="cell";
		var cell=this.findCellInfo(targetName);
		if(cell!=null){
			var lac=cell.lac;
			var ci=cell.ci;
			targetName=lac+":"+ci;
		}
	}
	
	if(this.drillCompareCallBack){
		/**
		 * @param queryConfig
		 * {
		 * 	source:LSMConsts.kpiSourceStream|LSMConsts.kpiSourceWs
		 *  targetType:"hotspot"|"cell",
		 *  targetName:"xxxx",
		 *  kpiId:"xxx"
		 * }
		 */
		var queryConfig={
				source:source,
				targetType:targetType,
				targetName:targetName,
				targetCnName:targetCnName,
				kpiId:kpiId
				
				
		};
		this.drillCompareCallBack(queryConfig);
	}
	
	
	
//	var hotspot=$(td).text();
//	this.drillSubCells(hotspot);
};
SceneBase.RegionDetail.prototype.findCellInfo=function(cellName){
	var cells=this.cellList;
	for(var i=0;i<cells.length;i++){
		var cell=cells[i];
		var cell_name=cell.cell_name;
		if(cell_name==cellName){
			return cell;
		}
	}
	return null;
};
SceneBase.RegionDetail.prototype.drillSubHotspots=function(hotspot){
	this.drillType=this.DRILL_SUBHOTSPOT;
	this.selectedHotspot=hotspot;
	$(".regionDetailReturn").css("display","inline-block");
	if(this.spotChangeCallBack!=null){
		this.spotChangeCallBack(hotspot);
	}
	this.update(true);
	
};

SceneBase.RegionDetail.prototype.drillSubCells=function(hotspot){
	this.drillType=this.DRILL_CELL;
	this.selectedHotspot=hotspot;
	$(".regionDetailCtrl").css("display","inline-block");
	$("#cellThresholdCtrl").css("display","inline-block");
	$(".regionDetailReturn").css("display","inline-block");
	if(this.spotChangeCallBack!=null){
		this.spotChangeCallBack(hotspot);
	}
	this.update(true);
};
SceneBase.RegionDetail.prototype.locateCell=function(cellName){
	try{
		var cell=this.findCellInfo(cellName);
		if(cell!=null){
			window.parent.screen2_locateCell(cell.lat,cell.lon,cell.lac+":"+cell.ci,cellName,LSMConsts.hotspots[0],cell.cell_nt,cell.cell_type);
		}else{
			console.log("未找到相应的小区信息");
		}
	}catch(e){
		console.log("disney1 window.parent.screen2_changeLocate failed:"+e.message);
	}
};

SceneBase.RegionDetail.prototype.update=function (showLoadMask){
	if(showLoadMask){
//		this.showLoading();
	}
	this.clearGrid();
	this.updateGridCol();
	
	var dm=LSMScreen.DataManager.getInstance();
	if(this.drillType==this.DRILL_CELL){
		dm.getCellsByHotspot({hotspot:this.selectedHotspot},this.cellInfoHandler.bind(this),this.failHandler.bind(this));
	}else if(this.drillType==this.DRILL_SUBHOTSPOT){
		dm.getSubHotspots({hotspot:this.selectedHotspot},this.subHotspotDataHandler.bind(this),this.failHandler.bind(this));
	}else{
		dm.getSubHotspots({hotspot:LSMConsts.hotspots[0]},this.subHotspotDataHandler.bind(this),this.failHandler.bind(this));
	}
	
};
SceneBase.RegionDetail.prototype.subHotspotDataHandler=function (data){
	var hotspots=[];
	for(var i=0;i<data.length;i++){
		hotspots.push(data[i].hot_name);
		this.cellCntMap[data[i].hot_name]=data[i].cell_cnt;
	}
	this.subHotspots=hotspots; 
	var dm=LSMScreen.DataManager.getInstance();
	dm.getHotSpotsKpis(hotspots,null,null,this.streamDataHandler.bind(this),this.failHandler.bind(this));
};

SceneBase.RegionDetail.prototype.cellInfoHandler=function (data){
	this.cellList=data;
	var dm=LSMScreen.DataManager.getInstance();
	var cellType=this.getCellType();
	var laccis=[];
	var cells=this.cellList;
	
	for(var i=0;i<cells.length;i++){
		var cell=cells[i];
		var cellNt=cell.cell_nt;
		if(cellNt!=null&&cellNt.toUpperCase()==cellType.toUpperCase()){
			var lac=cell.lac;
			var ci=cell.ci;
			laccis.push(lac+":"+ci);
		}
	}
	dm.getCellsStreamKpiByCells({laccis:laccis},this.streamCellDataHandler.bind(this),this.failHandler.bind(this));
};

SceneBase.RegionDetail.prototype.streamCellDataHandler=function (data){
	this.streamCellData=data;
	
	var dm=LSMScreen.DataManager.getInstance();
	var cellType=this.getCellType();
	var param={
		    "hotspot": this.hotspot,    
		    "group": "cell",           
		    "max_threads": "10",
		    "cell_fields": "cell_name",
		    "domains": cellType+"hwl,"+cellType+",dtb2,dtb4",
		    "all_fields":null,
			hot_fields:null
		};
	dm.getHotSpotTrafficFlow(param,this.wsCellDataHandler.bind(this),this.failHandler.bind(this));

};

SceneBase.RegionDetail.prototype.wsCellDataHandler=function (data){
	this.wsCellData=data;
	
	var cells=this.cellList;
	var sCellData=this.streamCellData;
	var wCellData=this.wsCellData;
	
	var i=0;
	var key="";
	var lastTime="";
	
	var list=[];
	var cellType=this.getCellType();
	
	var wsMap={};
	for(key in wCellData){
		var wList=wCellData[key];
		for(i=0;i<wList.length;i++){
			var wRecord=wList[i];
			wsMap[wRecord.lac+":"+wRecord.ci]=wRecord;
		}
	}
	
	for(i=0;i<cells.length;i++){
		var cell=cells[i];
		var cellNt=cell.cell_nt;
		if(cellNt!=null&&cellNt.toUpperCase()==cellType.toUpperCase()){
			var lac=cell.lac;
			var ci=cell.ci;
			var lacci=lac+":"+ci;
			var record={};
			record=$.extend(record,cell,sCellData[lacci],wsMap[lacci]);
			record=this.processRecordData(record, true);
			lastTime=record.time;
			list.push(record);
		}
	}
	if(lastTime!=""){
		$("#regionDetailTime").text(lastTime.substring(11, 16));
	}
	list.sort(function(a,b){return b["总用户数"]-a["总用户数"];});//按value 降序
	
	this.currentGridData=list;
	this.loadCacheData();
	
};


SceneBase.RegionDetail.prototype.streamDataHandler=function (data){
	this.streamData=data;
	var dm=LSMScreen.DataManager.getInstance();
	var param={
		    "hotspot": this.hotspot,    
		    "group": "hot",            
		    "max_threads": "15",
		    "hot_fields": "hot_name",
		    "domains": "2ghwl,3ghwl,2g,3g,4g,dtb2,dtb4",
		    "cascade":true
		};
	dm.getHotSpotTrafficFlow(param,this.wsDataHandler.bind(this),this.failHandler.bind(this));
};

SceneBase.RegionDetail.prototype.wsDataHandler=function (data){
	this.wsData=data;
	
	var sData=this.streamData;
	var wData=this.wsData;
	var lastTime="";
	
	this.clearGrid();
	
	var dataMap={};
	var key="";
	var i=0;
	var list=[];
	for(key in sData){
		sData[key].hot_name=key;
		lastTime=sData[key].time;
		dataMap[key]=sData[key];
	}
	for(i=0;i<wData.length;i++){
		key=wData[i].hot_name;
		dataMap[key]=$.extend(dataMap[key],wData[i]);
	}
	i=0;
	for(key in dataMap){
		var record=dataMap[key];
		record=this.processRecordData(record, false);
		record.cell_cnt=this.cellCntMap[record.hot_name];
		list.push(record);
	}
	if(lastTime!=""){
		$("#regionDetailTime").text(lastTime.substring(11, 16));
	}
	
	list.sort(function(a,b){return b["总用户数"]-a["总用户数"];});//按value 降序
	this.currentGridData=list;
	this.loadCacheData();
	
};

SceneBase.RegionDetail.prototype.resetGrid=function (){
	this.updateShowCol();
	this.loadCacheData();
};
SceneBase.RegionDetail.prototype.loadCacheData=function (page){
	if(page==null){
		page=1;
	} 
	var date0=new Date();
	this.clearGrid();
	var date1=new Date();
	console.log("清空用时:"+(date1.getTime()-date0.getTime()));
	var isHot=this.isHotspot();
	var thresholdType=this.getThresholdType();
	var list=this.currentGridData;
	var count=0;
	var gridDataList=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		if(isHot){
			if(record.hot_name==this.selectedHotspot){
				continue;
			}
		}else{
			if(thresholdType=="劣化"&&!record.hasAlarm){
				continue;
			}
		}
		count++;
		gridDataList.push(record);
//		this.grid.jqGrid('addRowData', count, record);
//		this.grid2.jqGrid('addRowData', count, record);
	}
	var total=Math.ceil(gridDataList.length/this.pageSize);
	if(page==Number.POSITIVE_INFINITY){
		page=total;
	}
	var start=(page-1)*this.pageSize;
	var end=Math.min(gridDataList.length,page*this.pageSize);
	var sliceArr=[];
	if(start>=0&&end>=0){
		sliceArr=gridDataList.slice(start, end);
	}
	var data={"total":Math.ceil(gridDataList.length/this.pageSize),"page":page,"records":gridDataList.length+"","rows":sliceArr};
	this.grid[0].addJSONData(data);
	this.grid2[0].addJSONData(data);
	$("#cellCount").text("总数："+count);
	var date2=new Date();
	console.log("插入用时:"+(date2.getTime()-date1.getTime()));
	this.updateRowClass();
//	var date3=new Date();
//	console.log("更新样式用时:"+(date3.getTime()-date2.getTime()));
};
SceneBase.RegionDetail.prototype.updateRowClass=function(){
	var trs=this.grid.find("tr");
	var trsOdd=this.grid.find("tr:odd");
	
	var trs2=this.grid2.find("tr");
	var trsOdd2=this.grid2.find("tr:odd");
	
	trs.removeClass("oddGrayTableRow");
	trsOdd.addClass("oddGrayTableRow");
	trs.find("td:eq(0)").addClass("plainText");
	trs.find("td:gt(0)").addClass("colorText");
	
	trs2.removeClass("oddGrayTableRow");
	trsOdd2.addClass("oddGrayTableRow");
	trs2.find("td:eq(0)").addClass("plainText");
	trs2.find("td:gt(0)").addClass("colorText");
	
	if(this.useLargerRow){
		$(this.contentDom).find("th").addClass("largerRow");
		this.grid.find("tr:gt(0)").find("td").css("height",80);
		this.grid.find("tr:gt(0)").find("td").css("font-size",32);
		
		this.grid2.find("tr:gt(0)").find("td").css("height",80);
		this.grid2.find("tr:gt(0)").find("td").css("font-size",32);
	}
};

//对数据进行处理 换算 格式化等
SceneBase.RegionDetail.prototype.processRecordData=function(record,isCell,noConvert){
	var cols=this.getColList();
	var cols2=this.getColList2();
	var allCol=[];
	var i=0;
	for(i=1;i<cols.length;i++){
		allCol.push(cols[i]);
	}
	for(i=1;i<cols2.length;i++){
		allCol.push(cols2[i]);
	}
	
	for(var j=0;j<allCol.length;j++){
		var col=allCol[j];
		var colKey=col.index;//指标ID
		var config=this.kpiConfigMap[colKey];
		var sum=record[colKey];
		if(config!=null){
			sum=0;
			var hasValue=false;
			var tmp=colKey.split(",");
			for(var i=0;i<tmp.length;i++){
				if(!isNaN(record[tmp[i]])){
					sum+=parseFloat(record[tmp[i]]);
					hasValue=true;
				}
			}
			if(!hasValue||isNaN(sum)){
				sum="";
			}else{
				if(!noConvert){
					sum=(sum*config.rate).toFixed(config.fixed);
				}
			}
			record[colKey]=sum;
		}
		if(isCell){
			if(!isNaN(sum)&&sum!=0){
				var lv=SUtils.getAlarmLevelByThresholdMapConverted(colKey,sum,LSMConsts.cellThresholdsMap);
				if(lv>0){
					record[colKey+"_alarmLv"]=lv;
					record["hasAlarm"]=true;
					if(record["maxAlarm"]==null){
						record["maxAlarm"]=lv;
					}else{
						if(lv<record["maxAlarm"]){
							record["maxAlarm"]=lv;
						}
					}
				}
			}
		}
	}
	return record;
};

/** 
 * 清空jqgrid数据
 * @protected
 * @function 
 * }
 */
SceneBase.RegionDetail.prototype.clearGrid=function(){
	if(this.grid){
		if(this.grid.find("tbody").find("td").contextmenu())
			this.grid.find("tbody").find("td").contextmenu("destroy");
		if(this.grid2.find("tbody").find("td").contextmenu())
			this.grid2.find("tbody").find("td").contextmenu("destroy");
		this.grid.clearGridData();
		this.grid2.clearGridData();
	}
//	SUtils.clearGrid(this.grid);
//	SUtils.clearGrid(this.grid2);
};

SceneBase.RegionDetail.prototype.showColConfig = function(){
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
	
	if(this.kpiType==LSMConsts.kpiTypeSig){
		allCols=this.currentAllCol1;
		selectedCols=this.currentShowCol1;
	}else if(this.kpiType==LSMConsts.kpiTypeNet){
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

			if(this.kpiType==LSMConsts.kpiTypeSig){
				allCols=this.currentAllCol1Origin;
			}else if(this.kpiType==LSMConsts.kpiTypeNet){
				allCols=this.currentAllCol2Origin;
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
			var saveId=this.getColConfigId(true);
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
						this.update(true);
					}.bind(this),
					function(){console.log(saveId+"保存失败");}
			);
		}
		win.closeWin();
	}.bind(this));
	
	
};

////////////////////////////////////

/**
 * 告警列表
 */
SceneBase.AlarmList=function (hotspot)
{
	this.hotspot=hotspot;
	this.createComponent();
};

SceneBase.AlarmList.TYPE_NEALARM="TYPE_NEALARM";
SceneBase.AlarmList.TYPE_PERFORMANCEALARM="TYPE_PERFORMANCEALARM";
SceneBase.AlarmList.TYPE_COMPLAIN="TYPE_COMPLAIN";


//网元告警数据
SceneBase.AlarmList.prototype.kpiType=LSMConsts.kpiTypeSig;
//网元告警数据
SceneBase.AlarmList.prototype.neAlarmList=[];
//性能告警数据
SceneBase.AlarmList.prototype.performanceAlarmList=[];
//投诉数据
SceneBase.AlarmList.prototype.complainList=[];

//jqgrid对象
SceneBase.AlarmList.prototype.grid;
//创建的table的dom对象
SceneBase.AlarmList.prototype.tableDom;
//表格呈现的内容的类型
SceneBase.AlarmList.prototype.tableType=SceneBase.AlarmList.TYPE_NEALARM;
//当前表格大小
//SceneBase.AlarmList.prototype.curSize="small";

SceneBase.AlarmList.prototype.pageSize=50;

SceneBase.AlarmList.prototype.pagerId="";
/** 
 * 创建组件内容
 * @public
 * @function 
 */
SceneBase.AlarmList.prototype.createComponent=function (){
	$(".alarmStatisticNum").on('click',this.switchAlarm.bind(this));
//	this.updateGridCol();
};

SceneBase.AlarmList.prototype.updateGridCol=function(){
	
	var cols=this.getCols();
	var drillFunc=null;
	
	switch(this.tableType){
		case SceneBase.AlarmList.TYPE_NEALARM:
			drillFunc=this.renderNeAlarm.bind(this);
			break;
		case SceneBase.AlarmList.TYPE_PERFORMANCEALARM:
			drillFunc=this.renderPerformanceAlarm.bind(this);
			break;
		case SceneBase.AlarmList.TYPE_COMPLAIN:
			drillFunc=this.renderComplainRegion.bind(this);
			break;
	}
	if(this.grid!=null){
		$(this.contentDom).empty();
	}
	this.tableDom=document.createElement("table");
	this.pager=document.createElement("div");
	
	this.pagerId=Math.uuid();
	$(this.tableDom).attr("id",Math.uuid());
	$(this.pager).attr("id",this.pagerId);
	
	var dom=this.contentDom;
	dom.appendChild(this.tableDom);
	dom.appendChild(this.pager);
	var table=this.tableDom;
	var colNames=[];
	for(var i=0;i<cols.length;i++){
		colNames.push(cols[i].colName);
	}
	var gridHeight=560;
	this.grid=$(table).jqGrid({
        datatype : function(){},
        colNames:colNames,
        colModel : cols,
        loadui:'disable',
        afterInsertRow:drillFunc,
        height:gridHeight,
        width:1000,
        pager: "#"+this.pagerId,
        rowNum:this.pageSize,
        autoWidth:true,
        shrinkToFit:false,
        autoScroll: false,
        jsonReader: {
            repeatitems: false,
            rows: "rows",              
            total: "total",
            page: "page",
            records: "records"
        },
        onPaging:this.pagingData.bind(this),
        pgtext : "第 {0}页，共{1}页，每页50条"  
	});
};
SceneBase.AlarmList.prototype.pagingData = function(btn){
	var pagerId=this.pagerId;
	var page=this.grid.jqGrid('getGridParam','page');
	var inputPage=$("#"+pagerId).find(".ui-pg-input").val();
	var nextPage=inputPage;
	switch(btn){
		case "user":
			nextPage=inputPage;
			break;
		case "next_"+pagerId:
			nextPage=page+1;
			break;
		case "prev_"+pagerId:
			nextPage=page-1;
			break;
		case "first_"+pagerId:
			nextPage=1;
			break;
		case "last_"+pagerId:
			nextPage=Number.POSITIVE_INFINITY;
			break;
	}
	this.updateGridData(nextPage);
};
SceneBase.AlarmList.prototype.showAlarmWin = function(title){
	var winWidth=1000;
	var winHeight=600;
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var win=new LSMScreen.SimpleWindow({
		title:title,
		width:winWidth,
		height:winHeight+130,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){
			this.grid=null;
			this.contentDom=null;
		}.bind(this)
	});
	$(win.content).css("overflow","hidden");
	this.contentDom=win.content;
//	this.curSize="large";
	this.updateGridCol();
	this.updateGridData();
};

SceneBase.AlarmList.prototype.getCols = function(){
	var cols=[];
	switch(this.tableType){
		case SceneBase.AlarmList.TYPE_NEALARM:
			cols=[
			          {colName:'时间',name : 'EVENTTIME',index : 'EVENTTIME',width : 260},
			          {colName:'小区名称',name : 'NENAME',index : 'NENAME',width : 260},
			          {colName:'小区IP',name : 'NEIP',index : 'NEIP',width : 260},
			          {colName:'告警对象名称',name : 'LOCATENENAME',index : 'LOCATENENAME',width : 260},
			          {colName:'定位信息',name : 'LOCATEINFO',index : 'LOCATEINFO',width : 260},
			          {colName:'告警流水号',name : 'ALARMUNIQUEID',index : 'ALARMUNIQUEID',width : 260},
			          {colName:'告警标题',name : 'ALARMTITLE',index : 'ALARMTITLE',width : 300},
			          {colName:'告警正文',name : 'ALARMTEXT',index : 'ALARMTEXT',width : 800},
			          {colName:'告警级别',name : 'ALARMSERVERITY',index : 'ALARMSERVERITY',width : 0,hidden:true}
			];
			drillFunc=this.renderNeAlarm.bind(this);
			break;
		case SceneBase.AlarmList.TYPE_PERFORMANCEALARM:
			cols=[
			          {colName:'时间',name : 'TIME_STAMP',index : 'TIME_STAMP',width : 260},
			          {colName:'对象名称',name : 'DS_NAME',index : 'DS_NAME',width : 260},
			          {colName:'下限',name : 'FLOOR_LIMIT',index : 'FLOOR_LIMIT',width : 200},
			          {colName:'上限',name : 'UPPER_LIMIT',index : 'UPPER_LIMIT',width : 200},
			          {colName:'告警正文',name : 'CONTENT',index : 'CONTENT',width : 800},
			          {colName:'告警级别',name : 'ALARM_LEVEL',index : 'ALARM_LEVEL',width : 0,hidden:true}
	//		          ALARM_LEVEL
			];
			drillFunc=this.renderPerformanceAlarm.bind(this);
			break;
		case SceneBase.AlarmList.TYPE_COMPLAIN:
			cols=[
//			      	  {colName:'',name : 'isInArea',index : 'isInArea',width : 40},
			          {colName:'受理时间',name : 'KF_ACCEPT_TIME',index : 'KF_ACCEPT_TIME',width : 260},
			          {colName:'工单号',name : 'KF_ORDERID',index : 'KF_ORDERID',width : 260},
			          {colName:'场馆',name : 'DISNEYLAND_SITE',index : 'DISNEYLAND_SITE',width : 260},
			          {colName:'业务类型',name : 'BUSINESS_TYPE',index : 'BUSINESS_TYPE',width : 800}
			];
			drillFunc=this.renderComplainRegion.bind(this);
			break;
	}
	return cols;
};

SceneBase.AlarmList.prototype.switchAlarm = function(evt){
	var type=$(evt.currentTarget).attr("name");
	this.switchTab(type);
};
SceneBase.AlarmList.prototype.filterClick = function(evt){
	if($(".filterIcon").hasClass("filter12")){
		$(".filterIcon").removeClass("filter12");
		$(".alarmLegend li:gt(1)").css("display","block");
	}else{
		$(".filterIcon").addClass("filter12");
		$(".alarmLegend li:gt(1)").css("display","none");
	}
	this.update(true);
};
SceneBase.AlarmList.prototype.isFilter = function(){
	return $(".filterIcon").hasClass("filter12");
};
SceneBase.AlarmList.prototype.switchTab = function(type){
	if(type=="网元告警"){
		this.tableType=SceneBase.AlarmList.TYPE_NEALARM;
	}else if(type=="性能告警"){
		this.tableType=SceneBase.AlarmList.TYPE_PERFORMANCEALARM;
	}else if(type=="用户投诉"){
		this.tableType=SceneBase.AlarmList.TYPE_COMPLAIN;
	}
	this.showAlarmWin(type);
};
SceneBase.AlarmList.prototype.resetTab = function(){
	$(".alarmIcon").attr("class","alarmIcon");
//	neAlarmList
//	performanceAlarmList
//	complainList
	if(this.neAlarmList==null) this.neAlarmList=[];
	if(this.performanceAlarmList==null) this.performanceAlarmList=[];
	if(this.complainList==null) this.complainList=[];
	
	$("#neAlarmCount").text(this.neAlarmList.length);
	$("#performanceAlarmCount").text(this.performanceAlarmList.length);
	$("#userComplainCount").text(this.complainList.length);
	
	var i=0;
	var record={};
	var neMaxLv=999;
	var peMaxLv=999;
	var coMaxLv=999;
	for(i=0;i<this.neAlarmList.length;i++){
		if(this.neAlarmList[i].ALARMTEXT){
			this.neAlarmList[i].ALARMTEXT=this.neAlarmList[i].ALARMTEXT.replace("<","&lt;").replace(">","&gt;");
		}
		record=this.neAlarmList[i];
		neMaxLv=Math.min(neMaxLv,record.ALARMSERVERITY);
	}
	if(neMaxLv==999||isNaN(neMaxLv)) neMaxLv=0;
	$(".alarmIcon:eq(0)").addClass("alarmIconLv"+neMaxLv);
	
	for(i=0;i<this.performanceAlarmList.length;i++){
		record=this.performanceAlarmList[i];
		peMaxLv=Math.min(peMaxLv,record.ALARM_LEVEL);
	}
	if(peMaxLv==999||isNaN(peMaxLv)) peMaxLv=0;
	$(".alarmIcon:eq(1)").addClass("alarmIconLv"+peMaxLv);
	
	for(i=0;i<this.complainList.length;i++){
		record=this.complainList[i];
		coMaxLv=Math.min(coMaxLv,record.ALARMSERVERITY);
	}
	if(coMaxLv==999||isNaN(coMaxLv)) coMaxLv=0;
	$(".alarmIcon:eq(2)").addClass("alarmIconLv"+coMaxLv);
};
SceneBase.AlarmList.prototype.renderNeAlarm=function(rowid,rowdata){
	var grid=this.grid;
	var tr=grid.find("tbody").find("tr")[rowid];
	$($(tr).find("td")[1]).addClass("alarmLv"+rowdata.ALARMSERVERITY+"Txt");
	$($(tr).find("td")[0]).text(rowdata.EVENTTIME.substring(5,19));
};
SceneBase.AlarmList.prototype.renderPerformanceAlarm=function(rowid,rowdata){
	var grid=this.grid;
	var tr=grid.find("tbody").find("tr")[rowid];//(color,name,time,level,downLimit,upLimit,content)
//	 {colName:'时间',name : 'TIME_STAMP',index : 'TIME_STAMP',width : 200},
//     {colName:'对象名称',name : 'DS_NAME',index : 'DS_NAME',width : 260},
//     {colName:'下限',name : 'FLOOR_LIMIT',index : 'FLOOR_LIMIT',width : 200},
//     {colName:'上限',name : 'UPPER_LIMIT',index : 'UPPER_LIMIT',width : 200},
//     {colName:'告警正文',name : 'CONTENT',index : 'CONTENT',width : 800}
    $(tr).attr("alarmLv",rowdata.ALARM_LEVEL);
	$(tr).on('click',this.locateArea.bind(this));
	$($(tr).find("td")[1]).addClass("alarmLv"+rowdata.ALARM_LEVEL+"Txt");
	$($(tr).find("td")[0]).text(rowdata.TIME_STAMP.substring(5,19));
};
SceneBase.AlarmList.prototype.locateArea=function(evt){
	var trJQ=$(evt.currentTarget);
	var tds=trJQ.find("td");
	var alarmLv=trJQ.attr("alarmLv");
	var time=$(tds[0]).text().split(" ")[1];
	var targetName=$(tds[1]).text();
	var floor=$(tds[2]).text();
	var ceil=$(tds[3]).text();
	var content=$(tds[4]).text();
	
	try{
		window.parent.screen2_renderAreaAndTip(
				LSMConsts["alarmColor"+alarmLv],targetName,time,LSMConsts["alarmTxt"+alarmLv],floor,ceil,content
				);
	}catch(e){
		console.log(e.message);
	}
	
};
SceneBase.AlarmList.prototype.renderComplainRegion=function(rowid,rowdata){
	var grid=this.grid;
	var tr=grid.find("tbody").find("tr")[rowid];
//	if(this.isInArea(rowdata)){
//		$($(tr).find("td")[0]).html('<div class="mickey"></div>');
//	}
	$($(tr).find("td")[1]).text(rowdata.KF_ACCEPT_TIME.substring(5,19));
};
//LSMConsts.areaScope 判断是否在所配置的热点区域内
SceneBase.AlarmList.prototype.isInArea=function(rowdata){
	var result=false;
	var scope=LSMConsts.areaScope;
	var lng=rowdata.LONGITUDE_;
	var lat=rowdata.LATITUDE_;
	if(lng!=null&&lat!=null){
		if(
			lng>scope[0]&&lng<scope[2]
			&&lat<scope[1]&&lat>scope[3]
		){
			result=true;
		}
	}
	return result;
};
SceneBase.AlarmList.prototype.update=function(showLoadMask){
	var dm=LSMScreen.DataManager.getInstance();
//	LSMConsts.area
	dm.getAlarmListByArea({area:LSMConsts.area},this.neAlarmDataHandler.bind(this));
	dm.getAlarmFLow({hotspot:this.hotspot},this.performanceAlarmDataHandler.bind(this));
	dm.getComplainList({},this.complainDataHandler.bind(this));
	
};
SceneBase.AlarmList.prototype.neAlarmDataHandler=function(result){
	this.neAlarmList=[];
//	var filterFlag=this.isFilter();
//	var list=[];
//	if(filterFlag){
//		var tmp=[];
//		for(var i=0;i<list.length;i++){
//			var record=list[i];
//			if(record.ALARMSERVERITY<=2){
//				tmp.push(record);
//			}
//		}
//		this.neAlarmList=tmp;
//	}else{
//		this.neAlarmList=list;
//	}
	this.updateGridData();
};
SceneBase.AlarmList.prototype.renderMapArea=function(list){
	try{
		window.parent.screen2_clearAreaRender();
	}catch(e){
		console.log("disney1 window.parent.screen2_clearAreaRender failed:"+e.message);
	}
	
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var targetName=record.DS_NAME;
		var alarmLv=record.ALARM_LEVEL;
		var time=record.TIME_STAMP.split(" ")[1];
		var floor=record.FLOOR_LIMIT;
		var ceil=record.UPPER_LIMIT;
		var content=record.CONTENT;
		try{
			window.parent.screen2_renderAreaAndTip(
					LSMConsts["alarmColor"+alarmLv],targetName,time,LSMConsts["alarmTxt"+alarmLv],floor,ceil,content
					);
		}catch(e){
			console.log(e.message);
		}
	}
};
SceneBase.AlarmList.prototype.performanceAlarmDataHandler=function(list){
	var filterFlag=this.isFilter();
	if(filterFlag){
		var tmp=[];
		for(var i=0;i<list.length;i++){
			var record=list[i];
			if(record.ALARM_LEVEL<=2){
				tmp.push(record);
			}
		}
		this.performanceAlarmList=tmp;
	}else{
		this.performanceAlarmList=list;
	}
	this.renderMapArea(this.performanceAlarmList);
	this.updateGridData();
};
SceneBase.AlarmList.prototype.complainDataHandler=function(list){
	var tmp=[];
	for(var i=0;i<list.length;i++){
		var record=list[i];
		if(record.IF_DISNEYLAND=="是"){
			tmp.push(record);
		}
//		if(this.isInArea(record)){
//			tmp.push(record);
//		}
	}
	this.complainList=tmp;
	this.updateGridData();
};
SceneBase.AlarmList.prototype.updateGridData=function(page){
	if(page==null){
		page=1;
	}
	this.resetTab();
	if(this.grid!=null){
		this.clearGrid();
		this.updateGridCol();
		var list=[];
		switch(this.tableType){
			case SceneBase.AlarmList.TYPE_NEALARM:
				list=this.neAlarmList;
				break;
			case SceneBase.AlarmList.TYPE_PERFORMANCEALARM:
				list=this.performanceAlarmList;
				break;
			case SceneBase.AlarmList.TYPE_COMPLAIN:
				list=this.complainList;
				break;
		}
		var gridDataList=list;
		var total=Math.ceil(gridDataList.length/this.pageSize);
		if(page==Number.POSITIVE_INFINITY){
			page=total;
		}
		var start=(page-1)*this.pageSize;
		var end=Math.min(gridDataList.length,page*this.pageSize);
		var sliceArr=[];
		if(start>=0&&end>=0){
			sliceArr=gridDataList.slice(start, end);
		}
		var data={"total":Math.ceil(gridDataList.length/this.pageSize),"page":page,"records":gridDataList.length+"","rows":sliceArr};
		this.grid[0].addJSONData(data);
		
		this.updateRowClass();
		if(list.length>0){
			$(".noAlarm").css("display","none");
			$("#alarmTable").css("display","block");
		}else{
			$("#alarmTable").css("display","none");
			$(".noAlarm").css("display","block");
		}
	}
};

SceneBase.AlarmList.prototype.updateRowClass=function(){
	this.grid.find("tr").removeClass("oddGrayTableRow");
	this.grid.find("tr:odd").addClass("oddGrayTableRow");
};
SceneBase.AlarmList.prototype.clearGrid=function(){
	this.grid.clearGridData();
};
