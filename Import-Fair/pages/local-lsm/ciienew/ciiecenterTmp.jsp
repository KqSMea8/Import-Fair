<!DOCTYPE html>
<%
String isScreenMode = request.getParameter("isScreenMode");
String fromModel = request.getParameter("fromModel");
String hotspot = request.getParameter("hotspot")==null?"":new String(request.getParameter("hotspot").getBytes("ISO8859-1"), "utf-8");

%>
<html lang="zh-CN" style="width:100%;height:100%;">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<%@ include file="/common/bootstrap.jsp"%> 
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />

<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.draw.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.contextmenu.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.markercluster.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet-search.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/Icon.Label.css" />
<link rel="stylesheet" href="${jslib}/leaflet/css/leaflet.groupedlayercontrol.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/mapnew.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/WdatePicker.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<title>中国国际进口博览会通信保障</title>
</head>
<body  style="width:2400px;height:1200px;">
<div class="screentitle_s" style="display:none;width:100%;height:100px;position:relative;">
	<div class="logociie_s" style="width:928px;margin-left:-464px;"></div>
	<div style="clear:both;"></div>
	<div class="titleTime_s" style="position:relative;">
		<div id="screenTitleTime"  style="text-indent:0px;width: 100%;padding-right:350px;"></div>
		<div style="text-indent:0px;width: 100%;padding-left: 350px;position:absolute;top:0px"><img id="weather_img" style="margin-right:20px;margin-top: -0.5%;height:34px"><span id="weather_text" style="margin-right:20px"></span><span id="temperature" style="margin-right:20px"></span></div>
	</div>
	<!-- <div id="screenTitleTime" class="titleTime_s" style="text-indent:0px;"></div>
	<div class="titleTime_s" style="text-indent:0px;left:310px"><img id="weather_img" style="margin-right:20px;height:34px"><span id="weather_text" style="margin-right:20px"></span><span id="temperature" style="margin-right:20px"></span></div> -->
</div>
	<div id="bgDiv" class="bgC" style="width:2400px;height:1200px;padding:40px 0 40px 0;position:relative;">
		<div class="map" id="map" style="width:100%;height:100%;">
    	
    	</div>
    	<iframe frameborder="0" allowtransparency="true"  id="modelFrame" style="width:2400px;height:1200px;display:none;position:absolute;top:0px;left:0px;" src="">
    	
    	</iframe>
    	<div class="modelframereturn" id="modelframereturn" style="position:absolute;top:40px;right:40px;display:none;">
    	
    	</div>
	</div>
	<div id="cellDetail3D" style="width:2400px;height:1200px;padding:0 0 0 0;position:absolute;display:none;top:0px;left:0px;">
		<img src="cellDetailbg.png"  style="position:absolute;left:0;top:0;"></img>
		<iframe id="cellDetail" allowtransparency="true" width="1001px"  frameborder="no" height="840px" src="" style="position:absolute;left:700px;top:180px;"></iframe>
		<div onclick="return3D();" id="cellDetail_close" class="map-icon-close" style="position:absolute;right:700px;top:190px;"></div>
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
			</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>
</body>
<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMask.js"></script>
<script src="${jslib}/leaflet/leaflet.js"></script>
<script src="${jslib}/leaflet/heatmap.js"></script>
<script src="${jslib}/leaflet/leaflet-heatmap.js"></script>
<script src="${jslib}/leaflet/leaflet.draw.js"></script>
<script src="${jslib}/leaflet/leaflet.contextmenu.js"></script>
<script src="${jslib}/leaflet/leaflet.markercluster-src.js"></script>
<script src="${jslib}/leaflet/leaflet-search.js"></script>
<script src="${jslib}/leaflet/Icon.Label.js"></script>
<script src="${jslib}/leaflet/leaflet.groupedlayercontrol.js"></script>
<script src="${jslib}/leaflet/leaflet.baidu.min.js"></script>
<script src="${jslib}/leaflet/Semicircle.js"></script>


<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciie_config.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/mapTmp.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/mapInfoWin.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigatorSingle.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/setMovable.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/spline/matching.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/overviews.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<style type="">
    .leaflet-popup-content-wrapper, .leaflet-popup-tip {
        /*background-color: rgba(226, 226, 233, 0.75);*/
        background-color: rgba(255, 255, 255, 0);
        box-shadow: 0 3px 14px rgba(0,0,0,0);
    }
    .leaflet-popup-content {
        margin: 0px;
    }
    /*.changePositon{
        bottom:-510px !important;
        left:52px !important;
    }*/
}
</style>
<script>
var MAP=null;
var BASEPATH="${ctx}";
var isScreenMode="<%=isScreenMode%>";
var FROMMODEL="<%=fromModel%>";
var hotspot="<%=hotspot%>";
var liveVideoUrl = BASEPATH.replace('LsmScreen','') + 'test/rtmp.html?rel=0&amp;autoplay=1';
//var liveVideoUrl = 'http://10.222.42.22:8080/test/rtmp.html?rel=0&amp;autoplay=1';
//var liveVideoUrl = 'http://10.222.42.22:8080/test/rtmp2.html';
$(function(){
	if(isScreenMode=="true"){
		MAP=new CIIE.Map('map',CIIE.MAP_HOT,'topleft',BASEPATH,true);
	}else{
		new CIIENEW.NavigatorSingle('场馆保障-场馆GIS');
		$('.ciienavibubble').css('bottom',-100);
		$('.ciienavibg').css('bottom',-100);
		$('.screentitle_s').css('display','block');
		zoomPage(2400,1300);
		$('#cellDetail3D').height(1300);
		setInterval(refreshTime,1000);
		if(hotspot==""){
			hotspot=CIIE.MAP_HOT;
		}
		MAP=new CIIE.Map('map',hotspot,'topleft',BASEPATH,true);
	}
	
});

function updateHotspot(hotspot){
	if(MAP!=null){
		MAP.updateHotspot(hotspot);
	}
}

function setView(lat,lon){
	if(MAP!=null){
		MAP.setViewConvert(lat,lon);
	}
}
function locateCell(lacci,cellName,lat,lon,bool,Belonged){
	if(MAP!=null){
		MAP.locateCellFirstAddCell(lacci,cellName,lat,lon,true,Belonged);
	}
}

function callRightScreenInfoSmall(name,lacci,type){
    closeRightScreenInfo();
    var customDiv = $('<div></div>');
    var docHeight = $(document).height(),
        docWidth = $(document).width();
    customDiv.attr('id','rightScreenInfo');
    customDiv.css({
        position: 'absolute', left: docWidth/6, top: docHeight/3, border: 'none'
    });
    var startPos = lacci.indexOf(':');
    var lac = lacci.substring(0,startPos),
        ci = lacci.substring(startPos+1);   
    
    
    var pareUrl = '<iframe width="1100px" frameborder=no height="620px" src='+BASEPATH+ "/pages/local-lsm/cellKpis.jsp?cellname=" + encodeURIComponent(name) + "&celltype=" + encodeURIComponent(type) + '&lac=' + lac + '&ci=' + ci + '></iframe>';
    customDiv.html(pareUrl);
    customDiv.appendTo('body');
}
//关闭左屏页面
function closeRightScreenInfo(){
    var checkDiv = document.getElementById('rightScreenInfo');
    if(checkDiv != null){
        checkDiv.parentNode.removeChild(checkDiv);
    }
}

function returnGis(){
	$('#modelFrame').css('display','none');
	$('#modelframereturn').attr('display','none');
	//$('#modelFrame').attr('src','');
}

function show3DCellDetail(name,type,lacci){
	var urlNew='../maptip/deviceDetailNew.jsp'
			+'?cellname='+encodeURIComponent(name)
			+'&nettype='+encodeURIComponent(type)
			+'&lacci='+encodeURIComponent(lacci);
	//$('#modelFrame').css('display','none');
	//$('#cellDetail3D').css('display','block');
	document.getElementById('cellDetail3D').style.display='block';
	document.getElementById('modelFrame').style.display='none';
	$('#cellDetail').attr('src',urlNew);
	 
}
function return3D(){
	//$('#cellDetail3D').css('display','none');
	//$('#modelFrame').css('display','block');
	
	document.getElementById('cellDetail3D').style.display='none';
	document.getElementById('modelFrame').style.display='block';
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

//更改 poppup 关闭样式
function changeCloseBtnOfPopup(){
    $(".leaflet-popup-close-button").html('');
    $(".leaflet-popup-close-button").addClass('map-icon-close-important');

}

function addCloseEvent(){
    $(".map-icon-close-important").on('click',function(event) {
        event.preventDefault();
        $('div[func = "备品备件"]').removeClass('mapCtrlItemSelected');
    });
}


function getSmoothParam(){
    return LSMScreen.CacheDataManager.doSmooth;
}

	


overviews.init();
var overviews1="";
window.clearInterval(overviews1);
overviews1=setInterval(function() {
	overviews.init();
},300*1000);
</script>
</html>