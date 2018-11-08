<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet"
	href="${ctx}/static/styles/local-lsm/${hotspot}/style.css" />
<link rel="stylesheet"
	href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/kpiview.css" />
<%@ include file="/common/bootstrap.jsp"%>
<%@ include file="/common/echarts.jsp"%>


<title>MOA部分截取</title>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet"
	href="${ctx}/static/styles/local-lsm/common/custom_small.css" />
<link rel="stylesheet"
	href="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/css/multi-select.css" />
<style type="text/css">
/* html,body{
			margin: 0;
			padding: 0;
			position: relative;
			width: 1558px;height: 1200px;
		}  */
html, body {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	background: rgba(0, 0, 0, 0);
}

.fl {
	float: left;
}

.fr {
	float: right;
}

.bgForTitle {
	background:
		url(${ctx}/static/images/PTNSCR/firstAndSecondPart/jinBoHuiHuiGuan.png);
	background-repeat: no-repeat;
	background-position: -20% 50%;
	height: 447px;
	width: 778px;
}

.bgForCard {
	background: url(${ctx}/static/images/PTNSCR/firstAndSecondPart/map1.png);
	background-repeat: no-repeat;
	background-position: 0% 50%;
	height: 447px;
	width: 100%;
}

.titleColor {
	color: rgb(0, 217, 255);
	font-size: 18px;
}

.titleColorWithe {
	color: #F5F5F5;
	font-size: 16px;
}

.ui-state-default, .ui-widget-content .ui-state-default,
	.ui-widget-header .ui-state-default {
	border: 1px solid #000000;
	background: rgb(0, 141, 187);
}

.ui-widget-content {
	border: 1px none #393F4F;
	background: none;
	color: #ffffff;
}

.radiom {
	width: 15px;
	height: 15px;
	position: relative;
	top: 3px;
	background: url(${ctx}/static/images/PTNSCR/mapIndex/xuankuang.png);
	background-size: 100% 100%;
}

.radioActive {
	background: url(${ctx}/static/images/PTNSCR/mapIndex/xuanzhongkuang.png);
	background-size: 100% 100%;
}

.greenBubble {
	width: 18px;
	height: 26px;
	background:
		url(${ctx}/static/images/PTNSCR/firstAndSecondPart/greenBubble.png);
	background-size: 100% 100%;
}

.redBubble {
	width: 18px;
	height: 26px;
	background:
		url(${ctx}/static/images/PTNSCR/firstAndSecondPart/redBubble.png);
	background-size: 100% 100%;
}
.blueBubble {
	width: 18px;
	height: 26px;
	background:
		url(${ctx}/static/images/PTNSCR/firstAndSecondPart/blueBubble.png);
	background-size: 100% 100%;
}
.yellowBubble {
	width: 18px;
	height: 26px;
	background:
		url(${ctx}/static/images/PTNSCR/firstAndSecondPart/yellowBubble.png);
	background-size: 100% 100%;
}
.pop_right {
	width: 422px;
	height: 226px;
	background:
		url(${ctx}/static/images/PTNSCR/firstAndSecondPart/popRight.png);
	background-size: 100% 100%;
}

.pop_left {
	width: 422px;
	height: 226px;
	background: url(${ctx}/static/images/PTNSCR/firstAndSecondPart/pop.png);
	background-size: 100% 100%;
}
.pop_top {
	width: 422px;
	height: 226px;
	background: url(${ctx}/static/images/PTNSCR/firstAndSecondPart/popTop.png);
	background-size: 100% 100%;
}
.pop_top_right {
	width: 422px;
	height: 226px;
	background: url(${ctx}/static/images/PTNSCR/firstAndSecondPart/popTop_right.png);
	background-size: 100% 100%;
}
.bell {
	width: 24px;
	height: 24px;
	background: url(${ctx}/static/images/PTNSCR/firstAndSecondPart/bell.png);
	background-size: 100% 100%;
}

.showPop {
	display: none
}

.chooseImage {
	cursor: pointer;
}

.showImage {
	z-index: 1;
}

.tabText {
	font-size: 20px;
	color:white;
	vertical-align: middle;
	text-align: center;
	display: block;
	line-height: 40px;
}

.progress-bar {
	/* background-color: rgb(0,70,157); */
	/* background-color: rgb(0,255,91); */
	
}


.ui-jqgrid .ui-jqgrid-title{font-size:14px;}    /*修改grid标题的字体大小*/ 
         
 .ui-jqgrid-sortable {font-size:14px;}   /*修改列名的字体大小*/ 

.ui-jqgrid tr.jqgrow td {
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-family: 微软雅黑;
    font-weight: bold;
    font-size: 16px;
}


.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default {
    border: 0px solid #000000;
    background: rgb(0,141,187);
}

.ui-widget-content {
    border: 1px solid rgb(0,69,160);
    background: none;
    color: #ffffff;
}
.ui-jqgrid .ui-jqgrid-htable th {
    height: 20px;
    line-height: 20px;
    font-size: 16px;
}
.ui-jqgrid .ui-jqgrid-title{font-size:16px;}    /*修改grid标题的字体大小*/ 
         
 .ui-jqgrid-sortable {font-size:16px;}   /*修改列名的字体大小*/ 
         
.ui-jqgrid tr.jqgrow td {font-size:16px;} /*修改表格内容字体*/
.ui-jqgrid tr.ui-row-ltr td {
    text-align: left;
    border-right-width: 0px;
    border-right-color: inherit;
    border-right-style: solid;
}

.ui-jqgrid tr.jqgrow td {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-family: 微软雅黑;
    font-weight: bold;
    border-bottom-width: 0px;
    font-size: 16px;
}



/*滚动条样式*/
        .ui-jqgrid-bdiv::-webkit-scrollbar {/*滚动条整体样式*/
            width: 14px;     /*高宽分别对应横竖滚动条的尺寸*/
        }
        .ui-jqgrid-bdiv::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgb(0,153,183);
        }
        .ui-jqgrid-bdiv::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-radius: 0;
            background: rgb(0,0,6);
        }
.progress {
    height: 16px;
    margin-bottom: 0px;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
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
		.icon-ctrl{
			width: 20px;
			height: 20px;
			background: url(${ctx}/static/images/PTNSCR/mapIndex/close.png);
			background-size: 100% 100%;
			position: absolute;
			cursor: pointer;
			right: 0;
		}
		.zuokuang{
			position: relative;
		    font-family: 微软雅黑;
			letter-spacing:1px;
			padding: 0 15px 13px 15px;
			border:  #52c5df 1px solid;
			border-radius: 10px;
			background: rgba(1 ,51 ,115,0.9);
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
		
		.ui-jqgrid-bdiv{
		scrollbar-arrow-color: #f4ae21; /**//*三角箭头的颜色*/ 
		scrollbar-face-color: #333; /**//*立体滚动条的颜色*/ 
		scrollbar-3dlight-color: #666; /**//*立体滚动条亮边的颜色*/ 
		scrollbar-highlight-color: #666; /**//*滚动条空白部分的颜色*/ 
		scrollbar-shadow-color: #999; /**//*立体滚动条阴影的颜色*/ 
		scrollbar-darkshadow-color: #666; /**//*立体滚动条强阴影的颜色*/ 
		scrollbar-track-color: #666; /**//*立体滚动条背景颜色*/ 
		scrollbar-base-color:#f8f8f8; /**//*滚动条的基本颜色*/ 
}

</style>
</head>
<body id="main"
	style="width: 100%; height: 100%; padding: 0 0px 0 18px; color: #fff000;">
	<div class="">
		<div class="fl" style="width: 52%; padding-right: 2.5%;">
			<div style="height: 50%;">
				<h1 style="margin: 9px 0 10px 0;font-size: 23px;font-weight: 600;" class="titleColorWithe">上海重保区域流量名片</h1>
				<div style="height: 5px; position: relative;">
					<div
						style="position: absolute; left: 0; height: 100%; width: 15px; background: #00DEFF;"></div>
					<div
						style="position: absolute; right: 0; height: 100%; width: 15px; background: #00DEFF;"></div>
					<div
						style="position: relative; height: 0; border: 0.5px solid #00DEFF; top: calc(50% - 0.5px);"></div>
				</div>
				<div class="bgForCard"
					style="position: relative; border: 0px solid red;margin-top: 32px;" id="cc">
					<!--青浦 -->
					<div style="position: absolute; bottom: 38.45%; left: 23.15%;"
						class=" chooseImage" name="进博会场馆" title="进博会场馆" nameWarn="进博会场馆"
						nameFlow="---" nameCount="---"  nameRadio=""  peakStie="---" peak="---"
						direction="left"></div>
					<div style="position: absolute; bottom: 38.52%; left: 31.1%;"
						class=" chooseImage" name="进博会周边" title="进博会周边" nameWarn="进博会周边"
						nameFlow="---" nameCount="---"  nameRadio=""  peakStie="---" peak="---" direction="left"></div>
					<!--嘉定 -->
					<!-- <div style="position: absolute; bottom: 51.23%; left: 32.8%;"
						class="greenBubble chooseImage" name="jiading" nameWarn="34"
						nameFlow="0" nameCount="0" direction="left"></div> -->
					<!--宝山 -->
					<div style="position: absolute;bottom: 89.58%;left: 17.5%;"
						class=" chooseImage" name="上海火车站" title="上海火车站" nameWarn="上海火车站"
						nameFlow="---" nameCount="---"  nameRadio=""  peakStie="---" peak="---" direction="top"></div>
						
					<!--崇明 -->
					<!-- <div style="position: absolute; bottom: 56.15%; right: 25.5%;"
						class="greenBubble chooseImage" name="chongming" nameWarn="64"
						nameFlow="8" nameCount="0" direction="right"></div> -->
					<!--松江 -->
					<!-- <div style="position: absolute; bottom: 32%; left: 33.9%;"
						class="greenBubble chooseImage" name="songjiang" nameWarn="34"
						nameFlow="8" nameCount="0" direction="left"></div> -->
					<!--闵行 -->
					<div style="position: absolute; position: absolute; bottom: 37.8%; left: 42.9%;"
						class=" chooseImage" name="虹桥枢纽" title="虹桥枢纽" nameWarn="虹桥枢纽"
						nameFlow="---" nameCount="---"  nameRadio=""  peakStie="---" peak="---" direction="left"></div>
					<div style="position: absolute;bottom: 63.9%;left: 10.9%;"
						class=" chooseImage" name="上海南站" title="上海南站" nameWarn="上海南站"
						nameFlow="---" nameCount="---"  nameRadio=""  peakStie="---" peak="---" direction="top"></div>
					<!-- <div style="position: absolute;bottom: 73.18%;left: 12.9%;"
					class=" chooseImage" name="市委办公厅" title="市委办公厅" nameWarn="市委办公厅"
					nameFlow="---" nameCount="---"  nameRadio=""  peakStie="---" peak="---" direction="top"></div> -->
					<div style="position: absolute;bottom: 81.78%;left: 14.5%;"
					class=" chooseImage" name="长途汽车站" title="长途汽车站" nameWarn="长途汽车站"
					nameFlow="---" nameCount="---"  nameRadio=""  peakStie="---" peak="---" direction="top"></div>
					<div style="position: absolute;bottom: 81.72%; right: 15.9%;"
					class=" chooseImage" name="酒店" title="酒店" nameWarn="酒店"
					nameFlow="---" nameCount="---"  nameRadio=""  peakStie="---" peak="---" direction="top_right"></div>
					<div style="position: absolute; bottom: 34.12%; left: 46.55%;"
					class=" chooseImage" name="高铁" title="高铁"  nameWarn="高铁"
					nameFlow="---" nameCount="---" nameRadio=""  peakStie="---" peak="---" direction="left"></div>
					<!--浦东新区 -->
					<div style="position: absolute; position: absolute; bottom: 28.4%; left: 74.8%;"
						class=" chooseImage" name="浦东机场" title="浦东机场" nameWarn="浦东机场"
						nameFlow="---" nameCount="---" nameRadio=""  peakStie="---" peak="---" direction="right"></div>
					<!--金山 -->
					<!-- <div style="position: absolute; bottom: 16.1%; left: 35.2%;"
						class="greenBubble chooseImage" name="jinshan" nameWarn="39"
						nameFlow="8" nameCount="0" direction="left"></div> -->
					<!--奉贤-->
					<!-- <div style="position: absolute; bottom: 23.26%; right: 44.2%;"
						class="greenBubble chooseImage" name="fengxian" nameWarn="94"
						nameFlow="8" nameCount="0" direction="right"></div> -->
					<div id="pop" style="position: absolute; color: white;" name=""
						class="showPop">
						<div id="popContent"
							style="position: absolute; width: 291px; height: 195px; top: 10px; padding: 10px 20px 15px 20px;">
							<h1
								style="font-size: 20px; color: white; margin-top: 3px; margin-bottom: 0;"
								class="fl" id="jiankongTitle"></h1>
							<div class="fr" style="">
								<span class="bell"
									style="display: inline-block; margin-right: 5px;position: relative;top: 3px;"> </span><span
									style="display: inline-block; font-size: 20px; height: 24px; line-height: 24px;margin-top: 4px; vertical-align: top;" id="jiankongWarn"></span>
								<div class="clear"></div>
							</div>
							<div class="clear"></div>
							<div style="margin-top: 10px; margin-bottom: 10px;">
								<div class="fl" style="width: 40%">
									<img id="imgSrc" class="bgimg"
										src=""
										style="width: 100px; height: 74px;">
								</div>
								<div class="fl"
									style="width: 60%; font-size: 14px; padding: 10px 0 0 10px;">
									<div>
										<span>监控端口：</span><span
											style="color: rgb(0, 255, 91); margin-left: 0px;"
											id="jiankongnums"></span><span>个</span>
									</div>
									<div style="padding-top:5px;">
										<span>流量：</span><span
											style="color: rgb(0, 217, 255); margin-left:0px;"
											id="jiankongflow"></span><span>GB</span>
									</div>
								</div>
								<div class="clear"></div>
							</div>

							<div>
								<h1
									style="font-size: 16px; color: white; margin-top: 0; margin-bottom: 0;">当前/历史峰值流速(Mbps)</h1>
								<div>
									<div class="fl" style="width: 55%; padding-top: 10px;">
										<div class="progress">
											<div class="progress-bar progress-bar-success"
												role="progressbar" aria-valuenow="60" aria-valuemin="0"
												aria-valuemax="100" style="width: 40%;" id="pro2">
											</div>
											<div class="progress-bar progress-bar-info"
												role="progressbar" aria-valuenow="60" aria-valuemin="0"
												aria-valuemax="100" style="width: 60%;" id="pro1">
											</div>
										</div>

									</div>
									<div class="fr"
										style="width: 45%; padding-top: 5px; padding-left: 5px;">
										<span id="biLiForPro"></span>
									</div>
									<div class="clear"></div>
								</div>


							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="height: 46%;">
				<h1 style="margin-bottom: 11px;font-size: 23px;font-weight: 600;" class="titleColorWithe">进博会场馆流量</h1>
				<div style="height: 5px; position: relative;">
					<div
						style="position: absolute; left: 0; height: 100%; width: 15px; background: #00DEFF;"></div>
					<div
						style="position: absolute; right: 0; height: 100%; width: 15px; background: #00DEFF;"></div>
					<div
						style="position: relative; height: 0; border: 0.5px solid #00DEFF; top: calc(50% - 0.5px);"></div>
				</div>
				<div class="bgForTitle"
					style="position: relative; border: 0px solid red;margin-top: 7px;">
					<!--A  -->
					<div
						style="position: absolute; bottom: 71%; left: 4.5%; width: 106px; height: 40px;"
						class="">
						<span id="A0" class="tabText"></span>
					</div>
					<!--B  -->
					<div
						style="position: absolute; bottom: 50.92%; left: 74.9%; width: 106px; height: 40px;"
						class="">
						<span id="B0" class="tabText"></span>
					</div>
					<!--C  -->
					<div
						style="position: absolute; bottom: 80.92%; left: 61.9%; width: 106px; height: 40px;"
						class="">
						<span id="C0" class="tabText"></span>
					</div>
					<!--D  -->
					<div
						style="position: absolute; bottom: 24%; left: 46.9%; width: 106px; height: 40px;"
						class="">
						<span id="D0" class="tabText"></span>
					</div>
					<!--E  -->
					<div
						style="position: absolute; bottom: 47.6%; left: 12.7%; width: 106px; height: 40px;"
						class="">
						<span id="E0" class="tabText"></span>
					</div>
					<!--
                    	作者：wangpeng@eastcom-sw.com
                    	时间：2018-10-10
                    	描述：进博会场馆流量 表格
                    -->
					<div class="zuokuang" id="liuliangSuLan" style="position: absolute;top: 8px;width: 97%;height: 396px;display: none;margin-left: 3px;">
						<div class="bianjiao bian1"></div>
						<div class="bianjiao bian2"></div>
						<div class="bianjiao bian3"></div>
						<div class="bianjiao bian4"></div>
						<div class="" style="height: 50px;position: relative;">
							<div class="fl chuiCenter" style="color: white;font-size: 19px;padding-left: 2px;">
								环网表格
							</div>
							<div class="icon-ctrl fl chuiCenter suoxiao"></div>
						</div>
						<div class="list" style="margin-bottom: 10px; display: block;">
							<table id="tableOfLiuliang"></table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fl" style="width:46.75%;">
			<div style="height: 32%;">
				<h1 style="margin: 9px 0 10px 0;font-size: 23px;font-weight: 600;" class="titleColorWithe fl">流量趋势图</h1>
				<div class="fr" style="margin: 15px 0 4px 0;">
					<div class="fl  radiom radioActive"
						style="margin: 0 2px 0 11px; cursor: pointer;" value="min"></div>
					<span class="fl "
						style="color: #B6BECF; font-size: 15px; letter-spacing: 1px;">15分钟</span>
					<!-- <div class="fl  radiom" style="margin: 0 2px 0 11px;cursor: pointer;" value="hour"></div>
			<span class="fl " style="color: #B6BECF;font-size: 15px;letter-spacing: 1px;">小时</span> -->

				</div>
				<div class="clear"></div>
				<div style="height: 5px; position: relative;">
					<div
						style="position: absolute; left: 0; height: 100%; width: 15px; background: #00DEFF;"></div>
					<div
						style="position: absolute; right: 0; height: 100%; width: 15px; background: #00DEFF;"></div>
					<div
						style="position: relative; height: 0; border: 0.5px solid #00DEFF; top: calc(50% - 0.5px);"></div>
				</div>
				<div id="echartsDiv" style="margin-top: 12px;position:relative;">
					<div id="chart_1" style="width: 100%; min-height: 260px;"></div>
				</div>
			</div>
			<div style="height: 33%;">
				<h1 style="margin: 28px 0 10px 0;font-size: 23px;font-weight: 600;" class="titleColorWithe fl">流速峰值趋势图</h1>
				<div class="fr" style="margin-top: 35px;">
					<div class="fl  radiom radioActive"
						style="margin: 0 2px 0 11px; cursor: pointer;" value="min1"></div>
					<span class="fl "
						style="color: #B6BECF; font-size: 15px; letter-spacing: 1px;">15分钟</span>
					<div class="fl  radiom"
						style="margin: 0 2px 0 11px; cursor: pointer;" value="hour1"></div>
					<span class="fl "
						style="color: #B6BECF; font-size: 15px; letter-spacing: 1px;">小时</span>

				</div>
				<div class="clear"></div>

				<div style="height: 5px; position: relative;">
					<div
						style="position: absolute; left: 0; height: 100%; width: 15px; background: #00DEFF;"></div>
					<div
						style="position: absolute; right: 0; height: 100%; width: 15px; background: #00DEFF;"></div>
					<div
						style="position: relative; height: 0; border: 0.5px solid #00DEFF; top: calc(50% - 0.5px);"></div>
				</div>
				<div id="echartsDiv" style="margin-top: 10px;">
					<div id="chart_2" style="width: 100%; min-height: 260px;"></div>
				</div>
			</div>
			<div style="height: 33%;">
				<h1 style="margin: 28px 0 10px 0;font-size: 23px;font-weight: 600;" id="liuLiangtableTile" class="titleColorWithe">进博会场馆业务流量表</h1>
				<div style="height: 5px; position: relative;">
					<div
						style="position: absolute; left: 0; height: 100%; width: 15px; background: #00DEFF;"></div>
					<div
						style="position: absolute; right: 0; height: 100%; width: 15px; background: #00DEFF;"></div>
					<div
						style="position: relative; height: 0; border: 0.5px solid #00DEFF; top: calc(50% - 0.5px);"></div>
				</div>
				<div id="ex" style="width: 100%; margin-top: 29px;">
					<table id="table_yewuliuliang"></table>
				</div>
			</div>

		</div>
	</div>

</body>

<!-- 自己的js -->
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/common/jquery.ux.loadMask.js"></script>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/PTNSCR/ptnSencondPart/ptnSencondPart.js"></script>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/PTNSCR/ptnSencondPart/drawPic.js"></script>
<script type="text/javascript"src="${ctx}/scripts/local-lsm/PTNSCR/mapIndex/ThresAjax.js"></script>


<script>
    $(document).ready(function(){
        //初始高度
        var winHeight = document.body.clientHeight; 
        var winHeight = document.body.clientHeight; 
        //var winWidth = 1400; 
        //var winHeight = 1080; 
        //$(".height1").height(winHeight*0.206 + "px");
        
        //初始函数
        ptnSencondPart.init();
//      setInterval(ptnSencondPart.initLoad,5*60*1000);
        setInterval(function () {
        	nowLunBoIndex++;
        	var name = AllOfPtnInfo[nowLunBoIndex%AllOfPtnInfo.length].name;
        	objGol.hot_area_name = name;
        	ptnSencondPart.initLoad();
        },15*60*1000);
           
});    

</script>
</html>