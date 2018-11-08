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
	margin-top:10px;
}
.ciiekpivalue{
    font-size: 32px;
}
.fontSubInfo{
  font-size: 20px;
}
.css{
	cursor:pointer;
	background-color:rgba(0, 102, 255, 0.15);
	height:125px; 
	border-radius: 10px;
	width:690px;
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
	width:455px;
	height:125px; 
	border-radius: 10px;
	float:left;
}
.ciiekpiratio{
   height: 45px;
}
</style>
</head>
<body style="width:2000px;height:1200px;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div>
<div class="bgL">
	<div class="horizontalRow roamRow" style="height:415px;">
		<div style="width:930px;height:100%;">
				<div class="horizontalRow roamTypeBlock css" trendType="intl">
					<div class="icon-intlroamin" style="margin-top:15px;"></div>
					<div style="width:590px;padding-left:10px;">
						<div class="horizontalRow" style="height:56px;">
							<div class="fontSubInfo" style="line-height:56px;font-size: 32px;" >国际及港澳台</div>
							<div class="ciiekpistyle fontUnitTime" style="float:right;line-height:50px;" id="intlroamin_dw"></div>
							<div id="intlroamin" class="ciiekpivalue" style="float:right;font-weight:bold;">--</div>
						</div>
						<div style="clear:both;"></div>
						<div class="roambarbg">
							<div style="width:50%;" class="roambarcolor1"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:22%">
							<div class="threeround" style="margin-top: 5px;">同</div>
							<div class="icon-up" style="margin-top:19px;" id="icon-up1"></div>
							<div id="intlroamintb" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:52px;">%</div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:24%">
							<div style="padding: 5px;margin-top: 6px;">2G:</div>
							<div id="intlroamin_g2_uc" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="intlroamin_g2_uc_dw"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:30%">
							<div style="padding: 5px;margin-top: 6px;">4G:</div>
							<div id="intlroamin_g4_uc" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="intlroamin_g4_uc_dw"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:24%">
							<div style="padding: 5px;margin-top: 6px;">4G+:</div>
							<div id="intlroamin_fdd_uc" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="intlroamin_fdd_uc_dw"></div>
						</div>
					</div>
				</div>
				<div class="lj">
					<div style="font-size: 26px;"><div style="padding-top: 10px;padding-left: 10px;">日累计</div></div>
					<div style="color: #66e6ff;text-align: center;"><span style="font-size: 36px;" id="roamSelectors_intl_g">---</span><span id="roamSelectors_intl_g_dw"></span></div>
				</div>
				<div class="horizontalRow roamTypeBlock css" trendType="pro"  style="margin-top:20px;">
					<div class="icon-provroamin" style="margin-top:15px;"></div>
					<div style="width:590px;padding-left:10px;">
						<div class="horizontalRow" style="height:56px;">
							<div class="fontSubInfo" style="line-height:56px;font-size: 32px;">省际</div>
							<div class="ciiekpistyle fontUnitTime" style="float:right;line-height:50px;" id="provroamin_dw"></div>
							<div id="provroamin" class="ciiekpivalue" style="float:right;font-weight:bold;">--</div>
						</div>
						<div style="clear:both;"></div>
						<div class="roambarbg">
							<div style="width:50%;" class="roambarcolor1"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:22%">
							<div class="threeround" style="margin-top: 5px;">同</div>
							<div class="icon-up" style="margin-top:19px;" id="icon-up2"></div>
							<div id="provroamintb" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:52px;">%</div>
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
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:24%">
							<div style="padding: 5px;margin-top: 6px;">4G+:</div>
							<div id="provroamin_fdd_uc" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="provroamin_fdd_uc_dw"></div>
						</div>
					</div>
				</div>
				<div class="lj" style="margin-top:20px">
					<div style="font-size: 26px;"><div style="padding-top: 10px;padding-left: 10px;">日累计</div></div>
					<div style="color: #66e6ff;text-align: center;"><span style="font-size: 36px;" id="roamSelectors_pro_g">---</span><span id="roamSelectors_pro_g_dw"></span></div>
				</div>
				<div class="horizontalRow roamTypeBlock road" trendType="road">
					<div class="icon-oneroad" style="margin-top:15px;"></div>
					<div style="width:355px;padding-left:10px;">
						<div class="horizontalRow" style="height:56px;">
							<div class="fontSubInfo" style="line-height:56px;font-size: 32px;">元首参会国</div>
							<div class="ciiekpistyle fontUnitTime" style="float:right;line-height:50px;" id="roadroamin_dw"></div>
							<div id="roadroamin" class="ciiekpivalue" style="float:right;font-weight:bold;">--</div>
						</div>
						<div style="clear:both;"></div>
						<div class="roambarbg">
							<div style="width:50%;" class="roambarcolor1"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:40%">
							<div class="threeround" style="margin-top: 5px;">同</div>
							<div class="icon-up" style="margin-top:20px;" id="icon-up3"></div>
							<div id="roadroamintb" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:52px;">%</div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:-2px;width:60%">
							<div class="threeround" style="margin-top: 5px;">日累计</div>
							<div id="roamSelectors_intl_ys_g" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="roamSelectors_intl_ys_g_dw"></div>
						</div>
					</div>
				</div>
				<div class="horizontalRow roamTypeBlock road"  trendType="intl_czg" style="margin-left:20px">
					<div class="icon-czg" style="margin-top:15px;"></div>
					<div style="width:355px;padding-left:10px;">
						<div class="horizontalRow" style="height:56px;">
							<div class="fontSubInfo" style="line-height:56px;font-size: 32px;">参展国</div>
							<div class="ciiekpistyle fontUnitTime" style="float:right;line-height:50px;" id="czg_dw"></div>
							<div id="czg" class="ciiekpivalue" style="float:right;font-weight:bold;">--</div>
						</div>
						<div style="clear:both;"></div>
						<div class="roambarbg">
							<div style="width:50%;" class="roambarcolor1"></div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:10px;width:40%">
							<div class="threeround" style="margin-top: 5px;">同</div>
							<div class="icon-up" style="margin-top:20px;" id="icon-up3"></div>
							<div id="czgtb" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:52px;">%</div>
						</div>
						<div class="ciiekpiratio horizontalRow" style="margin-top:10px;width:60%">
							<div class="threeround" style="margin-top: 5px;">日累计</div>
							<div id="roamSelectors_intl_czg_g" class="fontSubInfo size">--</div>
							<div class="fontUnitTime" style="line-height:56px;font-size: 14px;" id="roamSelectors_intl_czg_g_dw"></div>
						</div>
					</div>
				</div>
		</div>
		<div class="roamchartbg" style="width:940px;height:415px;">
			<div class="horizontalRow" style="padding:20px;">
				<div class="icon-trend"></div>
				<div id="trendTitle" class="fontImportantInfo" style="margin-left:20px;">国际及港澳台漫入用户数</div>
			</div>
			<div style="clear:both"></div>
			<div id="roaminchart" style="width:100%;height:310px;"></div>
		</div>
		
	</div>
	<div class="horizontalRow roamRow" style="height:670px;margin-top:40px;">
		<div style="width:930px;height:100%;">
			<div class="horizontalRow" style="padding:20px;">
				<div class="icon-title-intlroamin"></div>
				<div class="fontImportantInfo" style="margin-left:20px;">国际及港澳台漫入</div>
			</div>
			<div style="clear:both"></div>
			<div class="roamTableHeader" style="">
				<div style="width:9.5%;">&nbsp;</div>
				<div style="width:23.5%;">国际及港澳台</div>
				<div style="width:23.5%;">用户数(人)</div>
				<div style="width:21.5%;padding-left: 20px;">同比</div>
				<div style="width:21.5%;">日累计(人)</div>
				<div style="clear:both"></div>
			</div>
			<div style="clear:both"></div>
			<div id="intlTopN" class="roamTableBody" style="">
			</div>
		</div>
		
		<div style="width:930px;height:100%;">
			<div class="horizontalRow" style="padding:20px;">
				<div class="icon-title-provroamin"></div>
				<div class="fontImportantInfo" style="margin-left:20px;">省际漫入</div>
			</div>
			<div style="clear:both"></div>
			<div class="roamTableHeader" style="">
				<div style="width:9.5%;">&nbsp;</div>
				<div style="width:23.5%;">省市</div>
				<div style="width:23.5%;">用户数(人)</div>
				<div style="width:21.5%;padding-left: 20px;">同比</div>
				<div style="width:21.5%;">日累计(人)</div>
				<div style="clear:both"></div>
			</div>
			<div style="clear:both"></div>
			<div id="provTopN" class="roamTableBody" style="">
			</div>
		</div>
	</div>
</div>

<div id="roamCtrl" style="width:278px;height:60px;overflow:hidden;position:absolute;right:10px;top:110px;position: absolute;display:none;">
		<img id='optical_img'  data-bool='false'>
		<img id='optical3_img'  data-bool='false' onclick='BoolClick(this)' style="position: absolute;top: 2px;left:0px;cursor: pointer;">
		<img id='optical1_img'  data-bool='false' style="position: absolute;top: 2px;left: 3px;cursor: pointer;">
		<img id='optical2_img'  data-bool='false' style="position: absolute;top: 2px;left:115px;cursor: pointer;display:none">
		
		<div id="optical1_img_span" style="position: absolute;top:5px;left: 35px;font-size: 30px;cursor: pointer;" onclick='BoolClick(this)' data-name="国际">国际</div>
		<div id="optical2_img_span" style="position: absolute;top:5px;left: 165px;font-size: 30px;cursor: pointer;" onclick='BoolClick(this)' data-name="省际">省际</div>
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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/roam/roamleft.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
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
		new CIIENEW.NavigatorSingle('漫游保障-漫游概览');
		$('.screentitle_s').css('display','block');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		zoomPage(2000,1300);
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
function updateByNav(hotspot,bool,roamType){
	updateHotspot(hotspot,bool,roamType);
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