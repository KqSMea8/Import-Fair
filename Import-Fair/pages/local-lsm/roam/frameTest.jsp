<!DOCTYPE html>
<html lang="zh-CN" style="width:1920px;height:1080px;">
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

<title>上海国际进出口博览会-漫游</title>
<style type="text/css">
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	}
	
	
</style>
</head>
<body style="width:1920px;height:1080px;"> 
<div style="width:100%;height:100%;">
<iframe id="leftIFrame" src="roamleft.jsp" frameborder="0" style="float:left;width:1920px;height:1080px;"></iframe>
</body>

<script>
var BASEPATH="${ctx}";
function updateHotspot(hotspot){
	var iframe0=$("#mapIFrame")[0];
	var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
	iframeWindow0.updateHotspot(hotspot);
	
	var iframe=$("#rightIFrame")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.updateHotspot(hotspot);
}

function updateRoamType(roamType){
	var iframe=$("#rightIFrame")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.updateRoamType(roamType);
}

function showAirRoam(isPermenent){
	var iframe0=$("#mapIFrame")[0];
	var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
	iframeWindow0.showAirRoam(isPermenent);
}

function hideAirRoam(){
	var iframe0=$("#mapIFrame")[0];
	var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
	iframeWindow0.hideAirRoam();
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
</script>
</html>