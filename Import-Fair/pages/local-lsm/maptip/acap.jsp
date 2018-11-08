<!DOCTYPE html>
<%

%>
<html lang="zh-CN" style="width:100%;height:100%;background:rgba(0,0,0,0);">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/mapnew.css" />


<title>中国国际进口博览会</title>
<style type="text/css">
	
</style>
</head>
<body style="width:1150px;height:960px;background:rgba(0,0,0,0);overflow:hidden;"> 
	<div class="maptipbg" style="width:100%;height:100%;padding:0px;overflow:hidden;">
		<div class="map-info-win-title2">
			<div class="wifiWinIcon" style="float:left;"></div>
			<div style="float:left;">WIFI运行质量</div>
		</div>
		<div style="clear:both;"></div>
		<div id="map-info-tab-container" name="tab" style="width:100%;">
			<div target="wifi" class="map-info-tab map-info-tab-selected" style="width:20%;border-left:none;">
				<div></div>
				<div>WIFI业务质量</div>
			</div>
			<div target="ap" class="map-info-tab" style="width:20%;">
				<div></div>
				<div>AP运行质量</div>
			</div>
			<div class="map-info-tab-placeholder" style="width:60%;">
			</div>
		</div>
		<div style="clear:both;"></div>
		<div name="content" style="width:100%;">
			<div id="wifiDiv" style="width:100%;height:840px;">
				<table id="table0"></table>
			</div>
			<div id="apDiv" style="width:100%;height:780px;">
				<table id="table1"></table>
			</div>
		</div>
	</div>
	<div id="acListWin" style="position:absolute;top:50%;left:50%;margin-top:-207px;margin-left:-390px;width:780px;height:415px;overflow:hidden;display:none;">
		<iframe id="acListFrame" src="" frameborder="0" allowtransparency="true" style="border-radius:10px;width:780px;height:415px;"></iframe>
		<div id="acListpClose" class="map-icon-close" style="position:absolute;right:5px;top:5px;"></div>
	</div>
<!-- 	<div onclick="closeSelf();" id="detail_close" class="map-icon-close"  -->
<!-- 	style="width:44px;height:44px;position:absolute;right:5px;top:5px;"></div> -->
</body>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="${jslib}/twaver/twaver.js"></script>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="acap.js"></script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var comp=null;
$(function(){
	comp=new MAPTIP.ACAP();
});

function closeSelf(){
	parent.closeAcApDetail();
}

</script>


</html>