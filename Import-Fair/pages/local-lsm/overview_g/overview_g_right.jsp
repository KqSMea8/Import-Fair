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


<link rel="stylesheet"href="${ctx}/static/styles/local-lsm/overviewleft/communityManage.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/groupscreen/gs.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<link rel="stylesheet"href="${ctx}/scripts/local-lsm/overview/ft-carousel.css" />
<title>中国国际进口博览会通信保障</title>
<style type="text/css">
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
.reversal {
transform: rotateY(360deg);
-ms-transform: rotatY(360deg);
-moz-transform: rotateY(360deg); 
-webkit-transform: rotateY(360deg);
-o-transform: rotateY(360deg);
transition: all 1s ease-in-out;
-moz-transition: all 1s ease-in-out; 
-webkit-transition: all 1s ease-in-out; 
-o-transition: all 1s ease-in-out; 
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
<body style="width:1000px;height:1050px;position:absolute;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s" style="width:600px;margin-left:-300px;"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div>
<div class="bgR" style=" position:absolute">
<div style="width:100%;">
	<div style="width:100%;margin-top:10px">
		<div class="horizontalRow" style="line-height:32px;">
			<div class="icon-gc"></div>
			<div class="fontImportantInfo" style="margin-left:15px;">集客业务</div>
		</div>
		<div style="clear:both;"></div>
		<div class="horizontalRow" style="margin-top:15px;">
			<div class="bg-spframe horizontalRow" >
				<div class="spframe-title">集团客户数</div>
				<div class="spframe-value">
					<div id="allCustomer" class="ciiekpistyle fontImportantInfo">--</div>
					<div class="ciiekpistyle fontUnitTime" style="margin-top:10px;margin-left:5px;" id="allCustomer_span">万个</div>
				</div>
			</div>
			<div class="bg-spframe horizontalRow" style="margin-left:15px;">
				<div class="spframe-title">故障客户数</div>
				<div class="spframe-value">
					<div id="faultCustomer" class="ciiekpistyle fontImportantInfo">--</div>
					<div class="ciiekpistyle fontUnitTime" id="faultCustomer_span" style="margin-top:10px;margin-left:5px;">个</div>
				</div>
			</div>
			<div class="bg-spframe horizontalRow" style="margin-top:20px;">
				<div class="spframe-title">集团专线数</div>
				<div class="spframe-value">
					<div id="allSpline" class="ciiekpistyle fontImportantInfo">--</div>
					<div class="ciiekpistyle fontUnitTime" style="margin-top:10px;margin-left:5px;" id="allSpline_span">万条</div>
				</div>
			</div>
			<div class="bg-spframe horizontalRow" style="margin-top:20px;margin-left:15px;">
				<div class="spframe-title">故障专线数</div>
				<div class="spframe-value">
					<div id="faultSpline" class="ciiekpistyle fontImportantInfo">--</div>
					<div class="ciiekpistyle fontUnitTime"  id="faultSpline_span"style="margin-top:10px;margin-left:5px;">个</div>
				</div>
			</div>
		</div>
		<div style="clear:both;"></div>
	</div>
	<div style="width:100%;margin-top:30px;">
		<div class="horizontalRow" style="line-height:32px;">
			<div class="icon-fc"></div>
			<div class="fontImportantInfo" style="margin-left:15px;">家客业务</div>
		</div>
		<div style="clear:both;"></div>
			<div style="margin-left: 20px;display:none"><span id="jtyw_g_Grouping_span" style="font-size:20px;"></span></div>
			<div id="jtyw_g_switch" style="position: absolute;"></div>
			<div  class="horizontalRow ft-carousel" id="carousel_1">
				<div style="background-color: rgba(0, 102, 255, 0);width:960px;height: 330px;" id="jtyw_g"></div>
			</div> 
		</div>
		<div style="clear:both;"></div>
	</div>
	<div id="popover" style="margin-top: -10px;"></div>
	 <div style="width:100%;margin-top:30px;">
		<div class="horizontalRow" style="line-height:32px;">
			<div class="icon-fca"></div>
			<div class="fontImportantInfo" style="margin-left:15px;" id="jkzl_div"></div>
		</div>
		<div style="clear:both;"></div>
		<div id="jkzl_g_switch" style="position: absolute;"></div>
		<div  class="horizontalRow ft-carousel" id="carousel_2">
			<div class="horizontalRow" style="background-color: rgba(0, 102, 255, 0);width:960px;height: 280px;margin-top:15px;overflow:hidden;" id="jkzl_g"></div>
		</div> 
		<div style="clear:both;"></div>
	</div> 
</div>
</div>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>

<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/ft-carousel.min.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview_g/overview_g_right.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/configuration.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/overviews.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popoverposition.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popover2.js"></script>
<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var SCREEN=null;
$(function(){
	SCREEN=new CIIENEW.GroupScreenOv();
	
	if(isScreenMode=="true"){
	}else{
		new CIIENEW.NavigatorSingle('场馆保障-场馆概览');
		$('.screentitle_s').css('display','block');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		zoomPage(1000,1100);
		setInterval(refreshTime,1000);
	}
	
});

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