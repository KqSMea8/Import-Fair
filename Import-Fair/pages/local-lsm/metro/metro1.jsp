<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String ips = request.getParameter("ips");
%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<%@ include file="/common/lib.jsp"%>
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/remote/sockjs-1.0.3.min.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/remote/stomp.min.js"></script>

<!-- 新增弹框需求引用js -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/metro/metroAddBounce_yewu.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/metro/metroAddBounce_zhicha.js"></script>

<script type="text/javascript" src="${jslib}/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${jslib}/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />

<title>地铁</title>
</head>
<body>

        <div class="metroLeft">
        	<div style="position:relative;width:100%;">
        		<table id="businessGrid" style="cursor:pointer;"></table>
        		<div style="position:absolute;top:2px;left:2px;display:block;background:#012d72;width:115px;height:40px;">
	        		<div id="businessGridColConfig" class="regionDetailColConfig" title="列配置" style="position:absolute;top:5px;left:5px;display:block;"></div>
	        		<div style="position:absolute;top:10px;left:55px;">
	        			<span class="kpiType" style="text-decoration: underline;">信</span>
	        			<span style="width:5px;display:inline-block;"></span>
	        			<span class="kpiType">统</span>
	        			<span style="width:5px;display:inline-block;"></span>
	        			<span class="kpiType" id="businessGridRowLimit" style="display:none;">全</span>
	        		</div>
        		</div>
        	</div>
        </div>
        <div class="metroRight">
        	<div>
        		<div id="businessChart" class="centerChart borderBox"></div>
        		<span id="compareTitle"></span>
        	</div>
        	<div style="height:5px"></div>
        	<div style="position:relative;width:100%;">
        		<table id="worstCellGrid" ></table>
        		<div style="position:absolute;top:2px;left:2px;display:block;background:#012d72;width:300px;height:40px;">
	        		<div id="worstCellGridColConfig" class="regionDetailColConfig" title="列配置" style="position:absolute;top:5px;left:5px;"></div>
	        		<div style="position:absolute;top:10px;left:55px;">
	        			<span class="cellTypeTitle" >质差小区</span>
	        			<span style="width:8px;display:inline-block;"></span>
	        			<span class="cellType"  name="2g">2G</span>
	        			<span style="width:8px;display:inline-block;"></span>
	        			<span class="cellType" name="3g">3G</span>
	        			<span style="width:8px;display:inline-block;"></span>
	        			<span class="cellType" name="4g" style="text-decoration: underline;">4G</span>
	        		</div>
        		</div>
        	</div>
        </div>
	<div class="DL2">
<div class="subtitle subtitle_txt1" >
	<span id="subtitleSpan" class="subtitleSpan">地铁场景</span>
	<div id="mainReturnBtn" class="returnIconBtn" title="返回"></div>
	<div id="selectedTimeLabel" class="selectedTimeLabel" onclick="WdatePicker({onpicked:selectTimePicked,oncleared:selectTimePicked,dateFmt : 'yyyy-MM-dd HH:mm:ss'})"></div>
	<span class="leftTime">北京时间</span></div>
            
            <div class="DL2_content">
            <div class="Lnorm1" name="用户数">
            	<div class="caption">
                    <div class="subject">
                        <i class="icon icon-passenger"></i> 
                        <span>用户数</span>
                    </div>
                    <div id="labelCustomerTime" class="time">00:00</div>
                </div>
                <div class="data">
                    <div id="labelCustomerCount" class="exponent">
                    <h1>0&nbsp;<span>人</span></h1>
                    </div>
                    <div id="customerCompareChart" class="chart0"></div>
                </div>
                <table class="detailTable" cellpadding="10">
	        		<tr>
	        			<td style="width:300px;"><span class="kpiName">历史峰值:&nbsp;</span><span id="label00" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">今日累计:&nbsp;</span><span id="label03" class="kpiValue">--</span></td>
	        		</tr>
	        		<tr>
	        			<td><span class="kpiName" >峰值时间:&nbsp;</span><span id="label04" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">累计峰值:&nbsp;</span><span id="label07" class="kpiValue">--</span></td>
	        		</tr>
	        		<tr>
	        			<td><span class="kpiName" >进站:&nbsp;</span><span id="label01" class="kpiValue">--</span></td>
	        			<td><span class="kpiName" >出站:&nbsp;</span><span id="label05" class="kpiValue">--</span></td>
	        		</tr>
	        		<tr>
	        			<td><span class="kpiName">2G:&nbsp;</span><span id="label02" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">4G:&nbsp;</span><span id="label06" class="kpiValue">--</span></td>
	        		</tr>
        		</table>
            </div>
            
            <div class="line1 Lline"></div>
            <div class="Lnorm1"  name="下载速率" >
            	<div class="caption">
                    <div class="subject">
                        <i class="icon icon-traffic"></i> 
                        <span>下载速率</span>
                    </div>
                    <div id="labelTrafficFlowTime" class="time">00:00</div>
                </div>
                <div class="data">
                    <div id="labelTrafficFlow" class="exponent">
                    <h1>0&nbsp;<span>Kbps</span></h1>
                    </div>
                    <div id="trafficFlowCompareChart" class="chart0"></div>
                </div>
                <table class="detailTable">
	        		<tr>
	        			<td style="width:300px;"><span class="kpiName" >历史峰值:&nbsp;</span><span id="label10" class="kpiValue">--&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
	        			<td><span class="kpiName">2G:&nbsp;</span><span id="label11" class="kpiValue">--</span></td>
	        		</tr>
	        		<tr>
	        			<td><span class="kpiName" >峰值时间:&nbsp;</span><span id="label12" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">4G:&nbsp;</span><span id="label13" class="kpiValue">--</span></td>
	        		</tr>
        		</table>
            </div>
            <div class="line1 Lline"></div>
            <div class="Lnorm1" name="数据流量">
            	<div class="caption">
                    <div class="subject">
                        <i class="icon icon-flow"></i> 
                        <span>数据流量</span>
                    </div>
                    <div id="labelFlowTime" class="time">0:00</div>
                    <img id="expandBtn" style="display:inline-block;cursor:pointer;margin-top:10px;" src="${ctx}/static/styles/local-lsm/common/images/toExpand.png"></img>
                </div>
                <div class="data">
                    <div id="totalFlow" class="exponent">
                    <h1>0&nbsp;<span>GB</span></h1>
                    </div>
                    <div id="flowCompareChart" class="chart0"></div>
                </div>                
            	<table class="detailTable">
	        		<tr>
	        			<td style="width:300px;"><span class="kpiName" >历史峰值:&nbsp;</span><span id="label20" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">2G:&nbsp;</span><span id="label21" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">今日累计:&nbsp;</span><span id="label22" class="kpiValue">--</span></td>
	        		</tr>
	        		<tr>
	        			<td><span class="kpiName" >峰值时间:&nbsp;</span><span id="label23" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">4G:&nbsp;</span><span id="label24" class="kpiValue">--</span></td>
	        			<td><span class="kpiName">累计峰值:&nbsp;</span><span id="label25" class="kpiValue">--</span></td>
	        		</tr>
        		</table>
            </div>
            </div>
        </div>
        
         <div id="lbMenu_expand" class="menu_expand">
               		<img id="lbMenu_expand_bg" src="${ctx}/static/styles/local-lsm/metro/images/menu.png" />
<!--                		<div id="menu1" name="区域" class="menuselector" style="left:15px;top:15px;"></div> -->
<!--                		<div id="menu2" name="左屏" class="menuselector" style="left:90px;top:20px;"></div> -->
               		<div id="menu3" name="中屏" class="menuselector" style="left:63px;top:15px;"></div>
               		<div id="menu4" name="右屏" class="menuselector" style="left:141px;top:100px;"></div>
               	</div> 
               <div id="lbMenu" class="menu"><img src="${ctx}/static/styles/local-lsm/metro/images/menuicon.png" /></div> 
</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/style.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/metro/metroscreen.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/metro/metronewscreen.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/threshold.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/stationDetail.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/p2pscreen.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/metro/metroscreen.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/metro/metronewscreen.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/metro/metroFunc.js"></script>

<script>
window.onkeypress=parent.window.onkeypress;//选择页面快捷键
if("<%=ips%>"=="1"){
	var oHead = document.getElementsByTagName('HEAD').item(0); 
    var oScript= document.createElement("script"); 
    oScript.type = "text/javascript"; 
    oScript.src="http://10.221.127.37:8282/ips/js-app/ipsmsg.js"; 
    oHead.appendChild( oScript); 
}
var BASEPATH="${ctx}";
var MetroScreenNewCtrl;
$(document).ready(function(){
	var dm=LSMScreen.DataManager.getInstance();
	dm.getMetroLineStationCellType({},function(result){
		var stationTypeMap={};
		for(var line in result){
			var lineMap=result[line];
			for(var station in lineMap){
				var record=lineMap[station];
				if(!isNaN(record["4G"])&&record["4G"]>0){
					stationTypeMap[station]="4g";
				}else{
					stationTypeMap[station]="3g";
				}
			}
		}
		MetroScreenNewCtrl=new MetroScreenNew.ScreenControllerNew(stationTypeMap);
	});
	
	setInterval(TitleTimer, 1000);
});
function timeLinePlayCallBack(time){
	if(MetroScreenNewCtrl!=null&&time!=null
			&&MetroScreenNewCtrl.businessChart!=null
			&&MetroScreenNewCtrl.businessChart.echart!=null){
		var echart=MetroScreenNewCtrl.businessChart.echart;
		
		try{
			var option=echart.getOption();
			var series=echart.getSeries();
			var xarr=option.xAxis[0].data;
			var realData=series[0].data;
			var hourMin=time.substring(11,16);
			var markData=[];
			for(var i=0;i<xarr.length;i++){
				if(xarr[i]==hourMin){
					markData.push({name : hourMin, value : realData[i], xAxis: i, yAxis: realData[i]});
					break;
				}
			}
			series[0].markPoint.data=markData;
			echart.setSeries(series,true);
		}catch(e){
			console.log("MetroScreenNewCtrl.businessChart 未初始化");
		}
		
	}
}
function NS_SW_chooseLineBySwf(lineIndex){
	if(MetroScreenNewCtrl!=null){
		MetroScreenNewCtrl.setMapSelectedHotspot("地铁"+lineIndex+"号线");
		MetroScreenNewCtrl.update();
	}
}

function changeMetroSize(toFullscreen){
	if(toFullscreen){
		$("#metroSwfFrame").addClass("metroFrameFull");
		$("#metroSwfFrame").removeClass("metroFrame");
		$(".DL2").css("display","none");
	}else{
		$("#metroSwfFrame").addClass("metroFrame");
		$("#metroSwfFrame").removeClass("metroFrameFull");
		$(".DL2").css("display","block");
	}
}


function selectTimePicked(dp){
	if(MetroScreenNewCtrl!=null){
		var time=$("#selectedTimeLabel").text();
		if(time==""){
			time=null;
		}
		MetroScreenNewCtrl.selectedTime=time;
		MetroScreenNewCtrl.update();
		
		var iframe=$("#metroSwfFrame")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.selectedTime=time;
		iframeWindow.updateUserCircle();
	}
}
function TitleTimer(){
	var date=new Date();
	var time=date.Format("hh:mm");
	$(".leftTime").text("北京时间:"+time);
}
function NS_SW_chooseLineBySwf(lineName){
	MetroScreenNewCtrl.setMapSelectedHotspot(lineName);
	MetroScreenNewCtrl.update();
}
</script>
</html>