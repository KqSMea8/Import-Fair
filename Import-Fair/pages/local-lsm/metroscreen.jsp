<!DOCTYPE html>
<html lang="zh-CN" style="overflow:auto;">
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
 <style type="text/css">
        td
        {
            white-space: nowrap;
        }
    </style>
<title>地铁</title>
</head>
<body style="overflow:hidden;">

        <div class="metroCenter">
        	<div style="position:relative;width:885px;">
        		<table id="businessGrid" style="cursor:pointer;"></table>
        		<div style="position:absolute;top:2px;left:2px;display:block;background:#012d72;width:165px;height:40px;">
	        		<div id="businessGridColConfig" class="regionDetailColConfig" title="列配置" style="position:absolute;top:5px;left:5px;display:block;"></div>
	        		<div style="position:absolute;height:25px;top:10px;left:55px;">
	        			<span class="kpiType kpiTypeBtn" style="text-decoration: underline;">信</span>
	        			<span style="width:2px;display:inline-block;"></span>
	        			<span class="kpiType kpiTypeBtn">统</span>
	        			<span style="width:2px;display:inline-block;"></span>
	        			<span class="kpiType kpiTypeBtn" id="businessGridRowLimit">N</span>
	        			<span style="width:2px;display:inline-block;"></span>
	        		</div>
	        		<span id="exportBusinessGrid" class="icon_exportPic" style="display:inline-block;position:absolute;top:12px;left:135px;"></span>
        		</div>
        	</div>
        	<div style="height:5px;"></div>
        	<div style="position:relative;width:885px;">
        		<table id="worstCellGrid" ></table>
        		<div style="position:absolute;top:2px;left:2px;display:block;background:#012d72;width:320px;height:40px;">
	        		<div id="worstCellGridColConfig" class="regionDetailColConfig" title="列配置" style="position:absolute;top:5px;left:5px;"></div>
	        		<div style="position:absolute;top:10px;left:55px;">
	        			<span class="cellTypeTitle" >质差小区</span>
	        			<span style="width:2px;display:inline-block;"></span>
	        			<span class="cellType"  name="2g">2G</span>
	        			<span style="width:2px;display:inline-block;"></span>
	        			<span class="cellType cellType3G" name="3g">3G</span>
	        			<span class="cellType3G" style="width:2px;display:inline-block;"></span>
	        			<span class="cellType" name="4g" style="text-decoration: underline;">4G</span>
	        			<span style="width:2px;display:inline-block;"></span>
	        		</div>
	        		<div id="exportWorstCellGrid" class="icon_exportPic" style="display:inline-block;position:absolute;top:12px;left:255px;"></div>
        		</div>
        		
        	</div>
        </div>
        <div class="metroBottom">
        	<div class="inline" style="width:585px;height:340px;">
        		<div id="hotAppGridParent" style="width:100%;height:100%;">
        			<table id="hotAppGrid"></table>
        			<div id="hotAppGridLegend" style="color:#ffffff;width:55px;height:40px;position:absolute;top:8px;left:30px;text-align:right;"></div>
        		</div>
        		<div id="hotAppChart" class="borderBox" style="display:none;width:100%;height:100%;"></div>
        		<div id="hotAppBtn" title="表" class="icon_metro_switch" style="position:absolute;top:2px;left:5px;"></div>
        		<div id="exportHotAppGrid" class="icon_exportPic" style="display:inline-block;position:absolute;top:27px;left:5px;"></div>
        	</div>
        	<div class="inline bottomChart" style="width:295px;position:relative;">
        		<div id="terminalChart" class="borderBox"></div>
        		<div id="terminalNtChart" class="borderBox" style="display:none;width:100%;height:100%;"></div>
        		<div id="terminalReturnBtn" class="returnIconBtn" title="返回" style="position:absolute;right:0px;top:0px;"></div>
        		<span id="termianlNtHotspot" style="display:none;color:#ffffff;font-size:14px;position:absolute;right:0px;top:0px;">--</span>
        		<div style="position:absolute;top:2px;left:5px;">
        			<div title="终端" class="icon_metro_chart1 terminalBtn" style="display:inline-block;"></div>
        			<div title="占比" class="icon_metro_chart2 terminalBtn" style="display:inline-block;"></div>
        		</div>
        	</div>
        	<div class="inline">
        		<div id="rankChart" class="rankChart borderBox"></div>
        	</div>
        	<div class="inline" style="position:relative;">
        		<div id="businessChart" class="centerChart borderBox"></div>
        		<span id="compareTitle"></span>
        	</div>
        	
        	<div id="lbMenu_expand" class="menu_expand">
               		<img id="lbMenu_expand_bg" src="${ctx}/static/styles/local-lsm/metro/images/menu_new/bg.png" />
               		<div id="menu1" name="业务" class="menuselector icon_business" style="left:43px;top:10px;"></div>
               		<div id="menu2" name="质差" class="menuselector icon_quality" style="left:111px;top:40px;"></div>
               		<div id="menu3" name="资源" class="menuselector icon_resource" style="left:131px;top:110px;"></div>
               	</div> 
               <div id="lbMenu" class="menu" style="width:30px;height:30px;"><img src="${ctx}/static/styles/local-lsm/metro/images/menuicon.png" style="width:30px;height:30px;"/></div> 
        	
        </div>
	<iframe id="metroSwfFrame" class="metroFrame borderBox" frameborder="no" allowtransparency="true" style="" src="metroswf/index.jsp?isScreenMode=false&width=1212&height=580"></iframe>
	
	<div class="DL2">
<div class="subtitle subtitle_txt1" >
	<span id="subtitleSpan" class="subtitleSpan">地铁场景</span>
	<div class="KpiType" style="position:absolute;left:470px;top:-15px;">
   		<div class="KpiTypeBtnDiv"><div name="min5" class="timeTypeRadio customRadio customRadioSelected"></div></div>
   		<div name="min5" class="KpiTypeTxt">5分钟</div>
   		<div class="KpiTypeBtnDiv"><div name="hour" class="timeTypeRadio customRadio"></div></div>
   		<div name="hour" class="KpiTypeTxt">小时</div>
   		<div class="KpiTypeBtnDiv"><div name="day" class="timeTypeRadio customRadio"></div></div>
   		<div name=""day"" class="KpiTypeTxt">天</div>
   		<div class="KpiTypeBtnDiv"><div name="month" class="timeTypeRadio customRadio"></div></div>
   		<div name="month" class="KpiTypeTxt">月</div>
   	</div>
	<div id="mainReturnBtn" class="returnIconBtn" title="返回"></div>
	<div id="selectedTimeLabel" class="selectedTimeLabel" style="white-space:nowrap;overflow:hidden;" onclick="WdatePicker({onpicked:selectTimePicked,oncleared:selectTimePicked,dateFmt : 'yyyy-MM-dd HH:mm:ss'})"></div>
	<span class="leftTime">北京时间</span></div>
            <div class="DL2_content">
	            <div class="Lnorm1" style="width:500px;">
	            	<div class="caption kpiDrillMain" name="用户数">
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
	                <table class="detailTable" style="width:500px;">
		        		<tr>
		        			<td class="peakAndAcc" ><span class="kpiName" >历史峰值:&nbsp;</span><span id="label00" class="kpiValue">--</span></td>
		        			<td class="kpiDrillMain" name="进站"><span class="kpiName">进站:&nbsp;</span><span id="label01" class="kpiValue">--</span></td>
		        			<td><span class="kpiName">2G:&nbsp;</span><span id="label02" class="kpiValue">--</span></td>
		        		</tr>
		        		<tr>
		        			<td class="peakAndAcc" ><span class="kpiName" >峰值时间:&nbsp;</span><span id="label04" class="kpiValue">--</span></td>
		        			<td class="kpiDrillMain" name="出站"><span class="kpiName">出站:&nbsp;</span><span id="label05" class="kpiValue">--</span></td>
		        			<td><span class="kpiName">4G:&nbsp;</span><span id="label06" class="kpiValue">--</span></td>
		        		</tr>
		        		<tr class="peakAndAcc">
		        			<td ><span class="kpiName">今日累计:&nbsp;</span><span id="label03" class="kpiValue">--</span></td>
		        			<td colspan="2"><span class="kpiName">累计峰值:&nbsp;</span><span id="label07" class="kpiValue">--</span></td>
		        		</tr>
	        		</table>
	            </div>
	            
	            <div class="line1 Lline"></div>
	            <div class="Lnorm1" style="width:500px;">
	            	<div class="caption kpiDrillMain" name="下载速率">
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
		        			<td class="peakAndAcc"><span class="kpiName" >历史峰值:&nbsp;</span><span id="label10" class="kpiValue">--&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
		        			<td><span class="kpiName">2G:&nbsp;</span><span id="label11" class="kpiValue">--</span></td>
		        		</tr>
		        		<tr>
		        			<td class="peakAndAcc"><span class="kpiName" >峰值时间:&nbsp;</span><span id="label12" class="kpiValue">--</span></td>
		        			<td><span class="kpiName">4G:&nbsp;</span><span id="label13" class="kpiValue">--</span></td>
		        		</tr>
	        		</table>
	            </div>
	            
	            <div class="line1 Lline"></div>
	            <div class="Lnorm1" style="width:520px;">
	            	<div class="caption kpiDrillMain" name="数据流量">
	                    <div class="subject">
	                        <i class="icon icon-flow"></i> 
	                        <span>数据流量</span>
	                    </div>
	                    <div id="labelFlowTime" class="time">0:00</div>
	                </div>
	                <div class="data">
	                    <div id="totalFlow" class="exponent">
	                    <h1>0&nbsp;<span>GB</span></h1>
	                    </div>
	                    <div id="flowCompareChart" class="chart0"></div>
	                </div>                
	            	<table class="detailTable">
		        		<tr>
		        			<td class="peakAndAcc"><span class="kpiName" >历史峰值:&nbsp;</span><span id="label20" class="kpiValue">--</span></td>
		        			<td><span class="kpiName">2G:&nbsp;</span><span id="label21" class="kpiValue">--</span></td>
		        			<td class="peakAndAcc"><span class="kpiName">今日累计:&nbsp;</span><span id="label22" class="kpiValue">--</span></td>
		        		</tr>
		        		<tr>
		        			<td class="peakAndAcc"><span class="kpiName" >峰值时间:&nbsp;</span><span id="label23" class="kpiValue">--</span></td>
		        			<td><span class="kpiName">4G:&nbsp;</span><span id="label24" class="kpiValue">--</span></td>
		        			<td class="peakAndAcc"><span class="kpiName">累计峰值:&nbsp;</span><span id="label25" class="kpiValue">--</span></td>
		        		</tr>
	        		</table>
	            </div>
	            
	            
	            <div class="line1 Lline"></div>
	            <div class="Lnorm1" style="width:500px;">
	            	<div class="caption kpiDrillMain" style="width:500px;" name="话务量">
	                    <div class="subject">
	                        <i class="icon icon-flow"></i> 
	                        <span>话务量</span>
	                    </div>
	                    <div id="labelTrafficTime" class="time">0:00</div>
	                    <img id="expandBtn" style="display:inline-block;cursor:pointer;margin-top:10px;" src="${ctx}/static/styles/local-lsm/common/images/toExpand.png"></img>
	                </div>
	                <div class="data" style="width:500px;">
	                    <div id="labelTraffic" class="exponent">
	                    <h1>0&nbsp;<span>Erl</span></h1>
	                    </div>
	                    <div id="trafficCompareChart" class="chart0"></div>
	                </div>                
	            	<table class="detailTable" style="width:500px;">
		        		<tr>
		        			<td><span class="kpiName">2G:&nbsp;</span><span id="labelKpiValue2G2" class="kpiValue">--</span></td>
		        			<td><span class="kpiName">4G:&nbsp;</span><span id="labelKpiValue4G2" class="kpiValue">--</span></td>
		        		</tr>
	        		</table>
	            </div>
            </div>
        </div>
        
        
</body>
<%@ include file="/pages/local-lsm/common/screenbaseinclude.jsp"%>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/style.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/metro/metroscreen.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/threshold.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/stationDetail.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/p2pscreen.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/metro/metroscreen.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/metro/metroFunc.js"></script>

<script>
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
		MetroScreenNewCtrl=new MetroScreenNew.ScreenController(stationTypeMap);
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
			var iframe=$("#metroSwfFrame")[0];
			var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
			var timeType=iframeWindow.timeType;
			
			if(timeType=="day"){
				hourMin=time.substring(5,10);
			}else if(timeType=="month"){
				hourMin=time.substring(5,7)+"月";
			}else{
				hourMin=time.substring(11,16);
			}
			
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
		var timeType=$(".customRadioSelected").attr("name");
		if(time==""){
			time=null;
		}
		if(timeType=="min5"){
			timeType=null;
		}
		MetroScreenNewCtrl.selectedTime=time;
		MetroScreenNewCtrl.update();
		
		var iframe=$("#metroSwfFrame")[0];
		var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
		iframeWindow.selectedTime=time;
		iframeWindow.timeType=timeType;
		iframeWindow.cacheTimeDataLine();
		iframeWindow.updateUserCircle();
		
	}
}
function TitleTimer(){
	var date=new Date();
	var time=date.Format("hh:mm");
	$(".leftTime").text("北京时间:"+time);
}
</script>
</html>