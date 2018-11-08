<!DOCTYPE html>
<html lang="zh-CN" >
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String isScreenMode = request.getParameter("isScreenMode");
String width = request.getParameter("width");
String height = request.getParameter("height");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<%@ include file="/common/lib.jsp"%>
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/stationDetail.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/metro/metroFunc.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/metro/metronewscreen.css" />
<title>地铁线路图</title>
</head>
<body style="width:100%;height:100%;">
	<iframe id="metroSwfFrame" class="metroFrame borderBox" frameborder="no" allowtransparency="true"  src=""></iframe>
	<DIV id="rankChartWin"  style="position:absolute;top:60px;left:5px;color:#ffffff;font-size:18px;font-weight:bold;display:none;">
		<div style="position:absolute;width:300px;height:560px;background:#041c28;border:solid 1px #00489f;opacity:0.5;filter:alpha(opacity=50);"></div>
		<div id="rankChart" style="width:300px;height:560px;"></div>
	</DIV>
</body>
<script>
	$(document).ready(function(){
		$("#metroSwfFrame").width(<%=width%>);
		$("#metroSwfFrame").height(<%=height%>);
		$("#metroSwfFrame").attr("src","../mobile/metroMobile.jsp?isScreenMode="+"<%=isScreenMode%>")
	});
	function showKpiComponent(lineIndex,station){
		var detail=new KpiComponent.DetailQuery();
		detail.STATION=station;
		detail.LINE_INDEX=lineIndex;
		detail.showStationKpi();
	}
	
	function NS_SW_chooseLineBySwf(lineIndex){
		try{
			parent.NS_SW_chooseLineBySwf(lineIndex);
		}catch(e){
			console.log("parent.NS_SW_chooseLineBySwf failed");
		}
	}
	function changeMetroSize(evt){
		try{
			parent.changeMetroSize(evt);
		}catch(e){
			console.log("parent.changeMetroSize failed");
		}
	}
	function getMetroStationKpiRankMultiType(param,callback){
		var dm=LSMScreen.DataManager.getInstance();
		dm.getMetroStationKpiRankMultiType(param,function(stationResult){
			dm.getHotSpotsKpis(["地铁"],param.time,null,function(allResult){
				callback(stationResult,SUtils.convertRecordMetroAvg(allResult["地铁"]));
			});
		});
		
	}
	function getMetroAllStationKpiTrend(param,callback){
		var dm=LSMScreen.DataManager.getInstance();
		dm.getMetroAllStationKpiTrend(param,callback);
	}
	function getMetroAllKpiTrend(param,callback){
		var dm=LSMScreen.DataManager.getInstance();
		dm.getMetroAllKpiTrend(param,callback);
	}
	
	function updateRankChartSub(currentKpi,currentKpiKey,result,allResult){
		try{
			parent.updateRankChart(currentKpi,currentKpiKey,result,allResult);
		}catch(e){
			console.log("父页面没有updateRankChart");
		}
		updateRankChart(currentKpi,currentKpiKey,result,allResult);
	}
	function timeLinePlayCallBack(time){
		var iframe=$("#metroSwfFrame")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.timeLinePlayCallBack(time);
	}
	$(document).ready(function(){
    	if("true"=="<%=isScreenMode%>"){
			$("#rankChartWin").css("display","block");
		}else{
		}
    });
</script>
</html>
	