<!DOCTYPE html>
<%
String isScreenMode = request.getParameter("isScreenMode");
%>
<html lang="zh-CN" style="width: 100%; height: 100%;">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/roam/roam.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/groupscreen/gs.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />

<link rel="stylesheet"href="${ctx}/scripts/local-lsm/overview/ft-carousel.css" />
<title>上海国际进口博览会</title>
<style type="text/css">
.leaflet-left {
	left: 30px;
}

.leaflet-top {
	top: 30px;
}

.ciiekpivalue {
	font-size: 54px;
}

#roamSelectors {
	margin-left: 20px;
}

.ciiekpiratio>div {
	margin-right: 0px;
}

.size {
	font-size: 24px;
	margin-top:7px;
}
.roamRow>div:nth-child(n+2){
margin-left: 0px;
}
</style>
</head>

<body style="width: 1500px; height: 1050px;">
	<div class="roamBgC">
		<div id="worldDiv" style="width: 100%; height: 100%; margin: auto;padding-top:250px;">
			<div id="map" style="width: 100%; height: 100%; margin: auto;cursor: pointer;" >
			</div>
		</div>
		<div id="chinaDiv" style="width: 100%; height: 100%; margin: auto;display:none;">
			<div id="map2" style="width: 100%; height: 100%; margin: auto;cursor: pointer;" >
			</div>
		</div>
		
		
		<div id="roamCtrl" style="width:278px;height:auto;overflow:hidden;position:absolute;left:5px;top:180px;position: absolute;">
			<img id='optical_img'  data-bool='false'>
			<img id='optical3_img'  data-bool='false' style="position: absolute;top: 2px;left:0px;cursor: pointer;">
			<img id='optical1_img'  data-bool='false' style="position: absolute;top: 2px;left: 3px;cursor: pointer;">
			<img id='optical2_img'  data-bool='false' style="position: absolute;top: 2px;left:115px;cursor: pointer;display:none">
			
			<div id="optical1_img_span" style="position: absolute;top:5px;left: 35px;font-size: 30px;cursor: pointer;"  onclick='screen.BoolClick(this)' data-name="国际">国际</div>
			<div id="optical2_img_span" style="position: absolute;top:5px;left: 165px;font-size: 30px;cursor: pointer;" onclick='screen.BoolClick(this)' data-name="省际">省际</div>
			<div id="optical"></div>
		</div>
		<div id="legend" style="display:none;position:absolute;right:10px;bottom:10px;" >
			<div id="legendTips" class="" style="width:auto;font-size:24px;float:left;height:250px;position:relative;text-align:right;">
				<div style="margin-top:-10px;"></div>
				<div style="margin-top:12px;"></div>
				<div style="margin-top:12px;"></div>
				<div style="margin-top:12px;"></div>
				<div style="margin-top:12px;"></div>
				<div style="margin-top:12px;"></div>
			</div>
			<div class="legendColorBar" style="float:left;"></div>
		</div>
		<div id="roamList"  style="width:272px;position:absolute;overflow:hidden;right:5px;bottom:5px;height:auto;" >
			<div id="roamListBg" class="GS-roamList" style="position:absolute;top:0;left:0;height:100%;">
			</div>
			<div style="width:100%;height:62px;position:relative;">
				<div class="GS-roamList-title" style="padding:5px 0 0 35px;position:absolute;left:0;top:0;">
					<div class="GS-roamList-icon" style="float:left;margin-top:8px;"></div>
					<div id="roamListTitle" class="fontSubInfo" style="float:left;margin-left:5px;">漫入国家</div>
				</div>
				<div id="roamListCtrl" class="GS-arrow-up" style="position:absolute;right:0;bottom:0;cursor:pointer;"></div>
			</div>
			<div id="roamListContent" style="width:100%;height:auto;overflow:hidden;position:relative;padding:10px 10px 40px 10px;">
			</div>
		</div>
	</div>
</body>

<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/chartmap/echarts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/chartmap/hashmap.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/chartmap/coord.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/chartmap/coordChina.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/chartmap/map.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/gradientArr.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/ft-carousel.min.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/roam_g/roam_g_center.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/pmars.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/configuration.js"></script>


<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var screen=null;
$('#optical_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/gj.png');
$('#optical1_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/gj1.png');
$('#optical2_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/sj1.png');
$('#optical3_img').attr('src',eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/moren.png');
$('#optical1_img_span').text("国际");
$('#optical2_img_span').text("省际");
var Html="";
var position_gj={1:{"top":60,"left":15,"img":"sh","name":"上海","text":"上海"},2:{"top":120,"left":15,"img":"ba","name":"保障区域","text":"进口博览会"},3:{"top":180,"left":15,"img":"hz","name":"国家会展中心","text":"J-国家会展中心"},4:{"top":240,"left":15,"img":"fj","name":"浦东机场","text":"J-浦东机场"},5:{"top":300,"left":15,"img":"fj","name":"虹桥机场","text":"J-虹桥机场"}};
for(var c=1;c<6;c++){
	if(c==1){
		Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer; color:#00fcff; top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-name="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-optical="'+c+'" onclick="screen.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_bluce.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';
	}else{
		Html+='<div id="optical_'+c+'" style="height: 50px;position: absolute;cursor:pointer;top:'+position_gj[c].top+'px;left:'+position_gj[c].left+'px" data-img="'+position_gj[c].img+'" data-name="'+position_gj[c].img+'" data-text="'+position_gj[c].text+'" data-optical="'+c+'" onclick="screen.click(this)"><img id="optical_'+c+'_img" src='+eastcom.baseURL+'/static/styles/local-lsm/roam/images/Roam/'+position_gj[c].img+'_white.png style="width: 30px;position: relative;top:10px"><div style="font-size:30px;padding-left:30px;top: -25px;position: relative;" id="optical_'+c+'_div">'+position_gj[c].name+'</div></div>';	
	}
}
document.getElementById("optical").innerHTML = Html;
$(function(){
	if(isScreenMode=="true"){
		
	}else{
		new CIIENEW.NavigatorSingle('集团漫游-漫游GIS');
		$('.screentitle_s').css('display','block');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		zoomPage(1500,1000);
		setInterval(refreshTime,1000);
		
	}
	screen=new CIIENEW.GroupScreenRoam("上海");
	//screen=new CIIENEW.Roam();
});
function updateHotspot(hotspot,bool,roamType){
	if(screen!=null){
		screen.hotspot=hotspot;
		screen.IntOrPro=bool;
		screen.roamType=roamType;
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