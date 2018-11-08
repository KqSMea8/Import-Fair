var METRO_HOTSPOT="地铁";
var stationTypeMap={};
var stationUponGroundMap={};
var currentKpi="高客流";
var currentKpiKey="总用户数";
var currentOrder="desc";
var currentInterfaceType=null;
var currentKpiData=[];

var intervalKey=0;
var selectedTime=null;
var timeType=null;
var timeRecorMap={};
var allTimeRecorMap={};
var videoIntervalKey=0;
var currentTimeIndex=0;
var resultCount=0;
var playTimeArr=[];
var firstTime=true;
var ws=null;

var lineIndexToLegendIndex={
	1:0,
	2:1,
	3:2,
	4:3,
	5:4,
	6:5,
	7:6,
	8:7,
	9:8,
	10:9,
	11:10,
	12:11,
	13:12,
	16:13,
	17:14
};
function handler_initPage(){
	try{
		ws = new WebSocket(LSMConsts.wsUrl);
		ws.onopen = onOpen;
		ws.onmessage = onMessage;
		ws.onerror = onError;
	    ws.onclose = onClose;
	}catch(e){
		console.log(e.toString());
	}
	
    
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMetroLineStationCellType({},cellTypeDataHandler);
	
	$(".kpiSpan").on('click',circleKpiChange);
	$("#zoomBtn").on('click',changeMetroSize);
	$("#ctrlBtn").on('click',ctrlPlay);
	cacheTimeDataLine();//新接口查曲线
}

function onOpen(){
	console.log("websocket opened");
	if(ws) ws.send("role:reciever");
}
function onMessage(event){
	var message=event.data;
	if(message=="play"){
		play();
	}else if(message=="pause"){
		pause();
	}else if(message.indexOf("updateUserCircleCache:")!=-1){
		var kpiLabel=message.split(":")[1];
		updateUserCircleCache(kpiLabel);
	}
}
function onError(event){
	
}
function onClose(event){
	
}


function ctrlPlay(evt){
	if($("#ctrlBtn").hasClass("play")){
		play();
		if(ws) ws.send("play");
	}else if($("#ctrlBtn").hasClass("pause")){
		pause();
		if(ws) ws.send("pause");
	}
}
function pause(){
	if($("#ctrlBtn").hasClass("pause")){
		$("#ctrlBtn").removeClass("play");
		$("#ctrlBtn").removeClass("pause");
		$("#ctrlBtn").addClass("play");
		clearInterval(videoIntervalKey);
		restartInterval();
	}
}
function play(){
	if($("#ctrlBtn").hasClass("play")){
		$("#ctrlBtn").removeClass("play");
		$("#ctrlBtn").removeClass("pause");
		$("#ctrlBtn").addClass("pause");
		stopInterval();
		cacheTimeDataNew();
		startPlay();
	}
}
function cacheTimeDataLine(){
	timeRecorMap=null;
	allTimeRecorMap=null;
	timeRecorMap={};
	allTimeRecorMap={};
	var format="yyyy-MM-dd hh:mm:00";
	var format0="yyyy-MM-dd 05:00:00";
	var timeBegin=SUtils.getNowDateTime(format0);
	var timeEnd=SUtils.getNowDateTime(format);
	var beginDate=null;
	if(timeType=="day"){
		beginDate = new Date(selectedTime.replace(/-/g,"/") );
		beginDate.setDate(beginDate.getDate()-30);
		timeBegin=beginDate.Format("yyyy-MM-dd 00:00:00");
		timeEnd=selectedTime;
	}else if(timeType=="month"){
		beginDate = new Date(selectedTime.replace(/-/g,"/") );
		beginDate.setMonth(beginDate.getMonth()-12);
		timeBegin=beginDate.Format("yyyy-MM-01 00:00:00");
		timeEnd=selectedTime;
	}
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMetroAllStationKpiTrend({timeBegin:timeBegin,timeEnd:timeEnd,timeType:timeType},function(stationResult){
		dm.getMetroAllKpiTrend({timeBegin:timeBegin,timeEnd:timeEnd,timeType:timeType},function(allResult){
			cacheTimeDataFirst(stationResult,SUtils.convertRecordMetroAvg(allResult));
		});
	});
}
function cacheTimeDataFirst(result,allResult){
	console.log("play data ready");
	timeRecorMap=result;
	allTimeRecorMap=allResult;
}
function cacheTimeDataNew(){
	playTimeArr=[];
//	timeRecorMap={};
	resultCount=0;
	currentTimeIndex=0;
//	$('.progressbar').css("display","block");
//	$('#ctrlMask').css("display","block");
	var lag=1;
	var videoTime=null;
	var format="yyyy-MM-dd hh:mm:00";
	var format0="yyyy-MM-dd 05:00:00";
	var startTime=SUtils.getNowDateTime(format0);
	if(timeType=="day"){
		format="yyyy-MM-dd 00:00:00";
		startTime=SUtils.getDiffDateTimeFromNow(-30,SUtils.TIME_TYPE.DATE, format);
		while(lag>0){
			if(videoTime==null){
				videoTime=startTime;
			}else{
				var lastDate = new Date(videoTime.replace(/-/g,"/") );
				lastDate.setDate(lastDate.getDate()+1);
				videoTime=lastDate.Format(format);
				var finalTime=SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.DATE, format);
				var finalDate = new Date(finalTime.replace(/-/g,"/") );
				lag=finalDate.getTime()-lastDate.getTime();
			}
			playTimeArr.push(videoTime);
		}
	}else if(timeType=="month"){
		format="yyyy-MM-01 00:00:00";
		startTime=SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.YEAR, format);
		while(lag>0){
			if(videoTime==null){
				videoTime=startTime;
			}else{
				var lastDate = new Date(videoTime.replace(/-/g,"/") );
				lastDate.setMonth(lastDate.getMonth()+1);
				videoTime=lastDate.Format(format);
				var finalTime=SUtils.getDiffDateTimeFromNow(-1,SUtils.TIME_TYPE.MONTH, format);
				var finalDate = new Date(finalTime.replace(/-/g,"/") );
				lag=finalDate.getTime()-lastDate.getTime();
			}
			playTimeArr.push(videoTime);
		}
	}else{
		while(lag>0){
			if(videoTime==null){
				videoTime=startTime;
			}else{
				var lastDate = new Date(videoTime.replace(/-/g,"/") );
				lastDate.setMinutes(lastDate.getMinutes()+5);
				videoTime=lastDate.Format(format);
				var finalTime=SUtils.getDiffDateTimeFromNow(LSMScreen.DataManager.minBack,SUtils.TIME_TYPE.MIN, format);
				var finalDate = new Date(finalTime.replace(/-/g,"/") );
				lag=finalDate.getTime()-lastDate.getTime();
			}
			playTimeArr.push(videoTime);
		}
	}
	
	updateUserCircleLoop(playTimeArr);
}
function showNextCircleData(){
	if(currentTimeIndex<playTimeArr.length){
		var time=playTimeArr[currentTimeIndex];
		if(timeRecorMap[time]!=null){
			var showTime="";
			if(timeType=="day"){
				showTime=time.substring(5,10);
			}else if(timeType=="month"){
				showTime=time.substring(5,7)+"月";
			}else{
				showTime=time.substring(11,16);
			}
			$("#timeSpan").text(showTime);
			redrawCircle(timeRecorMap[time],allTimeRecorMap[time]);
			currentTimeIndex++;
		}
	}else{
		clearInterval(videoIntervalKey);
		pause();
	}
}
function changeMetroSize(evt){
	if($("#zoomBtn").hasClass("toFullScreen")){
		$("#zoomBtn").removeClass("toFullScreen");
		$("#zoomBtn").removeClass("toNormal");
		$("#zoomBtn").addClass("toNormal");
		parent.changeMetroSize(true);
		$("#rankChartWin").css("display","block");
	}else if($("#zoomBtn").hasClass("toNormal")){
		$("#zoomBtn").removeClass("toFullScreen");
		$("#zoomBtn").removeClass("toNormal");
		$("#zoomBtn").addClass("toFullScreen");
		parent.changeMetroSize(false);
		$("#rankChartWin").css("display","none");
	}
}
function circleKpiChange(evt){
	var kpiLabel=$(evt.currentTarget).text();
	updateUserCircleCache(kpiLabel);
	if(ws) ws.send("updateUserCircleCache:"+kpiLabel);
}
function updateUserCircleLoop(timeArr){
	for(var i=0;i<timeArr.length;i++){
		var time=timeArr[i];
		if(timeRecorMap[time]==null){
			useInterface(currentKpiKey,currentOrder,time,currentInterfaceType,cacheCircleData);
		}
	}
}
function cacheCircleData(result,noUse,paramTime){
	if(result!=null&&result.length>0){
		
		timeRecorMap[result[0].time]=result;
		
	}else{
		timeRecorMap[paramTime]=[];
	}
//	resultCount++;
//	var dataperc=resultCount/playTimeArr.length*100;
//	var barperc = Math.round(dataperc*5.56);
//	console.log("dataperc:"+dataperc);
//	if(dataperc<10){
//		$('.progressbar').find('.bar').animate({width:barperc}, dataperc*25); 
//	}else if(dataperc==100){
//		$('.progressbar').find('.bar').animate({width:barperc}, dataperc*25); 
//		setTimeout(startPlay,1000);
//	}else if(Math.floor(dataperc)==80){
//		$('.progressbar').find('.bar').animate({width:barperc}, dataperc*25); 
//	}else if(Math.floor(dataperc)==60){
//		$('.progressbar').find('.bar').animate({width:barperc}, dataperc*25); 
//	}else if(Math.floor(dataperc)==40){
//		$('.progressbar').find('.bar').animate({width:barperc}, dataperc*25); 
//	}else if(Math.floor(dataperc)==20){
//		$('.progressbar').find('.bar').animate({width:barperc}, dataperc*25); 
//	}
}
function startPlay(){
	if($("#ctrlBtn").hasClass("pause")){
//		$('.progressbar').css("display","none");
//		$('#ctrlMask').css("display","none");
		clearInterval(videoIntervalKey);
		videoIntervalKey=setInterval(showNextCircleData, 1000);
	}
}
function updateUserCircle(){
	useInterface(currentKpiKey,currentOrder,selectedTime,currentInterfaceType,redrawCircle);
}

function useInterface(sortKey,order,time,interfaceType,callback){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMetroStationKpiRankMultiType({
		sortKey:sortKey,num:10000,order:order,time:time,timeType:timeType,
		interfaceType:interfaceType},function(stationResult){
			dm.getHotSpotsKpis(["地铁"],time,timeType,function(allResult){
					callback(stationResult,SUtils.convertRecordMetroAvg(allResult["地铁"]),time);
				}
			);
		});
}

function updateUserCircleCache(keyLabel){
	 $(".kpiSpan").each(function(){
		 $(this).removeClass("kpiSpanSelected");
		 if($(this).text()==keyLabel){
			 $(this).addClass("kpiSpanSelected");
		 }
	 });
	var flag=keyLabel=="高客流"||keyLabel=="低活跃"||keyLabel=="高进出";
	if(flag){
		$("#ctrlBtn").css("display","inline-block");
	}else{
		pause();
		$("#ctrlBtn").css("display","none");
	}
	switch(keyLabel){
		case "高客流":
			currentKpi=keyLabel;
			currentKpiKey="总用户数";
			currentOrder="desc";
			currentInterfaceType=null;
			break;
		case "低流量":
			currentKpi=keyLabel;
			currentKpiKey="总流量";
			currentOrder="asc";
			currentInterfaceType=null;
			break;
		case "低速率":
			currentKpi=keyLabel;
			currentKpiKey="下行速率500k";
			currentOrder="asc";
			currentInterfaceType=null;
			break;
		case "低感知":
			currentKpi=keyLabel;
			currentKpiKey="TCP掉线率";
			currentOrder="desc";
			currentInterfaceType=null;
			break;
		case "低活跃":
			currentKpi=keyLabel;
			currentKpiKey="4G用户数比例";
			currentOrder="asc";
			currentInterfaceType=null;
			break;
		case "高进出":
			currentKpi=keyLabel;
			currentKpiKey="进出站总用户数";
			currentOrder="desc";
			currentInterfaceType="inout";
			break;
		case "低4G流量比":
			currentKpi=keyLabel;
			currentKpiKey="4G流量比";
			currentOrder="asc";
			currentInterfaceType=null;
			break;
		case "低DOU":
			currentKpi=keyLabel;
			currentKpiKey="4G人均流量";
			currentOrder="asc";
			currentInterfaceType=null;
			break;
		case "高TAU":
			currentKpi=keyLabel;
			currentKpiKey="4G人均TAU次数";
			currentOrder="desc";
			currentInterfaceType=null;
			break;
		case "高时延":
			currentKpi=keyLabel;
			currentKpiKey="TCP时延";
			currentOrder="desc";
			currentInterfaceType=null;
			break;
		case "高掉线":
			currentKpi=keyLabel;
			currentKpiKey="TCP掉线率";
			currentOrder="desc";
			currentInterfaceType=null;
			break;
		case "移动低速率":
			currentKpi=keyLabel;
			currentKpiKey="下行速率500k";
			currentOrder="asc";
			currentInterfaceType="route";
			break;
		case "移动高TAU":
			currentKpi=keyLabel;
			currentKpiKey="4G人均TAU次数";
			currentOrder="desc";
			currentInterfaceType="route";
			break;
		case "移动高掉线":
			currentKpi=keyLabel;
			currentKpiKey="TCP掉线率";
			currentOrder="desc";
			currentInterfaceType="route";
			break;
			
		case "低话务":
			currentKpi=keyLabel;
			currentKpiKey="总话务量";
			currentOrder="asc";
			currentInterfaceType="ws";
			break;
		case "低MOU":
			currentKpi=keyLabel;
			currentKpiKey="MOU";//"（23G话务量+Volte话务量）/信令活跃用户数";
			currentOrder="asc";
			currentInterfaceType="wsandcommon";
			break;
		case "低接通":
			currentKpi=keyLabel;
			currentKpiKey="23G接通率TOP低站点";
			currentOrder="asc";
			currentInterfaceType="ws";
			break;
//		case "高掉话":
//			currentKpi=keyLabel;
//			currentKpiKey="23G掉话率TOP低站点";
//			currentOrder="desc";
//			break;
		case "低Volte话务":
			currentKpi=keyLabel;
			currentKpiKey="VOLTE语音话务量";
			currentOrder="asc";
			currentInterfaceType=null;
			break;
		case "低Volte接通":
			currentKpi=keyLabel;
			currentKpiKey="VOLTE语音接通率";
			currentOrder="asc";
			currentInterfaceType=null;
			break;
		case "高Volte掉话":
			currentKpi=keyLabel;
			currentKpiKey="VOLTE语音掉话率";
			currentOrder="desc";
			currentInterfaceType=null;
			break;
	}
	updateUserCircle();
}
function redrawCircle(result,allResult){
	if(result!=null&&result.length>0){
		var time=result[0].time;
		var showTime="";
		if(timeType=="day"){
			showTime=time.substring(5,10);
		}else if(timeType=="month"){
			showTime=time.substring(5,7)+"月";
		}else{
			showTime=time.substring(11,16);
		}
		$("#timeSpan").text(showTime);
	}
	currentKpiData=result;
	refreshMetroSwfCircle(result,allResult);
}
function refreshMetroSwfCircle(result,allResult){
	var reverseFlag=currentOrder=="asc";
	var maxRadius=45;
	switch(currentKpi){
		case "高客流":
			reverseFlag=false;
			maxRadius=45;
			break;
		case "低流量":
			reverseFlag=true;
			maxRadius=45;
			break;
		case "低速率":
			reverseFlag=true;
			maxRadius=45;
			break;
		case "低感知":
			reverseFlag=false;
			maxRadius=45;
			break;
		case "低活跃":
			reverseFlag=true;
			maxRadius=45;
			break;
		default:
			reverseFlag=false;
			maxRadius=45;
			break;
	} 
	var excludeArr=[];
	for(var i=0;i<result.length;i++){
		if(result[i][currentKpiKey]==0){
			continue;
		}
		if(currentKpi=="低活跃"){
			if(stationTypeMap[result[i].station]=="4g"){
				excludeArr.push(result[i]);
			}
		}else{
			excludeArr.push(result[i]);
		}
		
	}
	result=excludeArr;
	
	if(currentOrder=="asc"){//升序
		result=result.sort(function(a,b){return a[currentKpiKey]-b[currentKpiKey];});
	}else{
		result=result.sort(function(a,b){return b[currentKpiKey]-a[currentKpiKey];});//降序
	}
	NS_SW_UPDATECHART(result,allResult,currentKpi,currentKpiKey,reverseFlag,maxRadius,20);
}

function restartInterval(){
	updateUserCircle();
	intervalKey=setInterval(updateUserCircle, 5*60*1000);
}
function stopInterval(){
	clearInterval(intervalKey);
}

function cellTypeDataHandler(result){
	for(var line in result){
		var lineMap=result[line];
		for(var station in lineMap){
			var record=lineMap[station];
			if(!isNaN(record["4G"])&&record["4G"]>0){
				stationTypeMap[station]="4g";
			}else{
				stationTypeMap[station]="3g";
			}
		}
	}
	
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMetroLineStationUpDown({},stationUpDownHandler);
	
}
function stationUpDownHandler(result){
	for(var line in result){
		var lineMap=result[line];
		for(var station in lineMap){
			var type=lineMap[station];
			if(type=="地面"||type=="高架"){
				stationUponGroundMap[station]=true;
			}
		}
	}
	initPage();
}

function getSimpleChartOption(series,xArr,legends,tipFormatter){
	if(tipFormatter==null){
		tipFormatter='{b0}<br/>{c0}';
	}
	var option = {
			color:['#fced00'],
		    legend: {
		        data:legends,
		        textStyle :
        		{
		        	color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.8*0.7
        		},
		    },
			grid:{
		    	borderWidth:0,
		    	x:100,
		    	y:50,
		    	x2:50,
		    	y2:10
		    },
		    tooltip : {
		        trigger: 'axis',
		        formatter:tipFormatter
		    },
		    calculable : false,
		    xAxis : [
		        {
		            type : 'value',
		            axisLabel : {
		            	show:false,
		            	textStyle :
		            		{
			            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
			            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.8
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
		            formatter: '{value}'
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            axisLabel : {
		            	textStyle :
		            		{
		            		color:LSMScreen.CHARTCONFIG.xAxisLabelColor,
		            		fontSize:LSMScreen.CHARTCONFIG.axisLabelSize*0.8
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
		            min:0,
		            data : xArr
		        }
		    ],
		    series : series,
		};
	return option;
};
////js与flex版区别部分
function handler_stationClick(t){
//	t:上海市|地铁X号线|XX站
	var lineIndex=t.split("|")[1].replace("地铁","").replace("号线","");
	var station=t.split("|")[2];
	var detail=new KpiComponent.DetailQuery();
	detail.selectedTime=selectedTime;
	detail.timeType=timeType;
	detail.STATION=station;
	detail.LINE_INDEX=lineIndex;
	detail.showStationKpi();
}
function NS_SW_UPDATECHART(result,allResult,kpi,kpiKey,reverseFlag,maxRadius,maxCount){
	_getFlaObj() && _getFlaObj().NS_SW_setUserMap && _getFlaObj().NS_SW_setUserMap(result,kpiKey,reverseFlag,maxRadius,maxCount);
	try{
		parent.updateRankChart(kpi,kpiKey,result,allResult);
	}catch(e){
		console.log("父页面没有updateRankChart");
	}
	updateRankChart(kpi,kpiKey,result,allResult);
};
function NS_SW_resetHighlightLine(){
	_getFlaObj() && _getFlaObj().NS_SW_resetHighlightLine && _getFlaObj().NS_SW_resetHighlightLine();
}
function NS_SW_setHighlightLine(lineIndex){
	_getFlaObj() && _getFlaObj().NS_SW_setHighlightLine && _getFlaObj().NS_SW_setHighlightLine(lineIndexToLegendIndex[lineIndex]);
}
function handler_swfloaded(){
	_getFlaObj() && _getFlaObj().NS_SW_setCity && _getFlaObj().NS_SW_setStationTypeMap(stationTypeMap);
	_getFlaObj() && _getFlaObj().NS_SW_setCity && _getFlaObj().NS_SW_setStationUponGroundMap(stationUponGroundMap);
	_getFlaObj() && _getFlaObj().NS_SW_setCity && _getFlaObj().NS_SW_setCity(getSubXml());
	restartInterval();
}
function NS_SW_chooseLineBySwf(legendIndex){
	for(var key in lineIndexToLegendIndex){
		if(lineIndexToLegendIndex[key]==legendIndex){
			var lineIndex=key;
			try{
				parent.NS_SW_chooseLineBySwf(lineIndex);
			}catch(e){
				console.log("parent.NS_SW_chooseLineBySwf failed");
			}
			break;
		}
	}
}
