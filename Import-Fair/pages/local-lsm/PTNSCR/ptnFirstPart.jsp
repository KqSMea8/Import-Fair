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


<title>PTNSCR-first</title>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet"
	href="${ctx}/static/styles/local-lsm/common/custom_small.css" />
<link rel="stylesheet"
	href="${ctx}/scripts/local-lsm/common/lou-multi-select-e052211/css/multi-select.css" />
<style type="text/css">
 html,body{
			width: 100%;
			height: 100%;
			margin: 0;padding: 0;
			background: rgba(0,0,0,0);
		} 
/* html,body{
			margin: 0;
			padding: 0;
			position: relative;
			width: 778px;height: 1200px;
		}  */
.fl {
	float: left;
}

.fr {
	float: right;
}

.widthForthird{
	width:33.3%;
}

.widthForTwo{
	width:49.5%;
}

.bgForTitle{
	background: url(${ctx}/static/images/PTNSCR/firstAndSecondPart/titleBg.png);
	background-repeat:no-repeat;
	background-position:50% 50%;
	height:84px;
}

.titleColor{
 color:rgb(0,217,255);
 font-size:18px;
}
.titleColorWithe{
 color:#F5F5F5;
 font-size:20px;
}

#first h1{
    margin: 0;
    margin-top: 10px;
    text-align:center;
}

.colorchange{
background-color:rgb(0,93,174);
}

.colorLight{
background-color:rgb(0,71,149);
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
    height: 25px;
    line-height: 25px;
    font-size: 14px;
}
.ui-jqgrid .ui-jqgrid-title{font-size:14px;}    /*修改grid标题的字体大小*/ 
         
 .ui-jqgrid-sortable {font-size:14px;}   /*修改列名的字体大小*/ 
         
.ui-jqgrid tr.jqgrow td {font-size:14px;} /*修改表格内容字体*/
.ui-jqgrid tr.ui-row-ltr td {
    text-align: left;
    border-right-width: 0px;
    border-right-color: inherit;
    border-right-style: solid;
}

.ui-jqgrid tr.jqgrow td {
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-family: 微软雅黑;
    font-weight: bold;
    border-bottom-width: 0px;
    font-size: 14px;
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
/* input,button,select,textarea{outline:none;} */

</style>
</head>
<body id="main" style="/* overflow-y: hidden */;padding:0 19px 0 38px;">
	<div style="" id="first">
		<div class="fl widthForthird bgForTitle" ><h1 class="titleColorWithe">今日累计LTE流量</h1><h1 class="titleColor " style="margin-top:10px;vertical-align:middle;text-align:center;line-height:20px;width:240.08px;font-size:25px;" id="dayFlow"><span class="titleColorWithe "></span></h1></div>
		<div class="fl widthForthird bgForTitle" ><h1 class="titleColorWithe">历史LTE峰值日流量</h1><h1 class="titleColor fl" style="margin-top:10px;vertical-align:middle;text-align:center;line-height:20px;width:240.08px;;color:rgb(0,255,91);font-size:25px;" id="historyFlow"><span class="titleColorWithe "></span></h1></div>
		<div class="fl widthForthird bgForTitle" ><h1 class="titleColorWithe">当前峰值站点</h1><h1 class="titleColor" style="margin-top:10px;color:rgb(192,67,73);vertical-align:middle;text-align:center;line-height:20px;width:240.08px;font-size:25px;" id="peakSite"></h1></div>
		<div class="clear"></div>
	</div>
	<div class="clear"></div>
	<div style="padding-left:0px;height:25%">
		<div class="fl " style="padding-right:10px;width:40%;">
			<h1 style="margin-bottom: 15px;font-size:20px;margin-top:10px;" class="titleColorWithe">预警占比<span id="chart_yujing_titile" style="margin-left:5px;font-size:14px;"></span></h1>
			<div style="height: 5px;position: relative;">
				<div style="position: absolute;left: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
				<div style="position: absolute;right: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
				<div style="position: relative;height: 0;border: 0.5px solid #00DEFF;top: calc(50% - 0.5px);"></div>
			</div>
			<div id="echartsDiv" style="width:100%;margin-top:20px;">
<!-- 					<div style="color:white;"><span id="chart_yujing_titile" style="display:block;text-align:center"></span></div>
 -->                    <div id="chart_yujing" style="width: 100%;min-height: 206px;"></div>
            </div>
		</div>
		<div class="fl " style="width:60%;padding-left:20px;">
			<h1 style="margin-bottom: 15px;font-size:20px;margin-top:10px;" class="titleColorWithe">预警详情</h1>
			<div style="height: 5px;position: relative;">
				<div style="position: absolute;left: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
				<div style="position: absolute;right: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
				<div style="position: relative;height: 0;border: 0.5px solid #00DEFF;top: calc(50% - 0.5px);"></div>
			</div>
			<div id="ex" style="width:100%;margin-top:20px;">
					<table id="table_yujing"></table>
<!-- 					<div id="table0_gridPager"></div>
 -->				</div>
		</div>
		<div class="clear"></div>
	</div>
	<div class="clear"></div>
	<div style="">
	<h1 style="text-align:left;line-height:30px;height:30px;margin-bottom: 15px;font-size:20px;" class="titleColorWithe">流速峰值排名
	<div class="fr" style="margin-top:5px;line-height:22px;height:22px;font-size:16px;">
	<button class="colorchange " id="btn1" style="display: inline-block;outline:none;margin-right: -5px;border:0px;border-top-left-radius:10px;border-bottom-left-radius:10px;" onclick="ptnFirstPart.nowOrHistory('btn1','hist','curr');">当前</button> 
	<button class="colorLight " id="btn2" style="border:0px;outline:none;border-top-right-radius:10px;border-bottom-right-radius:10px;" onclick="ptnFirstPart.nowOrHistory('btn2','hist','hist');">历史</button>
	<!-- <a href="##" class="colorchange" style=" display: inline-block;margin-right: -3px;">当前</a>
    <a href="##" class="colorLight" style=" display: inline-block;">历史</a> -->
	</div>
	</h1>
	
	
	<div class="clear"></div>
			<div style="height: 5px;position: relative;">
				<div style="position: absolute;left: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
				<div style="position: absolute;right: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
				<div style="position: relative;height: 0;border: 0.5px solid #00DEFF;top: calc(50% - 0.5px);"></div>
			</div>
	<div id="echartsDiv" style="position:relative;margin-top:15px;">
	<div class="" style="position:absolute;z-index:5;">
	<button class="colorchange " id="btn3" style="display: inline-block;outline:none;border-top-left-radius:10px;border-bottom-left-radius:10px;margin-right: -5px;border:0px;color:white" onclick="ptnFirstPart.nowOrHistory('btn3','site','site');">单站</button> 
	<button class="colorLight " id="btn4" style="border:0px;outline:none;border-top-right-radius:10px;border-bottom-right-radius:10px;color:white" onclick="ptnFirstPart.nowOrHistory('btn4','site','');">区域</button>
	<!-- <a href="##" class="colorchange" style=" display: inline-block;margin-right: -3px;">当前</a>
    <a href="##" class="colorLight" style=" display: inline-block;">历史</a> -->
	</div>
                    <div id="chart_liuSu" style="width: 100%;min-height: 330px;margin-top:15px"></div>
            </div>
	</div>
	<div style="">
	<h1 style="margin-bottom: 15px;font-size:20px;margin-top:10px;" class="titleColorWithe">进博会今日流量高峰预测</h1>
			<div style="height: 5px;position: relative;">
				<div style="position: absolute;left: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
				<div style="position: absolute;right: 0;height: 100%;width: 15px;background: #00DEFF;"></div>
				<div style="position: relative;height: 0;border: 0.5px solid #00DEFF;top: calc(50% - 0.5px);"></div>
			</div>
	<div id="echartsDiv" style="margin-top:15px;">
                    <div id="chart_jinBoHuiYuCE" style="width: 100%;min-height: 200px;"></div>
            </div>
	</div>

</body>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/PTNSCR/ptnFirstPart/drawPic.js"></script>
<script type="text/javascript"
	src="${ctx}/scripts/local-lsm/PTNSCR/ptnFirstPart/ptnFirstPart.js"></script>

<script>
    $(document).ready(function(){
        //初始高度
    	ptnFirstPart.init();
    	setInterval(ptnFirstPart.initLoad,15*60*1000);
           
});    

</script>
</html>