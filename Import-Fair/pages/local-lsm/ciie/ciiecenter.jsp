<!DOCTYPE html>
<%
String isScreenMode = request.getParameter("isScreenMode");
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
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/map.css" />
<title>上海国际进口博览会-地图</title>
</head>
<body  style="width:2400px;height:1200px;">
	<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
		<div class="titleAndLogo_s" style="">
			<div class="logo_s"></div>
			<div class="titleTxt_s">上海移动重要区域实时保障</div>
		</div>
		<div style="clear:both;"></div>
		<div id="screenTitleTime" class="titleTime_s">
		</div>
		<div class="subtitle_s" style="left:750px;">MWC通信保障</div>
	</div> 
	<div class="bgC" style="width:2400px;height:1200px;padding:40px 0 40px 0;position:relative;">
		<div class="map" id="map" style="width:100%;height:100%;">
    	
    	</div>
	</div>
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


<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciie_config.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/map.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/mapInfoWin.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>

<script>
var MAP=null;
var BASEPATH="${ctx}";
var isScreenMode="<%=isScreenMode%>";
$(function(){
	if(isScreenMode=="true"){
		
	}else{
		$('.screentitle_s').css('display','block');
		zoomPage(2400,1300);
		setInterval(refreshTime,1000);
	}
	MAP=new CIIE.Map('map',CIIE.PEOPLE_HOT,'topleft',BASEPATH,true);
});

function updateMapHotspot(hotspot){
	if(MAP!=null){
		MAP.updateHotspot(hotspot);
	}
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
	
</script>
</html>