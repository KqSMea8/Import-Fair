<!DOCTYPE html>
<html lang="en" style="background-color:transparent;">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<%@ include file="/common/bootstrap.jsp"%> 
		<title>NationalExhibitionAndConventionCenter</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				font-family: Monospace;
				background-color:transparent;
				color: #fff;
				margin: 0px;
				overflow: hidden;
			}
			#info {
				color: #fff;
				position: absolute;
				top: 10px;
				width: 100%;
				text-align: center;
				z-index: 100;
				display:block;
			}
			#info a {
				color: #046;
				font-weight: bold;
			}
			.map-info-win{
				background:rgba(1,0,69,0.65);
				border:solid 5px #2a28b3;
				border-radius:5px;
				padding:0px;
				font-size:28px;
			}
			.map-info-win-title{
				border-bottom:solid 3px #2a28b3;
			}
			.map-info-win>div{
				padding:10px 40px 10px 40px;
			}
			.renderKpiSelector{
				cursor:pointer;
			}
		</style>
	</head>

	<body style="background-color:transparent;">
		<div style="padding:0px;z-index:101;position:absolute;left:0px;top:0px;display:block;">
			<div id="infoPanel" class="map-info-win" >
				<div class="map-info-win-title">
					<span id="EXP">J-7H WiFi运行情况</span>
				</div>
				<div class="" >
					<span>馆层:</span><span id="building_level">--</span><span>人</span>
				</div>
				<div class="" >
					<span>展览名称:</span><span id="scene_name">--</span><span>人</span>
				</div>
				<div class="" >
					<span>用户数:</span><span id="wifiusers">--</span><span>人</span>
				</div>
				<div class="" >
					<span>上行流量:</span><span id="wifiups">--</span><span>GB</span>
				</div>
				<div class="" >
					<span>下行流量:</span><span id="wifidowns">--</span><span>GB</span>
				</div>
			</div>
			<div id="infoPanel2" class="map-info-win" style="margin-top:20px;" >
				<div class="map-info-win-title">
					<span >J-7H 指标概览</span>
				</div>
				<div class="renderKpiSelector" kpiName="用户数" kpiKey="s_091">
					<span>用户数:</span><span id="s_091">--</span><span>人</span>
				</div>
				<div class="renderKpiSelector" kpiName="流量" kpiKey="s_083">
					<span>流量:</span><span id="s_083">--</span><span>MB</span>
				</div>
				<div class="renderKpiSelector" kpiName="话务量" kpiKey="hwl">
					<span>话务量:</span><span id="hwl">--</span><span>Erl</span>
				</div>
			</div>
			
			<div id="legend" class="map-info-win" style="overflow:hidden;margin-top:20px;height:72px;" >
				<div class="map-info-win-title" style="line-height:42px;">
					<span >分区指标</span>
					<span id="triMark" onclick="cellKpiCtrl();" style="font-size:36px;cursor:pointer;">▾</span>
				</div>
				<div>
					<button type="button" class="kpibtn btn btn-primary btn-xl active" kpiName="用户数" kpiKey="s_091">用户数</button>
	  				<button type="button" class="kpibtn btn btn-default btn-xl" kpiName="流量" kpiKey="s_083">流量</button>
	  				<button type="button" class="kpibtn btn btn-default btn-xl" kpiName="话务量" kpiKey="hwl">话务量</button>
				</div>
				<div style="width:100%;margin-top:10px;" >
					<div style="width:36px;height:36px;float:left;background:#ff5252;border-radius:5px;"></div>
					<div style="float:left;" id="lv1"></div>
					<div style="clear:both;"></div>
				</div>
				<div style="width:100%;margin-top:10px;" >
					<div style="width:36px;height:36px;float:left;background:#ff933c;border-radius:5px;"></div>
					<div style="float:left;" id="lv2"></div>
					<div style="clear:both;"></div>
				</div>
				<div style="width:100%;margin-top:10px;" >
					<div style="width:36px;height:36px;float:left;background:#fff066;border-radius:5px;"></div>
					<div style="float:left;" id="lv3"></div>
					<div style="clear:both;"></div>
				</div>
				<div style="width:100%;margin-top:10px;" >
					<div style="width:36px;height:36px;float:left;background:#00ffaa;border-radius:5px;"></div>
					<div style="float:left;" id="lv4"></div>
					<div style="clear:both;"></div>
				</div>
				<div style="clear:both;"></div>
			</div>
		</div>
		
		<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
		<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
		<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
		<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
		<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />		

	</body>
</html>
