<!DOCTYPE html>
<html lang="zh-CN">
<head>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 

<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciie/ciie_jqgrid.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/map.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/groupscreen/gs.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/navi.css" />
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/navigator.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/spline/matching.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/cacheDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/utils/util.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/overview/overviews.js"></script>
<title>中国国际进口博览会通信保障</title>
<style type="text/css">
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	}
	
	html{
		width:100%;
		height:100%;
		/*overflow:auto;*/
	}
	body{
		width:3500px;
		height:1000px;
		/*overflow:hidden;*/
	}
	.hotItem{
		padding-left:10px;
		padding-right:10px; 
	}
	.hotItem:hover{
		background:rgba(118,104,255,0.35);
	}
</style>
</head>
<body> 
<div style="width:100%;height:100%;">
<iframe id="leftIFrame" src="ciienew_g_left.jsp?isScreenMode=true" frameborder="0" style="float:left;width:1000px;height:1050px;"></iframe>
<iframe id="mapIFrame" src="ciienew_g_center.jsp?isScreenMode=true&forceZoom=true" frameborder="0" style="float:left;width:1500px;height:1050px;"></iframe>
<iframe id="rightIFrame" src="ciienew_g_right.jsp?isScreenMode=true" frameborder="0" style="float:left;width:1000px;height:1050px;"></iframe>
	<div class="screentitle" style="width:3500px;">
		<div class="titleAndLogo" style="left:1125px;">
			<div class="logociie"></div>
		</div>
		<div style="clear:both;"></div>
		<div class="titleTime" style="position:relative;top:110px;">
			<div id="screenTitleTime_g"  style="text-indent:0px;width: 100%;"></div>
			<div style="width: 100%;position:absolute;top:0px;"><img id="weather_img" style="margin-right:20px"><span id="weather_text" style="margin-right:20px"></span><span id="temperature" style="margin-right:20px"></span></div>
		</div>
		
	</div>
	<div id="_schedule" style="visibility:hidden;font-size: 30px;width:100px;height:0px"></div>
	<div id="_schedule_s" style="visibility:hidden; font-size: 20px;width:100px;height:0px"></div>
	<div id="cnavi" class="GS-cnavi-short" onclick="hotChooser();" style="position:absolute;top:0px;left:1050px;cursor:pointer;"></div>
</div>
<div class="modal fade" id="hotChooserWin">
	<div class="modal-dialog" style="width:2400px; height: 800px; margin: 20px auto;margin-top: 100px;margin-left:550px;">
		<div class="modal-content">
			<div class="modal-header" style="font-size:40px;border-bottom:none;text-align:center;">
				<span id="hotChooserTitle">选择区域</span>
				<div onclick="hideHotChooser();" class="map-icon-close" style="position:absolute;right:10px;top:10px;"></div>
			</div>
			<div id="hots" class="content" style="height:780px;font-size:22px;padding-left:220px;">
				
			</div>
			
		</div>
	</div>
</div>

</body>

<script>
var BASEPATH="${ctx}";
new CIIENEW.Navigator('集团返迁=场景保障');
var hotLoaded=false;
function hotChooser(){
	if($('#cnavi').hasClass('GS-cnavi-short')){
		$('#cnavi').removeClass('GS-cnavi-short');
		$('#cnavi').addClass('GS-cnavi-long');
		$('#hotChooserWin').modal();
		if(hotLoaded==false){
			hotLoaded=true;
			$('#hotChooserWin').on('hidden.bs.modal', function () {
				$('#cnavi').removeClass('GS-cnavi-long');
				$('#cnavi').addClass('GS-cnavi-short');
			});
			loadHots();
		}
	}else if($('#cnavi').hasClass('GS-cnavi-long')){
		$('#cnavi').removeClass('GS-cnavi-long');
		$('#cnavi').addClass('GS-cnavi-short');
	}
	
}
function hotItemClick(e){
	$('#hotChooserWin').modal('hide');
	var id=$(e.currentTarget).attr('hotId');
	var name=$(e.currentTarget).text();
	$('#hotChooserTitle').text('选择区域-'+name);
	updateAllHotspot(id);
}
function hideHotChooser(){
	$('#hotChooserWin').modal('hide');
}
function loadHots(){
	var cdm=LSMScreen.CacheDataManager.getInstance();
	cdm.getHotspotTree({},function(result){
		var baseList=result.children;
		var i=0;
		var hotspots=['J-国家会展中心','J-重要场所','J-酒店','J-交通枢纽'];
		var hotMap={};
		for(i=0;i<baseList.length;i++){
			var record=baseList[i];
			hotMap[record.id]=record.children;
		}
		var html='';
		for(i=0;i<hotspots.length;i++){
			var mainhotid=hotspots[i];
			var mainhotname=mainhotid.replace('J-','');
			var list=hotMap[mainhotid];
			var div='<div style="float:left;margin-left:80px;width:400px;">'
						+'<div>'
							+'<div class="GS-cnavi-icon" style="float:left;margin-top:8px;"></div>'
							+'<div class="hotItem" hotId="'+mainhotid+'" style="cursor:pointer;float:left;margin-left:10px;">'+mainhotname+'</div>'
							+'<div style="clear:both;"></div>'
						+'</div>'
						+'<div class="GS-cnavi-splitline" style="width:400px;"></div>'
						+'<div style="height:700px;overflow:auto;">';
						for(var j=0;j<list.length;j++){
							var subhot=list[j];
							var id=subhot.id;
							var name=id.replace('J-','');
							div+='<div class="hotItem" hotId="'+id+'" style="cursor:pointer;">'+name+'</div>';
						}
						div+='</div>';
					div+='</div>';
			html+=div;
		}
		
		$('#hots').html(html);
		$('.hotItem').on('click',hotItemClick);
		
	});
	
	
}


function updateLeftHotspot(hotspot){
	var iframe0=$("#leftIFrame")[0];
	var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
	iframeWindow0.updateHotspot(hotspot);
	
	var iframe=$("#rightIFrame")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.updateHotspot(hotspot);
}

function updateHotspot(hotspot){
	var iframe0=$("#mapIFrame")[0];
	var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
	iframeWindow0.updateHotspot(hotspot);
	
	var iframe=$("#rightIFrame")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.updateHotspot(hotspot);
}
function updateAllHotspot(hotspot){
	var iframe0=$("#leftIFrame")[0];
	var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
	iframeWindow0.updateHotspot(hotspot);
	
	var iframe0=$("#mapIFrame")[0];
	var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
	iframeWindow0.updateHotspot(hotspot);
	
	var iframe=$("#rightIFrame")[0];
	var iframeWindow=iframe.window?iframe.window:iframe.contentWindow;
	iframeWindow.updateHotspot(hotspot);
}
function setView(lat,lon){
	var iframe0=$("#mapIFrame")[0];
	var iframeWindow0=iframe0.window?iframe0.window:iframe0.contentWindow;
	iframeWindow0.setView(lat,lon);
}

setInterval(refreshTime,1000);
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
	$("#screenTitleTime_g").text(showTime);
};
overviews.init();
var overviews10="";
var overviews10_="";
window.clearInterval(overviews10);
window.clearInterval(overviews10_);
overviews10=setInterval(function() {
	overviews.init();
},300*1000);
overviews10_=setInterval(function() {
	overviews.Schedule();
},60*60*1000); 
</script>
</html>