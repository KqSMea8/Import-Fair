var KpiComponent = KpiComponent || {};

KpiComponent.DetailQuery=function(){
	
};
KpiComponent.DetailQuery.prototype.streamData;
KpiComponent.DetailQuery.prototype.wsData;
KpiComponent.DetailQuery.prototype.STATION;
KpiComponent.DetailQuery.prototype.LINE_INDEX;
KpiComponent.DetailQuery.prototype.LINE_NAME;
KpiComponent.DetailQuery.prototype.selectedTime;
KpiComponent.DetailQuery.prototype.timeType;
KpiComponent.DetailQuery.comp=null;

KpiComponent.DetailQuery.prototype.showStationKpi=function(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMetroStationsKpi({line:this.LINE_INDEX,time:this.selectedTime,timeType:this.timeType},this.streamDataHandler.bind(this));
};
KpiComponent.DetailQuery.prototype.showLineKpi=function(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getHotSpotsKpis([this.LINE_NAME],null,null,this.streamLineDataHandler.bind(this));
};
KpiComponent.DetailQuery.prototype.streamLineDataHandler=function(data){
	this.streamData=data[this.LINE_NAME];
	if(KpiComponent.DetailQuery.comp!=null){
		KpiComponent.DetailQuery.comp.close();
		KpiComponent.DetailQuery.comp=null;
	}
	KpiComponent.DetailQuery.comp=new KpiComponent.CellDetail(this.wsData,this.streamData,this.STATION,this.LINE_INDEX);
};
KpiComponent.DetailQuery.prototype.streamDataHandler=function(data){
	this.streamData=data[this.STATION];
	if(KpiComponent.DetailQuery.comp!=null){
		KpiComponent.DetailQuery.comp.close();
		KpiComponent.DetailQuery.comp=null;
	}
	KpiComponent.DetailQuery.comp=new KpiComponent.CellDetail(this.wsData,this.streamData,this.STATION,this.LINE_INDEX,this.timeType);
};



KpiComponent.CellDetail=function (wsData,streamData,title,lineIndex,timeType)
{
	this.timeType=timeType;
	this.CELLTYPE="4g";
	var all=LSMConsts.kpis;
	var map={};
	for(var i=0;i<all.length;i++){
		var record=all[i];
		if(record.source!=LSMConsts.kpiSourceStreamDay){
			map[record.kpiFullName]=record;
		}
		
	}
	this.kpiConfigMap=map;
	this.showRecordAllKpis(wsData,streamData,title,lineIndex);
};
KpiComponent.CellDetail.prototype.kpiWin=null;
KpiComponent.CellDetail.prototype.trendWin=null;
KpiComponent.CellDetail.prototype.cols=[
  	{colName:'热点名称',name : 'hot_name',index : 'hot_name',width : KpiComponent.CellDetail.baseKpiColWidth},
  	{colName:'总用户数',name : '总用户数',index : '总用户数',width : KpiComponent.CellDetail.baseKpiColWidth,unit:'人',source:LSMConsts.kpiSourceStream}
  ];
  KpiComponent.CellDetail.prototype.cols_2=[
                                        	{colName:'热点名称',name : 'hot_name',index : 'hot_name',width : KpiComponent.CellDetail.baseKpiColWidth}
                                        ];

  KpiComponent.CellDetail.prototype.cols2g=[{colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 300},
                                          	{colName:'总用户数',name : '总用户数',index : '总用户数',width : KpiComponent.CellDetail.baseKpiColWidth,unit:'人',source:LSMConsts.kpiSourceStream}
  ];

  KpiComponent.CellDetail.prototype.cols2g_2=[
                                              {colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 300},
                                          	{colName:'总用户数',name : '总用户数',index : '总用户数',width : KpiComponent.CellDetail.baseKpiColWidth,unit:'人',source:LSMConsts.kpiSourceStream}
  ];

  KpiComponent.CellDetail.prototype.cols3g=[
                                          	{colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 300},
                                          	{colName:'总用户数',name : '总用户数',index : '总用户数',width : KpiComponent.CellDetail.baseKpiColWidth,unit:'人',source:LSMConsts.kpiSourceStream}
  ];
  KpiComponent.CellDetail.prototype.cols3g_2=[
                                          	{colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 300},
                                          	{colName:'总用户数',name : '总用户数',index : '总用户数',width : KpiComponent.CellDetail.baseKpiColWidth,unit:'人',source:LSMConsts.kpiSourceStream}
  ];
  KpiComponent.CellDetail.prototype.cols4g=[
                                          	{colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 300},
                                          	{colName:'总用户数',name : '总用户数',index : '总用户数',width : KpiComponent.CellDetail.baseKpiColWidth,unit:'人',source:LSMConsts.kpiSourceStream}
  ];
  KpiComponent.CellDetail.prototype.cols4g_2=[
                                          	{colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 300},
                                          	{colName:'总用户数',name : '总用户数',index : '总用户数',width : KpiComponent.CellDetail.baseKpiColWidth,unit:'人',source:LSMConsts.kpiSourceStream}
  ];

KpiComponent.CellDetail.prototype.showRecordAllKpis=function(wsData,streamData,station,lineIndex){
	this.STATION=station;
	this.LINE_INDEX=lineIndex;
	var time=streamData.time;
	if(time!=null&&time.length>16){
		var showTime="";
		if(this.timeType=="day"){
			showTime=time.substring(5,10);
		}else if(this.timeType=="month"){
			showTime=time.substring(5,7)+"月";
		}else{
			showTime=time.substring(11,16);
		}
	}
	if(station==null) station="";
	var titleHtml='<span class="commonText" style="padding:5px 15px 5px 15px;background:'+LSMConsts.metroLineColorMap[lineIndex]+'">'+lineIndex+"号线"+'</span>&nbsp&nbsp&nbsp&nbsp'+station+'&nbsp&nbsp&nbsp&nbsp<span class="drillLineDetailTime">'+showTime+'</span>';
	
	var cols1=this.getColList();
	var cols2=[];//this.getColList2();
	var rowData=$.extend(wsData,streamData);
	rowData=this.processRecordData(rowData,true);
	var i=0;
	var kpiHtmls="";
	var kpiMap={};
	var record;
//	{colName:'小区名称',name : 'cell_name',index : 'cell_name',width : 300},
	for(i=1;i<cols1.length;i++){
		record=cols1[i];
		kpiMap[record.index]=true;
		var kpiId=record.index;
		var tmp=kpiId.split(",");
		var value=0;
		var allNaN=true;
		for(var j=0;j<tmp.length;j++){
			if(!isNaN(rowData[tmp[j]])){
				value+=parseFloat(rowData[tmp[j]]);
				allNaN=false;
			}
		}
		if(allNaN){
			value=null;
		}
		kpiHtmls+=this.getKpiDivTemplate(record.colName,value,record.unit,record.index,record.source);
	}
	for(i=1;i<cols2.length;i++){
		record=cols2[i];
		if(!kpiMap[record.index]){
			var kpiId=record.index;
			var tmp=kpiId.split(",");
			var value=0;
			var allNaN=true;
			for(var j=0;j<tmp.length;j++){
				if(!isNaN(rowData[tmp[j]])){
					value+=parseFloat(rowData[tmp[j]]);
					allNaN=false;
				}
			}
			if(allNaN){
				value=null;
			}
			kpiHtmls+=this.getKpiDivTemplate(record.colName,value,record.unit,record.index,record.source);
		}
	}
	var contentHtml='<div class="KPT_marginB">'+kpiHtmls+'</div>';
	
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=940;
	var winHeight=600;
	this.kpiWin=new LSMScreen.Window({
		title:titleHtml,
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){
		}.bind(this)
	});
	
	$(this.kpiWin.content).html(contentHtml);
	$(this.kpiWin.content).css("overflow","auto");
};
KpiComponent.CellDetail.prototype.close=function(){
	if(this.kpiWin!=null){
		this.kpiWin.closeWin();
		this.kpiWin=null;
	}
	if(this.trendWin!=null){
		this.trendWin.closeWin();
		this.trendWin=null;
	}
};
KpiComponent.CellDetail.prototype.getColList=function(){
	var cols=this.cols;
	var cellType=this.CELLTYPE;
	var result=[];
	switch(cellType){
		case "4g":
			cols=this.cols4g;
			break;
		case "3g":
			cols=this.cols3g;
			break;
		case "2g":
			cols=this.cols2g;
			break;
		default:
			cols=this.cols4g;
			break;
	}
	result=this.fillCols(cols, LSMConsts.kpiSourceStream,cellType);
	return result;
};
KpiComponent.CellDetail.prototype.getColList2=function(){
	var cols=this.cols_2;
	var cellType=this.CELLTYPE;
	var result=[];
	switch(cellType){
		case "4g":
			cols=this.cols4g_2;
			break;
		case "3g":
			cols=this.cols3g_2;
			break;
		case "2g":
			cols=this.cols2g_2;
			break;
		default:
			cols=this.cols4g_2;
			break;
	}
	result=this.fillCols(cols, LSMConsts.kpiSourceWs,cellType);
	return result;
};

KpiComponent.CellDetail.prototype.fillCols=function(baseCols,source,neType){
	var result=[];
	var existMap={};
	var all=LSMConsts.kpis;
	var i=0;
	var record;
	var kpiKey;
	for(i=0;i<baseCols.length;i++){
		record=baseCols[i];
		record.sortable=true;
		kpiKey=record.index;
		existMap[kpiKey]=true;
		result.push(record);
	}
	
	for(i=0;i<all.length;i++){
		var record=all[i];
		kpiKey=record.kpiFullName;
		if(record.source==source&&!existMap[kpiKey]){
			if(neType!=null&&record.neType!=neType&&record.neType!="all"){
				continue;
			}
			result.push({
				colName:record.kpiName+'('+record.unit+')',
				name : kpiKey,
				index : kpiKey,
				width : KpiComponent.CellDetail.baseKpiColWidth,
				unit: record.unit,
				sortable:true,
				source:source
			});
		}
	}
	return result;
};

KpiComponent.CellDetail.prototype.getKpiDivTemplate=function(kpiName,value,unit,kpiId,source){
	if(isNaN(value)||value==""){
//		return "";
		value="--";
	}
	var addClass="KPI_blue";
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
	var divStr='<div class="indicators KPI KPT_marginR" style="cursor:pointer;overflow:hidden;" onclick="drillTrend(\''+kpiName+'\',\''+kpiId+'\',\''+source+'\',\''+this.STATION+'\',\''+this.LINE_INDEX+'\');">'
		+'<div class=""></div>'
		+'<div class="KPI_top">'
		+'<h2 class="KPI_bluetxt" title="'+value+'">' + value + '</h2><div class="KPIUnit">' + unit +'</div>'
		+'</div>'
		+'<div class="KPI_down '+addClass+'">'+kpiName+'</div>'
		+'</div>';
	return divStr;
};

//对数据进行处理 换算 格式化等
KpiComponent.CellDetail.prototype.processRecordData=function(record,isCell){
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
		var colKey=col.name;//指标ID
		var config=this.kpiConfigMap[colKey];
		var sum=record[colKey];
		if(config!=null){
			sum=0;
			var tmp=colKey.split(",");
			for(var i=0;i<tmp.length;i++){
				if(!isNaN(record[tmp[i]])){
					sum+=parseFloat(record[tmp[i]]);
				}
			}
			if(isNaN(sum)){
				sum="";
			}else{
				sum=(sum*config.rate).toFixed(config.fixed);
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

function drillTrend(kpiName,kpiId,source,station,lineIndex){
	var docWidth=$(document).width();
	var docHeight=$(document).height();
	var winWidth=docWidth*0.8;
	var winHeight=docHeight*0.8;
	var titleHtml='<span class="commonText" style="padding:5px 15px 5px 15px;background:'+LSMConsts.metroLineColorMap[lineIndex]+'">'
	+lineIndex+"号线"
	+'</span>'
	+'&nbsp&nbsp&nbsp&nbsp'+station+'&nbsp&nbsp&nbsp&nbsp'+kpiName;
	if(this.trendWin!=null){
		this.trendWin.closeWin();
		this.trendWin=null;
	}
	this.trendWin=new LSMScreen.Window({
		title:titleHtml,
		width:winWidth,
		height:winHeight,
		x:(docWidth-winWidth)*0.5,
		y:(docHeight-winHeight)*0.5,
		beforeClose:function(){
		}.bind(this)
	});
	
	var kpiconfig={};
	var all=LSMConsts.kpis;
	for(var i=0;i<all.length;i++){
		var record=all[i];
		if(record.source==source&&record.kpiFullName==kpiId){
			kpiconfig=record;
			break;
		}
	}
	
	var chartDom=this.trendWin.content;
	var chart=new LSMScreen.SimpleChart(chartDom,{},function(){
		updateChart(kpiconfig);
	});
	
	function updateChart(kpiConfig){
		targetName=station;
		var timeBegin="";
		var timeEnd=selectedTime;
		var timeBeginCompare="";
		var timeEndCompare="";
		if(selectedTime==null){
			timeBegin=null;
			timeEnd=null;
			timeBeginCompare=null;
			timeEndCompare=null;
		}else{
			var selectedDate=new Date(selectedTime.replace(/-/g,"/") );
			if(timeType=="day"){
				selectedDate.setMonth(selectedDate.getMonth()-1);
				timeEndCompare=timeBegin=selectedDate.Format("yyyy-MM-dd 00:00:00");
				selectedDate.setMonth(selectedDate.getMonth()-1);
				timeBeginCompare=selectedDate.Format("yyyy-MM-dd 00:00:00");
			}else if(timeType=="month"){
				selectedDate.setFullYear(selectedDate.getFullYear()-1);
				timeEndCompare=timeBegin=selectedDate.Format("yyyy-MM-01 00:00:00");
				selectedDate.setFullYear(selectedDate.getFullYear()-1);
				timeBeginCompare=selectedDate.Format("yyyy-MM-01 00:00:00");
			}else if(timeType=="hour"){
				selectedDate.setDate(selectedDate.getDate()-1);
				timeEndCompare=timeBegin=selectedDate.Format("yyyy-MM-dd hh:00:00");
				selectedDate.setDate(selectedDate.getDate()-1);
				timeBeginCompare=selectedDate.Format("yyyy-MM-dd hh:00:00");
			}else{
				selectedDate.setHour(selectedDate.getHour()-3);
				timeBegin=selectedDate.Format("yyyy-MM-dd hh:mm:ss");
				selectedDate=new Date(selectedTime.replace(/-/g,"/") );
				selectedDate.setDate(selectedDate.getDate()-1);
				timeEndCompare=selectedDate.Format("yyyy-MM-dd hh:mm:ss");
				selectedDate.setHour(selectedDate.getHour()-3);
				timeBeginCompare=selectedDate.Format("yyyy-MM-dd hh:mm:ss");
			}
		}
		
		
		
		var dm=LSMScreen.DataManager.getInstance();
		dm.getStationKpisCompared({
			station:targetName,line:lineIndex,timeType:timeType,
			timeBegin:timeBegin,
			timeEnd:timeEnd,
			timeBeginCompare:timeBeginCompare,
			timeEndCompare:timeEndCompare
			},
				function(result){
			refreshCompareChart(kpiConfig, result,null,targetName);
		}.bind(this));
	}
	
	function refreshCompareChart(kpiConfig,resultList,allResult,targetName)
	{
		var target=targetName;
		var kpi=kpiConfig;
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
		var tmp;
		var markLine=getMarkLine(_selectedKpiName);
		$("#compareTitle").text(showName+"("+unit+")");
		if(targetIndex!=null){
			target=LSMConsts.hotspots[targetIndex];
		}
		var hasAll=source!=LSMConsts.kpiSourceStreamDay
							&&_selectedKpiName.indexOf('hwl')==-1
							&&_selectedKpiName.indexOf('用户数')==-1&&_selectedKpiName.indexOf('流量')==-1
							&&showName.indexOf('用户数')==-1&&showName.indexOf('流量')==-1;
		var tipFormatter="";
		if(hasAll){
			legends=['同比','当前','全网'];
			tipFormatter=target+'<br/>'
			+'{b}<br/>'
			+'{a0}:{c0}<br/>'
			+'{a1}:{c1}<br/>'
			+'{a2}:{c2}<br/>';
		}else{
			legends=['同比','当前'];
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
//			    	x:40,
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
			            name:'同比',
			            type:'line',
			            data:[],
			            markLine:markLine,
			            itemStyle:{normal:{lineStyle:{width:2}}}
			        },
			        {
			            name:'当前',
			            type:'line',
			            data:[],
			            itemStyle:{normal:{lineStyle:{width:2}}}
			        },
			        {
			            name:'全网',
			            type:'line',
			            data:[],
			            itemStyle:{normal:{lineStyle:{width:2}}}
			        }
			    ],
			};
		
		
		var currentDate=new Date();
		var pointDate;
		var ignoreLag=5*60*1000;
		var timeType=null;
		var lag=0;
		var list=[];
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
			}else if(showName=="核心区域累计用户数"){
				defaultSource=this.dayStreamTrendDataCore;
			}
			list=resultList==null?defaultSource:resultList;
			for ( i = list.length-1; i >=0; i--)
			{
				_data = list[i];
				tmp=_selectedKpiName.split(",");
				
				var value=0;
				var valueTb=0;
				for(j=0;j<tmp.length;j++){
					value+=parseFloat(list[i][tmp[j]]);
					valueTb+=(list[i][tmp[j]] / list[i][tmp[j] + "历史比"]);
				}
				if(isNaN(value)) continue;
				option.xAxis[0].data.push(list[i].time.substring(11, 16));
				pointDate=new Date(list[i].time.replace(/-/g,"/"));
				lag=currentDate-pointDate;
				if(lag>ignoreLag){
					option.series[0].data.push((valueTb*rate).toFixed(fixed));
					lastValue=(value*rate).toFixed(fixed);
					lastTime=list[i].time.substring(11, 16);
					option.series[1].data.push((value*rate).toFixed(fixed));
				}
			}
		}else if(source==LSMConsts.kpiSourceWs){
			list=resultList==null?_curTrafficFlows:resultList;
			for ( i = list.length-1; i >=0; i--)
			{
				_data = list[i];
				tmp=_selectedKpiName.split(",");
				
				var value=0;
				var valueTb=0;
				for(j=0;j<tmp.length;j++){
					var tbKey=tmp[j]+ "Tb";
					tbKey=tbKey.replace("DistTb", "TbDist");
					value+=parseFloat(list[i][tmp[j]]);
					valueTb+=parseFloat(list[i][tbKey]);
				}
				if(isNaN(value)) continue;
				option.xAxis[0].data.push(list[i].time.substring(11, 16));
				
				pointDate=new Date(list[i].time.replace(/-/g,"/"));
				lag=currentDate-pointDate;
				if(lag>ignoreLag){
					if(!isNaN(valueTb)){
						option.series[0].data.push((valueTb*rate).toFixed(fixed));
					}
					lastTime=list[i].time.substring(11, 16);
					lastValue=(value*rate).toFixed(fixed);
					option.series[1].data.push((value*rate).toFixed(fixed));
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
			for ( i = list.length-1; i >=0; i--)
			{
				_data = list[i];
				pointDate=new Date(list[i].time.replace(/-/g,"/"));
				lag=currentDate-pointDate;
				var time=list[i].time;
				var showTime="";
				if(this.timeType=="day"){
					showTime=time.substring(5,10);
				}else if(this.timeType=="month"){
					showTime=time.substring(5,7)+"月";
				}else{
					showTime=time.substring(11,16);
				}
				option.xAxis[0].data.push(showTime);
				if(lag>ignoreLag){
					var compareValue=((list[i][_selectedKpiName] / list[i][_selectedKpiName + "历史比"])*rate).toFixed(fixed);
					option.series[0].data.push(compareValue);
					lastTime=showTime;
					lastValue=(_data[_selectedKpiName]*rate).toFixed(fixed);
					option.series[1].data.push((list[i][_selectedKpiName]*rate).toFixed(fixed));
				}
				
			}
		}
		chart.reinitEChart();
		chart.updateData(option,true);
	};
	
	function getMarkLine(kpiId)
	{
		var markLine=null;
		var thresholsMap=LSMConsts.thresholsMap;
		if(thresholsMap[kpiId]!=null){
			var threshold=thresholsMap[kpiId];
			var unit=threshold.unit;
//			var level_3_threshold_left_value=SUtils.formatThresholdValueForCompare(threshold.level_3_threshold_left_value,unit);
			var level_3_threshold_right_value=SUtils.formatThresholdValueForCompare(threshold.level_3_threshold_right_value,unit);
//			var level_2_threshold_left_value=SUtils.formatThresholdValueForCompare(threshold.level_2_threshold_left_value,unit);
			var level_2_threshold_right_value=SUtils.formatThresholdValueForCompare(threshold.level_2_threshold_right_value,unit);
//			var level_1_threshold_left_value=SUtils.formatThresholdValueForCompare(threshold.level_1_threshold_left_value,unit);
			var level_1_threshold_right_value=SUtils.formatThresholdValueForCompare(threshold.level_1_threshold_right_value,unit);
			markLine={
	            data : [
//	                // 纵轴，默认
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
	
}

function showStationDetail(lineIndex,station){
	var detail=new KpiComponent.DetailQuery();
	detail.STATION=station;
	detail.LINE_INDEX=lineIndex;
	detail.showStationKpi();
}

