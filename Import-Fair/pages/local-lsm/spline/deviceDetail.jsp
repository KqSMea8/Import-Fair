<!DOCTYPE html>
<html lang="zh-CN" style="width:100%;height:100%;">
<%
String EQUIP_NAME = request.getParameter("EQUIP_NAME");
%>
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<%@ include file="/common/bootstrap.jsp"%> 
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.groupedlayercontrol.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/map.css" />
<title>设备详情</title>
</head>
<body style="background-color:rgba(1,0,69,0.75);padding:15px;"> 
	<table style="width:100%;height:100%;">
		<tr><td style="width:90px;">设备名称:</td><td class="propertyCell"></td></tr>
		<tr><td>设备厂商:</td><td class="propertyCell"></td></tr>
		<tr><td>设备类型:</td><td class="propertyCell"></td></tr>
		<tr><td>所属机房:</td><td class="propertyCell"></td></tr>
		<tr><td>机房类型:</td><td class="propertyCell"></td></tr>
	</table>
</body>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMask.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script>
	var EQUIP_NAME="<%=EQUIP_NAME%>";
	$(function(){
		var dm=LSMScreen.DataManager.getInstance();
		dm.getJKDeviceInfo({EQUIP_NAME:EQUIP_NAME},function(result){
			var record=result.data[0];
			$('.propertyCell:eq(0)').text(record['EQUIP_NAME']);
			$('.propertyCell:eq(1)').text(record['EQUIP_VENDOR']);
			$('.propertyCell:eq(2)').text(record['SIGNAL_TYPE_T']);
			$('.propertyCell:eq(3)').text(record['ROOM_NAME']);
			$('.propertyCell:eq(4)').text(record['ROOM_TYPE']);
		});
	});
</script>
</html>