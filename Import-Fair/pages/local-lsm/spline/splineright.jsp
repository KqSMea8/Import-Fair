<!DOCTYPE html>
<%
String isScreenMode = request.getParameter("isScreenMode");
String paramId = request.getParameter("paramId");

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


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/spline/spline.css" />
<title>中国国际进口博览会通信保障</title>
<style type="text/css">
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	} 
	.ui-jqgrid tr.jqgrow td {
	    font-weight: normal;
	    overflow: hidden;
	    white-space: pre;
	    word-wrap: break-word;
	    word-break: break-all;
	    height: 4.1em;
	    padding: 0 2px 0 2px;
	    border-bottom-width: 0px;
	    border-bottom-color: none;
	    border-bottom-style: none;
	    text-align: center;
	    font-size: 2.1em;
	}
	 /* Firefox */
	.ui-jqgrid-bdiv { overflow: -moz-scrollbars-none; }
	 /* IE 10+*/
	.ui-jqgrid-bdiv { -ms-overflow-style: none; }
	 /* for Chrome */
	.ui-jqgrid-bdiv::-webkit-scrollbar {
	    display: none;
	}
</style>
</head>
<body style="width:1550px;height:1200px;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s" style="width:600px;margin-left:-300px;"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div>
<div class="bgR">
	<div class="blockRight" style="width:100%;padding:0px;" >
		<div style="width:100%;">
			<div class="ciiepanel" style="width:100%;height:700px;float:left;line-height:48px;">
				<div class="ciietitle">
					<div class="gc-icon-splist"></div>
					<div>保障专线</div>
					<div id="returnBtn" class="icon-return" style="display:none;cursor:pointer;float:right;"></div>
				</div>
				<div id="a" class="ciiecontent" style="padding:0px;">
					<table id="table" style="width:100%;height:100%;"></table>
				</div>
				<div id="b"class="ciiecontent" style="padding:0px;display:none">
					<table id="isMtable" style="width:100%;height:100%;"></table>
				</div>
			</div>
		</div>
		<div id="singleLineParent" style="width:100%;display:none;">
			<div class="ciiepanel" style="width:100%;height:400px;float:left;">
				<div class="ciietitle" style="line-height:48px;">
					<div class="gc-icon-spinternetp"></div>
					<div>专线性能<span id="singleLineId"></span></div>
				</div>
				<div class="ciiecontent" style="height:380px;padding:15px 15px 0px 15px;">
					<div id="chart0_1" style="width:100%;height:100%;"></div>
				</div>
			</div>
		</div>
	</div>
		
</div>
</div>
<div class="modal fade"  id="modalWin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:1400px;">
		<div class="modal-content" >
			<div class="modal-header" style="border-bottom:none;">
				<h4 class="modal-title" id="modalWinTitle" style="font-size:32px;">
				</h4>
			</div>
			<div class="modal-body" id="modalWinBody" style="width:100%;height:900px;overflow:auto;">
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
</body>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/spline/splineright.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>
<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var paramId="<%=paramId%>";

var SCREEN=null;
$(function(){
	if(isScreenMode=="true"){
	}else{
		new CIIENEW.NavigatorSingle('专线保障-专线清单');
		$('.screentitle_s').css('display','block');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		zoomPage(1550,1300);
		setInterval(refreshTime,1000);
		
	}
	SCREEN=new GROUPCUSTOMER.Screen();
	if(paramId!=""&&paramId!="null"){
		updateCustomerNum(paramId);
	}
	
});
function updateHotspot(hotspot){
	if(SCREEN!=null){
		SCREEN.hotspot=hotspot;
		SCREEN.update();
	}
}
function updateCustomerNum(customers_num){
	if(SCREEN!=null){
		SCREEN.customers_num=customers_num;
		SCREEN.update();
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