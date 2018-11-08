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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/map.css" />
<title>上海国际进口博览会</title>
<style type="text/css">
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	}
	
	
</style>
</head>
<body style="width:2000px;height:1200px;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="titleAndLogo_s" style="">
		<div class="logo_s"></div>
		<div class="titleTxt_s">上海移动重要区域实时保障</div>
	</div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s">
	</div>
	<div class="subtitle_s" style="">MWC通信保障</div>
</div>
<div class="bgL">
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
					<div id="netQualityContent" class="ciiecontent needPause" style="padding:15px 15px 0px 15px;">
						
					</div>
				</div>
			</div>
			<div id="activeChart" style="width:790px;margin-left:30px;float:left;">
				<div class="ciiepanel">
					<div id="centerChartTitleBar" class="ciietitle" style="cursor:pointer;">
						<div class="icon-userchart"></div>
						<div id="centerChartTitle">用户数</div>
						<div id="centerChartTime">(人)【--:--】</div>
						<div class="toolbox">
							<div id="activeChartZoom" class="icon-zoom" style="margin-top:5px;"></div>
						</div>
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
							<div id="nealarmIcon" class="icon-nealarm" style="margin-top:8px;"></div>
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
					<div class="ciietitle" style="cursor:pointer;">
						<div class="icon-terminalrank"></div>
						<div id="terminalRankTitle"  style="cursor:pointer;">终端排名</div>
						<div class="toolbox"><div id="terminalReturn" style="display:none;" class="icon-return"></div></div>
					</div>
					<div id="terminalChartParent" class="ciiecontent" style="padding:0;padding-top:10px;width:100%;height:280px;">
						<div id="terminalRankChart" style="width:100%;height:100%;"></div>
					</div>
				</div>
			</div>
			<div id="roamParent" class="needPause" style="width:740px;margin-left:30px;float:left;">
				<div class="ciiepanel">
					<div class="ciietitle" style="cursor:pointer;">
						<div class="icon-userstructure"></div>
						<div id="roamPanelTitle" >漫入用户</div>
						<div class="toolbox" >
							<div class="btn-group">
							    <div id="roamTypeBtn" target="roamWorldChart" class="btn-international"></div>
							</div>
							<div id="roamZoom" class="icon-zoom" style="margin-top:5px;"></div>
						</div>
					</div>
					<div id="roamPanel" style="width:100%;height:260px;">
						<div style="width:100%;height:100%;">
							<div style="width:100%;height:100%;float:left;border:solid 0px #ff0000;position:relative;">
								<div id="roamRankChart" class="roamChart roamRankChart" style="width:100%;height:100%;position:absolute;top:0;left:0;"></div>
								<div id="roamChinaChart" originWidth="740" originHeight="300" class="roamChart roamChinaChart" style="width:100%;height:100%;position:absolute;top:0;left:0;"></div>
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
		</div>
		<div style="clear:both;"></div>
	</div>
</div>
<div id="demo" class="icon-play" style="display:none;cursor:pointer;position:absolute;top:5px;left:35px;"></div>
<div class="modal fade"  id="modalWin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:1600px;">
		<div class="modal-content" >
			<div class="modal-header" style="border-bottom:none;">
				<h4 class="modal-title" id="modalWinTitle" style="font-size:32px;">
				</h4>
			</div>
			<div class="modal-body" id="modalWinBody" style="width:100%;height:900px;overflow:auto;">
			</div>
			<div class="modal-footer" style="text-align:center;border-top:none;" >
                <button type="button" class="btn btn-success" id="modalConfirm" style="height:56px;width:150px;font-size:42px;">确定</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" style="height:56px;width:150px;font-size:42px;">关闭</button>
            </div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>


</body>

<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="${jslib}/anychart/AnyChart.js"></script>
<script type="text/javascript" src="${jslib}/anychart/AnyChartHTML5.js"></script>
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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciieleft.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var screen=null;
$(function(){
	if(isScreenMode=="true"){
		
	}else{
		$('.screentitle_s').css('display','block');
		zoomPage(2000,1300);
		setInterval(refreshTime,1000);
	}
	screen=new CIIE.Screen(CIIE.SCREEN_HOT);
});
function updateHotspot(hotspot){
	if(screen!=null){
		screen.hotspot=hotspot;
		screen.update();
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