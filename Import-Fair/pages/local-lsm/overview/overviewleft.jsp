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
<link rel="stylesheet"href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
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
}

.leaflet-left {
	left: 30px;
}

.leaflet-top {
	top: 30px;
}

#qw_ydyw>.carousel-inner {
	margin-top: 45px;
}
#qw_jtyw>.carousel-inner {
	margin-top: 67px;
}
.modal,.modal-content{
	background-color: rgba(0, 0, 0,0.75) !important;
}
#qw_ydyw_ecarts_span{
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
.span{
    text-align: center;
    display: block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>
</head>

<body style="width: 2000px; height: 1200px;">
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div>
	<div class="bgL">
		<div style="width:360px;position: relative;height: 60px;top: -20px; font-size: 40px;color: #66E6FF">
			<span>全网</span><img id="k_img" src="${ctx}/static/images/overview/k_1-1.png" style="margin: 0 7px;cursor:pointer;height: 40px;"><span>保障区域</span>
		</div>
		<div class="horizontalRow example" style="width: 1326px; margin-top: -10px; height: 400px;margin-right:24px;position: relative;">
			<div class="horizontalRow ft-carousel" style="line-height: 48px;" id="carousel_1">
				<div class="icon-mobile"></div>
				<div class="fontContentTitle" style="margin-left: 20px;">移动业务</div>
				<div style="margin-left: 20px;"><span id="qw_ydyw_Grouping_span" style="font-size:30px"></span></div>
				<div style="float: right; margin-right: 300px;" onmouseover="img_onmouseover('qw_ydyw');" onmouseout ="img_mouseout('qw_ydyw')"><img id="qw_ydyw_img" onclick="_model('qw_ydyw')" style="cursor:pointer;visibility:hidden"></div>
				<div onmouseover="Roll_img_onmouseover('qw_ydyw');" onmouseout ="Roll_img_mouseout('qw_ydyw')" style="font-size: 20px;float: right; color: #fff;cursor:pointer;z-index: 10; top: 5px;position: absolute;left: 500px;">
					<div style="visibility: hidden;" id="qw_ydyw_Roll_img_div"><span style="margin-right:20px">滚动:</span><span>是</span><img id="qw_ydyw_Roll_img" onclick="Roll_img_click('qw_ydyw')" src="${ctx}/static/images/overview/k_2.png" style="margin: 0 7px;cursor:pointer;"><span>否</span></div>
				</div>
				<div id="qw_ydyw_switch"></div>
				<br />
				<div id="qw_ydyw"></div>
			</div>
		</div>
		<div id="popover" style="position:relative; margin-top: -10px;"></div>
		<div style="width: 570px; height: 400px; float: right;position:relative;margin-top: -10px;">
			<div style="width: 48px; height: 48px; background-size: 100% 100%;" id="qw_trend_img"></div>
			<div class="fontContentTitle"style="margin-left: 56px; margin-top: -60px">
				<span id="ecarts_span" style="font-size:42px"></span>
			</div>
			<div style="float: right;z-index:10;position: absolute;right:30px; top:0px;cursor:pointer;top:0px" id="zt_img" >
				<img src="${ctx}/static/images/overview/fd.png">
			</div>
			<div style="background-color: rgba(0, 102, 255, 0.15);height: 330px;border-radius: 5px; width: 100%;top: 63px;position: absolute;">
				<div style="font-size: 20px;right: 30px;z-index:10;position: absolute;cursor:pointer;top: 10px" id="ecarts_val"></div>
 				<div id="ecarts" style="height: 280px; width: 100%;position: absolute;top: 40px;border-radius: 5px;"></div>
			</div>
		</div>
		<div class="horizontalRow example" style="width: 870px; height: 250px; margin-top: 40px;margin-right:24px;position:relative;">
			<div class="horizontalRow ft-carousel" style="line-height: 68px;" id="carousel_3">
				<div class="icon-zqyw"></div>
				<div class="fontContentTitle" style="left:70px;top: -15px;z-index:10;position: absolute;">政企业务</div>
				 <!-- <div style="left:280px;top: -15px;z-index:10;position: absolute;"><span id="qw_zqyw_Grouping_span" style="font-size: 20px;"></span></div> -->
				 <%-- <div onmouseover="Roll_img_onmouseover('qw_zqyw');" onmouseout ="Roll_img_mouseout('qw_zqyw')" style="font-size: 20px;float: right; color: #fff;cursor:pointer;z-index: 10; top:-10px;position: absolute;left: 410px;">
					 <div style="visibility: hidden;" id="qw_zqyw_Roll_img_div"><span style="margin-right:20px">滚动:</span><span>是</span><img id="qw_zqyw_Roll_img" onclick="Roll_img_click('qw_zqyw')" src="${ctx}/static/images/overview/k_2.png" style="margin: 0 7px;cursor:pointer;"><span>否</span></div>
				</div> --%>
				<!-- <div style="right: 130px;height: 40px;z-index:10;position: absolute;" onmouseover="img_onmouseover('qw_zqyw');" onmouseout ="img_mouseout('qw_zqyw')"><img id="qw_zqyw_img" onclick="_model('qw_zqyw')" style="cursor:pointer;margin-top: -35px;visibility:hidden"></div><div id="qw_zqyw_switch"></div><br/> -->
				<div id="qw_zqyw"></div>
			</div>
		</div>
		<div class="horizontalRow example"  style="width: 1024px; height: 250px; margin-top: 40px;">
			<div class=" horizontalRow ft-carousel" style="line-height: 68px;" id="carousel_2">
				<div style="width: 48px; height: 48px; background-size: 100% 100%;margin-top: -20px;"><img src="${ctx}/static/images/overview/jtyw.png"></div>
				<div class="fontContentTitle" style="margin-left: 20px;margin-top: -10px;">家庭业务</div>
				<div style="margin-left: 20px;margin-top: -10px;"><span id="qw_jtyw_Grouping_span" style="font-size:30px"></span></div>
				<div onmouseover="Roll_img_onmouseover('qw_jtyw');" onmouseout ="Roll_img_mouseout('qw_jtyw')" style="font-size: 20px;float: right; color: #fff;cursor:pointer;z-index: 10; top:-5px;position: absolute;left: 470px;">
					<div style="visibility: hidden;" id="qw_jtyw_Roll_img_div"><span style="margin-right:20px">滚动:</span><span>是</span><img id="qw_jtyw_Roll_img" onclick="Roll_img_click('qw_jtyw')" src="${ctx}/static/images/overview/k_2.png" style="margin: 0 7px;cursor:pointer;"><span>否</span></div>
				</div>
				<div style="float: right; z-index:10;position: absolute;left: 690px;margin-top: -10px;" onmouseover="img_onmouseover('qw_jtyw');" onmouseout ="img_mouseout('qw_jtyw')"><img id="qw_jtyw_img" onclick="_model('qw_jtyw')" style="cursor:pointer;visibility:hidden"></div>
				<div style="margin-left: 30px;"></div>
				<div id="qw_jtyw_switch"></div>
				<br/>
				<div id="qw_jtyw" style="margin-top: 10px;"></div>
			</div>
		</div>
		<div class="horizontalRow" style="width: 435px;height: 355px;margin-top: 40px;position: relative;">
			 <div onmouseover="Roll_img_onmouseover('qw_aqxi');" onmouseout ="Roll_img_mouseout('qw_aqxi')" style="font-size: 20px;float: right; color: #fff;cursor:pointer;z-index: 10;position: absolute;left: 320px;">
					<div style="visibility: hidden;" id="qw_aqxi_Roll_img_div"><span>安</span><img id="qw_aqxi_Roll_img"  src="${ctx}/static/images/overview/k_2.png" style="margin: 0 7px;cursor:pointer;" data-bool="false"><span>物</span></div>
			</div> 
			<div class="horizontalRow" style="line-height: 68px;">
				<div style="width: 48px; height: 48px; background-size: 100% 100%; margin-top: -20px;">
					<img id="qw_aqxi_img" src="${ctx}/static/images/overview/wlw.png">
				</div>
				<div class="fontContentTitle" style="margin-left: 20px; margin-top: -20px;" id="qw_aqxi_div">物联网业务</div>
				<div id="aqxi" style="margin-top: 58px;position: absolute;" >
					
				</div>
			</div>
		</div>
		<div class="horizontalRow"
			style="width: 1460px; height: 355px; margin-top: 40px; margin-left: 24px;position:relative;">
			<div class="horizontalRow" style="line-height: 68px;">
				<div style="width: 48px; height: 48px; background-size: 100% 100%; margin-top: -20px;">
					<img src="${ctx}/static/images/overview/CMNet.png">
				</div>
				<div class="fontContentTitle" style="margin-left: 20px; margin-top: -20px;">三方/骨干出口</div>
				<div style="margin-top: -20px;padding-right: 30px;float: right;cursor:pointer;" id="cmnet_img" > <img src="${ctx}/static/images/overview/fd.png"></div>
				<div style="z-index: 10; position: absolute;left: 750px;position: relative;top:50px;z-index:10;"><div><span style="display:inline-block;margin-right:5px;border-radius:15px;width:40px;height:15px;background-color:#72d427;"></span><span>上行</span><span style="display:inline-block;margin-right:5px;border-radius:15px;width:40px;height:15px;background-color:#3399ff;margin-left: 30px;"></span><span>下行</span></div></div>
				<div style="height:300px;width:1460px;position:relative;background-color: rgba(0, 102, 255, 0.15);top:-10px">
					<img src="${ctx}/static/images/overview/CMNET_s.png"style="height:295px;width:1460px;z-index:10;position: absolute;">
					<img src="${ctx}/static/images/overview/CMNET_s_2.gif" style="height:295px;width:1460px;z-index:10;position: absolute;">
				</div>
				<div id="cmnet_div"></div>
			</div>
		</div>
	</div>
	<!-- 弹出 趋势图 -->
	<div class="modal fade" id="Trend_Modal" style="position:absolute;">
		<div class="modal-dialog"
			style="width: 1600px; height: 900px; margin: 20px auto;">
			<div class="modal-content">
				<div class="modal-header" style="font-size:40px;text-align: center;"><span id="ecarts_Modal_span"></span>&nbsp<span id="ecarts_Modal_span_val" style="font-size: 30px;"></span></div>
				<div class="modal-body" id="modal-body">
					<div id="ecarts_Modal" style="height: 900px; width: 1530px;border: solid 1px #2431ac;margin:20px;background-color: rgba(0,4,66,0.75);border-radius: 15px;"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- 弹出 -->
	<div class="modal fade" id="CMNet_Modal" style="position:absolute;">
		<div class="modal-dialog"
			style="width: 1600px; height: 900px; margin: 20px auto;position: relative;">
			<div class="modal-content" style="background-color: rgba(0, 0, 0,0) !important;">
				<div style="height:900px;width:1530px;margin-top:150px">
				<img src="${ctx}/static/images/overview/CMNET_background.png">
				<img src="${ctx}/static/images/overview/CMNET-S-S.png" style="top:200px;margin-left:40px;z-index:10;position: absolute;left:0px">
				<img src="${ctx}/static/images/overview/CMNET-S-S-2.gif" style="top:200px;margin-left:40px;z-index:10;position: absolute;left:0px">
				<img src="${ctx}/static/images/overview/return.png" style="top: 200px;left: 1430px;cursor:pointer;z-index:10;position: absolute;" id="CMNet_Modal_remove"></div>
				<div style="z-index: 10; position: absolute;right: 500px;top: 220px;"><div><span style="display:inline-block;margin-right:5px;border-radius:15px;width:40px;height:15px;background-color:#72d427;"></span><span>上行</span><span style="display:inline-block;margin-right:5px;border-radius:15px;width:40px;height:15px;background-color:#3399ff;margin-left: 30px;"></span><span>下行</span></div></div>
				<div id="CMNet_Modal_index"></div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="index_modal" style="position:absolute;"></div>
	<div class="modal fade" id="alarm" style="position:absolute;"></div>
</body>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/overview/echarts.min.js"></script>

<!-- jquery loadmask -->
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>

<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/overview/ft-carousel.min.js"></script>

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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/overviewleft.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/ecarts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/layout.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popover.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popoverposition.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/configuration.js"></script>
<script type="text/javascript">
	window.onload = function() {
		overviewleft.init();
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
	/* function updateHotspot(hotspot) {
		if (screen != null) {
			screen.hotspot = hotspot;
			screen.update();
		}
	} */

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
</script>
</html>