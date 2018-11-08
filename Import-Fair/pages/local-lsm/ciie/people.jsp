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
<%@ include file="/common/echarts_requirejs.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.draw.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.contextmenu.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.markercluster.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet-search.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/Icon.Label.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.groupedlayercontrol.css" />
    
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciiepc.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/people_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/map.css" />
<title>上海国际进出口博览会-人流分布</title>
</head>
<body> 
<div class="bodybackground">
	<div class="pagetitle people"></div>
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
    <div class="data-border-main-people" style="border:solid 0px #ff0000;border-radius:2em;">
    	<div id="map" style="width:100%;height:100%;border:solid 0px #ff0000;border-radius:2em;">
<!--     		<iframe src="map.jsp" style="width:100%;height:100%;border-radius:2em;" frameborder="0"></iframe> -->
    	</div>
    	<div class="kpiFrame" style="position:absolute;bottom:0;right:60%;display:none;">
    		<div class="kpiFrame_content">
    			<div><span class="people_kpiframe_title">场馆用户数</span><span id="kpiuser_arrow" class="people_kpiframe_ratio" style="color:red;"></span><span id="kpiuser_ratio" class="people_kpiframe_ratio" >--</span></div>
    			<div style="margin-top:0.8em;"><span id="kpiuser_value" class="people_kpiframe_value">--</span><span class="people_kpiframe_unit">人</span></div>
    		</div>
    	</div>
    	<div class="kpiFrame" style="position:absolute;bottom:0;right:40%;display:none;">
    		<div class="kpiFrame_content">
    			<div><span class="people_kpiframe_title">场馆总流量</span><span id="kpiflow_arrow" class="people_kpiframe_ratio" style="color:red;"></span><span id="kpiflow_ratio" class="people_kpiframe_ratio">--</span></div>
    			<div style="margin-top:0.8em;"><span id="kpiflow_value" class="people_kpiframe_value">--</span><span class="people_kpiframe_unit">GB</span></div>
    		</div>
    	</div>
    	<div id="mapgrid"  style="position:absolute;right:2%;top:2%;width:40%;height:60%;">
    		<div id="mapgridcontent" style="width:100%;height:100%;">
	    		<div class="people-data-container-bg"></div>
	    		<div id="tableContent" class="people-data-content">
	    			<div id="tableTitle" style="padding-top:0.5em;"><div class="icon-building" style="margin-left:0.5em;"></div><div class="dbc-title" style="float:left;margin-left:0.5em;">场馆列表</div></div>
	    			<div id="tableParent">
	    				
	    			</div>
	    		</div>
    		</div>
    		<div class="grid_ctrlbtn ciie_max_btn"></div>
    		<div class="grid_ctrlbtn ciie_collapse_btn"></div>
    		<div class="grid_ctrlbtn ciie_expand_btn" style="display:none;"></div>
    	</div>
    	<div id="mapchart" style="position:absolute;right:2%;bottom:5%;width:40%;height:30%;">
    		<div id="mapchartcontent" style="width:100%;height:100%;">
	    		<div class="people-data-container-bg"></div>
	    		<div class="people-data-content">
	    			<div style="padding-top:0.5em;"><div class="icon-chart" style="margin-left:0.5em;"></div><div class="dbc-title" style="float:left;margin-left:0.5em;">场馆用户数及流量</div></div>
	    			<div id="chartParent" style="width:100%;height:100%;">
	    				<div id="chart" style="width:100%;height:100%;"></div>
	    			</div>
	    		</div>
	    	</div>
    		<div class="chart_ctrlbtn ciie_max_btn"></div>
    		<div class="chart_ctrlbtn ciie_collapse_btn"></div>
    		<div class="chart_ctrlbtn ciie_expand_btn" style="display:none;"></div>
    	</div>
    </div>
    <div id="maxFrame" style="width:100%;height:100%;display:none;z-index:100;">
    	<div id="maxcontent" style="width:100%;height:100%;z-index:100;"></div>
    	<div originTarget="" class="maxFrame_ctrlbtn ciie_min_btn"></div>
    </div>
</div>

</body>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMask.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script src="${jslib}/leaflet/leaflet.js"></script>
<script src="${jslib}/leaflet/heatmap.js"></script>
<script src="${jslib}/leaflet/leaflet-heatmap.js"></script>
<script src="${jslib}/leaflet/leaflet.draw.js"></script>
<script src="${jslib}/leaflet/leaflet.contextmenu.js"></script>
<script src="${jslib}/leaflet/leaflet.markercluster-src.js"></script>
<script src="${jslib}/leaflet/leaflet-search.js"></script>
<script src="${jslib}/leaflet/Icon.Label.js"></script>
<script src="${jslib}/leaflet/leaflet.groupedlayercontrol.js"></script>
<script src="${jslib}/leaflet/leaflet.baidu.min.js"></script>

<script src="${jslib}/scrollbot/scrollbot.min.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/leftInfo.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/mapInfoWin.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/map.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/people.js"></script>


<script>
var BASEPATH="${ctx}";
$(function(){
	checkBodySize();
	new CIIE.People(CIIE.PEOPLE_HOT);
	new CIIE.LeftInfo(CIIE.PEOPLE_HOT);
});
	
	
</script>
</html>