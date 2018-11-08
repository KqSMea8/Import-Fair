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
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/map.css" />
<title>上海国际进出口博览会</title>
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
<div class="bodybackground">
	<div class="blockLeft">
		<div style="width:100%">
			<div class="kpiwithtrend" kpi="日累计核心区域用户数">
				<div class="kwt-header">
					<div class="icon-user"></div>
					<div class="kpiTitleLarge">核心区域用户数</div>
					<div class="kpiUnitLarge">(人)</div>
				</div>
				<div class="kwt-body">
					<div id="topvalue0_0" class="kpiValueLarge">--</div>
					<div class="icon-splitline"></div>
					<div id="chart0_0" class="topChart"></div>
					<div class="topChartTime" id="time0_0">--:--</div>
				</div>
			</div>
			<div class="kpiwithtrend" style="margin-left:30px;"  kpi="日累计语音话务量">
				<div class="kwt-header">
					<div class="icon-voicetraff"></div>
					<div class="kpiTitleLarge">语音话务量</div>
					<div class="kpiUnitLarge">(Erl)</div>
				</div>
				<div class="kwt-body" >
					<div id="topvalue0_1" class="kpiValueLarge">--</div>
					<div class="icon-splitline"></div>
					<div id="chart0_1" class="topChart"></div>
					<div class="topChartTime" id="time0_1">--:--</div>
				</div>
			</div>
			<div class="kpiwithtrend" style="margin-left:30px;" kpi="日累计数据流量">
				<div class="kwt-header">
					<div class="icon-dataflow"></div>
					<div class="kpiTitleLarge">数据流量</div>
					<div class="kpiUnitLarge">(GB)</div>
				</div>
				<div class="kwt-body">
					<div id="topvalue0_2" class="kpiValueLarge">--</div>
					<div class="icon-splitline"></div>
					<div id="chart0_2" class="topChart"></div>
					<div class="topChartTime" id="time0_2">--:--</div>
				</div>
			</div>
		</div>
		<div style="clear:both;"></div>
		<div style="width:100%;margin-top:40px;">
			<div style="width:1100px;float:left;">
				<div id="neiPanel" class="ciiepanel">
					<div class="ciietitle">
						<div class="icon-neq"></div>
						<div>网络质量</div>
						<div class="toolbox">
							<div id="kpiconfig" class="kpiconfig"></div>
						</div>
					</div>
					<div id="netQualityContent" class="ciiecontent" style="padding:15px 15px 0px 15px;">
						
					</div>
				</div>
			</div>
			<div id="activeChart" style="width:790px;margin-left:30px;float:left;">
				<div class="ciiepanel">
					<div id="centerChartTitleBar" class="ciietitle" style="cursor:pointer;">
						<div class="icon-userchart"></div>
						<div id="centerChartTitle">用户数</div>
						<div id="centerChartTime">(人)【--:--】</div>
					</div>
					<div id="centerChartParent" class="ciiecontent" style="height:500px;position: relative;padding-left:0;padding-right:0;">
						<div id="userChart" style="width:100%;height:100%;"></div>
					</div>
				</div>
			</div>
		</div>
		<div style="clear:both;"></div>
		<div style="width:100%;margin-top:40px;">
			<div style="width:560px;float:left;">
				<div class="ciiepanel">
					<div class="ciietitle">
						<div class="icon-alarm"></div>
						<div>告警窗</div>
						<div class="toolbox" style="display:none;"><div class="icon-selector"></div><div class="icon-selector"></div><div class="icon-selector-selected"></div></div>
					</div>
					<div class="ciiecontent" style="padding-left:15px;">
						<div class="horizontalRow" style="margin-top:10px;">
							<div class="icon-nealarm" style="margin-top:8px;"></div>
							<div class="kpiTitleMed" style="padding-top:12px;margin-left:10px;letter-spacing:5px;">网元告警</div>
							<div id="neAlarmCount" class="alarmNumPlate" style="margin-left:10px;cursor:pointer;" >0</div>
							<div style="padding-top:36px;">条</div>
						</div>
						<div class="horizontalRow" style="margin-top:20px;">
							<div class="icon-peralarm" style="margin-top:8px;"></div>
							<div class="kpiTitleMed" style="padding-top:12px;margin-left:10px;letter-spacing:5px;">性能告警</div>
							<div id="performanceAlarmCount" class="alarmNumPlate" style="margin-left:10px;cursor:pointer;" >0</div>
							<div style="padding-top:36px;">条</div>
						</div>
						<div class="horizontalRow" style="margin-top:20px;">
							<div class="icon-complain" style="margin-top:8px;"></div>
							<div class="kpiTitleMed" style="padding-top:12px;margin-left:10px;letter-spacing:5px;">用户投诉</div>
							<div id="complainCount" class="alarmNumPlate" style="margin-left:10px;cursor:pointer;" >0</div>
							<div style="padding-top:36px;">条</div>
						</div>
<!-- 						<div class="radar"></div> -->
						<embed id="radar_image" style="position:absolute;right:0;top:70px;" type="application/x-shockwave-flash" src="${ctx}/static/styles/local-lsm/ciie/radar.swf" width="249" height="249" wmode="transparent">
					</div>
				</div>
			</div>
			<div style="width:560px;margin-left:30px;float:left;">
				<div class="ciiepanel">
					<div class="ciietitle">
						<div class="icon-terminalrank"></div>
						<div id="terminalRankTitle">终端排名</div>
						<div class="toolbox"><div id="terminalReturn" style="display:none;" class="icon-return"></div></div>
					</div>
					<div class="ciiecontent" style="padding:0;padding-top:10px;">
						<div id="terminalrankChart" style="width:550px;height:280px;"></div>
						
						
					</div>
				</div>
			</div>
			<div style="width:740px;margin-left:30px;float:left;">
				<div class="ciiepanel">
					<div class="ciietitle">
						<div class="icon-userstructure"></div>
						<div>漫入用户</div>
						<div class="toolbox" >
							<div class="btn-group">
							    <button type="button" target="roamChinaChart" class="btn btn-default roamTypeBtn">省际</button>
							    <button type="button" target="roamWorldChart" class="btn btn-primary roamTypeBtn">国际</button>
							</div>
						</div>
					</div>
					<div style="width:100%;">
						<div style="width:740px;height:300px;float:left;border:solid 0px #ff0000;position:relative;">
							<div id="roamRankChart" class="roamChart roamRankChart" style="width:100%;height:100%;position:absolute;top:0;left:0;"></div>
							<div id="roamChinaChart" class="roamChart roamChinaChart" style="width:100%;height:100%;position:absolute;top:0;left:0;"></div>
							<div id="roamWorldChart" class="roamChart roamWorldChart" style="width:100%;height:100%;position:absolute;top:0;left:0;"></div>
						</div>
						<div style="width:565px;position:absolute;top:70px;left:30px;pointer-events:none;">
							<div class="kpiTitleMed roamChart roamChinaChart roamChinaTotal" style="float:left;">总用户数</div>
							<div class="roamChart roamChinaChart roamChinaTotal" style="float:left;">
								<div class="userstructurePlate proroamuser" style="margin-left:0px;float:left;" >0</div>
								<div class="userstructurePlate proroamuser" style="margin-left:0px;float:left;" >0</div>
								<div class="userstructurePlate proroamuser" style="margin-left:0px;float:left;" >0</div>
								<div class="userstructurePlate proroamuser" style="margin-left:0px;float:left;" >0</div>
								<div class="userstructurePlate proroamuser" style="margin-left:0px;float:left;" >0</div>
								<div class="userstructurePlate proroamuser" style="margin-left:0px;float:left;" >0</div>
								<div style="float:left;height:46px;line-height:52px;">人</div>
							</div>
							<div style="clear:both;"></div>
							<div class="kpiTitleMed roamChart roamWorldChart roamWorldTotal" style="float:left;display:none;">总用户数</div>
							<div class="roamChart roamWorldChart roamWorldTotal" style="float:left;display:none;">
								<div class="userstructurePlate intlroamuser" style="margin-left:0px;float:left;" >0</div>
								<div class="userstructurePlate intlroamuser" style="margin-left:0px;float:left;" >0</div>
								<div class="userstructurePlate intlroamuser" style="margin-left:0px;float:left;" >0</div>
								<div class="userstructurePlate intlroamuser" style="margin-left:0px;float:left;" >0</div>
								<div class="userstructurePlate intlroamuser" style="margin-left:0px;float:left;" >0</div>
								<div class="userstructurePlate intlroamuser" style="margin-left:0px;float:left;" >0</div>
								<div style="float:left;height:46px;line-height:52px;">人</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="clear:both;"></div>
	</div>
	<div class="blockCenter" >
		<div class="screencol col5" >
			<div class="mapFrame">
				<div style="width:100%;height:100%;position:relative;">
					<div class="mapFrameLT"></div>
					<div class="mapFrameBR"></div>
					<div class="map" id="map">
						<iframe id="mapIFrame" src="map.jsp" style="width:100%;height:100%;border-radius:100px;" frameborder="0"></iframe>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="blockRight" style="padding-left:0px;" >
		<div class="screencol" style="width:620px;" >
			<div class="centerKpiFrame">
				<div id="centerKpi0" class="centerHotspotKpiFrameParent" style="height:220px;overflow:hidden;">
					
				</div>
				<div class="centerHotspotKpiFrameParent" style="overflow:hidden;position:relative;table-layout: fixed; word-wrap: break-word; ">
					<div id="centerKpi" style="width:100%;overflow:hidden;position:absolute;top:0;left:0;">
					
					</div>
				</div>
				
			</div>
		</div>
		<div class="screencol" style="margin-left:30px;width:1270px;" >
			<div class="ciiepanel">
				<div class="ciietitle">
					<div class="icon-hotlist"></div>
					<div id="rightTableTitle" class="rightTableTitleFunc" style="cursor:pointer;" name="场馆列表">场馆列表</div>
					<div id="rightTableIcon" class="rightTableTitleFunc icon-hot" style="cursor:pointer;"  name="场馆列表"></div>
					<div class="toolbox"><div id="hotListReturn" style="display:none;" class="icon-return"></div></div>
				</div>
				<div style="width:100%;height:530px;">
					<table id="table" style="width:100%;height:100%;"></table>
				</div>
			</div>
			<div style="width:100%;margin-top:40px;" >
				<div class="ciiepanel" style="width:620px;float:left;">
					<div class="ciietitle">
						<div class="icon-dataDistribute"></div>
						<div>数据业务分布</div>
					</div>
					<div class="ciiecontent" style="padding:0;">
						<div id="majorRankChart" style="width:620px;height:440px;"></div>
						<div style="font-size:28px;text-align:center;line-height:530px;position:absolute;top:0;left:0;pointer-events:none;width:620px;height:440px;">业务分布</div>
					</div>
				</div>
				<div id="pphigh" class="ciiepanel pptable" style="width:620px;float:left;margin-left:30px;">
					<div class="ciietitle">
						<div class="icon-pphigh"></div>
						<div>流量占比<span style="color:#f65850;">高于</span>全网</div>
						<div class="toolbox" >
							<div class="btn-group">
							    <button type="button" target="pphigh" class="btn btn-primary ppTypeBtn">高于</button>
							    <button type="button" target="pplow" class="btn btn-default ppTypeBtn">低于</button>
							</div>
						</div>
					</div>
					<div class="ciiecontent" style="padding:0;">
						<table id="appHigher" style="width:100%;height:100%;"></table>
					</div>
				</div>
				<div id="pplow" class="ciiepanel pptable" style="width:620px;float:left;margin-left:30px;display:none;">
					<div class="ciietitle">
						<div class="icon-pplow"></div>
						<div>流量占比<span style="color:#00ff00;">低于</span>全网</div>
						<div class="toolbox" >
							<div class="btn-group">
							    <button type="button" target="pphigh" class="btn btn-default ppTypeBtn">高于</button>
							    <button type="button" target="pplow" class="btn btn-primary ppTypeBtn">低于</button>
							</div>
						</div>
					</div>
					<div class="ciiecontent" style="padding:0;">
						<table id="appLower" style="width:100%;height:100%;"></table>
					</div>
				</div>
				
			</div>
			
			
		</div>
	</div>
	<div class="screentitle">
		<div class="titleAndLogo">
			<div class="logo"></div>
			<div class="titleTxt">上海移动重要区域实时保障</div>
		</div>
		<div style="clear:both;"></div>
		<div id="screenTitleTime" class="titleTime">
		</div>
		<div class="subtitle">GSMA通信保障</div>
	</div>
</div>
<div id="demo" class="icon-play" style="display:none;cursor:pointer;position:absolute;top:5px;left:35px;"></div>
<div class="modal fade"  id="modalWin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="modalWinTitle">
				</h4>
			</div>
			<div class="modal-body" id="modalWinBody" style="width:100%;overflow:auto;">
			</div>
			<div class="modal-footer">
                <button type="button" class="btn btn-success" id="modalConfirm">确定</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
            </div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade"  id="modalWinLarge" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="modalWinTitleLarge">
				</h4>
			</div>
			<div class="modal-body" id="modalWinBodyLarge" style="width:100%;overflow:auto;">
			</div>
			<div class="modal-footer">
                <button type="button" class="btn btn-success" id="modalConfirmLarge">确定</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
            </div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
</body>

<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>
<!-- 需要内网使用百度api -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/baiduApiScript.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/codemirror.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/javascript.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/BMap.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciie.js"></script>

<script>
var BASEPATH="${ctx}";
$(function(){
	new CIIE.Screen(CIIE.SCREEN_HOT);
});
</script>
</html>