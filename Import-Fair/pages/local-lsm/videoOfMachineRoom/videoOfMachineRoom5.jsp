<!DOCTYPE html>
<%
String isScreenMode = request.getParameter("isScreenMode");
String singleDivHeight = request.getParameter("singleDivHeight");
%>
<html lang="zh-CN" style="width:100%;height:100%;">
<head>

<meta charset="UTF-8" http-equiv="X-UA-Compatible" content="IE=Edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<%@ include file="/common/lib.jsp"%>
<c:set var="hotspot" value="common" />
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<%@ include file="/common/bootstrap.jsp"%> 
<%@ include file="/common/echarts.jsp"%>
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/css/ui.jqgrid.css" />
<link rel="stylesheet" href="${jslib}/jquery-1.7.2/external/jqgrid/themes/redmond/jquery-ui-1.9.2.custom.min.css" />
<link rel="stylesheet" href="${ctx}/static/styles/local-lsm/ciienew/ciie.css" />

<title>上海国际进口博览会</title>
<style type="text/css">
	body{
		
		width: 100%;
		height: 100%;
		background-color: #000;

	    
	}
	.ewgwq{
		background-image: url(../../../static/styles/local-lsm/map/roomVideobackground.png);
		background-size: 100% 100% !important;
		width: 100%;
		height: 100%;
	    padding: 1% 2% 1% 2%;
	    background-color: transparent;

	}
	.jmfgdfhn{
		
		width: 100%;
		height: 100%;
	    /*padding: 1% 2% 1% 2%;*/
	    

	}
	.rightKeyMenue{
		display: none;
		position: absolute;
		left: 0;
		right: 0;
		width:320px;
		height:320px;
	    z-index: 9999;
	    background-color: #063678;
	    /*overflow: auto;*/
	}
	.rightKeyMenue div{
		width:50%;
		height: 20%;
		border: 2px solid #12059e;
	    text-align: center;
	    padding: 12px 0 0 0;
	    cursor: pointer;
        position: relative;
        float: left;
        font-size: 18px;
	}
	/*.rightKeyMenue div:hover{color:#6EFBFF;}*/


	.setIconY{
		background-image: url(../../../static/styles/local-lsm/map/setIconY.png);
		background-size: 100% 100%;
		width: 32px;
		height: 32px;
		cursor: pointer;
	}
	.setIconN{
		background-image: url(../../../static/styles/local-lsm/map/setIconN.png);
		background-size: 100% 100%;
		width: 32px;
		height: 32px;
		cursor: pointer;
	}
	.roomIconY{
		background-image: url(../../../static/styles/local-lsm/map/roomIconY.png);
		background-size: 100% 100%;
		width: 30px;
		height: 30px;
		cursor: pointer;
		display: inline-block;
		margin-right: 5px;
	}
	.roomIconN{
		background-image: url(../../../static/styles/local-lsm/map/roomIconN.png);
		background-size: 100% 100%;
		width: 30px;
		height: 30px;
		cursor: pointer;
		display: inline-block;
		margin-right: 5px;
	}
	.closeIcon{
		background-image: url(../../../static/styles/local-lsm/map/close.png);
		background-size: 100% 100%;
		width: 32px;
		height: 32px;
		cursor: pointer;
	}
	.setIcon001{
		background-image: url(../../../static/styles/local-lsm/map/setIcon001.png);
		background-size: 100% 100%;
		width: 32px;
		height: 32px;
		cursor: pointer;
	}
	
</style>
</head>
<body> 
<img style="position:absolute;width:100%;height:100%;pointer-events: none;display: none" src="http://10.222.42.22:8080/LsmScreen/static/styles/local-lsm/map/roomVideobackground.png" />
<div class="jmfgdfhn">
	


    <div class="rightKeyMenue" onmouseleave="hideRightKeyMenue()" >
	    <div id="oneMKMenue" onclick="chooseCurrRoom(this,'oneMK')" onmouseenter="enterSingleMenue(this)" onmouseleave="leaveSingleMenue(this)"><span class="roomIconN"></span><span style="display: inline-block;position: relative;top: -3px;font-size: 30px">A0门口</span></div>
	    <div id="oneNCMenue" onclick="chooseCurrRoom(this,'oneNC')" onmouseenter="enterSingleMenue(this)" onmouseleave="leaveSingleMenue(this)"><span class="roomIconN"></span><span style="display: inline-block;position: relative;top: -3px;font-size: 30px">A0内侧</span></div>
	    <div id="twoMKMenue" onclick="chooseCurrRoom(this,'twoMK')" onmouseenter="enterSingleMenue(this)" onmouseleave="leaveSingleMenue(this)"><span class="roomIconN"></span><span style="display: inline-block;position: relative;top: -3px;font-size: 30px">B0门口</span></div>
	    <div id="twoNCMenue" onclick="chooseCurrRoom(this,'twoNC')" onmouseenter="enterSingleMenue(this)" onmouseleave="leaveSingleMenue(this)"><span class="roomIconN"></span><span style="display: inline-block;position: relative;top: -3px;font-size: 30px">B0内侧</span></div>
	    <div id="threeMKMenue" onclick="chooseCurrRoom(this,'threeMK')" onmouseenter="enterSingleMenue(this)" onmouseleave="leaveSingleMenue(this)"><span class="roomIconN"></span><span style="display: inline-block;position: relative;top: -3px;font-size: 30px">C0门口</span></div>
	    <div id="threeNCMenue" onclick="chooseCurrRoom(this,'threeNC')" onmouseenter="enterSingleMenue(this)" onmouseleave="leaveSingleMenue(this)"><span class="roomIconN"></span><span style="display: inline-block;position: relative;top: -3px;font-size: 30px">C0内侧</span></div>
	    <div id="fourMKMenue" onclick="chooseCurrRoom(this,'fourMK')" onmouseenter="enterSingleMenue(this)" onmouseleave="leaveSingleMenue(this)"><span class="roomIconN"></span><span style="display: inline-block;position: relative;top: -3px;font-size: 30px">D0门口</span></div>
	    <div ><span class=""></span><span style="display: inline-block;position: relative;top: -3px;font-size: 30px"></span></div>
	    <div id="fiveMKMenue" onclick="chooseCurrRoom(this,'fiveMK')" onmouseenter="enterSingleMenue(this)" onmouseleave="leaveSingleMenue(this)"><span class="roomIconN"></span><span style="display: inline-block;position: relative;top: -3px;font-size: 30px">E1门口</span></div>
	    <div id="fiveNCMenue" onclick="chooseCurrRoom(this,'fiveNC')" onmouseenter="enterSingleMenue(this)" onmouseleave="leaveSingleMenue(this)"><span class="roomIconN"></span><span style="display: inline-block;position: relative;top: -3px;font-size: 30px">E1内侧</span></div>
    </div>
	<div style="width:100%;height:100%;">
	    <div style="width:100%;height:50px;display: none;">
	    	<div style="float:left;color: #FFF;margin: 11px 0px 0px 35px;width: 30px;height:30px" class="roomIconN" onclick=""></div>
	    	<div style="float:left;color: #FFF;margin: 7px 50px 0px 10px;font-size: 26px" onclick="">机房视频列表</div>
	    	<div style="float:right;color: #595959;cursor: pointer;margin: 14px 50px 0px 10px;display: none" class="closeIcon" title="关闭" onclick="" ></div>
	    	<div style="float:right;color: #595959;cursor: pointer;margin: 14px 20px 0px 0px;display: none" class="setIconN" title="设置" values="0" onclick="setOperatetDiv(this)"></div>
	    </div>

		<div id="oneIframeDiv" class="thrybtesbaer canToBig" oncontextmenu="div_oncontextmenu(this)" values="one" style="float:left;width:49.8%;border: 1px solid rebeccapurple;overflow: hidden;padding: 2px;height:300px;position: relative;">
			<div class="ytrgftegeeg" style="background:rgb(0,0,0,0);width:100%;height:100%;position:absolute;z-index: 99">
				<div id="oneSet" title="设置" values="one" class="setIcon001 tjnyrsyhetsrhe" style="position: absolute;top: 5px;right: 40px;width:15px;height:15px;cursor:pointer;" onclick="toSetVideo(this)"></div>
				<div id="oneToBig" title="放大" values="one" style="position: absolute;top: 5px;right: 10px;width:15px;height:15px;border:1px solid #fff;cursor:pointer;" onclick="toBigOfVideo(this)"></div>
				<div id="oneToSmall" title="缩小" values="one" style="position: absolute;top: 5px;right: 15px;width:15px;height:15px;color:#fff;cursor: pointer;cursor:pointer;display: none" onclick="toSmallOfVideo(this)">X</div>
			</div>
			<div style="width:100%;height:100%;z-index: 1;position: relative;">
				<div id="oneTitle" style="position: absolute;top: 5px;left: 5px"></div>
				<iframe id="oneIframe" src="" frameborder="0" style="float:left;width:100%;height:100%;"></iframe>
			</div>
		</div>

		<div id="twoIframeDiv" class="thrybtesbaer canToBig" oncontextmenu="div_oncontextmenu(this)" values="two" style="float:left;width:49.8%;border: 1px solid rebeccapurple;overflow: hidden;padding: 2px;height:300px;position: relative;">
			<div class="ytrgftegeeg" style="background:rgb(0,0,0,0);width:100%;height:100%;position:absolute;z-index: 99">
				<div id="twoSet" title="设置" values="two" class="setIcon001 tjnyrsyhetsrhe" style="position: absolute;top: 5px;right: 40px;width:15px;height:15px;cursor:pointer;" onclick="toSetVideo(this)"></div>
				<div id="twoToBig" title="放大" values="two" style="position: absolute;top: 5px;right: 10px;width:15px;height:15px;border:1px solid #fff;cursor: pointer;" onclick="toBigOfVideo(this)"></div>
				<div id="twoToSmall" title="缩小" values="two" style="position: absolute;top: 5px;right: 15px;width:15px;height:15px;color:#fff;cursor: pointer;display: none" onclick="toSmallOfVideo(this)">X</div>
			</div>
			<div style="width:100%;height:100%;z-index: 1;position: relative;">
				<div id="twoTitle" style="position: absolute;top: 5px;left: 5px"></div>
				<iframe id="twoIframe" src="" frameborder="0" style="float:left;width:100%;height:100%;"></iframe>
			</div>
		</div>

		<div id="threeIframeDiv" class="thrybtesbaer canToBig" oncontextmenu="div_oncontextmenu(this)" values="three" style="float:left;width:49.8%;border: 1px solid rebeccapurple;overflow: hidden;padding: 2px;height:300px;position: relative;">
			<div class="ytrgftegeeg" style="background:rgb(0,0,0,0);width:100%;height:100%;position:absolute;z-index: 99">
				<div id="threeSet" title="设置" values="three" class="setIcon001 tjnyrsyhetsrhe" style="position: absolute;top: 5px;right: 40px;width:15px;height:15px;cursor:pointer;" onclick="toSetVideo(this)"></div>
				<div id="threeToBig" title="放大" values="three" style="position: absolute;top: 5px;right: 10px;width:15px;height:15px;border:1px solid #fff;cursor: pointer;" onclick="toBigOfVideo(this)"></div>
				<div id="threeToSmall" title="缩小" values="three" style="position: absolute;top: 5px;right: 15px;width:15px;height:15px;color:#fff;cursor: pointer;display: none" onclick="toSmallOfVideo(this)">X</div>
			</div>
			<div style="width:100%;height:100%;z-index: 1;position: relative;">
				<div id="threeTitle" style="position: absolute;top: 5px;left: 5px"></div>
				<iframe id="threeIframe" src="" frameborder="0" style="float:left;width:100%;height:100%;"></iframe>
			</div>
		</div>

		<div id="fourIframeDiv" class="thrybtesbaer canToBig" oncontextmenu="div_oncontextmenu(this)" values="four" style="float:left;width:49.8%;border: 1px solid rebeccapurple;overflow: hidden;padding: 2px;height:300px;position: relative;">
			<div class="ytrgftegeeg" style="background:rgb(0,0,0,0);width:100%;height:100%;position:absolute;z-index: 99">
				<div id="fourSet" title="设置" values="four" class="setIcon001 tjnyrsyhetsrhe" style="position: absolute;top: 5px;right: 40px;width:15px;height:15px;cursor:pointer;" onclick="toSetVideo(this)"></div>
				<div id="fourToBig" title="放大" values="four" style="position: absolute;top: 5px;right: 10px;width:15px;height:15px;border:1px solid #fff;cursor: pointer;" onclick="toBigOfVideo(this)"></div>
				<div id="fourToSmall" title="缩小" values="four" style="position: absolute;top: 5px;right: 15px;width:15px;height:15px;color:#fff;cursor: pointer;display: none" onclick="toSmallOfVideo(this)">X</div>
			</div>
			<div style="width:100%;height:100%;z-index: 1;position: relative;">
				<div id="fourTitle" style="position: absolute;top: 5px;left: 5px"></div>
				<iframe id="fourIframe" src="" frameborder="0" style="float:left;width:100%;height:100%;"></iframe>
			</div>
		</div>


		<div id="fiveIframeDiv" class="thrybtesbaer" oncontextmenu="div_oncontextmenu(this)" values="five" style="display: none;float:left;width:49.8%;border: 1px solid rebeccapurple;overflow: hidden;padding: 2px;height:300px;position: relative;">
			<div class="ytrgftegeeg" style="background:rgb(0,0,0,0);width:100%;height:100%;position:absolute;z-index: 99">
				<div id="fiveSet" title="设置" values="one" class="setIcon001 tjnyrsyhetsrhe" style="position: absolute;top: 5px;right: 40px;width:15px;height:15px;cursor:pointer;" onclick="toSetVideo(this)"></div>
				<div id="fiveToBig" title="放大" values="five" style="position: absolute;top: 5px;right: 10px;width:15px;height:15px;border:1px solid #fff;cursor: pointer;" onclick="toBigOfVideo(this)"></div>
				<div id="fiveToSmall" title="缩小" values="five" style="position: absolute;top: 5px;right: 15px;width:15px;height:15px;color:#fff;cursor: pointer;display: none">X</div>
			</div>
			<div style="width:100%;height:100%;z-index: 1;position: relative;">
				<div id="fiveTitle" style="position: absolute;top: 5px;left: 5px"></div>
				<iframe id="fiveIframe" src="" frameborder="0" style="float:left;width:100%;height:100%;"></iframe>
			</div>
		</div>

		<!-- 设置界面iframe -->
		<div id="setIframeDiv" class=""  values="set" style="display: none;float:left;width:49.8%;border: 1px solid rebeccapurple;overflow: hidden;padding: 2px;height:300px;position: relative;display: none">
			<div style="background:rgb(0,0,0,0);width:100%;height:100%;position:absolute;z-index: 99;display: none">
				<div id="setSet" title="设置" values="set" class="setIcon001 tjnyrsyhetsrhe" style="position: absolute;top: 5px;right: 40px;width:15px;height:15px;cursor:pointer;display: none" onclick="toSetVideo(this)"></div>
				<div id="setToBig" title="放大" values="set" style="position: absolute;top: 5px;right: 10px;width:15px;height:15px;border:1px solid #fff;cursor: pointer;display: none" onclick="toBigOfVideo(this)"></div>
				<div id="setClose" title="关闭" values="set" style="position: absolute;top: 5px;right: 15px;width:15px;height:15px;color:#fff;cursor: pointer;" onclick="setCloseIframe(this)">X</div>
			</div>
			<div style="width:100%;height:100%;z-index: 1;position: relative;">
				<div id="setTitle" style="position: absolute;top: 5px;left: 5px"></div>
				<div id="setClose" title="关闭" values="set" style="position: absolute;top: 5px;right: 15px;width:15px;height:15px;color:#fff;cursor: pointer;" onclick="setCloseIframe(this)">X</div>
				<iframe id="setIframe" src="" frameborder="0" style="float:left;width:100%;height:100%;"></iframe>
			</div>
		</div>

		<!-- <div id="twoIframeDiv" style="float:left;width:33%;height:300px;">
			<iframe id="twoIframe" src="" frameborder="0" style="float:left;width:100%;height:100%;"></iframe>
		</div>
		<div id="threeIframeDiv" style="float:left;width:33%;height:300px;">
			<iframe id="threeIframe" src="" frameborder="0" style="float:left;width:100%;height:100%;"></iframe>
		</div>
		<div id="fourIframeDiv" style="float:left;width:33%;height:300px;">
			<iframe id="fourIframe" src="" frameborder="0" style="float:left;width:100%;height:100%;"></iframe>
		</div>
		<div id="fiveIframeDiv" style="float:left;width:33%;height:300px;">
			<iframe id="fiveIframe" src="" frameborder="0" style="float:left;width:100%;height:100%;"></iframe>
		</div> -->
		<!-- <iframe id="twoIframe" src="" frameborder="0" style="float:left;width:33%;height:300px;"></iframe>
		<iframe id="threeIframe" src="" frameborder="0" style="float:left;width:33%;height:300px;"></iframe>
		<iframe id="fourIframe" src="" frameborder="0" style="float:left;width:33%;height:300px;"></iframe>
		<iframe id="fiveIframe" src="" frameborder="0" style="float:left;width:33%;height:300px;"></iframe>
		<iframe id="fiveIframe" src="" frameborder="0" style="float:left;width:33%;height:300px;"></iframe> -->
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
var singleDivHeight="<%=singleDivHeight%>";

//真正的
var roomNameListS = {
	A0:'100.93.107.112',
	B0:'100.93.107.111',
	C0:'100.93.106.113',
	D0:'100.93.106.112',
	E1:'100.93.107.110',
};
var roomNameList = {
	A0:'rtmp://10.222.42.7/hls/videos01',
	B0:'rtmp://10.222.42.7/hls/videos02',
	C0:'rtmp://10.222.42.7/hls/videos03',
	D0:'rtmp://10.222.42.7/hls/videos04',
	E1:'rtmp://10.222.42.7/hls/videos02',
}

var isBig = 0;
var singleWidthC = 2;
var singleHeightC = 10;

$(function(){
	init();
	initEvent();
});
function init(){
	//处理高度
    if (singleDivHeight == null || singleDivHeight == "null" || singleDivHeight == undefined) {
		$(".thrybtesbaer").height(400);
    }else{
		$(".thrybtesbaer").height(singleDivHeight);
    }

	var bodyWidth = $('body').width();
	var iframeHeight = $('#oneIframe').height();
	var singleWidth = bodyWidth/2 - singleWidthC;
	var singleHeight = iframeHeight - singleHeightC;
	//var src = 'http://localhost:8080/LsmScreen/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=B0&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	
	//var src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=N0&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	//$("#oneIframe").attr('src', src);
	

	var src1 = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=A0NC&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	var src2 = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=B0NC&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	var src3 = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=D0MK&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	var src4 = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=E1NC&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	$("#oneIframe").attr('src', src1);
	$("#twoIframe").attr('src', src2);
	$("#threeIframe").attr('src', src3);
	$("#fourIframe").attr('src', src4);
	$("#oneTitle").text($("#oneNCMenue").find('span').eq(1).text());
	$("#twoTitle").text($("#twoNCMenue").find('span').eq(1).text());
	$("#threeTitle").text($("#fourMKMenue").find('span').eq(1).text());
	$("#fourTitle").text($("#fiveNCMenue").find('span').eq(1).text());

	//$("#fiveIframe").attr('src', src);

	




};
function initEvent(){
$("#oneIframeDiv").on('click', function(event) {
	event.preventDefault();
	//console.log('123');
});

}
	

function setOperatetDiv(dom){
	var values = $(dom).attr('values');
	$(dom).removeClass();
	if (values == 0) {
		$(dom).attr('values','1');
		$(dom).addClass('setIconY');
		$('.ytrgftegeeg').show();
	}else{
		$(dom).attr('values','0');
		$(dom).addClass('setIconN');
		$('.ytrgftegeeg').hide();
	}
};

function enterSingleMenue(dom){
	$(dom).find('span').eq(0).removeClass();
	$(dom).find('span').eq(0).addClass('roomIconY');
	$(dom).find('span').eq(1).css('color', '#6EFBFF');;
};
function leaveSingleMenue(dom){
	$(dom).find('span').eq(0).removeClass();
	$(dom).find('span').eq(0).addClass('roomIconN');
	$(dom).find('span').eq(1).css('color', '#fff');;
};

function hideRightKeyMenue(){
	$(".rightKeyMenue").hide();
};
var whereVideo = null;
function div_oncontextmenu(dom){
	var e = event||e;
	e.preventDefault();
	e.stopPropagation();
    //chuli shiqing
    whereVideo = $(dom).attr('values');
	console.log('======');
	console.log(whereVideo);
	console.log(e);


	//

	var top = e.clientY;
	var left = e.clientX;
	$(".rightKeyMenue").show();

	var rightKeyMenueHeight = $('.rightKeyMenue').height();
	var total = singleDivHeight *2;
	var bodyHeight = $('body').height();
	var Bigtotal = total > bodyHeight?total:bodyHeight

	if ( (e.clientY +  rightKeyMenueHeight) > Bigtotal) {
		$(".rightKeyMenue").css({
			top:"",
			bottom: '10px',
			left: left,
		});
	}else{
		$(".rightKeyMenue").css({
			top: top,
			bottom: '',
			left: left
		});

	}




}

function toSetVideo(dom){
	var bodyWidth = $('body').width();
	var bodyHeight = $('body').height();
	console.log('设置');
	$('.thrybtesbaer').hide();
	$('#setIframeDiv').width('100%').height(bodyHeight).show();
	$("#setClose").css('color', 'red');
	var values = $(dom).attr('values');
	var src = $("#"+values+"Iframe").attr('src');

	if (src.indexOf('A0MK') > -1) {
		$('#setIframe').attr('src', 'http://100.93.107.112/doc/page/preview.asp');
	};
	if (src.indexOf('A0NC') > -1) {
		$('#setIframe').attr('src', 'http://100.93.107.110/doc/page/preview.asp');
	};
	if (src.indexOf('B0MK') > -1) {
		$('#setIframe').attr('src', 'http://100.93.107.111/doc/page/preview.asp');
	};
	if (src.indexOf('B0NC') > -1) {
		$('#setIframe').attr('src', 'http://100.93.107.113/doc/page/preview.asp');
	};
	if (src.indexOf('C0MK') > -1) {
		$('#setIframe').attr('src', 'http://100.93.106.113/doc/page/preview.asp');
	};
	if (src.indexOf('C0NC') > -1) {
		$('#setIframe').attr('src', 'http://100.93.106.114/doc/page/preview.asp');
	};
	if (src.indexOf('D0MK') > -1) {
		$('#setIframe').attr('src', 'http://100.93.106.112/doc/page/preview.asp');
	};
	if (src.indexOf('E1MK') > -1) {
		$('#setIframe').attr('src', 'http://100.93.107.114/doc/page/preview.asp');
	};
	if (src.indexOf('E1NC') > -1) {
		$('#setIframe').attr('src', 'http://100.93.107.115/doc/page/preview.asp');
	};


};
function setCloseIframe(){
	$('.thrybtesbaer').show();
	$('#setIframeDiv').hide();
	$("#setClose").css('color', '#fff');
	$('#setIframe').attr('src', '');
}

function toBigOfVideo(dom){
	//控制设置按钮位置
	$('.tjnyrsyhetsrhe').css('top', '15px');

	isBig = 1;
	var bodyWidth = $('body').width();
	var bodyHeight = $('body').height();
	var whereVideo = $(dom).attr('values');


	$("#"+whereVideo+"ToBig").hide();
	$("#"+whereVideo+"ToSmall").show();

	$(".canToBig").hide();
	$("#"+whereVideo+"IframeDiv").width('100%').height(bodyHeight).show();



	var src = $("#"+whereVideo+"Iframe").attr('src');
	var pre_src = src.substring(0,src.indexOf('&videoWidth'));
	var realSrc = pre_src + '&videoWidth='+(bodyWidth -30)+'&videoHeight='+(bodyHeight-30);
	$("#"+whereVideo+"Iframe").attr('src',realSrc);



};
function toSmallOfVideo(dom){
	//控制设置按钮位置
	$('.tjnyrsyhetsrhe').css('top', '5px');

	isBig = 0;
	var bodyWidth = $('body').width();
	var iframeHeight = singleDivHeight;
	var singleWidth = bodyWidth/2 - singleWidthC;
	var singleHeight = iframeHeight - singleHeightC;
	var whereVideo = $(dom).attr('values');


	$("#"+whereVideo+"ToBig").show();
	$("#"+whereVideo+"ToSmall").hide();

	$(".canToBig").show();
	$("#"+whereVideo+"IframeDiv").width('49.8%');
    if (singleDivHeight == null || singleDivHeight == "null" || singleDivHeight == undefined) {
		$(".canToBig").height(400);
    }else{
		$(".canToBig").height(singleDivHeight);
    }


	var src = $("#"+whereVideo+"Iframe").attr('src');
	var pre_src = src.substring(0,src.indexOf('&videoWidth'));
	var realSrc = pre_src + '&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	$("#"+whereVideo+"Iframe").attr('src',realSrc);

	if (whereVideo == "one") {
		$("#twoIframe").attr('src', $("#twoIframe").attr('src'));
		$("#threeIframe").attr('src', $("#threeIframe").attr('src'));
		$("#fourIframe").attr('src', $("#fourIframe").attr('src'));
	}
	if (whereVideo == "two") {
		$("#oneIframe").attr('src', $("#oneIframe").attr('src'));
		$("#twoIframe").attr('src', $("#twoIframe").attr('src'));
		$("#threeIframe").attr('src', $("#threeIframe").attr('src'));
		$("#fourIframe").attr('src', $("#fourIframe").attr('src'));
	}
	if (whereVideo == "three") {
		$("#oneIframe").attr('src', $("#oneIframe").attr('src'));
		$("#twoIframe").attr('src', $("#twoIframe").attr('src'));
		$("#fourIframe").attr('src', $("#fourIframe").attr('src'));
	}
	if (whereVideo == "four") {
		$("#oneIframe").attr('src', $("#oneIframe").attr('src'));
		$("#twoIframe").attr('src', $("#twoIframe").attr('src'));
		$("#threeIframe").attr('src', $("#threeIframe").attr('src'));
	}


	


	



}


function chooseCurrRoom(dom,whereRoom){
	//whereVideo   one   来自哪个video\
	// whereRoom   one   ;来自哪个机房 
	var bodyWidth = $('body').width();
	var iframeHeight1 = $('#oneIframe').height();
	var iframeHeight2 = $('#twoIframe').height();
	var iframeHeight3 = $('#threeIframe').height();
	var iframeHeight4 = $('#fourIframe').height();
	var iframeHeight5 = $('#fiveIframe').height();
	var arr = [];
	arr.push(iframeHeight1);
	arr.push(iframeHeight2);
	arr.push(iframeHeight3);
	arr.push(iframeHeight4);
	arr.push(iframeHeight5);

	var getMax = Math.max.apply({}, arr);


	var iframeHeight = getMax;

	var singleWidth = null;
	if (isBig == 1) {
		singleWidth = bodyWidth - singleWidthC;
	}else{
		singleWidth = bodyWidth/2 - singleWidthC;
	}

	var singleHeight = iframeHeight - singleHeightC;
	var src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/noVideo.jsp?isScreenMode=true&roomName=N0&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	if (whereRoom == "oneMK") {
		src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=A0MK&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	}if (whereRoom == "oneNC") {
		src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=A0NC&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	}else if (whereRoom == "twoMK"){
		src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=B0MK&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	}else if (whereRoom == "twoNC"){
		src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=B0NC&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	}else if (whereRoom == "threeMK"){
		src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=C0MK&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	}else if (whereRoom == "threeNC"){
		src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=C0NC&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	}else if (whereRoom == "fourMK"){
		src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=D0MK&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	}else if (whereRoom == "fiveMK"){
		src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=E1MK&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	}else if (whereRoom == "fiveNC"){
		src = BASEPATH + '/pages/local-lsm/videoOfMachineRoom/videoOfMachineRoom.jsp?isScreenMode=true&roomName=E1NC&videoWidth='+singleWidth+'&videoHeight='+singleHeight;
	};

	$("#"+whereVideo+"Iframe").attr('src', src);
	$("#"+whereVideo+"Title").text($(dom).find('span').eq(1).text());



}




</script>
</html>