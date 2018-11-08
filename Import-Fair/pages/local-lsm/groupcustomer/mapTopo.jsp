<!DOCTYPE html>
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
<title>上海国际进出口博览会-地图</title>
</head>
<body  style="width:100%;height:100%;padding:0px 0 0px 0;"> 
	<div style="width:100%;height:100%;position:relative;">
		<div  id="map" style="width:100%;height:100%;">
    	
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

<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/mapTopo.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>

<script>
var MAP=null;
var BASEPATH="${ctx}";
$(function(){
	//zoomPage(3000,1200);
	MAP=new CIIE.MapTopo('map',CIIE.PEOPLE_HOT,BASEPATH);
	parent.mapReadyFunc();
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
	
</script>
</html>