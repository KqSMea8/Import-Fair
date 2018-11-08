<!DOCTYPE html>
<%
String isScreenMode = request.getParameter("isScreenMode");
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

<script type="text/javascript" src="${ctx}/scripts/local-lsm/common/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="${ctx}/static/jslib/My97DatePicker/skin/My97DatePicker/WdatePicker.css" />
<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />


<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />

<title>上海国际进口博览会</title>
<style type="text/css">
	.leaflet-left {
	    left:30px;
	}
	.leaflet-top {
	    top:30px;
	}
</style>
</head>
<body style="width:450px;height:1200px;"> 
<div class="bgV" style="width:450px;height:1200px;padding-left:0;">
	<div class="screencol" style="width:410px;">
		<!--<video autoplay="autoplay" loop="loop" width="410" height="250" class="videobox" src="video1.mp4"></video>
		<video autoplay="autoplay" loop="loop" width="410" height="250" class="videobox" src="video2.mp4"></video>
		<video autoplay="autoplay" loop="loop" width="410" height="250" class="videobox" src="video3.mp4"></video>
		<video autoplay="autoplay" loop="loop" width="410" height="250" class="videobox" src="video4.mp4"></video>-->
		<video id="video1" class="video-js videobox vjs-big-play-centered" preload="auto" loop="loop" width="410" height="250" data-setup="{}" controls>
			<source src="rtmp://10.222.42.7/hls/video01" type='rtmp/flv'>
			<p class="vjs-no-js">
			  To view this video please enable JavaScript, and consider upgrading to a web browser that
			  <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
			</p>
		</video>
		<video id="video2" class="video-js videobox vjs-big-play-centered" preload="auto" loop="loop" width="410" height="250" data-setup="{}" controls>
			<source src="rtmp://10.222.42.7/hls/videos02" type='rtmp/flv'>
		</video>
		<video id="video3" class="video-js videobox vjs-big-play-centered" preload="auto" loop="loop" width="410" height="250" data-setup="{}" controls>
			<source src="rtmp://10.222.42.7/hls/videos03" type='rtmp/flv'>
		</video>

		<video id="video4" class="video-js videobox vjs-big-play-centered" preload="auto" loop="loop" width="410" height="250" data-setup="{}" controls>
			<source src="rtmp://10.222.42.7/hls/videos20" type='rtmp/flv'>
		</video>

		<!-- <video id="video4" muted="muted" class="video-js videobox vjs-big-play-centered" preload="auto" loop="loop" width="410" height="250" data-setup="{}" controls>
			<source src="video4.mp4" type='video/mp4'>
		</video> -->
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
$(function(){
	if(isScreenMode=="true"){
	}else{
	}
	//zoomPage(1550,1200);
	var options = {autoplay: true,flash:{swf:'video-js.swf'}};
var player1 = videojs('video1', options, function onPlayerReady() {
		console.log('Your player is ready!');
		player1.play();
		player1.on('ended', function() {
			changeSource(player1,"rtmp://10.222.42.7/hls/video01","rtmp/flv")
		});
		player1.on('error', function(e) {
			changeSource(player1,"video1.mp4","video/mp4")
			console.log(e);
		});
	});
var player2 = videojs('video2', options, function onPlayerReady() {
		console.log('Your player is ready!');
		player2.play();
		player2.on('ended', function() {
			changeSource(player2,"rtmp://10.222.42.7/hls/videos02","rtmp/flv")
		});
		player2.on('error', function(e) {
			changeSource(player2,"video2.mp4","video/mp4")
			console.log(e);
		});
	});
var player3 = videojs('video3', options, function onPlayerReady() {
		console.log('Your player is ready!');
		player3.play();
		player3.on('ended', function() {
			changeSource(player3,"rtmp://10.222.42.7/hls/videos03","rtmp/flv")
		});
		player3.on('error', function(e) {
			changeSource(player3,"video3.mp4","video/mp4")
			console.log(e);
		});
	});
var player4 = videojs('video4', options, function onPlayerReady() {
		console.log('Your player is ready!');
		player4.play();
		player4.on('ended', function() {
			changeSource(player4,"rtmp://10.222.42.7/hls/videos20","rtmp/flv")
		});
		player4.on('error', function(e) {
			changeSource(player4,"video4.mp4","video/mp4")
			console.log(e);
		});
	});
// var player4 = videojs('video4', options, function onPlayerReady() {
// 		console.log('Your player is ready!');
// 		player4.play();
// 		player4.on('ended', function() {
// 			//player4.play();
// 			changeSource(player4,"video4.mp4","video/mp4")
// 		});
// 		player4.on('error', function(e) {
// 			changeSource(player4,"video4.mp4","video/mp4")
// 			console.log(e);
// 		});
// 	});





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