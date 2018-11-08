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
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<link rel="stylesheet"href="${ctx}/scripts/local-lsm/overview/ft-carousel.css" />
<title>中国国际进口博览会通信保障</title>
<style type="text/css">
.leaflet-left {
	left: 30px;
}

.leaflet-top {
	top: 30px;
}

.rotate {
	transform: rotate(180deg);
	-ms-transform: rotate(180deg); /* IE 9 */
	-moz-transform: rotate(180deg); /* Firefox */
	-webkit-transform: rotate(180deg); /* Safari 和 Chrome */
	-o-transform: rotate(180deg); /* Opera */
}

.rotate_span {
	transform: rotate(180deg);
	-ms-transform: rotate(180deg); /* IE 9 */
	-moz-transform: rotate(180deg); /* Firefox */
	-webkit-transform: rotate(180deg); /* Safari 和 Chrome */
	-o-transform: rotate(180deg); /* Opera */
}
</style>
</head>
<body style="width:2000px;height:1200px;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div>
<div class="bgL">
<div style="width: 500px;margin-top: -40px; font-size: 40px;position: absolute;color: #66E6FF">
	<span>区域概览</span><img id="k_img" src="${ctx}/static/images/overview/k_2-1.png" style="margin: 0 7px;height:40px;cursor:pointer;"><span>场景导航</span>
</div>
<div style="width: 80px;left:1880px;font-size: 20px;z-index: 10;margin-top:3px;position: absolute;color: #66E6FF">
	<div style="background: rgba(0,102,255,0);width:80px;height:40px" id="ciieleft"></div>
</div>
<!-- 	气泡 -->
	<div class="screencol">
		<div style="width:230px;height:100%;">
			<div class="ciiefakebubble"></div>
			<div class="ciiebubble-line"></div>
			<div class="ciiefakebubble"></div>
			<div class="ciiebubble-line"></div>
			<div class="ciiefakebubble"></div>
			<div class="ciiebubble-line"></div>
			<div class="ciiefakebubble"></div>
			<div class="ciiebubble-line"></div>
			<div class="ciiefakebubble"></div>
		</div>
		<div style="width:230px;height:100%;position:absolute;top:0;left:0;">
			<div class="ciiebubble ciiebubble-selected" name="进口博览会" style="cursor:pointer;">保障区域</div>
			<div class="ciiebubble" name="J-国家会展中心" style="padding-top:65px;cursor:pointer;">国家会<br>展中心</div>
			<div id="bubble2" name="J-重要场所" class="ciiebubble" style="cursor:pointer;">重要场所</div>
			<div class="ciiebubble" name="J-酒店" style="cursor:pointer;">酒店</div>
			<div class="ciiebubble" name="J-交通枢纽" style="cursor:pointer;">交通枢纽</div>
		</div>
		<div style="clear:both;"></div>
	</div>
<!-- 	连接线 -->
	<div class="screencol" style="width:40px;">
		<div id="link" style="width:40px;height:1px;border:solid 1px #216be8;position:absolute;top:50%;left:-10px;margin-top:10px;">
		</div>
		<div style="clear:both;"></div>
	</div>
	
<!-- 	连接线 组-->
	<div class="screencol" style="width:108px;margin-left:-10px;">
		<div class="ciielines" style="">
			<div class="ciiedot" style="position:absolute;left:40px;top:-24px;"></div>
			<div class="ciiedot" style="position:absolute;left:40px;top:264px;"></div>
			<div class="ciiedot" style="position:absolute;left:40px;top:552px;"></div>
			<div class="ciiedot" style="position:absolute;left:40px;bottom:-24px;"></div>
		</div>
		
		<div style="clear:both;"></div>
	</div>
<!-- 	场馆和指标-->
	<div class="screencol">
		<div id="hotList" style="width:1550px;height:100%;overflow:hidden;">
		<div class="ciiehotinfoparent"  style="width:100%;">
				<div class="fontImportantInfo ciiehotinfo-hot" style="margin-left:35px;">国家会展中心</div>
				<div class="ciiehotinfo" style="width:100%;">
					<div class="ciiehotimg"><img class="ciiehotimgsrc" src="${ctx}/static/styles/local-lsm/ciienew/images/hotimg/ciie.png"></div>
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon1"></div>
							<div class="fontSubInfo">用户数</div>
							<div class="fontUnitTime">(人)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
					
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon2"></div>
							<div class="fontSubInfo">话务量</div>
							<div class="fontUnitTime">(Erl)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
					
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon3"></div>
							<div class="fontSubInfo">流量</div>
							<div class="fontUnitTime">(GB)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
				</div>
			</div>
			
<!-- 			喜马拉雅酒店 -->
			<div class="ciiehotinfoparent"  style="width:100%;">
				<div class="fontImportantInfo ciiehotinfo-hot" style="margin-left:35px;">喜马拉雅酒店</div>
				<div class="ciiehotinfo" style="width:100%;">
					<div class="ciiehotimg"><img class="ciiehotimgsrc" src="${ctx}/static/styles/local-lsm/ciienew/images/hotimg/himalayan.png"></div>
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon1"></div>
							<div class="fontSubInfo">用户数</div>
							<div class="fontUnitTime">(人)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
					
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon2"></div>
							<div class="fontSubInfo">话务量</div>
							<div class="fontUnitTime">(Erl)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
					
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon3"></div>
							<div class="fontSubInfo">流量</div>
							<div class="fontUnitTime">(GB)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
				</div>
			</div>
			
<!-- 			虹桥火车站 -->
			<div class="ciiehotinfoparent"  style="width:100%;">
				<div class="fontImportantInfo ciiehotinfo-hot" style="margin-left:35px;">虹桥火车站 </div>
				<div class="ciiehotinfo" style="width:100%;">
					<div class="ciiehotimg"><img class="ciiehotimgsrc" src="${ctx}/static/styles/local-lsm/ciienew/images/hotimg/hongqiaotrain.png"></div>
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon1"></div>
							<div class="fontSubInfo">用户数</div>
							<div class="fontUnitTime">(人)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
					
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon2"></div>
							<div class="fontSubInfo">话务量</div>
							<div class="fontUnitTime">(Erl)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
					
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon3"></div>
							<div class="fontSubInfo">流量</div>
							<div class="fontUnitTime">(GB)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
				</div>
			</div>
			
<!-- 			浦东机场 -->
			<div class="ciiehotinfoparent"  style="width:100%;">
				<div class="fontImportantInfo ciiehotinfo-hot" style="margin-left:35px;">浦东机场</div>
				<div class="ciiehotinfo" style="width:100%;">
					<div class="ciiehotimg"><img class="ciiehotimgsrc" src="${ctx}/static/styles/local-lsm/ciienew/images/hotimg/pudongair.png"></div>
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon1"></div>
							<div class="fontSubInfo">用户数</div>
							<div class="fontUnitTime">(人)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
					
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon2"></div>
							<div class="fontSubInfo">话务量</div>
							<div class="fontUnitTime">(Erl)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
						</div>
					</div>
					
					<div class="ciiehotkpi">
						<div class="ciiehotkpititle horizontalRow" style="width:100%;">
							<div class="ciiekpiicon3"></div>
							<div class="fontSubInfo">流量</div>
							<div class="fontUnitTime">(GB)</div>
						</div>
						<div class="ciiekpivalue">--</div>
						<div class="ciiekpiratio horizontalRow">
							<div class="threeround">同</div>
							<div class="icon-up" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
							<div class="threeround" style="margin-left:15px;">环</div>
							<div class="icon-down" style="margin-top:20px;"></div>
							<div class="fontSubInfo" style="font-size:20px;line-height:42px;">--</div>
							<div class="fontUnitTime" style="font-size:12px;line-height:50px;">%</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="clear:both;"></div>
	</div>
</div>

<div id="whpic" style="display:none;border-radius:10px;background:rgba(1,0,69,0.85);width:1740px;height:760px;overflow:hidden;padding:40px;position:absolute;left:50%;top:50%;margin-left:-870px;margin-top:-335px;">
	<div class="fontImportantInfo">WH馆</div>
	<img style="float:left;" src="${ctx}/static/styles/local-lsm/ciienew/images/hotimg/viewfile.jpg"></img>
	<img style="float:left;margin-left:20px;" src="${ctx}/static/styles/local-lsm/ciienew/images/hotimg/viewfile2.jpg"></img>
</div>
<!-- 弹出 趋势图 -->
<div class="modal fade" id="Modal" style="position:absolute;">
	<div class="modal-dialog"
		style="width: 1600px; height: 900px; margin: 20px auto;">
		<div class="modal-content">
			<div class="modal-header" style="font-size:40px;text-align: center;"><span id="bz_ecarts_Modal_span"></span>&nbsp<span id="bz_ecarts_Modal_span_val" style="font-size: 30px;"></span></div>
			<div class="modal-body" id="modal-body">
				<div id="bz_ecarts_Modal" style="height: 900px; width: 1530px;border: solid 1px #2431ac;margin:20px;background-color: rgba(0,4,66,0.75);border-radius: 15px;"></div>
			</div>
		</div>
	</div>
</div>
</body>

<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/ft-carousel.min.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciieleft.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popoverposition.js"></script> 
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/ecarts.js"></script>
<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var screen=null;
$(function(){
	if(isScreenMode=="true"){
		
	}else{
		new CIIENEW.NavigatorSingle('场景保障-场景导航');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		$('.screentitle_s').css('display','block');
		zoomPage(2000,1300);
		setInterval(refreshTime,1000);
		
	}
	screen=new CIIENEW.Screen('进口博览会');
});
function updateHotspot(hotspot){
	if(screen!=null){
		screen.hotspot=hotspot;
		screen.update();
	}
}

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