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
<!-- echarts -->
<%@ include file="/common/echarts.jsp"%>
<%@ include file="/common/fontawesome/fontawesome4.3.0.jsp"%>
<%@ include file="/common/bootstrap.jsp"%>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet"
	href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<link rel="stylesheet"
	href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet"
	href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />
<link rel="stylesheet"
	href="${ctx}/static/styles/local-lsm/roam/roam.css" />
<link rel="stylesheet"
	href="${ctx}/static/styles/local-lsm/overviewleft/communityManage.css" />
<link rel="stylesheet"
	href="${ctx}/scripts/local-lsm/overview/ft-carousel.css" />
<link rel="stylesheet"
	href="${ctx}/static/images/overview/Sortable-master/app.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet"
	href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" 
	href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<title>中国国际进口博览会通信保障</title>
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
	text-align: center;
	margin: 20px auto;
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

#foo>li {
	width: 100px;
	height: 100px;
	text-align: center;
	/* 	line-height:100px; */
	float: left;
	margin: 15px;
	border: solid 1px #ececec;
	display: flex;
	justify-content: center;
	align-items: Center;
}

#bar>li {
	width: 150px;
	height: 150px;
	text-align: center;
	float: left;
	margin: 20px;
	border: solid 1px #ececec;
	display: flex;
	justify-content: center;
	align-items: Center;
}

#bar {
	height: 400px;
}
#4Gll>div>canvas{
margin-top:-30px
}
.modal,.modal-content{
	background-color: rgba(0, 0, 0,0.75) !important;
}
#appGridBody>div:nth-child(n+5){
	margin-top:10px;
}
.modal{
	top: 0!important;
}
.modal-backdrop,.modal{
	width:1550px !important;
	height:1300px !important;
}
/* IE8/9/10 */
@media screen\0{
    .modal-backdrop,.modal{
		width:100% !important;
		height:108.4% !important;
	}
}
</style>
</head>
<body style="width:1550px;height:1200px;" style="position:relative;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s" style="width:600px;margin-left:-300px;"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div>
<div class="bgR" style="width:1550px;height:1200px;">
	<div class="icon-dqcj"></div>
	<div class="fontContentTitle"
		style="margin-left: 50px; color: #66E6FF; margin-top: -60px; width: 500px;">当前场景:保障区域</div>
		<div style="float: right;margin-right:750px;margin-top: -50px;" onmouseover="zbpz_img_onmouseover(this);"onmouseout ="zbpz_img_mouseout(this)"><img id="zbpz_img" style="cursor:pointer;visibility:hidden"></div>
	<div class="horizontalRow"
		style="width: 710px; height: 505px;margin-top: 40px"
		id="right_0"></div>
	<div class="horizontalRow"
		style="width: 710px; height: 505px;margin-left: 50px; margin-top: 40px"
		id="right_1"></div>
	<div class="horizontalRow"
		style="width: 710px; height: 505px;margin-top: 40px"
		id="right_2"></div>
	<div class="horizontalRow"
		style="width: 710px; height: 505px;margin-left: 50px; margin-top: 40px"
		id="right_3"></div>
</div>
<!-- 弹出 -->
<div class="modal fade" id="hw_ecarts_Modal" style="position:absolute;">
	<div class="modal-dialog"
		style="width: 1200px; height: 900px; margin: 20px auto;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" style="font-size: 40px;text-align: center;"><span style="margin-right: 20px;">语音话务量</span><span style="font-size: 26px;">(单位:&nbsp万ERL)</span></h4>
			</div>
			<div class="modal-body" id="modal-body" style="border: solid 1px #2431ac;margin:20px;background-color: rgba(0,4,66,0.75);border-radius: 15px;">
				<div id="hul_ecarts_Modal_option"style="height: 900px; width: 1130px"></div>
			</div>
		</div>
	</div>
</div>
<!-- 弹出 -->
<div class="modal fade" id="liu_ecarts_Modal" style="position:absolute;">
	<div class="modal-dialog"
		style="width: 1200px; height: 900px; margin: 20px auto;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" style="font-size: 40px;text-align: center;"><span style="margin-right: 20px;">4G流量</span><span style="font-size: 26px;">(单位:&nbspGB)</span></h4>
			</div>
			<div class="modal-body" id="modal-body" style="border: solid 1px #2431ac;margin:20px;background-color: rgba(0,4,66,0.75);border-radius: 15px;">
				<div id="4Gll_ecarts_Modal_option"style="height: 900px; width: 1130px"></div>
			</div>
		</div>
	</div>
</div>
<!-- 弹出 -->
<div class="modal fade" id="zbpz_Modal" style="position:absolute;">
	<div class="modal-dialog"
		style="width: 1000px; height: 1000px; margin: 20px auto;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" style="font-size: 40px;">布局配置</h4>
			</div>
			<div id="modal-body" style="width:1000px;height: 900px;">
				<div class="container"
					style="height: 900px; width: 800px; margin-lrft: 100px">
					<div class="bar layer block"
						style="margin-bottom: 40px; border: 4px solid #1A4176; width: 400px; height: 400px; margin-left: 180px; margin-top: 40px;">
						<ul id="bar" class="block__list"></ul>
					</div>
					<div class="layer block"
						style="border: 4px solid #1A4176;margin-top:650px; width: 800px;">
						<ul id="foo" class="block__list"></ul>
					</div>
				</div>
			</div>
			<div style="margin-top: 20px;">
				<button type="button" class="btn btn-lg btn-primary"
					style="margin-left: 40%; margin-right: 20px; margin-bottom: 20px;; font-size: 30px"
					id="confirm">确认</button>
				<button type="button" class="btn btn-default btn-lg"
					style="margin-bottom: 20px; font-size: 30px; background-color: rgba(250, 250, 250, 1) !important; color: #000"
					id="close">取消</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="top_ecarts_Modal" style="position:absolute;">
	<div class="modal-dialog" style="width: 1200px; height:900px;margin: 20px auto;">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" style="font-size:40px"><span>终端占比</span></h4>
			</div>
			<div class="modal-body" id="modal-body">
				<div id="top_ecarts_Modal_option" style="height: 900px; width: 1130px;border: solid 1px #2431ac;margin:20px;background-color: rgba(0,4,66,0.75);border-radius: 15px;"></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="alarm" style="position:absolute;"></div>
</body>
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
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/ciienew/ciieleft.js"></script>
<script type="text/javascript" 
    src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>
	
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/commonComp.js"></script>
<!-- 自己 -->
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/overview/overviewright.js"></script>

<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/overview/overviewright_html.js"></script>

<script type="text/javascript" src="${ctx}/static/images/overview/Sortable-master/Sortable.js"></script>

<script type="text/javascript" src="${ctx}/static/images/overview/Sortable-master/app.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/right_ecarts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/commonComp.js"></script>

<script type="text/javascript">
 	window.onload = function() {
 		overviewright.init();
	} 
</script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
	var screen = null;
/* 	$(function() {
		if (isScreenMode == "true") {

		} else {
			new CIIENEW.NavigatorSingle('保障概览-指标概览');
			$('.screentitle_s').css('display','block');
			$('.ciienavibubble').css('bottom',-100);
			$('.ciienavibg').css('bottom',-100);
			zoomPage(1550,1300);
			setInterval(refreshTime,1000);
		}
		screen = new CIIENEW.Screen(CIIE.SCREEN_HOT);
	}); */
	function overview(){
		window.location.href=eastcom.baseURL+"/pages/local-lsm/ciienew/ciieright.jsp?isScreenMode="+isScreenMode;
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
</script>
</html>