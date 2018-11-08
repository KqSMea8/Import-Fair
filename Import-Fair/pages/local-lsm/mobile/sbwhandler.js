var LSMScreen = LSMScreen || {};
var LSMConsts = LSMConsts || {};
LSMScreen.CHARTCONFIG={
	xAxisLabelColor:'#ffffff',
	yAxisLabelColor:'#ffffff',
	xAxisColor:'#013351',
	yAxisColor:'#013351',
	axisLabelSize:24,
	legendSize:18,
	labelSize:18
};
LSMConsts.wsUrl="ws://"+baseIp+":17080/LsmController/wssocket";
var stationTypeMap={};
var stationUponGroundMap={};
var currentKpi="高客流";
var currentKpiKey="总用户数";
var currentOrder="desc";
var currentInterfaceType=null;
var currentKpiData=[];

var intervalKey=0;
var selectedTime=null;
var timeRecorMap={};
var allTimeRecorMap={};
var videoIntervalKey=0;
var currentTimeIndex=0;
var resultCount=0;
var playTimeArr=[];
var firstTime=true;
var ws=null;

//JS地图初始化绘制完后调用
function subwayInited(){
	
	for(var line in STATION_NT_TYPE){
		var lineMap=STATION_NT_TYPE[line];
		for(var station in lineMap){
			var record=lineMap[station];
			if(!isNaN(record["4G"])&&record["4G"]>0){
				stationTypeMap[station]="4g";
			}else{
				stationTypeMap[station]="3g";
			}
		}
	}
	
	ws = new WebSocket(LSMConsts.wsUrl);
	ws.onopen = onOpen;
	ws.onmessage = onMessage;
	ws.onerror = onError;
    ws.onclose = onClose;
	
	$("#zoomBtn").on('click',changeMetroSize);
//	$("#kpiSelect").on('change',circleKpiChange);
	$(".kpiSpan").on('click',circleKpiChange);
	$("#ctrlBtn").on('click',ctrlPlay);
	cacheTimeDataLine();
}
function onOpen(){
	console.log("websocket opened");
	if(ws) ws.send("role:controller");
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
	var format="yyyy-MM-dd hh:mm:00";
	var format0="yyyy-MM-dd 05:00:00";
	var timeBegin=SUtils.getNowDateTime(format0);
	var timeEnd=SUtils.getNowDateTime(format);
	
	parent.getMetroAllStationKpiTrend({timeBegin:timeBegin,timeEnd:timeEnd},function(stationResult){
		parent.getMetroAllKpiTrend({timeBegin:timeBegin,timeEnd:timeEnd},function(allResult){
			cacheTimeDataFirst(stationResult,SUtils.convertRecordMetroAvg(allResult));
		});
	});
}
function cacheTimeDataFirst(result,allResult){
	console.log("play data ready");
	timeRecorMap=result;
	allTimeRecorMap=allResult;
	handler_swfloaded();
}
function cacheTimeDataNew(){
	playTimeArr=[];
	resultCount=0;
	currentTimeIndex=0;
	var lag=1;
	var videoTime=null;
	var count=0;
	while(lag>0){
		count++;
		var format="yyyy-MM-dd hh:mm:00";
		var format0="yyyy-MM-dd 05:00:00";
		var startTime=SUtils.getNowDateTime(format0);
		if(videoTime==null){
			videoTime=startTime;
		}else{
			var lastDate = new Date(videoTime.replace(/-/g,"/") );
			lastDate.setMinutes(lastDate.getMinutes()+5);
			videoTime=lastDate.Format(format);
			var finalTime=SUtils.getDiffDateTimeFromNow(-10,SUtils.TIME_TYPE.MIN, format);
			var finalDate = new Date(finalTime.replace(/-/g,"/") );
			lag=finalDate.getTime()-lastDate.getTime();
		}
		playTimeArr.push(videoTime);
	}
	updateUserCircleLoop(playTimeArr);
}
function showNextCircleData(){
	if(currentTimeIndex<playTimeArr.length){
		var time=playTimeArr[currentTimeIndex];
		if(timeRecorMap[time]!=null){
			redrawCircle(timeRecorMap[time],allTimeRecorMap[time]);
			currentTimeIndex++;
		}
	}else{
		clearInterval(videoIntervalKey);
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
function cacheCircleData(result){
	if(result!=null&&result.length>0){
		
		timeRecorMap[result[0].time]=result;
		
	}
}
function startPlay(){
	if($("#ctrlBtn").hasClass("pause")){
		clearInterval(videoIntervalKey);
		videoIntervalKey=setInterval(showNextCircleData, 1000);
	}
}
function updateUserCircle(){
	useInterface(currentKpiKey,currentOrder,selectedTime,currentInterfaceType,redrawCircle);
}

function useInterface(sortKey,order,time,interfaceType,callback){
	try{
		parent.getMetroStationKpiRankMultiType({sortKey:sortKey,num:10000,order:order,time:time,interfaceType:interfaceType},callback);
	}catch(e){
		console.log("useInterface err");
	}
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
			currentKpiKey="总用户数";
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
	//	case "高掉话":
	//		currentKpi=keyLabel;
	//		currentKpiKey="23G掉话率TOP低站点";
	//		currentOrder="desc";
	//		break;
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
		$("#timeSpan").text(time.substring(11,16));
	}
	currentKpiData=result;
	refreshMetroSwfCircle(result,allResult);
}
function refreshMetroSwfCircle(result,allResult){
	var reverseFlag=false;
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
	
	if(reverseFlag){//升序
		result=result.sort(function(a,b){return a[currentKpiKey]-b[currentKpiKey];});
	}else{
		result=result.sort(function(a,b){return b[currentKpiKey]-a[currentKpiKey];});//降序
	}
	
	NS_SW_setUserMap(result,currentKpiKey,reverseFlag,maxRadius,10);
	try{
		parent.updateRankChartSub(currentKpi,currentKpiKey,result,allResult);
	}catch(e){
		console.log("updateRankChartSub err");
	}
}
function timeLinePlayCallBack(time){
	$("#timeSpan").text(time.substring(11,16));
}
function NS_SW_setUserMap(arr,kpiKey,reverseFlag,maxRadius,maxCount){
	var map={};
	var max=0;
	var count=0;
	for(var i=0;i<arr.length;i++){
		var record=arr[i];
		if(!isNaN(record[kpiKey])){
			if(count<maxCount){
				map[record.station]=record[kpiKey];
			}
			max=Math.max(max,record[kpiKey]);
			count++;
		}
	}
	$(".stationBgCircleSelector").each(function(index,element){
		var station=$(element).attr("stationName");
		var value=map[station];
		if(!isNaN(value)){
			var ratio=value/max;
			if(reverseFlag){
				ratio=1-ratio;
			}
			var r=maxRadius*ratio;
			$(element).attr("fill","#ff0000");
			$(element).attr("rx",r);
			$(element).attr("ry",r);
		}else{
			$(element).attr("fill","white");
			$(element).attr("rx",7.5);
			$(element).attr("ry",7.5);
		}
	});
}
function handler_swfloaded(){
	restartInterval();
}

function restartInterval(){
	updateUserCircle();
	intervalKey=setInterval(updateUserCircle, 5*60*1000);
}
function stopInterval(){
	clearInterval(intervalKey);
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

//////////////

function handler_stationClick(t){
//	t:上海市|地铁X号线|XX站
	var lineIndex=t.split("|")[1].replace("地铁","").replace("号线","");
	var station=t.split("|")[2];
	try{
		parent.showKpiComponent(lineIndex,station);
	}catch(e){
		console.log("handler_stationClick err");
	}
}
function NS_SW_setHighlightLine(lineIndex){
	setHighlightLine("地铁"+lineIndex+"号线");
}
function NS_SW_chooseLineBySwf(lineIndex){
	try{
		parent.NS_SW_chooseLineBySwf(lineIndex);
	}catch(e){
		console.log("parent.NS_SW_chooseLineBySwf failed");
	}
}
function NS_SW_resetHighlightLine(){
	resetHighlight();
}