<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/map.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/spline/matching.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/overviews.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<title>中国国际进口博览会通信保障</title>
<style type="text/css">
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	}
	
	
</style>
</head>
<body> 
<div style="width:100%;height:100%;">
<iframe id="leftIFrame" src="splineleft.jsp?isScreenMode=true" frameborder="0" style="float:left;width:2000px;height:1200px;"></iframe>
<iframe id="mapIFrame" src="mapTopo.jsp?isScreenMode=true" frameborder="0" style="float:left;width:2400px;height:1200px;"></iframe>
<iframe id="rightIFrame" src="splineright.jsp?isScreenMode=true" frameborder="0" style="float:left;width:1550px;height:1200px;"></iframe>
<iframe id="videoIFrame" src="../video/video.jsp?isScreenMode=true" frameborder="0" style="float:left;width:450px;height:1200px;"></iframe>
	<div class="screentitle">
		<div class="titleAndLogo" style="left:2400px;">
			<div class="logociie"></div>
		</div>
		<div style="clear:both;"></div>
		<div class="titleTime" style="position:relative;">
			<div id="screenTitleTime"  style="text-indent:0px;width: 100%;padding-right: 800px;"></div>
			<div style="text-indent:0px;width: 100%;padding-left: 60px;position:absolute;top:-2px;pointer-events: auto;"><div style="line-height: 50px;margin-top:5px;overflow: hidden;left: 3140px;position: absolute;height:50px;width:740px;"><div class="scrollBox" id="schedule" style="width: 100%;"></div></div></div>
			<div style="text-indent: 1900px;width: 100%;position:absolute;top:-100px;"><img id="weather_img" style="margin-right:20px"><span id="weather_text" style="margin-right:20px"></span><span id="temperature" style="margin-right:20px"></span></div>
		</div>
	</div>
	<div id="_schedule" style="visibility:hidden;font-size: 30px;"></div>
	<div id="_schedule_s" style="visibility:hidden; font-size: 20px;"></div>
</div>

</body>

<script>
var BASEPATH="${ctx}";
new CIIENEW.Navigator('专线保障');
var mapReady=false;
var tempBT='';
var tempPEL='';
function mapReadyFunc(){
	mapReady=true;
	if(tempBT!=''&&tempPEL!=''){
		updateLineTopo(tempBT,tempPEL);
		tempBT='';
		tempPEL='';
	}
	
}
/* function updateHotspot(hotspot){
	var iframe0=$("#mapIFrame")[0];
	var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
	iframeWindow0.updateHotspot(hotspot);
	
	var iframe=$("#rightIFrame")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.updateHotspot(hotspot);
} */

function updateLineTopo(lineId,lineType){
	if(mapReady){
		var iframe0=$("#mapIFrame")[0];
		var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
		iframeWindow0.updateLineTopo(lineId,lineType);
	}else{
		tempBT=lineId;
		tempPEL=lineType;
	}
}

function updateRightList(customers_num){
	var iframe0=$("#rightIFrame")[0];
	var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
	iframeWindow0.updateCustomerNum(customers_num);
}


setInterval(refreshTime,1000);
function refreshTime(){
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
overviews.init();
var overviews7="";
var overviews7_="";
window.clearInterval(overviews7);
window.clearInterval(overviews7_);
overviews7=setInterval(function() {
	overviews.init();
},300*1000);
overviews7_=setInterval(function() {
	overviews.Schedule();
},60*60*1000);
</script>
</html>