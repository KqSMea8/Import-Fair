<!DOCTYPE HTML>
<HTML>
<HEAD>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String isScreenMode = request.getParameter("isScreenMode");
String width = request.getParameter("width");
String height = request.getParameter("height"); 
String cssName="indexcss";
if("true".equals(isScreenMode)){
	cssName="indexscr";
}
%>
<META content="IE=11.0000" http-equiv="X-UA-Compatible">
<!--STATUS OK-->
<META charset="utf-8">
<TITLE>地铁</TITLE>
<META name="description" content="提供地铁线路图浏览，乘车方案查询，以及准确的票价和时间信息。">
<META name="keywords" content="百度地图,地铁线路,地铁专题,地铁方案,地铁票价,地铁时间,地铁换乘">
<META http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
<META name="renderer" content="webkit">
<%@ include file="/common/lib.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/disney/style.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />

<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<LINK href="resource/sbw.min.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="resource/<%=cssName %>.css" />
<!-- 内嵌跳转js禁止添加 type="text/javascript"  -->

<SCRIPT>
	var ua = navigator.userAgent;
	var isMobile = /ipad|iphone|ipod|android|UCBrowser|UCWEB/i.test(ua);
	if (isMobile) {
		location.href = "mobileFrame.jsp?isScreenMode="+"<%=isScreenMode%>"
				+"&width="+"<%=width%>"
				+"&height="+"<%=height%>";
	}
</SCRIPT>

<META name="GENERATOR" content="MSHTML 11.00.9600.18052">
</HEAD>
<BODY>
	<DIV id="sbw_top" unselectable="on" style="display:none;">
		<IMG name="bmap_logo" width="201" height="46" id="bmap_logo"
			alt="到百度地图首页" src="resource/logo_new.gif" border="0"
			usemap="#bmap_logoMap">
		<MAP name="bmap_logoMap">
			<AREA href="http://map.baidu.com/" shape="rect" coords="0,0,137,45"
				target="_blank">
		</MAP>
		<SPAN id="map_link">
			<A href="http://map.baidu.com/" target="_blank">返回地图首页</A>
		</SPAN>
		<!-- 城市切换 -->

		<DIV class="sel-city">
			<SPAN class="cur-city" id="toolCurCity">上海市</SPAN>
			[
			<SPAN title="选择城市" id="btnSelCity">选择城市</SPAN>
			]
		</DIV>
	</DIV>
	<DIV id="sbw_main">
		<DIV id="sbw_map"></DIV>
		<DIV id="sbw_panel" style="display:none;">
			<DIV id="sbw_ads_cont"></DIV>
			<DIV id="sel_sta">
				<DIV id="sel_type">
					<LABEL class="select-style" id="tansLbl" style="font-weight: bold;"
						for="routesS">
						<INPUT name="radio_01" id="routesS" type="radio">
						<SPAN>换乘查询</SPAN>
					</LABEL>
					<LABEL id="siteLbl" for="siteS">
						<INPUT name="radio_01" id="siteS" type="radio">
						<SPAN>站点查询</SPAN>
					</LABEL>
				</DIV>
				<DIV id="routeSC">
					<FORM id="routeQuery">
						<DIV class="input-box">
							<INPUT id="start_sta" type="text" maxlength="20"
								autocomplete="off">
							<SPAN>到</SPAN>
							<INPUT id="end_sta" type="text" maxlength="20" autocomplete="off">
						</DIV>
						<DIV class="sel-btn">
							<INPUT class="search-btn trans-search-btn" type="submit">
						</DIV>
					</FORM>
				</DIV>
				<FORM id="siteQuery">
					<DIV id="siteSC" style="display: none;">
						<DIV class="input-box">
							<INPUT id="oneSite" type="text" maxlength="20" autocomplete="off">
						</DIV>
						<DIV class="sel-btn">
							<INPUT class="search-btn site-search-btn" type="submit">
						</DIV>
					</DIV>
				</FORM>
			</DIV>
			<DIV id="result_container"></DIV>
			<DIV id="site_result_box" style="display: none;"></DIV>
			<DIV class="pctomoin" id="pctomoinId">
				<A href="http://wuxian.baidu.com/map" target="_blank">
					<IMG width="330" height="59" alt="手机地图下载" src="resource/shouji.png">
				</A>
			</DIV>
		</DIV>
	</DIV>
	<IMG id="statImg" style="display: none;" src="resource/transparent.gif">
	<DIV id="rankChartWin"  style="position:absolute;top:55px;left:0px;color:#ffffff;font-size:18px;font-weight:bold;display:none;">
		<div style="position:absolute;width:300px;height:560px;background:#041c28;border:solid 1px #00489f;opacity:0.5;filter:alpha(opacity=50);"></div>
		<div id="rankChart" style="width:300px;height:560px;"></div>
	</DIV>
	<div style="position:absolute;top:0px;left:0px;background:#041c28;border:solid 1px #00489f;padding:8px 8px 8px 8px;">
		<span class="kpiSpan kpiSpanSelected">高客流</span>
		<span class="kpiSpan">低活跃</span>
		<span class="kpiSpan">低流量</span>
		<span class="kpiSpan">低速率</span>
		<span class="kpiSpan">低感知</span>
		
		<span class="kpiSpan">高进出</span>
		<span class="kpiSpan">低4G流量比</span>
		<span class="kpiSpan">低DOU</span>
		<span class="kpiSpan">高TAU</span>
		
		<span class="kpiSpan">高时延</span>
		<span class="kpiSpan">移动低速率</span>
		<span class="kpiSpan">移动高TAU</span>
		<span class="kpiSpan">低Volte接通</span>
		
	</div>
	<div style="position:absolute;width:250px;top:0px;right:0px;background:#041c28;border:solid 1px #00489f;padding:8px 8px 8px 8px;">
		<span id="timeSpan" class="timeSpan"></span>
		<div id="ctrlBtn" class="ctrlBtn play"></div>
		<div id="zoomBtn" class="zoomBtn toFullScreen" style="display:none;"></div>
	</div>
	<div class="metroStTypeLegend">
		<div>
			<div class="stationLegendIcon station4gup"></div>
			<span>4G地面站</span>
		</div>
		<div>
			<div class="stationLegendIcon station4gdown"></div>
			<span>4G地下站</span>
		</div>
		<div>
			<div class="stationLegendIcon station3gup"></div>
			<span>3G地面站</span>
		</div>
		<div>
			<div class="stationLegendIcon station3gdown"></div>
			<span>3G地下站</span>
		</div>
		<div>
			<div class="stationLegendIcon station4guc"></div>
			<span>无4G覆盖地下站</span>
		</div>
		<div>
			<div class="stationLegendIcon stationex"></div>
			<span>换乘站</span>
		</div>
		
	</div>
	<div id="ctrlMask" style="position:absolute;top:0px;left:0px;width:3200px;height:1200px;display:none;background:#eeeeee;filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity: 0.5; opacity: 0.5;">
	</div>
	<div class="progressbar" data-perc="50" style="display:none;position:absolute;left:50%;top:50%;margin-left:-280px;margin-top:-10px;">
		<div class="bar color3"><span></span></div>
		<div class="label"><span></span></div>
	</div>
	<!-- 脚本引用必须连续，否则编译替换会失败 -->
	<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
	<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/disney/custom.css" />
	<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/progressBarStyle.css" />
	<style>
		html,body {
			background:transparent;
		}
	</style>
	<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
	<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/stationDetail.js"></script>
	<SCRIPT src="resource/sbwhandler.js" type="text/javascript"></SCRIPT>
	<SCRIPT src="resource/sbw.min.js" type="text/javascript"></SCRIPT>
	<script type="text/javascript" src="${ctx}/scripts/local-lsm/metro/metroFunc.js"></script>
	<script>
		window.onkeypress=parent.window.onkeypress;//选择页面快捷键
		$(document).ready(function(){
			if("true"=="<%=isScreenMode%>"){
				$("#rankChartWin").css("display","block");
			}else{
				$("#zoomBtn").css("display","inline-block");
			}
		});
		function timeLinePlayCallBack(time){
			try{
				parent.timeLinePlayCallBack(time);
			}catch(e){
				console.log("index->parent.timeLinePlayCallBack error");
			}
		}
		function NS_SW_isScreen(){
			return "<%=isScreenMode%>";
		}
	</script>
</BODY>
</HTML>
