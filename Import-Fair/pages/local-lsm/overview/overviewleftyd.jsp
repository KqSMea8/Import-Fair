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


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/common/overviewleftyd.css" />

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/overviewleft/communityManage.css" />

<link rel="stylesheet" href="${ctx}/scripts/local-lsm/overview/ft-carousel.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />

<style type="text/css">
.modal{
	top: 0!important;
}
.modal-backdrop,.modal{
	width:2000px !important;
	height:1300px !important;
}
/* IE8/9/10 */
@media screen\0{
    .modal-backdrop,.modal{
		width:100% !important;
		height:100% !important;
	}
}
.modal-content{
background-color: rgba(0,0,0,0.85) !important;
}
.span{
    text-align: center;
    display: block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
</style>
<title>中国国际进口博览会通信保障</title>
</head>
<body style="width:2000px;height:1200px;position:absolute;"> 
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s"></div>
	<div style="clear:both;"></div>
	<div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;">
	</div>
</div>
	<div class="bgL">
		<div style="width:360px;position: relative;height:60px;top:-20px;font-size:40px;color:#66E6FF"><span>全网</span><img  id="k_img" src="${ctx}/static/images/overview/k_2-1.png" style="margin:0 7px;cursor:pointer;height:40px;"><span>保障区域</span></div>
		<div class="horizontalRow example" style="margin-top: -10px;width: 1326px; height: 400px;margin-right:24px;position: relative;">
			<div class="horizontalRow ft-carousel" style="line-height: 48px;" id="carousel_1">
				<div class="icon-mobile"></div>
				<div class="fontContentTitle" style="margin-left: 20px;">移动业务</div>
				<div style="margin-left: 20px;"><span id="bz_ydyw_Grouping_span" style="font-size:30px"></span></div>
				<div style="float: right; margin-right: 300px;" onmouseover="img_onmouseover('bz_ydyw');" onmouseout ="img_mouseout('bz_ydyw')"><img id="bz_ydyw_img" onclick="_model('bz_ydyw')" style="cursor:pointer;visibility:hidden"></div>
				<div onmouseover="Roll_img_onmouseover('bz_ydyw');" onmouseout ="Roll_img_mouseout('bz_ydyw')" style="font-size: 20px;float: right; color: #fff;cursor:pointer;z-index: 10; top: 5px;position: absolute;left: 500px;">
					<div style="visibility: hidden;" id="bz_ydyw_Roll_img_div"><span style="margin-right:20px">滚动:</span><span>是</span><img id="bz_ydyw_Roll_img" onclick="Roll_img_click('bz_ydyw')" src="${ctx}/static/images/overview/k_2.png" style="margin: 0 7px;cursor:pointer;"><span>否</span></div>
				</div>
				<div id="bz_ydyw_switch"></div>
				<br />
				<div id="bz_ydyw"></div>
			</div>
		</div>
		<div id="popover" style="position:relative;margin-top: -10px;"></div>
		<div style="width: 570px; height: 400px; float: right;position:relative;margin-top: -10px;">
			<div style="width: 48px; height: 48px; background-size: 100% 100%;" id="bz_trend_img"></div>
			<div class="fontContentTitle" style="margin-left: 56px; margin-top: -60px">
				<span id="bz_ecarts_span" style="font-size:42px"></span>
			</div>
			<div style="float: right;z-index:10;position: absolute;right:30px; top:0px;cursor:pointer;top:0px" id="zt_img" >
				<img src="${ctx}/static/images/overview/fd.png">
			</div>
			<div style="background-color: rgba(0, 102, 255, 0.15);height: 330px;border-radius: 5px;width: 100%;top: 63px;position: absolute;">
				<div style="font-size: 20px;right: 30px;z-index:10;position: absolute;cursor:pointer;top: 10px" id="bz_ecarts_val"></div>
 				<div id="bz_ecarts" style="height: 280px; width: 100%;position: absolute;top: 40px;"></div>
			</div>
		</div>
		<div class="horizontalRow example" style="width: 875px; height: 250px; margin-top: 40px;margin-right:24px;">
			<div class="horizontalRow ft-carousel" style="line-height: 68px;" id="carousel_2">
				<div class="icon-zqyw"></div>
				<div class="fontContentTitle" style="margin-left: 20px;margin-top: -10px;">政企业务</div>
				<div id="zqyw" style="margin-top: 10px;"></div>
			</div>
		</div>
		<div class="horizontalRow example" style="width: 1018px; height: 250px; margin-top: 40px;position:relative;">
			<div class="horizontalRow ft-carousel" style="line-height: 68px;" id="carousel_3">
				<div class="icon-zywz"></div>
				<div class="fontContentTitle" style="left:70px;top: -15px;z-index:10;position: absolute;">重要网站</div>
				 <div style="left:280px;top: -15px;z-index:10;position: absolute;"><span id="bz_zywz_Grouping_span" style="font-size: 30px;"></span></div>
				 <div onmouseover="Roll_img_onmouseover('bz_zywz');" onmouseout ="Roll_img_mouseout('bz_zywz')" style="font-size: 20px;float: right; color: #fff;cursor:pointer;z-index: 10; top:-10px;position: absolute;left: 470px;">
					     <div style="visibility: hidden;" id="bz_zywz_Roll_img_div"><span style="margin-right:20px">滚动:</span><span>是</span><img id="bz_zywz_Roll_img" onclick="Roll_img_click('bz_zywz')" src="${ctx}/static/images/overview/k_2.png" style="margin: 0 7px;cursor:pointer;"><span>否</span></div>
				</div>
				<div style="right: 170px;height: 40px;z-index:10;position: absolute;" onmouseover="img_onmouseover('bz_zywz');" onmouseout ="img_mouseout('bz_zywz')"><img id="bz_zywz_img" onclick="_model('bz_zywz')" style="cursor:pointer;margin-top: -35px;visibility:hidden"></div><div id="bz_zywz_switch"></div><br/>
				<div id="bz_zywz"></div>
			</div>
		</div>
		<div class="horizontalRow" style="width: 435px;height: 355px;margin-top: 40px;position: relative;">
			 <div onmouseover="Roll_img_onmouseover('qw_aqxi');" onmouseout ="Roll_img_mouseout('qw_aqxi')" style="font-size: 20px;float: right; color: #fff;cursor:pointer;z-index: 10;position: absolute;left: 320px;">
					<div style="visibility: hidden;" id="qw_aqxi_Roll_img_div"><span>安</span><img id="qw_aqxi_Roll_img"  src="${ctx}/static/images/overview/k_2.png" style="margin: 0 7px;cursor:pointer;" data-bool="false"><span>物</span></div>
			</div> 
			<div class="horizontalRow" style="line-height: 68px;">
				<div style="width: 48px; height: 48px; background-size: 100% 100%; margin-top: -20px;">
					<img id="qw_aqxi_img" src="${ctx}/static/images/overview/wlw.png">
				</div>
				<div class="fontContentTitle" style="margin-left: 20px; margin-top: -20px;" id="qw_aqxi_div">物联网业务</div>
				<div id="aqxi" style="margin-top: 58px;position: absolute;" >
					
				</div>
			</div>
		</div>
		<div class="horizontalRow"
			style="width: 1460px; height: 355px; margin-top: 40px; margin-left: 24px;position:relative;">
			<div class="horizontalRow" style="line-height: 68px;">
				<div style="width: 48px; height: 48px; background-size: 100% 100%; margin-top: -20px;">
					<img src="${ctx}/static/images/overview/CMNet.png">
				</div>
				<div class="fontContentTitle" style="margin-left: 20px; margin-top: -20px;">三方/骨干出口</div>
				<div style="margin-top: -20px;padding-right: 30px;float: right;cursor:pointer;" id="cmnet_img" > <img src="${ctx}/static/images/overview/fd.png"></div>
				<div style="z-index: 10; position: absolute;left: 750px;position: relative;top:50px;z-index:10;"><div><span style="display:inline-block;margin-right:5px;border-radius:15px;width:40px;height:15px;background-color:#72d427;"></span><span>上行</span><span style="display:inline-block;margin-right:5px;border-radius:15px;width:40px;height:15px;background-color:#3399ff;margin-left: 30px;"></span><span>下行</span></div></div>
				<div style="height:300px;width:1460px;position:relative;background-color: rgba(0, 102, 255, 0.15);top:-10px">
					<img src="${ctx}/static/images/overview/CMNET_s.png"style="height:295px;width:1460px;z-index:10;position: absolute;">
					<img src="${ctx}/static/images/overview/CMNET_s_2.gif" style="height:295px;width:1460px;z-index:10;position: absolute;">
				</div>
				<div id="cmnet_div"></div>
			</div>
		</div>
	</div> 
	<!-- 弹出  CMNet -->
	<div class="modal fade" id="CMNet_Modal" style="position:absolute;">
		<div class="modal-dialog"
			style="width: 1600px; height: 900px; margin: 20px auto;position: relative;">
			<div class="modal-content" style="background-color: rgba(0, 0, 0,0) !important;">
				<div style="height:900px;width:1530px;margin-top:150px">
				<img src="${ctx}/static/images/overview/CMNET_background.png">
				<img src="${ctx}/static/images/overview/CMNET-S-S.png" style="top:200px;margin-left:40px;z-index:10;position: absolute;left:0px">
 				<img src="${ctx}/static/images/overview/CMNET-S-S-2.gif" style="top:200px;margin-left:40px;z-index:10;position: absolute;left:0px">
				<img src="${ctx}/static/images/overview/return.png" style="top: 200px;left: 1430px;cursor:pointer;z-index:10;position: absolute;" id="CMNet_Modal_remove"></div>
				<div style="z-index: 10; position: absolute;right: 500px;top: 220px;"><div><span style="display:inline-block;margin-right:5px;border-radius:15px;width:40px;height:15px;background-color:#72d427;"></span><span>上行</span><span style="display:inline-block;margin-right:5px;border-radius:15px;width:40px;height:15px;background-color:#3399ff;margin-left: 30px;"></span><span>下行</span></div></div>
				<div id="CMNet_Modal_index"></div>
			</div>
		</div>
	</div>
	<!-- 弹出 -->
	<div class="modal fade" id="Trend_Modal" style="background-color: rgba(0,0,0,0.85);position:absolute;" >
		<div class="modal-dialog" style="width: 1600px; height:900px;margin: 20px auto;">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" style="font-size:40px;text-align: center;"><span id="bz_ecarts_Modal_span" style="font-size: 40px;margin-right: 20px;"></span><span id="bz_ecarts_Modal_span_val" style="font-size: 26px;"></span></h4>
				</div>
				<div class="modal-body" id="modal-body">
					<div  style="height: 900px; width: 1530px;margin:20px;border: solid 1px #2431ac;background-color: rgba(0,4,66,0.75);border-radius: 15px;" >
						<div id="bz_ecarts_Modal" style="width: 1500px;height: 860px;margin-top:20px"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="index_modal" style="position:absolute;"></div>
	<div class="modal fade" id="alarm" style="position:absolute;"></div>
</body>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/echarts.min.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/i18n/grid.locale-cn.js"></script>
<script type="text/javascript" src="${jslib}/jquery-1.7.2/external/jqgrid/js/jquery.jqGrid.min.js"></script>

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
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/commonComp.js"></script>

<!-- 自己 -->

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/overviewleftyd.js"></script>

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />

<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/ecarts.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popover.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/Popoverposition.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/configuration.js"></script>

<script type="text/javascript">
	window.onload = function() {
		overviewleftyd.init();
	}
</script>

<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var screen=null;
$(function(){
	if(isScreenMode=="true"){
		
	}else{
		new CIIENEW.NavigatorSingle('保障概览-场景概览');
		$('.screentitle_s').css('display','block');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		zoomPage(2000,1300);
		setInterval(refreshTime,1000);
	}
	//screen=new CIIENEW.Screen(CIIE.SCREEN_HOT);
});
/* function updateHotspot(hotspot){
	if(screen!=null){
		screen.hotspot=hotspot;
		screen.update();
	}
} */

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