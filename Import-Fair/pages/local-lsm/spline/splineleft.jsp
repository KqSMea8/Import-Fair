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
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/spline/spline.css" />
<title>中国国际进口博览会通信保障</title>
<style type="text/css">
.leaflet-left {
	left: 30px;
}

.leaflet-top {
	top: 30px;
}

.element, .outer-container {
	width: 940px;
	height: 588px;
}

.outer-container {
	/* border: 5px solid purple; */
	position: relative;
	overflow: hidden;
}

.element, .container {
	width: 940px;
	height: 320px;
}

.container {
	/* border: 5px solid purple; */
	position: relative;
	overflow: hidden;
}

.inner-container {
	position: absolute;
	left: 0;
	overflow-x: hidden;
	overflow-y: scroll;
}

.inner-container::-webkit-scrollbar {
	display: none;
}
.underline{
	border-bottom: 2px solid;
    padding-bottom: 1px;
    display: inline-block;
    line-height: .9;
}
.modal{
	top: 0!important;
}
</style>
</head>
<body style="width:2000px;height:1200px;" style="position:relative;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div>
<div class="bgL">
<div style="width:100%;height:100%;padding:0px;">
		<div class="horizontalRow" style="width:100%;">
			<div class="horizontalRow" style="width:940px;height:380px;float:left;">
				<div class="horizontalRow" style="width:100%;line-height:48px;">
					<div class="gc-icon-scale" style="margin-right:20px;"></div>
					<div class="fontContentTitle">保障规模</div>
				</div>
				<div class="horizontalRow" style="background-color: rgba(0,102,255,0.10);height:80%;">
					<div class="horizontalRow" style="width:35%;cursor:pointer" id="allCustomer_id" onclick="_click(this)">
						<div class="gc-shield-customer"></div>
						<div>
							<div class="ciiekpivalue"><span id="allCustomer" class="underline">---</span></div>
							<div class="fontSubInfo">保障客户<span class="fontUnitTime">(个)</span></div>
						</div>
					</div>
					<div class="horizontalRow" style="width:35%;cursor:pointer" id="allSpline_id" onclick="_click(this)">
						<div class="gc-shield-spline"></div>
						<div>
							<div class="ciiekpivalue"><span id="allSpline" class="underline">---</span></div>
							<div class="fontSubInfo">保障专线<span class="fontUnitTime">(个)</span></div>
						</div>
					</div>
					<div class="horizontalRow" style="text-align: center;width:30%;cursor:pointer" id="allSpline_id">					
						<div style="width:100%;">
							<div class="ciiekpivalue"><span id="APN_cust_cnt" class="underline">24</span></div>
							<div class="fontSubInfo">保障APN<span class="fontUnitTime">(个)</span></div>
						</div>
					</div>
					<div class="horizontalRow" style="width:35%;text-align: center; margin-top: 30px;cursor:pointer" id="media_cust_cnt_id" onclick="_click(this)">
						<div style="width:100%;">
							<div class="fontSubInfo" style="margin-left: 10%;">媒体客户</div>
							<div class="ciiekpivalue" style="display: inline-block;margin-left: 2%;"><span id="media_cust_cnt" class="underline">---</span></div>
						</div>
					</div>
					<div class="horizontalRow" style="width:35%;text-align: center;margin-top: 30px;cursor:pointer" id="spline_hall_id" onclick="_click(this)">
						<div style="width:100%;">
							<div class="fontSubInfo" style="margin-left: 10%;">展馆专线</div>
							<div  class="ciiekpivalue" style="display: inline-block;margin-left: 10%;"><span id="spline_hall" class="underline">---</span></div>
						</div>
					</div>
					<div class="horizontalRow" style="width:30%;text-align: center;margin-top: 30px;cursor:pointer" id="media_line_cnt_id" onclick="_click(this)">
						<div style="width:100%;">
							<div class="fontSubInfo" style="margin-left: 10%;">媒体专线</div>
							<div class="ciiekpivalue" style="display: inline-block;margin-left: 2%;"><span id="media_line_cnt" class="underline">---</span></div>
						</div>
					</div>
				</div>
				
				<div class="horizontalRow" style="height:250px;margin-top:50px;">
					<div class="horizontalRow" style="width:48%;background-color: rgba(0,102,255,0.10);">
						<div class="horizontalRow" style="width:100%;line-height:48px;">
							<div class="gc-icon-spfault" style="margin-right:20px;"></div>
							<div class="fontContentTitle">故障概况</div>
						</div>
						<div class="horizontalRow" style="width:100%;cursor:pointer" id="faultSpline_id" onclick="_click(this)">
							<div style="width:300px;padding:40px 0 0 40px;">
								<div class="fontContentTitle fontColorRed"><span id="faultSpline" class="underline" style="color:#66e6ff">0</span></div>
								<div class="fontSubInfo">故障专线<span class="fontUnitTime">(个)</span></div>
							</div>
							<div class="gc-mark-faultline" style="margin-left:0;"></div>
						</div>
					</div>
					<div class="horizontalRow" style="width:48%; margin-left:4%;background-color: rgba(0,102,255,0.10);">
						<div class="horizontalRow" style="width:100%;line-height:48px;">
							<div class="gc-icon-spcomplain" style="margin-right:20px;"></div>
							<div class="fontContentTitle">投诉概况</div>
						</div>
						<div class="horizontalRow" style="width:100%;cursor:pointer" id="complainSpline_id" onclick="_click(this)">
							<div style="width:300px;padding:50px 0 0 50px;">
								<div class="fontContentTitle fontColorOrange"><span id="complainSpline" class="underline" style="color:#66e6ff">0</span></div>
								<div class="fontSubInfo">投诉专线<span class="fontUnitTime">(个)</span></div>
							</div>
							<div class="gc-mark-complain" style="margin-left:0;"></div>
						</div>
					</div>
				</div>
				
				<div style="width:100%;height:400px;margin-top:50px;">
					<div class="horizontalRow" style="width:100%;line-height:48px;">
						<div class="gc-icon-spinternetp" style="margin-right:20px;"></div>
						<div class="fontContentTitle">互联网专线流量概览</div>
					</div>
					<div class="icon-fd" style="margin-left: 550px;cursor:pointer;z-index:10;position: absolute;" onclick="spline_chart0_img()"></div>
					<div class="ciiecontent" style="height:380px;padding:65px 15px 0px 15px;">
						<div id="chart0_0" style="width:100%;height:100%;"></div>
					</div>
				</div>
			</div>
			<div  style="z-index:10;position: absolute;left:1870px;width:48px;cursor: pointer;float:right"><img src="${ctx}/static/images/overview/ss.png" style="cursor: pointer;" id="ss_model"></div>
			<div name="right" style="margin-left:40px;width:940px;overflow:hidden;">
				<div style="width:100%;height:380px;">
					<div class="horizontalRow" style="width:100%;line-height:48px;">
						<div class="gc-icon-spcustomerlocal" style="margin-right:20px;"></div>
						<div class="fontContentTitle">重保客户(双跨)</div>
					</div>
					<div class="container">
				        <div class="inner-container">
				           <div class="element">
								<div id="groupCustomers" class="horizontalRow scroll_content" style="width:100%;height:320px;"></div>
							</div>
						</div>
				    </div>
				</div>
				<div style="width:100%;height:680px;margin-top:50px;">
					<div class="horizontalRow" style="width:100%;line-height:48px;">
						<div class="gc-icon-spcustomergroup" style="margin-right:20px;"></div>
						<div class="fontContentTitle">重保客户(本地)</div>
					</div>
					<div class="outer-container">
				        <div class="inner-container">
				           <div class="element">
								<div id="localCustomers" class="horizontalRow scroll_content" style="width:100%;height:588px;"></div>
							</div>
						</div>
				    </div>
				</div>
			</div>
		</div>
</div>
</div>
<!-- 弹出 -->
<div class="modal fade" id="Modal" style="position:absolute;">
	<div class="modal-dialog"
		style="width: 1600px; height: 900px; margin: 20px auto;">
		<div class="modal-content">
			<div class="modal-header" style="font-size:40px;text-align: center;">
			<span style="margin-right: 20px;">互联网专线流量概览</span><span style="font-size: 26px;">(单位:&nbspGB)</span>
			</div>
			<div class="modal-body" id="modal-body">
				<div  style="height: 900px; width: 1530px;border: solid 1px #2431ac;margin:20px;background-color: rgba(0,4,66,0.75);border-radius: 15px;">
					<div id="spline_chart0_model" style="height: 880px; width: 1530px;margin-top:20px"></div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="zbkh_Modal">
	<div class="modal-dialog" style="width: 600px; height: 200px; margin: 20px auto;">
		<div class="modal-content">
			<div class="modal-header" style="font-size:40px">
			<span>查询</span>
			</div>
			<div class="modal-body modal-header" id="modal-body" style="width:600px;height:150px">
			    <div style="font-size:30px;width:200px;margin-top:30px"><span>重保客户名称</span></div>
				<div class="input-group" style="width:350px;height:50px;float:right;margin-top:-50px">
				  <input type="text" class="form-control" placeholder="请输入重保客户的名称" aria-describedby="sizing-addon2" style="width:350px;height:50px;border-radius:5px" id="customers_name">
				</div>
			</div>
			<div>
				<button type="button" class="btn btn-lg btn-primary" style="margin-left:30%;margin-right:20px;margin-top:20px;font-size:30px" id="confirm">确认</button>
				<button type="button" class="btn btn-default btn-lg" style="margin-top:20px;font-size:30px;background-color: rgba(250, 250, 250, 1) !important;color:#000"id="close">取消</button>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="APN_Modal" style="position:absolute;">
	<div class="modal-dialog"
		style="width: 1400px; height: 1200px; margin: 20px auto;">
		<div class="modal-content">
			<div class="modal-body" id="modal-body">
				<iframe frameborder="0" style="width: 1400px; height: 1100px;" src="http://10.221.213.85:8080/shjk/shjk_hstopics.html?tabIndex=2"></iframe>
			</div>
		</div>
	</div>
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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/spline/splineleft.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/spline/matching.js"></script>
<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var SCREEN=null;
$(function(){
	if(isScreenMode=="true"){
		
	}else{
		new CIIENEW.NavigatorSingle('专线保障-政企客户');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		$('.screentitle_s').css('display','block');
		zoomPage(2000,1300);
		setInterval(refreshTime,1000);
		
	}
	SCREEN=new GROUPCUSTOMER.Screen();
	//screen=new CIIENEW.Screen(CIIE.SCREEN_HOT);
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