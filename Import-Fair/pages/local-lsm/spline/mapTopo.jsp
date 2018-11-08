<!DOCTYPE html>
<%
String isScreenMode = request.getParameter("isScreenMode");
String lineId = request.getParameter("lineId");
String lineType = request.getParameter("lineType");
String forceZoom = request.getParameter("forceZoom");
%>
<html lang="zh-CN" style="width:100%;height:100%;">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<%@ include file="/common/bootstrap.jsp"%> 
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.draw.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.contextmenu.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.markercluster.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet-search.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/Icon.Label.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.groupedlayercontrol.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/spline/spline.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/mapnew.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<title>中国国际进口博览会通信保障-地图</title>
<style type="text/css">
.mapLabel{
color:black;
font-size:24px;
}
.mapLabelSE{
color:black;
font-size:24px;
background:#969696;
}
.scroll {
	height: 30px;
}

.contentItem {
	height: 30px;
	line-height: 20px;
	font-size: 20px;
}
</style>
</head>
<body  style="width:2400px;height:1200px;padding:0px 0 0px 0;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s" style="width:928px;margin-left:-464px;"></div>
	<div style="clear:both;"></div>
	<div class="titleTime_s" style="position:relative;">
		<div id="screenTitleTime"  style="text-indent:0px;width: 100%;padding-right:0px;"></div>
		<div style="text-indent:0px;width: 100%;padding-left: 350px;position:absolute;top:0px;pointer-events: auto;"><div style="line-height: 50px;margin-top:5px;overflow: hidden;left: 1000px;position: absolute;height:50px;width:700px;"><div class="scrollBox" data-name="scrollBoxs" id="schedule" style="width: 100%;"></div></div></div>
		<div style="text-indent:0px;width: 100%;padding-left: 350px;position:absolute;top:-50px;left:400px"><img id="weather_img" style="margin-right:30px;margin-top:-0.5%;height:54px"><div style="padding-left: 200px;font-size: 34px;margin-top:-50px"><span id="weather_text" style="margin-right:10px;"></span><span id="temperature" style="margin-right:20px;"></span></div></div>
	</div>
</div>
	<div class="bgC" style="width:100%;height:100%;position:relative;">
		<div class="map" id="map" style="width:100%;height:100%;">
    	
    	</div>
	</div>
	<div id="topo" class="baseborderwin" style="background:rgba(1,0,69,0.75);width:90%;height:300px;position:absolute;left:5%;bottom:40px;overflow:hidden;display:none;">
		<div class="horizontalRow" style="width:100%;line-height:48px;">
			<div class="gc-icon-sptopo" style="margin-right:20px;"></div>
			<div class="fontContentTitle" id="lineTopoName">专线拓扑</div>
			<div id="topoclose" class="topoclose" style="float:right;cursor:pointer;"></div>
		</div>
		<div style="clear:both;"></div>
		<div id="topoDiv" style="width:100%;height:400px;margin-top:20px;oveflow-y:auto;"></div>
	</div>
	<div id="optical" class="baseborderwin" style="display:none;background:rgba(1,0,69,0.75);width:600px;height:500px;position:absolute;left:40px;top:200px;">
		<div class="horizontalRow" style="width:100%;line-height:48px;">
			<div class="gc-icon-sptopo" style="margin-right:20px;"></div>
			<div class="fontContentTitle" id="lineTopoName">光路线路</div>
			<div id="opticalclose" class="topoclose" style="float:right;cursor:pointer;"></div>
		</div>
		<div style="clear:both;"></div>
		<div id="opticalDiv" style="width:100%;height:400px;margin-top:20px;overflow-y:auto;overflow-x:hidden;"></div>
	</div>
	<div class="modal fade"  id="modalWin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" style="width:1400px;">
			<div class="modal-content"  style="margin-top:200px;">
				<div class="modal-header" style="border-bottom:none;">
					<h4 class="modal-title" id="modalWinTitle" style="font-size:32px;">
					</h4>
				</div>
				<div class="modal-body" id="modalWinBody" style="width:100%;height:900px;overflow:hidden;">
					<div style="position:absolute;top:20px;left:20px;" class="baseborderwin">
						<div>
							<div style="float:left;">主&nbsp;&nbsp;:&nbsp;&nbsp;</div><div style="float:left;width:100px;height:5px;background:#ffffff;margin-top:10px;"></div>
						</div>
						<div style="clear:both;"></div>
						<div>
							<div style="float:left;">备&nbsp;&nbsp;:&nbsp;&nbsp;</div><div style="float:left;width:100px;height:3px;background:#555555;margin-top:10px;"></div>
						</div>
					</div>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>
	<div id="_schedule" style="visibility:hidden;font-size: 30px;"></div>
	<div id="_schedule_s" style="visibility:hidden; font-size: 20px;"></div>
</body>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMask.js"></script>
<script src="${jslib}/leaflet/leaflet.js"></script>
<script src="${jslib}/leaflet/heatmap.js"></script>
<script src="${jslib}/leaflet/leaflet-heatmap.js"></script>
<script src="${jslib}/leaflet/leaflet.draw.js"></script>
<script src="${jslib}/leaflet/leaflet.contextmenu.js"></script>
<script src="${jslib}/leaflet/leaflet.markercluster-src.js"></script>
<script src="${jslib}/leaflet/leaflet-search.js"></script>
<script src="${jslib}/leaflet/Icon.Label.js"></script>
<script src="${jslib}/leaflet/leaflet.groupedlayercontrol.js"></script>
<script src="${jslib}/leaflet/leaflet.baidu.min.js"></script>
<script type="text/javascript" src="${jslib}/twaver/twaver.js"></script>


<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/spline/mapTopo.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/spline/matching.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/overviews.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script>
var MAP=null;
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var lineId="<%=lineId%>";
var lineType="<%=lineType%>";
var forceZoom="<%=forceZoom%>";

$(function(){
	//zoomPage(3000,1200);
	MAP=new CIIE.MapTopo('map',CIIE.PEOPLE_HOT,BASEPATH);
	if(isScreenMode=="true"){
		try{
			parent.mapReadyFunc();
		}catch(e){}
		if(forceZoom=="true"){
			zoomPage(2400,1200,true);
		}
	}else{
		zoomPage(2400,1300);
		new CIIENEW.NavigatorSingle('专线保障-GIS拓扑');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		$('.screentitle_s').css('display','block');
		
		if(lineId!=""&&lineId!="null"){
			updateLineTopo(lineId,lineType);
		}
		setInterval(refreshTime,1000);
	}
});

function clear(){
	MAP.clear();
}
function addMarker(name,resourceType,lat,lng){
	MAP.addMarker(name,resourceType,lat,lng);
}
function addLine(latlngs){
	MAP.addLine(latlngs);
}
function setView(lat,lng){
	MAP.setView(lat,lng);
}
function updateLineTopo(lineId,lineType){
	MAP.updateLineTopo(lineId,lineType);
}
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
var overviews6="";
var overviews6_="";
window.clearInterval(overviews6);
window.clearInterval(overviews6_);
overviews6=setInterval(function() {
	overviews.init();
},300*1000);
overviews6_=setInterval(function() {
	overviews.Schedule();
},60*60*1000);
</script>
</html>