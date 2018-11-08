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
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<title>中国国际进口博览会通信保障</title>
<style type="text/css">
.leaflet-left {
	left: 30px;
}

.leaflet-top {
	top: 30px;
}
.rotates {
	transform: rotateY(360deg);
	-ms-transform: rotatY(360deg);
	-moz-transform: rotateY(360deg); 
	-webkit-transform: rotateY(360deg);
	-o-transform: rotateY(360deg);
	transition: all 1s ease-in-out;
	-moz-transition: all 1s ease-in-out; 
	-webkit-transition: all 1s ease-in-out; 
	-o-transition: all 1s ease-in-out; 
}  
.modal {
	top: 0 !important;
}

.modal-backdrop, .modal {
	width: 1550px !important;
	height: 1300px !important;
}
/* IE8/9/10 */
@media screen\0{
    .modal-backdrop,.modal{
		width:100% !important;
		height:100% !important;
	}
}
.form-control{
    width: 250px;
    height: 50px;
    background-color: rgba(1,0,69,0.75) !important;
    color: #fff;
   	font-size: 30px;
/*     border: 1px solid rgba(0,102,255,0.35); */
}
</style>
</head>
<body style="width:1550px;height:1200px;" style="position:relative;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s" style="width:600px;margin-left:-300px;"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div>
<div class="bgR">
	<div class="screencol" style="width:1470px;position: absolute;height:1140px">
		<div style="width:100%;position: relative;">
			<div class="icon-runstatus" style="float:left;margin-top:10px;"></div>
			<div class="fontContentTitle" style="float:left;margin-left:10px;">基站运行状态</div>
			<div onmouseover="ciierig_Roll_img_ydyw_onmouseover2(this);"  onmouseout ="ciierig_Roll_img_mouseout2(this)" style="font-size: 20px;float: right; color: #fff;cursor:pointer;z-index: 10; top: 15px;position: absolute;left: 435px;">
				<div  id="Roll_img_div2" style="visibility:hidden; display:none"><span style="margin-right:20px">翻滚:</span><span>是</span><img onclick="Roll_img_click2();" id="Roll_img2" src="${ctx}/static/images/overview/k_1.png" style="margin: 0 7px;cursor:pointer;"><span>否</span></div>
			</div>
			<div   style="font-size: 30px;float: right; color: #fff;cursor:pointer;z-index: 10; top: 85px;position: absolute;left: 555px;">
				<div  id="Roll_img_div_one" ><span>15分钟</span><img id="Roll_img_one" data-bool="false" src="${ctx}/static/images/overview/k_1.png" style="margin: 0 7px;cursor:pointer;height: 30px;"><span>1分钟</span></div>
			</div>
			<div   onmouseover="Roll_img_div_two_onmouseover(this);"  onmouseout ="Roll_img_div_two_mouseout(this)" style="font-size: 20px;float: right; color: #fff;cursor:pointer;z-index: 10; top: 80px;position: absolute;left: 835px;width:50px;height:40px">
				<div  id="Roll_img_div_two" ><img id="Roll_img_two" data-bool="false" src="${ctx}/static/styles/local-lsm/ciie/images/bulletin.png" style="margin: 0 7px;cursor:pointer;display:none;width:40px;height:40px;visibility:hidden;" title="一分钟指标报表"></div>
			</div>
			<div style="z-index:10;position: absolute;left:840px;width:40px;top: 370px;cursor: pointer;float:right;"><img src="${ctx}/static/images/overview/d2.png" style="cursor: pointer;" id="ss_model_lte"></div>
			<div  style="z-index:10;position: absolute;left:1420px;width:40px;top: 370px;cursor: pointer;float:right"><img src="${ctx}/static/images/overview/d2.png" style="cursor: pointer;" id="ss_model_gsm"></div>
		</div>
		<div class="horizontalRow" style="width:100%;height:280px;" id="jzzt"></div>
		<div class="horizontalRow" style="width:100%;margin-top:50px;">
			<div class="cellbox">
				<div id="TDDLIST" class="cellblockparent" style="width:410px;cursor:pointer;margin-left:30px;"></div>
			</div>
			<div class="cellbox">
				<div id="FDDLIST" class="cellblockparent" style="width:410px;cursor:pointer;"></div>
			</div>
			<div class="cellbox">
				<div id="GSMLIST" class="cellblockparent" style="width:525px;cursor:pointer;margin-left:30px;"></div>
			</div>
		</div>
	</div>
</div>
<div class="modal fade"  id="modalWin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:1400px;">
		<div class="modal-content" >
			<div class="modal-header" style="border-bottom:none;">
				<h4 class="modal-title" id="modalWinTitle" style="font-size:32px;">
				</h4>
			</div>
			<div class="modal-body" id="modalWinBody" style="width:100%;height:900px;overflow:auto;">
			</div>
		</div>
	</div>
</div>
<!-- 弹出 -->
<div class="modal fade" id="Select_gsm">
	<div class="modal-dialog" style="width:500px; height: 200px; margin: 20px auto;margin-top: 29.5%;margin-left: 960px;">
		<div class="modal-content">
			<div class="modal-header" style="font-size:40px"><span>指标排序</span></div>
			<div class="modal-header">
				<span style="font-size: 40px;margin-left: 15px;">指标选择 :</span>
				<select class="form-control"  id="gsm" style="float: right;">
					<option value="gsmhwl">GSM 话务量</option>
			        <option value="s_091">用户数</option>
			       	<option value="gsm_wireless_use_ratio">GSM无线接通率</option>
			        <option value="gsm_wireless_drop_ratio">GSM无线掉话率</option>
				</select>
			</div>
			<div >
				<button type="button" class="btn btn-lg btn-primary" style="margin-bottom:20px;margin-top:20px;margin-left:30%;margin-right:20px;font-size:30px" id="confirm_gsm">确认</button>
				<button type="button" class="btn btn-default btn-lg" style="margin-bottom:20px;margin-top:20px;font-size:30px;background-color: rgba(250, 250, 250, 1) !important;color:#000"id="close_gsm">取消</button>
		   </div>
		</div>
	</div>
</div>
<div class="modal fade" id="Modal" style="position:absolute;">
	<div class="modal-dialog"
		style="width: 1400px; height: 1200px; margin: 20px auto;">
		<div class="modal-content">
			<div class="modal-body" id="modal-body">
				<iframe frameborder="0" style="width: 1400px; height: 1100px;" src="http://10.222.42.22:8080/INAS/pages/reportManageSys/autoReport.jsp?autoReportParam=jbhReport&operate=false"></iframe>
			</div>
		</div>
	</div>
</div>
<div class="modal fade" id="Select_lte">
	<div class="modal-dialog" style="width:500px; height: 200px; margin: 20px auto;margin-top: 29.5%;margin-left:420px;">
		<div class="modal-content">
			<div class="modal-header" style="font-size:40px"><span>指标排序</span></div>
			<div class="modal-header">
				<span style="font-size: 40px;margin-left: 15px;">指标选择 :</span>
				<select class="form-control"  id="lte" style="float: right;">
				  	<option value="s_213">流量</option>
			        <option value="s_091">用户数</option>
			        <option value="lte_ul_prb_use_ratio">上行PRB利用率</option>
			        <option value="succconnestab">RRC连接数</option>
			        <option value="ulmeannl_prb">平均干扰电平</option>
				</select>
			</div>
			<div >
				<button type="button" class="btn btn-lg btn-primary" style="margin-bottom:20px;margin-top:20px;margin-left:30%;margin-right:20px;font-size:30px" id="confirm_lte">确认</button>
				<button type="button" class="btn btn-default btn-lg" style="margin-bottom:20px;margin-top:20px;font-size:30px;background-color: rgba(250, 250, 250, 1) !important;color:#000"id="close_lte">取消</button>
		   </div>
		</div>
	</div>
</div>
	<div class="modal fade" id="alarm" style="position:absolute;"></div>
</body>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>

<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciieright.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>
<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var SCREEN=null;
$(function(){
	if(isScreenMode=="true"){
	}else{
		new CIIENEW.NavigatorSingle('场景保障-场景概览');
		$('.screentitle_s').css('display','block');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		zoomPage(1550,1300);
		setInterval(refreshTime,1000);
		
	}
	SCREEN=new CIIENEW.Screen();
	
});
function updateHotspot(hotspot){
	if(SCREEN!=null){
		/* SCREEN.hotspot=hotspot; */
		SCREEN.init(hotspot);
	}
}
function overview_left(){
	window.location.href=eastcom.baseURL+"/pages/local-lsm/ciienew/overviewright.jsp?isScreenMode="+isScreenMode;
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