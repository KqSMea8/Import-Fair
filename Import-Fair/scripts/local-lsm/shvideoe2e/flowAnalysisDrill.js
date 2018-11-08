var SHVIDEOSCREEN=SHVIDEOSCREEN||{};
SHVIDEOSCREEN.FlowAnalysisDrllPage=function (majorName,minor)
{
	this.videoMajorKey=majorName;
	this.videoMinorKey=minor;
	this.initialize.apply(this, arguments);
	this.initComponents();
};
/** 从ScreenBase继承*/
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype=Object.create(LSMScreen.ScreenBase.prototype);
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.constructor=SHVIDEOSCREEN.FlowAnalysisDrllPage;

SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.videoMajorKey="视频";
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.videoMinorKey="腾讯视频";
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.sortKey="4G流量";


SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.allKpis=[
                                                      {icon:"flow",name:"流量",key:"4G流量",unit:"MB",rate:1/1024,fixed:1,ymin:0,ymax:null,source:"网络质量"},
                                                      {icon:"allbus_percent",name:"流量占比",key:"4G全网业务占比",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                      {icon:"user",name:"用户数",key:"4G用户数",unit:"人",rate:1,fixed:0,ymin:0,ymax:null,source:"用户数"},
                                                      {icon:"dlspeed",name:"下载速率",key:"4G下行速率500k",unit:"Kbps",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                                                      
                                                      {icon:"play_succ",name:"播放成功率",key:"4G视频播放成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量",videoOnly:true},
                                                      {icon:"play_delay",name:"播放时延 ",key:"4G视频播放时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量",videoOnly:true},
                                                      {icon:"tcp_succ",name:"TCP建链成功率 ",key:"4GTCP成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                      {icon:"tcp_delay",name:"TCP建链时延 ",key:"4GTCP时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                                                      {icon:"http_succ",name:"HTTP请求成功率",key:"4GHTTP成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                      
                                                      {icon:"tcp_shake_succ",name:"TCP一二次握手成功率 ",key:"4GTCP第一、二次握手成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                      {icon:"tcp_shake_delay",name:"TCP一二次握手时延 ",key:"4GTCP第一、二次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                                                      {icon:"tcp_shake_succ",name:"TCP二三次握手成功率",key:"4GTCP第二、三次握手成功率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                      {icon:"tcp_shake_delay",name:"TCP二三次握手时延",key:"4GTCP第二、三次握手时延",unit:"ms",rate:1,fixed:0,ymin:0,ymax:null,source:"网络质量"},
                                                      {icon:"tcp_up_re",name:"TCP上行重传率",key:"4GTCP上行重传率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                      
                                                      {icon:"tcp_down_re",name:"TCP下行重传率",key:"4GTCP下行重传率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                      {icon:"tcp_up_disorder",name:"TCP上行乱序率",key:"4GTCP上行乱序率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                      {icon:"tcp_down_disorder",name:"TCP下行乱序率",key:"4GTCP下行乱序率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"},
                                                      {icon:"user_permeate",name:"用户渗透率",key:"4G用户渗透率",unit:"%",rate:100,fixed:2,ymin:0,ymax:100,source:"网络质量"}
                                                      ];
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.dm=null;

SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.grid0=null;
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.grid1=null;
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.grid2=null;

SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.initComponents=function()
{
	$("#lineChartParent").on('dblclick',this.maximizeLine.bind(this));
	$("#ringChartParent").on('dblclick',this.maximizePie.bind(this));
	$("#btn_period").on('click',this.changePeriod.bind(this));
	$("#exportTab0").on('click',this.exportTab0.bind(this));
	$("#exportTab1").on('click',this.exportTab1.bind(this));
	$("#exportTab2").on('click',this.exportTab2.bind(this));
	$("#pageClose").on('click',this.closePage.bind(this));//趋势图功能按钮
	if(this.videoMinorKey=="微信抢红包"){
		$("#pageTitle").text("微信支付");
		$("#title0").text("业务流量流向-"+"微信支付");
	}else{
		$("#pageTitle").text(this.videoMinorKey);
		$("#title0").text("业务流量流向-"+this.videoMinorKey);
	}
	
	this.dm=LSMScreen.DataManager.getInstance();
	require(['echarts','echarts/chart/pie'],function(ec){
		this.ringChart=ec.init($("#ringChart")[0]);
		this.lineChart=new LSMScreen.SimpleChart($("#lineChart")[0],{},function(){}.bind(this));
		
		this.initGridLv0();
		this.initGridLv1();
		this.initGridLv2();
		this.update();
	}.bind(this));
};


SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.maximizeLine = function(evt){
	var parentId="lineChartParent";
	var contentId="lineChart";
	var frameWidth=$(".itp").width();
	var frameHeight=$(".itp").height();
	var win=new LSMScreen.SimpleWindow({
		title:"业务流量省网率",
		width:frameWidth*0.6,
		height:frameHeight*0.4,
		x:frameWidth*0.2,
		y:frameHeight*0.1,
		beforeClose:function(){
			$("#"+parentId).append($("#"+contentId));
			this.reloadLine();
		}.bind(this)
	});
	$(win.content).append($("#"+contentId));
	this.reloadLine();
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.maximizePie = function(evt){
	var parentId="ringChartParent";
	var contentId="ringChart";
	var frameWidth=$(".itp").width();
	var frameHeight=$(".itp").height();
	var win=new LSMScreen.SimpleWindow({
		title:"流量流向占比",
		width:frameWidth*0.6,
		height:frameHeight*0.4,
		x:frameWidth*0.2,
		y:frameHeight*0.1,
		beforeClose:function(){
			$("#"+parentId).append($("#"+contentId));
			this.reInitPie();
		}.bind(this)
	});
	$(win.content).append($("#"+contentId));
	this.reInitPie();
};

SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.changePeriod = function(){
	var src=$("#btn_period").attr("src");
	var name=$("#btn_period").attr("name");
	if(name=="realtime"){
		$("#btn_period").attr("name","hour");
		$("#btn_period").attr("src",src.replace("realtime.png","hour.png"));
	}else{
		$("#btn_period").attr("name","realtime");
		$("#btn_period").attr("src",src.replace("hour.png","realtime.png"));
	}
//	this.updatePieAndGridLv0();
	this.update();
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.getTimeType = function()
{
	var type=$("#btn_period").attr("name");
	if(type=="realtime"){
		type=null;
	}
	return type;
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.exportTab0=function()
{
	SUtils.exportJQGrid(this.grid0,$("#title0").text());
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.exportTab1=function()
{
	SUtils.exportJQGrid(this.grid1,$("#title1").text());
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.exportTab2=function()
{
	SUtils.exportJQGrid(this.grid2,$("#title2").text());
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.closePage=function()
{
	parent.closeDrillApp();
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.initGridLv0=function()
{
	var baseColWidth=120;
	var colNames=["流向"];
	var colModel=[{colName:'流向',name : 'name',index : 'name',width : baseColWidth,formatter:function(cellvalue,config,rowData){
		return '<div style="color:white;text-decoration:underline;cursor:pointer;" onclick="gridLv0Clicked(\''+cellvalue+'\',\''+rowData["4G流量"]+'\')">'+cellvalue+'</div>';
	}}];
	var kpis=this.getAllKpis();
	for(var i=0;i<kpis.length;i++){
		colNames.push(kpis[i].name+'('+kpis[i].unit+')');
		colModel.push({
			colName:kpis[i].name+'('+kpis[i].unit+')',
			name : kpis[i].key,
			index : kpis[i].key,
			width : baseColWidth,
			formatter:function(cellvalue,config,rowData){
				var colIndex=config.pos;
				var index=colIndex-1;
				var kpis=this.getAllKpis();
				var kpi=kpis[index];
				var realValue=(cellvalue*kpi.rate).toFixed(kpi.fixed);
				if(isNaN(realValue)){
					realValue="";
				}
				return realValue;
			}.bind(this)
		}); 
	}
	
	$("#gridParent0").html("");
	var tableId=Math.uuid();
	var tableDom=document.createElement("table");
	$(tableDom).attr("id",tableId);
	$(tableDom).css("width","100%");
	$(tableDom).css("height","100%");
	$("#gridParent0").append(tableDom);
	
	var opt={
        datatype : function(){},
        colNames:colNames,
        colModel : colModel,
        autowidth:true,
        shrinkToFit:false,
        autoScroll: true,
        loadui:'disable',
        rowNum:100000,
        height:$(tableDom).height()-60
	};
	this.grid0=$($(tableDom)[0]).jqGrid(opt);
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.initGridLv1=function()
{
	var baseColWidth=120;
	var colNames=["IP归属","占本类占比(%)"];
	var colModel=[
	              {colName:'IP归属',name : 'name',index : 'name',width : baseColWidth,formatter:function(cellvalue,config,rowData){
	          		return '<div style="color:white;text-decoration:underline;cursor:pointer;" onclick="gridLv1Clicked(\''+cellvalue+'\',\''+rowData["4G流量"]+'\')">'+cellvalue+'</div>';
	          	}},
	              {colName:'占本类占比(%)',name : 'selfpercent',index : 'selfpercent',width : baseColWidth}
	              ];
	var kpis=this.getAllKpis();
	for(var i=0;i<kpis.length;i++){
		colNames.push(kpis[i].name+'('+kpis[i].unit+')');
		colModel.push({
			colName:kpis[i].name+'('+kpis[i].unit+')',
			name : kpis[i].key,
			index : kpis[i].key,
			width : baseColWidth,
			formatter:function(cellvalue,config,rowData){
				var colIndex=config.pos;
				var index=colIndex-2;
				var kpis=this.getAllKpis();
				var kpi=kpis[index];
				var realValue=(cellvalue*kpi.rate).toFixed(kpi.fixed);
				if(isNaN(realValue)){
					realValue="";
				}
				return realValue;
			}.bind(this)
		}); 
	}
	
	$("#gridParent1").html("");
	var tableId=Math.uuid();
	var tableDom=document.createElement("table");
	$(tableDom).attr("id",tableId);
	$(tableDom).css("width","100%");
	$(tableDom).css("height","100%");
	$("#gridParent1").append(tableDom);
	
	var opt={
        datatype : function(){},
        colNames:colNames,
        colModel : colModel,
        autowidth:true,
        shrinkToFit:false,
        autoScroll: true,
        loadui:'disable',
        rowNum:100000,
        height:$(tableDom).height()-60
	};
	this.grid1=$($(tableDom)[0]).jqGrid(opt);

};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.initGridLv2=function()
{
	var baseColWidth=120;
	var colNames=["流向IP","IP归属","占本类占比(%)"];
	var colModel=[
	              {colName:'流向IP',name : 'name',index : 'name',width : baseColWidth},
	              {colName:'IP归属',name : 'sphome',index : 'sphome',width : baseColWidth},
	              {colName:'占本类占比(%)',name : 'selfpercent',index : 'selfpercent',width : baseColWidth}
	              ];
	var kpis=this.getAllKpis();
	for(var i=0;i<kpis.length;i++){
		colNames.push(kpis[i].name+'('+kpis[i].unit+')');
		colModel.push({
			colName:kpis[i].name+'('+kpis[i].unit+')',
			name : kpis[i].key,
			index : kpis[i].key,
			width : baseColWidth,
			formatter:function(cellvalue,config,rowData){
				var colIndex=config.pos;
				var index=colIndex-3;
				var kpis=this.getAllKpis();
				var kpi=kpis[index];
				var realValue=(cellvalue*kpi.rate).toFixed(kpi.fixed);
				if(isNaN(realValue)){
					realValue="";
				}
				return realValue;
			}.bind(this)
		}); 
	}
	
	$("#gridParent2").html("");
	var tableId=Math.uuid();
	var tableDom=document.createElement("table");
	$(tableDom).attr("id",tableId);
	$(tableDom).css("width","100%");
	$(tableDom).css("height","100%");
	$("#gridParent2").append(tableDom);
	
	var opt={
        datatype : function(){},
        colNames:colNames,
        colModel : colModel,
        autowidth:true,
        shrinkToFit:false,
        autoScroll: true,
        loadui:'disable',
//        rowNum:100000,
        height:$(tableDom).height()-60
	};
	this.grid2=$($(tableDom)[0]).jqGrid(opt);

};

SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.update=function()
{
	this.updatePieAndGridLv0();
	this.updateLine();
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.updatePieAndGridLv0=function()
{
	var timeType=this.getTimeType();
	this.dm.getVideoSpDirList({majorName:this.videoMajorKey,sortKey:this.sortKey,timeType:timeType},this.spDirDataHandler.bind(this));
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.spDirDataHandler=function(result)
{
	var gridArr=result;
	var arr=[];
	var legends=[];
	
	var time="";
	for(var i=0;i<result.length;i++){
		var record=result[i];
		var value=(record["4G流量"]/1024/1024).toFixed(2);
		legends.push(record.name);
		arr.push({value:value, name:record.name});
		if(time==""){
			time=record.time;
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
		}
	}
	this.spDirDataCache=gridArr;
	
//	this.renderSpDirData();
	
	this.ringChart.setOption(this.getPieOpt(arr,legends),true);
	this.ringChart.refresh();
	
	
	this.grid0[0].addJSONData(gridArr);
	
	if(gridArr!=null&&gridArr.length>0){
		var first=gridArr[0];
		var param=first.name;
		this.updateGridLv1(param,first["4G流量"]);
	}else{
		this.grid1[0].addJSONData([]);
		this.grid2[0].addJSONData([]);
	}
	
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.reloadPie=function(){
	var arr=[];
	var legends=[];
	var result=this.spDirDataCache;
	for(var i=0;i<result.length;i++){
		var record=result[i];
		var value=(record["4G流量"]/1024/1024).toFixed(2);
		legends.push(record.name);
		arr.push({value:value, name:record.name});
	}
	this.ringChart.setOption(this.getPieOpt(arr,legends),true);
	this.ringChart.refresh();
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.reInitPie=function(){
	require(['echarts','echarts/chart/pie'],function(ec){
		this.ringChart=ec.init($("#ringChart")[0]);
		this.reloadPie();
	}.bind(this));
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.getPieOpt=function(pieData,legends){
	var option = {
			color:['#1790cf','#99d2dd','#88b0bb','#038cc4','#75abd0','#1790cf','#1bb2d8','#afd6dd','#1c7099','#5cc6e0'],
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		    	show:true,
		    	orient:'vertical',
		    	x:'right',
		    	y:'center',
		    	textStyle:{color:'#ffffff'},
		    	data:legends
		    },
		    toolbox: {
		        show : false
		    },
		    calculable : false,
		    series : [
		        {
		            name:'流量',
		            type:'pie',
		            minAngle:10,
		            radius : ['0%', '40%'],
		            itemStyle : {
		                normal : {
		                    label : {
		                        show : true,
		                        position : 'outer',
		                        formatter:'{d}%\n{b}',
		                        textStyle : {
		                        	color:'#ffffff',
		                        	baseline:'middle',
		                            fontSize : '18',
		                            fontWeight : 'normal'
		                        }
		                    },
		                    labelLine : {
		                        show : true
		                    }
		                },
		                emphasis : {
		                    label : {
		                        show : false,
		                        position : 'center',
		                        textStyle : {
		                            fontSize : '30',
		                            fontWeight : 'normal'
		                        }
		                    }
		                }
		            },
		            data:pieData
		        }
		    ]
		};
	return option;
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.updateLine=function()
{
	var timeType=this.getTimeType();
	var format="yyyy-MM-dd hh:mm:ss";
	var params={};
	if(timeType=="hour"){
		params={
				majorName:this.videoMajorKey,
				minor:this.videoMajorKey+":"+this.videoMinorKey,
				granularity:60,
				timeBegin:SUtils.getDiffDateTimeFromNow(-23,SUtils.TIME_TYPE.HOUR,format),
			 	timeEnd:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
			};
	}else{
		params={
				majorName:this.videoMajorKey,
				minor:this.videoMajorKey+":"+this.videoMinorKey,
				timeBegin:SUtils.getDiffDateTimeFromNow(-6,SUtils.TIME_TYPE.HOUR,format),
			 	timeEnd:SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN,format)
			};
	}
	this.dm.getVideoMinorQualityTrend(params,this.lineDataHandler.bind(this));
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.lineDataHandler=function(result)
{
	this.lineCache=result;
	this.reloadLine();
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.reloadLine=function()
{
	this.lineChart.reinitEChart();
	this.lineChart.updateData(this.getLineChartOption(this.lineCache));
};
SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.getLineChartOption=function(list)
{
	var xArr=[];
	var dataArr=[];
	var dataArrCompare=[];
	var configLeft={icon:"selfprovince",name:"本省率",key:"4G本省率",unit:"%",rate:100,fixed:1,ymin:0,ymax:100,source:"网络质量"};
	var configRight={icon:"selfnet",name:"本网率",key:"4G本网率",unit:"%",rate:100,fixed:1,ymin:0,ymax:100,source:"网络质量"};
	for(var i=0;i<list.length;i++){
		var record=list[i];
		var time=record.time;
		var value=record[configLeft.key];
		var valueCompare=record[configRight.key];
		value=(value*configLeft.rate).toFixed(configLeft.fixed);
		valueCompare=(valueCompare*configRight.rate).toFixed(configRight.fixed);
		xArr.push(time.substring(11,16));
		dataArr.push(value);
		dataArrCompare.push(valueCompare);
	}
	
	
	
	var tipFormatter='{b0}<br/>'
	+configLeft.name+'：{c0} '+configLeft.unit+'<br/>'
	+configRight.name+'：{c1} '+configRight.unit+'<br/>';
	var option = {
			color:['#8db8ff','#3ca2ff','#7B68EE'],
		    legend: {
		        data:[configLeft.name,configRight.name],
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
		            max:100,
		            min:0
		        }
		    ],
		    series : [
		        {
		            name:configLeft.name,
		            type:'line',
		            data:dataArr,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:2},areaStyle: {type: 'default'}}}
		        },{
		            name:configRight.name,
		            type:'line',
		            data:dataArrCompare,
		            smooth:true,
		            itemStyle:{normal:{lineStyle:{width:2},areaStyle: {type: 'default'}}}
		        }
		    ]
		};
	
	return option;
};


SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.updateGridLv0=function()
{
	
};

SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.updateGridLv1=function(param,total)
{
	$("#title1").text("IP归属-"+param);
	var timeType=this.getTimeType();
	this.dm.getVideoSpDirList({majorName:this.videoMajorKey,sortKey:this.sortKey,spsystem:param,type:'sphomes',timeType:timeType},this.gridLv1DataHandler.bind(this),null,{spsystem:param,total:total});
};

SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.updateGridLv2=function(param,total)
{
	$("#title2").text("流向IP地址分析-"+param);
	var timeType=this.getTimeType();
	this.dm.getVideoSpDirList({majorName:this.videoMajorKey,sortKey:this.sortKey,sphome:param,type:'sphome-spips',timeType:timeType},this.gridLv2DataHandler.bind(this),null,{sphome:param,total:total});
};

SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.gridLv1DataHandler=function(result,echoData)
{
	var gridArr=result;
	if(gridArr!=null&&gridArr.length>0){
		var first=gridArr[0];
		var param=first.name;
		for(var i=0;i<gridArr.length;i++){
			gridArr[i].selfpercent=(gridArr[i]["4G流量"]/echoData.total*100).toFixed(2);
			if(isNaN(gridArr[i].selfpercent)){
				gridArr[i].selfpercent="--";
			}
		}
		this.grid1[0].addJSONData(gridArr);
		this.updateGridLv2(param,first["4G流量"]);
	}else{
		this.grid1[0].addJSONData([]);
		this.grid2[0].addJSONData([]);
	}
};

SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.gridLv2DataHandler=function(result,echoData)
{
	var gridArr=result;
	if(gridArr!=null&&gridArr.length>0){
		for(var i=0;i<gridArr.length;i++){
			gridArr[i].sphome=echoData.sphome;
			gridArr[i].selfpercent=(gridArr[i]["4G流量"]/echoData.total*100).toFixed(2);
			if(isNaN(gridArr[i].selfpercent)){
				gridArr[i].selfpercent="--";
			}
		}
	}
	this.grid2[0].addJSONData(result);
};

SHVIDEOSCREEN.FlowAnalysisDrllPage.prototype.getAllKpis=function(){
	var list=[];
	var total=this.allKpis;
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