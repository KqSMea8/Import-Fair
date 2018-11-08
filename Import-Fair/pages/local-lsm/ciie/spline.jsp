<!DOCTYPE html>
<html lang="zh-CN">
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

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciiepc.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/spline_jqgrid.css" />
<title>上海国际进出口博览会-专线保障</title>
</head>
<body> 
<div class="bodybackground">
	<div class="pagetitle spline"></div>
    <div class="data-border-01">
    	<div class="icon-switch"></div>
	   	 <div class="data-border-title">
	   	 	<div class="icon-city"></div>
	   	 	<div class="data-border-title-txt">业务量</div>
	   	 </div>
	   	 <div class="data-border-content-01">
	   	 	<div class="dbc-horizontal">
	   	 		<div class="dbc-title" style="width:3.6em;">用户数</div>
	   	 		<div class="dbc-percentbg"><div id="left_user_bar" class="angled-135" style="width:70%;"></div></div>
	   	 		<div class="dbc-datadigit" id="left_user_value">--</div>
	   	 		<div class="dbc-unit">人</div>
	   	 	</div>
	   	 	<div class="dbc-horizontal">
	   	 		<div class="dbc-title" style="width:3.6em;">流量</div>
	   	 		<div class="dbc-percentbg2"><div id="left_flow_bar" class="angled-135 purplebar" style="width:70%;"></div></div>
	   	 		<div class="dbc-datadigit" id="left_flow_value">--</div>
	   	 		<div class="dbc-unit">GB</div>
	   	 	</div>
	   	 </div>
    </div>
    <div class="data-border-02">
    	<div class="icon-switch"></div>
    	<div class="data-border-title">
	   	 	<div class="icon-resource"></div>
	   	 	<div class="data-border-title-txt">资源分布</div>
	   	 </div>
	   	 <div class="data-border-content-02">
	   	 	<div class="dbc-horizontal-02" >
	   	 		<div class="dbc-block">
	   	 			<div class="dbc-block-bg"></div>
	   	 			<div class="dbc-block-content">
	   	 				<div><span id="left_2g_count" class="dbc-datadigit">--</span><span class="dbc-unit">个</span></div>
	   	 				<div class="dbc-title">2G小区数</div>
	   	 			</div>
	   	 		</div>
	   	 		<div class="dbc-block">
	   	 			<div class="dbc-block-bg"></div>
	   	 			<div class="dbc-block-content">
	   	 				<div><span id="left_4g_count" class="dbc-datadigit yellowfont">--</span><span class="dbc-unit">个</span></div>
	   	 				<div class="dbc-title">4G小区数</div>
	   	 			</div>
	   	 		</div>
	   	 		<div class="dbc-block">
	   	 			<div class="dbc-block-bg"></div>
	   	 			<div class="dbc-block-content">
	   	 				<div><span id="left_emer_car_count" class="dbc-datadigit yellowfont">--</span><span class="dbc-unit">辆</span></div>
	   	 				<div class="dbc-title">应急通信车</div>
	   	 			</div>
	   	 		</div>
	   	 		<div class="dbc-block">
	   	 			<div class="dbc-block-bg"></div>
	   	 			<div class="dbc-block-content">
	   	 				<div><span id="left_worker_count" class="dbc-datadigit">--</span><span class="dbc-unit">人</span></div>
	   	 				<div class="dbc-title">保障人员</div>
	   	 			</div>
	   	 		</div>
	   	 	</div>
	   	 </div>
    </div>
    <div class="data-border-03">
    	<div class="data-border-title">
	   	 	<div class="icon-bulletin"></div>
	   	 	<div class="data-border-title-txt">公告牌</div>
	   	 </div>
	   	 <div class="data-border-content-03">
	   	 	<div class="dbc-block-03">
	   	 		<div class="dbc-block-bg"></div>
	   	 		<div class="dbc-block-content-03">
	   	 			<table style="width:100%;">
	   	 				<tr><td class="dbc-title" style="padding-left:1em;letter-spacing:0.16em;">重大安全事故发生</td><td style="text-align:right;padding-right:2em;"><span class="dbc-datadigit">0</span><span class="dbc-unit">件</span></td></tr>
	   	 			</table>
	   	 		</div>
	   	 	</div>
	   	 	<div class="dbc-block-03">
	   	 		<div class="dbc-block-bg"></div>
	   	 		<div class="dbc-block-content-03">
	   	 			<table style="width:100%;">
	   	 				<tr><td class="dbc-title" style="padding-left:1em;letter-spacing:0.16em;">重大网络事故发生</td><td style="text-align:right;padding-right:2em;"><span class="dbc-datadigit">0</span><span class="dbc-unit">件</span></td></tr>
	   	 			</table>
	   	 		</div>
	   	 	</div>
	   	 	<div class="dbc-block-03">
	   	 		<div class="dbc-block-bg"></div>
	   	 		<div class="dbc-block-content-03">
	   	 			<table style="width:100%;">
	   	 				<tr><td class="dbc-title" style="padding-left:1em;letter-spacing:0.16em;">重大客户投诉发生</td><td style="text-align:right;padding-right:2em;"><span class="dbc-datadigit">0</span><span class="dbc-unit">件</span></td></tr>
	   	 			</table>
	   	 		</div>
	   	 	</div>
	   	 	<div class="dbc-block-03">
	   	 		<div class="dbc-block-bg"></div>
	   	 		<div class="dbc-block-content-03">
	   	 			<table style="width:100%;">
	   	 				<tr><td class="dbc-title" style="padding-left:1em;">保障区域退服基站数</td><td style="text-align:right;padding-right:2em;"><span class="dbc-datadigit">0</span><span class="dbc-unit">件</span></td></tr>
	   	 			</table>
	   	 		</div>
	   	 	</div>
	   	 	<div class="dbc-block-03">
	   	 		<div class="dbc-block-bg"></div>
	   	 		<div class="dbc-block-content-03">
	   	 			<table style="width:100%;">
	   	 				<tr><td class="dbc-title" style="padding-left:1em;">重保集客专线故障数</td><td style="text-align:right;padding-right:2em;"><span class="dbc-datadigit">0</span><span class="dbc-unit">件</span></td></tr>
	   	 			</table>
	   	 		</div>
	   	 	</div>
	   	 	<div class="dbc-block-03">
	   	 		<div class="dbc-block-bg"></div>
	   	 		<div class="dbc-block-content-03">
	   	 			<table style="width:100%;">
	   	 				<tr><td class="dbc-title" style="padding-left:1em;letter-spacing:0.3em;">局楼机房异常数</td><td style="text-align:right;padding-right:2em;"><span class="dbc-datadigit">0</span><span class="dbc-unit">件</span></td></tr>
	   	 			</table>
	   	 		</div>
	   	 	</div>
	   	 </div>
    </div>
    <div class="data-border-main tablebg">
    	<div id="tableParent" class="tableDiv">
    		<table id="splineList"></table>
    	</div>
    	<div id="topoParent" class="topoDiv">
    		
    	</div>
    </div>
</div>
<div class="modal fade"  id="modalWin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:400px;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="modalWinTitle">
					告警详情
				</h4>
			</div>
			<div class="modal-body" id="modalWinBody" style="width:100%;">
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
</body>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMask.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/leftInfo.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/spline.js"></script>

<script>
$(function(){
	checkBodySize();
	new CIIE.Spline(CIIE.SPLINE_HOT);
	new CIIE.LeftInfo(CIIE.SPLINE_HOT);
});
	
	
</script>
</html>