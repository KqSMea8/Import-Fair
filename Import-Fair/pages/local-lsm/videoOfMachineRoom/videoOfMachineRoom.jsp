<!DOCTYPE html>
<%
String isScreenMode = request.getParameter("isScreenMode");
String roomName = request.getParameter("roomName");
String videoWidth = request.getParameter("videoWidth");
String videoHeight = request.getParameter("videoHeight");
%>
<html lang="zh-CN" style="width:100%;height:100%;">
<head>

<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<link href="${ctx}/pages/local-lsm/video/video-js.css" rel="stylesheet">
<script src="${ctx}/pages/local-lsm/video/video.js" type="text/javascript"></script>
<script src="${ctx}/pages/local-lsm/video/videojs-flash.min.js" type="text/javascript"></script>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>


<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />

<title>上海国际进口博览会</title>
<style type="text/css">
    body{
    	background-color: #000;
    } 
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	}
</style>
</head>
<body> 
<div style="width:100%;height:100%;overflow: hidden">
	<div id="videoDiv" class="screencol">
		<!--<video autoplay="autoplay" loop="loop" width="410" height="250" class="videobox" src="video1.mp4"></video>
		<video autoplay="autoplay" loop="loop" width="410" height="250" class="videobox" src="video2.mp4"></video>
		<video autoplay="autoplay" loop="loop" width="410" height="250" class="videobox" src="video3.mp4"></video>
		<video autoplay="autoplay" loop="loop" width="410" height="250" class="videobox" src="video4.mp4"></video>-->

		<video id="video4" class="video-js videobox vjs-big-play-centered" preload="auto" loop="loop" width="410" height="250" data-setup="{}" controls>
			<!-- <source src="video4.mp4" type='video/mp4'> -->
			<source src="rtmp://10.222.42.7/hls/videos03" type='rtmp/flv'>
		</video>
	</div>
	<div id="tishiDiv" style="width:100%;height:100%;display: none;">
		<center>
			<span style="font-size: 30px">暂无视频，右键添加！</span>
		</center>
	</div>
</div>

</body>

<!-- jquery loadmask -->
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/spinner/jquery.ux.loadMaskcss.js"></script>

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/consts.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/utils.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/screenDataManager.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/ciie_config.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/dragger.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciienew/ciieright.js"></script>
<script type="text/javascript" src="${ctx}/scripts/local-lsm/ciie/bodysizecssctrl.js"></script>
<script>
var BASEPATH="${ctx}";
var JSLIB="${jslib}";
var isScreenMode="<%=isScreenMode%>";
var roomName="<%=roomName%>";
var videoWidth="<%=videoWidth%>";
var videoHeight="<%=videoHeight%>";


var roomNameList = {
	A0MK:'rtmp://10.222.42.7/hls/viedos11',
	A0NC:'rtmp://10.222.42.7/hls/viedos10',
	B0MK:'rtmp://10.222.42.7/hls/viedos12',
	B0NC:'rtmp://10.222.42.7/hls/viedos04',
	C0MK:'rtmp://10.222.42.7/hls/viedos05',
	C0NC:'rtmp://10.222.42.7/hls/viedos06',
	D0MK:'rtmp://10.222.42.7/hls/viedos07',
	E1MK:'rtmp://10.222.42.7/hls/viedos08',
	E1NC:'rtmp://10.222.42.7/hls/viedos09',
}

$(function(){
	//调整video源
	if (roomName != null) {
		if (roomName == "N0") {
			$("#videoDiv").hide();
			$("#tishiDiv").show();
			$("#tishiDiv").css('paddingTop', videoHeight/2 - 10);
		}else{
			var src = roomNameList[roomName];
			if (src == undefined) {
				$("#video4").find('source').attr({
					src: 'video4.mp4',
					type: 'video/mp4s'
				});
			}else{
				$("#video4").find('source').attr('src', src);
			}
		}
	}else{
		$("#video4").find('source').attr({
				'src': 'video4.mp4',
				'type': 'video/mp4s'
		});
	}

	//调整video 宽高
	$("#video4").attr({
		width: (videoWidth-40),
		height: (videoHeight-20)
	});


	if(isScreenMode=="true"){
	}else{
	}
	//zoomPage(1550,1200);
var options = {autoplay: true,flash:{swf:'video-js.swf'}};





var player4 = videojs('video4', options, function onPlayerReady() {
		console.log('Your player is ready!');
		player4.play();
		player4.on('ended', function() {
			//changeSource(player3,"rtmp://10.222.42.7/hls/videos03","rtmp/flv")
			player4.play();
		});
		player4.on('error', function(e) {
			changeSource(player4,"video4.mp4","video/mp4")
			console.log(e);
		});
	});
});
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

   
function changeSource(player, url, type) {
	player.src({
		type : type,
		src : url
	});
	player.play();
}
</script>
</html>