<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>

<title>地铁</title>
</head>
<body>
	<iframe id="metroSwfFrame" class="bottomRight" frameborder="no" allowtransparency="true" style="background:transparent;" src="metroswf/index.jsp"></iframe>
	<div id="topGrid" class="topGrid"></div>
	<div id="bottomLeft" class="bottomLeft">
		<div id="textInfo1" class="textInfo1">
			地铁全天4G流量占全网流量的<span id="textInfo1_1" class="textInfo1_value">2</span>%<br/>
			地铁4G开通后，地铁2G、3G流量均有不同程度的萎缩，<br/>
			开通后地铁总流量增长<span id="textInfo1_2" class="textInfo1_value">160</span>%。高于全网增长<br/>
			（全网流量增长<span id="textInfo1_3" class="textInfo1_value">50</span>%）
		</div>
		<div id="textInfo2" class="textInfo2">
			
		</div>
		<div id="arpuChart" class="arpuChart"></div>
	</div>
</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/metro/metro.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/threshold.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/stationDetail.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/metro/metro.js"></script>
<script>
	var MetroScreenCtrl;
	$(document).ready(function(){
		var dm=LSMScreen.DataManager.getInstance();
		dm.getMetroLineStationCellType({},function(result){
			var stationTypeMap={};
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
			MetroScreenCtrl=new MetroScreen.ScreenController(stationTypeMap);
		});
		
		
	});
</script>
</html>