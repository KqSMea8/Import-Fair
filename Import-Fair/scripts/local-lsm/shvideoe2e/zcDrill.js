var SHVIDEOSCREEN=SHVIDEOSCREEN||{};
SHVIDEOSCREEN.ZcDrillPage=function (majorName,minor)
{
	this.videoMajorKey=majorName;
	this.videoMinorKey=minor;
	this.initialize.apply(this, arguments);
	this.initComponents();
};
/** 从ScreenBase继承*/
SHVIDEOSCREEN.ZcDrillPage.prototype=Object.create(LSMScreen.ScreenBase.prototype);
SHVIDEOSCREEN.ZcDrillPage.prototype.constructor=SHVIDEOSCREEN.ZcDrillPage;

SHVIDEOSCREEN.ZcDrillPage.prototype.videoMajorKey="视频";
SHVIDEOSCREEN.ZcDrillPage.prototype.videoMinorKey="腾讯视频";


SHVIDEOSCREEN.ZcDrillPage.prototype.ringChart=null;

SHVIDEOSCREEN.ZcDrillPage.prototype.line0=null;
SHVIDEOSCREEN.ZcDrillPage.prototype.line1=null;
SHVIDEOSCREEN.ZcDrillPage.prototype.line2=null;
SHVIDEOSCREEN.ZcDrillPage.prototype.line3=null;

SHVIDEOSCREEN.ZcDrillPage.prototype.chartList=[];
SHVIDEOSCREEN.ZcDrillPage.prototype.selectedTab="SGW";
SHVIDEOSCREEN.ZcDrillPage.prototype.totalDataCache={};
SHVIDEOSCREEN.ZcDrillPage.prototype.tabDatas={};
SHVIDEOSCREEN.ZcDrillPage.prototype.grid=null;

SHVIDEOSCREEN.ZcDrillPage.prototype.initComponents=function()
{
	$("#btn_period").on('click',this.changePeriod.bind(this));
	$("#exportTab").on('click',this.exportTab.bind(this));
	$("#pageClose").on('click',this.closePage.bind(this));//趋势图功能按钮
	if(this.videoMinorKey=="微信抢红包"){
		$("#pageTitle").text("微信支付");
	}else{
		$("#pageTitle").text(this.videoMinorKey);
	}
	this.dm=LSMScreen.DataManager.getInstance();
	this.line3=new LSMScreen.SimpleChart($("#chartContent0")[0],{},function(){}.bind(this));
	this.line3.kpiConfig={icon:"dlspeed",name:"下载速率",key:"下行速率500k",unit:"Kbps",rate:1,fixed:2,ymin:0,ymax:null,source:"网络质量"};
	this.chartList=[this.line3];
	this.initGridByType();
	this.update();
	$(".chartbtn").on('click',this.chartFuncBtnClicked.bind(this));//趋势图功能按钮
	$(".gridTabIcon").on('click',this.gridTabClicked.bind(this));//左下业务大类tab
};
SHVIDEOSCREEN.ZcDrillPage.prototype.changePeriod = function(){
	var src=$("#btn_period").attr("src");
	var name=$("#btn_period").attr("name");
	if(name=="realtime"){
		$("#btn_period").attr("name","hour");
		$("#btn_period").attr("src",src.replace("realtime.png","hour.png"));
	}else{
		$("#btn_period").attr("name","realtime");
		$("#btn_period").attr("src",src.replace("hour.png","realtime.png"));
	}
	this.updateMinorKpi();
	this.updateTabDatas();
};
SHVIDEOSCREEN.ZcDrillPage.prototype.getTimeType = function()
{
	var type=$("#btn_period").attr("name");
	if(type=="realtime"){
		type=null;
	}
	return type;
};
SHVIDEOSCREEN.ZcDrillPage.prototype.exportTab=function()
{
	SUtils.exportJQGrid(this.grid,this.selectedTab);
};
SHVIDEOSCREEN.ZcDrillPage.prototype.closePage=function()
{
	parent.closeDrillApp();
};
SHVIDEOSCREEN.ZcDrillPage.prototype.update=function()
{
	var i=0;
	for(i=0;i<this.chartList.length;i++){
		this.getKpiTrendData(this.renderChartBySelfConfig,i);
	}
	this.updateMinorKpi();
	this.updateTabDatas();
};
SHVIDEOSCREEN.ZcDrillPage.prototype.updateMinorKpi=function()
{
	var timeType=this.getTimeType();
	this.dm.getVideoMinorQualityRecord(
			{majorName:this.videoMajorKey,minor:this.videoMajorKey+":"+this.videoMinorKey,timeType:timeType},
			this.minorKpiHandler.bind(this)
			);
};
SHVIDEOSCREEN.ZcDrillPage.prototype.getKpiTrendData=function(callback,chartIndex)
{
	var format="yyyy-MM-dd hh:mm:ss";
	var timeConfig=this.chartList[chartIndex].timeConfig;
	var params={
			majorName:this.videoMajorKey,
			minor:this.videoMajorKey+":"+this.videoMinorKey,
			timeBegin:SUtils.getDiffDateTimeFromNow(-6,SUtils.TIME_TYPE.HOUR,format),
		 	timeEnd:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
	};
	this.trendBegin=params.timeBegin;
	this.trendEnd=params.timeEnd;
	var paramsCompare={
			majorName:this.videoMajorKey,
			minor:this.videoMajorKey+":"+this.videoMinorKey
	};
	
	if(timeConfig!=null){
		params=$.extend(params,timeConfig);
	}
	var startTime=params.timeBegin;
	var endTime=params.timeEnd;
	var compareLag=24*60*60*1000;
	var startDate=new Date(startTime.replace(/-/g,"/"));
	var endDate=new Date(endTime.replace(/-/g,"/"));
	
	compareStart=(new Date(startDate.getTime()-compareLag)).Format(LSMScreen.DataManager.formatSpecialCompare);
	compareEnd=(new Date(endDate.getTime()-compareLag)).Format(LSMScreen.DataManager.formatSpecialCompare);
	
	paramsCompare.timeBegin=compareStart;
	paramsCompare.timeEnd=compareEnd;
	
	this.dm.getVideoMinorQualityTrend(params,function(result){
			
			
			this.dm.getVideoMinorQualityTrend(paramsCompare,function(resultCompare){
				if(callback!=null){
					var chartDatas={
							qualityTrendCache:result,
							qualityTrendCacheCompare:resultCompare,
					};
					callback.apply(this, [chartIndex,chartDatas]);
				}
			}.bind(this));
			
			
	}.bind(this));
};
SHVIDEOSCREEN.ZcDrillPage.prototype.minorKpiHandler=function(result)
{
	var kpiMap=result[this.videoMinorKey];
	var time=kpiMap.time;
	var start="";
	var end="";
	var timeType=this.getTimeType();
	if(timeType=="hour"){
		var format="hh:00";
		var date = new Date(time.replace(/-/g,"/"));
		start=date.Format(format);
		date.setHours(date.getHours()+1);
		end=date.Format(format);
	}else{
		start=SUtils.getHourAndMinuteFive(time);
		end=SUtils.getHourAndMinuteFive(time,true);
	}
	$("#pageTime").text(start+"-"+end);
	
};

/////趋势图方法

SHVIDEOSCREEN.ZcDrillPage.prototype.renderChartBySelfConfig=function(chartIndex,datas)
{
	this.chartList[chartIndex].datas=datas;
	this.reloadChart(chartIndex);
};
//不重新查询数据
SHVIDEOSCREEN.ZcDrillPage.prototype.reloadChart=function(chartIndex,kpiConfig)
{
	if(kpiConfig!=null){
		$("#chartTitle"+chartIndex).html(kpiConfig.name+'<span>（'+kpiConfig.unit+'）</span>');
		this.chartList[chartIndex].kpiConfig=kpiConfig;
	}
	this.chartList[chartIndex].reinitEChart();
	this.chartList[chartIndex].updateData(this.getLineChartOption(this.chartList[chartIndex].kpiConfig,this.chartList[chartIndex].datas));
};
SHVIDEOSCREEN.ZcDrillPage.prototype.getLineChartOption=function(kpiConfig,datas)
{
	var xArr=[];
	var dataArr=[];
	var dataArrCompare=[];
	var kpiKey=kpiConfig.key;
	var ymin=kpiConfig.ymin==null?0:kpiConfig.ymin;
	var ymax=kpiConfig.ymax==null?NaN:kpiConfig.ymax;
	var list=[];
	var listCompare=[];
	list=datas.qualityTrendCache;
	listCompare=datas.qualityTrendCacheCompare;
	
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var recordCompare=listCompare[i];
		var time=record.time;
		var value=record[kpiKey];
		var valueCompare=recordCompare[kpiKey];
		value=(value*kpiConfig.rate).toFixed(kpiConfig.fixed);
		valueCompare=(valueCompare*kpiConfig.rate).toFixed(kpiConfig.fixed);
		xArr.push(time.substring(11,16));
		dataArr.push(value);
		dataArrCompare.push(valueCompare);
	}
	
	
	
	var tipFormatter=kpiConfig.name+'<br/>'
	+'{b0}<br/>'
	+'今天：{c0} '+kpiConfig.unit+'<br/>'
	+'昨天：{c1} '+kpiConfig.unit+'<br/>';
	var option = {
			color:['#00ff5a','#fced00','#7B68EE'],
		    legend: {
		        data:['今天','昨天'],
		        textStyle :
        		{
		        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.7
        		},
        		show:true
		    },
			grid:{
		    	borderWidth:0,
		    	x:80,
		    	y:40,
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
		            		},
		            		formatter:function(value){ 
		            			return value;
//		            			if(value>=100000){
//		            				return (value/10000).toFixed(0).toLocaleString()+"万";
//		            			}else{
//		            				return value.toLocaleString();
//		            			}
		            			
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
		            name:'今天',
		            type:'line',
		            data:dataArr,
		            itemStyle:{normal:{lineStyle:{width:2}}}
		        },{
		            name:'昨天',
		            type:'line',
		            data:dataArrCompare,
		            itemStyle:{normal:{lineStyle:{width:2}}}
		        }
		    ]
		};
	
	return option;
};

SHVIDEOSCREEN.ZcDrillPage.prototype.chartFuncBtnClicked=function(evt)
{
	var chartIndex=$(evt.currentTarget).attr("name");
	var func=$(evt.currentTarget).attr("func");
	switch(func){
	case "refresh":
		this.getKpiTrendData(this.renderChartBySelfConfig,chartIndex);
		break;
	case "kpichange":
		this.showKpiList(chartIndex);
		break;
	case "timechange":
		this.showCompareTimeChooser(chartIndex);
		break;
	}
};

SHVIDEOSCREEN.ZcDrillPage.prototype.showKpiList = function(chartIndex){
	if(this["kpiChooser"+chartIndex]==null){
		var winWidth=300;
		var winHeight=370;
		var win=null;
		this["kpiChooser"+chartIndex]=win=new LSMScreen.SimpleWindow({
			title:"指标选择",
			width:winWidth,
			height:winHeight,
			x:$("#chartContent"+chartIndex).offset().left+$("#chartContent"+chartIndex).width()-winWidth,
			y:$("#chartContent"+chartIndex).offset().top,
			closeFunc:function(){
				this["kpiChooser"+chartIndex].hide();
			}.bind(this),
			beforeClose:function(){
				
			}.bind(this)
		});
		var tableDom=document.createElement("table");
		$(tableDom).attr("id",Math.uuid());
		$(win.content).append(tableDom);
		var cols=[
		    {colName:'指标',name : 'name',index : 'name',width : 300}
		];
		var opt1={
		        datatype : function(){},
		        colNames:['指标'],
		        colModel : cols,
		        loadui:'disable',
		        rowNum:100000,
		        afterInsertRow:function(rowid,rowdata){
		        	var tr=grid.find("tbody").find("tr")[rowid];
		        	$(tr).css("cursor","pointer");
		        	$(tr).attr("kpiIndex",rowid-1);
		        	$(tr).attr("chartIndex",chartIndex);
		        	$(tr).on('click',this.trendKpiSelected.bind(this));
		        }.bind(this),
		        height:winHeight-60
			};
		
		var grid=$(tableDom).jqGrid(opt1);
		grid.closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide();
		var arr=this.getAllKpis();
		grid[0].addJSONData(arr);
	}else{
		this["kpiChooser"+chartIndex].show();
	}
	
};
SHVIDEOSCREEN.ZcDrillPage.prototype.trendKpiSelected = function(evt){
	var list=this.getAllKpis();
	var kpiIndex=$(evt.currentTarget).attr("kpiIndex");
	var chartIndex=$(evt.currentTarget).attr("chartIndex");
	this.reloadChart(chartIndex,list[kpiIndex]);
	this["kpiChooser"+chartIndex].hide();
};
SHVIDEOSCREEN.ZcDrillPage.prototype.showCompareTimeChooser = function(chartIndex)
{
	if(this["timeChooser"+chartIndex]==null){
		var winWidth=500;
		var winHeight=200;
		this["timeChooser"+chartIndex]=new LSMScreen.SimpleWindow({
			title:"时间范围选择",
			width:winWidth,
			height:winHeight,
			x:$("#chartContent"+chartIndex).offset().left+$("#chartContent"+chartIndex).width()-winWidth,
			y:$("#chartContent"+chartIndex).offset().top,
			closeFunc:function(){
				this["timeChooser"+chartIndex].hide();
			}.bind(this),
			beforeClose:function(){
				
			}.bind(this)
		});
		var timeInputHtml='<input readonly="readonly" value="'+this.trendBegin+'" type="text" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\'})" class="Wdate" style="width:300px;height:35px;"/>';
		var timeInputHtml2='<input readonly="readonly" value="'+this.trendEnd+'" type="text" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:00:00\'})" class="Wdate" style="width:300px;height:35px;"/>';
		var html='<div class="timeChooserWin">'
			+'<div>开始时间：'+timeInputHtml+'</div>'
			+'<div style="margin-top:10px;">结束时间：'+timeInputHtml2+'</div>';
			
		html+='<div class="kpiChooserWinFoot">';
		
		html+='<div style="width:100%;text-align:center;">';
		html+='<input type="button" class="btn btn-primary" value="确定"></input>';
		html+="&nbsp;&nbsp;&nbsp;&nbsp;";
		html+='<input type="button" class="btn btn-primary" value="取消"></input>';
		html+="</div>";
		
		html+="</div>";
		
		html+="</div>";
		$(this["timeChooser"+chartIndex].content).css("padding","10px 10px 10px 10px");
		$(this["timeChooser"+chartIndex].content).html(html);
		$(this["timeChooser"+chartIndex].content).find(":button").on('click',function(evt){
			if($(evt.currentTarget).val()=="确定"){
				var inputs=$(this["timeChooser"+chartIndex].content).find("input");
				var startTimeStr=$(inputs[0]).val();
				var endTimeStr=$(inputs[1]).val();
				var startDate=new Date(startTimeStr.replace(/-/g,"/"));
				var endDate=new Date(endTimeStr.replace(/-/g,"/"));
				var compareLag=24*60*60*1000;
				var startTime=startDate.getTime();
				var endTime=endDate.getTime();
				if(startTimeStr==""&&endTimeStr!=""||startTimeStr!=""&&endTimeStr==""){
					alert("不能只选一个时间");
					return;
				}else if(endTime<=startTime){
					alert("开始时间必须小于结束时间");
					return;
				}else if(endTime-startTime>compareLag){
					alert("时间区间请限制在24小时内");
					return;
				}else{
					var queryConfig={};
					if(startTimeStr!=""){
						queryConfig.timeBegin=startTimeStr;
					}
					if(endTimeStr!=""){
						queryConfig.timeEnd=endTimeStr;
					}
					this.chartList[chartIndex].timeConfig=queryConfig;
					this.getKpiTrendData(this.renderChartBySelfConfig,chartIndex);
				}
				this["timeChooser"+chartIndex].hide();
			}else{
				this["timeChooser"+chartIndex].hide();
			}
			
		}.bind(this));
	}else{
		this["timeChooser"+chartIndex].show();
	}
};
//右下表格
SHVIDEOSCREEN.ZcDrillPage.prototype.gridTabClicked=function(evt)
{
	var currentSelSrc=$(evt.currentTarget).attr("src");
	var type=$(evt.currentTarget).attr("type");
	var lastSelSrc=$(".gridTabIconSelected").attr("src");
	lastSelSrc=lastSelSrc.replace("ts_","t_");
	currentSelSrc=currentSelSrc.replace("t_","ts_");
	$(".gridTabIconSelected").attr("src",lastSelSrc);
	$(evt.currentTarget).attr("src",currentSelSrc);
	$(".gridTabIcon").removeClass("gridTabIconSelected");
	$(evt.currentTarget).addClass("gridTabIconSelected");
	this.selectedTab=type;
	this.initGridByType();
	this.renderGridData();
};
SHVIDEOSCREEN.ZcDrillPage.prototype.updateTabDatas=function()
{
	var timeType=this.getTimeType();
	this.dm.getVideoMinorQualityRecord(
			{majorName:this.videoMajorKey,minor:this.videoMajorKey+":"+this.videoMinorKey,timeType:timeType},
			this.cacheMinorTotalKpi.bind(this)
			);
	
};
SHVIDEOSCREEN.ZcDrillPage.prototype.cacheMinorTotalKpi=function(result)
{
	var timeType=this.getTimeType();
	this.totalDataCache=result[this.videoMinorKey];
	var key=this.videoMajorKey+":"+this.videoMinorKey;
	this.dm.getVideoMinorSortRecord(
			{majorName:this.videoMajorKey,minor:key,type:'sgws',sortKey:'4GHTTP下行速率500k贡献度',order:'asc',timeType:timeType},
			this.sgwsSortDataHandler.bind(this)
			);
	this.dm.getVideoMinorSortRecord(
			{majorName:this.videoMajorKey,minor:key,type:'spips',sortKey:'4GHTTP下行速率500k贡献度',order:'asc',timeType:timeType},
			this.spipsSortDataHandler.bind(this)
			);
	this.dm.getVideoMinorSortRecord(
			{majorName:this.videoMajorKey,minor:key,type:'hosts',sortKey:'4GHTTP下行速率500k贡献度',order:'asc',timeType:timeType},
			this.hostsSortDataHandler.bind(this)
			);
	this.dm.getVideoMinorSortRecord(
			{majorName:this.videoMajorKey,minor:key,type:'imeitacs',sortKey:'4GHTTP下行速率500k贡献度',order:'asc',timeType:timeType},
			this.imeitacsSortDataHandler.bind(this)
			);
	this.dm.getVideoMinorSortRecord(
			{majorName:this.videoMajorKey,minor:key,type:'sites',sortKey:'4GHTTP下行速率500k贡献度',order:'asc',timeType:timeType},
			this.sitesSortDataHandler.bind(this)
			);
	
};
SHVIDEOSCREEN.ZcDrillPage.prototype.sgwsSortDataHandler=function(result)
{
	result.unshift(this.totalDataCache);
	this.tabDatas["SGW"]=result;
	if(this.selectedTab=="SGW"){
		this.renderGridData();
	}
};
SHVIDEOSCREEN.ZcDrillPage.prototype.spipsSortDataHandler=function(result)
{
	result.unshift(this.totalDataCache);
	this.tabDatas["SP-IP"]=result;
	if(this.selectedTab=="SP-IP"){
		this.renderGridData();
	}
};
SHVIDEOSCREEN.ZcDrillPage.prototype.hostsSortDataHandler=function(result)
{
	result.unshift(this.totalDataCache);
	this.tabDatas["HOST"]=result;
	if(this.selectedTab=="HOST"){
		this.renderGridData();
	}
};
SHVIDEOSCREEN.ZcDrillPage.prototype.imeitacsSortDataHandler=function(result)
{
	result.unshift(this.totalDataCache);
	this.tabDatas["终端"]=result;
	if(this.selectedTab=="终端"){
		this.renderGridData();
	}
};
SHVIDEOSCREEN.ZcDrillPage.prototype.sitesSortDataHandler=function(result)
{
	result.unshift(this.totalDataCache);
	this.tabDatas["小区"]=result;
	if(this.selectedTab=="小区"){
		this.renderGridData();
	}
};
SHVIDEOSCREEN.ZcDrillPage.prototype.renderGridData=function()
{
	var datas=this.tabDatas[this.selectedTab];
	this.grid[0].addJSONData(datas);
};

SHVIDEOSCREEN.ZcDrillPage.prototype.initGridByType=function(type)
{
	var baseColWidth=220;
	var type=this.selectedTab;
	var colNames=[];
	var colModel=[];
	switch(type){
	case "SGW":
		colNames=["SGW IP地址","SGW名称"];
		colModel=[{colName:'SGW IP地址',name : 'sgwip',index : 'sgwip',width : baseColWidth,formatter:this.emptyFormatter,fixed:true},
		          {colName:'SGW名称',name : 'name',index : 'name',width : 300,formatter:this.emptyFormatter,fixed:true}];
		break;
	case "SP-IP":
		colNames=["IP地址","IP归属"];
		colModel=[{colName:'IP地址',name : 'spip',index : 'spip',width : baseColWidth,formatter:this.emptyFormatter,fixed:true},
		          {colName:'IP归属',name : 'sphome',index : 'sphome',width : baseColWidth,formatter:this.emptyFormatter,fixed:true}];
		break;
	case "HOST":
		colNames=["HOST域名"];
		colModel=[{colName:'HOST域名',name : 'host',index : 'host',width : baseColWidth,formatter:this.emptyFormatter,fixed:true}];
		break;
	case "终端":
		colNames=["IMEI_TAC","终端品牌型号"];
		colModel=[{colName:'IMEI_TAC',name : 'imeitac',index : 'imeitac',width : baseColWidth,formatter:this.emptyFormatter,fixed:true},
		          {colName:'终端品牌型号',name : 'brand',index : 'brand',width : baseColWidth,formatter:this.emptyFormatter,fixed:true}];
		break;
	case "小区":
		colNames=["小区名称"];
		colModel=[{colName:'小区名称',name : 'name',index : 'name',width : 400,formatter:this.emptyFormatter,fixed:true}];
		break;
	}
	
	colNames.push("指标贡献度");
	colModel.push({colName:'指标贡献度',name : '4GHTTP下行速率500k贡献度',index : '4GHTTP下行速率500k贡献度',width : baseColWidth,formatter:function(cellvalue){
		if(isNaN(cellvalue)){
			return "--";
		}else{
			return (cellvalue).toFixed(2);
		}
	}});
	
	var kpis=this.getKpis3();
	for(var i=0;i<kpis.length;i++){
		colNames.push(kpis[i].name+'('+kpis[i].unit+')');
		colModel.push({
			colName:kpis[i].name+'('+kpis[i].unit+')',
			name : kpis[i].key,
			index : kpis[i].key,
			width : baseColWidth,
			formatter:function(cellvalue,config,rowData){
				var type=this.selectedTab;
				var colIndex=config.pos;
				var index=colIndex;
				switch(type){
				case "SGW":
					index=colIndex-3;
					break;
				case "SP-IP":
					index=colIndex-3;
					break;
				case "HOST":
					index=colIndex-2;
					break;
				case "终端":
					index=colIndex-3;
					break;
				case "小区":
					index=colIndex-2;
					break;
				}
				
				
				var kpi=kpis[index];
				var realValue=(cellvalue*kpi.rate).toFixed(kpi.fixed);
				if(isNaN(realValue)){
					realValue="";
				}
				return realValue;
			}.bind(this)
		}); 
	}
	
	$("#tabGridParent").html("");
	var tableId=Math.uuid();
	var tableDom=document.createElement("table");
	$(tableDom).attr("id",tableId);
	$(tableDom).css("width","100%");
	$(tableDom).css("height","100%");
	$("#tabGridParent").append(tableDom);
	
	var opt={
        datatype : function(){},
        colNames:colNames,
        colModel : colModel,
        autowidth:true,
        shrinkToFit:false,
        autoScroll: true,
        loadui:'disable',
        height:$(tableDom).height()-60
	};
	this.grid=$($(tableDom)[0]).jqGrid(opt);
};
SHVIDEOSCREEN.ZcDrillPage.prototype.emptyFormatter=function(cellvalue,config,rowData)
{
	if(cellvalue==""||cellvalue==null){
		return "--";
	}else{
		return cellvalue;
	}
};

SHVIDEOSCREEN.ZcDrillPage.prototype.closeDrillApp=function()
{
	if(this.drillAppFrame!=null){
		$(this.drillAppFrame).remove();
		this.drillAppFrame=null;
	}
};

SHVIDEOSCREEN.ZcDrillPage.prototype.drillFlowAnalysis=function(evt)
{
	if(this.drillAppFrame==null){
		var app=this.videoMinorKey;
		var iframe=document.createElement("iframe");
		var frameWidth=$(".itp").width();
		var frameHeight=$(".itp").height();
		$(iframe).width(frameWidth);
		$(iframe).height(frameHeight);
		$(iframe).attr("frameborder","0");
		$(iframe).attr("src","flowAnalysisDrill.jsp?minor="+encodeURIComponent(app));
		$(iframe).css("position","absolute");
		$("body").append(iframe);
		this.drillAppFrame=iframe;
	}
};

SHVIDEOSCREEN.ZcDrillPage.prototype.zcDrill=function(evt)
{
	if(this.drillAppFrame==null){
		var app=this.videoMinorKey;
		var iframe=document.createElement("iframe");
		var frameWidth=$(".itp").width();
		var frameHeight=$(".itp").height();
		$(iframe).width(frameWidth);
		$(iframe).height(frameHeight);
		$(iframe).attr("frameborder","0");
		$(iframe).attr("src","zcDrill.jsp?minor="+encodeURIComponent(app));
		$(iframe).css("position","absolute");
		$("body").append(iframe);
		this.drillAppFrame=iframe;
	}
};
//所有指标 
SHVIDEOSCREEN.ZcDrillPage.prototype.getAllKpis = function(){
	var list=[];
	var total=LSMConsts.videoKpis;
	if(this.selectedMajor=="视频"){
		list=total;
	}else{
		for(var i=0;i<total.length;i++){
			var record=total[i];
			if(record.videoOnly==true){
				continue;
			}
			list.push(record);
		}
	}
	return list;
};
//右下表格列配置 全量
SHVIDEOSCREEN.ZcDrillPage.prototype.getKpis3=function(){
	var list=[];
	var total=LSMConsts.videoKpis3;
	if(this.videoMajorKey=="视频"){
		list=total;
	}else{
		for(var i=0;i<total.length;i++){
			var record=total[i];
			if(record.videoOnly==true){
				continue;
			}
			list.push(record);
		}
	}
	return list;
};

