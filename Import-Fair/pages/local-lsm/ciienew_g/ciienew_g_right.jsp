<!DOCTYPE html>
<%
String isScreenMode = request.getParameter("isScreenMode");
%>
<html lang="zh-CN" style="width: 100%; height: 100%;">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
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
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/groupscreen/gs.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />

<link rel="stylesheet"href="${ctx}/scripts/local-lsm/overview/ft-carousel.css" />
<title>上海国际进口博览会</title>
<style type="text/css">
.roamRow>div:nth-child(n+2) {
	margin-left: 0px
}

.div_center {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
}

.div_left_center {
	margin: auto;
	position: relative;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.div_top_center {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	text-align: center;
}

.span {
	text-align: center;
	display: block;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
}

.span_center {
	text-align: center;
	display: block;
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.roamGaugePanels>div:nth-child(n+5) {
	margin-top: 20px;
}

.roamGaugePanels>div {
	width: 25%;
	text-align: center;
	font-size: 28px;
	position: relative;
	height: 270px !important;
}

.roamGaugeTitles {
	position: absolute;
	width: 100%;
}

.icon_gauge {
	margin-left: 35px;
}

.rotate {
	transform: rotateY(180deg);
	-ms-transform: rotatY(180deg);
	-moz-transform: rotateY(180deg); 
	-webkit-transform: rotateY(180deg);
	-o-transform: rotateY(180deg);
}
.rotate_span{
	transform: rotateY(180deg);
	-ms-transform: rotatY(180deg);
	-moz-transform: rotateY(180deg); 
	-webkit-transform: rotateY(180deg);
	-o-transform: rotateY(180deg);
}
</style>
</head>

<body style="width: 1000px; height: 1050px;position:absolute">
	<div class="bgL">
	<div class="horizontalRow roamRow" style="height:340px;width:960px;margin-top:20px">
		<div style="width: 960px;height: 340px;">
			<div class="horizontalRow" style="line-height:32px;">
				<div class="icon_qst"></div>
				<div class="fontImportantInfo" style="margin-left:15px;margin-top: -2px;" id="room_gsm_div_span"></div>
			</div>
			<div style="clear:both;"></div>
			<div style="margin-left: 20px;display:none"><span id="room_gsm_Grouping_span" style="font-size:20px;"></span></div>
			<div id="room_gsm_switch" style="position: absolute;"></div>
			<div  class="horizontalRow ft-carousel" id="carousel_1" style="margin-top:10px;height: 300px;">
				<div style="background-color: rgba(0, 102, 255, 0);width:960px;height: 300px;background-color: rgba(0, 102, 255, 0.15);border-radius:10px" id="room_gsm"></div>
				<div style="background-color: rgba(0, 102, 255, 0);width:960px;height: 300px;background-color: rgba(0, 102, 255, 0.15);border-radius:10px;display:none" id="room_gsm_copy">
					<div id="room_gsm_copy_ecart" data-id="room_gsm_Grouping_ecarts" style="width:960px;height:300px;position: absolute;"></div>
				</div>
			</div> 
		</div>
	</div>
	<div id="popover" style="position:relative; margin-top: -10px;"></div>
	<div class="horizontalRow roamRow" style="height:630px;width:960px;margin-top:20px">
	<div class="roamRightBlock" style="width: 960px;height:505px;">
		<div class="horizontalRow" style="padding:20px;padding-bottom:10px;padding-top: 0px;">
			<div class="icon_hlwzl" style="margin-top: 10px;"></div>
			<div class="fontImportantInfo titles" style="margin-left:20px;">无线质量</div>
		</div>
		<div style="clear:both"></div>
		<div class="horizontalRow roamGaugePanels" id="hlwzl"></div>
	</div>
</div>
</div>
</body>

<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/ft-carousel.min.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew_g/ciie_g_right.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/configuration.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popoverposition.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popover2.js"></script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var screen=null;
$(function(){
	if(isScreenMode=="true"){
		
	}else{
		new CIIENEW.NavigatorSingle('场景保障-场景概览');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		$('.screentitle_s').css('display','block');
		zoomPage(2000,1300);
		setInterval(refreshTime,1000);
		
	}
	screen=new CIIENEW.Screen(CIIE.SCREEN_HOT);
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