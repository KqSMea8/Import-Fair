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
.leaflet-left {
	left: 30px;
}

.leaflet-top {
	top: 30px;
}

.ciiekpivalue {
	font-size: 54px;
}

#roamSelectors {
	margin-left: 20px;
}

.ciiekpiratio>div {
	margin-right: 0px;
}

.size {
	font-size: 20px;
	margin-top:13px;
}
.ciiekpivalue{
    font-size: 32px;
}
.fontSubInfo{
  font-size: 18px;
}
.roamRow>div:nth-child(n+2){
margin-left: 0px;
}
.css{
	cursor:pointer;
	background-color:rgba(0, 102, 255, 0.15);
	height:115px; 
	border-radius: 10px;
	width:950px;
}
.lj{
	background-color:rgba(0, 102, 255, 0.15);
	height:125px;
	width:220px; 
	border-radius: 10px;
	float: left;
    margin-left: 20px;
}
.road{
	margin-top:20px;
	cursor:pointer;
	background-color:rgba(0, 102, 255, 0.15);
	width:465px;
	height:115px; 
	border-radius: 10px;
	float:left;
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
.ciiekpiratio{
  height: 45px;
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

<body style="width: 1000px; height: 1050px;" style="position:relative;">
	<div class="bgL">
	<div class="horizontalRow" style="height:40px">
		<div class="icon_user"></div>
		<div class="fontContentTitle" style="margin-left: 20px;font-size: 32px;margin-top: -6px;margin-bottom:10px">用户数</div>
	 </div>
	<div class="horizontalRow roamRow" style="height:400px;width:960px;margin-top:10px">
		<div style="width:960px;height:100%;">
				<div class="horizontalRow roamTypeBlock css" trendType="intl">
					<div class="icon-intlroamin" style="margin-top:15px;"></div>
					<div style="width:830px;padding-left:10px;" onmouseout="mouseout(this)">
						<div class="horizontalRow" style="height:56px;">
							<div class="fontSubInfo" style="line-height:56px;font-size: 32px;">国际及港澳台</div>
							<div class="ciiekpistyle fontUnitTime" style="float:right;line-height:50px;" id="intlroamin_dw"></div>
							<div id="intlroamin" class="ciiekpivalue" style="float:right;font-weight:bold;" onmouseover="_onmouseover(this);" data-length="1">--</div>
						</div>
						<div style="clear:both;"></div>
						<div class="roambarbg">
							<div style="width:50%;" class="roambarcolor1"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:24%">
							<div class="threeround" style="margin-top: 5px;">同</div>
							<div class="icon-up" style="margin-top:19px;" id="icon-up1"></div>
							<div id="intlroamintb" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;">%</div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:24%">
							<div style="padding: 5px;margin-top: 6px;">2G:</div>
							<div id="intlroamin_g2_uc" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="intlroamin_g2_uc_dw"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:30%">
							<div style="padding: 5px;margin-top: 6px;">4G:</div>
							<div id="intlroamin_g4_uc" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="intlroamin_g4_uc_dw">人</div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:22%">
							<div style="padding: 5px;margin-top: 6px;">4G+:</div>
							<div id="intlroamin_fdd_uc" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="intlroamin_fdd_uc_dw">人</div>
						</div>
					</div>
				</div>
<!-- 				<div class="lj">
					<div style="font-size: 26px;"><div style="padding-top: 5px;padding-left: 10px;">日累计</div></div>
					<div style="color: #66e6ff;text-align: center;"><span style="font-size: 36px;" id="roamSelectors_intl_g">---</span><span id="roamSelectors_intl_g_dw"></span></div>
				</div> -->
				<div class="horizontalRow roamTypeBlock css" trendType="pro"  style="margin-top:20px;" onmouseout="mouseout(this)">
					<div class="icon-provroamin" style="margin-top:15px;"></div>
					<div style="width:830px;padding-left:10px;">
						<div class="horizontalRow" style="height:56px;">
							<div class="fontSubInfo" style="line-height:56px;font-size: 32px;">省际</div>
							<div class="ciiekpistyle fontUnitTime" style="float:right;line-height:50px;" id="provroamin_dw"></div>
							<div id="provroamin" class="ciiekpivalue" style="float:right;font-weight:bold;" onmouseover="_onmouseover(this);" data-length="2">--</div>
						</div>
						<div style="clear:both;"></div>
						<div class="roambarbg">
							<div style="width:50%;" class="roambarcolor1"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:24%">
							<div class="threeround" style="margin-top: 5px;">同</div>
							<div class="icon-up" style="margin-top:19px;" id="icon-up2"></div>
							<div id="provroamintb" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;">%</div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:24%">
							<div style="padding: 5px;margin-top: 6px;">2G:</div>
							<div id="provroamin_g2_uc" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="provroamin_g2_uc_dw"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:30%">
							<div style="padding: 5px;margin-top: 6px;">4G:</div>
							<div id="provroamin_g4_uc" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="provroamin_g4_uc_dw"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:22%">
							<div style="padding: 5px;margin-top: 6px;">4G+:</div>
							<div id="provroamin_fdd_uc" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="provroamin_fdd_uc_dw"></div>
						</div>
					</div>
				</div>
<!-- 				<div class="lj" style="margin-top:20px">
					<div style="font-size: 26px;"><div style="padding-top: 5px;padding-left: 10px;">日累计</div></div>
					<div style="color: #66e6ff;text-align: center;"><span style="font-size: 36px;" id="roamSelectors_pro_g">---</span><span id="roamSelectors_pro_g_dw"></span></div>
				</div> -->
				<div class="horizontalRow roamTypeBlock road" trendType="road" onmouseout="mouseout(this)"> 
					<div class="icon-oneroad" style="margin-top:15px;"></div>
					<div style="width:355px;padding-left:10px;">
						<div class="horizontalRow" style="height:56px;">
							<div class="fontSubInfo" style="line-height:56px;font-size: 32px;">元首参会国</div>
							<div class="ciiekpistyle fontUnitTime" style="float:right;line-height:50px;" id="roadroamin_dw"></div>
							<div id="roadroamin" class="ciiekpivalue" style="float:right;font-weight:bold;" onmouseover="_onmouseover(this);" data-length="3">--</div>
						</div>
						<div style="clear:both;"></div>
						<div class="roambarbg">
							<div style="width:50%;" class="roambarcolor1"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:40%">
							<div class="threeround" style="margin-top: 5px;">同</div>
							<div class="icon-up" style="margin-top:20px;" id="icon-up3"></div>
							<div id="roadroamintb" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;">%</div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:60%">
							<div class="threeround" style="margin-top: 5px;">日累计</div>
							<div id="roamSelectors_intl_ys_g" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="roamSelectors_intl_ys_g_dw"></div>
						</div>
					</div>
				</div>
				<div class="horizontalRow roamTypeBlock road"  trendType="intl_czg" style="margin-left:20px" onmouseout="mouseout(this)">
					<div class="icon-czg" style="margin-top:15px;"></div>
					<div style="width:355px;padding-left:10px;">
						<div class="horizontalRow" style="height:56px;">
							<div class="fontSubInfo" style="line-height:56px;font-size: 32px;">参展国</div>
							<div class="ciiekpistyle fontUnitTime" style="float:right;line-height:50px;" id="czg_dw"></div>
							<div id="czg" class="ciiekpivalue" style="float:right;font-weight:bold;" onmouseover="_onmouseover(this);" data-length="4">--</div>
						</div>
						<div style="clear:both;"></div>
						<div class="roambarbg">
							<div style="width:50%;" class="roambarcolor1"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:40%">
							<div class="threeround" style="margin-top: 5px;">同</div>
							<div class="icon-up" style="margin-top:20px;" id="icon-up3"></div>
							<div id="czgtb" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;">%</div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:60%">
							<div class="threeround" style="margin-top: 5px;">日累计</div>
							<div id="roamSelectors_intl_czg_g" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="roamSelectors_intl_czg_g_dw">人</div>
						</div>
					</div>
				</div>
		</div>
	</div> 
	<div id="popover" style="position:relative;"></div>
	<div class="horizontalRow roamRow" style="height:220px;width:960px;margin-top:20px">
		<div style="width: 960px;height: 220px;">
			<div class="horizontalRow" style="line-height:32px;">
				<div class="icon-fc"></div>
				<div class="fontImportantInfo" style="margin-left:15px;margin-top: -2px;" id="room_g_div_span">国际漫入用户流量</div>
			</div>
			<div  class="horizontalRow ft-carousel" id="carousel_1" style="margin-top:10px;height: 180px;">
				<div style="position: relative;font-size: 20px;right: 30px;float: right;cursor:pointer;"><span id="room_g_ecarts_val"style="margin-right: 20px;">当前值:---</span><span>|</span><span id="room_g_ecarts_val2" style="margin-left: 20px;">今日累计值:---</span></div>
				<div id="room_g_ecarts" style="width:960px;height:180px;position: absolute;"></div>
			</div> 
		</div>
	</div>
	<div class="horizontalRow roamRow" style="height:300px;width:960px;margin-top:20px">
		<div class="horizontalRow" style="line-height:32px;">
			<div class="icon_gsm_hwl"></div>
			<div class="fontImportantInfo" style="margin-left:15px;margin-top: -2px;" id="traffic_intl_span"></div>
		</div>
		<div class="horizontalRow" style="width:960px;margin-top:10px;height:250px;text-align: center;border-radius: 10px;background-color: rgba(0, 102, 255, 0.15);">
			<div style="position: relative;font-size: 20px;float: right;cursor:pointer;"><span id="traffic_intl_ecarts_val"style="margin-right: 20px;">当前值:---</span></div>
			<div id="traffic_intl_ecarts" style="width:960px;height:250px;position: absolute;"></div>
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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/roam_g/roam_g_left.js"></script>
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
		new CIIENEW.NavigatorSingle('漫游保障-漫游概览');
		$('.screentitle_s').css('display','block');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		zoomPage(1680,1300);
		setInterval(refreshTime,1000);
		
	}
	//screen=new CIIENEW.Screen(CIIE.SCREEN_HOT);
	screen=new CIIENEW.Roam();
});
function updateHotspot(hotspot,bool,roamType){
	if(screen!=null){
		screen.hotspot=hotspot;
		screen.IntOrPro=bool;
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
</html>