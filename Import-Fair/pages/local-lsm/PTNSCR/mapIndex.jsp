<%@ page language="java" contentType="text/html;charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<!-- echarts -->
<%@ include file="/common/fontawesome/fontawesome4.3.0.jsp"%>
<%@ include file="/common/bootstrap.jsp"%>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet"
	href="${ctx}/static/jslib/My97DatePicker/skin/WdatePicker.css" />
<link rel="stylesheet"
	href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet"
	href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />
<link rel="stylesheet"
	href="${ctx}/static/styles/local-lsm/roam/roam.css" />
<link rel="stylesheet"
	href="${ctx}/static/styles/local-lsm/overviewleft/communityManage.css" />
<%@ include file="/common/bootstrap.jsp"%> 
  <!--地图-->
  <link rel="stylesheet" type="text/css" href="${ctx}/scripts/local-lsm/PTNSCR/mapIndex/leafletGIS/css/leaflet.css"/>
	<script type="text/javascript"src="${ctx}/scripts/local-lsm/PTNSCR/mapIndex/leafletGIS/scripts/leaflet.js"></script>
	<script type="text/javascript"src="${ctx}/scripts/local-lsm/PTNSCR/mapIndex/leafletGIS/scripts/leaflet-baidu.js"></script>
	<script type="text/javascript"src="${ctx}/scripts/local-lsm/PTNSCR/mapIndex/leafletGIS/scripts/leaflet-heat.js"></script>
  <%@ include file="/common/echarts.jsp"%>
    <!--自己的js-->
<script type="text/javascript"src="${ctx}/scripts/local-lsm/PTNSCR/mapIndex/main.js"></script>
<script type="text/javascript"src="${ctx}/scripts/local-lsm/PTNSCR/mapIndex/formatTime.js"></script>
<script type="text/javascript"src="${ctx}/scripts/local-lsm/PTNSCR/mapIndex/ThresAjax.js"></script>
<script type="text/javascript"src="${ctx}/scripts/local-lsm/PTNSCR/mapIndex/mapIndex.js"></script>
	<script type="text/javascript">
        $(document).ready(function () {
        	main.init();
        });
    </script>
    <style type="text/css">
		html,body{
			width: 2050px;
			height: 1070px;
			margin: 0;padding: 0;
			background: rgba(0,0,0,0);
		}
		.reliTuLi {
			width: 240px;
			height: 255px;
			right: 45px;
			bottom: 25px;
			padding: 0 17px;
			background: #00408E;
			color: white;
			border: 1px solid #73B6FF;
			border-radius: 5px;
		}
		
		.reliTuLi .tulititle {
			height: 55px;
		    line-height: 55px;
			font-size: 17px;
			margin-bottom: 10px;
			border-bottom: 1px solid #73B6FF;
		}
		
		.reliTuLi .tuliChild {
			line-height: 30px;
			font-size: 15px;
			height: 35px;
		}
		.chuiCenter{
			position: relative;
			top:50%;
			transform:translate(0,-50%);
			text-align: center;
		}
		.hengCenter{
			position: relative;
			left:50%;
			transform:translate(-50%);
			text-align: center;
		}
		.hengCenterdown{
			position: relative;
			top:100%;
			left: 50%;
			transform:translate(-50%,-100%);
			text-align: center;
		}
		.chuihengCenter{
			position: relative;
			top:50%;
			left: 50%;
			transform:translate(-50%,-50%);
			text-align: center;
		}
		.radiom{
			width: 15px;
			height: 15px;
			background: url(${ctx}/static/images/PTNSCR/mapIndex/xuankuang.png);
			background-size: 100% 100%;
		}
		.radioActive{
			background: url(${ctx}/static/images/PTNSCR/mapIndex/xuanzhongkuang.png);
			background-size: 100% 100%;
		}
		.zuokuang{
			position: relative;
		    font-family: 微软雅黑;
			letter-spacing:1px;
			padding: 0 15px 13px 15px;
			border:  #52c5df 1px solid;
			border-radius: 10px;
			background: rgba(0 ,45 ,112,0.9);
		}
		.bianjiao{
			width: 25px;
			height: 25px;
			position: absolute;
			background: url(${ctx}/static/images/PTNSCR/mapIndex/bianjiao.png);
			background-size: 100% 100%;
		}
		.bian1{
			left: -4px;
			top: -4px;
		}
		.bian2{
			transform: rotate(90deg);
			right: -4px;
			top: -4px;
		}
		.bian3{
			transform: rotate(180deg);
			right: -4px;
			bottom: -4px;
		}
		.bian4{
			transform: rotate(270deg);
			left: -4px;
			bottom: -4px;
		}
		.batOfdefault{
			width: 106px;
			height: 40px;
			color: #00A6CD;
			font-size: 16px;
			position: absolute;
		    border-bottom: 1px solid rgba(0,0,0,0);
		    padding: 4px 5px 0 0;
		    cursor: pointer;
			top: -40px;
			background: url(${ctx}/static/images/PTNSCR/mapIndex/xuantab.png);
			background-size: 100% 100%;
		}
		.batOfxuanzhong{
			color: white;
		    border-bottom-style: none;
			background: url(${ctx}/static/images/PTNSCR/mapIndex/xuanzhongtab.png);
			background-size: 100% 100%;
		    z-index: 1;
		}
		.icon-ctrl{
			width: 20px;
			height: 20px;
			background: url(${ctx}/static/images/PTNSCR/mapIndex/suoxiao.png);
			background-size: 100% 100%;
			position: absolute;
			cursor: pointer;
			right: 0;
		}
		.fangda{
			background: url(${ctx}/static/images/PTNSCR/mapIndex/fangda.png);
			background-size: 100% 100%;
		}
		.context{
			height: 35px;
			line-height: 45px;
		}
		.context .biaoti{
			color: #B2C1D5;
			font-size: 15px;
		    float: left;
   			height: 100%;
		}
		.context .shuzhi{
			font-size: 22px;
			padding-right: 5px;
		}
		.context .danwei{
		    font-size: 14px;
		    color: white;
		    position: relative;
		    left: -8px;
		}
		.context .text{
			font-size: 14px;
			color: white;
		}
		.font_green{
			color: #00F85E;
		}
		.font_red{
			color: #FF5437;
		}
		.zhandian{
			cursor: pointer;
			height: 25%;
		}
		.zhanActive .zhandianChild{
			border: 2px solid #FEC327;
		}
		.zhandianChild{
			height: 125px;
		    overflow: hidden;
		}
		.zhandianChild .bgimg{
			width: 100%;
		    position: absolute;
    		left: 0;
		}
		.zhandianChild .paiming{
			width: 0px;
			height: 0px;
			border-color: #A8A8A9 transparent;
			border-style: solid;
			color: white;
		    position: absolute;
		    border-width: 35px 35px 0px 0px;
    		left: 0;
    		top: 0;
		}
		.zhandianChild .paimingWen{
			position: absolute;
			 font-size: 15px;
			width: 18px;
			color: white;
    		left: 0;
    		top: 0;
		}
		.zhandianChild .downInfo{
			position: absolute;
			width: 100%;
			height: 40px;
			background: rgba(16 ,13 ,10,0.6);			
			bottom: 0;			
		}
		.zhandianChild .name{
			color: #C2C0BA;
			font-size: 22px;
			margin-left: 10px;
		}
		.zhandianChild .number{
			color: white;
			font-size: 22px;
			margin-left: 15px;
		}
		.zhandianChild .danwei{
			color: #C2C0BA;
			font-size: 16px;
		}
		
		.jizhanPopup{
			padding-top: 130px;
		}
		.htgrfse {
		    text-align: center;
		    text-align: justify;
		    text-justify: distribute-all-lines;
		    text-align-last: justify;
		}
		.htgrfse2{
		    overflow: hidden;
		    text-overflow: ellipsis;
		     word-break: keep-all; 
		    white-space: pre;
		}
		.leaflet-container a.leaflet-popup-close-button{
			top: 130px;
		}
		#lteZhanDian::-webkit-scrollbar{
			width: 0;
		}
    </style>
</head>
<body style="padding:40px 38px 38px 38px;">
	<div class="" style="position:absolute;left:0;top: 0; width:100%;height: 100%;background: url(${ctx}/static/images/PTNSCR/mapIndex/border.png);background-size: 100% 100%;">
		
	</div>
	<div id="mainMap" style="height: 100%;z-index: 0;border-radius: 9px;">
		<div class="hengCenter" style="background: url(${ctx}/static/images/PTNSCR/mapIndex/title.png);background-size: 100% 100%;height: 164px;width: 908px;z-index: 401;padding-bottom: 12px;">
			<div class="fl chuiCenter" style="color: white;margin-left: 142px;font-size: 34px;letter-spacing: 3px;font-family: 微软雅黑;">
				LTE业务端口流速峰值分布图
			</div>
			<div class="fl chuiCenter radiom radioActive" style="margin: 0 2px 0 18px;cursor: pointer;" value="minute"></div>
			<span class="fl chuiCenter" style="color: #B6BECF;font-size: 19px;letter-spacing: 1px;">15分钟</span>
			<div class="fl chuiCenter radiom" style="margin: 0 4px 0 18px;cursor: pointer;" value="hour"></div>
			<span class="fl chuiCenter" style="color: #B6BECF;font-size: 19px;letter-spacing: 1px;">小时</span>
		</div>
		<div class="" style="position: relative;top:-160px;height: 100%;left: 50px;width: 315px;z-index: 401;">
			<div class="zuokuang" id="liuliangsulan" style="margin-top: 70px;">
				<div class="bianjiao bian1"></div>
				<div class="bianjiao bian2"></div>
				<div class="bianjiao bian3"></div>
				<div class="bianjiao bian4"></div>
				<div class="batOfdefault batOfxuanzhong" name="进博会场馆" style="left: 15px;">
					<div class="chuiCenter">进博会</div>
				</div>
				<div class="batOfdefault" name="" style="left: 86px;width: 114px;">
					<div class="chuiCenter">全区域</div>
				</div>
				<div class="" style="height: 50px;position: relative;">
					<div class="fl chuiCenter" style="color: white;font-size: 19px;padding-left: 2px;">
						流量速览
					</div>
					<div class="icon-ctrl suoxiao fl chuiCenter"></div>
				</div>
				<div style="height: 5px;position: relative;">
					<div style="position: absolute;left: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
					<div style="position: absolute;right: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
					<div style="position: relative;height: 0;border: 0.5px solid #00DEFF;top: calc(50% - 0.5px);"></div>
				</div>
				<div class="list" style="margin-bottom: 10px;">
					<div class="context">
						<div class="biaoti">
							当前累计流量
						</div>
						<span id="leijiliuliang" class="shuzhi font_green">--</span>
						<span class="danwei">
							GB
						</span>
					</div>
					<div class="context">
						<div class="biaoti">
							当前峰值站点
						</div>
						<span id="fengzhizhandian" class="text shuzhi" style="padding: 0;">--</span>
					</div>
					<div class="context">
						<div class="biaoti">
							高流量站点占比
						</div>
						<span id="zhandianzhanbi" class="shuzhi font_red">--</span>
						<span class="danwei">
							%
						</span>
					</div>
				</div>
			</div>
			<div class="zuokuang" style="margin-top: 28px;">
				<div class="bianjiao bian1"></div>
				<div class="bianjiao bian2"></div>
				<div class="bianjiao bian3"></div>
				<div class="bianjiao bian4"></div>
				<div class="" style="height: 50px;position: relative;">
					<div class="fl chuiCenter" style="color: white;font-size: 18px;padding-left: 2px;">
						当前监控LTE站点数
					</div>
					<div class="icon-ctrl suoxiao fl chuiCenter"></div>
				</div>
				<div style="height: 5px;position: relative;">
					<div style="position: absolute;left: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
					<div style="position: absolute;right: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
					<div style="position: relative;height: 0;border: 0.5px solid #00DEFF;top: calc(50% - 0.5px);"></div>
				</div>
				<div id="zhandianList" class="list" style="position: relative;height: 590px;padding: 0 10px;">
					<div style="position: relative;height: 27px;">
						<!--<div class="zhandianFangun up hengCenter" style="width: 27px;height: 15px;top:5px;cursor: pointer; background: url(${ctx}/static/images/PTNSCR/mapIndex/jiantouup.png);background-size: 100% 100%;"></div>-->
					</div>
					<div id="lteZhanDian" style="height: 540px;overflow-y: auto;">
					</div>
					<div style="position: relative;height: 25px;">
						<!--<div class="zhandianFangun down chuihengCenter" style="width: 27px;height: 15px;cursor: pointer;background: url(${ctx}/static/images/PTNSCR/mapIndex/jiantoudown.png);background-size: 100% 100%;"></div>-->
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>