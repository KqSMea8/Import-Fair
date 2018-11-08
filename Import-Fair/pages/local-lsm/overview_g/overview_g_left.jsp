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
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%>
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet"href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet"href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />
<link rel="stylesheet"href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet"href="${ctx}/static/styles/local-lsm/groupscreen/gs.css" />
<link rel="stylesheet"href="${ctx}/static/styles/local-lsm/overviewleft/communityManage.css" />
<link rel="stylesheet"href="${ctx}/scripts/local-lsm/overview/ft-carousel.css" />
<title>上海国际进口博览会</title>
<style type="text/css">
body {
	margin: 0;
	font-family: "微软雅黑";
	background-color: #1F1F1F;
}

.example {
	width: 1000px;
	height: 190px;
	font-size: 40px;
	text-align: right;
}

.carousel-item {
	color: #fff;
	vertical-align:bottom;
}

.leaflet-left {
	left: 30px;
}

.leaflet-top {
	top: 30px;
}

#qw_ydyw_g>.carousel-inner {
	margin-top: 25px;
}
#qw_jtyw>.carousel-inner {
	margin-top: 67px;
}
.modal,.modal-content{
	background-color: rgba(0, 0, 0,0.75) !important;
}
#qw_ydyw_g_ecarts_span{
font-size: 38px;
}
.rotate{
transform:rotate(180deg);
-ms-transform:rotate(180deg); 	/* IE 9 */
-moz-transform:rotate(180deg); 	/* Firefox */
-webkit-transform:rotate(180deg); /* Safari 和 Chrome */
-o-transform:rotate(180deg); 	/* Opera */
}
.rotate_span{
transform:rotate(180deg);
-ms-transform:rotate(180deg); 	/* IE 9 */
-moz-transform:rotate(180deg); 	/* Firefox */
-webkit-transform:rotate(180deg); /* Safari 和 Chrome */
-o-transform:rotate(180deg); 	/* Opera */
}
.modal{
	top: 0!important;
}
.modal-backdrop,.modal{
	width:2000px !important;
	height:1300px !important;
}
/* IE8/9/10 */
@media screen\0{
    .modal-backdrop,.modal{
		width:100% !important;
		height:100% !important;
	}
}
.contentItem{
    margin-top: -8px;
}
.contentItem>img{
	width:30px !important;
	margin-top: -5px;
}
#popover>div{
	height: 280px !important;
}
.div_center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
}
.div_left_center{
    margin: auto;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.div_top_center{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
}
.span{
    text-align: center;
    display: block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
.span_center{
    text-align: center;
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
._rotate {
	transform: rotateY(180deg);
	-ms-transform: rotatY(180deg);
	-moz-transform: rotateY(180deg); 
	-webkit-transform: rotateY(180deg);
	-o-transform: rotateY(180deg);
}
._rotate_span{
	transform: rotateY(180deg);
	-ms-transform: rotatY(180deg);
	-moz-transform: rotateY(180deg); 
	-webkit-transform: rotateY(180deg);
	-o-transform: rotateY(180deg);
}
</style>
</head>

<body style="width: 1000px; height: 1050px;">
 <div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div> 
	<div class="bgL">
		 <div style="background-color: rgba(0, 102, 255, 0.15);width: 640px;left: 190px;margin-bottom: 20px;height: 37px;position: absolute;">
		 	<div style="position:relative;">
				<div style="text-indent:0px;position:absolute;top:-2px;pointer-events: auto;width: 640px;"><div style="line-height: 50px;margin-top:5px;overflow: hidden;height:45px;"><div class="scrollBox" id="schedule" style="width: 100%;height:45px"></div></div></div>
			</div>
		 </div> 
		<div class="horizontalRow example" style="width: 940px; height: 270px;margin-right:24px;position: absolute;">
			<div class="horizontalRow ft-carousel" style="line-height: 48px;" id="carousel_1">
				<div class="icon-mobile"></div>
				<div class="icon_user"></div>
				<div class="fontContentTitle" style="margin-left: 20px;font-size: 34px;margin-top: -8px;">用户数</div>
				<!-- <div style="margin-left: 20px;"><span id="qw_ydyw_g_Grouping_span" style="font-size:20px"></span></div> -->
				<div id="qw_ydyw_g_switch"></div>
				<br />
				<div id="qw_ydyw_g"></div>
			</div>
		</div>
		<div id="popover" style="position:relative;"></div>
		 <div style="width: 940px; height: 320px;margin-top:300px;position: absolute;">
			<div class="icon_wireless"></div>
			<div class="fontContentTitle" style="margin-left: 40px;font-size: 34px;margin-top: -35px;">无线业务量</div>
			<div style="margin-left: 220px;margin-top: -35px;"><span id="Business_g_Grouping_span" style="font-size:20px;"></span></div>
			<div class="fontContentTitle"style="margin-left: 56px; margin-top: -60px">
				<span id="ecarts_span" style="font-size:34px"></span>
			</div>
			<div id="Ecarts_g_switch"></div>
			<div style="clear:both;"></div>
			<div  class="horizontalRow ft-carousel" id="carousel_2" style="position: absolute;margin-top: 65px;height: 258px;">
				<div style="background-color: rgba(0, 102, 255, 0.15);height: 258px; width: 100%;position: relative;" id="Business_g"></div>
			</div>
		</div>
		<div class="horizontalRow example" style="width: 940px; height: 340px;margin-top: 645px;margin-right:24px;position:absolute;">
			<div style="font-size: 20px;float: right; color: #fff;cursor:pointer;z-index: 10;position: absolute;left: 220px;">
				<div style="" id="jt_wirelessquality_Roll_img_div"><span>无线</span><img id="jt_wirelessquality_Roll_img"  src="${ctx}/static/images/overview/k_1.png" style="margin: 0 7px;cursor:pointer;" data-bool="false"><span>核心网</span></div>
			</div>
			<div class="horizontalRow ft-carousel" style="line-height: 68px;">
				<div class="icon_wirelessquality" id="wirelessquality_css"></div>
				<div class="fontContentTitle" style="left:40px;top: -20px;z-index:10;position: absolute;font-size: 34px;" id="wirelessquality_text">无线质量</div>
				<div id="wirelessquality_g_switch" style="position: absolute;right: 40px;top: -20px;"></div>
				<div style="margin-top:40px;position: absolute;width:960px;height:300px" id="wirelessquality_g"></div>
			</div>
		</div>
	</div> 
	<div id="_schedule" style="font-size: 30px;"></div>
	<div id="_schedule_s" style="font-size: 20px;"></div>
</body>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/overview/echarts.min.js"></script>

<!-- jquery loadmask -->
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/ft-carousel.min.js"></script>

<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/dragger.js"></script>

<!-- 自己 -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview_g/overview_g_left.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/layout.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popover.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popover2.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popoverposition.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/configuration.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/overviews.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/ecarts.js"></script>
<script type="text/javascript">
	window.onload = function() {
		overview_g_left.init();
	}
</script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var screen = null;
$(function() {
	if (isScreenMode == "true") {

	} else {
		new CIIENEW.NavigatorSingle('保障概览-全网概览');
		$('.screentitle_s').css('display','block');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		zoomPage(2000,1300);
		setInterval(refreshTime,1000);
	}
	//screen=new CIIENEW.Screen(CIIE.SCREEN_HOT);
});
function updateHotspot(hotspot) {
	if (screen != null) {
		screen.hotspot = hotspot;
		screen.update();
	}
}

function refreshTime() {
	var date = new Date();
	var space = '        ';
	var showTime = date.Format('yyyy-MM-dd' + space + 'hh:mm:ss');
	var weekday = new Array(7);
	weekday[0] = "星期日";
	weekday[1] = "星期一";
	weekday[2] = "星期二";
	weekday[3] = "星期三";
	weekday[4] = "星期四";
	weekday[5] = "星期五";
	weekday[6] = "星期六";
	showTime += space + weekday[date.getDay()];
	$('#screenTitleTime').text(showTime);
};
overviews.Schedule();
var overviews10_="";
window.clearInterval(overviews10_);
overviews10_=setInterval(function() {
	overviews.Schedule();
},60*60*1000); 
</script>
</html>