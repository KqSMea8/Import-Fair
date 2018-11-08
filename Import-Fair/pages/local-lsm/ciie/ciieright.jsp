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


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/map.css" />
<title>上海国际进口博览会</title>
<style type="text/css">
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	}
</style>
</head>
<body style="width:2000px;height:1200px;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
		<div class="titleAndLogo_s" style="">
			<div class="logo_s"></div>
			<div class="titleTxt_s">上海移动重要区域实时保障</div>
		</div>
		<div style="clear:both;"></div>
		<div id="screenTitleTime" class="titleTime_s">
		</div>
		<div class="subtitle_s" style="">MWC通信保障</div>
	</div>
<div class="bgR">
	<div class="blockRight" style="padding-left:0px;" >
		<div class="screencol" style="width:620px;" >
			<div class="centerKpiFrame">
				<div id="centerKpi0" class="centerHotspotKpiFrameParent" style="height:220px;overflow:hidden;">
					
				</div>
				<div class="centerHotspotKpiFrameParent" style="overflow:hidden;position:relative;table-layout: fixed; word-wrap: break-word; ">
					<div id="centerKpi" style="width:100%;height:880px;overflow:hidden;position:absolute;top:0;left:0;">
					
					</div>
				</div>
				
			</div>
		</div>
		<div class="screencol" style="margin-left:30px;width:1270px;" >
			<div id="scrollTable" class="ciiepanel needPause">
				<div class="ciietitle">
					<div class="icon-hotlist"></div>
					<div id="rightTableTitle" class="rightTableTitleFunc" style="cursor:pointer;" name="场馆列表">场馆列表</div>
					<div id="rightTableIcon" class="rightTableTitleFunc icon-hot" style="cursor:pointer;"  name="场馆列表"></div>
					<div class="toolbox"><div id="hotListReturn" style="display:none;" class="icon-return"></div></div>
				</div>
				<div style="width:100%;height:530px;">
					<table id="table" style="width:100%;height:100%;"></table>
				</div>
			</div>
			<div style="width:100%;margin-top:40px;" >
				<div class="rankchart ciiepanel" style="width:620px;float:left;">
					<div class="ciietitle">
						<div class="icon-dataDistribute"></div>
						<div>数据业务分布</div>
						<div class="toolbox" >
							<div class="mtTypeBtn btn-major"></div>
						</div>
					</div>
					<div class="ciiecontent" style="padding:0;">
						<div style="width:620px;height:440px;overflow:hidden;">
							<div id="majorRankChart" style="width:620px;height:440px;"></div>
						</div>
					</div>
				</div>
				<div class="rankchart ciiepanel" style="width:620px;float:left;display:none;">
					<div class="ciietitle">
						<div class="icon-dataDistribute"></div>
						<div>终端排名</div>
						<div class="toolbox" >
							<div class="mtTypeBtn btn-terminal"></div>
							<div id="terminalReturn" style="display:none;" class="icon-return"></div>
						</div>
					</div>
					<div class="ciiecontent" style="padding:0;">
						<div style="width:620px;height:440px;overflow:hidden;">
							<div id="terminalRankChart" style="width:620px;height:440px;"></div>
						</div>
					</div>
				</div>
				<div id="pphigh" class="ciiepanel pptable" style="width:620px;float:left;margin-left:30px;">
					<div class="ciietitle">
						<div class="icon-pphigh"></div>
						<div>流量占比<span style="color:#ff5252;">高于</span>全网</div>
						<div class="toolbox" >
							<div class="ppTypeBtn btn-higher"></div>
						</div>
					</div>
					<div class="ciiecontent" style="padding:0;">
						<table id="appHigher" style="width:100%;height:100%;"></table>
					</div>
				</div>
				<div id="pplow" class="ciiepanel pptable" style="width:620px;float:left;margin-left:30px;display:none;">
					<div class="ciietitle">
						<div class="icon-pplow"></div>
						<div>流量占比<span style="color:#00ffaa;">低于</span>全网</div>
						<div class="toolbox" >
<!-- 							<div class="btn-group"> -->
<!-- 							    <button type="button" target="pphigh" class="btn btn-default ppTypeBtn">高于</button> -->
<!-- 							    <button type="button" target="pplow" class="btn btn-primary ppTypeBtn">低于</button> -->
<!-- 							</div> -->
							<div class="ppTypeBtn btn-lower"></div>
						</div>
					</div>
					<div class="ciiecontent" style="padding:0;">
						<table id="appLower" style="width:100%;height:100%;"></table>
					</div>
				</div>
				
			</div>
			
			
		</div>
	</div>
</div>
<div class="modal fade"  id="modalWin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="modalWinTitle">
				</h4>
			</div>
			<div class="modal-body" id="modalWinBody" style="width:100%;overflow:auto;">
			</div>
			<div class="modal-footer">
                <button type="button" class="btn btn-success" id="modalConfirm">确定</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
            </div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade"  id="modalWinLarge" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:850px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="modalWinTitleLarge">
				</h4>
			</div>
			<div class="modal-body" id="modalWinBodyLarge" style="width:100%;overflow:auto;">
			</div>
			<div class="modal-footer">
                <button type="button" class="btn btn-success" id="modalConfirmLarge">确定</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
            </div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
</body>

<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>
<script type="text/javascript" src="${jslib}/anychart/AnyChart.js"></script>
<script type="text/javascript" src="${jslib}/anychart/AnyChartHTML5.js"></script>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>
<!-- 需要内网使用百度api -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/baiduApiScript.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/codemirror.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/javascript.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/baiduapi/BMap.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciieright.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
$(function(){
if(isScreenMode=="true"){
		
	}else{
		$('.screentitle_s').css('display','block');
		zoomPage(2000,1300);
		setInterval(refreshTime,1000);
	}
	new CIIE.Screen(CIIE.SCREEN_HOT);
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