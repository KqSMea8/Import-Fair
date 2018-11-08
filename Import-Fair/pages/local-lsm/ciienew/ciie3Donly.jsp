<!DOCTYPE html>
<%

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
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/mapnew.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<title>中国国际进口博览会通信保障</title>
</head>
<body  style="width:2400px;height:1200px;">
	<div id="bgDiv" class="bgC" style="width:2400px;height:1200px;padding:40px 0 40px 0;position:relative;">
		<iframe frameborder="0" allowtransparency="true"  id="modelFrame" style="width:2400px;height:1200px;position:absolute;top:0px;left:0px;" src="unity/unityplayer/unityplayer.html?smooth=true_showSpecific=true">
    	</iframe>
	</div>
</body>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<style type="">
.leaflet-popup-content-wrapper, .leaflet-popup-tip {
	/*background-color: rgba(226, 226, 233, 0.75);*/
	background-color: rgba(255, 255, 255, 0);
	box-shadow: 0 3px 14px rgba(0, 0, 0, 0);
}

.leaflet-popup-content {
	margin: 0px;
}

.scroll {
	height: 30px;
}

.contentItem {
	height: 30px;
	line-height: 20px;
	font-size: 20px;
}
}
</style>
<script>
$(function(){
	zoomPage(2400,1200,true);
});
</script>
</html>