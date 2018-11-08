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
<link rel="stylesheet"href="${ctx}/scripts/local-lsm/overview/ft-carousel.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/roam/roam.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/groupscreen/gs.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />

<title>上海国际进口博览会</title>
<style type="text/css">
.roamRow>div:nth-child(n+2){
   margin-left: 0px
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

<body style="width: 1000px; height: 1050px;position:absolute">
	<div class="bgL">
	<div class="horizontalRow roamRow" style="height:202px;width:960px;">
	<div class="horizontalRow" style="height:40px">
		<div class="icon_user"></div>
		<div class="fontContentTitle" style="margin-left: 20px;font-size: 32px;margin-top: -6px;margin-bottom:10px">用户数</div>
	 </div>
		<div style="width:960px;height:162px;position:relative;">
			<div class="icon_bg">
				<div style="background-color: rgba(0, 102, 255,0);position:relative;width:440px;height:80px;left:260px;cursor: pointer;" onmouseout="mouseout(this)">
					<div style="width:160px;height:80px;position:relative;float:left">
						<div style="width:160px;float:left"  class="div_center">
							<div class="icon_hyyhs  div_left_center" ></div>
							<span style="font-size: 22px;">总用户数</span>
						</div>
					</div>
					<div style="background-color: rgba(0, 102, 255,0);position:relative;width:280px;height:100%;float:left;font-size: 44px;">
						<div style="background-color: rgba(0, 102, 255, 0);height: 80px;float: left;color: #66E6FF;margin-left: 20px;" id="s_091_div"><span class="span" id="s_091" onmouseover="_onmouseover(this);" data-length="1">---</span></div>
						<div style="background-color: rgba(0, 102, 255, 0);width: 40px;height: 80px;float: left;color: #66E6FF;font-size: 24px;" id="s_091_div2"><span class="span" id="s_091_company"></span></div>
					</div>
				</div>
				<div style="position:relative;width:280px;height:65px;left: 20px;top: 15px;float: left;cursor: pointer;" onmouseout="mouseout(this)">
					<div style="background-color: rgba(0, 102, 255,0);height:100%;width:150px;float:left;font-size: 18px;"><span class="span">国际漫入用户</span></div>
					<div style="background-color: rgba(0, 102, 255,0);height:100%;width:130px;float:left;font-size: 26px;">
						<div style="background-color: rgba(0, 102, 255, 0);height: 65px;float: left;color: #66E6FF;font-size: 30px;" id="intlroamin_div"><span class="span" id="intlroamin" onmouseover="_onmouseover(this);" data-length="2">---</span></div>
						<div style="background-color: rgba(0, 102, 255, 0);width: 30px;height: 65px;float: left;color: #66E6FF;font-size: 20px;" id="intlroamin_div2"><span class="span" id="intlroamin_company">人</span></div>
					</div>
				</div>
				<div style="background-color: rgba(0, 102, 255,0);position:relative;width:260px;height:65px;left: 70px;top: 15px;float: left;cursor: pointer;" onmouseout="mouseout(this)">
					<div style="background-color: rgba(0, 102, 255,0);height:100%;width:120px;float:left;font-size: 18px;"><span class="span">漫入总用户</span></div>
					<div style="background-color: rgba(0, 102, 255,0);height:100%;width:140px;float:left;font-size: 26px;">
						<div style="background-color: rgba(0, 102, 255, 0);height: 65px;float: left;color: #66E6FF;font-size: 30px;" id="mr_div"><span class="span" id="mr" onmouseover="_onmouseover(this);" data-length="3">---</span></div>
						<div style="background-color: rgba(0, 102, 255, 0);width: 30px;height: 65px;float: left;color: #66E6FF;font-size: 20px;" id="mr_div2"><span class="span" id="mr_company">人</span></div>
					</div>
				</div>
				<div style="background-color: rgba(0, 102, 255,0);position:relative;width:280px;height:65px;left: 120px;top: 15px;float: left;cursor: pointer;" onmouseout="mouseout(this)">
					<div style="background-color: rgba(0, 102, 255,0);height:100%;width:150px;float:left;font-size: 18px;"><span class="span">国内漫入用户</span></div>
					<div style="background-color: rgba(0, 102, 255,0);height:100%;width:130px;float:left;font-size: 26px;">
						<div style="background-color: rgba(0, 102, 255, 0);height: 65px;float: left;color: #66E6FF;font-size: 30px;" id="provroamin_div"><span class="span" id="provroamin" onmouseover="_onmouseover(this);" data-length="4">---</span></div>
						<div style="background-color: rgba(0, 102, 255, 0);width: 30px;height: 65px;float: left;color: #66E6FF;font-size: 20px;" id="provroamin_div2"><span class="span" id="provroamin_company">人</span></div>
					</div>
				</div>
			</div>
		</div>
	</div> 
	<div id="popover" style="position:relative;"></div>
	<div class="horizontalRow roamRow" style="height:758px;width:960px;top:260px;position:absolute">
		 <div class="horizontalRow" style="height:40px">
			<div class="icon_Internet"></div>
			<div class="fontContentTitle" style="margin-left: 20px;font-size: 32px;margin-top: -6px;margin-bottom:10px">用户感知</div>
		 </div>
		 <div id="InternetPerception_switch" style="position: absolute;right: 40px;"></div>
		 <div style="width:960px;height:100px;margin-top: 5px;" id="InternetPerception" class="ft-carousel"></div>
		 <div id="Internet_switch" style="position: absolute;top:148px;right: 40px;"></div>
		 <div id="Internet_return" class="icon_return" style="position: absolute;top:148px;right: 40px;cursor: pointer;display:none"></div> 
		<div style="width:960px;height:566px;position:relative;margin-top: 45px;" class="ft-carousel" id="Internet"></div>
		<div style="width:960px;height:566px;position:relative;margin-top: 45px;display:none" class="ft-carousel" id="InternetNew"></div>
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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew_g/ciie_g_left.js"></script>
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
		new CIIENEW.NavigatorSingle('场景保障-场景导航');
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