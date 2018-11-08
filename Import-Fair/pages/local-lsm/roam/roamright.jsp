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
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/roam/roam.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<title>中国国际进口博览会通信保障</title>
<style type="text/css">
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	}
	
	
</style>
</head>
<body style="width:1550px;height:1200px;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div>
<div class="bgR">
	<div class="horizontalRow roamRow" style="height:535px;">
		<div class="roamRightBlock" style="width: 685px;">
			<div class="horizontalRow" style="padding:20px;">
				<div class="icon-internet"></div>
				<div class="fontImportantInfo titles" style="margin-left:20px;">国际漫入用户业务质量</div>
			</div>
			<div style="clear:both"></div>
			<div class="horizontalRow roamGaugePanel">
				<div>
					<div class="roamGauge">
						<div id="http_resp_succ_rate" class="ciiekpistyle fontContentTitle">---</div>
						<div class="ciiekpistyle fontUnitTime">%</div>
					</div>
					<div class="roamGaugeTitle">TCP响应成功率</div>
				</div>
				<div>
					<div class="roamGauge">
						<div id="http_req_succ_rate" class="ciiekpistyle fontContentTitle">---</div>
						<div class="ciiekpistyle fontUnitTime">%</div>
					</div>
					<div class="roamGaugeTitle">HTTP访问成功率</div>
				</div>
				<div>
					<div class="roamGauge">
						<div id="rstp_req_succ_rate" class="ciiekpistyle fontContentTitle">---</div>
						<div class="ciiekpistyle fontUnitTime">%</div>
					</div>
					<div class="roamGaugeTitle">视频播放成功率</div>
				</div>
				<div>
					<div class="roamGauge">
						<div id="dns_res_duration" class="ciiekpistyle fontContentTitle">---</div>
						<div class="ciiekpistyle fontUnitTime">ms</div>
					</div>
					<div class="roamGaugeTitle">TCP访问时延</div>
				</div>
				<div>
					<div class="roamGauge">
						<div id="http_resp_duration" class="ciiekpistyle fontContentTitle">---</div>
						<div class="ciiekpistyle fontUnitTime">ms</div>
					</div>
					<div class="roamGaugeTitle">HTTP响应时延</div>
				</div>
				<div>
					<div class="roamGauge">
						<div id="rstp_req_wait_duration" class="ciiekpistyle fontContentTitle">---</div>
						<div class="ciiekpistyle fontUnitTime">ms</div>
					</div>
					<div class="roamGaugeTitle">视频播放时延</div>
				</div>
				
			</div>
		</div>
		<div class="roamRightBlock" style="width: 735px;">
			<div class="horizontalRow" style="padding:20px;margin-left: 30px;">
				<div class="icon-4gflow"></div>
				<div class="fontImportantInfo titles" style="margin-left:20px;">国际漫入用户流量(GB)</div>
			</div>
			<div style="clear:both"></div>
			<div id="flowchart" class="roamchartbg" style="width:100%;height:460px;">
			
			
				
			</div>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div class="horizontalRow roamRow" style="height:535px;margin-top:50px;">
		<div class="roamRightBlock" style="width: 715px;">
			<div class="horizontalRow" style="padding:20px;">
				<div class="icon-terminal"></div>
				<div class="fontImportantInfo titles" style="margin-left:20px;">国际漫入用户终端</div>
			</div>
			<div style="clear:both"></div>
			<div id="terminalchart" style="width:100%;height:460px;padding-left:25px;">
				
			</div>
		</div>
		<div class="roamRightBlock" style="width:715px">
			<div class="horizontalRow" style="padding:20px;">
				<div class="icon-app"></div>
				<div class="fontImportantInfo titles" style="margin-left:20px;">国际漫入用户重点业务应用</div>
			</div>
			<div style="clear:both"></div>
			<div id="appGrid" style="width:715px;height:460px;">
				<div id="appGridHeader" class="horizontalRow fontSubInfo" style="text-align:center;" >
					<div>业务</div>
					<div>用户数<div class="fontUnitTime">(人)</div></div>
					<div>流量<div class="fontUnitTime">(GB)</div></div>
					<div>下载速率<div class="fontUnitTime">(Mbps)</div></div>
				</div>
				<div id="appGridBody" class="horizontalRow appGridBody" >
					
				</div>
			</div>
		</div>
	</div>
</div>

<div id="roamCtrl" style="width:278px;height:auto;overflow:hidden;position:absolute;right:10px;top:110px;position: absolute;display:none;">
		<img id='optical_img'  data-bool='false'>
		<img id='optical3_img'  data-bool='false' onclick='BoolClick(this)' style="position: absolute;top: 2px;left:0px;cursor: pointer;">
		<img id='optical1_img'  data-bool='false' style="position: absolute;top: 2px;left: 3px;cursor: pointer;">
		<img id='optical2_img'  data-bool='false' style="position: absolute;top: 2px;left:115px;cursor: pointer;display:none">
		
		<div id="optical1_img_span" style="position: absolute;top:5px;left: 35px;font-size: 30px;cursor: pointer;" onclick='BoolClick(this)'  data-name="国际">国际</div>
		<div id="optical2_img_span" style="position: absolute;top:5px;left: 165px;font-size: 30px;cursor: pointer;" onclick='BoolClick(this)'  data-name="省际">省际</div>
		<div id="optical"></div>
	</div>
</body>

<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/roam/roamright.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/commonComp.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var screen=null;
$(function(){
	if(isScreenMode=="true"){
		
	}else{
		new CIIENEW.NavigatorSingle('漫游保障-漫游分析');
		$('.screentitle_s').css('display','block');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		
		zoomPage(1870,1300);
		setInterval(refreshTime,1000);
		
	}
	//screen=new CIIENEW.Screen(CIIE.SCREEN_HOT);
	screen=new CIIENEW.Roam();
});
function updateHotspot(hotspot){
	if(screen!=null){
		screen.hotspot=hotspot;
		screen.update();
	}
}
function updateRoamType(roamType){
	if(screen!=null){
		screen.roamType=roamType;
		screen.update();
	}
}
function updateByNav(hotspot,bool,roamType){
	if(screen!=null){
		screen.hotspot=hotspot;
		screen.roamType=roamType;
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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/roam/roamctrl.js"></script>

</html>